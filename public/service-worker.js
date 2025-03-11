// service-worker.js
self.addEventListener('push', function(e) {
    console.log('[Service Worker] Push recibido');

    try {
        // Verificar si hay datos
        if (!e.data) {
            console.warn('[Service Worker] Push recibido sin datos');
            return;
        }

        // Intentar parsear los datos
        const data = e.data.json();
        console.log('[Service Worker] Datos recibidos:', data);

        // Adaptar a la estructura que envías desde el servidor
        // Tu servidor envía {title, body, data} pero tu SW espera {title, message, url}
        const options = {
            body: data.body || '', // Cambiar data.message a data.body
            icon: '/favicon.ico', // Usar un icono que existe en la raíz
            badge: '/favicon.ico',
            data: data.data || {}
        };

        console.log('[Service Worker] Mostrando notificación:', {
            title: data.title,
            options: options
        });

        e.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } catch (error) {
        console.error('[Service Worker] Error al procesar notificación push:', error);
    }
});

self.addEventListener('notificationclick', function(e) {
    console.log('[Service Worker] Notificación clickeada');

    // Cerrar la notificación
    e.notification.close();

    // Usar e en lugar de event
    try {
        // Verificar si hay datos y URL
        if (e.notification.data && e.notification.data.ticketId) {
            console.log('[Service Worker] Abriendo URL:', `/tickets/${e.notification.data.ticketId}`);

            e.waitUntil(
                clients.matchAll({type: 'window'}).then(function(clientList) {
                    // Si hay ventanas abiertas, enfocar una y navegar
                    for (const client of clientList) {
                        if (client.url && 'focus' in client) {
                            client.focus();
                            client.navigate(`/tickets/${e.notification.data.ticketId}`);
                            return;
                        }
                    }
                    // Si no hay ventanas abiertas, abrir una nueva
                    if (clients.openWindow) {
                        return clients.openWindow(`/tickets/${e.notification.data.ticketId}`);
                    }
                })
            );
        } else {
            console.log('[Service Worker] No hay URL para navegar');
        }
    } catch (error) {
        console.error('[Service Worker] Error al manejar clic en notificación:', error);
    }
});
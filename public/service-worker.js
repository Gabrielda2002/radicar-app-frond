self.addEventListener('push', (e) => {
    const data  =  e.data.json();

    const options = {
        body: data.message,
        icon: '/public/assets/trash.svg',
        badge: '/public/assets/trash.svg',
        data: {
            url: data.url
        }
    };

    e.waitUntil(
        self.registration.showNotification(data.title, options)   
    );
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();

    if(event.notification.data.url){
        e.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});


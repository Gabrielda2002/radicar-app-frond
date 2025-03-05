// src/components/NotificationBell.tsx
import React, { useState, useEffect, useRef } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNotification } from "@/context/notificationContext.tsx";

const NotificationBell: React.FC = () => {
    const { notifications, unreadCount, markAsRead, subscribeToPushNotifications } = useNotification();
    const [isOpen, setIsOpen] = useState(false);
    const [pushEnabled, setPushEnabled] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    
    // Verificar si ya está suscrito a notificaciones push
    useEffect(() => {
        const checkPushSubscription = async () => {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                try {
                    const registration = await navigator.serviceWorker.ready;
                    const subscription = await registration.pushManager.getSubscription();
                    setPushEnabled(!!subscription);
                } catch (error) {
                    console.error('Error al verificar la suscripción push:', error);
                }
            }
        };
        checkPushSubscription();
    }, []);

    // Resto de tu código existente...
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMarkAsRead = async (notificationId: number) => {
        await markAsRead(notificationId);
    };

    // Función para manejar la suscripción a notificaciones push
    const handleSubscribeToPush = async () => {
        // Primero, solicitar permiso de notificación
        if ('Notification' in window && Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                console.log('Permiso para notificaciones denegado');
                return;
            }
        }
        
        try {
            await subscribeToPushNotifications();
            setPushEnabled(true);
        } catch (error) {
            console.error('Error al suscribirse a las notificaciones:', error);
        }
    };

    return (
        <div className="relative" ref={notificationRef}>
            <button
                className="relative p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white rounded-lg shadow-xl w-80 dark:bg-gray-800">
                    <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Notificaciones
                        </h3>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ×
                        </button>
                    </div>

                    {/* Botón para activar notificaciones push */}
                    <div className="p-2 text-right border-b dark:border-gray-700">
                        <button
                            onClick={handleSubscribeToPush}
                            disabled={pushEnabled}
                            className={`text-sm px-3 py-1 rounded ${
                                pushEnabled 
                                ? 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-default' 
                                : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800'
                            }`}
                        >
                            {pushEnabled ? 'Notificaciones activadas' : 'Activar notificaciones push'}
                        </button>
                    </div>

                    <div className="overflow-y-auto max-h-96">
                        {notifications.length === 0 ? (
                            <p className="p-4 text-center text-gray-500 dark:text-gray-400">
                                No hay notificaciones
                            </p>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b dark:border-gray-700 ${
                                        !notification.isRead ? 'bg-blue-50 dark:bg-gray-700' : ''
                                    }`}
                                >
                                    <h4 className="font-semibold text-gray-800 dark:text-white">
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {notification.message}
                                    </p>
                                    <div className="mt-2 text-right">
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                Marcar como leída
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
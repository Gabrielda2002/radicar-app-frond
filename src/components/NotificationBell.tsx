// src/components/common/NotificationBell/NotificationBell.tsx

import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import {useNotification} from "@/context/notificationContext.tsx";

const NotificationBell: React.FC = () => {
    const { notifications, unreadCount, markAsRead } = useNotification();
    const [isOpen, setIsOpen] = useState(false);

    const handleMarkAsRead = async (notificationId: number) => {
        await markAsRead(notificationId);
        console.log('elimina la notificacion');
    };

    return (
        <div className="relative">
            <button
                className="relative p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute z-50 right-0 w-80 mt-2 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="p-2 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Notificaciones
                        </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
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
                                        <button
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            Marcar como leída
                                        </button>
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
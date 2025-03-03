import {INotification} from "@/models/INotification.ts";
import React, {createContext, useContext, useEffect, useState} from "react";
import {io, Socket, } from "socket.io-client";
import {api} from "@/utils/api-config.ts";

interface NotificationContextProps {
    notifications: INotification[];
    unreadCount: number;
    markAsRead: (id: number) => Promise<void>;
}

export  const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    console.log('notifications', notifications);
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    useEffect(() => {
        const fetchNotifications = async () => {
            if (userId){
                try {
                    const response = await api.get(`/notifications/user/${userId}`)
                    console.log('response', response);
                    setNotifications(response.data);
                }catch (e){
                    console.log(e);
                }
            };
        }
        fetchNotifications();
    }, [userId]);

    useEffect(() => {

        if (!userId) return;

        const newSocket = io(`http://localhost:3600`);
        setSocket(newSocket);

        return () => {
            newSocket.close()
        }
    }, [userId])

    // escuchar nuevas notifiaciones
    useEffect(() => {
        if (socket && userId){
            socket?.emit('join', `user_${userId}`);

            // escuchar nuevas notifiaciones
            socket?.on('newNotification', (notification: INotification ) => {

                console.log('new notification', notification);
                setNotifications(prev => [notification, ...prev]);

                if (Notification.permission === 'granted'){
                    new Notification(notification.title,{
                        body: notification.message
                    })
                }else if (Notification.permission !== 'denied'){
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted'){
                            new Notification(notification.title,{
                                body: notification.message
                            })
                        }
                    })
                }

            });
        }
        return () => {
            if (socket){
                socket.off('newNotification');
            }
        }
    }, [socket, userId]);

    const markAsRead = async (id: number) => {
        try{
            const response = await  api.put(`/notifications/${id}/read`)

            if (response.status === 200){
                setNotifications(prev =>
                    prev.map(n =>
                        n.id === id ? {...n, isRead: true} : n
                    )
                );
            }
        }catch (e){
            console.log(e);
        }
    }

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return(
        <NotificationContext.Provider value={{notifications, unreadCount, markAsRead}}>
            {children}
        </NotificationContext.Provider>
    )

}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context){
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context;
}
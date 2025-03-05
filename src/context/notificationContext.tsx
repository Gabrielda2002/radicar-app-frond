import {INotification} from "@/models/INotification.ts";
import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import {io, Socket} from "socket.io-client";
import {api} from "@/utils/api-config.ts";

interface NotificationContextProps {
    notifications: INotification[];
    unreadCount: number;
    markAsRead: (id: number) => Promise<void>;
    subscribeToPushNotifications: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service worker registrado:', registration);
            })
            .catch(error => {
                console.error('Error al registrar service worker:', error);
            })
        }
    }, [])
    
        // suscribirse notirficaciones push
        const subscribeToPushNotifications = async () => {
            try{
                if(!('serviceWorker' in navigator) || !('PushManager' in window)){
                    console.warn('Notificaciones push no soportadas');
                    return;
                }
    
                const registration = await navigator.serviceWorker.ready;
    
                let subscription = await registration.pushManager.getSubscription();
    
                if(!subscription) {
                    const response = await api.get('/push/vapid-public-key');
                    const vapidPublicKey = response.data.publicKey;
    
                    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    
                    subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey
                    });
    
                    setPushSubscription(subscription);
    
                    if(userId){
                        await api.post('/push/subscribe', {
                            userId: userId,
                            subscription: subscription.toJSON()
                        });
    
                        console.log('Suscrito a notificaciones push');
                    }
                }
            }catch(error){
                console.error('Error al suscribirse a notificaciones push:', error);
            }
        }
    
    // Cargar notificaciones existentes al inicio
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) return;
            
            try {
                const response = await api.get(`/notifications/user/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error("Error al cargar notificaciones:", error);
            }
        };
        
        fetchNotifications();
    }, [userId]);



    // Inicializar y conectar Socket.io una sola vez
    useEffect(() => {
        if (!userId) return;
        
        // No crear nueva conexión si ya existe una
        if (!socketRef.current) {
            console.log('Inicializando nueva conexión de socket');
            
            // Establecer una única instancia de socket con opciones explícitas
            socketRef.current = io(`${import.meta.env.VITE_URL_BACKEND}`, {
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                transports: ['websocket', 'polling']
            });
            
            // Manejadores de eventos de conexión
            socketRef.current.on('connect', () => {
                console.log('Socket conectado:', socketRef.current?.id);
                setIsConnected(true);
                
                // Unirse a la sala del usuario una vez conectado
                socketRef.current?.emit('join', `user_${userId}`);
            });

            socketRef.current.on('disconnect', () => {
                console.log('Socket desconectado');
                setIsConnected(false);
            });

            socketRef.current.on('connect_error', (error) => {
                console.error('Error de conexión con Socket.io:', error);
            });

            // Configurar manejador de notificaciones
            socketRef.current.on('newNotification', (notification: INotification) => {
                console.log('Nueva notificación recibida:', notification);
                console.log('estado actual notificaciones antes de actualizar', notifications);
                
                // Verificar que la notificación sea para este usuario
                if (notification.userId === userId) {
                    // Usar una función callback para asegurar el último estado
                    setNotifications(prevNotifications => {
                        // Verificar si la notificación ya existe para evitar duplicados
                        const exists = prevNotifications.some(n => n.id === notification.id);
                        if (!exists) {
                            console.log('agregando nueva notificación');
                            return [notification, ...prevNotifications];
                        }
                        return prevNotifications;
                    });

                    // Mostrar notificación del sistema
                    if ("Notification" in window) {
                        if (Notification.permission === "granted") {
                            new Notification(notification.title, {
                                body: notification.message
                            });
                        } else if (Notification.permission !== "denied") {
                            Notification.requestPermission().then(permission => {
                                if (permission === "granted") {
                                    new Notification(notification.title, {
                                        body: notification.message
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }

        // Limpieza cuando el componente se desmonte realmente (no durante re-renders)
        return () => {
            // Solo cerramos al desmontar el componente completo
            if (process.env.NODE_ENV === "production") {
                console.log('Cerrando conexión de socket (producción)');
                socketRef.current?.disconnect();
                socketRef.current = null;
            }
        };
    }, [userId]);

    // Reconectar si el socket está desconectado pero debería estar conectado
    useEffect(() => {
        if (userId && socketRef.current && !isConnected) {
            console.log('Intentando reconectar socket...');
            socketRef.current.connect();
        }
    }, [userId, isConnected]);

    const markAsRead = async (id: number) => {
        try {
            const response = await api.put(`/notifications/${id}/read`);

            if (response.status === 200) {
                setNotifications(prev =>
                    prev.map(n =>
                        n.id === id ? {...n, isRead: true} : n
                    )
                );
            }
        } catch (error) {
            console.error("Error al marcar notificación como leída:", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <NotificationContext.Provider value={{notifications, unreadCount, markAsRead, subscribeToPushNotifications}}>
            {children}
        </NotificationContext.Provider>
    );
};

const  urlBase64ToUint8Array = (base64String: string)  =>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
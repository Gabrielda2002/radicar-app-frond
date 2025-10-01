// src/components/NotificationBell.tsx
import React, { useState, useEffect, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNotification } from "@/context/notificationContext.tsx";
import ModalServey from "@/featuures/HelpDesk/Components/ModalServey";
import ModalCommetsTicket from "@/featuures/HelpDesk/Components/ModalCommetsTicket";
import { Check } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { FormatDate } from "@/utils/FormatDate";
import Button from "./common/Ui/Button";

const NotificationBell: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    subscribeToPushNotifications,
  } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { rol } = useAuth();

  // Verificar si ya está suscrito a notificaciones push
  useEffect(() => {
    const checkPushSubscription = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setPushEnabled(!!subscription);
        } catch (error) {
          console.error("Error al verificar la suscripción push:", error);
        }
      }
    };
    checkPushSubscription();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para manejar la suscripción a notificaciones push
  const handleSubscribeToPush = async () => {
    // Primero, solicitar permiso de notificación
    if ("Notification" in window && Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Permiso para notificaciones denegado");
        return;
      }
    }

    try {
      await subscribeToPushNotifications();
      setPushEnabled(true);
    } catch (error) {
      console.error("Error al suscribirse a las notificaciones:", error);
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="relative p-2 text-gray-600 animate-pulse md:animate-none hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 p-2 z-50 mx-auto mt-4 -mr-32 overflow-hidden bg-white rounded-lg shadow-xl md:-mr-0 w-80 dark:bg-gray-800">
          <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Notificaciones
            </h3>
            <Button
              variant="any"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </Button>
          </div>

          {/* Botón para activar notificaciones push */}
          <div className="p-2 text-right border-b dark:border-gray-700">
            <Button
              variant="any"
              onClick={handleSubscribeToPush}
              disabled={pushEnabled}
              className={`text-sm px-3 py-1 rounded ${
                pushEnabled
                  ? "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-default"
                  : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              }`}
            >
              {pushEnabled
                ? "Notificaciones activadas"
                : "Activar notificaciones push"}
            </Button>
          </div>

          <div className="overflow-y-auto max-h-96">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500 dark:text-gray-400">
                No hay notificaciones
              </p>
            ) : (
              notifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b dark:border-gray-700 mb-5 rounded-lg ${
                      !notification.isRead ? "bg-blue-50 dark:bg-gray-700" : ""
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {FormatDate(notification.createdAt, true)}
                    </p>

                    {/* boton encuesta */}
                    <div className="flex justify-center mt-2 space-x-2">
                      <div className="flex items-center">
                        <ModalCommetsTicket
                          idTicket={
                            notification.referenceId
                              ? notification.referenceId
                              : 0
                          }
                        />
                      </div>
                      <div className="flex items-center w-fit">
                        <ModalServey
                          idTicket={
                            notification.referenceId
                              ? notification.referenceId
                              : 0
                          }
                        />
                      </div>
                      {/* marcar como leido solo a los roles 1*/}
                      {[1, 17].includes(Number(rol)) && (
                        <div className="flex items-center">
                          <Button
                            variant="any"
                            onClick={() => {
                              markAsRead(notification.id);
                            }}
                            className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
                            icon={<Check className="w-4 h-4" />}
                          />
                        </div>
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

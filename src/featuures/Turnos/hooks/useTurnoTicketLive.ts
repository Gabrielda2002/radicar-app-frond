import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type {
  ITurnoTicket,
  TurnoPriorityType,
  TurnoStatusType,
} from "@/models/ITurnos";
import { useStoreTurnoTicket } from "../store/useStoreTurnoTicket";
import {
  playTurnoChime,
  unlockAudio,
  vibrateDevice,
} from "../utils/turnoAudio";

interface TicketLlamadoEvent {
  turnoId?: number;
  ticketCode?: string;
  ticketToken?: string;
  priority?: TurnoPriorityType;
  moduloCode?: string;
  moduloName?: string;
  moduloId?: number;
  userName?: string;
  advisorName?: string;
  serviceName?: string;
  serviceId?: number;
  callCount?: number;
  calledAt?: string;
}

interface TicketActualizadoEvent {
  turnoId?: number;
  ticketToken?: string;
  ticketCode?: string;
  status?: TurnoStatusType;
  updatedAt?: string;
  moduloCode?: string;
  moduloName?: string;
  moduloId?: number;
  aheadCount?: number;
  estimatedWaitMinutes?: number;
  callCount?: number;
  serviceId?: number;
  serviceName?: string;
}

const getSocketOrigin = (): string => {
  const backendUrl =
    (import.meta.env.VITE_URL_BACKEND as string | undefined) || "";
  try {
    const parsed = new URL(backendUrl, window.location.origin);
    return parsed.origin;
  } catch {
    return backendUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "");
  }
};

export const useTurnoTicketLive = (token: string) => {
  const {
    isLiveConnected,
    isOutdated,
    setIsLiveConnected,
    setIsOutdated,
    updatePartial,
    load,
  } = useStoreTurnoTicket();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEnabledRef.current = next;
      if (next) {
        void unlockAudio();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!token) return;

    const origin = getSocketOrigin();
    const socket: Socket = io(origin, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    let hasConnectedOnce = false;

    socket.on("connect", () => {
      socket.emit("join", `ticket_${token}`);
      setIsLiveConnected(true);
      setIsOutdated(false);

      if (hasConnectedOnce) {
        void load(token);
      } else {
        hasConnectedOnce = true;
      }
    });

    socket.on("disconnect", () => {
      setIsLiveConnected(false);
      setIsOutdated(true);
    });

    socket.on("connect_error", () => {
      setIsLiveConnected(false);
      setIsOutdated(true);
    });

    const handleTicketLlamado = (payload: TicketLlamadoEvent) => {
      const currentTicket = useStoreTurnoTicket.getState().data;
      const modulo =
        payload.moduloName || payload.moduloCode
          ? {
              id: payload.moduloId ?? currentTicket?.modulo?.id ?? 0,
              code: payload.moduloCode ?? currentTicket?.modulo?.code ?? "",
              name:
                payload.moduloName ??
                payload.moduloCode ??
                currentTicket?.modulo?.name ??
                "Módulo",
            }
          : undefined;

      const partial: Partial<ITurnoTicket> = {
        status: "LLAMADO",
      };
      if (modulo) partial.modulo = modulo;
      if (payload.userName || payload.advisorName) {
        partial.advisorName = payload.userName || payload.advisorName;
      }
      if (typeof payload.callCount === "number") {
        partial.callCount = payload.callCount;
      }

      updatePartial(partial);

      if (soundEnabledRef.current) {
        playTurnoChime();
      }
      vibrateDevice();
    };

    const handleTicketRellamado = (payload: TicketLlamadoEvent) => {
      const currentTicket = useStoreTurnoTicket.getState().data;
      const modulo =
        payload.moduloName || payload.moduloCode
          ? {
              id: payload.moduloId ?? currentTicket?.modulo?.id ?? 0,
              code: payload.moduloCode ?? currentTicket?.modulo?.code ?? "",
              name:
                payload.moduloName ??
                payload.moduloCode ??
                currentTicket?.modulo?.name ??
                "Módulo",
            }
          : undefined;

      const partial: Partial<ITurnoTicket> = {
        status: "LLAMADO",
      };
      if (modulo) partial.modulo = modulo;
      if (typeof payload.callCount === "number") {
        partial.callCount = payload.callCount;
      } else if (currentTicket) {
        partial.callCount = (currentTicket.callCount || 1) + 1;
      }
      if (payload.userName || payload.advisorName) {
        partial.advisorName = payload.userName || payload.advisorName;
      }

      updatePartial(partial);

      if (soundEnabledRef.current) {
        playTurnoChime();
      }
      vibrateDevice();
    };

    const handleTicketActualizado = (payload: TicketActualizadoEvent) => {
      const currentTicket = useStoreTurnoTicket.getState().data;

      // Si hay transferencia o cambio de servicio, recargar el snapshot completo para mantener consistencia
      const isTransfer = payload.status === "TRANSFERIDO";
      const hasServiceChanged =
        (typeof payload.serviceId === "number" &&
          currentTicket?.service.id !== undefined &&
          payload.serviceId !== currentTicket.service.id) ||
        (typeof payload.serviceName === "string" &&
          currentTicket?.service.name !== undefined &&
          payload.serviceName !== currentTicket.service.name);

      if (isTransfer || hasServiceChanged) {
        void load(token);
        return;
      }

      const partial: Partial<ITurnoTicket> = {};
      if (payload.status) partial.status = payload.status;
      if (typeof payload.aheadCount === "number")
        partial.aheadCount = payload.aheadCount;
      if (typeof payload.estimatedWaitMinutes === "number") {
        partial.estimatedWaitMinutes = payload.estimatedWaitMinutes;
      }
      if (typeof payload.callCount === "number")
        partial.callCount = payload.callCount;

      if (payload.moduloName || payload.moduloCode) {
        partial.modulo = {
          id: payload.moduloId ?? currentTicket?.modulo?.id ?? 0,
          code: payload.moduloCode ?? currentTicket?.modulo?.code ?? "",
          name:
            payload.moduloName ??
            payload.moduloCode ??
            currentTicket?.modulo?.name ??
            "Módulo",
        };
      }

      if (Object.keys(partial).length > 0) {
        updatePartial(partial);
      }
    };

    socket.on("ticket:llamado", handleTicketLlamado);
    socket.on("ticket:rellamado", handleTicketRellamado);
    socket.on("ticket:actualizado", handleTicketActualizado);
    socket.on("ticket:estado", handleTicketActualizado);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void load(token);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("ticket:llamado");
      socket.off("ticket:rellamado");
      socket.off("ticket:actualizado");
      socket.off("ticket:estado");
      socket.disconnect();
      setIsLiveConnected(false);
    };
  }, [token, load, setIsLiveConnected, setIsOutdated, updatePartial]);

  return {
    isLiveConnected,
    isOutdated,
    soundEnabled,
    toggleSound,
  };
};

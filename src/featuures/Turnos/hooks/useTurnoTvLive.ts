import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { TurnoPriorityType, TurnoStatusType } from "@/models/ITurnos";
import { useStoreTurnoTv } from "../store/useStoreTurnoTv";
import { useTurnoTvAudio } from "./useTurnoTvAudio";

interface TurnoLlamadoEvent {
  turnoId: number;
  ticketCode: string;
  priority?: TurnoPriorityType;
  moduloCode?: string;
  moduloName?: string;
  serviceName?: string;
  advisorName?: string | null;
  callCount?: number;
  calledAt?: string;
}

interface TurnoActualizadoEvent {
  turnoId: number;
  ticketCode?: string;
  priority?: TurnoPriorityType;
  status?: TurnoStatusType;
  moduloCode?: string;
  moduloName?: string;
  serviceName?: string;
  advisorName?: string | null;
  callCount?: number;
  calledAt?: string;
}

interface TurnoRetiradoEvent {
  turnoId: number;
}

interface ColaActualizadaEvent {
  headquarterId: number;
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

const formatModuloSpeech = (
  moduloName?: string,
  moduloCode?: string,
): string => {
  if (moduloName && moduloName.trim()) {
    const trimmed = moduloName.trim();
    if (/^(m[oó]dulo|ventanilla|consultorio|sala)/i.test(trimmed)) {
      return trimmed;
    }
    return `Módulo ${trimmed}`;
  }
  if (moduloCode && moduloCode.trim()) {
    return `Módulo ${moduloCode.trim()}`;
  }
  return "Módulo de atención";
};

export const useTurnoTvLive = (slug: string, headquarterId?: number) => {
  const {
    load,
    setIsLiveConnected,
    setIsOutdated,
    addOrUpdateTurn,
    removeTurn,
    setHighlightedTurnoId,
  } = useStoreTurnoTv();

  const audio = useTurnoTvAudio(slug);
  const { enqueueSpeech } = audio;
  const socketRef = useRef<Socket | null>(null);
  const headquarterIdRef = useRef<number | undefined>(headquarterId);

  const queueRefreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    headquarterIdRef.current = headquarterId;
    if (socketRef.current?.connected && typeof headquarterId === "number") {
      socketRef.current.emit("join", `sede_${headquarterId}_tv`);
    }
  }, [headquarterId]);

  useEffect(() => {
    if (!slug) return;

    const origin = getSocketOrigin();
    const socket: Socket = io(origin, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    let hasConnectedOnce = false;

    socket.on("connect", () => {
      setIsLiveConnected(true);
      setIsOutdated(false);

      const targetHeadquarterId =
        headquarterIdRef.current ??
        useStoreTurnoTv.getState().data?.headquarter.id;
      if (typeof targetHeadquarterId === "number") {
        socket.emit("join", `sede_${targetHeadquarterId}_tv`);
      }

      if (hasConnectedOnce) {
        void load(slug);
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

    const scheduleStateRefresh = () => {
      if (queueRefreshTimeoutRef.current)
        clearTimeout(queueRefreshTimeoutRef.current);
      queueRefreshTimeoutRef.current = setTimeout(() => {
        queueRefreshTimeoutRef.current = null;
        void load(slug);
      }, 100);
    };

    const handleTurnoLlamado = (payload: TurnoLlamadoEvent) => {
      if (!payload || typeof payload.turnoId !== "number") return;

      addOrUpdateTurn({
        turnoId: payload.turnoId,
        ticketCode: payload.ticketCode,
        priority: payload.priority || "GENERAL",
        status: "LLAMADO",
        moduloCode: payload.moduloCode,
        moduloName: payload.moduloName,
        serviceName: payload.serviceName,
        advisorName: payload.advisorName,
        callCount: payload.callCount ?? 1,
        calledAt: payload.calledAt || new Date().toISOString(),
      });

      setHighlightedTurnoId(payload.turnoId);

      const cleanCode = (payload.ticketCode || "").replace(/-/g, " ");
      const moduloText = formatModuloSpeech(
        payload.moduloName,
        payload.moduloCode,
      );
      const text = `Turno ${cleanCode}, pasar a ${moduloText}`;
      const dedupKey = `${payload.turnoId}_llamado_${payload.callCount || 1}`;

      enqueueSpeech(dedupKey, text);
      scheduleStateRefresh();
    };

    const handleTurnoRellamado = (payload: TurnoLlamadoEvent) => {
      if (!payload || typeof payload.turnoId !== "number") return;

      addOrUpdateTurn({
        turnoId: payload.turnoId,
        ticketCode: payload.ticketCode,
        priority: payload.priority || "GENERAL",
        status: "LLAMADO",
        moduloCode: payload.moduloCode,
        moduloName: payload.moduloName,
        serviceName: payload.serviceName,
        advisorName: payload.advisorName,
        callCount: payload.callCount,
        calledAt: payload.calledAt || new Date().toISOString(),
      });

      setHighlightedTurnoId(payload.turnoId);

      const cleanCode = (payload.ticketCode || "").replace(/-/g, " ");
      const moduloText = formatModuloSpeech(
        payload.moduloName,
        payload.moduloCode,
      );
      const text = `Turno ${cleanCode}, pasar a ${moduloText}`;
      const dedupKey = `${payload.turnoId}_rellamado_${payload.callCount ?? Date.now()}`;

      enqueueSpeech(dedupKey, text);
      scheduleStateRefresh();
    };

    const handleTurnoActualizado = (payload: TurnoActualizadoEvent) => {
      if (!payload || typeof payload.turnoId !== "number") return;

      if (
        payload.status === "FINALIZADO" ||
        payload.status === "CANCELADO" ||
        payload.status === "NO_ASISTIO"
      ) {
        removeTurn(payload.turnoId);
      } else {
        addOrUpdateTurn({
          turnoId: payload.turnoId,
          ticketCode: payload.ticketCode,
          priority: payload.priority,
          status: payload.status,
          moduloCode: payload.moduloCode,
          moduloName: payload.moduloName,
          serviceName: payload.serviceName,
          advisorName: payload.advisorName,
          callCount: payload.callCount,
          calledAt: payload.calledAt,
        });
      }
    };

    const handleTurnoRetirado = (payload: TurnoRetiradoEvent) => {
      if (!payload || typeof payload.turnoId !== "number") return;
      removeTurn(payload.turnoId);
    };

    const handleColaActualizada = (payload: ColaActualizadaEvent) => {
      if (
        !payload ||
        typeof payload.headquarterId !== "number" ||
        payload.headquarterId !== headquarterIdRef.current
      )
        return;

      scheduleStateRefresh();
    };

    socket.on("turno:llamado", handleTurnoLlamado);
    socket.on("turno:rellamado", handleTurnoRellamado);
    socket.on("turno:actualizado", handleTurnoActualizado);
    socket.on("turno:retirado", handleTurnoRetirado);
    socket.on("cola:actualizada", handleColaActualizada);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void load(slug);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (queueRefreshTimeoutRef.current) {
        clearTimeout(queueRefreshTimeoutRef.current);
        queueRefreshTimeoutRef.current = null;
      }
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("turno:llamado");
      socket.off("turno:rellamado");
      socket.off("turno:actualizado");
      socket.off("turno:retirado");
      socket.off("cola:actualizada");
      socket.disconnect();
      socketRef.current = null;

      setIsLiveConnected(false);
    };
  }, [
    slug,
    load,
    setIsLiveConnected,
    setIsOutdated,
    addOrUpdateTurn,
    removeTurn,
    setHighlightedTurnoId,
    enqueueSpeech,
  ]);

  return audio;
};

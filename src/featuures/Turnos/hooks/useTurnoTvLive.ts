import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { TurnoPriorityType, TurnoStatusType } from "@/models/ITurnos";
import { useStoreTurnoTv } from "../store/useStoreTurnoTv";
import { playTurnoChime, unlockAudio } from "../utils/turnoAudio";

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

interface SpeechQueueTask {
  key: string;
  text: string;
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

  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);
  const socketRef = useRef<Socket | null>(null);
  const headquarterIdRef = useRef<number | undefined>(headquarterId);

  const queueRef = useRef<SpeechQueueTask[]>([]);
  const isSpeakingRef = useRef<boolean>(false);
  const activeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRefreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const announcedKeysRef = useRef<Map<string, number>>(new Map());
  const processQueueRef = useRef<() => void>(() => {});

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    headquarterIdRef.current = headquarterId;
    if (socketRef.current?.connected && typeof headquarterId === "number") {
      socketRef.current.emit("join", `sede_${headquarterId}_tv`);
    }
  }, [headquarterId]);

  const processQueue = useCallback(() => {
    if (isSpeakingRef.current) return;
    if (queueRef.current.length === 0) return;

    isSpeakingRef.current = true;
    const currentTask = queueRef.current.shift();
    if (!currentTask) {
      isSpeakingRef.current = false;
      return;
    }

    // Reproducir sonido previo (chime)
    playTurnoChime();

    // Esperar a que el chime finalice antes del sintetizador de voz
    activeTimeoutRef.current = setTimeout(() => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        activeTimeoutRef.current = setTimeout(() => {
          isSpeakingRef.current = false;
          processQueueRef.current();
        }, 500);
        return;
      }

      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(currentTask.text);
        utterance.lang = "es-CO";
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        let hasFinished = false;
        const finishTask = () => {
          if (hasFinished) return;
          hasFinished = true;
          if (activeTimeoutRef.current) {
            clearTimeout(activeTimeoutRef.current);
            activeTimeoutRef.current = null;
          }
          activeTimeoutRef.current = setTimeout(() => {
            isSpeakingRef.current = false;
            processQueueRef.current();
          }, 400);
        };

        utterance.onend = finishTask;
        utterance.onerror = finishTask;

        // Tiempo máximo de seguridad por anuncio: 10 segundos
        activeTimeoutRef.current = setTimeout(finishTask, 10000);

        window.speechSynthesis.speak(utterance);
      } catch {
        isSpeakingRef.current = false;
        processQueueRef.current();
      }
    }, 700);
  }, []);

  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

  const enqueueSpeech = useCallback(
    (key: string, text: string) => {
      // Limpiar llaves con más de 60 segundos
      const now = Date.now();
      for (const [k, timestamp] of announcedKeysRef.current.entries()) {
        if (now - timestamp > 60000) {
          announcedKeysRef.current.delete(k);
        }
      }

      if (announcedKeysRef.current.has(key)) {
        return;
      }
      announcedKeysRef.current.set(key, now);

      if (!soundEnabledRef.current) {
        return;
      }

      queueRef.current.push({ key, text });
      processQueue();
    },
    [processQueue],
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEnabledRef.current = next;
      if (next) {
        void unlockAudio();
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.resume();
        }
      } else {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        if (activeTimeoutRef.current) {
          clearTimeout(activeTimeoutRef.current);
          activeTimeoutRef.current = null;
        }
        queueRef.current = [];
        isSpeakingRef.current = false;
      }
      return next;
    });
  }, []);

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

      if (queueRefreshTimeoutRef.current)
        clearTimeout(queueRefreshTimeoutRef.current);
      queueRefreshTimeoutRef.current = setTimeout(() => {
        queueRefreshTimeoutRef.current = null;
        void load(slug);
      }, 100);
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

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (activeTimeoutRef.current) {
        clearTimeout(activeTimeoutRef.current);
        activeTimeoutRef.current = null;
      }
      if (queueRefreshTimeoutRef.current) {
        clearTimeout(queueRefreshTimeoutRef.current);
        queueRefreshTimeoutRef.current = null;
      }
      queueRef.current = [];
      isSpeakingRef.current = false;

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

  return {
    soundEnabled,
    toggleSound,
  };
};

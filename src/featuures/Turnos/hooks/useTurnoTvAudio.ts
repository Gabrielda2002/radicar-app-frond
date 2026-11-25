import { useCallback, useEffect, useRef, useState } from "react";
import { playTurnoChime, unlockAudio } from "../utils/turnoAudio";
import { startTurnoSpeech } from "../utils/turnoSpeech";

interface DiagnosticCall {
  key: string;
  slug: string;
  receivedAt: number;
  steps: string[];
}

interface SpeechTask {
  key: string;
  text: string;
}

export const useTurnoTvAudio = (slug: string) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [lastCall, setLastCall] = useState<DiagnosticCall | null>(null);
  const [toneResult, setToneResult] = useState("");
  const [voiceSteps, setVoiceSteps] = useState<string[]>([]);
  const soundEnabledRef = useRef(false);
  const activeAudio = useRef<"call" | "test" | null>(null);
  const queue = useRef<SpeechTask[]>([]);
  const seen = useRef(new Map<string, number>());
  const timer = useRef<number | undefined>(undefined);
  const detachSpeech = useRef<(() => void) | undefined>(undefined);

  const reportCall = useCallback((key: string, message: string) => {
    setLastCall((call) =>
      call?.key === key ? { ...call, steps: [...call.steps, message] } : call,
    );
  }, []);

  const processQueue = useCallback(function processQueue() {
    if (activeAudio.current) return;
    const task = queue.current.shift();
    if (!task) return;

    activeAudio.current = "call";
    playTurnoChime();
    timer.current = window.setTimeout(() => {
      detachSpeech.current = startTurnoSpeech(task.text, (message, finished) => {
        reportCall(task.key, message);
        if (finished) {
          timer.current = window.setTimeout(() => {
            activeAudio.current = null;
            processQueue();
          }, 400);
        }
      });
    }, 700);
  }, [reportCall]);

  const enqueueSpeech = useCallback((key: string, text: string) => {
    const now = Date.now();
    for (const [previousKey, timestamp] of seen.current) {
      if (now - timestamp > 60_000) seen.current.delete(previousKey);
    }
    if (seen.current.has(key)) return;
    seen.current.set(key, now);

    const enabled = soundEnabledRef.current;
    setLastCall({
      key,
      slug,
      receivedAt: now,
      steps: enabled ? ["Llamado recibido"] : ["Llamado recibido", "Audio desactivado"],
    });
    if (!enabled) return;
    queue.current.push({ key, text });
    processQueue();
  }, [processQueue, slug]);

  const stopAudio = useCallback(() => {
    window.clearTimeout(timer.current);
    detachSpeech.current?.();
    detachSpeech.current = undefined;
    window.speechSynthesis?.cancel?.();
    queue.current = [];
    activeAudio.current = null;
  }, []);

  useEffect(() => () => {
    stopAudio();
    // El registro de duplicados no debe pasar a otra sede.
    seen.current.clear();
  }, [slug, stopAudio]);

  const toggleSound = () => {
    const next = !soundEnabledRef.current;
    soundEnabledRef.current = next;
    setSoundEnabled(next);
    if (next) {
      void unlockAudio().catch(() => false);
      window.speechSynthesis?.resume?.();
      return;
    }
    if (activeAudio.current === "call" || queue.current.length > 0) {
      setLastCall((call) =>
        call ? { ...call, steps: [...call.steps, "Cola de audio detenida"] } : call,
      );
    }
    if (activeAudio.current === "test") {
      setVoiceSteps((steps) => [...steps, "Prueba detenida"]);
    }
    stopAudio();
  };

  const testTone = async () => {
    setToneResult("Preparando prueba de tono…");
    const unlocked = await unlockAudio().catch(() => false);
    setToneResult(
      unlocked && playTurnoChime()
        ? "Tono enviado a la salida de audio. Confirme si se escuchó."
        : "No se pudo iniciar el tono: audio no disponible o bloqueado.",
    );
  };

  const testVoice = () => {
    if (activeAudio.current === "test") return;
    if (activeAudio.current === "call") {
      setVoiceSteps(["Hay un anuncio o una prueba en curso. Intente de nuevo al terminar."]);
      return;
    }
    activeAudio.current = "test";
    setVoiceSteps([]);
    detachSpeech.current = startTurnoSpeech(
      "Prueba de voz de la pantalla de turnos de NordVital.",
      (message, finished) => {
        setVoiceSteps((steps) => [...steps, message]);
        if (finished) {
          timer.current = window.setTimeout(() => {
            activeAudio.current = null;
            processQueue();
          }, 0);
        }
      },
    );
  };

  return {
    soundEnabled, toggleSound, enqueueSpeech, testTone, testVoice,
    lastCall: lastCall?.slug === slug ? lastCall : null,
    toneResult, voiceSteps,
  };
};

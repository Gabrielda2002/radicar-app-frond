let audioContextInstance: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContextInstance || audioContextInstance.state === "closed") {
    audioContextInstance = new AudioCtx();
  }
  return audioContextInstance;
};

export const unlockAudio = async (): Promise<boolean> => {
  const ctx = getAudioContext();
  if (!ctx) return false;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }
  return ctx.state === "running";
};

export const playTurnoChime = (): boolean => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") {
      void ctx.resume().catch(() => undefined);
    }
    const now = ctx.currentTime;

    // Primer tono: 880 Hz (A5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.38);

    // Segundo tono: 1320 Hz (E6)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, now + 0.16);
    gain2.gain.setValueAtTime(0.0001, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.28, now + 0.19);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.7);
    return true;
  } catch (error) {
    console.error("Error al reproducir sonido de turno:", error);
    return false;
  }
};

export const vibrateDevice = (
  pattern: number[] = [200, 100, 200, 100, 200],
): void => {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignorar error si el dispositivo no soporta vibración
    }
  }
};

type ReportSpeech = (message: string, finished?: boolean) => void;

export const startTurnoSpeech = (text: string, report: ReportSpeech) => {
  const synth = window.speechSynthesis;
  if (typeof synth?.speak !== "function" ||
      typeof window.SpeechSynthesisUtterance !== "function") {
    report("Síntesis de voz no disponible en este navegador", true);
    return () => {};
  }

  let utterance: SpeechSynthesisUtterance | undefined;
  let timeout: number | undefined;
  let settled = false;
  let started = false;

  const detach = () => {
    settled = true;
    window.clearTimeout(timeout);
    if (utterance) {
      utterance.onstart = null;
      utterance.onend = null;
      utterance.onerror = null;
    }
  };

  const finish = (message: string) => {
    if (settled) return;
    detach();
    report(message, true);
  };

  try {
    utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "es-CO";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => {
      started = true;
      report("El navegador informó que la voz inició");
    };
    utterance.onend = () => finish("El navegador informó que la voz terminó");
    utterance.onerror = (event) =>
      finish(`Error de síntesis: ${event.error || "sin código"}`);
    timeout = window.setTimeout(() => {
      finish(started
        ? "Sin confirmación de fin de voz tras 10 segundos"
        : "Sin confirmación de inicio de voz tras 10 segundos");
      synth.cancel?.();
    }, 10_000);
    report("Voz solicitada");
    if (synth.paused) synth.resume();
    synth.speak(utterance);
  } catch (error) {
    finish(`No se pudo solicitar la voz: ${error instanceof Error ? error.name : "error desconocido"}`);
  }

  return detach;
};

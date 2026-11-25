interface TvAudioDiagnosticsProps {
  lastCall: { receivedAt: number; steps: string[] } | null;
  toneResult: string;
  voiceSteps: string[];
  testTone: () => Promise<void>;
  testVoice: () => void;
}

const CONTROL_CLASS =
  "cursor-pointer px-3 py-2 min-h-11 text-sm font-semibold bg-slate-800 text-white border border-slate-600 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

export const TvAudioDiagnostics = ({
  lastCall,
  toneResult,
  voiceSteps,
  testTone,
  testVoice,
}: TvAudioDiagnosticsProps) => (
  <details>
    <summary className={CONTROL_CLASS}>Diagnóstico de audio</summary>
    <section
      aria-label="Resultados del diagnóstico de audio"
      className="absolute right-4 top-full z-10 mt-2 p-4 w-[min(23rem,85vw)] max-h-[65vh] overflow-y-auto text-sm bg-slate-900 text-slate-100 border border-slate-600 rounded-2xl shadow-xl"
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" className={CONTROL_CLASS} onClick={() => void testTone()}>
          Probar tono
        </button>
        <button type="button" className={CONTROL_CLASS} onClick={testVoice}>
          Probar voz
        </button>
      </div>
      <div className="space-y-2 pt-3" role="status">
        {toneResult && <p><strong>Tono:</strong> {toneResult}</p>}
        {voiceSteps.length > 0 && <p><strong>Voz:</strong> {voiceSteps.join(" → ")}</p>}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-700">
        <h2 className="font-bold">Último llamado real</h2>
        {lastCall ? (
          <>
            <p className="mb-1 text-slate-300">
              Recibido a las {new Date(lastCall.receivedAt).toLocaleTimeString("es-CO")}
            </p>
            <ol className="list-decimal pl-5">
              {lastCall.steps.map((step, index) => (
                <li key={`${index}-${step}`}>{step}</li>
              ))}
            </ol>
          </>
        ) : (
          <p>No se ha recibido ningún llamado desde que se abrió esta pantalla.</p>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-300">
        Que el navegador confirme el fin de la voz no garantiza que se haya oído en la TV.
      </p>
    </section>
  </details>
);

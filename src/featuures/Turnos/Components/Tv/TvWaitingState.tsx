import { Clock } from "lucide-react";

export const TvWaitingState = () => {
  return (
    <section
      aria-label="En espera de llamados"
      className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center shadow-xl backdrop-blur-sm"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
        <Clock className="h-14 w-14 animate-pulse" aria-hidden="true" />
      </div>

      <h2 className="mt-8 text-3xl font-extrabold text-white sm:text-5xl">
        En espera del próximo llamado
      </h2>

      <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-slate-300 sm:text-2xl">
        El turno que esté siendo llamado se destacará aquí automáticamente.
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-5 py-2 text-sm font-semibold text-slate-300">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        Sistema en espera de actividad
      </div>
    </section>
  );
};

import { BellRing, Sparkles } from "lucide-react";
import type { ITurnoTvItem } from "@/models/ITurnos";

interface TvHighlightedTurnProps {
  turn: ITurnoTvItem;
}

export const TvHighlightedTurn = ({ turn }: TvHighlightedTurnProps) => {
  const moduloLabel = turn.moduloName || turn.moduloCode || "Módulo de atención";

  return (
    <section aria-label="Último turno llamado" className="relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-emerald-950/40 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-950/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 sm:text-sm">
          <BellRing className="h-4 w-4 animate-bounce text-emerald-400" aria-hidden="true" />
          <span>Último llamado</span>
        </div>
        <div className="flex items-center gap-2">
          {turn.priority === "PRIORITARIO" && <span className="flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-950/90 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-300 sm:text-sm"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Prioritario</span>}
          {typeof turn.callCount === "number" && turn.callCount > 1 && <span className="rounded-full border border-sky-400/50 bg-sky-950/80 px-3 py-1 text-xs font-bold text-sky-300">Llamado #{turn.callCount}</span>}
        </div>
      </div>
      <div className="my-8 text-center sm:my-12">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 sm:text-sm">Código de Turno</p>
        <p className="font-mono text-7xl font-black tracking-widest text-emerald-400 drop-shadow-md sm:text-8xl md:text-9xl">{turn.ticketCode}</p>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-center sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 sm:text-sm">Por favor diríjase a</p>
        <p className="mt-1 text-3xl font-black text-sky-400 sm:text-5xl md:text-6xl">{moduloLabel}</p>
        {turn.serviceName && <p className="mt-3 text-base font-semibold text-slate-300 sm:text-xl">{turn.serviceName}</p>}
      </div>
    </section>
  );
};

import { Sparkles, Users } from "lucide-react";
import type { ITurnoTvItem } from "@/models/ITurnos";

interface TvTurnListProps {
  turns: ITurnoTvItem[];
  highlightedTurnoId: number | null;
}

export const TvTurnList = ({ turns, highlightedTurnoId }: TvTurnListProps) => (
  <section aria-label="Listado de turnos en sala" className="flex flex-1 flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm">
    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-sky-400" aria-hidden="true" />
        <h2 className="text-lg font-bold text-white sm:text-xl">Turnos recientes en sala</h2>
      </div>
      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
        {turns.length} {turns.length === 1 ? "turno" : "turnos"}
      </span>
    </div>

    <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
      {turns.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 text-center text-slate-400">
          <Users className="h-8 w-8 text-slate-500" aria-hidden="true" />
          <p className="text-sm font-medium">No hay otros turnos llamados</p>
        </div>
      ) : turns.map((turn) => (
        <article
          key={turn.turnoId}
          className={`rounded-2xl border p-4 transition ${turn.turnoId === highlightedTurnoId ? "border-emerald-500/60 bg-emerald-950/40" : "border-slate-800 bg-slate-950/60"}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-2xl font-black tracking-wider text-white">{turn.ticketCode}</span>
            {turn.priority === "PRIORITARIO" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/80 px-2 py-1 text-[10px] font-black uppercase text-amber-300">
                <Sparkles className="h-3 w-3" aria-hidden="true" /> Prioritario
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-sky-300">
            {turn.moduloName || turn.moduloCode || "Módulo de atención"}
          </p>
          {turn.serviceName && <p className="mt-1 text-xs text-slate-400">{turn.serviceName}</p>}
        </article>
      ))}
    </div>
  </section>
);

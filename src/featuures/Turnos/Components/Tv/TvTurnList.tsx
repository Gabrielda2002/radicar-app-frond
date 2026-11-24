import { Clock, Users } from "lucide-react";
import type { ITurnoTvUpcomingItem } from "@/models/ITurnos";

interface TvTurnListProps {
  turns: ITurnoTvUpcomingItem[];
}

export const TvTurnList = ({ turns }: TvTurnListProps) => (
  <section
    aria-label="Próximos turnos"
    className="flex flex-1 flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm"
  >
    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-sky-400" aria-hidden="true" />
        <h2 className="text-lg font-bold text-white sm:text-xl">
          Próximos turnos
        </h2>
      </div>
      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
        {turns.length}
      </span>
    </div>

    <ol className="mt-4 flex-1 space-y-3">
      {turns.length === 0 ? (
        <li className="flex h-48 flex-col items-center justify-center gap-3 text-center text-slate-400">
          <Clock className="h-8 w-8 text-slate-500" aria-hidden="true" />
          <p className="text-sm font-medium">No hay turnos próximos</p>
        </li>
      ) : (
        turns.slice(0, 5).map((turn, index) => (
          <li
            key={turn.turnoId}
            className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4"
          >
            <span className="text-sm font-bold tabular-nums text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-2xl font-black tracking-wider text-white sm:text-3xl">
              {turn.ticketCode}
            </span>
          </li>
        ))
      )}
    </ol>
  </section>
);

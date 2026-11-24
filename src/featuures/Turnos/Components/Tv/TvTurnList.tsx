import { Users } from "lucide-react";
import type { ITurnoTvUpcomingItem } from "@/models/ITurnos";

interface TvTurnListProps {
  turns: ITurnoTvUpcomingItem[];
}

export const TvTurnList = ({ turns }: TvTurnListProps) => (
  <section
    aria-label="Próximos turnos"
    className="p-4 bg-slate-900/70 border border-slate-800 rounded-3xl sm:px-5"
  >
    <div className="flex items-center justify-between">
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

    {turns.length === 0 ? (
      <p className="mt-2 text-sm font-medium text-slate-300">
        No hay turnos próximos
      </p>
    ) : (
      <ol className="grid grid-cols-2 gap-2 mt-3 sm:grid-cols-3 lg:grid-cols-5">
        {turns.slice(0, 5).map((turn, index) => (
          <li
            key={turn.turnoId}
            className="flex items-center justify-center gap-3 px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl"
          >
            <span className="text-sm font-bold tabular-nums text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-2xl font-black tracking-wider text-white sm:text-3xl">
              {turn.ticketCode}
            </span>
          </li>
        ))}
      </ol>
    )}
  </section>
);

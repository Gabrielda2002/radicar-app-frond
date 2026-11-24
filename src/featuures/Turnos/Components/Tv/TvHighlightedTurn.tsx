import { BellRing } from "lucide-react";
import type { ITurnoTvItem } from "@/models/ITurnos";

interface TvHighlightedTurnProps {
  turn: ITurnoTvItem;
}

export const TvHighlightedTurn = ({ turn }: TvHighlightedTurnProps) => {
  const destination =
    turn.moduloName?.trim() ||
    (turn.moduloCode ? `Módulo ${turn.moduloCode}` : "Módulo no informado");

  return (
    <section
      aria-label="Último turno llamado"
      className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-emerald-950/40 sm:p-8"
    >
      {/* Glow pulsante de fondo */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-950/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 sm:text-sm">
          <BellRing
            className="h-4 w-4 animate-bounce text-emerald-400"
            aria-hidden="true"
          />
          <span>Último llamado</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 sm:text-sm">
          Esté atento a su llamado
        </span>
      </div>

      <div className="my-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 sm:text-sm">
          Código de Turno
        </p>
        <p className="font-mono text-7xl font-black tracking-widest text-emerald-400 drop-shadow-md sm:text-8xl md:text-9xl">
          {turn.ticketCode}
        </p>
      </div>

      <p className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center text-lg font-semibold text-slate-300 sm:text-xl">
        {destination}
      </p>
    </section>
  );
};

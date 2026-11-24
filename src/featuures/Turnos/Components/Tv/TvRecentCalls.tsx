import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import type { ITurnoTvRecentCall } from "@/models/ITurnos";

interface TvRecentCallsProps {
  calls: ITurnoTvRecentCall[];
}

export const TvRecentCalls = ({ calls }: TvRecentCallsProps) => {
  const [, refreshElapsedTime] = useState(0);
  const hasCalls = calls.length > 0;

  useEffect(() => {
    if (!hasCalls) return;
    const timer = window.setInterval(
      () => refreshElapsedTime((tick) => tick + 1),
      60_000,
    );
    return () => window.clearInterval(timer);
  }, [hasCalls]);

  return (
    <section
      aria-labelledby="recent-calls-title"
      className="flex-1 p-5 bg-slate-900/70 border border-slate-800 rounded-3xl"
    >
      <h2
        id="recent-calls-title"
        className="flex items-center gap-2 pb-3 text-lg font-bold text-white border-b border-slate-800 sm:text-xl"
      >
        <History className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        Últimos llamados
      </h2>
      {!hasCalls ? (
        <p className="pt-3 text-slate-300">No hay llamados recientes</p>
      ) : (
        <ol className="mt-3 space-y-2">
          {calls.slice(0, 5).map((call) => (
            <li
              key={`${call.ticketCode}-${call.calledAt}`}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl"
            >
              <span className="font-mono text-2xl font-black text-emerald-300">
                {call.ticketCode}
              </span>
              <span className="text-base font-medium break-words text-slate-200">
                {call.moduloName?.trim() ||
                  (call.moduloCode
                    ? `Módulo ${call.moduloCode}`
                    : "Módulo no informado")}
              </span>
              <time
                dateTime={call.calledAt}
                className="text-right text-sm font-semibold whitespace-nowrap tabular-nums text-slate-300 sm:text-base"
              >
                {formatRelativeTime(call.calledAt)}
              </time>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

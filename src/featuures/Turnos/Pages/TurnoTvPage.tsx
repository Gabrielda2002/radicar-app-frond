import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useStoreTurnoTv } from "../store/useStoreTurnoTv";
import { useTurnoTvLive } from "../hooks/useTurnoTvLive";
import { TvHeader } from "../Components/Tv/TvHeader";
import { TvOfflineBanner } from "../Components/Tv/TvOfflineBanner";
import { TvHighlightedTurn } from "../Components/Tv/TvHighlightedTurn";
import { TvTurnList } from "../Components/Tv/TvTurnList";
import { TvWaitingState } from "../Components/Tv/TvWaitingState";

const TurnoTvPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const safeSlug = slug || "";

  const {
    data,
    error,
    isLoading,
    isLiveConnected,
    isOutdated,
    highlightedTurnoId,
    load,
    reset,
  } = useStoreTurnoTv();

  const { soundEnabled, toggleSound } = useTurnoTvLive(
    safeSlug,
    data?.headquarter.id
  );

  useEffect(() => {
    if (safeSlug) {
      void load(safeSlug);
    }
    return () => {
      reset();
    };
  }, [safeSlug, load, reset]);

  if (error && !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-center text-white">
        <div className="max-w-md rounded-3xl border border-red-500/30 bg-slate-900 p-8 shadow-2xl">
          <AlertCircle
            className="mx-auto h-16 w-16 text-red-400"
            aria-hidden="true"
          />
          <h1 className="mt-4 text-2xl font-black text-white">
            No pudimos cargar la pantalla de la sede
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {error}
          </p>
          <button
            type="button"
            onClick={() => safeSlug && void load(safeSlug)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div
        role="status"
        className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-center text-white"
      >
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="mt-6 text-xl font-bold tracking-wide text-slate-300">
          Cargando pantalla de turnos…
        </p>
      </div>
    );
  }

  const activeTurns = data?.activeTurns || [];
  const upcomingTurns = data?.upcomingTurns || [];
  const highlightedTurn =
    activeTurns.find((t) => t.turnoId === highlightedTurnoId) ||
    activeTurns.find((t) => t.status === "LLAMADO") ||
    activeTurns[0];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white selection:bg-emerald-500 selection:text-slate-950">
      <TvHeader
        headquarterName={data?.headquarter.name}
        isLiveConnected={isLiveConnected}
        isOutdated={isOutdated}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <TvOfflineBanner isOutdated={isOutdated} />

      <main className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
        {activeTurns.length === 0 && upcomingTurns.length === 0 ? (
          <TvWaitingState />
        ) : (
          <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-7 xl:col-span-8">
              {highlightedTurn ? (
                <TvHighlightedTurn turn={highlightedTurn} />
              ) : (
                <TvWaitingState />
              )}
            </div>

            <div className="flex flex-col lg:col-span-5 xl:col-span-4">
              <TvTurnList
                turns={upcomingTurns}
              />
            </div>
          </div>
        )}
      </main>

      {!soundEnabled && (
        <aside
          aria-label="Aviso de sonido"
          className="border-t border-slate-800 bg-slate-900/60 px-4 py-3 text-center text-xs font-medium text-slate-400"
        >
          El audio está desactivado. Para escuchar los llamados por voz, pulsa el botón{" "}
          <strong className="text-amber-300">«Activar audio»</strong> en la barra superior.
        </aside>
      )}
    </div>
  );
};

export default TurnoTvPage;

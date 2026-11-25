import { useEffect, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";
import logo from "@/assets/Layout/logo-navbar.png";

interface TvHeaderProps {
  headquarterName?: string;
  isLiveConnected: boolean;
  isOutdated: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  diagnostics: ReactNode;
}

export const TvHeader = ({
  headquarterName,
  isLiveConnected,
  isOutdated,
  soundEnabled,
  onToggleSound,
  diagnostics,
}: TvHeaderProps) => {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
      setDateString(
        now.toLocaleDateString("es-CO", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/90 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="NordVital IPS"
          className="h-10 w-auto object-contain md:h-12"
        />
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            NordVital IPS · Sala de Espera
          </span>
          <h1 className="text-xl font-extrabold text-white sm:text-2xl">
            {headquarterName || "Sede de Atención"}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        <div className="text-right hidden sm:block">
          <p className="font-mono text-2xl font-black tracking-tight text-white md:text-3xl">
            {timeString}
          </p>
          <p className="text-xs font-medium capitalize text-slate-400">
            {dateString}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isLiveConnected && !isOutdated ? (
            <span
              role="status"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-3.5 py-1.5 text-xs font-bold text-emerald-300 md:text-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              En vivo
            </span>
          ) : (
            <span
              role="status"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/70 px-3.5 py-1.5 text-xs font-bold text-amber-300 md:text-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              Reconectando
            </span>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={
              soundEnabled
                ? "Desactivar anuncios de voz"
                : "Activar anuncios de voz"
            }
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition md:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 ${
              soundEnabled
                ? "border border-emerald-500/50 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 focus:ring-emerald-500"
                : "bg-amber-400 text-slate-950 hover:bg-amber-300 focus:ring-amber-400 animate-bounce"
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                <span>Audio habilitado</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                <span>Activar audio</span>
              </>
            )}
          </button>
        </div>
        {diagnostics}
      </div>
    </header>
  );
};

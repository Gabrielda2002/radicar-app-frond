import { WifiOff } from "lucide-react";

interface TvOfflineBannerProps {
  isOutdated: boolean;
}

export const TvOfflineBanner = ({ isOutdated }: TvOfflineBannerProps) => {
  if (!isOutdated) return null;

  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 bg-amber-500 px-4 py-2.5 text-center text-sm font-bold text-slate-950 shadow-md"
    >
      <WifiOff className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>
        Conexión interrumpida con el servidor. Mostrando últimos turnos conocidos mientras se restablece la conexión…
      </span>
    </div>
  );
};

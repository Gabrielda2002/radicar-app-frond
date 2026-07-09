import { cn, formatPercent } from "../../lib/utils";

/**
 * Badge de porcentaje unificado para las tablas (cumplimiento vs meta).
 * Estilo: rectangulo redondeado (rounded-md), ancho minimo y centrado, para
 * que se vea igual con "0%" o con "242,9%". Color por rango:
 *   null -> gris | <80 rojo | >120 morado | 80-120 verde (en meta).
 */
export function PctBadge({ value, className }: { value: number | null; className?: string }) {
  const cls =
    value == null
      ? 'bg-outline-variant'
      : value < 80
        ? 'bg-status-low'
        : value > 120
          ? 'bg-status-over'
          : 'bg-status-on-target';
  return (
    <span
      className={cn(
        'inline-flex min-w-[3.25rem] justify-center rounded-md px-2 py-1 text-[11px] font-bold text-white tabular-nums',
        cls,
        className,
      )}
    >
      {formatPercent(value)}
    </span>
  );
}

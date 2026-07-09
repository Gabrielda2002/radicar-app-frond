import { cn } from "../../lib/utils";

/** Clasifica % cumplimiento segun los rangos definidos en Stitch */
export type HeatmapBucket = 'low' | 'low-light' | 'target' | 'over-light' | 'over';

export function bucketize(pct: number | null | undefined): HeatmapBucket | 'empty' {
  if (pct === null || pct === undefined || Number.isNaN(pct)) return 'empty';
  if (pct < 80) return pct < 60 ? 'low' : 'low-light';
  if (pct <= 110) return 'target';
  return pct > 130 ? 'over' : 'over-light';
}

const bucketClass: Record<HeatmapBucket | 'empty', string> = {
  low: 'bg-[#D32F2F] text-white',
  'low-light': 'bg-[rgba(211,47,47,0.12)] text-[#D32F2F]',
  target: 'bg-[#10B981] text-white',
  'over-light': 'bg-[rgba(139,92,246,0.12)] text-[#7C3AED]',
  over: 'bg-[#8B5CF6] text-white',
  empty: 'bg-surface-container text-on-surface-variant',
};

interface HeatmapCellProps {
  value: number | null | undefined;
  /** Override del bucket calculado */
  bucket?: HeatmapBucket | 'empty';
  /** Texto a mostrar (por defecto pct con %) */
  display?: string;
  className?: string;
}

export function HeatmapCell({ value, bucket, display, className }: HeatmapCellProps) {
  const b = bucket ?? bucketize(value ?? null);
  const text = display ?? (value != null ? `${Math.round(value)}%` : '—');
  return (
    <span
      className={cn(
        'inline-flex min-w-[3.25rem] justify-center rounded-md px-2 py-1 text-center text-[11px] font-bold tabular-nums',
        bucketClass[b],
        className,
      )}
    >
      {text}
    </span>
  );
}

export function HeatmapLegend() {
  return (
    <div className="flex items-center gap-4">
      <LegendItem color="#D32F2F" label="<80%" />
      <LegendItem color="#10B981" label="80-110%" />
      <LegendItem color="#8B5CF6" label=">110%" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="h-3 w-3 rounded-sm" style={{ background: color }} />
      <span className="text-[10px] text-on-surface-variant">{label}</span>
    </div>
  );
}

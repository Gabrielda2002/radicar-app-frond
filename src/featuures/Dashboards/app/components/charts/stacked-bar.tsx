import { cn } from "../../lib/utils";

export interface StackedSegment {
  value: number;
  /** Color hex o token Tailwind; usa bgClass si quieres token */
  color?: string;
  bgClass?: string;
  label?: string;
}

interface StackedBarProps {
  segments: StackedSegment[];
  /** Si los valores ya estan en %, omite normalizacion */
  normalized?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Barra apilada horizontal (cumplida / incumplida / cancelada, etc.).
 * Los `segments` se normalizan al total a menos que se indique `normalized`.
 */
export function StackedBar({ segments, normalized = false, height = 'md', className }: StackedBarProps) {
  const total = normalized ? 100 : segments.reduce((acc, s) => acc + s.value, 0) || 1;
  const h = height === 'sm' ? 'h-2' : height === 'lg' ? 'h-5' : 'h-4';
  return (
    <div
      className={cn(
        'flex w-full overflow-hidden rounded-full bg-surface-container-highest',
        h,
        className,
      )}
    >
      {segments.map((s, i) => {
        const pct = (s.value / total) * 100;
        return (
          <div
            key={i}
            className={cn('h-full transition-all hover:brightness-110', s.bgClass)}
            style={{ width: `${pct}%`, background: s.bgClass ? undefined : s.color }}
            title={s.label ? `${s.label}: ${s.value}` : `${s.value}`}
          />
        );
      })}
    </div>
  );
}

import { cn } from "../../lib/utils";

interface SparklineProps {
  /** Valores numericos (cualquier escala; se normalizan al maximo del array) */
  values: number[];
  tone?: 'turquoise' | 'green' | 'amber' | 'red' | 'navy' | 'primary' | 'secondary';
  className?: string;
}

type Tone = NonNullable<SparklineProps['tone']>;

/**
 * Tablas estaticas: Tailwind JIT no detecta nombres de clase concatenados,
 * asi que mapeamos cada combinacion (tone + intensity) a una clase completa.
 */
const toneBars: Record<Tone, { full: string; soft: string; mid: string }> = {
  turquoise: { full: 'bg-corporate-turquoise', soft: 'bg-corporate-turquoise/60', mid: 'bg-corporate-turquoise/80' },
  green: { full: 'bg-normative-green', soft: 'bg-normative-green/60', mid: 'bg-normative-green/80' },
  amber: { full: 'bg-normative-amber', soft: 'bg-normative-amber/60', mid: 'bg-normative-amber/80' },
  red: { full: 'bg-normative-red', soft: 'bg-normative-red/60', mid: 'bg-normative-red/80' },
  navy: { full: 'bg-corporate-navy', soft: 'bg-corporate-navy/60', mid: 'bg-corporate-navy/80' },
  primary: { full: 'bg-primary', soft: 'bg-primary/60', mid: 'bg-primary/80' },
  secondary: { full: 'bg-secondary', soft: 'bg-secondary/60', mid: 'bg-secondary/80' },
};

/**
 * Sparkline minimalista: barras verticales escaladas al maximo.
 * Para series chicas (5-12 puntos) tipo "tendencia ultimos meses".
 * Para series mas complejas usa <LineChart /> de recharts.
 */
export function Sparkline({ values, tone = 'turquoise', className }: SparklineProps) {
  if (values.length === 0) {
    return <div className={cn('h-16 rounded bg-outline-variant/10', className)} />;
  }
  const max = Math.max(...values, 1);
  const palette = toneBars[tone];
  return (
    <div className={cn('flex h-16 items-end gap-1', className)}>
      {values.map((v, i) => {
        const pct = Math.max(4, (v / max) * 100);
        const bg = i === values.length - 1 ? palette.full : i === 0 ? palette.soft : palette.mid;
        return (
          <div
            key={i}
            className={cn('w-full rounded-t-sm', bg)}
            style={{ height: `${pct}%` }}
          />
        );
      })}
    </div>
  );
}

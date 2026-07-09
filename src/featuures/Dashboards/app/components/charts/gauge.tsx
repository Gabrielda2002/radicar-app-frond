import { type ReactNode } from 'react';
import { Card } from '@dash/components/ui/card';
import { cn, clampPercent } from '@dash/lib/utils';

type GaugeTone = 'primary' | 'secondary' | 'error' | 'green' | 'amber';

const toneClass: Record<GaugeTone, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  error: 'text-error',
  green: 'text-normative-green',
  amber: 'text-normative-amber',
};

interface GaugeProps {
  /** Valor mostrado en el centro (ej. "1.8") */
  value: ReactNode;
  /** Unidad debajo del valor (ej. "Días") */
  unit?: string;
  /** % de la circunferencia llenado (0..100) */
  fillPct: number;
  tone?: GaugeTone;
  size?: number;
  className?: string;
}

/**
 * Gauge: indicador circular SVG. Llena un arco proporcional a `fillPct`.
 */
function Gauge({
  value,
  unit,
  fillPct,
  tone = 'secondary',
  size = 144,
  className,
}: GaugeProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clampPercent(fillPct) / 100);

  return (
    <div className={cn('relative inline-block', className)} style={{ width: size, height: size }}>
      <svg className="gauge-svg h-full w-full" viewBox="0 0 100 100">
        <circle
          className="text-surface-variant/50"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className={toneClass[tone]}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-headline-lg text-on-surface">{value}</span>
        {unit && (
          <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

interface GaugeCardProps extends GaugeProps {
  title: string;
  footer?: ReactNode;
}

export function GaugeCard({ title, footer, ...gaugeProps }: GaugeCardProps) {
  return (
    <Card className="flex flex-col items-center p-gutter text-center card-shadow-hover">
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="text-label-md font-bold text-on-surface-variant">{title}</span>
      </div>
      <div className="mb-6">
        <Gauge {...gaugeProps} />
      </div>
      {footer && (
        <div className="flex items-center gap-1 text-label-md">{footer}</div>
      )}
    </Card>
  );
}

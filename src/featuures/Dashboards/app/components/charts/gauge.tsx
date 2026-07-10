import { type ReactNode } from 'react';
import { Card } from '@dash/components/ui/card';
import { cn, clampPercent } from '@dash/lib/utils';

type GaugeTone = 'primary' | 'secondary' | 'error' | 'green' | 'amber';

const toneClass: Record<GaugeTone, string> = {
  primary: 'text-[#00776f]',
  secondary: 'text-[#049AE7]',
  error: 'text-red-500',
  green: 'text-green-500',
  amber: 'text-amber-500',
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
          className="text-gray-200 dark:text-gray-700"
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
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        {unit && (
          <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 dark:text-gray-400">
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
    <Card className="flex flex-col items-center p-5 text-center hover:shadow-md">
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{title}</span>
      </div>
      <div className="mb-6">
        <Gauge {...gaugeProps} />
      </div>
      {footer && (
        <div className="flex items-center gap-1 text-xs">{footer}</div>
      )}
    </Card>
  );
}

import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/card';
import { clampPercent, cn } from '../../lib/utils';
import { NumberTicker } from '../motion/number-ticker';
import { PulseHighlight } from '../motion/pulse-highlight';
import { Badge, type BadgeProps } from '../ui/badge';


export type KpiAccent =
  | 'turquoise'
  | 'navy'
  | 'amber'
  | 'red'
  | 'red-light'
  | 'green'
  | 'secondary'
  | 'outline';

const accentBorder: Record<KpiAccent, string> = {
  turquoise: 'border-l-[#049AE7]',
  navy: 'border-l-[#0B3B5E]',
  amber: 'border-l-amber-500',
  red: 'border-l-red-500',
  'red-light': 'border-l-red-400',
  green: 'border-l-green-500',
  secondary: 'border-l-[#00776f]',
  outline: 'border-l-gray-300 dark:border-l-gray-600',
};

const accentBar: Record<KpiAccent, string> = {
  turquoise: 'bg-[#049AE7]',
  navy: 'bg-[#0B3B5E]',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  'red-light': 'bg-red-400',
  green: 'bg-green-500',
  secondary: 'bg-[#00776f]',
  outline: 'bg-gray-300 dark:bg-gray-600',
};

/** Color del pulso de alerta segun accent (solo rojo/amarillo lo activan). */
const accentPulseColor: Partial<Record<KpiAccent, string>> = {
  red: '#D32F2F',
  'red-light': '#EF5350',
  amber: '#FBC02D',
};

const trendColor = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-600 dark:text-red-400',
  flat: 'text-gray-500 dark:text-gray-400',
} as const;

const TrendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
} as const;

export interface KpiCardProps {
  label: string;
  value: ReactNode;
  /**
   * Si se provee, el valor se anima como cuenta (NumberTicker) y `value`
   * se ignora para el render del numero. Usar para KPIs numericos.
   */
  ticker?: {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    grouping?: boolean;
  };
  /** Texto subordinado bajo el valor o sustituyendo barra de progreso */
  caption?: ReactNode;
  /** % entre 0 y 100 para barra inferior */
  progress?: number;
  /** Etiqueta superior derecha (delta o estado) */
  delta?: {
    value: string;
    trend?: 'up' | 'down' | 'flat';
    variant?: BadgeProps['variant'];
  };
  /** Color del borde izquierdo y barra de progreso */
  accent?: KpiAccent;
  /** Icono opcional al lado del delta */
  icon?: ReactNode;
  /**
   * Pulso de alerta. 'auto' (default): pulsa si accent es red/amber.
   * true/false fuerza el comportamiento. El color sigue al accent.
   */
  pulse?: boolean | 'auto';
  className?: string;
}

export function KpiCard({
  label,
  value,
  ticker,
  caption,
  progress,
  delta,
  accent = 'turquoise',
  icon,
  pulse = 'auto',
  className,
}: KpiCardProps) {
  const pulseColor = accentPulseColor[accent];
  const shouldPulse = pulse === 'auto' ? Boolean(pulseColor) : pulse && Boolean(pulseColor);

  const card = (
    <Card
      className={cn(
        'h-full border-l-[3px] transition-all hover:shadow-md p-5',
        accentBorder[accent],
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </span>
        {delta && (
          <Badge variant={delta.variant ?? 'neutral'}>
            {delta.trend && deltaIcon(delta.trend)}
            {delta.value}
          </Badge>
        )}
        {!delta && icon}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-[#0B3B5E] dark:text-white">
          {ticker ? (
            <NumberTicker
              value={ticker.value}
              decimals={ticker.decimals}
              prefix={ticker.prefix}
              suffix={ticker.suffix}
              grouping={ticker.grouping}
            />
          ) : (
            value
          )}
        </h3>
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className={cn('h-full rounded-full transition-all duration-700', accentBar[accent])}
            style={{ width: `${clampPercent(progress)}%` }}
          />
        </div>
      )}
      {caption && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">{caption}</p>
      )}
    </Card>
  );

  if (shouldPulse) {
    return (
      <PulseHighlight color={pulseColor} className="h-full">
        {card}
      </PulseHighlight>
    );
  }
  return card;
}

function deltaIcon(trend: 'up' | 'down' | 'flat') {
  const Icon = TrendIcon[trend];
  return <Icon className={cn('h-3 w-3', trendColor[trend])} />;
}

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
  turquoise: 'border-l-corporate-turquoise',
  navy: 'border-l-corporate-navy',
  amber: 'border-l-normative-amber',
  red: 'border-l-normative-red',
  'red-light': 'border-l-[#EF5350]',
  green: 'border-l-normative-green',
  secondary: 'border-l-secondary',
  outline: 'border-l-outline-variant',
};

const accentBar: Record<KpiAccent, string> = {
  turquoise: 'bg-corporate-turquoise',
  navy: 'bg-corporate-navy',
  amber: 'bg-normative-amber',
  red: 'bg-normative-red',
  'red-light': 'bg-[#EF5350]',
  green: 'bg-normative-green',
  secondary: 'bg-secondary',
  outline: 'bg-outline-variant',
};

/** Color del pulso de alerta segun accent (solo rojo/amarillo lo activan). */
const accentPulseColor: Partial<Record<KpiAccent, string>> = {
  red: '#D32F2F',
  'red-light': '#EF5350',
  amber: '#FBC02D',
};

const trendColor = {
  up: 'text-normative-green',
  down: 'text-normative-red',
  flat: 'text-on-surface-variant',
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
        'h-full border-l-4 transition-all card-shadow-hover p-6',
        accentBorder[accent],
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="text-label-md uppercase tracking-wider text-on-surface-variant">
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
        <h3 className="text-headline-lg text-corporate-navy">
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
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
          <div
            className={cn('h-full rounded-full transition-all duration-700', accentBar[accent])}
            style={{ width: `${clampPercent(progress)}%` }}
          />
        </div>
      )}
      {caption && (
        <p className="mt-2 text-[10px] text-on-surface-variant">{caption}</p>
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

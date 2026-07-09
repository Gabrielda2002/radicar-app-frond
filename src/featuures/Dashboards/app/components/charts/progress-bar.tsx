import { clampPercent, cn } from "../../lib/utils";

export type ProgressTone = 'navy' | 'turquoise' | 'green' | 'amber' | 'red' | 'red-light' | 'primary' | 'secondary';

const toneClass: Record<ProgressTone, string> = {
  navy: 'bg-corporate-navy',
  turquoise: 'bg-corporate-turquoise',
  green: 'bg-normative-green',
  amber: 'bg-normative-amber',
  red: 'bg-normative-red',
  'red-light': 'bg-[#EF5350]',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
};

interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ value, tone = 'turquoise', height = 'md', className }: ProgressBarProps) {
  const h = height === 'sm' ? 'h-1.5' : height === 'lg' ? 'h-3' : 'h-2';
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-surface-container-high', h, className)}>
      <div
        className={cn('h-full rounded-full transition-all', toneClass[tone])}
        style={{ width: `${clampPercent(value)}%` }}
      />
    </div>
  );
}

interface ProgressListItem {
  label: string;
  value: number;
  display?: string;
  tone?: ProgressTone;
}

interface ProgressListProps {
  items: ProgressListItem[];
  /** Tono por defecto si el item no especifica */
  defaultTone?: ProgressTone;
  className?: string;
}

export function ProgressList({ items, defaultTone = 'turquoise', className }: ProgressListProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((it) => (
        <div key={it.label} className="space-y-1">
          <div className="flex items-center justify-between text-[12px] font-bold text-on-surface">
            <span>{it.label}</span>
            <span className={cn('text-on-surface-variant', it.tone && toneTextClass[it.tone])}>
              {it.display ?? `${it.value.toFixed(1)}%`}
            </span>
          </div>
          <ProgressBar value={it.value} tone={it.tone ?? defaultTone} />
        </div>
      ))}
    </div>
  );
}

const toneTextClass: Record<ProgressTone, string> = {
  navy: 'text-corporate-navy',
  turquoise: 'text-corporate-turquoise',
  green: 'text-normative-green',
  amber: 'text-normative-amber',
  red: 'text-normative-red',
  'red-light': 'text-[#EF5350]',
  primary: 'text-primary',
  secondary: 'text-secondary',
};

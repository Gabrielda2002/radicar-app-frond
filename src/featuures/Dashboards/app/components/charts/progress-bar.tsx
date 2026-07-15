import { clampPercent, cn } from "../../lib/utils";

type ProgressTone = 'navy' | 'turquoise' | 'green' | 'amber' | 'red' | 'red-light' | 'primary' | 'secondary';

const toneClass: Record<ProgressTone, string> = {
  navy: 'bg-[#0B3B5E]',
  turquoise: 'bg-[#049AE7]',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  'red-light': 'bg-red-400',
  primary: 'bg-[#00776f]',
  secondary: 'bg-[#00776f]',
};

interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

function ProgressBar({ value, tone = 'turquoise', height = 'md', className }: ProgressBarProps) {
  const h = height === 'sm' ? 'h-1.5' : height === 'lg' ? 'h-3' : 'h-2';
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700', h, className)}>
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
          <div className="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white">
            <span>{it.label}</span>
            <span className={cn('text-gray-500 dark:text-gray-400', it.tone && toneTextClass[it.tone])}>
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
  navy: 'text-[#0B3B5E] dark:text-white',
  turquoise: 'text-[#049AE7]',
  green: 'text-green-600 dark:text-green-400',
  amber: 'text-amber-600 dark:text-amber-400',
  red: 'text-red-600 dark:text-red-400',
  'red-light': 'text-red-400',
  primary: 'text-[#00776f]',
  secondary: 'text-[#00776f]',
};

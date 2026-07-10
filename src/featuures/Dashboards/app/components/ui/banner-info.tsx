import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@dash/lib/utils';

const BASE = 'rounded-lg border-l-4 p-3 flex items-start gap-3';

const BANNER_STYLES: Record<string, string> = {
  info: `${BASE} bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950 dark:text-blue-200`,
  warning: `${BASE} bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950 dark:text-amber-200`,
  danger: `${BASE} bg-red-50 border-red-400 text-red-900 dark:bg-red-950 dark:text-red-200`,
  success: `${BASE} bg-green-50 border-green-400 text-green-900 dark:bg-green-950 dark:text-green-200`,
};

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
} as const;

const iconColorMap = {
  info: 'text-blue-500',
  warning: 'text-amber-500',
  danger: 'text-red-500',
  success: 'text-green-500',
} as const;

export interface BannerInfoProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'warning' | 'danger' | 'success';
  title?: ReactNode;
  description?: ReactNode;
}

export const BannerInfo = forwardRef<HTMLDivElement, BannerInfoProps>(function BannerInfo(
  { className, variant = 'info', title, description, children, ...props },
  ref,
) {
  const Icon = iconMap[variant ?? 'info'];
  return (
    <div ref={ref} className={cn(BANNER_STYLES[variant ?? 'info'], className)} {...props}>
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColorMap[variant ?? 'info'])} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold text-[13px] text-gray-900 dark:text-white">{title}</p>}
        {description && (
          <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
});

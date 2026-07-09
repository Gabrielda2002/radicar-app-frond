import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@dash/lib/utils';

const BASE = 'rounded-lg border-l-4 p-3 flex items-start gap-3';

const BANNER_STYLES: Record<string, string> = {
  info: `${BASE} bg-secondary-container/30 border-secondary text-on-secondary-container`,
  warning: `${BASE} bg-normative-amber/15 border-normative-amber`,
  danger: `${BASE} bg-error-container/30 border-normative-red`,
  success: `${BASE} bg-tertiary-container/30 border-normative-green`,
};

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
} as const;

const iconColorMap = {
  info: 'text-on-secondary-container',
  warning: 'text-normative-amber',
  danger: 'text-normative-red',
  success: 'text-normative-green',
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
        {title && <p className="font-bold text-[13px] text-on-surface">{title}</p>}
        {description && (
          <p className="text-[11px] text-on-surface-variant mt-0.5">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
});

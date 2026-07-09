import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@dash/lib/utils';

const bannerVariants = cva(
  'rounded-lg border-l-4 p-3 flex items-start gap-3',
  {
    variants: {
      variant: {
        info: 'bg-secondary-container/30 border-secondary text-on-secondary-container',
        warning: 'bg-normative-amber/15 border-normative-amber',
        danger: 'bg-error-container/30 border-normative-red',
        success: 'bg-tertiary-container/30 border-normative-green',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

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

export interface BannerInfoProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof bannerVariants> {
  title?: ReactNode;
  description?: ReactNode;
}

export const BannerInfo = forwardRef<HTMLDivElement, BannerInfoProps>(function BannerInfo(
  { className, variant = 'info', title, description, children, ...props },
  ref,
) {
  const Icon = iconMap[variant ?? 'info'];
  return (
    <div ref={ref} className={cn(bannerVariants({ variant }), className)} {...props}>
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

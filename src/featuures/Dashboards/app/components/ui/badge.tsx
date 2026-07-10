import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@dash/lib/utils';

const BASE = 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider border';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
type BadgeSize = 'default' | 'sm';

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  neutral: `${BASE} bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600`,
  success: `${BASE} bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400 dark:border-green-700`,
  warning: `${BASE} bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700`,
  danger: `${BASE} bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-400 dark:border-red-700`,
  info: `${BASE} bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-700`,
  primary: `${BASE} bg-[#00776f] text-white border-[#00776f]`,
};

const BADGE_SIZES: Record<BadgeSize, string> = {
  default: 'text-[10px]',
  sm: 'text-[9px] px-1.5 py-0.5',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(BADGE_VARIANTS[variant ?? 'neutral'], BADGE_SIZES[size ?? 'default'], className)} {...props} />
  );
});

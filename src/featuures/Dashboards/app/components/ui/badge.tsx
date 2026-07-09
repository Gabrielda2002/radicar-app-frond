import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@dash/lib/utils';

const BASE = 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider border';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
type BadgeSize = 'default' | 'sm';

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  neutral: `${BASE} bg-surface-container text-on-surface-variant border-outline-variant/40`,
  success: `${BASE} bg-tertiary-container/30 text-normative-green border-normative-green/30`,
  warning: `${BASE} bg-normative-amber/15 text-normative-amber border-normative-amber/40`,
  danger: `${BASE} bg-error-container text-normative-red border-normative-red/30`,
  info: `${BASE} bg-secondary-container text-on-secondary-container border-secondary/30`,
  primary: `${BASE} bg-primary-container text-white border-primary-container`,
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

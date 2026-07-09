import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@dash/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider border',
  {
    variants: {
      variant: {
        neutral:
          'bg-surface-container text-on-surface-variant border-outline-variant/40',
        success:
          'bg-tertiary-container/30 text-normative-green border-normative-green/30',
        warning:
          'bg-normative-amber/15 text-normative-amber border-normative-amber/40',
        danger:
          'bg-error-container text-normative-red border-normative-red/30',
        info: 'bg-secondary-container text-on-secondary-container border-secondary/30',
        primary: 'bg-primary-container text-white border-primary-container',
      },
      size: {
        default: 'text-[10px]',
        sm: 'text-[9px] px-1.5 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
});

export { badgeVariants };

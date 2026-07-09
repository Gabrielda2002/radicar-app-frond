import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@dash/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-label-md font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-corporate-navy text-white hover:opacity-90',
        primary: 'bg-primary text-on-primary hover:opacity-90',
        secondary: 'bg-corporate-turquoise text-white hover:opacity-90 shadow-sm',
        outline:
          'border border-outline-variant bg-card text-on-surface-variant hover:bg-surface-container-low',
        ghost: 'text-on-surface-variant hover:bg-surface-container-low',
        destructive: 'bg-error text-on-error hover:opacity-90',
        link: 'text-secondary underline-offset-4 hover:underline tracking-normal normal-case',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-[11px]',
        lg: 'h-12 px-6',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

export { buttonVariants };

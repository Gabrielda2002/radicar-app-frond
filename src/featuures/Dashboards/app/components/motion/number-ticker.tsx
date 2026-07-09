import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { cn } from '@dash/lib/utils';

interface NumberTickerProps {
  /** Valor final a alcanzar. */
  value: number;
  /** Decimales a mostrar. */
  decimals?: number;
  /** Prefijo (ej. "$"). */
  prefix?: string;
  /** Sufijo (ej. "%", " d"). */
  suffix?: string;
  /** Separador de miles con Intl (es-CO). */
  grouping?: boolean;
  className?: string;
}

/**
 * NumberTicker: anima un numero desde 0 hasta `value` con spring cuando
 * entra en viewport. Respeta prefers-reduced-motion (muestra el valor final
 * sin animar). Pensado para los KPIs de los dashboards.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  grouping = true,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 28, stiffness: 90 });

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const fmt = (n: number) =>
    grouping
      ? n.toLocaleString('es-CO', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : n.toFixed(decimals);

  useEffect(() => {
    if (prefersReduced) return;
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue, prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const unsub = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${fmt(latest)}${suffix}`;
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spring, prefix, suffix, decimals, grouping, prefersReduced]);

  // Valor inicial estatico (y unico render cuando reduce-motion).
  const initial = prefersReduced ? value : 0;

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {`${prefix}${fmt(initial)}${suffix}`}
    </span>
  );
}

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@dash/lib/utils';

interface PulseHighlightProps {
  children: ReactNode;
  /** Color del halo (rgb/hex). Default rojo normativo. */
  color?: string;
  /** Activa el pulso. Si es false, renderiza sin animar. */
  active?: boolean;
  className?: string;
}

/**
 * PulseHighlight: envuelve una sección (p.ej. una card de alerta) y le aplica
 * un halo que late suavemente para llamar la atención sin recorrido. Útil
 * cuando el contenido se refresca por carrusel/filtros. Respeta
 * prefers-reduced-motion (queda estático con un borde tenue).
 */
export function PulseHighlight({
  children,
  color = '#D32F2F',
  active = true,
  className,
}: PulseHighlightProps) {
  const reduce = useReducedMotion();

  if (!active) return <div className={className}>{children}</div>;

  if (reduce) {
    return (
      <div className={cn('rounded-xl', className)} style={{ boxShadow: `0 0 0 1px ${color}44` }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn('rounded-xl', className)}
      initial={{ boxShadow: `0 0 0 0px ${color}00` }}
      animate={{
        boxShadow: [
          `0 0 0 0px ${color}00`,
          `0 0 0 3px ${color}33`,
          `0 0 0 0px ${color}00`,
        ],
      }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

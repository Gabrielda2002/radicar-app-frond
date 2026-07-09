import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BlurFadeProps {
  children: ReactNode;
  /** Retraso en segundos (para escalonar varias entradas). */
  delay?: number;
  /** Duracion en segundos. */
  duration?: number;
  /** Desplazamiento vertical inicial en px. */
  yOffset?: number;
  /** Difuminado inicial. */
  blur?: string;
  /** Animar solo cuando entra en viewport (default true). */
  inView?: boolean;
  className?: string;
}

/**
 * BlurFade: entrada con desenfoque + leve desplazamiento vertical.
 * Si el usuario prefiere menos movimiento, renderiza sin animacion.
 * Usar para que secciones y tarjetas aparezcan suavemente.
 */
export function BlurFade({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 12,
  blur = '6px',
  inView = true,
  className,
}: BlurFadeProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const hidden = { opacity: 0, y: yOffset, filter: `blur(${blur})` };
  const visible = { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(inView
        ? { whileInView: visible, viewport: { once: true, margin: '0px 0px -8% 0px' } }
        : { animate: visible })}
      transition={{ delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

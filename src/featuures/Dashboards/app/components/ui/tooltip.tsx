import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@dash/lib/utils';

interface TooltipProps {
  /** Contenido del tooltip (texto o nodos). */
  content: ReactNode;
  /** Elemento disparador (recibe los handlers de hover/focus). */
  children: ReactNode;
  /** Clase del wrapper inline que envuelve al trigger. */
  className?: string;
  /** Clase extra para la burbuja del tooltip. */
  contentClassName?: string;
}
export function Tooltip({ content, children, className, contentClassName }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; below: boolean }>({ x: 0, y: 0, below: true });
  const reduce = useReducedMotion();

  function place() {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = r.bottom + 56 < window.innerHeight;
    setPos({
      x: r.left + r.width / 2,
      y: below ? r.bottom + 8 : r.top - 8,
      below,
    });
  }

  function show() {
    place();
    setOpen(true);
  }

  // Reajuste fino del eje X tras medir el ancho real de la burbuja.
  useLayoutEffect(() => {
    if (!open) return;
    const b = bubbleRef.current;
    if (!b) return;
    const half = b.offsetWidth / 2;
    const margin = 8;
    let x = pos.x;
    if (x - half < margin) x = half + margin;
    if (x + half > window.innerWidth - margin) x = window.innerWidth - margin - half;
    if (x !== pos.x) setPos((p) => ({ ...p, x }));
  }, [open, pos.x]);

  return (
    <span
      ref={triggerRef}
      className={cn('inline-block', className)}
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
      onFocus={show}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={bubbleRef}
              role="tooltip"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: pos.below ? -4 : 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: pos.below ? -4 : 4, scale: 0.96 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, ${pos.below ? '0' : '-100%'})`,
                zIndex: 9999,
              }}
              className={cn(
                'pointer-events-none max-w-[18rem] rounded-lg bg-on-surface px-3 py-2 text-left text-xs font-medium leading-snug text-surface shadow-lg ring-1 ring-black/5',
                contentClassName,
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </span>
  );
}

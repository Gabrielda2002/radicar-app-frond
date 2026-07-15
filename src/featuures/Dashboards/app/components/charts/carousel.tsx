import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@dash/components/ui/card';
import { cn } from '@dash/lib/utils';

interface CarouselProps<T> {
  /** Titulo de la seccion. */
  title: ReactNode;
  /** Descripcion opcional bajo el titulo. */
  description?: ReactNode;
  /** Coleccion completa a paginar. */
  items: T[];
  /** Cuantos items por pagina (bloque). */
  pageSize: number;
  /** Render del bloque actual (recibe el slice de la pagina). */
  renderPage: (slice: T[]) => ReactNode;
  /** Contenido extra a la derecha del header (leyendas, badges). */
  headerExtra?: ReactNode;
  /** Texto cuando no hay items. */
  emptyText?: string;
  className?: string;
  bodyClassName?: string;
}

/**
 * Carousel paginado: divide `items` en bloques de `pageSize` y permite
 * navegar con flechas. Pensado para secciones que antes mostraban solo un
 * Top-N: ahora el usuario recorre TODOS los datos del filtro vigente.
 *
 * Es agnostico al layout del contenido: el consumidor decide como pintar
 * el bloque via `renderPage(slice)`.
 */
export function Carousel<T>({
  title,
  description,
  items,
  pageSize,
  renderPage,
  headerExtra,
  emptyText = 'Sin datos para los filtros actuales',
  className,
  bodyClassName,
}: CarouselProps<T>) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const reduce = useReducedMotion();
  // Direccion del desplazamiento para la animacion (1 = siguiente, -1 = anterior).
  const [dir, setDir] = useState(0);

  function go(next: number) {
    setDir(next > page ? 1 : -1);
    setPage(next);
  }

  // Si cambian los filtros (items) y la pagina actual queda fuera de rango,
  // volvemos a la primera pagina.
  useEffect(() => {
    setPage((p) => (p > totalPages - 1 ? 0 : p));
  }, [totalPages]);

  const slice = useMemo(
    () => items.slice(page * pageSize, page * pageSize + pageSize),
    [items, page, pageSize],
  );

  const start = items.length === 0 ? 0 : page * pageSize + 1;
  const end = Math.min(items.length, (page + 1) * pageSize);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <Card className={cn('p-5', className)}>
      <div className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {headerExtra}
          {items.length > pageSize && (
            <div className="flex items-center gap-2">
              <span className="tabular-nums text-sm text-gray-500 dark:text-gray-400">
                {start}–{end} de {items.length}
              </span>
              <div className="flex gap-1">
                <NavButton
                  ariaLabel="Anterior"
                  disabled={!canPrev}
                  onClick={() => go(Math.max(0, page - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </NavButton>
                <NavButton
                  ariaLabel="Siguiente"
                  disabled={!canNext}
                  onClick={() => go(Math.min(totalPages - 1, page + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </NavButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={cn('relative min-h-[1px] overflow-hidden', bodyClassName)}>
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">{emptyText}</p>
        ) : reduce ? (
          renderPage(slice)
        ) : (
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={page}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {renderPage(slice)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a pagina ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === page ? 'w-5 bg-[#049AE7]' : 'w-1.5 bg-gray-300 dark:bg-gray-600',
              )}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

function NavButton({
  children,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-all dark:border-gray-600 dark:text-gray-400',
        disabled ? 'cursor-not-allowed opacity-30' : 'hover:bg-gray-100 active:scale-95 dark:hover:bg-gray-800',
      )}
    >
      {children}
    </button>
  );
}

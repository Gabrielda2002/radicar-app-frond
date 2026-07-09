import { Card } from "../ui/card";

interface TreemapCell {
  label: string;
  value: number;
  display?: string;
  colSpan: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan: 1 | 2;
  bgClass: string;
  textClass?: string;
}

interface TreemapProps {
  title: string;
  description?: string;
  cells: TreemapCell[];
}

const colSpan = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
} as const;

const rowSpan = { 1: 'row-span-1', 2: 'row-span-2' } as const;

/**
 * Treemap simplificado (grilla de 6 columnas x 2 filas).
 * Para casos triviales tipo "costo por sede". Para treemaps reales
 * con cuadricula proporcional usa recharts o visx.
 */
export function MiniTreemap({ title, description, cells }: TreemapProps) {
  return (
    <Card className="p-6">
      <h4 className="mb-1 text-title-lg text-corporate-navy">{title}</h4>
      {description && <p className="mb-6 text-label-md text-on-surface-variant">{description}</p>}
      <div className="grid h-48 grid-cols-6 grid-rows-2 gap-2">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={[
              'flex flex-col justify-end rounded-lg p-3 cursor-pointer transition-all hover:brightness-110',
              colSpan[cell.colSpan],
              rowSpan[cell.rowSpan],
              cell.bgClass,
              cell.textClass ?? 'text-white',
            ].join(' ')}
          >
            <span className="text-[14px] font-bold">{cell.label}</span>
            {cell.display && (
              <span className="text-[11px] opacity-80">{cell.display}</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

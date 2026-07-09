/**
 * Helpers para generar opciones de filtro de Periodo en formato mensual.
 * Dado un rango YYYY-MM-DD, produce una lista de meses cubiertos
 * y la conversion a {desde, hasta}.
 */

export interface PeriodoOption {
  value: string; // 'all' | 'YYYY-MM'
  label: string;
}

const MESES_ES = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export function buildPeriodoOptions(
  desde: string | null | undefined,
  hasta: string | null | undefined,
): PeriodoOption[] {
  if (!desde || !hasta) return [{ value: 'all', label: 'Todo el periodo' }];

  const start = new Date(desde + 'T00:00:00');
  const end = new Date(hasta + 'T00:00:00');

  const options: PeriodoOption[] = [
    { value: 'all', label: `Todo el periodo (${shortDate(start)} → ${shortDate(end)})` },
  ];

  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cursor <= end) {
    const y = cursor.getFullYear();
    const m = cursor.getMonth(); // 0-11
    options.push({
      value: `${y}-${String(m + 1).padStart(2, '0')}`,
      label: `${MESES_ES[m]} ${y}`,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return options;
}

/** Convierte 'YYYY-MM' a { desde, hasta } cubriendo todo el mes */
export function periodoToRange(value: string): { desde?: string; hasta?: string } {
  if (!value || value === 'all') return {};
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return {};
  const year = Number(match[1]);
  const month = Number(match[2]); // 1-12
  const desde = `${year}-${String(month).padStart(2, '0')}-01`;
  // Ultimo dia del mes: dia 0 del mes siguiente
  const last = new Date(year, month, 0).getDate();
  const hasta = `${year}-${String(month).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
  return { desde, hasta };
}

/** Convierte { desde, hasta } a 'YYYY-MM' si corresponde a un mes exacto */
export function rangeToPeriodo(desde?: string, hasta?: string): string {
  if (!desde || !hasta) return 'all';
  const d = /^(\d{4})-(\d{2})-01$/.exec(desde);
  if (!d) return 'all';
  const expectedLast = new Date(Number(d[1]), Number(d[2]), 0).getDate();
  const h = new RegExp(`^${d[1]}-${d[2]}-${String(expectedLast).padStart(2, '0')}$`).test(hasta);
  return h ? `${d[1]}-${d[2]}` : 'all';
}

function shortDate(d: Date): string {
  return `${MESES_ES[d.getMonth()]} ${d.getDate()}`;
}

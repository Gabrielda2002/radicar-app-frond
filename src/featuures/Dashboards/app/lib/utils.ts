import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(n: number | null | undefined, fractionDigits = 0): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);
}

export function formatCurrency(n: number | null | undefined, suffix: 'M' | 'k' | '' = 'M'): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return `$${formatNumber(n, 1)}${suffix}`;
}

export function formatPercent(n: number | null | undefined, fractionDigits = 1): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return `${formatNumber(n, fractionDigits)}%`;
}

export function clampPercent(n: number): number {
  return Math.max(0, Math.min(100, n));
}

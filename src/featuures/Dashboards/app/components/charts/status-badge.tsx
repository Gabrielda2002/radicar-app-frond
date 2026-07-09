import { Badge } from "../ui/badge";

export type RiskLevel = 'critico' | 'alto' | 'moderado' | 'estable' | 'ok';

const map: Record<RiskLevel, { label: string; variant: 'danger' | 'warning' | 'info' | 'success' | 'neutral' }> = {
  critico: { label: 'CRÍTICO', variant: 'danger' },
  alto: { label: 'ALTO', variant: 'danger' },
  moderado: { label: 'MODERADO', variant: 'warning' },
  estable: { label: 'ESTABLE', variant: 'info' },
  ok: { label: 'OK', variant: 'success' },
};

export function StatusBadge({ level }: { level: RiskLevel }) {
  const { label, variant } = map[level];
  return <Badge variant={variant}>{label}</Badge>;
}

/** Calcula nivel de riesgo a partir de % cumplimiento */
export function riskFromPct(pct: number | null | undefined): RiskLevel {
  if (pct === null || pct === undefined || Number.isNaN(pct)) return 'estable';
  if (pct < 10) return 'critico';
  if (pct < 50) return 'alto';
  if (pct < 80) return 'moderado';
  return 'ok';
}

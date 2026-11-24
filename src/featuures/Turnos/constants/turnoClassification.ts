import type { TurnoClassificationType } from "@/models/ITurnos";

export const TURNO_CLASSIFICATION_LABELS: Record<TurnoClassificationType, string> = {
  ASIGNACION_CITAS: "Asignación de Citas",
  CONFIRMACION_CITAS: "Confirmación de Citas",
  TRAMITES_ADMINISTRATIVOS: "Trámites Administrativos",
};

export const TURNO_CLASSIFICATION_VALUES: TurnoClassificationType[] = [
  "ASIGNACION_CITAS",
  "CONFIRMACION_CITAS",
  "TRAMITES_ADMINISTRATIVOS",
];

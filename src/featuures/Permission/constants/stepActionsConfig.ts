export interface ActionOption {
  value: string;
  label: string;
}

type StepActionsConfig = Record<string, Record<string, ActionOption[]>>;

export const STEP_ACTIONS_CONFIG: StepActionsConfig = {
  PERMISO: {
    JEFE: [
      { value: "APROBADO", label: "Aprobar" },
      { value: "RECHAZADO", label: "Rechazar" },
    ],
    RRHH: [
      { value: "VISTO", label: "Marcar como Visto" },
    ],
  },
  VACACIONES: {
    JEFE: [
      { value: "APROBADO", label: "Aprobar" },
      { value: "RECHAZADO", label: "Rechazar" },
    ],
    RRHH: [
      { value: "VISTO", label: "Marcar como Visto" },
    ],
  },
  INCAPACIDAD: {
    JEFE: [
      { value: "APROBADO", label: "Aprobar" },
      { value: "RECHAZADO", label: "Rechazar" },
    ],
    RRHH: [
      { value: "VISTO", label: "Marcar como Visto" },
    ],
  },
  CALAMIDAD: {
    JEFE: [
      { value: "APROBADO", label: "Aprobar" },
      { value: "RECHAZADO", label: "Rechazar" },
    ],
    RRHH: [
      { value: "VISTO", label: "Marcar como Visto" },
    ],
  },
};

export const getActionsByStepType = (
  category: string,
  stepType: string
): ActionOption[] => {
  const categoryConfig = STEP_ACTIONS_CONFIG[category];
  if (!categoryConfig) return [];
  return categoryConfig[stepType] || [];
};

export const getCommentLabel = (action: string): string => {
  switch (action) {
    case "APROBADO":
      return "Comentario (Opcional)";
    case "RECHAZADO":
      return "Motivo del Rechazo";
    case "VISTO":
      return "Observaciones (Opcional)";
    default:
      return "Comentario";
  }
};

export const isCommentRequired = (action: string): boolean => {
  return action === "RECHAZADO";
};

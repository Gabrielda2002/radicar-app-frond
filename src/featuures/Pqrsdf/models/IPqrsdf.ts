//* Enums para el módulo PQRSDF

export enum ClasificacionPqrsdf {
  PETICION = "PETICION",
  QUEJA = "QUEJA",
  RECLAMO = "RECLAMO",
  DENUNCIA = "DENUNCIA",
  SUGERENCIA = "SUGERENCIA",
  FELICITACION = "FELICITACION",
}

export enum EstadoPqrsdf {
  ABIERTO = "ABIERTO",
  EN_GESTION = "EN_GESTION",
  CERRADO = "CERRADO",
}

export enum PresentadoPor {
  USUARIO_AFECTADO = "USUARIO_AFECTADO",
  FAMILIAR = "FAMILIAR",
  ASEGURADOR = "ASEGURADOR",
}

export enum Instancia {
  SUPERSALUD = "SUPERSALUD",
  EPS = "EPS",
  SECRETARIA_SALUD = "SECRETARIA_SALUD",
  IPS = "IPS",
  OTRO = "OTRO",
}

export enum MedioRecepcion {
  PAGINA_WEB = "PAGINA_WEB",
  WHATSAPP = "WHATSAPP",
  SALA = "SALA",
  BUZON = "BUZON",
}

export enum MedioNotificacion {
  CORREO_ELECTRONICO = "CORREO_ELECTRONICO",
  PERSONALMENTE = "PERSONALMENTE",
  WHATSAPP = "WHATSAPP",
}

export enum AtributoAfectado {
  OPORTUNIDAD = "OPORTUNIDAD",
  ACCESIBILIDAD = "ACCESIBILIDAD",
  CONTINUIDAD = "CONTINUIDAD",
  PERTINENCIA = "PERTINENCIA",
  CALIDEZ = "CALIDEZ",
  OTRO = "OTRO",
}

export interface CatalogoItem {
  id: number;
  name: string;
}

export interface IPqrsdf {
    id:                 number;
    patientId:          number;
    filingNumber:       number;
    patientName:        string;
  patientDocument:    string;
    patientPhone:       string;
    patientEmail:       string;
    patientTypeDocument: string;
    populationTypeId:   number;
    populationType:     string;
    patientAgreement:   string;
    presentedBy:        string;
    presenterName:      null;
    classification:     string;
    instance:           string;
    receptionMedium:    string;
    generalReasonId:    number;
    generalReason:      string;
    specificReason:     string;
    generationAreaName: string;
    generationAreaId:   number;
    originAreaId:        number;
    originAreaName:     string;
    description:        string;
    receivedDate:       Date;
    resolutionAreaId: number | null;
    resolutionAreaName: string;
    responseDate:       Date | null;
    // responseSummary:    string | null;
    notificationMedium: string | null;
    affectedAttribute:  string | null;
    improvementAction:  boolean;
    improvementActionDetails: string | null;
    status:             string;
    pqrsDate:           Date;
    riskCode:           string;
    riskName:           string;
    slaDurationValue:   number;
    slaDurationUnit:    string;
    slaBusinessDays:    boolean | null;
    slaDeadlineAt:      Date | null;
    slaClosedAt:        Date | null;
    slaOverdue:         boolean;
    slaOverdueSeconds:  number | null;
    statusHistory:      IPqrsdfStatusHistory[];
    createdBy:          string;
    createdAt:          Date;
    updatedAt:          Date;
}

export type IPqrsdfStatusHistory = {
  id: number;
  status: string;
  note: string | null;
  actor: string;
  createdAt: Date;
}

//* Valores del formulario (POST / PUT body al backend)
export interface IPqrsdfFormValues {
  patientId: number | string;
  populationTypeId: number | string;
  presentedBy: string;
  presenterName: string;
  classification: string;
  instance: string;
  receptionMedium: string;
  originAreaId: number;
  generalReasonId: number | string;
  generationAreaId: number | string;
  description: string;
  specificReason: string;
  pqrsDate: string;
  receivedDate: string;
  // Resolución (opcionales en create, enviados en edit)
  status?: string;
  resolutionAreaId?: number;
  responseDate?: string;
  responseSummary?: string;
  notificationMedium?: string;
  affectedAttribute?: string;
  improvementAction?: boolean;
  filingNumber?: number;
  riskCode: string;
  improvementActionDetails: string;
}

//* Etiquetas en español para mostrar en UI
export const ENUM_LABELS: Record<string, Record<string, string>> = {
  classification: {
    PETICION: "Petición",
    QUEJA: "Queja",
    RECLAMO: "Reclamo",
    DENUNCIA: "Denuncia",
    SUGERENCIA: "Sugerencia",
    FELICITACION: "Felicitación",
  },
  status: {
    ABIERTO: "Abierto",
    EN_GESTION: "En Gestión",
    CERRADO: "Cerrado",
  },
  presentedBy: {
    USUARIO_AFECTADO: "Usuario Afectado",
    FAMILIAR: "Familiar",
    ASEGURADOR: "Asegurador",
  },
  instance: {
    SUPERSALUD: "Supersalud",
    EPS: "EPS",
    SECRETARIA_SALUD: "Secretaría de Salud",
    IPS: "IPS",
    OTRO: "Otro",
  },
  receptionMedium: {
    PAGINA_WEB: "Página Web",
    WHATSAPP: "WhatsApp",
    SALA: "Sala",
    BUZON: "Buzón",
  },
  notificationMedium: {
    CORREO_ELECTRONICO: "Correo Electrónico",
    PERSONALMENTE: "Personalmente",
    WHATSAPP: "WhatsApp",
  },
  affectedAttribute: {
    OPORTUNIDAD: "Oportunidad",
    ACCESIBILIDAD: "Accesibilidad",
    CONTINUIDAD: "Continuidad",
    PERTINENCIA: "Pertinencia",
    CALIDEZ: "Calidez",
    OTRO: "Otro",
  },
};

//* Select option builders — constantes para enums que no vienen de catálogo
export const PRESENTADO_POR_OPTIONS = Object.entries(
  ENUM_LABELS.presentedBy
).map(([value, label]) => ({ value, label }));

export const CLASIFICACION_OPTIONS = Object.entries(
  ENUM_LABELS.classification
).map(([value, label]) => ({ value, label }));

export const INSTANCIA_OPTIONS = Object.entries(ENUM_LABELS.instance).map(
  ([value, label]) => ({ value, label })
);

export const MEDIO_RECEPCION_OPTIONS = Object.entries(
  ENUM_LABELS.receptionMedium
).map(([value, label]) => ({ value, label }));

export const ESTADO_OPTIONS = Object.entries(ENUM_LABELS.status).map(
  ([value, label]) => ({ value, label })
);

export const MEDIO_NOTIFICACION_OPTIONS = Object.entries(
  ENUM_LABELS.notificationMedium
).map(([value, label]) => ({ value, label }));

export const ATRIBUTO_AFECTADO_OPTIONS = Object.entries(
  ENUM_LABELS.affectedAttribute
).map(([value, label]) => ({ value, label }));

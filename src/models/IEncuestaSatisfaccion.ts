//* Enums para el módulo de Encuestas de Satisfacción

export enum RespuestaSiNoNa {
  SI = "SI",
  NO = "NO",
  NA = "NA",
}

export enum Calificacion {
  MUY_BUENO = "MUY_BUENO",
  BUENO = "BUENO",
  REGULAR = "REGULAR",
  MALO = "MALO",
  MUY_MALO = "MUY_MALO",
}

export enum ExperienciaGlobal {
  MUY_BUENO = "MUY_BUENO",
  BUENO = "BUENO",
  REGULAR = "REGULAR",
  MALO = "MALO",
  MUY_MALO = "MUY_MALO",
  NO_RESPONDE = "NO_RESPONDE",
}

export enum Recomendacion {
  DEFINITIVAMENTE_SI = "DEFINITIVAMENTE_SI",
  PROBABLEMENTE_SI = "PROBABLEMENTE_SI",
  PROBABLEMENTE_NO = "PROBABLEMENTE_NO",
  DEFINITIVAMENTE_NO = "DEFINITIVAMENTE_NO",
  NO_RESPONDE = "NO_RESPONDE",
}

//* Interfaz principal — respuesta del backend (GET)
export interface IEncuestaSatisfaccion {
    id:                     number;
    patientId:              number;
    patientName:            string;
    patientDocument:        string;
    patientTypeDocument:    string;
    patientAgreement:       string;
    municipalityId:         number;
    municipality:           string;
    documentPatient:        string;
    attentionServiceId:     number;
    attentionService:       string;
    specialPopulationId:    number;
    specialPopulation:      string;
    timelyAppointment:      string;
    punctualCare:           string;
    professionalInterest:   string;
    clearRecommendations:   string;
    signageHelped:          string;
    adequateFacilities:     string;
    cleanFacilities:      string;
    professionalCareRating: string;
    customerServiceRating:  string;
    globalExperience:       string;
    wouldRecommend:         string;
    createdAt:              Date;
    updatedAt:              Date;
    registeredBy:           string;
}

//* Valores del formulario (POST / PUT body al backend)
export interface IEncuestaFormValues {
  patientId: number | string;
  municipalityId: number | string;
  specialPopulationId: number | string;
  attentionServiceId: number | string;
  timelyAppointment: string;
  punctualCare: string;
  professionalInterest: string;
  clearRecommendations: string;
  signageHelped: string;
  adequateFacilities: string;
  cleanFacilities: string;
  professionalCareRating: string;
  customerServiceRating: string;
  globalExperience: string;
  wouldRecommend: string;
}

//* Etiquetas en español para mostrar en UI
export const ENUM_LABELS: Record<string, Record<string, string>> = {
  RespuestaSiNoNa: {
    SI: "Sí",
    NO: "No",
    NA: "No Aplica",
  },
  Calificacion: {
    MUY_BUENO: "Muy Bueno",
    BUENO: "Bueno",
    REGULAR: "Regular",
    MALO: "Malo",
    MUY_MALO: "Muy Malo",
  },
  ExperienciaGlobal: {
    MUY_BUENO: "Muy Bueno",
    BUENO: "Bueno",
    REGULAR: "Regular",
    MALO: "Malo",
    MUY_MALO: "Muy Malo",
    NO_RESPONDE: "No Responde",
  },
  Recomendacion: {
    DEFINITIVAMENTE_SI: "Definitivamente Sí",
    PROBABLEMENTE_SI: "Probablemente Sí",
    PROBABLEMENTE_NO: "Probablemente No",
    DEFINITIVAMENTE_NO: "Definitivamente No",
    NO_RESPONDE: "No Responde",
  },
};

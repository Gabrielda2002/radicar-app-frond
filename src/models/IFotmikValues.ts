import { auditCups } from "./IAuditar";
  
  export interface FormikValues {
    id: number;
    justificacion: string;
    cupsDetails: auditCups[];
  }
  
  export interface FormikTouched {
    auditora?: boolean;
    fechaAuditoria?: boolean;
    justificacion?: boolean;
    observacionCups?: boolean;
    unidadFuncional?: boolean;
    estadoCups?: boolean;
    cupsDetails?: Array<{
      observacionCups?: boolean;
      unidadFuncional?: boolean;
      estadoCups?: boolean;
    }>;
  }
  
  export interface FormikErrors {
    auditora?: string;
    fechaAuditoria?: string;
    justificacion?: string;
    observation?: string;
    funtionalUnit?: string;
    status?: string;
    quantity?: number;
  }
  
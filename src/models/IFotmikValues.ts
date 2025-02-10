export interface CupsDetail {
    idCupsRadicado: string;
    idRadicado: string;
    id: string;
    observacionCups: string;
    unidadFuncional: string;
    estadoCups: string;
    code: string;
    description: string;
    cantidad:     number;
  }
  
  export interface FormikValues {
    auditora: string;
    id: number;
    fechaAuditoria: string;
    justificacion: string;
    cupsDetails: CupsDetail[];
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
    observacionCups?: string;
    unidadFuncional?: string;
    estadoCups?: string;
    cantidad?: number;
    cupsDetails?: Array<{
      observacionCups?: string;
      unidadFuncional?: string;
      estadoCups?: string;
    }>;
  }
  
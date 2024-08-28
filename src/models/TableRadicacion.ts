export interface IRadicacion {
    createdAt:    Date;
    typeDocument: TypeDocument;
    id:           number;
    convenio:     Convenio;
    document:     number;
    patientName:  string;
    auditDate:    Date | null;
    management:   string;
}

export enum Convenio {
    CompensarEPS = "Compensar EPS",
    NuevaEPS = "Nueva EPS",
}

export enum TypeDocument {
    Cc = "CC",
    Ce = "CE",
    RC = "RC",
    TI = "TI",
}

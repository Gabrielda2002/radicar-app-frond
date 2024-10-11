export interface ICirugias {
    fechaRadicado:   Date;
    id:              number;
    convenio:        string;
    numeroDocumento: number;
    nombrePaciente:  string;
    fechaAuditoria:  Date | null;
    nombreAuditor:   string;
}

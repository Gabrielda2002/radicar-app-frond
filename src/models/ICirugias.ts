export interface ICirugias {
    fechaRadicado:   Date;
    id:              number;
    convenio:        string;
    numeroDocumento: number;
    nombrePaciente:  string;
    numeroPaciente:  string;
    telefonoFijo:    string;
    email:           string;
    fechaAuditoria:  Date | null;
    especialidad:    string;
    cups:            Cup[];
    grupoServicios:  string;
    diagnostico:     string;
    idGrupoServicios: number;
    programacionCirugia : programacion[];
}

export interface programacion{
    id: number;
}

export interface Cup {
    id:          number;
    code:        number;
    description: string;
}

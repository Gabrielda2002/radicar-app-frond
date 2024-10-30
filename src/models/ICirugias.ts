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
    fechaOrden:      Date;
    especialidad:    string;
    cups:            Cup[];
    grupoServicios:  string;
    diagnostico:     string;
    idGrupoServicios: number;
    programacionCirugia : programacion[];
}

export interface programacion{
    id: number;
    fechaProgramada: Date;
    fechaCirugia:    Date;
    ipsRemite:       string;
    observacion:     string;
    hora:            string;
    fechaParaclinoco: Date;
    fechaAnesteciologia: Date;
    especialista: string;
    gestionAuxiliarCirugia: GestionAuxiliarCirugia[];
}

export interface GestionAuxiliarCirugia {
    id:            number;
    estado:        string;
    observacion:   string;
    fechaCreacion: Date;
}

export interface Cup {
    id:          number;
    code:        number;
    description: string;
}

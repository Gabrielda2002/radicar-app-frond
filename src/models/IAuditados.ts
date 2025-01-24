export interface IAuditados {
    id:          number;
    radicadoDate: Date;
    document:    number;
    patientName: string;
    CUPS:        Cup[];
}

export interface Cup {
    id:          number;
    code:        number;
    description: string;
    status:      number;
    observation: string;
    modifyDate:  Date;
    quantity:    number;
}

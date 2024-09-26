export interface IAuditados {
    id:          number;
    document:    number;
    patientName: string;
    CUPS:        Cup[];
}

export interface Cup {
    code:        number;
    description: string;
    status:      string;
    observation: string;
    modifyDate:  Date;
}

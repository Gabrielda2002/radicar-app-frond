export interface IAuditados {
    id: number;
    createdAt: Date;
    document: number;
    patientName: string;
    CUPS: Cup[];
}

export interface Cup {
    id: number;
    cupsId: number;
    code: number;
    description: string;
    statusId: number;
    status: string;
    observation: string;
    updatedAt: Date;
    quantity: number;
}

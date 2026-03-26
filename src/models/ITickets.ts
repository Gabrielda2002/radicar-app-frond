export interface ITickets extends ITicketsUser {
    nameRequester: string;
    lastNameRequester: string;
    headquarter: string;
    municipio: string;
    phone: number;
    attachments: attachments[];
}

interface attachments {
    id: number;
    fileName: string;
    fileUrl: string;
}

enum Priority {
    Alta = "Alta",
    Baja = "Baja",
    Media = "Media",
}

enum Status {
    Abierto = "Abierto",
    Cerrado = "Cerrado",
    Pendiente = "Pendiente",
}

enum TypeTicket {
    Solicitud = "Solicitud",
    Incidente = "Incidente",
    Problema = "Problema",
    Cambio = "Cambio",
    Otro = "Otro"
}


export type ITicketsUser = {
    id: number;
    title: string;
    description: string;
    type: TypeTicket;
    createdAt: Date;
    updatedAt: Date;
    status: Status;
    priority: Priority;
    category: string;
    surveyId: number | null;
}
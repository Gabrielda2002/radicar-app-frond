export interface IAuditoria {
    radicadoDate:   Date;
    documentType:   DocumentType;
    documentNumber: number;
    namePatient:    string;
    convenio:       Convenio;
    ipsPrimary:     number;
    orderDate:      Date;
    place:          string;
    ipsRemitente:   string;
    profetional:    string;
    speciality:     string;
    typeServices:   TypeServices;
    radicador:      Radicador;
    statusCups:     StatusCup[];
}

export enum Convenio {
    CompensarEPS = "Compensar EPS",
    NuevaEPS = "Nueva EPS",
}

export enum DocumentType {
    Cc = "CC",
    TI = "TI",
}

export enum Radicador {
    BrigitMilenaParraDiaz = "BRIGIT MILENA PARRA DIAZ",
    LuzDaryRinconDelgadillo = "LUZ DARY RINCON DELGADILLO ",
    YeissonAlejandroFuentesHernandez = "YEISSON ALEJANDRO FUENTES HERNANDEZ",
}

export interface StatusCup {
    code:        number;
    description: string;
    observation: Observation;
}

export enum Observation {
    Empty = "",
    Pendiente = "pendiente",
}

export enum TypeServices {
    Evento = "EVENTO",
    PGP = "PGP",
}

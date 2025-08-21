export interface IAuditar {
    id:            number;
    radicadoDate:   Date;
    documentType:   string;
    documentNumber: number;
    namePatient:    string;
    convenio:       string;
    ipsPrimary:     number;
    orderDate:      Date;
    place:          string;
    ipsRemitente:   string;
    profetional:    string;
    speciality:     string;
    typeServices:   string;
    radicador:      string;
    statusCups:     IStatusCup[];
    supportName:    string;
    supportId:      number;
}

export enum Convenio {
    CompensarEPS = "Compensar EPS",
    NuevaEPS = "Nueva EPS",
}

export interface IStatusCup {
    code:            number;
    description:     string;
    observation:     string;
    status:          string;
    unidadFuncional: string;
    idRadicado:      number;
}

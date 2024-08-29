export interface IUsuarios {
    id:        number;
    dniNumber: number;
    name:      string;
    lastName:  string;
    email:     string;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
    documento: Documento;
    roles:     Roles;
    municipio: Municipio;
}

export enum Documento {
    Cc = "CC",
}

export enum Municipio {
    Cúcuta = "Cúcuta",
    Leticia = "Leticia",
}

export enum Roles {
    Administrador = "Administrador",
    Auditor = "Auditor",
    Auxiliar = "Auxiliar",
    Calidad = "Calidad",
    Gerente = "Gerente",
}

export interface IRadicados {
    id:              number;
    createdAt:       Date;
    documentNumber:  number;
    auditora:        string;
    address:         string;
    convenioName:    string;
    documentType:    string;
    namePatient:     string;
    phoneNumber:     string;
    landline:        string;
    email:           string;
    ipsPrimaria:     string;
    ipsRemitente:    string;
    auditDate:       Date | null;
    supportName:      string;
    supportId:       number;
    radicacionPlace: string;
    profetional:     string;
    specialty:       string;
    orderDate:       Date;
    typeServices:    string;
    groupServices:   string;
    radicador:       string;
    justify:         string;
    surgery:         Surgery[];
    cups:            Cup[];
}

export interface Cup {
    id:             number;
    code:           number;
    description:    string;
    status:         string;
    observation:    string;
    functionalUnit: string;
    seguimiento:    Seguimiento[];
}

export interface Seguimiento {
    id:            number;
    estado:        string;
    observation:   string;
    fechaCreacion: Date;
    Nombre:        string;
    Apellido:      string;
}

export interface Surgery {
    id:                number;
    surgeryDate:       Date;
    surgeryTime:       string;
    ipsSurgery:        string;
    dateParaclinico:   Date;
    dateAnestesiology: Date;
    specialist:        string;
    observation:       string;
    seguimiento:       Seguimiento[];
}

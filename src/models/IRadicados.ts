export interface IRadicados {
    id:                          number;
    createdAt:                   Date;
    orderDate:                   Date;
    place:                       number;
    ipsRemitente:                number;
    profetional:                 string;
    specialty:                   number;
    groupServices:               number;
    typeServices:                number;
    radicador:                   number;
    auditora:                    string;
    auditDate:                   Date | null;
    justify:                     string;
    auditConcept:                number;
    idPatient:                   number;
    idSoporte:                   number | null;
    idDiagnostico:               number;
    specialtyRelation:           Relation;
    placeRelation:               Relation;
    ipsRemiteRelation:           Relation;
    servicesGroupRelation:       Relation;
    servicesRelation:            Relation;
    radicadorRelation:           Relation;
    patientRelation:             PatientRelation;
    cupsRadicadosRelation:       CupsRadicadosRelation[];
    diagnosticoRelation:         DiagnosticoRelation;
    soportesRelation:            SoportesRelation | null;
    seguimientoAuxiliarRelation: SeguimientoAuxiliarRelation[];
}

export interface CupsRadicadosRelation {
    id:                     number;
    code:                   number;
    DescriptionCode:        string;
    status:                 number;
    observation:            string;
    functionalUnit:         number;
    idRadicacion:           number;
    updatedAt:              string;
    createdAt:              string;
    statusRelation:         Relation;
    functionalUnitRelation: Relation;
}

export interface Relation {
    id:        number;
    name:      string;
    status?:   boolean;
    updatedAt: Date;
    createdAt: Date;
}

export interface DiagnosticoRelation {
    id:          number;
    code:        string;
    description: string;
    updatedAt:   Date;
    createdAt:   Date;
}

export interface PatientRelation {
    id:                  number;
    documentType:        number;
    documentNumber:      number;
    name:                string;
    phoneNumber:         string;
    landline:            number;
    email:               string;
    address:             string;
    convenio:            number;
    ipsPrimaria:         number;
    status:              boolean;
    updatedAt:           Date;
    createdAt:           Date;
    convenioRelation:    Relation;
    documentRelation:    Relation;
    ipsPrimariaRelation: Relation;
}

export interface SeguimientoAuxiliarRelation {
    id:                        number;
    createdAt:                 Date;
    observation:               string;
    status:                    number;
    codeCups:                  string;
    idRadicacion:              number;
    updatedAt:                 Date;
    estadoSeguimientoRelation: Relation;
}

export interface SoportesRelation {
    id:        number;
    name:      string;
    url:       string;
    size:      number;
    type:      string;
    createdAt: Date;
    updateAt:  Date;
}

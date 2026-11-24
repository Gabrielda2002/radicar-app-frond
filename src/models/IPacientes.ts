export interface IPacientes {
    id:                  number;
    documentTypeId:        number;
    documentNumber:      number;
    name:                string;
    phoneNumber:         string;
    phoneNumber2:        string | null;
    landline:            string | null;
    email:               string | null;
    address:             string | null;
    agreementId:            number | null;
    ipsPrimaryId:         number | null;
    regime:              string | null;
    status:              boolean;
    updatedAt:           Date;
    createdAt:           Date;
    convenioRelation:    Relation | null;
    ipsPrimariaRelation: Relation | null;
    documentRelation:    Relation;
}

export interface Relation {
    id:        number;
    name:      string;
    status:    boolean;
    updatedAt: Date;
    createdAt: Date;
}

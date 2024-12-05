export interface ILugarRadicacion {
    id:                 number;
    name:               string;
    status:             boolean;
    address:            string;
    departamento:       number;
    city:               number;
    updatedAt:          Date;
    createdAt:          Date;
    departmentRelation: Relation;
    municipioRelation:  Relation;
    numeroSede:         number;
}

export interface Relation {
    id:           number;
    name:         string;
    nitMunicipio: number;
    status:       boolean;
    updatedAt:    Date;
    createdAt:    Date;
}
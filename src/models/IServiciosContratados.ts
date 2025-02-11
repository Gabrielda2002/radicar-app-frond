export interface IServiciosContratados {
    id:          number;
    code:        string;
    description: string;
    Relations:   Relation[];
}

export interface Relation {
    nameConvenio: string;
    nameSede:     string;
    isContrated:  boolean;
    typeService: string;
    nameContract: string;
}

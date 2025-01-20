export interface IAuditLetter {
    id:             number;
    profetional:    string;
    creatAt:        Date;
    dniNumber:      number;
    dniType:        string;
    agreement:      string;
    idRadicado:     number;
    cupsAuthorized: CupsAuthorizedLetter[];
}

export interface CupsAuthorizedLetter {
    id:              number;
    code:            number;
    DescriptionCode: string;
    status:          string;
}

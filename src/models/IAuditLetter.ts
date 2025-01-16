export interface IAuditLetter {
    id:             number;
    profetional:    string;
    creatAt:        Date;
    dniNumber:      number;
    dniType:        string;
    agreement:      string;
    cupsAuthorized: CupsAuthorized[];
}

export interface CupsAuthorized {
    id:              number;
    code:            number;
    DescriptionCode: string;
    status:          string;
}

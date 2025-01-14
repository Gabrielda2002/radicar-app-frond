export interface IRequestLetter {
    id:             number;
    profetional:    string;
    creatAt:        Date;
    dniNumber:      number;
    patientName:    string;
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

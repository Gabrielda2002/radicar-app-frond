export interface IAuditar {
    id:            number;
    createdAt:   Date;
    documentType:   string;
    documentNumber: number;
    namePatient:    string;
    agreementName:       string;
    ipsPrimary:     number;
    orderDate:      Date;
    place:          string;
    ipsRemitente:   string;
    professional:    string;
    speciality:     string;
    typeService:   string;
    assistant:      string;
    cups:       auditCups[];
    supportName:    string;
    supportId:      number;
}

export interface auditCups {
    id:              number;
    code:            number;
    description:     string;
    observation:     string;
    status:          string;
    funtionalUnit: string;
    idRadicado:      number;
    quantity:         number;
}

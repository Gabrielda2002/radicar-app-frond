export interface ITickets {
    id:                number;
    type:              string;
    title:             string;
    description:       string;
    nameRequester:     string;
    lastNameRequester: string;
    category:          string;
    priority:          string;
    status:            string;
    headquarter:       string;
    municipio:         string;
    phone:             number;
    createdAt:         Date;
    updatedAt:         Date;
}

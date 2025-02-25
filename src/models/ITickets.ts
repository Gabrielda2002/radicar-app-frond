export interface ITickets {
    id:                number;
    title:             string;
    description:       string;
    nameRequester:     string;
    lastNameRequester: string;
    category:          string;
    priority:          string;
    status:            string;
    createdAt:         Date;
    updatedAt:         Date;
}

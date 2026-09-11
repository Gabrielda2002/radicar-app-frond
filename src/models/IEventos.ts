export interface IEventos{
    id:             number;
    title:          string;
    dateStart:      Date;
    dateEnd:        Date;
    description:    string;
    location?:      string;
    responsibleName?: string;
    responsibleEmail?: string;
    color:          string;
    timeStart:      string;
    timeEnd:        string;
}
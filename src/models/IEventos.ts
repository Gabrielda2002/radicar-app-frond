export interface IEventos{
    id:             number;
    title:          string;
    dateStart:      Date;
    dateEnd:        Date;
    description:    string;
    location?:      string;
    place?:         string;
    lugar?:         string;
    responsibleName?: string;
    responsible?:   string;
    responsableNombre?: string;
    responsibleEmail?: string;
    emailResponsible?: string;
    responsableCorreo?: string;
    color:          string;
    timeStart:      string;
    timeEnd:        string;
}
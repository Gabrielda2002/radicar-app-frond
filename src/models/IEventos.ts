export interface IEventos{
    id:             number;
    title:          string;
    dateStart:      Date;
    dateEnd:        Date;
    description:    string;
    place?:      string;
    responsibleName?: string;
    // responsibleEmail?: string;
    color:          string;
    timeStart:      string;
    timeEnd:        string;
    authorRelation: Author;
}

type Author = {
    email: string;
    name: string;
    lastName: string;
}
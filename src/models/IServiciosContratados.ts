export interface IServiciosContratados {
    id:          number;
    code:        string;
    description: string;
    convenio:    string[];
    sede:        string[];
    isContrated: boolean;
}

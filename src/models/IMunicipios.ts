export interface IMunicipios {
    id:           number;
    name:         string;
    municipalityCode    : number | string;
    departmentId: number;
    departmentName: string;
    status:       boolean;
    updatedAt:    Date;
    createdAt:    Date;
}

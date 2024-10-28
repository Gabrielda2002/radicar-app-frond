export interface IUsuarios {
    id:          number;
    dniNumber:   number;
    name:        string;
    lastName:    string;
    email:       string;
    status:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
    documento:   string;
    idDocumento: number;
    roles:       string;
    idRol:       number;
    municipio:   string;
    idMunicipio: number;
}

export interface IItems {
    id:               number;
    sedeId:           number;
    name:             string;
    area:             string;
    typeEquipment:    string;
    brand:            string;
    model:            string;
    serial:           string;
    operationalSystem: string;
    addressIp:        string;
    mac:              string;
    purchaseDate:     Date;
    warrantyTime:     number;
    warranty:         boolean;
    deliveryDate:     Date;
    inventoryNumber:  string;
    createAt:           Date;
    updateAt:           Date;
    seguimientoEquipos: SeguimientoEquipo[];
}

export interface SeguimientoEquipo {
    id:          number;
    equipmentId: number;
    dateEvent:   Date;
    eventType:   string;
    description: string;
    responsible: number;
    userRelation: UserRelation
}
export interface UserRelation {
    id:        number;
    dniNumber: number;
    name:      string;
    lastName:  string;
    dniType:   number;
    email:     string;
    password:  string;
    date:      Date;
    status:    boolean;
    municipio: number;
    rol:       number;
    photo:     string;
    updatedAt: Date;
    createdAt: Date;
}

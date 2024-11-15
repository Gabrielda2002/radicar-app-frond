export interface IItemsNetworking {
    id:              number;
    sedeId:          number;
    name:            string;
    brand:           string;
    model:           string;
    serial:          string;
    addressIp:       string;
    mac:             string;
    otherData:       string;
    status:          string;
    inventoryNumber: string;
    createAt:           Date;
    updateAt:           Date;
    seguimientoDispositivosRedRelation: seguimientoDispositivosRedRelation[];
}

export interface seguimientoDispositivosRedRelation {
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


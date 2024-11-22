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
    dhcp:             boolean;
    idUsuario:        number | null;
    createAt:           Date;
    updateAt:           Date;
    seguimientoEquipos: SeguimientoEquipo[];
    accessoriesRelation: AccessoriesRelation[];
    componentRelation:   ComponentRelation[];
    softwareRelation:    SoftwareRelation[];
    userRelation:        UserRelation;
    
}

export interface AccessoriesRelation {
    id:              number;
    equipmentId:     number;
    name:            string;
    brand:           string;
    model:           string;
    serial:          string;
    otherData:       string;
    status:          string;
    inventoryNumber: string;
}

export interface ComponentRelation {
    id:           number;
    idEquipments: number;
    name:         string;
    brand:        string;
    capacity:     string;
    speed:        string;
    otherData:    string;
    model:        string;
    serial:       string;
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

export interface SoftwareRelation {
    id:          number;
    equipmentId: number;
    name:        string;
    versions:    string;
    license:     string;
    otherData:   string;
    installDate: Date;
    status:      string;
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

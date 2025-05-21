export interface IItems {
    id:                       number;
    sedeId:                   number;
    nameEquipment:            string;
    area:                     string;
    typeEquipment:            string;
    brandEquipment:           string;
    modelEquipment:           string;
    serialEquipment:          string;
    operationalSystem:        string;
    addressIp:                string;
    mac:                      string;
    purchaseDate:             Date;
    warrantyTime:             string;
    warranty:                 boolean;
    deliveryDate:             Date;
    inventoryNumberEquipment: string;
    dhcp:                     boolean;
    lock:                     boolean;
    lockKey:                  number;
    createAt:                 Date;
    updateAt:                 Date;
    idUser:                   number;
    nameUser:                 string;
    lastNameUser:             string;
    nameDocument:             string;
    processEquipment:         ProcessEquipment[];
    accessories:              Accessory[];
    components:               Component[];
    software:                 Software[];
}

export interface Accessory {
    id:              number;
    name:            string;
    brand:           string;
    model:           string;
    serial:          string;
    description:     string;
    status:          string;
    inventoryNumber: string;
}

export interface Component {
    id:        number;
    name:      string;
    brand:     string;
    capacity:  string;
    speed:     string;
    description: string;
    model:     string;
    serial:    string;
}
export interface ProcessEquipment {
    id:                  number;
    eventDate:           Date;
    TypeEvent:           string;
    description:         string;
    responsableName:     string;
    responsableLastName: string;
}

export interface Software {
    id:          number;
    name:        string;
    versions:    string;
    license:     string;
    otherData:   string;
    installDate: Date;
    status:      string;
}
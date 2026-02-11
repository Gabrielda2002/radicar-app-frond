export interface IItemsPhone {
    id:                   number;
    name:                 string;
    brand:                string;
    model:                string;
    serial:               string;
    phoneNumber:          string;
    operador:             string;
    typePlan:             string;
    dueDatePlan:          Date;
    macWifi:              string;
    addressBluetooth:     string;
    purchaseDate:         Date;
    warrantyTime:         string;
    warranty:             boolean;
    deliveryDate:         Date;
    protectorCase:        boolean;
    temperedGlass:        boolean;
    status:               string;
    observation:          string;
    acquisitionValue:     string;
    imei:                 string;
    operativeSystem:      string;
    versionSO:            string;
    storage:              string;
    storageRam:           string;
    createdAt:            Date;
    updatedAt:            Date;
    sedeId:               number;
    monitoring:           Monitoring[];
    responsableId:        number;
    responsableName:      string;
    responsableLastName: string;
    nameSaved?:           string;
    documentId:           number;
    inventoryNumber:      string;
}

interface Monitoring {
    id: number;
    description: string;
    responsableName: string;
    responsableLastName: string;
    typeEvent: string;
    eventDate: Date;
    createdAt: Date;
}
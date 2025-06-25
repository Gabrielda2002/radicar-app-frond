export interface IItemsTv {
    id:               number;
    sedeId:           number;
    name:             string;
    location:         string;
    brand:            string;
    model:            string;
    serial:           string;
    pulgadas:         number;
    screenType:       string;
    smartTv:          boolean;
    operativeSystem:  string;
    addressIp:        string;
    mac:              string;
    resolution:       string;
    numPuertosHdmi:   number;
    numPuertosUsb:    number;
    connectivity:     string;
    purchaseDate:     Date;
    warrantyTime:     string;
    warranty:         boolean;
    deliveryDate:     Date;
    inventoryNumber:  string;
    responsableId:    number;
    responsableName:  string;
    responsableLastName: string;
    observations:     string;
    status:           string;
    acquisitionValue: string;
    controlRemote:    boolean;
    utility:          string;
    seguimiento:      Seguimiento[];
}

interface Seguimiento {
    id:              number;
    eventDate:       Date;
    observation:     string;
    responsableId:  number;
    responsableName: string;
    responsableLastName: string;
}

export interface IItemsNetworking {
    id:                                 number;
    sedeId:                             number;
    name:                               string;
    brand:                              string;
    model:                              string;
    serial:                             string;
    addressIp:                          string;
    mac:                                string;
    otherData:                          string;
    status:                             string;
    inventoryNumber:                    string;
    seguimiento:                        seguimiento[];
}

export interface seguimiento {
    id:                  number;
    dateEvent:           Date | null;
    eventType:           string;
    description:         string;
    responsableName:     string;
    responsableLastName: string;
}

export interface IExpiringEquipment {
    total:        number;
    inWarranty:   number;
    percentage:   string;
    expiringSoon: ExpiringSoon;
}

export interface ExpiringSoon {
    count:    number;
    equiment: Equiment[];
}

export interface Equiment {
    id:           number;
    purchaseDate: Date;
    warrantyTime: string;
}

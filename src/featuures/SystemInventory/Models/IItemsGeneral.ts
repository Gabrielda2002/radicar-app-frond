export interface IItemsGeneral {
    id:               number;
    name:             string;
    brand:            string;
    model:            string;
    serialNumber:     string;
    location:         string;
    quantity:         number;
    otherDetails:     string;
    acquisitionDate:  Date;
    purchaseValue:    string;
    warranty:         number;
    warrantyPeriod:   string;
    inventoryNumber:  null;
    createdAt:        Date;
    updatedAt:        Date;
    classificationId: number;
    headquarters:     string;
    responsable:      string;
    classification:   string;
    asset:            string;
    material:         string;
    status:           string;
    areaType:         string;
    assetType:        string;
    dependencyArea:   string;
}

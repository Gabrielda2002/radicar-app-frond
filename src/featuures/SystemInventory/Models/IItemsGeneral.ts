export interface IItemsGeneral {
  id: number;
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  location: string;
  quantity: number;
  otherDetails: string;
  acquisitionDate: Date;
  purchaseValue: string;
  warranty: number;
  warrantyPeriod: string;
  inventoryNumber: null;
  createdAt: Date;
  updatedAt: Date;
  classificationId: number;
  headquarters: string;
  responsable: string;
  classification: string;
  asset: string;
  assetId: number;
  materialId: number;
  statusId: number;
  areaTypeId: number;
  assetTypeId: number;
  dependencyAreaId: number;
  material: string;
  status: string;
  areaType: string;
  assetType: string;
  dependencyArea: string;
  seguimiento: Seguimiento[];
}

interface Seguimiento {
  id: number;
  dateEvent: Date;
  eventType: string;
  description: string;
  responsableName: string;
  responsableLastName: string;
}

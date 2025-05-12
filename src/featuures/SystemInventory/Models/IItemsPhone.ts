export interface IItemsPhone {
    id: number;
    name: string;
    brand: string;
    model: string;
    serial: string;
    imei: string;
    operativeSystem: string;
    versionSO: string;
    storage: string;
    createdAt: Date;
    updatedAt: Date;
    sedeId: number;
    responsableId: number;
    responsableName: string;
    responsableLastName: string;
    nameSaved: string;
    seguimientoRelation:  SeguimientoRelation[];
}
interface SeguimientoRelation {
    id: number;
    description: string;
    responsableName: string;
    responsableLastName: string;
    typeEvent: string;
    eventDate: Date;
    createdAt: Date;
}
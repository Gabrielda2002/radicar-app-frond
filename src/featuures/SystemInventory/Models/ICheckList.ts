export interface MaintenanceData {
  checklist: MaintenanceChecklistItem[];
  accessories: Accessory[];
}

interface Accessory {
  id: number;
  name: string;
  observation: string;
  statusMaintenance: string;
}
export interface MaintenanceChecklistItem {
    id:                    number;
    seguimientoEquipoId:   number;
    checklistItemId:       number;
    isChecked:             boolean;
    checkedAt:             null;
    createdAt:             Date;
    updatedAt:             Date;
    checklistItemRelation: ChecklistItemRelation;
}

export interface ChecklistItemRelation {
    id:           number;
    itemKey:      string;
    label:        string;
    displayOrder: number;
    isActive:     boolean;
    createdAt:    Date;
    updatedAt:    Date;
}
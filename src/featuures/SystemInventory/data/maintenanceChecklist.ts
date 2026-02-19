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



  export const MAINTENANCE_CHECKLIST = [
    {
      id: "limpieza-interna",
      label: "Limpieza interna del equipo",
    },
    {
      id: "limpieza-externa",
      label: "Limpieza externa del equipo",
    },
    {
      id: "revision-refrigeracion",
      label: "Limpieza y revisión de sistema de refrigeracion",
    },
    {
      id: "pasta-termica",
      label: "Aplicación/revisión de pasta térmica",
    },
    {
      id: "actualizacion-so",
      label: "Actualización del sistema operativo",
    },
    // {
    //   id: "actualizacion-antivirus",
    //   label: "Actualización de antivirus/seguridad",
    // },
    {
      id: "desfragmentacion",
      label: "Desfragmentación/optimización de disco",
    },
    {
      id: "revision-cables",
      label: "Revisión de cables y conexiones",
    },
    {
      id: "limpieza-temporales",
      label: "Limpieza de archivos temporales",
    },
    // {
    //   id: "verificacion-backups",
    //   label: "Verificación de backups",
    // },
    {
      id: "revision-perifericos",
      label: "Revisión de periféricos (teclado, mouse, monitor)",
    },
    {
      id: "pruebas-rendimiento",
      label: "Pruebas de rendimiento general",
    },
    {
      id: "revision-bateria",
      label: "Revisión del estado de la batería (laptops)",
    }
  ];

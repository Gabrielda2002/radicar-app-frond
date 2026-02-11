export interface MaintenanceChecklistItem {
  id: string;
  label: string;
}

export const MAINTENANCE_CHECKLIST: MaintenanceChecklistItem[] = [
  {
    id: "limpieza-interna",
    label: "Limpieza interna del equipo",
  },
  {
    id: "limpieza-externa",
    label: "Limpieza externa del equipo",
  },
  {
    id: "revision-ventiladores",
    label: "Revisión y limpieza de ventiladores",
  },
  {
    id: "pasta-termica",
    label: "Aplicación/revisión de pasta térmica",
  },
  {
    id: "actualizacion-so",
    label: "Actualización del sistema operativo",
  },
  {
    id: "actualizacion-antivirus",
    label: "Actualización de antivirus/seguridad",
  },
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
  {
    id: "verificacion-backups",
    label: "Verificación de backups",
  },
  {
    id: "revision-perifericos",
    label: "Revisión de periféricos (teclado, mouse, monitor)",
  },
  {
    id: "pruebas-rendimiento",
    label: "Pruebas de rendimiento general",
  },
];

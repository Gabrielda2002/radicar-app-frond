import React, { useState } from "react";
import ModalSeguimientoItem from "./ModalSeguimientoItem";
import { MAINTENANCE_CHECKLIST } from "@/featuures/SystemInventory/data/maintenanceChecklist";
import { FormatDate } from "@/utils/FormatDate";
import { AnyItem } from "../../strategies/ItemStrategy";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import {
  useTableState,
  DataTable,
  DataTableContainer,
  type ColumnConfig
} from "@/components/common/ReusableTable";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

interface ModalTablaseguimientoItemProps {
  Items: AnyItem;
  tipoItem:
  | "equipos"
  | "dispositivos-red"
  | "inventario/general"
  | "inventario/televisores"
  | "inventario/celulares"
  | null;
  refreshItems: () => void;
}

const ModalTablaSeguimientoItem: React.FC<ModalTablaseguimientoItemProps> = ({
  Items,
  tipoItem,
  refreshItems,
}) => {
  const [stadopen, setStadopen] = useState(false);

  // Función helper para obtener las etiquetas legibles del checklist
  const getChecklistLabels = (checklistIds?: string[]) => {
    if (!checklistIds || checklistIds.length === 0) return [];
    return checklistIds
      .map((id) => MAINTENANCE_CHECKLIST.find((item) => item.id === id)?.label)
      .filter((label): label is string => label !== undefined);
  };

  // Obtener datos de seguimiento (ahora todos usan la misma propiedad 'monitoring')
  const monitoringData = Items?.monitoring || [];

  // Hook de tabla con búsqueda y paginación
  const tableState = useTableState({
    data: monitoringData as any[],
    searchFields: ["typeEvent", "TypeEvent", "description", "observation", "responsableName", "responsableLastName"] as any,
    initialItemsPerPage: 10,
  });

  // Configuración de columnas para la tabla
  const columns: ColumnConfig<any>[] = [
    {
      key: "eventDate",
      header: "Fecha",
      render: (item) => FormatDate(item.eventDate, false),
      cellClassName: "text-gray-600 dark:text-white",
    },
    {
      key: "typeEvent",
      header: "Tipo de Evento",
      render: (item) => item.typeEvent || item.TypeEvent || "N/A",
      cellClassName: "font-medium dark:text-white",
    },
    {
      key: "description",
      header: "Descripción",
      render: (item) => {
        const description = item.description || item.observation || "";
        const typeEvent = item.typeEvent || item.TypeEvent || "";
        const hasChecklist = typeEvent === "MANTENIMIENTO PREVENTIVO" && item.checklist && item.checklist.length > 0;

        return (
          <div>
            <div className="mb-1 whitespace-normal max-w-md" title={description}>
              {description}
            </div>
            {hasChecklist && (
              <div className="flex flex-wrap gap-1 mt-2">
                {getChecklistLabels(item.checklist).map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                  >
                    ✓ {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      },
      cellClassName: "text-gray-700 dark:text-white",
    },
    {
      key: "responsable",
      header: "Usuario",
      render: (item) => `${item.responsableName} ${item.responsableLastName}`,
      cellClassName: "text-gray-500 dark:text-white",
    },
  ];

  return (
    <>
      <div className="relative group">
        <button
          className="p-2 duration-200 border rounded-md hover:bg-gray-200 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          onClick={() => setStadopen(true)}
        >
          <WrenchScrewdriverIcon className="w-7 h-7" />
        </button>
        {/* Tooltip */}
        <div className="absolute z-10 px-2 py-1 text-sm text-white transition-opacity duration-200 transform -translate-x-1/2 translate-y-1 bg-gray-800 rounded-md opacity-0 pointer-events-none left-1/2 group-hover:opacity-100 dark:bg-gray-900">
          Seguimientos
          {/* Flechita indicativa */}
          <div className="absolute z-0 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-gray-800 bottom-5.5 left-1/2 dark:bg-gray-900"></div>
        </div>
      </div>

      <ModalDefault
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title="Seguimiento del Item"
        size="xl"
        className="max-h-[90vh] overflow-hidden"
        showSubmitButton={false}
        cancelText="Cerrar"
        funtionClick={() => setStadopen(false)}
      >
        <div className="flex flex-col max-h-[calc(90vh-120px)] gap-4">
          <div className="px-2 py-3 shrink-0">
            <ModalSeguimientoItem
              id={Items?.id || 0}
              tipoItem={tipoItem}
              refreshItems={refreshItems}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            <DataTableContainer
              searchValue={tableState.searchQuery}
              onSearchChange={tableState.setSearchQuery}
              searchPlaceholder="Buscar seguimientos..."
              itemsPerPage={tableState.itemsPerPage}
              onItemsPerPageChange={tableState.setItemsPerPage}
              currentPage={tableState.currentPage}
              totalPages={tableState.totalPages}
              onPageChange={tableState.paginate}
              showPagination={tableState.totalPages > 1}
              className="shadow-none bg-transparent dark:bg-transparent"
            >
              <DataTable
                data={tableState.currentData()}
                columns={columns}
                getRowKey={(item) => item.id}
                emptyMessage="No hay seguimientos registrados para este ítem."
                tableClassName="border-collapse"
              />
            </DataTableContainer>
          </div>
        </div>
      </ModalDefault>
    </>
  );
};

export default ModalTablaSeguimientoItem;

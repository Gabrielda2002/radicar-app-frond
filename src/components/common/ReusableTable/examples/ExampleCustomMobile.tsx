/**
 * EJEMPLO 3: Tabla con Vista Mobile Personalizada
 * 
 * Este ejemplo muestra cómo personalizar la vista mobile
 * de la tabla usando renderMobileCard.
 */

import { DataTable, DataTableContainer, useTableState } from "../index";
import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { useFetchSede } from "@/hooks/UseFetchSede";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("@/components/common/Modals/CrearDataTables/ModalAgregarDato"));

export const ExampleCustomMobile = () => {
  const { data, loading, error, refetch } = useFetchSede();

  const tableState = useTableState({
    data: data,
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "60px",
      accessor: (item: ILugarRadicacion) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      width: "200px",
      accessor: (item: ILugarRadicacion) => item.name,
    },
    {
      key: "headquartersNumber",
      header: "Numero",
      width: "200px",
      accessor: (item: ILugarRadicacion) => item.headquartersNumber,
    },
    {
      key: "status",
      header: "Estado",
      width: "100px",
      render: (item: ILugarRadicacion) => (item.status ? "Activo" : "Inactivo"),
    },
    {
      key: "department",
      header: "Departamento",
      width: "100px",
      accessor: (item: ILugarRadicacion) => item.department,
    },
    {
      key: "city",
      header: "Municipio",
      width: "100px",
      accessor: (item: ILugarRadicacion) => item.city,
    },
  ];

  // Vista mobile personalizada
  const renderMobileCard = (item: ILugarRadicacion) => (
    <div className="space-y-3">
      {/* Header del card */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-300 dark:border-gray-600">
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          {item.name}
        </span>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.status
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {item.status ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Información */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">ID</p>
          <p className="font-medium text-gray-800 dark:text-white">{item.id}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Número</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {item.headquartersNumber}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Departamento</p>
          <p className="font-medium text-gray-800 dark:text-white">
            {item.department}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Municipio</p>
          <p className="font-medium text-gray-800 dark:text-white">{item.city}</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-end pt-2 border-t border-gray-300 dark:border-gray-600">
        <Suspense fallback={<LoadingSpinner />}>
          <ModalAction
            name="Lugar Radicacion"
            item={item}
            endPoint="update-lugar-status"
            onSuccess={refetch}
          />
        </Suspense>
      </div>
    </div>
  );

  return (
    <DataTableContainer
      searchValue={tableState.searchQuery}
      onSearchChange={tableState.setSearchQuery}
      itemsPerPage={tableState.itemsPerPage}
      onItemsPerPageChange={tableState.setItemsPerPage}
      currentPage={tableState.currentPage}
      totalPages={tableState.totalPages}
      onPageChange={tableState.paginate}
      headerActions={
        <Suspense fallback={<LoadingSpinner />}>
          <ModalAgregarDato
            name="Lugar Radicacion"
            endPoint="lugares-radicacion"
            onSuccess={refetch}
          />
        </Suspense>
      }
    >
      <DataTable
        data={tableState.currentData()}
        columns={columns}
        getRowKey={(item) => item.id.toString()}
        loading={loading}
        error={error}
        renderActions={(item) => (
          <Suspense fallback={<LoadingSpinner />}>
            <ModalAction
              name="Lugar Radicacion"
              item={item}
              endPoint="update-lugar-status"
              onSuccess={refetch}
            />
          </Suspense>
        )}
        renderMobileCard={renderMobileCard}
      />
    </DataTableContainer>
  );
};

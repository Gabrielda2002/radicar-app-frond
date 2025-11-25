//*Funciones y Hooks
import { lazy, Suspense } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchEspecialidad } from "../Hooks/UseFetchEspecialidad";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IEspecialidad } from "@/models/IEspecialidad";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";

const ModalAction = lazy(
  () => import("@/components/common/Modals/ActionTables/ModalAction")
);
const ModalAgregarDato = lazy(
  () => import("@/components/common/Modals/CrearDataTables/ModalAgregarDato")
);

const TablaEspecialidad = () => {
  const { data, loading, error, refetch } = useFetchEspecialidad();

  const tableState = useTableState({
    data: data,
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IEspecialidad) => item.id,
    },
    {
      key: "name",
      header: "Nombre Especialidad",
      width: "30%",
      accessor: (item: IEspecialidad) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IEspecialidad) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Especialidad"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Especialidad", path: "" },
        ]}
      />

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
              name="Especialidad"
              endPoint="especialidades"
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
                name="Especialidad"
                item={item}
                endPoint="update-status-especialidad"
                onSuccess={refetch}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaEspecialidad;

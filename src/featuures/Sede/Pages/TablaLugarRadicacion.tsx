//*Funciones y Hooks
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { useFetchSede } from "@/hooks/UseFetchSede";
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

const TablaLugarRadicacion = () => {
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
      width: "10%",
      accessor: (item: ILugarRadicacion) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      width: "20%",
      accessor: (item: ILugarRadicacion) => item.name,
    },
    {
      key: "headquartersNumber",
      header: "Número",
      width: "10%",
      accessor: (item: ILugarRadicacion) => item.headquartersNumber,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      accessor: (item: ILugarRadicacion) => (item.status ? "Activo" : "Inactivo"),
    },
    {
      key: "department",
      header: "Departamento",
      width: "15%",
      accessor: (item: ILugarRadicacion) => item.department,
    },
    {
      key: "city",
      header: "Municipio",
      width: "15%",
      accessor: (item: ILugarRadicacion) => item.city,
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
        title="Módulo Lugar Radicación"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Lugar Radicación", path: "" },
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
        />
      </DataTableContainer>
    </>
  );
};

export default TablaLugarRadicacion;

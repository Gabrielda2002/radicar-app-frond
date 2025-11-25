//*Funciones y Hooks
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchService } from "../Hooks/UseFetchService";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IServicios } from "@/models/IServicio";
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

const TablaTipoServicio = () => {
  const { data, loading, error, refetch } = useFetchService();

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
      accessor: (item: IServicios) => item.id,
    },
    {
      key: "name",
      header: "Nombre Tipo Servicio",
      width: "30%",
      accessor: (item: IServicios) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IServicios) => (item.status ? "Activo" : "Inactivo"),
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
        title="Módulo Tipo Servicio"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Tipo Servicio", path: "" },
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
              name="Tipo Servicio"
              endPoint="servicios"
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
                name="Tipo Servicio"
                item={item}
                endPoint="update-status-servicio"
                onSuccess={refetch}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaTipoServicio;

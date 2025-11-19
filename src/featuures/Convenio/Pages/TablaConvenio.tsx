//*Funciones y Hooks
import { lazy, Suspense } from "react";
// import ModalAction from "../modals/ModalAction";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
// import ModalAgregarDato from "../modals/ModalAgregarDato";
import { useFetchConvenio } from "@/hooks/UseFetchConvenio";
import { IConvenios } from "@/models/IConvenios";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";
const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("@/components/common/Modals/CrearDataTables/ModalAgregarDato"));


const TablaConvenios = () => {
  const { dataConvenios, loading, errorConvenio, refetch } = useFetchConvenio();

  const tableState = useTableState({
    data: dataConvenios,
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10
  })

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "30%",
      accessor: (item: IConvenios) => item.id,
    },
    {
      key: "name",
      header: "Nombre Convenio",
      width: "20%",
      accessor: (item: IConvenios) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IConvenios) => (item.status ? "Activo" : "Inactivo"),
    }
  ]

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorConvenio)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorConvenio}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Convenio"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Convenios", path: "" },
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
          showPagination={true}
          headerActions={
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAgregarDato
                name="Convenio"
                endPoint="convenio"
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
            error={errorConvenio}
            renderActions={(item) => (
              <Suspense fallback={<LoadingSpinner />}>
                <ModalAction
                  name="Convenio"
                  endPoint="update-status-convenio"
                  onSuccess={refetch}
                  item={item}
                />
              </Suspense>
            )}
          />
        </DataTableContainer>
    </>
  );
};

export default TablaConvenios;

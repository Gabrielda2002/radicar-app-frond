//*Funciones y Hooks
import { lazy, Suspense } from "react";
// import ModalAction from "../modals/ModalAction";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchDocumento } from "@/hooks/UseFetchDocument";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IDocumento } from "@/models/IDocumento";
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

const TablaTipoDocumento = () => {
  const load = true;
  const { dataDocumento, loadingDocumento, errorDocumento, refetch } =
    useFetchDocumento(load);

  const tableState = useTableState({
    data: dataDocumento,
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "30%",
      accessor: (item: IDocumento) => item.id,
    },
    {
      key: "name",
      header: "Nombre Tipo Documento",
      width: "20%",
      accessor: (item: IDocumento) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IDocumento) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  if (loadingDocumento) return <LoadingSpinner duration={100000} />;
  if (errorDocumento)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorDocumento}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Tipo Documento"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Tipo Documento", path: "" },
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
              onSuccess={refetch}
              endPoint="documento"
              name="Tipo Documento"
            />
          </Suspense>
        }
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={loadingDocumento}
          error={errorDocumento}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAction
                endPoint="update-status-documento"
                onSuccess={refetch}
                item={item}
                name="Tipo Documento"
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaTipoDocumento;

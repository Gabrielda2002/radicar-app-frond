//*Funciones y Hooks
import { lazy, Suspense } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchIpsPrimaria } from "@/hooks/UseFetchIpsPrimaria";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalAgregarDato = lazy(() => import("@/components/common/Modals/CrearDataTables/ModalAgregarDato"));


const TablaIpsPrimaria = () => {
  const load = true;
  const { dataIpsPrimaria, loading, errorIpsPrimaria, refetch } =
  useFetchIpsPrimaria(load);


  const tableState = useTableState({
    data: dataIpsPrimaria || [],
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "20%",
      accessor: (item: IIPSPrimaria) => item.id,
    },
    {
      key: "name",
      header: "Nombre IPS Primaria",
      width: "50%",
      accessor: (item: IIPSPrimaria) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "20%",
      render: (item: IIPSPrimaria) => (item.status ? "Activo" : "Inactivo"),
    }
  ]

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorIpsPrimaria)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorIpsPrimaria}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo IPS Primaria"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio IPS Primaria", path: "" },
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
              endPoint="create-ips-primaria"
              name="ips-primaria"
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
          error={errorIpsPrimaria}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAction
                endPoint="update-status-ips-primaria"
                name="ips-primaria"
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

export default TablaIpsPrimaria;

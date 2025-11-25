//*Funciones y Hooks
import { lazy, Suspense } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchIpsRemite } from "../Hooks/UseFetchIpsRemite";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IIPSRemite } from "@/models/IIpsRemite";
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

const TablaIpsRemite = () => {
  const { data, loading, error, refetch } = useFetchIpsRemite();

  const tableState = useTableState({
    data: data,
    searchFields: ["id", "name", "status"],
    initialItemsPerPage: 10,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "20%",
      accessor: (item: IIPSRemite) => item.id,
    },
    {
      key: "name",
      header: "Nombre IPS Remite",
      width: "50%",
      accessor: (item: IIPSRemite) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "20%",
      render: (item: IIPSRemite) => (item.status ? "Activo" : "Inactivo"),
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
        title="Módulo IPS Remitente"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio IPS Remite", path: "" },
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
              name="IPS Remite"
              endPoint="ips-remite"
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
                name="IPS Remite"
                item={item}
                endPoint="update-status-ips-remite"
                onSuccess={refetch}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaIpsRemite;

//*Funciones y Hooks
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IMunicipios } from "@/models/IMunicipios";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const ModalAction = lazy(() => import("@/components/common/Modals/ActionTables/ModalAction"));
const ModalMunicipios = lazy(() => import("../Components/ModalMunicipios"));
const ITEMS_PER_PAGE = 10;

const TablaMunicipios = () => {
  const { municipios, loading, error: errorMunicipios, refetch } = useFetchMunicipio();

  const tableState = useTableState({
    data: municipios || [],
    searchFields: ["id", "name", "municipioCode", "status"],
    initialItemsPerPage: ITEMS_PER_PAGE,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IMunicipios) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      width: "30%",
      accessor: (item: IMunicipios) => item.name,
    },
    {
      key: "municipioCode",
      header: "Código Municipio",
      width: "30%",
      accessor: (item: IMunicipios) => item.municipioCode,
    }, 
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: IMunicipios) => (item.status ? "Activo" : "Inactivo"),
    }
  ]

  if (loading) return <LoadingSpinner duration={100000} />;
  if (errorMunicipios)
    return (
      <h1 className="flex justify-center text-lg dark:text-white">
        {errorMunicipios}
      </h1>
    );

  return (
    <>
      <ModalSection
        title="Módulo Municipios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Municipios", path: "" },
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
            <ModalMunicipios onSuccess={refetch} />
          </Suspense>
        }
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={loading}
          error={errorMunicipios}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalAction
                item={item}
                name="municipio"
                onSuccess={refetch}
                endPoint="update-status-municipio"
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaMunicipios;

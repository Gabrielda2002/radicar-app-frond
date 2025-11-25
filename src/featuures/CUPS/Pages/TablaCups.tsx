//*Funciones y Hooks
import { lazy, Suspense } from "react";
import { lazy, Suspense } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchCups } from "@/hooks/UseFetchCup";
import { ICups } from "@/models/ICups";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const ModalUpdateCupsDiagnostico = lazy(() => import("@/components/common/Modals/UpdateDiagCUPS/ModalUpdateCupsDiagnostico"));
const ModalCrearCupsDiagnostico = lazy(() => import("@/components/common/Modals/CreateDiagCUPS/ModalCrearCupsDiagnostico"));

const TablaCups = () => {
  const { data, loading, error, refetch } = useFetchCups();

  const tableState = useTableState({
    data: data,
    searchFields: ["id", "code", "name", "status"],
    initialItemsPerPage: 10
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: ICups) => item.id,
    },
    {
      key: "code",
      header: "Código",
      width: "20%",
      accessor: (item: ICups) => item.code,
    },
    {
      key: "description",
      header: "Descripción CUPS",
      width: "40%",
      accessor: (item: ICups) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: ICups) => (item.status ? "Activo" : "Inactivo"),
    }
  ];

  if (loading) return <LoadingSpinner duration={500} />;
  if (error)
    return (
      <h2 className="flex justify-center text-lg dark:text-white">{error}</h2>
    );

  return (
    <>
      <ModalSection
        title="Modulo Cups"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Cups", path: "" },
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
          <Suspense fallback={<LoadingSpinner/>}>
            <ModalCrearCupsDiagnostico
              modulo="cups" 
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
              <ModalUpdateCupsDiagnostico
                item={item} 
                modulo="cups" 
                onSuccess={refetch}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaCups;

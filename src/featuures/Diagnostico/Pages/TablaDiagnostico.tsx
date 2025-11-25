//*Funciones y Hooks
import { lazy, Suspense } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import {  useFetchDiagnostic } from "../Hooks/UseFetchDiagnostic";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { IDiagnostico } from "@/models/IDiagnostico";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const ModalUpdateCupsDiagnostico = lazy(() => import("@/components/common/Modals/UpdateDiagCUPS/ModalUpdateCupsDiagnostico"));
const ModalCrearCupsDiagnostico = lazy(() => import("@/components/common/Modals/CreateDiagCUPS/ModalCrearCupsDiagnostico"));

const TablaDiagnostico = () => {
  const { diagnostico, loading, errorDiagnostico, refetch } = useFetchDiagnostic();

  const tableState = useTableState({
    data: diagnostico || [],
    searchFields: ["id", "code", "description"],
    initialItemsPerPage: 10
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IDiagnostico) => item.id,
    },
    {
      key: "code",
      header: "Código",
      width: "20%",
      accessor: (item: IDiagnostico) => item.code,
    },
    {
      key: "description",
      header: "Descripción Diagnóstico",
      width: "40%",
      accessor: (item: IDiagnostico) => item.description,
    }
  ];

  if (loading) return <LoadingSpinner duration={500} />;
  if (errorDiagnostico)
    return (
      <h2 className="flex justify-center text-lg dark:text-white">{errorDiagnostico}</h2>
    );

  return (
    <>
      <ModalSection
        title="Modulo Diagnosticos"
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
          <Suspense fallback={<LoadingSpinner />}>
            <ModalCrearCupsDiagnostico
              modulo="diagnostico"
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
          error={errorDiagnostico}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalUpdateCupsDiagnostico
                item={item}
                onSuccess={refetch}
                modulo="diagnostico"
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default TablaDiagnostico;

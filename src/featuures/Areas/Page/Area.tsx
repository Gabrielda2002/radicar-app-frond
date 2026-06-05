import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { useFetchArea } from "../Hooks/useFetchArea";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalMutationArea from "@/components/common/ModalMutationArea/ModalMutationArea";
import { Suspense } from "react";
import { IArea } from "@/models/IArea";
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const Area = () => {
  const { area, isLoading, error, refetch } = useFetchArea();

  const ITEMS_PER_PAGE = 10;

  const tableState = useTableState({
    data: area || [],
    searchFields: ["description", "name", "managerName"],
    initialItemsPerPage: ITEMS_PER_PAGE
  })

  const columnsConfig: ColumnConfig<IArea>[] = [
    {
      key: "id",
      header: "Id",
      size: 'xs' as const,
      accessor: (item: IArea) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      size: 'sm' as const,
      accessor: (item: IArea) => item.name,
    },
    {
      key: "description",
      header: "Descripcion",
      size: 'md' as const,
      accessor: (item: IArea) => item.description,
    },
    {
      key: "status",
      header: "Estado",
      size: 'xs' as const,
      render: (item: IArea) => (
        <span className={item.status ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}>{item.status ? "Activo" : "Inactivo"}</span>
      ),
    },
    {
      key: "managerName",
      header: "Jefe",
      size: 'sm' as const,
      accessor: (item: IArea) => item.managerName,
    }
  ]

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error !== null ? (
        <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
      ) : (
        <>
          <ModalSection
            title="Areas"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Areas", path: "/area" },
            ]}
          />
          <DataTableContainer
            searchValue={tableState.searchQuery}
            onSearchChange={(tableState.setSearchQuery)}
            itemsPerPage={tableState.itemsPerPage}
            onItemsPerPageChange={tableState.setItemsPerPage}
            currentPage={tableState.currentPage}
            totalPages={tableState.totalPages}
            onPageChange={tableState.paginate}
          >
            <DataTable
              data={tableState.currentData()}
              columns={columnsConfig}
              getRowKey={(item) => item.id.toString()}
              loading={isLoading}
              error={error}
              renderActions={(item) => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ModalMutationArea onSuccess={refetch} item={item} />
                </Suspense>
              )}
            />
          </DataTableContainer>
        </>
      )}
    </>
  );
};

export default Area;

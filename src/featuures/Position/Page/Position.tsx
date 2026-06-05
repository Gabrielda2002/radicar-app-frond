import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { useFetchPosition } from "../Hooks/useFetchPosition";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalPositionMutatios from "../Componentes/ModalPositionMutatios";
import { Suspense } from "react";
import { IPosition } from "@/models/IPosition";
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const Position = () => {
  const { data, isLoading, error, refetch } = useFetchPosition();

  const ITEMS_PER_PAGE = 10;

  const tableState = useTableState({
    data: data || [],
    searchFields: ["description", "name", "areaName"],
    initialItemsPerPage: ITEMS_PER_PAGE
  });

  const columnsConfig: ColumnConfig<IPosition>[] = [
    {
      key: "id",
      header: "Id",
      size: 'xs' as const,
      accessor: (item: IPosition) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      size: 'sm' as const,
      accessor: (item: IPosition) => item.name,
    },
    {
      key: "description",
      header: "Descripcion",
      size: 'md' as const,
      accessor: (item: IPosition) => item.description,
    },
    {
      key: "areaName",
      header: "Area",
      size: 'sm' as const,
      accessor: (item: IPosition) => item.areaName,
    },
    {
      key: "status",
      header: "Estado",
      size: 'xs' as const,
      render: (item: IPosition) => (
        <span className={item.status ? "text-green-500 dark:text-green-600" : "text-red-500 dark:text-red-600"}>{item.status ? "Activo" : "Inactivo"}</span>
      ),
    }
  ];

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error !== null ? (
        <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
      ) : (
        <>
          <ModalSection
            title="Cargos"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Cargos", path: "/Position" },
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
          >
            <DataTable
              data={tableState.currentData()}
              columns={columnsConfig}
              getRowKey={(item) => item.id.toString()}
              loading={isLoading}
              error={error}
              renderActions={(item) => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ModalPositionMutatios onSuccess={refetch} item={item} />
                </Suspense>
              )}
            />
          </DataTableContainer>
        </>
      )}
    </>
  );
};

export default Position;

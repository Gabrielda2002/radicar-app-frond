import { Suspense, lazy, useMemo } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import {
  DataTable,
  DataTableContainer,
  useTableState,
  type ColumnConfig,
} from "@/components/common/ReusableTable";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";

const GenericFormModal = lazy(
  () => import("@/components/common/Modals/GenericFormModal/GenericFormModal")
);

export interface DataProvider<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface ConfigurableTablePageProps<T extends { id: number | string }> {
  name: string;
  formConfig: TableFormConfig;
  dataProvider: DataProvider<T>;
  columns: ColumnConfig<T>[];
  searchFields: string[];
  hidePageHeader?: boolean;
  breadcrumb?: { label: string; path: string }[];
  initialItemsPerPage?: number;
}

function ConfigurableTablePage<T extends { id: number | string }>({
  name,
  formConfig,
  dataProvider,
  columns,
  searchFields,
  hidePageHeader = false,
  breadcrumb,
  initialItemsPerPage = 10,
}: ConfigurableTablePageProps<T>) {
  const { data, loading, error, refetch } = dataProvider;

  const tableState = useTableState({
    data: data as unknown as object[],
    searchFields: searchFields as never,
    initialItemsPerPage,
  });

  const safeColumns = useMemo(
    () => columns as ColumnConfig<object>[],
    [columns]
  );

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) {
    return (
      <h1 className="flex justify-center text-lg dark:text-white">{error}</h1>
    );
  }

  return (
    <>
      {!hidePageHeader && breadcrumb && (
        <HeaderPage title={`Módulo ${name}`} breadcrumb={breadcrumb} />
      )}

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
            <GenericFormModal
              mode="create"
              name={name}
              formConfig={formConfig}
              onSuccess={refetch}
            />
          </Suspense>
        }
      >
        <DataTable
          data={tableState.currentData() as unknown as object[]}
          columns={safeColumns}
          getRowKey={(item) => String((item as T).id)}
          loading={loading}
          error={error}
          renderActions={(item) => (
            <Suspense fallback={<LoadingSpinner />}>
              <GenericFormModal
                mode="edit"
                name={name}
                formConfig={formConfig}
                source={item as Record<string, unknown>}
                onSuccess={refetch}
              />
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  );
}

export default ConfigurableTablePage;

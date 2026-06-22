import { Suspense, useEffect } from "react"
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable"
import { IProfessional, useProfessionalStore } from "../hooks/useProfessionalStore"
import { FormatDate } from "@/utils/FormatDate"
import ModalProfessional from "@/components/common/Modals/ModalProfessinal/ModalProfessional"
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner"

const Professional = () => {

    const { data, isLoading, error, getAll } = useProfessionalStore()

    useEffect(() => {
        getAll()
    }, [getAll])

    const tableState = useTableState({
        data: data || [],
        searchFields: ['id', "name"],
        initialItemsPerPage: 10
    })

    const columns: ColumnConfig<IProfessional>[] = [
        {
            key: "id",
            header: "Id",
            size: 'xs',
            accessor: (item) => item.id
        },
        {
            key: "name",
            header: "Nombre",
            size: 'md',
            accessor: (item) => item.name
        },
        {
            key: "created",
            header: "Creado",
            size: 'md',
            accessor: (item) => FormatDate(item.createdAt)
        },
        {
            key: "updated",
            header: "Actualizado",
            size: 'md',
            accessor: (item) => FormatDate(item.createdAt)
        },
    ]

  return (
    <>
      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
        // headerActions={
        //   <Suspense fallback={<LoadingSpinner />}>
        //     <ModalAgregarDato
        //       name="Tipo Documento"
        //       endPoint="documento"
        //       onSuccess={refetch}
        //     />
        //   </Suspense>
        // }
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={isLoading}
          error={error}
          renderActions={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <ModalProfessional/>
            </Suspense>
          )}
        />
      </DataTableContainer>
    </>
  )
}

export default Professional

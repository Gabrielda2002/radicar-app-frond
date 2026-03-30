import {  DataTable, DataTableContainer, useTableState } from '@/components/common/ReusableTable'
import React from 'react'
import { ReportRadicacion } from '../types/Report.type';

interface TableReportPreviewProps {
    data: ReportRadicacion;
}

const TableReportPreview: React.FC<TableReportPreviewProps> = ({ data }) => {

     const tableState = useTableState({
        data: data.data || [],
        searchFields: [],
        initialItemsPerPage: 10
     })

     const columns = [
        // {
        //     key: "id",
        //     header: "ID",
        //     size: "xs" as const,
        //     accessor: (item: any) => item.id,
        // },
        {
            key: "tipo_documento",
            header: "Tipo de documento",
            size: "md" as const,
            accessor: (item: any) => item.Tipo_de_documento,
        }
     ]

  return (
    <>

    <div className='p-4 mb-4 text-gray-800 dark:text-gray-100'>
        <h3 className='text-xl font-bold'>Preview del Reporte</h3>
    </div>

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
            columns={columns}
            getRowKey={(item) => item.Id.toString()}
        />
      </DataTableContainer>
    </>
  )
}

export default TableReportPreview

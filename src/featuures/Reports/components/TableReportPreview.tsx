import { ColumnConfig, DataTable, DataTableContainer, useTableState } from '@/components/common/ReusableTable'
import React from 'react'
import { ReportPreviewData } from '../types/Report.type';

interface TableReportPreviewProps {
    data: ReportPreviewData;
    columns: ColumnConfig<any>[];
    getRowKey: (item: any) => string;
    searchFields: string[];
}

const TableReportPreview: React.FC<TableReportPreviewProps> = ({ 
    data, 
    columns, 
    getRowKey, 
    searchFields 
}) => {

    const tableState = useTableState({
        data: data.data || [],
        searchFields: searchFields,
        initialItemsPerPage: 10
    })

    return (
        <>
            {data.total > 0 ? (
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
                        getRowKey={getRowKey}
                    />
                </DataTableContainer>
            ) : (
                <div className='flex flex-col items-center justify-center text-gray-500 dark:text-gray-400'>
                    <p>Selecciona un periodo o filtros deseados para ver el preview del reporte.</p>
                </div>
            )}
        </>
    )
}

export default TableReportPreview

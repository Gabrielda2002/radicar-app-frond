import { ColumnConfig } from '@/components/common/ReusableTable'
import ConfigurableTablePage from '../ConfigurableTablePage'
import { useFetchClassification } from '@/featuures/SystemInventory/Hooks/useFetchClassification'
import { ICustomSelectOption } from '@/featuures/SystemInventory/Models/ICustomSelectOption'
import { ClassificationForm } from '../../config/forms/classificationForm'

const TableClassification = () => {

    const { classification, refetch, error, loading } = useFetchClassification();
    const columns: ColumnConfig<ICustomSelectOption>[] = [
        {
            key: "id",
            header: "ID",
            size: 'sm' as const,
            accessor: (item: ICustomSelectOption) => item.id
        },
        {
            key: "name",
            header: "Nombre",
            size: 'md' as const,
            accessor: (item: ICustomSelectOption) => item.name
        },
    ]

    return (
        <>
            <ConfigurableTablePage
                name='Clasificación'
                formConfig={ClassificationForm}
                dataProvider={{
                    data: classification,
                    loading,
                    error,
                    refetch
                }}
                columns={columns}
                searchFields={['id', 'name']}
            />
        </>
    )
}

export default TableClassification

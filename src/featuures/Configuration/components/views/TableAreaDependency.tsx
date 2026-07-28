import { ColumnConfig } from '@/components/common/ReusableTable'
import { useFetchAreaDependency } from '@/featuures/SystemInventory/Hooks/useFetchAreaDependency'
import { ICustomSelectOption } from '@/featuures/SystemInventory/Models/ICustomSelectOption'
import ConfigurableTablePage from '../ConfigurableTablePage'
import { AreaDependencyForm } from '../../config/forms/AreaDependencyForm'

const TableAreaDependency = () => {

    const { areaDependency, error, loading, refetch } = useFetchAreaDependency()

    const columns: ColumnConfig<ICustomSelectOption>[] = [
        {
            key:"id",
            header: "ID",
            size: 'sm' as const,
            accessor: (item: ICustomSelectOption) => item.id 
        },
        {
            key:"name",
            header: "Nombre",
            size: 'md' as const,
            accessor: (item: ICustomSelectOption) => item.name 
        },
    ]

  return (
    <>
      <ConfigurableTablePage
        name='Area Dependencia'
        formConfig={AreaDependencyForm}
        dataProvider={{
            data: areaDependency,
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

export default TableAreaDependency

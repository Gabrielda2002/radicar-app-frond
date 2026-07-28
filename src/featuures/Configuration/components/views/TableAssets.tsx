import { ColumnConfig } from '@/components/common/ReusableTable'
import { useEffect } from 'react'
import ConfigurableTablePage from '../ConfigurableTablePage'
import { IAssets, useStoreAsset } from '@/featuures/SystemInventory/Store/useStoreAsset'
import { AssetsForm } from '../../config/forms/assetsForm'

const TableAssets = () => {

    const { getAssets, asset, isLoading: loading, error, refetch } = useStoreAsset()

    useEffect(() => {
        getAssets();
    }, [getAssets])

    const columns: ColumnConfig<IAssets>[] = [
        {
            key: "id",
            header: "ID",
            size: 'sm' as const,
            accessor: (item: IAssets) => item.id
        },
        {
            key: "name",
            header: "Nombre",
            size: 'md' as const,
            accessor: (item: IAssets) => item.name
        },
        {
            key: "classificationId",
            header: "Clasificación",
            size: 'md' as const,
            accessor: (item: IAssets) => item.classificationName
        }
    ]

    return (
        <>
            <ConfigurableTablePage
                name='Clasificación'
                formConfig={AssetsForm}
                dataProvider={{
                    data: asset,
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

export default TableAssets

import { useEffect } from "react"
import { ColumnConfig } from "@/components/common/ReusableTable"
import { IProfessional, useProfessionalStore } from "../hooks/useProfessionalStore"
import { FormatDate } from "@/utils/FormatDate"
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage"
import { professionalForm } from "@/featuures/Configuration/config/forms/professionalForm"

const Professional = () => {

  const { data, isLoading, error, getAll } = useProfessionalStore()

  useEffect(() => {
    getAll()
  }, [getAll])

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
      <ConfigurableTablePage
        name="Profesionales"
        formConfig={professionalForm}
        dataProvider={{
          data: data,
          loading: isLoading,
          error: error,
          refetch: getAll
        }}
        columns={columns}
        searchFields={["id", "name"]}
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "Profesionales", path: "/professional" },
        ]}
      />
    </>
  )
}

export default Professional

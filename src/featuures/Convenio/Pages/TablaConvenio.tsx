import { useFetchConvenio } from "@/hooks/UseFetchConvenio";
import { convenioForm } from "@/featuures/Configuration/config/forms/convenioForm";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import type { IConvenios } from "@/models/IConvenios";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";

interface TablaConveniosProps {
  hidePageHeader?: boolean;
}

const columns: ColumnConfig<IConvenios>[] = [
  { key: "id", header: "ID", size: "sm", accessor: (item) => item.id },
  { key: "name", header: "Nombre Convenio", size: "lg", accessor: (item) => item.name },
  {
    key: "status",
    header: "Estado",
    size: "md",
    render: (item) => (item.status ? "Activo" : "Inactivo"),
  },
];

const TablaConvenios = ({ hidePageHeader = false }: TablaConveniosProps) => {
  const { dataConvenios, loading, errorConvenio, refetch } = useFetchConvenio();

  return (
    <ConfigurableTablePage
      name="Convenio"
      formConfig={convenioForm}
      dataProvider={{
        data: dataConvenios,
        loading,
        error: errorConvenio,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "Servicio Convenios", path: "/convenios" },
      ]}
    />
  );
};

export default TablaConvenios;

import { useFetchCups } from "@/hooks/UseFetchCup";
import { ICups } from "@/models/ICups";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { cupsForm } from "@/featuures/Configuration/config/forms/cupsForm";

interface TablaCupsProps {
  hidePageHeader?: boolean;
}

const TablaCups = ({ hidePageHeader = false }: TablaCupsProps) => {
  const { data, loading, error, refetch } = useFetchCups();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: ICups) => item.id,
    },
    {
      key: "code",
      header: "Código",
      width: "20%",
      accessor: (item: ICups) => item.code,
    },
    {
      key: "name",
      header: "Descripción CUPS",
      width: "40%",
      accessor: (item: ICups) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: ICups) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="CUPS"
      formConfig={cupsForm}
      dataProvider={{ data, loading, error, refetch }}
      columns={columns}
      searchFields={["id", "code", "name", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio Cups", path: "" },
      ]}
    />
  );
};

export default TablaCups;

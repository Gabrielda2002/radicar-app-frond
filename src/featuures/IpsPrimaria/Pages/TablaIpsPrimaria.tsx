import { useFetchIpsPrimaria } from "@/hooks/UseFetchIpsPrimaria";
import { IIPSPrimaria } from "@/models/IIpsPrimaria";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { ipsPrimariaForm } from "@/featuures/Configuration/config/forms/ipsPrimariaForm";

interface TablaIpsPrimariaProps {
  hidePageHeader?: boolean;
}

const TablaIpsPrimaria = ({ hidePageHeader = false }: TablaIpsPrimariaProps) => {
  const load = true;
  const { dataIpsPrimaria, loading, errorIpsPrimaria, refetch } =
    useFetchIpsPrimaria(load);

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "20%",
      accessor: (item: IIPSPrimaria) => item.id,
    },
    {
      key: "name",
      header: "Nombre IPS Primaria",
      width: "50%",
      accessor: (item: IIPSPrimaria) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "20%",
      render: (item: IIPSPrimaria) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="IPS Primaria"
      formConfig={ipsPrimariaForm}
      dataProvider={{
        data: dataIpsPrimaria,
        loading,
        error: errorIpsPrimaria,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio IPS Primaria", path: "" },
      ]}
    />
  );
};

export default TablaIpsPrimaria;

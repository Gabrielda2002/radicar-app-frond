import { useFetchIpsRemite } from "../Hooks/UseFetchIpsRemite";
import { IIPSRemite } from "@/models/IIpsRemite";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { ipsRemiteForm } from "@/featuures/Configuration/config/forms/ipsRemiteForm";

interface TablaIpsRemiteProps {
  hidePageHeader?: boolean;
}

const TablaIpsRemite = ({ hidePageHeader = false }: TablaIpsRemiteProps) => {
  const { data, loading, error, refetch } = useFetchIpsRemite();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "20%",
      accessor: (item: IIPSRemite) => item.id,
    },
    {
      key: "name",
      header: "Nombre IPS Remite",
      width: "50%",
      accessor: (item: IIPSRemite) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "20%",
      render: (item: IIPSRemite) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="IPS Remite"
      formConfig={ipsRemiteForm}
      dataProvider={{
        data,
        loading,
        error,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio IPS Remite", path: "" },
      ]}
    />
  );
};

export default TablaIpsRemite;

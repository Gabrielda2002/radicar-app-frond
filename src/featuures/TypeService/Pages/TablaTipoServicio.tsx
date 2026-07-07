import { useFetchService } from "../Hooks/UseFetchService";
import { IServicios } from "@/models/IServicio";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { tipoServicioForm } from "@/featuures/Configuration/config/forms/tipoServicioForm";

interface TablaTipoServicioProps {
  hidePageHeader?: boolean;
}

const TablaTipoServicio = ({ hidePageHeader = false }: TablaTipoServicioProps) => {
  const { data, loading, error, refetch } = useFetchService();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IServicios) => item.id,
    },
    {
      key: "name",
      header: "Nombre Tipo Servicio",
      width: "30%",
      accessor: (item: IServicios) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IServicios) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="Tipo Servicio"
      formConfig={tipoServicioForm}
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
        { label: "/ Servicio Tipo Servicio", path: "" },
      ]}
    />
  );
};

export default TablaTipoServicio;

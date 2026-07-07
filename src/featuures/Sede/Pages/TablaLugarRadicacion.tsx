import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { useFetchSede } from "@/hooks/UseFetchSede";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { lugarRadicacionForm } from "@/featuures/Configuration/config/forms/lugarRadicacionForm";

interface TablaLugarRadicacionProps {
  hidePageHeader?: boolean;
}

const TablaLugarRadicacion = ({ hidePageHeader = false }: TablaLugarRadicacionProps) => {
  const { data, loading, error, refetch } = useFetchSede();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: ILugarRadicacion) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      width: "20%",
      accessor: (item: ILugarRadicacion) => item.name,
    },
    {
      key: "headquartersNumber",
      header: "Número",
      width: "10%",
      accessor: (item: ILugarRadicacion) => item.headquartersNumber,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: ILugarRadicacion) => (item.status ? "Activo" : "Inactivo"),
    },
    {
      key: "department",
      header: "Departamento",
      width: "15%",
      accessor: (item: ILugarRadicacion) => item.department,
    },
    {
      key: "city",
      header: "Municipio",
      width: "15%",
      accessor: (item: ILugarRadicacion) => item.city,
    },
  ];

  return (
    <ConfigurableTablePage
      name="Lugar Radicacion"
      formConfig={lugarRadicacionForm}
      dataProvider={{
        data,
        loading,
        error,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "headquartersNumber", "status", "department", "city"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio Lugar Radicación", path: "" },
      ]}
    />
  );
};

export default TablaLugarRadicacion;

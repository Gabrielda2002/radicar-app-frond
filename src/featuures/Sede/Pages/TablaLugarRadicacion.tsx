import { useEffect } from "react";
import { ILugarRadicacion } from "@/models/ILugarRadicado";
import { useStoreHeadquarters } from "@/store/useStoreHeadquarters";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { lugarRadicacionForm } from "@/featuures/Configuration/config/forms/lugarRadicacionForm";

interface TablaLugarRadicacionProps {
  hidePageHeader?: boolean;
}

const TablaLugarRadicacion = ({ hidePageHeader = false }: TablaLugarRadicacionProps) => {
  const { headquarters, isLoading, error, getHeadquarters } =
    useStoreHeadquarters();

  useEffect(() => {
    getHeadquarters();
  }, [getHeadquarters]);

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
    {
      key: "licenseNumber",
      header: "Cód Habilitación",
      width: "15%",
      accessor: (item: ILugarRadicacion) => item.licenseCode,
    },
  ];

  return (
    <ConfigurableTablePage
      name="Lugar Radicacion"
      formConfig={lugarRadicacionForm}
      dataProvider={{
        data: headquarters,
        loading: isLoading,
        error,
        refetch: () => getHeadquarters(true),
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

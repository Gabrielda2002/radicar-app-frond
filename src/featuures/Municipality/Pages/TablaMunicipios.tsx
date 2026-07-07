import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";
import { IMunicipios } from "@/models/IMunicipios";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { municipioForm } from "@/featuures/Configuration/config/forms/municipioForm";

interface TablaMunicipiosProps {
  hidePageHeader?: boolean;
}

const TablaMunicipios = ({ hidePageHeader = false }: TablaMunicipiosProps) => {
  const { municipios, loading, error: errorMunicipios, refetch } = useFetchMunicipio();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IMunicipios) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      width: "30%",
      accessor: (item: IMunicipios) => item.name,
    },
    {
      key: "municipalityCode",
      header: "Código Municipio",
      width: "30%",
      accessor: (item: IMunicipios) => item.municipalityCode,
    },
    {
      key: "department",
      header: "Departamento",
      width: "30%",
      accessor: (item: IMunicipios) => item.departmentName,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: IMunicipios) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="Municipios"
      formConfig={municipioForm}
      dataProvider={{
        data: municipios,
        loading,
        error: errorMunicipios,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "municipalityCode", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio Municipios", path: "" },
      ]}
    />
  );
};

export default TablaMunicipios;

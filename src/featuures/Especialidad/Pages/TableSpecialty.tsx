import { useFetchEspecialidad } from "../Hooks/UseFetchEspecialidad";

//*Properties
import { IEspecialidad } from "@/models/IEspecialidad";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { especialidadForm } from "@/featuures/Configuration/config/forms/especialidadForm";


interface TableSpecialtyProps {
  hidePageHeader?: boolean;
}

const TableSpecialty = ({ hidePageHeader = false }: TableSpecialtyProps) => {
  const { data, loading, error, refetch } = useFetchEspecialidad();


  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IEspecialidad) => item.id,
    },
    {
      key: "name",
      header: "Nombre Especialidad",
      width: "30%",
      accessor: (item: IEspecialidad) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IEspecialidad) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <>
      <ConfigurableTablePage
        name="Especialidad"
        formConfig={especialidadForm}
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
          { label: "Servicio Especialidades", path: "/tabla-especialidad" },
        ]}
      />
    </>
  );
};

export default TableSpecialty;

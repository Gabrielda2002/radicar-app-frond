import { useFetchDiagnostic } from "../Hooks/UseFetchDiagnostic";
import { IDiagnostico } from "@/models/IDiagnostico";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { diagnosticoForm } from "@/featuures/Configuration/config/forms/diagnosticoForm";

interface TablaDiagnosticoProps {
  hidePageHeader?: boolean;
}

const TablaDiagnostico = ({ hidePageHeader = false }: TablaDiagnosticoProps) => {
  const { diagnostico, loading, errorDiagnostico, refetch } = useFetchDiagnostic();

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IDiagnostico) => item.id,
    },
    {
      key: "code",
      header: "Código",
      width: "20%",
      accessor: (item: IDiagnostico) => item.code,
    },
    {
      key: "description",
      header: "Descripción Diagnóstico",
      width: "40%",
      accessor: (item: IDiagnostico) => item.description,
    },
  ];

  return (
    <ConfigurableTablePage
      name="Diagnosticos"
      formConfig={diagnosticoForm}
      dataProvider={{
        data: diagnostico || [],
        loading,
        error: errorDiagnostico,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "code", "description"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio Diagnosticos", path: "" },
      ]}
    />
  );
};

export default TablaDiagnostico;

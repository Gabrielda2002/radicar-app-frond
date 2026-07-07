import { useFetchDocumento } from "@/hooks/UseFetchDocument";
import { IDocumento } from "@/models/IDocumento";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { tipoDocumentoForm } from "@/featuures/Configuration/config/forms/tipoDocumentoForm";

interface TablaTipoDocumentoProps {
  hidePageHeader?: boolean;
}

const TablaTipoDocumento = ({ hidePageHeader = false }: TablaTipoDocumentoProps) => {
  const load = true;
  const { dataDocumento, loadingDocumento, errorDocumento, refetch } =
    useFetchDocumento(load);

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: IDocumento) => item.id,
    },
    {
      key: "name",
      header: "Tipo Documento",
      width: "30%",
      accessor: (item: IDocumento) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      width: "40%",
      render: (item: IDocumento) => (item.status ? "Activo" : "Inactivo"),
    },
  ];

  return (
    <ConfigurableTablePage
      name="Tipo Documento"
      formConfig={tipoDocumentoForm}
      dataProvider={{
        data: dataDocumento,
        loading: loadingDocumento,
        error: errorDocumento,
        refetch,
      }}
      columns={columns}
      searchFields={["id", "name", "status"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "/ Servicio Tipo Documento", path: "" },
      ]}
    />
  );
};

export default TablaTipoDocumento;

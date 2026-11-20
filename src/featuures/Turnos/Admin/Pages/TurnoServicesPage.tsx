import { useEffect } from "react";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { turnoServiceForm } from "@/featuures/Configuration/config/forms/turnoServiceForm";
import type { ITurnoServiceAdmin } from "@/models/ITurnoAdmin";
import { useStoreTurnoServices } from "../store/useStoreTurnoServices";

const columns: ColumnConfig<ITurnoServiceAdmin>[] = [
  { key: "id", header: "Id", accessor: (service) => service.id },
  { key: "name", header: "Servicio", accessor: (service) => service.name },
  {
    key: "status",
    header: "Estado",
    size: "sm",
    render: ({ status }) => (
      <span
        className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${status
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
          }`}
      >
        {status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
];

const TurnoServicesPage = ({
  hidePageHeader,
}: {
  hidePageHeader?: boolean;
}) => {
  const { data, isLoading, error, loadServices } = useStoreTurnoServices();

  useEffect(() => {
    void loadServices();
  }, [loadServices]);

  return (
    <ConfigurableTablePage
      name="servicio de turnos"
      formConfig={turnoServiceForm}
      dataProvider={{ data, loading: isLoading, error, refetch: loadServices }}
      columns={columns}
      searchFields={["name"]}
      hidePageHeader={hidePageHeader}
    />
  );
};

export default TurnoServicesPage;

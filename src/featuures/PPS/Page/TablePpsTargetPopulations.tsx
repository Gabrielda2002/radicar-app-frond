import { useEffect } from "react";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { useStorePpsTargetPopulations } from "@/featuures/PPS/store/useStorePpsTargetPopulations";
import { ppsTargetPopulationForm } from "@/featuures/Configuration/config/forms/ppsTargetPopulationForm";
import type { PpsTargetPopulation } from "@/featuures/PPS/models/IPps";

interface TablePpsTargetPopulationsProps {
  hidePageHeader?: boolean;
}

const TablePpsTargetPopulations = ({
  hidePageHeader = false,
}: TablePpsTargetPopulationsProps) => {
  const { targetPopulations, isLoading, error, getTargetPopulations } =
    useStorePpsTargetPopulations();

  useEffect(() => {
    getTargetPopulations();
  }, [getTargetPopulations]);

  const columns: ColumnConfig<PpsTargetPopulation>[] = [
    {
      key: "id",
      header: "ID",
      size: "sm",
      accessor: (item) => item.id,
    },
    {
      key: "code",
      header: "Código",
      size: "sm",
      accessor: (item) => item.code,
    },
    {
      key: "description",
      header: "Descripción",
      size: "lg",
      accessor: (item) => item.description,
    },
    {
      key: "status",
      header: "Estado",
      size: "sm",
      render: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            item.status
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {item.status ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  return (
    <ConfigurableTablePage
      name="Población Objetivo"
      formConfig={ppsTargetPopulationForm}
      dataProvider={{
        data: targetPopulations,
        loading: isLoading,
        error,
        refetch: getTargetPopulations,
      }}
      columns={columns}
      searchFields={["id", "code", "description"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "PPS", path: "/pps" },
        { label: "Poblaciones Objetivo", path: "" },
      ]}
    />
  );
};

export default TablePpsTargetPopulations;

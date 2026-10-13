import { useEffect } from "react";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { useStorePpsGoals } from "@/featuures/PPS/store/useStorePpsGoals";
import { ppsGoalForm } from "@/featuures/Configuration/config/forms/ppsGoalForm";
import type { PpsGoal } from "@/featuures/PPS/models/IPps";

interface TablePpsGoalsProps {
  hidePageHeader?: boolean;
}

const TablePpsGoals = ({ hidePageHeader = false }: TablePpsGoalsProps) => {
  const { goals, isLoading, error, getGoals } = useStorePpsGoals();

  useEffect(() => {
    getGoals();
  }, [getGoals]);

  const columns: ColumnConfig<PpsGoal>[] = [
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
      key: "actionLine",
      header: "Línea de Acción",
      size: "md",
      accessor: (item) =>
        item.actionLineRelation
          ? `${item.actionLineRelation.code} - ${item.actionLineRelation.description.slice(0, 40)}...`
          : `Línea #${item.actionLineId}`,
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
      name="Metas"
      formConfig={ppsGoalForm}
      dataProvider={{
        data: goals,
        loading: isLoading,
        error,
        refetch: getGoals,
      }}
      columns={columns}
      searchFields={["id", "code", "description"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "PPS", path: "/pps" },
        { label: "Metas", path: "" },
      ]}
    />
  );
};

export default TablePpsGoals;

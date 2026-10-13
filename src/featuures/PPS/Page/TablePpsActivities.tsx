import { useEffect } from "react";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { useStorePpsActivities } from "@/featuures/PPS/store/useStorePpsActivities";
import { ppsActivityForm } from "@/featuures/Configuration/config/forms/ppsActivityForm";
import type { PpsActivity } from "@/featuures/PPS/models/IPps";

interface TablePpsActivitiesProps {
  hidePageHeader?: boolean;
}

const TablePpsActivities = ({
  hidePageHeader = false,
}: TablePpsActivitiesProps) => {
  const { activities, isLoading, error, getActivities } =
    useStorePpsActivities();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const columns: ColumnConfig<PpsActivity>[] = [
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
      key: "goal",
      header: "Meta",
      size: "md",
      accessor: (item) =>
        item.goalRelation
          ? `${item.goalRelation.code} - ${item.goalRelation.description.slice(0, 35)}...`
          : `Meta #${item.goalId}`,
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
      name="Actividades"
      formConfig={ppsActivityForm}
      dataProvider={{
        data: activities,
        loading: isLoading,
        error,
        refetch: getActivities,
      }}
      columns={columns}
      searchFields={["id", "code", "description"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "PPS", path: "/pps" },
        { label: "Actividades", path: "" },
      ]}
    />
  );
};

export default TablePpsActivities;

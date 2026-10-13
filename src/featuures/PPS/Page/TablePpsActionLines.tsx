import { useEffect } from "react";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import ConfigurableTablePage from "@/featuures/Configuration/components/ConfigurableTablePage";
import { useStorePpsActionLines } from "@/featuures/PPS/store/useStorePpsActionLines";
import { ppsActionLineForm } from "@/featuures/Configuration/config/forms/ppsActionLineForm";
import type { PpsActionLine } from "@/featuures/PPS/models/IPps";

interface TablePpsActionLinesProps {
  hidePageHeader?: boolean;
}

const TablePpsActionLines = ({
  hidePageHeader = false,
}: TablePpsActionLinesProps) => {
  const { actionLines, isLoading, error, getActionLines } =
    useStorePpsActionLines();

  useEffect(() => {
    getActionLines();
  }, [getActionLines]);

  const columns: ColumnConfig<PpsActionLine>[] = [
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
      key: "strategicAxis",
      header: "Eje Estratégico",
      size: "sm",
      accessor: (item) => item.strategicAxis,
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
      name="Líneas de Acción"
      formConfig={ppsActionLineForm}
      dataProvider={{
        data: actionLines,
        loading: isLoading,
        error,
        refetch: getActionLines,
      }}
      columns={columns}
      searchFields={["id", "code", "strategicAxis", "description"]}
      hidePageHeader={hidePageHeader}
      breadcrumb={[
        { label: "Inicio", path: "/home" },
        { label: "PPS", path: "/pps" },
        { label: "Líneas de Acción", path: "" },
      ]}
    />
  );
};

export default TablePpsActionLines;

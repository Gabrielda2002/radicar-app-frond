import type { ColumnConfig } from "@/components/common/ReusableTable";
import type {
  PpsProgrammedActivityRow,
  PpsTargetPopulation,
} from "@/featuures/PPS/models/IPps";

export const buildPpsActivityColumns = ({
  populationById,
  rowIndexById,
  numberFormat,
}: {
  populationById: Map<number, PpsTargetPopulation>;
  rowIndexById: Map<number, number>;
  numberFormat: Intl.NumberFormat;
}): ColumnConfig<PpsProgrammedActivityRow>[] => [
  {
    key: "index",
    header: "#",
    size: "xs",
    accessor: (item) => rowIndexById.get(item.id) ?? "—",
  },
  {
    key: "headquarters",
    header: "Sede",
    size: "md",
    accessor: (item) => item.headquartersRelation?.name ?? "—",
  },
  {
    key: "territoryCode",
    header: "Territorio",
    size: "sm",
    accessor: (item) => item.territoryCode,
  },
  {
    key: "actionLineCode",
    header: "Línea",
    size: "xs",
    accessor: (item) => item.actionLineCode,
  },
  {
    key: "goalCode",
    header: "Meta",
    size: "xs",
    accessor: (item) => item.goalCode,
  },
  {
    key: "goalDescription",
    header: "Descripción meta",
    size: "lg",
    cellClassName: "text-left",
    render: (item) => (
      <span className="block truncate" title={item.goalDescription}>
        {item.goalDescription}
      </span>
    ),
  },
  {
    key: "activityCode",
    header: "Act.",
    size: "xs",
    accessor: (item) => item.activityCode,
  },
  {
    key: "activityDescription",
    header: "Descripción actividad",
    size: "lg",
    cellClassName: "text-left",
    render: (item) => (
      <span className="block truncate" title={item.activityDescription}>
        {item.activityDescription}
      </span>
    ),
  },
  {
    key: "numericExpression",
    header: "Expr.",
    size: "xs",
    accessor: (item) => item.numericExpression,
  },
  {
    key: "targetPopulation",
    header: "Población",
    size: "md",
    cellClassName: "text-left",
    render: (item) => {
      const population = populationById.get(item.targetPopulationId);
      return population
        ? `${population.code} — ${population.description}`
        : "—";
    },
  },
  {
    key: "startDate",
    header: "Inicio",
    size: "sm",
    accessor: (item) => item.startDate,
  },
  {
    key: "endDate",
    header: "Fin",
    size: "sm",
    accessor: (item) => item.endDate,
  },
  {
    key: "programmedResources",
    header: "Recursos",
    size: "sm",
    cellClassName: "text-right",
    render: (item) => numberFormat.format(item.programmedResources),
  },
];

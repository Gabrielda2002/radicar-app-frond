import type { ColumnConfig } from "@/components/common/ReusableTable";
import type {
  PpsFundingSource,
  PpsMonitoringInput,
  PpsProgrammedActivityRow,
  PpsTargetPopulation,
} from "@/featuures/PPS/models/IPps";
import {
  MonitoringNumberCell,
  MonitoringSelectCell,
  MonitoringTextCell,
} from "./MonitoringEditableCells";

interface SelectableOption {
  id: number;
  code: string;
  description: string;
  status: boolean;
}

const buildSelectOptions = (
  items: SelectableOption[],
  currentValue: number | null
): { value: number; label: string }[] => {

  const options = items
    .filter((item) => item.status)
    .map((item) => ({
      value: item.id,
      label: `${item.code} — ${item.description}`,
    }));

  if (
    currentValue !== null &&
    !options.some((option) => option.value === currentValue)
  ) {
    const found = items.find((item) => item.id === currentValue);
    if (found) {
      options.push({
        value: found.id,
        label: `${found.code} — ${found.description}`,
      });
    } else {
      options.push({ value: currentValue, label: `#${currentValue}` });
    }
  }

  return options;
};

export const buildPpsMonitoringColumns = ({
  rowIndexById,
  populations,
  fundingSources,
  onSaveField,
}: {
  rowIndexById: Map<number, number>;
  populations: PpsTargetPopulation[];
  fundingSources: PpsFundingSource[];
  onSaveField: (activityId: number, data: PpsMonitoringInput) => void;
}): ColumnConfig<PpsProgrammedActivityRow>[] => [
  {
    key: "index",
    header: "#",
    size: "xs",
    accessor: (item) => rowIndexById.get(item.id) ?? "—",
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
    size: "sm",
    accessor: (item) => item.actionLineCode,
  },
  {
    key: "goalCode",
    header: "Meta",
    size: "sm",
    accessor: (item) => item.goalCode,
  },
  {
    key: "activityCode",
    header: "Act.",
    size: "sm",
    accessor: (item) => item.activityCode,
  },
  {
    key: "activityDescription",
    header: "Actividad (prog.)",
    size: "lg",
    cellClassName: "text-left",
    render: (item) => (
      <span className="block truncate" title={item.activityDescription}>
        {item.activityDescription}
      </span>
    ),
  },
  {
    key: "result",
    header: "Resultado",
    size: "sm",
    render: (item) => (
      <MonitoringNumberCell
        value={item.monitoringRelation?.result ?? null}
        onSave={(value) => onSaveField(item.id, { result: value })}
      />
    ),
  },
  {
    key: "intervenedPopulation",
    header: "Pob. interv.",
    size: "md",
    cellClassName: "text-left",
    render: (item) => {
      const currentValue =
        item.monitoringRelation?.intervenedPopulationId ??
        item.targetPopulationId;
      return (
        <MonitoringSelectCell
          value={currentValue}
          options={buildSelectOptions(populations, currentValue)}
          onSave={(value) =>
            onSaveField(item.id, { intervenedPopulationId: value })
          }
        />
      );
    },
  },
  {
    key: "totalPersons",
    header: "Total pers.",
    size: "sm",
    render: (item) => (
      <MonitoringNumberCell
        value={item.monitoringRelation?.totalPersons ?? null}
        onSave={(value) => onSaveField(item.id, { totalPersons: value })}
      />
    ),
  },
  {
    key: "executedResources",
    header: "Recursos ejec.",
    size: "md",
    render: (item) => (
      <MonitoringNumberCell
        value={item.monitoringRelation?.executedResources ?? null}
        onSave={(value) => onSaveField(item.id, { executedResources: value })}
      />
    ),
  },
  {
    key: "fundingSource",
    header: "Fuente",
    size: "md",
    cellClassName: "text-left",
    render: (item) => {
      const currentValue = item.monitoringRelation?.fundingSourceId ?? null;
      return (
        <MonitoringSelectCell
          value={currentValue}
          options={buildSelectOptions(fundingSources, currentValue)}
          placeholder="— Seleccione fuente —"
          onSave={(value) => onSaveField(item.id, { fundingSourceId: value })}
        />
      );
    },
  },
  {
    key: "evidenceLink",
    header: "Link evidencia",
    size: "md",
    render: (item) => (
      <MonitoringTextCell
        value={item.monitoringRelation?.evidenceLink ?? null}
        onSave={(value) => onSaveField(item.id, { evidenceLink: value })}
      />
    ),
  },
  {
    key: "verificationMeans",
    header: "Medio verificación",
    size: "md",
    render: (item) => (
      <MonitoringTextCell
        value={item.monitoringRelation?.verificationMeans ?? null}
        onSave={(value) => onSaveField(item.id, { verificationMeans: value })}
      />
    ),
  },
  {
    key: "updatedAt",
    header: "Últ. actualización",
    size: "lg",
    cellClassName: "whitespace-nowrap",
    render: (item) => {
      const updatedAt = item.monitoringRelation?.updatedAt;
      return updatedAt
        ? new Date(updatedAt).toLocaleString("es-CO")
        : "—";
    },
  },
  {
    key: "status",
    header: "Estado",
    size: "md",
    cellClassName: "whitespace-nowrap",
    render: (item) =>
      item.monitoringComplete ? (
        <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:text-green-200 dark:bg-green-900/30">
          Completo
        </span>
      ) : (
        <span className="inline-block px-2 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full dark:text-amber-200 dark:bg-amber-900/30">
          Pendiente
        </span>
      ),
  },
];

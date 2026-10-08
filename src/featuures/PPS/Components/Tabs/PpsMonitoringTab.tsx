import { useEffect, useState } from "react";
import Button from "@/components/common/Ui/Button";
import { useStorePpsPeriods } from "@/featuures/PPS/store/useStorePpsPeriods";
import { useStorePpsReportingEntity } from "@/featuures/PPS/store/useStorePpsReportingEntity";
import type { PpsPeriod } from "@/featuures/PPS/models/IPps";
import { buildDueDate, isDeadlinePassed } from "@/featuures/PPS/utils/ppsDates";
import PpsMonitoringDetail from "../Monitoring/PpsMonitoringDetail";

const formatDmy = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

const PpsMonitoringTab = () => {
  const { periods, isLoading, error, getPeriods } = useStorePpsPeriods();
  const { reportingEntity, getReportingEntity } = useStorePpsReportingEntity();

  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);

  useEffect(() => {
    getPeriods();
  }, [getPeriods]);

  useEffect(() => {
    if (!reportingEntity) {
      getReportingEntity();
    }
  }, [reportingEntity, getReportingEntity]);

  const selectedPeriod: PpsPeriod | null = selectedPeriodId
    ? (periods.find((period) => period.id === selectedPeriodId) ?? null)
    : null;

  if (selectedPeriod) {
    return (
      <PpsMonitoringDetail
        period={selectedPeriod}
        onBack={() => {
          setSelectedPeriodId(null);
          getPeriods();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Seguimiento por vigencia
        </h2>
      </div>

      {isLoading && periods.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Cargando...</p>
      )}

      {error && (
        <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {!isLoading && periods.length === 0 && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No hay vigencias creadas. Créelas primero en la pestaña de
          Programación.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {periods.map((period) => {
          const dueDate = reportingEntity
            ? buildDueDate(
              period.validityYear,
              reportingEntity.monitoringDueMonth,
              reportingEntity.monitoringDueDay,
              reportingEntity.monitoringDueYear
            )
            : null;
          const deadlinePassed = dueDate ? isDeadlinePassed(dueDate) : false;

          return (
            <div
              key={period.id}
              className="flex flex-col p-6 bg-white rounded-lg shadow dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Vigencia {period.validityYear}
                </h3>
                {deadlinePassed && (
                  <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full dark:text-red-200 dark:bg-red-900/30">
                    Vencida
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {period.startDate} a {period.endDate}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {period.activitiesCount ?? 0} actividad(es) programada(s)
              </p>

              {dueDate && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Entrega máx.: {formatDmy(dueDate)}
                </p>
              )}

              <Button
                type="button"
                variant="primary"
                size="md"
                className="mt-4"
                onClick={() => setSelectedPeriodId(period.id)}
              >
                Ingresar al seguimiento
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PpsMonitoringTab;

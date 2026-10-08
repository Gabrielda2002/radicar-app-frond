import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, FileDown } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import ModalDefault from "@/components/common/Ui/ModalDefault";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";
import { useStorePpsPeriods } from "@/featuures/PPS/store/useStorePpsPeriods";
import { useStorePpsProgrammedActivities } from "@/featuures/PPS/store/useStorePpsProgrammedActivities";
import { useStorePpsTargetPopulations } from "@/featuures/PPS/store/useStorePpsTargetPopulations";
import { useStorePpsFundingSources } from "@/featuures/PPS/store/useStorePpsFundingSources";
import type {
  PpsMonitoringInput,
  PpsPeriod,
  PpsProgrammedActivityRow,
} from "@/featuures/PPS/models/IPps";
import {
  downloadPpsFile,
  PpsFileDownloadError,
} from "@/featuures/PPS/utils/downloadPpsFile";
import { buildPpsMonitoringColumns } from "./ppsMonitoringColumns";

interface PpsMonitoringDetailProps {
  period: PpsPeriod;
  onBack: () => void;
}

const numberFormat = new Intl.NumberFormat("es-CO");

const PpsMonitoringDetail: React.FC<PpsMonitoringDetailProps> = ({
  period,
  onBack,
}) => {
  const { updatePeriod } = useStorePpsPeriods();

  const {
    programmedActivities,
    isLoading: activitiesLoading,
    error: activitiesError,
    getByPeriod,
    updateMonitoring,
  } = useStorePpsProgrammedActivities();

  const { targetPopulations, getTargetPopulations } =
    useStorePpsTargetPopulations();
  const { fundingSources, getFundingSources } = useStorePpsFundingSources();

  const [cutoffDate, setCutoffDate] = useState(
    period.cutoffDate ?? period.endDate
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [isForceConfirmOpen, setIsForceConfirmOpen] = useState(false);
  const [forceErrorMessage, setForceErrorMessage] = useState("");

  useEffect(() => {
    setCutoffDate(period.cutoffDate ?? period.endDate);
  }, [period.cutoffDate, period.endDate]);

  useEffect(() => {
    getByPeriod(period.id);
    getTargetPopulations();
    getFundingSources();
  }, [period.id, getByPeriod, getTargetPopulations, getFundingSources]);

  const rowIndexById = useMemo(() => {
    const map = new Map<number, number>();
    programmedActivities.forEach((activity, index) =>
      map.set(activity.id, index + 1)
    );
    return map;
  }, [programmedActivities]);

  const completedCount = useMemo(
    () =>
      programmedActivities.filter(
        (activity) => activity.monitoringComplete === true
      ).length,
    [programmedActivities]
  );

  const pendingCount = programmedActivities.length - completedCount;

  const pendingActivitiesWithIssues = useMemo(() => {
    return programmedActivities
      .map((activity) => ({
        rowNumber: rowIndexById.get(activity.id) ?? 0,
        code: activity.activityCode,
        issues: activity.monitoringIssues || [],
      }))
      .filter((act) => act.issues.length > 0);
  }, [programmedActivities, rowIndexById]);

  const executedResources = useMemo(
    () =>
      programmedActivities.reduce(
        (sum, activity) =>
          sum + (activity.monitoringRelation?.executedResources ?? 0),
        0
      ),
    [programmedActivities]
  );

  const tableState = useTableState<PpsProgrammedActivityRow>({
    data: programmedActivities,
    searchFields: [
      "territoryCode",
      "actionLineCode",
      "goalCode",
      "goalDescription",
      "activityCode",
      "activityDescription",
    ],
    initialItemsPerPage: 10,
  });

  const handleCutoffChange = (value: string) => {
    if (!value) {
      toast.error("Indique la fecha de corte.");
      setCutoffDate(period.cutoffDate ?? period.endDate);
      return;
    }

    setCutoffDate(value);
    void updatePeriod(period.id, { cutoffDate: value }, () => {
      toast.success("Fecha de corte actualizada");
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPpsFile(period.id, "monitoring");
      toast.success("Archivo generado");
    } catch (error) {
      if (error instanceof PpsFileDownloadError && error.status === 400) {
        setForceErrorMessage(error.message);
        setIsForceConfirmOpen(true);
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "No se pudo generar el archivo."
        );
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleForceDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPpsFile(period.id, "monitoring", true);
      toast.success("Archivo generado");
      setIsForceConfirmOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo generar el archivo."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSaveField = (activityId: number, data: PpsMonitoringInput) => {
    void updateMonitoring(activityId, data);
  };

  const columns = buildPpsMonitoringColumns({
    rowIndexById,
    populations: targetPopulations,
    fundingSources,
    onSaveField: handleSaveField,
  });

  return (
    <div className="space-y-6">
      {/* ── Encabezado ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBack}
          >
            Volver a vigencias
          </Button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Seguimiento vigencia {period.validityYear}
          </h2>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <Input
            type="date"
            label="Fecha de corte del reporte"
            value={cutoffDate}
            onChange={(event) => handleCutoffChange(event.target.value)}
          />
          <Button
            variant="secondary"
            size="md"
            icon={<FileDown className="w-4 h-4" />}
            isLoading={isDownloading}
            disabled={programmedActivities.length === 0}
            onClick={handleDownload}
          >
            Generar archivo plano (.txt)
          </Button>
        </div>
      </div>

      {/* ── Estadísticas ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Actividades
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {programmedActivities.length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completas</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {completedCount}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {pendingCount}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ejecutado</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {numberFormat.format(executedResources)}
          </p>
        </div>
      </div>

      {/* ── Banner de estado ── */}
      {programmedActivities.length === 0 ? (
        <div className="p-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg dark:text-blue-200 dark:bg-blue-900/30">
          Esta vigencia no tiene actividades programadas.
        </div>
      ) : pendingCount > 0 ? (
        <div className="p-4 space-y-2 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg dark:text-amber-200 dark:bg-amber-950/40 dark:border-amber-800/50">
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>{pendingCount} actividad(es) pendientes de diligenciar:</span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pt-1 text-xs">
            {pendingActivitiesWithIssues.map((item) => (
              <div
                key={item.rowNumber}
                className="p-2 bg-white/80 dark:bg-gray-800/80 border border-amber-200/70 dark:border-amber-900/40 rounded flex flex-col md:flex-row md:items-center gap-1.5 shadow-xs"
              >
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  <span className="font-bold text-amber-700 dark:text-amber-400 mr-2">
                    Fila #{item.rowNumber}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 mr-1.5">
                    [{item.code}]
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.issues.map((issue, idx) => (
                    <span
                      key={idx}
                      className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm"
                    >
                      • {issue}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 text-sm font-medium text-green-800 bg-green-100 rounded-lg dark:text-green-200 dark:bg-green-900/30">
          Seguimiento completo para todas las actividades.
        </div>
      )}

      {activitiesError && (
        <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
          {activitiesError}
        </div>
      )}

      {/* ── Tabla de seguimiento ── */}
      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
      >
        <DataTable<PpsProgrammedActivityRow>
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={activitiesLoading && programmedActivities.length === 0}
          error={activitiesError}
          emptyMessage="Esta vigencia no tiene actividades programadas."
        />
      </DataTableContainer>

      {/* ── Confirmación de generación forzada ── */}
      <ModalDefault
        isOpen={isForceConfirmOpen}
        onClose={() => setIsForceConfirmOpen(false)}
        title="Seguimiento incompleto"
        showSubmitButton
        submitText="Generar de todos modos"
        isSubmitting={isDownloading}
        funtionClick={handleForceDownload}
      >
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {forceErrorMessage}
        </p>
      </ModalDefault>
    </div>
  );
};

export default PpsMonitoringDetail;

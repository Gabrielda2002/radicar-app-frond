import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, FileDown, Save, Trash2 } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import ConfirmDeletePopup from "@/components/common/ConfirmDeletePopUp/ConfirmDeletePopUp";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";
import { useStorePpsPeriods } from "@/featuures/PPS/store/useStorePpsPeriods";
import { useStorePpsProgrammedActivities } from "@/featuures/PPS/store/useStorePpsProgrammedActivities";
import { useStorePpsReportingEntity } from "@/featuures/PPS/store/useStorePpsReportingEntity";
import { useStorePpsTargetPopulations } from "@/featuures/PPS/store/useStorePpsTargetPopulations";
import type {
  PpsPeriod,
  PpsProgrammedActivityRow,
  PpsTargetPopulation,
} from "@/featuures/PPS/models/IPps";
import { downloadPpsFile } from "@/featuures/PPS/utils/downloadPpsFile";
import PpsActivityModal from "./PpsActivityModal";
import { buildPpsActivityColumns } from "./ppsPeriodDetailColumns";

interface PpsPeriodDetailProps {
  period: PpsPeriod;
  onBack: () => void;
}

const numberFormat = new Intl.NumberFormat("es-CO");

const PpsPeriodDetail: React.FC<PpsPeriodDetailProps> = ({
  period,
  onBack,
}) => {
  const {
    isLoading: periodIsLoading,
    updatePeriod,
    deletePeriod,
  } = useStorePpsPeriods();

  const {
    programmedActivities,
    isLoading: activitiesLoading,
    error: activitiesError,
    getByPeriod,
    deleteProgrammedActivity,
  } = useStorePpsProgrammedActivities();

  const { reportingEntity } = useStorePpsReportingEntity();
  const { targetPopulations } = useStorePpsTargetPopulations();

  const [startDate, setStartDate] = useState(period.startDate);
  const [endDate, setEndDate] = useState(period.endDate);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingActivity, setDeletingActivity] =
    useState<PpsProgrammedActivityRow | null>(null);

  useEffect(() => {
    setStartDate(period.startDate);
    setEndDate(period.endDate);
  }, [period.startDate, period.endDate]);

  useEffect(() => {
    getByPeriod(period.id);
  }, [period.id, getByPeriod]);

  const populationById = useMemo(() => {
    const map = new Map<number, PpsTargetPopulation>();
    targetPopulations.forEach((population) =>
      map.set(population.id, population)
    );
    return map;
  }, [targetPopulations]);

  const rowIndexById = useMemo(() => {
    const map = new Map<number, number>();
    programmedActivities.forEach((activity, index) =>
      map.set(activity.id, index + 1)
    );
    return map;
  }, [programmedActivities]);

  const territoryCount = useMemo(
    () => new Set(programmedActivities.map((a) => a.territoryCode)).size,
    [programmedActivities]
  );

  const totalBudget = useMemo(
    () =>
      programmedActivities.reduce(
        (sum, activity) => sum + activity.programmedResources,
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

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPpsFile(period.id, "programming");
      toast.success("Archivo generado");
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

  const handleSaveDates = async () => {
    if (endDate < startDate) {
      toast.error("La fecha final no puede ser anterior a la inicial.");
      return;
    }

    await updatePeriod(period.id, { startDate, endDate }, () => {
      toast.success("Fechas actualizadas");
    });
  };

  const handleConfirmDelete = async () => {
    await deletePeriod(period.id, () => {
      toast.success("Vigencia eliminada");
      setIsConfirmOpen(false);
      onBack();
    });
  };

  const columns = buildPpsActivityColumns({
    populationById,
    rowIndexById,
    numberFormat,
  });

  const handleConfirmDeleteActivity = async () => {
    if (!deletingActivity) return;
    await deleteProgrammedActivity(deletingActivity.id, () => {
      toast.success("Actividad eliminada");
      setDeletingActivity(null);
    });
  };

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
            Vigencia {period.validityYear}
          </h2>
          {reportingEntity?.strictMode && (
            <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full dark:text-blue-200 dark:bg-blue-900/30">
              Modo estricto
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PpsActivityModal
            period={period}
            activity={null}
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

      {/* ── Fechas de la vigencia ── */}
      <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            type="date"
            label="Fecha inicio vigencia"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            label="Fecha final vigencia"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="danger"
            size="md"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => setIsConfirmOpen(true)}
          >
            Eliminar vigencia
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
            isLoading={periodIsLoading}
            onClick={handleSaveDates}
          >
            Guardar fechas
          </Button>
        </div>
      </section>

      {/* ── Estadísticas ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Actividades</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {programmedActivities.length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Territorios</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {territoryCount}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Presupuesto total
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {numberFormat.format(totalBudget)}
          </p>
        </div>
      </div>

      {/* ── Tabla de actividades ── */}
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
          loading={activitiesLoading}
          error={activitiesError}
          emptyMessage="Esta vigencia no tiene actividades programadas."
          renderActions={(item) => (
            <>
              <PpsActivityModal
                period={period}
                activity={item}
              />
              <Button
                variant="danger"
                icon={<Trash2 className="w-3 h-3" />}
                onClick={() => setDeletingActivity(item)}
              />
            </>

          )}
        />
      </DataTableContainer>

      {/* ── Confirmación de eliminación de la vigencia ── */}
      <ConfirmDeletePopup
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={`la vigencia ${period.validityYear} con toda su programación y seguimiento`}
        isDeleting={periodIsLoading}
      />

      <ConfirmDeletePopup
        isOpen={deletingActivity !== null}
        onClose={() => setDeletingActivity(null)}
        onConfirm={handleConfirmDeleteActivity}
        itemName={`la actividad #${deletingActivity ? rowIndexById.get(deletingActivity.id) ?? "—" : "—"} y su seguimiento`}
        isDeleting={activitiesLoading}
      />
    </div>
  );
};

export default PpsPeriodDetail;

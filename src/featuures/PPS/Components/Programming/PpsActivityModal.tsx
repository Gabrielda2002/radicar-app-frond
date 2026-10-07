import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormModal from "@/components/common/Ui/FormModal";
import { useStorePpsProgrammedActivities } from "@/featuures/PPS/store/useStorePpsProgrammedActivities";
import { useStorePpsReportingEntity } from "@/featuures/PPS/store/useStorePpsReportingEntity";
import { useStorePpsTargetPopulations } from "@/featuures/PPS/store/useStorePpsTargetPopulations";
import { useLazyFetchPpsHeadquarters } from "@/featuures/PPS/Hooks/useLazyFetchPpsHeadquarters";
import { useLazyFetchPpsActionLines } from "@/featuures/PPS/Hooks/useLazyFetchPpsActionLines";
import { useLazyFetchPpsGoals } from "@/featuures/PPS/Hooks/useLazyFetchPpsGoals";
import { useLazyFetchPpsActivities } from "@/featuures/PPS/Hooks/useLazyFetchPpsActivities";
import type {
  PpsHeadquartersOption,
  PpsPeriod,
  PpsProgrammedActivityInput,
  PpsProgrammedActivityRow,
} from "@/featuures/PPS/models/IPps";
import {
  buildActivityValidationSchema,
  createActivityInitialValues,
} from "./ppsActivityForm";
import type { PpsActivityFormValues } from "./ppsActivityForm";
import PpsActivitySelectionFields from "./PpsActivitySelectionFields";
import PpsActivityCatalogFields from "./PpsActivityCatalogFields";
import PpsActivityManualFields from "./PpsActivityManualFields";
import PpsActivityExecutionFields from "./PpsActivityExecutionFields";
import Button from "@/components/common/Ui/Button";
import { Pencil } from "lucide-react";

interface PpsActivityModalProps {
  period: PpsPeriod;
  activity?: PpsProgrammedActivityRow | null;
}

const PpsActivityModal: React.FC<PpsActivityModalProps> = ({
  period,
  activity = null,
}) => {

  const [isOpen, setIsOpen ] = useState<boolean>(false);
  
  const {
    error,
    isLoading,
    clearError,
    createProgrammedActivity,
    updateProgrammedActivity,
  } = useStorePpsProgrammedActivities();

  const { reportingEntity } = useStorePpsReportingEntity();
  const { targetPopulations } = useStorePpsTargetPopulations();

  const { headquarters, isLoadingHeadquarters, fetchHeadquarters } =
    useLazyFetchPpsHeadquarters();
  const { actionLines, isLoadingActionLines, fetchActionLines } =
    useLazyFetchPpsActionLines();
  const { goals, isLoadingGoals, fetchGoals, clearGoals } =
    useLazyFetchPpsGoals();
  const {
    activities,
    isLoadingActivities,
    fetchActivities,
    clearActivities,
  } = useLazyFetchPpsActivities();

  const strictMode = reportingEntity?.strictMode === true;

  const validationSchema = useMemo(
    () => buildActivityValidationSchema(strictMode, period),
    [strictMode, period]
  );

  const formik = useFormik<PpsActivityFormValues>({
    initialValues: createActivityInitialValues(activity, period),
    validationSchema,
    onSubmit: async (values) => {
      const basePayload = {
        headquartersId: Number(values.headquartersId),
        numericExpression: Number(values.numericExpression),
        targetPopulationId: Number(values.targetPopulationId),
        startDate: values.startDate,
        endDate: values.endDate,
        programmedResources: Number(values.programmedResources),
      };

      let payload: PpsProgrammedActivityInput;

      if (strictMode) {
        payload = {
          ...basePayload,
          activityId: Number(values.activityId),
          goalId: Number(values.goalId),
        };
      } else {
        const selectedLine = actionLines.find(
          (line) => line.id === Number(values.actionLineId)
        );
        payload = {
          ...basePayload,
          actionLineCode: selectedLine?.code ?? "",
          goalCode: values.goalCode.trim().toUpperCase(),
          goalDescription: values.goalDescription.trim(),
          activityCode: values.activityCode.trim().toUpperCase(),
          activityDescription: values.activityDescription.trim(),
        };
      }

      const onSuccess = () => {
        toast.success(
          activity ? "Actividad actualizada" : "Actividad programada"
        );
        setIsOpen(false);
      };

      if (activity) {
        await updateProgrammedActivity(activity.id, payload, onSuccess);
      } else {
        await createProgrammedActivity(period.id, payload, onSuccess);
      }
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    clearError();
    formik.resetForm({ values: createActivityInitialValues(activity, period) });
    clearGoals();
    clearActivities();

    const loadCatalog = async () => {
      const hq = await fetchHeadquarters();
      if (!activity && hq.length === 1) {
        formik.setFieldValue("headquartersId", String(hq[0].id));
      }

      const lines = await fetchActionLines();
      if (!activity) return;

      const matched = lines.find(
        (line) => line.code === activity.actionLineCode
      );
      if (!matched) return;

      formik.setFieldValue("actionLineId", String(matched.id));

      if (!strictMode) return;

      const goalList = await fetchGoals(matched.id);
      if (activity.goalId == null) return;
      const goalExists = goalList.some((goal) => goal.id === activity.goalId);
      if (!goalExists) return;

      formik.setFieldValue("goalId", String(activity.goalId));

      const activityList = await fetchActivities(activity.goalId);
      if (activity.activityId == null) return;
      const activityExists = activityList.some(
        (act) => act.id === activity.activityId
      );
      if (activityExists) {
        formik.setFieldValue("activityId", String(activity.activityId));
      }
    };
    void loadCatalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fallbackHeadquarters = useMemo<PpsHeadquartersOption | null>(() => {
    if (!activity) return null;
    const id = activity.headquartersId;
    const exists = headquarters.some((headquarter) => headquarter.id === id);
    if (exists) return null;
    return {
      id,
      name: activity.headquartersRelation?.name ?? `Sede ${id}`,
      licenseCode: activity.headquartersRelation?.licenseCode ?? null,
    };
  }, [activity, headquarters]);

  const territoryDisplay = useMemo(() => {
    const value = formik.values.headquartersId;
    if (!value) return "Se calcula automáticamente según la sede.";
    const id = Number(value);
    const headquarter =
      headquarters.find((item) => item.id === id) ??
      (fallbackHeadquarters && fallbackHeadquarters.id === id
        ? fallbackHeadquarters
        : null);

    const licenseCode = headquarter?.licenseCode ?? null;
    if (!licenseCode) return "Se calcula automáticamente según la sede.";
    const digits = licenseCode.replace(/\D/g, "");
    if (digits.length < 5) {
      return "Se calcula automáticamente según la sede.";
    }
    return digits.slice(0, 5);
  }, [formik.values.headquartersId, headquarters, fallbackHeadquarters]);

  const handleActionLineChange = (event: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    if (!strictMode) return;
    const lineId = Number(event.target.value);
    formik.setFieldValue("goalId", "");
    formik.setFieldValue("activityId", "");
    clearGoals();
    clearActivities();
    if (lineId) {
      void fetchGoals(lineId);
    }
  };

  const handleGoalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(event);
    const goalId = Number(event.target.value);
    formik.setFieldValue("activityId", "");
    clearActivities();
    if (goalId) {
      void fetchActivities(goalId);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
      >
        {activity ? ( <Pencil className="w-4 h-4" /> ) : "Agregar actividad"}
      </Button>

      <FormModal
        onSubmit={formik.handleSubmit}
        title={activity ? "Editar actividad" : "Agregar actividad"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="xl"
        submitText="Guardar actividad"
        isSubmitting={isLoading || formik.isSubmitting}
      >
        <div className="space-y-4 p-2">
          <PpsActivitySelectionFields
            formik={formik}
            headquarters={headquarters}
            isLoadingHeadquarters={isLoadingHeadquarters}
            fallbackHeadquarters={fallbackHeadquarters}
            actionLines={actionLines}
            isLoadingActionLines={isLoadingActionLines}
            territoryDisplay={territoryDisplay}
            onActionLineChange={handleActionLineChange}
          />

          {strictMode ? (
            <PpsActivityCatalogFields
              formik={formik}
              goals={goals}
              isLoadingGoals={isLoadingGoals}
              activities={activities}
              isLoadingActivities={isLoadingActivities}
              onGoalChange={handleGoalChange}
            />
          ) : (
            <PpsActivityManualFields formik={formik} />
          )}

          <PpsActivityExecutionFields
            formik={formik}
            targetPopulations={targetPopulations}
          />
        </div>

        {error && formik.submitCount > 0 && (
          <div className="p-4 mb-4 text-white bg-red-500 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </FormModal>
    </>
  );
};

export default PpsActivityModal;

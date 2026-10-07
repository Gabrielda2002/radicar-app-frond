import { useMemo } from "react";
import type { ChangeEvent } from "react";
import type { FormikProps } from "formik";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Textarea from "@/components/common/Ui/Textarea";
import type { PpsActivity, PpsGoal } from "@/featuures/PPS/models/IPps";
import type { PpsActivityFormValues } from "./ppsActivityForm";

interface PpsActivityCatalogFieldsProps {
  formik: FormikProps<PpsActivityFormValues>;
  goals: PpsGoal[];
  isLoadingGoals: boolean;
  activities: PpsActivity[];
  isLoadingActivities: boolean;
  onGoalChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const PpsActivityCatalogFields: React.FC<PpsActivityCatalogFieldsProps> = ({
  formik,
  goals,
  isLoadingGoals,
  activities,
  isLoadingActivities,
  onGoalChange,
}) => {
  const goalOptions = useMemo(
    () =>
      goals.map((goal) => ({
        value: goal.id,
        label: `${goal.code} — ${goal.description}`,
      })),
    [goals]
  );

  const activityOptions = useMemo(
    () =>
      activities.map((act) => ({
        value: act.id,
        label: `${act.code} — ${act.description}`,
      })),
    [activities]
  );

  const selectedGoal = useMemo(
    () => goals.find((goal) => goal.id === Number(formik.values.goalId)) ?? null,
    [goals, formik.values.goalId]
  );

  const selectedActivity = useMemo(
    () =>
      activities.find(
        (act) => act.id === Number(formik.values.activityId)
      ) ?? null,
    [activities, formik.values.activityId]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          label="Meta"
          name="goalId"
          value={formik.values.goalId}
          onChange={onGoalChange}
          onBlur={formik.handleBlur}
          options={goalOptions}
          error={
            formik.touched.goalId && formik.errors.goalId
              ? formik.errors.goalId
              : undefined
          }
          touched={formik.touched.goalId as boolean}
          required
          disabled={
            isLoadingGoals ||
            !formik.values.actionLineId ||
            formik.isSubmitting
          }
        />
        <Select
          label="Actividad"
          name="activityId"
          value={formik.values.activityId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={activityOptions}
          error={
            formik.touched.activityId && formik.errors.activityId
              ? formik.errors.activityId
              : undefined
          }
          touched={formik.touched.activityId as boolean}
          required
          disabled={
            isLoadingActivities ||
            !formik.values.goalId ||
            formik.isSubmitting
          }
        />
      </div>

      {selectedGoal && (
        <div className="grid grid-cols-1 gap-4 p-3 border border-gray-200 rounded-md md:grid-cols-2 dark:border-gray-600">
          <Input label="Código de la meta" value={selectedGoal.code} disabled />
          <Textarea
            label="Descripción de la meta"
            value={selectedGoal.description}
            disabled
            minRows={2}
          />
        </div>
      )}
      {selectedActivity && (
        <div className="grid grid-cols-1 gap-4 p-3 border border-gray-200 rounded-md md:grid-cols-2 dark:border-gray-600">
          <Input
            label="Código de la actividad"
            value={selectedActivity.code}
            disabled
          />
          <Textarea
            label="Descripción de la actividad"
            value={selectedActivity.description}
            disabled
            minRows={2}
          />
        </div>
      )}
    </>
  );
};

export default PpsActivityCatalogFields;

import * as Yup from "yup";
import type {
  PpsPeriod,
  PpsProgrammedActivityRow,
} from "@/featuures/PPS/models/IPps";

export interface PpsActivityFormValues {
  headquartersId: string;
  actionLineId: string;
  goalId: string;
  activityId: string;
  goalCode: string;
  goalDescription: string;
  activityCode: string;
  activityDescription: string;
  numericExpression: string;
  targetPopulationId: string;
  startDate: string;
  endDate: string;
  programmedResources: string;
}

export const createActivityInitialValues = (
  activity: PpsProgrammedActivityRow | null,
  period: PpsPeriod
): PpsActivityFormValues => ({
  headquartersId: activity ? String(activity.headquartersId) : "",
  actionLineId: "",
  goalId: activity ? String(activity.goalId ?? "") : "",
  activityId: activity ? String(activity.activityId ?? "") : "",
  goalCode: activity?.goalCode ?? "",
  goalDescription: activity?.goalDescription ?? "",
  activityCode: activity?.activityCode ?? "",
  activityDescription: activity?.activityDescription ?? "",
  numericExpression: activity ? String(activity.numericExpression) : "",
  targetPopulationId: activity ? String(activity.targetPopulationId) : "",
  startDate: activity?.startDate ?? period.startDate,
  endDate: activity?.endDate ?? period.endDate,
  programmedResources: activity ? String(activity.programmedResources) : "",
});

export const buildActivityValidationSchema = (
  strictMode: boolean,
  period: PpsPeriod
): Yup.AnyObjectSchema => {
  const withinPeriodMessage = `Las fechas de la actividad deben estar dentro de la vigencia (${period.startDate} a ${period.endDate}).`;

  const descriptionField = (label: string) =>
    Yup.string()
      .required(
        `La descripción de la ${label} debe tener entre 20 y 300 caracteres.`
      )
      .min(
        20,
        `La descripción de la ${label} debe tener entre 20 y 300 caracteres.`
      )
      .max(
        300,
        `La descripción de la ${label} debe tener entre 20 y 300 caracteres.`
      )
      .test(
        "no-punctuation",
        `La descripción de la ${label} no puede contener comas ni punto y coma.`,
        (value) => value == null || !/[,;]/.test(value)
      )
      .test(
        "not-na",
        `La descripción de la ${label} no puede ser 'no aplica'.`,
        (value) => value == null || value.trim().toLowerCase() !== "no aplica"
      );

  const base: Record<string, Yup.AnySchema> = {
    headquartersId: Yup.string().required("Seleccione la sede."),
    actionLineId: Yup.string().required("Seleccione la línea de acción."),
    numericExpression: Yup.number()
      .typeError("La expresión numérica debe ser mayor a 0.")
      .integer("La expresión numérica debe ser mayor a 0.")
      .min(1, "La expresión numérica debe ser mayor a 0.")
      .required("La expresión numérica debe ser mayor a 0."),
    targetPopulationId: Yup.string().required(
      "Seleccione la población objetivo."
    ),
    startDate: Yup.string()
      .required("Indique la fecha de inicio.")
      .test("start-within-period", withinPeriodMessage, (value) => {
        if (!value) return true;
        return value >= period.startDate && value <= period.endDate;
      }),
    endDate: Yup.string()
      .required("Indique la fecha de fin.")
      .test(
        "end-after-start",
        "La fecha de fin no puede ser anterior a la de inicio.",
        function (value) {
          const { startDate } = this.parent as PpsActivityFormValues;
          if (!startDate || !value) return true;
          return value >= startDate;
        }
      )
      .test("end-within-period", withinPeriodMessage, (value) => {
        if (!value) return true;
        return value >= period.startDate && value <= period.endDate;
      }),
    programmedResources: Yup.number()
      .typeError(
        "Los recursos programados deben ser 0 o mayor/igual a 10.000."
      )
      .test(
        "resources-range",
        "Los recursos programados deben ser 0 o mayor/igual a 10.000.",
        (value) => {
          if (value == null) return false;
          return value === 0 || value >= 10000;
        }
      )
      .required(
        "Los recursos programados deben ser 0 o mayor/igual a 10.000."
      ),
  };

  if (strictMode) {
    base.goalId = Yup.string().required("Seleccione la meta del catálogo.");
    base.activityId = Yup.string().required(
      "Seleccione la actividad del catálogo."
    );
  } else {
    base.goalCode = Yup.string()
      .required(
        "El consecutivo de la meta debe tener el formato MXX (Ej: M01)."
      )
      .matches(
        /^M\d{2,3}$/i,
        "El consecutivo de la meta debe tener el formato MXX (Ej: M01)."
      );
    base.goalDescription = descriptionField("meta");
    base.activityCode = Yup.string()
      .required(
        "El consecutivo de la actividad debe tener el formato AXX (Ej: A01)."
      )
      .matches(
        /^A\d{2,3}$/i,
        "El consecutivo de la actividad debe tener el formato AXX (Ej: A01)."
      );
    base.activityDescription = descriptionField("actividad");
  }

  return Yup.object().shape(base);
};

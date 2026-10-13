import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS, fetchPpsActionLinesAsOptions } from "./optionsLoaders";

export const ppsGoalForm: TableFormConfig = {
  endPoint: "pps/goals",
  updateEndPoint: "pps/goals",
  create: {
    fields: [
      {
        name: "actionLineId",
        label: "Línea de Acción",
        type: "select",
        required: true,
        options: fetchPpsActionLinesAsOptions,
      },
      {
        name: "code",
        label: "Código",
        type: "text",
        required: true,
        placeholder: "Ej: M01",
      },
      {
        name: "description",
        label: "Descripción de la Meta",
        type: "textarea",
        required: true,
        gridColumn: "full",
        placeholder: "Entre 20 y 300 caracteres, sin comas ni punto y coma",
      },
    ],
    validationSchema: Yup.object({
      actionLineId: Yup.number().required("La línea de acción es obligatoria"),
      code: Yup.string()
        .matches(/^M\d{2}$/, "El código debe tener formato MXX (ej: M01)")
        .required("El código es obligatorio"),
      description: Yup.string()
        .min(20, "La descripción debe tener al menos 20 caracteres")
        .max(300, "La descripción no puede superar 300 caracteres")
        .test(
          "no-commas-semicolons",
          "La descripción no puede contener comas ni punto y coma",
          (value) => !value || !/[,;]/.test(value)
        )
        .test(
          "no-na",
          "La descripción no puede ser 'no aplica'",
          (value) => !value || value.trim().toLowerCase() !== "no aplica"
        )
        .required("La descripción es obligatoria"),
    }),
    mapInitialValues: () => ({
      actionLineId: "",
      code: "",
      description: "",
    }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "number", readOnly: true },
      {
        name: "actionLineId",
        label: "Línea de Acción",
        type: "select",
        required: true,
        options: fetchPpsActionLinesAsOptions,
      },
      {
        name: "code",
        label: "Código",
        type: "text",
        required: true,
        placeholder: "Ej: M01",
      },
      {
        name: "description",
        label: "Descripción de la Meta",
        type: "textarea",
        required: true,
        gridColumn: "full",
        placeholder: "Entre 20 y 300 caracteres, sin comas ni punto y coma",
      },
      {
        name: "status",
        label: "Estado",
        type: "select",
        required: true,
        options: STATUS_OPTIONS,
      },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      actionLineId: Yup.number().required("La línea de acción es obligatoria"),
      code: Yup.string()
        .matches(/^M\d{2}$/, "El código debe tener formato MXX (ej: M01)")
        .required("El código es obligatorio"),
      description: Yup.string()
        .min(20, "La descripción debe tener al menos 20 caracteres")
        .max(300, "La descripción no puede superar 300 caracteres")
        .test(
          "no-commas-semicolons",
          "La descripción no puede contener comas ni punto y coma",
          (value) => !value || !/[,;]/.test(value)
        )
        .test(
          "no-na",
          "La descripción no puede ser 'no aplica'",
          (value) => !value || value.trim().toLowerCase() !== "no aplica"
        )
        .required("La descripción es obligatoria"),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      actionLineId: source?.actionLineId ?? "",
      code: source?.code ?? "",
      description: source?.description ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

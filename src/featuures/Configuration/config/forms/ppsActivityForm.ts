import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS, fetchPpsGoalsAsOptions } from "./optionsLoaders";

export const ppsActivityForm: TableFormConfig = {
  endPoint: "pps/activities",
  updateEndPoint: "pps/activities",
  create: {
    fields: [
      {
        name: "goalId",
        label: "Meta",
        type: "select",
        required: true,
        options: fetchPpsGoalsAsOptions,
      },
      {
        name: "code",
        label: "Código",
        type: "text",
        required: true,
        placeholder: "Ej: A01",
      },
      {
        name: "description",
        label: "Descripción de la Actividad",
        type: "textarea",
        required: true,
        gridColumn: "full",
        placeholder: "Entre 20 y 300 caracteres, sin comas ni punto y coma",
      },
    ],
    validationSchema: Yup.object({
      goalId: Yup.number().required("La meta es obligatoria"),
      code: Yup.string()
        .matches(/^A\d{2}$/, "El código debe tener formato AXX (ej: A01)")
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
      goalId: "",
      code: "",
      description: "",
    }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "number", readOnly: true },
      {
        name: "goalId",
        label: "Meta",
        type: "select",
        required: true,
        options: fetchPpsGoalsAsOptions,
      },
      {
        name: "code",
        label: "Código",
        type: "text",
        required: true,
        placeholder: "Ej: A01",
      },
      {
        name: "description",
        label: "Descripción de la Actividad",
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
      goalId: Yup.number().required("La meta es obligatoria"),
      code: Yup.string()
        .matches(/^A\d{2}$/, "El código debe tener formato AXX (ej: A01)")
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
      goalId: source?.goalId ?? "",
      code: source?.code ?? "",
      description: source?.description ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

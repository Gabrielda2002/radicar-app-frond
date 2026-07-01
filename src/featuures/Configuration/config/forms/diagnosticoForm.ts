import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";

export const diagnosticoForm: TableFormConfig = {
  endPoint: "diagnostico",
  updateEndPoint: "update-diagnostico",
  create: {
    fields: [
      { name: "code", label: "Código", type: "text", required: true },
      {
        name: "description",
        label: "Descripción del Diagnóstico",
        type: "text",
        required: true,
        gridColumn: "full",
      },
    ],
    validationSchema: Yup.object({
      code: Yup.string().required("El código es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
    }),
    mapInitialValues: () => ({ code: "", description: "" }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "text", readOnly: true },
      { name: "code", label: "Código", type: "text", readOnly: true },
      {
        name: "description",
        label: "Descripción del Diagnóstico",
        type: "text",
        required: true,
        gridColumn: "full",
      },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      code: Yup.string(),
      description: Yup.string().required("La descripción es obligatoria"),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      code: source?.code ?? "",
      description: source?.description ?? "",
    }),
  },
};

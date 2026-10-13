import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";

export const ppsFundingSourceForm: TableFormConfig = {
  endPoint: "pps/funding-sources",
  updateEndPoint: "pps/funding-sources",
  create: {
    fields: [
      {
        name: "code",
        label: "Código",
        type: "text",
        required: true,
        placeholder: "Ej: F01",
      },
      {
        name: "description",
        label: "Descripción de la Fuente de Recursos",
        type: "textarea",
        required: true,
        gridColumn: "full",
      },
    ],
    validationSchema: Yup.object({
      code: Yup.string().required("El código es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
    }),
    mapInitialValues: () => ({
      code: "",
      description: "",
    }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "number", readOnly: true },
      { name: "code", label: "Código", type: "text", readOnly: true },
      {
        name: "description",
        label: "Descripción de la Fuente de Recursos",
        type: "textarea",
        required: true,
        gridColumn: "full",
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
      code: Yup.string(),
      description: Yup.string().required("La descripción es obligatoria"),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      code: source?.code ?? "",
      description: source?.description ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

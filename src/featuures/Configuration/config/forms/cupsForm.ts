import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";

export const cupsForm: TableFormConfig = {
  endPoint: "cups",
  updateEndPoint: "update-status-cups",
  create: {
    fields: [
      { name: "code", label: "Código", type: "text", required: true },
      {
        name: "name",
        label: "Descripción",
        type: "text",
        required: true,
        gridColumn: "full",
      },
    ],
    validationSchema: Yup.object({
      code: Yup.string().required("El código es obligatorio"),
      name: Yup.string().required("La descripción es obligatoria"),
    }),
    mapInitialValues: () => ({ code: "", name: "" }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "text", readOnly: true },
      { name: "code", label: "Código", type: "text", readOnly: true },
      {
        name: "name",
        label: "Descripción",
        type: "text",
        required: true,
        gridColumn: "full",
      },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      code: Yup.string(),
      name: Yup.string().required("La descripción es obligatoria"),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      code: source?.code ?? "",
      name: source?.name ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

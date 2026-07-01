import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";

export const especialidadForm: TableFormConfig = {
  endPoint: "especialidades",
  updateEndPoint: "update-status-especialidad",
  create: {
    fields: [
      {
        name: "name",
        label: "Nombre de la Especialidad",
        type: "text",
        required: true,
      },
    ],
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
    }),
    mapInitialValues: () => ({ name: "" }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID Especialidad", type: "text", readOnly: true },
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      name: Yup.string().required("El nombre es obligatorio"),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      name: source?.name ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

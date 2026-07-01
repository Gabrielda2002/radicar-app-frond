import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";

export const municipioForm: TableFormConfig = {
  endPoint: "municipio",
  updateEndPoint: "update-status-municipio",
  create: {
    fields: [
      { name: "name", label: "Nombre del Municipio", type: "text", required: true },
      { name: "municipioCode", label: "Código Municipio", type: "text", required: true },
    ],
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      municipioCode: Yup.string().required("El código es obligatorio"),
    }),
    mapInitialValues: () => ({ name: "", municipioCode: "" }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "text", readOnly: true },
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "municipioCode", label: "Código Municipio", type: "text", readOnly: true },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      name: Yup.string().required("El nombre es obligatorio"),
      municipioCode: Yup.string(),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      name: source?.name ?? "",
      municipioCode: source?.municipioCode ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

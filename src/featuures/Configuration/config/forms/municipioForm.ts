import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS, fetchDepartamentosAsOptions } from "./optionsLoaders";

export const municipioForm: TableFormConfig = {
  endPoint: "municipios",
  updateEndPoint: "update-status-municipio",
  create: {
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "municipioCode", label: "Código", type: "text", required: true },
      {
        name: "department",
        label: "Departamento",
        type: "select",
        required: true,
        options: fetchDepartamentosAsOptions,
      },
    ],
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      municipioCode: Yup.string().required("El código es obligatorio"),
      department: Yup.string().required("El departamento es obligatorio"),
    }),
    mapInitialValues: () => ({ name: "", municipioCode: "", department: "" }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID", type: "text", readOnly: true },
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "municipioCode", label: "Código Municipio", type: "text", readOnly: true },
      { name: "department", label: "Departamento", type: "select", required: true, options: fetchDepartamentosAsOptions },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      name: Yup.string().required("El nombre es obligatorio"),
      municipioCode: Yup.string(),
      department: Yup.string().required("El departamento es obligatorio"),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      name: source?.name ?? "",
      municipioCode: source?.municipalityCode ?? "",
      department: source?.departmentId ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

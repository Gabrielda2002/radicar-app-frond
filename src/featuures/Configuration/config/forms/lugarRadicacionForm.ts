import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";
import {
  fetchDepartamentosAsOptions,
  fetchMunicipiosAsOptions,
} from "./optionsLoaders";

export const lugarRadicacionForm: TableFormConfig = {
  endPoint: "lugares-radicacion",
  updateEndPoint: "update-lugar-status",
  create: {
    fields: [
      { name: "name", label: "Nombre de la Sede", type: "text", required: true },
      {
        name: "departmentId",
        label: "Departamento",
        type: "select",
        required: true,
        options: fetchDepartamentosAsOptions,
      },
      {
        name: "cityId",
        label: "Municipio",
        type: "select",
        required: true,
        options: fetchMunicipiosAsOptions,
      },
      {
        name: "address",
        label: "Dirección",
        type: "text",
        required: true,
        gridColumn: "full",
      },
      {
        name: "headquartersNumber",
        label: "Número de Sede",
        type: "number",
        required: true,
      },
    ],
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      departmentId: Yup.number().required("El departamento es obligatorio"),
      cityId: Yup.number().required("El municipio es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      headquartersNumber: Yup.number()
        .min(1, "El número de sede debe ser al menos 1")
        .required("El número de sede es obligatorio"),
    }),
    mapInitialValues: () => ({
      name: "",
      departmentId: "",
      cityId: "",
      address: "",
      headquartersNumber: 0,
    }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID Sede", type: "text", readOnly: true },
      { name: "name", label: "Nombre", type: "text", required: true },
      {
        name: "departmentId",
        label: "Departamento",
        type: "select",
        required: true,
        options: fetchDepartamentosAsOptions,
      },
      {
        name: "cityId",
        label: "Municipio",
        type: "select",
        required: true,
        options: fetchMunicipiosAsOptions,
      },
      {
        name: "address",
        label: "Dirección",
        type: "text",
        required: true,
        gridColumn: "full",
      },
      { name: "headquartersNumber", label: "Número de Sede", type: "number", readOnly: true },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      name: Yup.string().required("El nombre es obligatorio"),
      departmentId: Yup.number().required("El departamento es obligatorio"),
      cityId: Yup.number().required("El municipio es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      headquartersNumber: Yup.number(),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      name: source?.name ?? "",
      departmentId: source?.departmentId ?? "",
      cityId: source?.cityId ?? "",
      address: source?.address ?? "",
      headquartersNumber: source?.headquartersNumber ?? 0,
      status: source?.status ? 1 : 0,
    }),
  },
};

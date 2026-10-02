import * as Yup from "yup";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { STATUS_OPTIONS } from "./optionsLoaders";
import {
  fetchMunicipiosAsOptions,
} from "./optionsLoaders";

export const lugarRadicacionForm: TableFormConfig = {
  endPoint: "headquarters",
  updateEndPoint: "headquarters",
  create: {
    fields: [
      { name: "name", label: "Nombre de la Sede", type: "text", required: true },
      {
        name: "cityId",
        label: "Municipio",
        type: "select",
        required: true,
        options: fetchMunicipiosAsOptions,
      },
            {
        name: "licenseCode",
        label: "Codigo Habilitación",
        type: "text",
        required: true
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
      cityId: Yup.number().required("El municipio es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      headquartersNumber: Yup.number()
        .min(1, "El número de sede debe ser al menos 1")
        .required("El número de sede es obligatorio"),
      licenseCode: Yup.string().required("El código de habilitación es obligatorio")
        .min(5, "El código de habilitación debe tener al menos 5 caracteres")
        .max(20, "El código de habilitación no puede exceder 20 caracteres")
    }),
    mapInitialValues: () => ({
      name: "",
      cityId: "",
      address: "",
      headquartersNumber: 0,
      licenseCode: ""
    }),
  },
  edit: {
    fields: [
      { name: "id", label: "ID Sede", type: "text", readOnly: true },
      { name: "name", label: "Nombre", type: "text", required: true },
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
      { name: "licenseCode", label: "Codigo Habilitación", type: "text", required: true },
      { name: "headquartersNumber", label: "Número de Sede", type: "number", readOnly: true },
      { name: "status", label: "Estado", type: "select", required: true, options: STATUS_OPTIONS },
    ],
    validationSchema: Yup.object({
      id: Yup.number(),
      name: Yup.string().required("El nombre es obligatorio"),
      cityId: Yup.number().required("El municipio es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      licenseCode: Yup.string().required("El código de habilitación es obligatorio")
        .min(5, "El código de habilitación debe tener al menos 5 caracteres")
        .max(20, "El código de habilitación no puede exceder 20 caracteres"),
      headquartersNumber: Yup.number(),
      status: Yup.number().oneOf([0, 1]),
    }),
    mapInitialValues: (source) => ({
      id: source?.id ?? "",
      name: source?.name ?? "",
      cityId: source?.cityId ?? "",
      address: source?.address ?? "",
      licenseCode: source?.licenseCode ?? "",
      headquartersNumber: source?.headquartersNumber ?? 0,
      status: source?.status ? 1 : 0,
    }),
  },
};

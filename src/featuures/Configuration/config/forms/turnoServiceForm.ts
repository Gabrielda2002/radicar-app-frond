import * as Yup from "yup";
import type {
  FieldDefinition,
  TableFormConfig,
} from "@/components/common/Modals/GenericFormModal/types";
import { TURNO_SERVICE_ENDPOINT } from "@/featuures/Turnos/Admin/services/turnos-admin.service";
import { STATUS_OPTIONS } from "./optionsLoaders";

const nameField: FieldDefinition = {
  name: "name",
  label: "Nombre del servicio",
  type: "text",
  gridColumn: "full",
  required: true,
};

const nameSchema = Yup.string()
  .trim()
  .required("El nombre del servicio es obligatorio")
  .min(3, "El nombre debe tener al menos 3 caracteres")
  .max(150, "El nombre debe tener como máximo 150 caracteres");

export const turnoServiceForm: TableFormConfig = {
  endPoint: TURNO_SERVICE_ENDPOINT,
  create: {
    fields: [nameField],
    validationSchema: Yup.object({ name: nameSchema }),
    mapInitialValues: () => ({ name: "" }),
  },
  edit: {
    fields: [
      nameField,
      { name: "status", label: "Estado", type: "select", options: STATUS_OPTIONS, required: true },
    ],
    validationSchema: Yup.object({
      name: nameSchema,
      status: Yup.number().oneOf([0, 1]).required("El estado es obligatorio"),
    }),
    mapInitialValues: (source) => ({
      id: source?.id,
      name: source?.name ?? "",
      status: source?.status ? 1 : 0,
    }),
  },
};

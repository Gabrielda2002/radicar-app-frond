import * as Yup from "yup";
import type { SelectOption } from "@/components/common/Ui/Select";
import type {
  PpsReportingEntity,
  IdentificationType,
  DueYearRelation,
} from "@/featuures/PPS/models/IPps";

export interface PpsConfigurationFormValues {
  identificationType: IdentificationType;
  identificationNumber: string;
  entityName: string;
  programmingFilePrefix: string;
  monitoringFilePrefix: string;
  strictMode: boolean;
  programmingDueMonth: number | string;
  programmingDueDay: number | string;
  programmingDueYear: DueYearRelation;
  monitoringDueMonth: number | string;
  monitoringDueDay: number | string;
  monitoringDueYear: DueYearRelation;
}

export const IDENTIFICATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "NI", label: "Nit (ESE, IPS, EAPB)" },
  { value: "DE", label: "Departamento" },
  { value: "DI", label: "Distrito" },
  { value: "MU", label: "Municipio" },
];

export const MONTH_OPTIONS: SelectOption[] = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

export const YEAR_RELATION_OPTIONS: SelectOption[] = [
  { value: "same", label: "de la misma vigencia" },
  { value: "next", label: "del año siguiente" },
];

export const IDENTIFICATION_HINTS: Record<IdentificationType, string> = {
  NI: "Nit sin dígito de verificación. En el nombre del archivo se completa a 12 dígitos.",
  DE: "Código Divipola (2 dígitos del departamento).",
  DI: "Código Divipola (5 dígitos del municipio/distrito).",
  MU: "Código Divipola (5 dígitos del municipio/distrito).",
};

export const DEFAULT_VALUES: PpsConfigurationFormValues = {
  identificationType: "NI",
  identificationNumber: "",
  entityName: "",
  programmingFilePrefix: "",
  monitoringFilePrefix: "",
  strictMode: true,
  programmingDueMonth: 1,
  programmingDueDay: 31,
  programmingDueYear: "same",
  monitoringDueMonth: 1,
  monitoringDueDay: 31,
  monitoringDueYear: "next",
};

export const toFormValues = (
  entity: PpsReportingEntity
): PpsConfigurationFormValues => ({
  identificationType: entity.identificationType,
  identificationNumber: entity.identificationNumber,
  entityName: entity.entityName || "",
  programmingFilePrefix: entity.programmingFilePrefix,
  monitoringFilePrefix: entity.monitoringFilePrefix,
  strictMode: entity.strictMode,
  programmingDueMonth: entity.programmingDueMonth,
  programmingDueDay: entity.programmingDueDay,
  programmingDueYear: entity.programmingDueYear,
  monitoringDueMonth: entity.monitoringDueMonth,
  monitoringDueDay: entity.monitoringDueDay,
  monitoringDueYear: entity.monitoringDueYear,
});

export const validationSchema = Yup.object({
  identificationType: Yup.string()
    .oneOf(["NI", "DE", "DI", "MU"], "Tipo de identificación no válido.")
    .required("El tipo de identificación es requerido."),
  identificationNumber: Yup.string()
    .required("El número de identificación es requerido.")
    .matches(
      /^[0-9]+$/,
      "Ingrese un número de identificación válido (solo dígitos)."
    ),
  entityName: Yup.string().notRequired(),
  programmingFilePrefix: Yup.string()
    .trim()
    .required("El prefijo de programación es requerido."),
  monitoringFilePrefix: Yup.string()
    .trim()
    .required("El prefijo de seguimiento es requerido."),
  strictMode: Yup.boolean().required(),
  programmingDueMonth: Yup.number()
    .typeError("El mes debe estar entre 1 y 12.")
    .integer("El mes debe estar entre 1 y 12.")
    .min(1, "El mes debe estar entre 1 y 12.")
    .max(12, "El mes debe estar entre 1 y 12.")
    .required("El mes es requerido."),
  programmingDueDay: Yup.number()
    .typeError("El día debe estar entre 1 y 31.")
    .integer("El día debe estar entre 1 y 31.")
    .min(1, "El día debe estar entre 1 y 31.")
    .max(31, "El día debe estar entre 1 y 31.")
    .required("El día es requerido."),
  programmingDueYear: Yup.string()
    .oneOf(["same", "next"], "Relación de vigencia no válida.")
    .required("Requerido."),
  monitoringDueMonth: Yup.number()
    .typeError("El mes debe estar entre 1 y 12.")
    .integer("El mes debe estar entre 1 y 12.")
    .min(1, "El mes debe estar entre 1 y 12.")
    .max(12, "El mes debe estar entre 1 y 12.")
    .required("El mes es requerido."),
  monitoringDueDay: Yup.number()
    .typeError("El día debe estar entre 1 y 31.")
    .integer("El día debe estar entre 1 y 31.")
    .min(1, "El día debe estar entre 1 y 31.")
    .max(31, "El día debe estar entre 1 y 31.")
    .required("El día es requerido."),
  monitoringDueYear: Yup.string()
    .oneOf(["same", "next"], "Relación de vigencia no válida.")
    .required("Requerido."),
});

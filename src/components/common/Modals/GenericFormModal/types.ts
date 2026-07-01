import type { SelectOption } from "@/components/common/Ui/Select";
import type * as Yup from "yup";

export type FieldType = "text" | "number" | "select";

export type FieldOptions = SelectOption[] | (() => Promise<SelectOption[]>);

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  readOnly?: boolean;
  options?: FieldOptions;
  placeholder?: string;
  gridColumn?: "full" | "half";
}

export type MapInitialValues = (
  source?: Record<string, unknown> | null
) => Record<string, unknown>;

export interface FormDescriptor {
  fields: FieldDefinition[];
  validationSchema: Yup.ObjectSchema<Record<string, unknown>>;
  mapInitialValues: MapInitialValues;
}

export interface TableFormConfig {
  endPoint: string;
  updateEndPoint?: string;
  create: FormDescriptor;
  edit: FormDescriptor;
}

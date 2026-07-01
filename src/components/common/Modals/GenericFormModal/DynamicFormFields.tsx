import Input from "@/components/common/Ui/Input";
import Select, { type SelectOption } from "@/components/common/Ui/Select";
import type { FieldDefinition } from "./types";

interface DynamicFormFieldsProps {
  fields: FieldDefinition[];
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean | undefined>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resolveOptions?: (field: FieldDefinition) => SelectOption[] | undefined;
}

const gridClass = (col: FieldDefinition["gridColumn"] | undefined) =>
  col === "full" ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-1";

const DynamicFormFields = ({
  fields,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  resolveOptions,
}: DynamicFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map((field) => {
        const value = (values[field.name] as string | number | undefined) ?? "";
        const error = errors[field.name];
        const isTouched = touched[field.name];

        if (field.type === "select") {
          const staticOptions = Array.isArray(field.options)
            ? field.options
            : undefined;
          const lazyOptions =
            !Array.isArray(field.options) && resolveOptions
              ? resolveOptions(field)
              : undefined;
          return (
            <div key={field.name} className={gridClass(field.gridColumn)}>
              <Select
                label={field.label}
                name={field.name}
                value={value as string | number}
                onChange={onChange}
                onBlur={onBlur}
                options={staticOptions ?? lazyOptions ?? []}
                required={field.required}
                error={error}
                touched={isTouched}
              />
            </div>
          );
        }

        return (
          <div key={field.name} className={gridClass(field.gridColumn)}>
            <Input
              label={field.label}
              type={field.type === "number" ? "number" : "text"}
              name={field.name}
              value={value as string | number}
              onChange={onChange}
              onBlur={onBlur}
              readOnly={field.readOnly}
              disabled={field.readOnly}
              required={field.required}
              placeholder={field.placeholder}
              error={error}
              touched={isTouched}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicFormFields;

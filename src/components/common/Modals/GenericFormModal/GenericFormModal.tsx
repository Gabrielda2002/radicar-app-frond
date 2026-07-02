import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import type { SelectOption } from "@/components/common/Ui/Select";
import DynamicFormFields from "./DynamicFormFields";
import { useDynamicForm, type DynamicFormMode } from "./useDynamicForm";
import type { TableFormConfig, FieldDefinition } from "./types";
import { SquarePen } from "lucide-react";

interface GenericFormModalProps {
  mode: DynamicFormMode;
  name: string;
  formConfig: TableFormConfig;
  source?: Record<string, unknown> | null;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  externalOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  submitText?: string;
}

const GenericFormModal = ({
  mode,
  name,
  formConfig,
  source,
  onSuccess,
  trigger,
  externalOpen,
  onOpenChange,
  size = "lg",
  submitText,
}: GenericFormModalProps) => {
  const descriptor = mode === "create" ? formConfig.create : formConfig.edit;
  const endPoint = formConfig.endPoint;
  const updateEndPoint = formConfig.updateEndPoint;

  const handleOpenChange = useCallback(
    () => onOpenChange?.(false),
    [onOpenChange]
  );

  const {
    formik,
    isOpen,
    open,
    close,
    loading,
    error,
  } = useDynamicForm({
    mode,
    descriptor,
    endPoint,
    updateEndPoint,
    source: source ?? null,
    onSuccess,
    onClose: handleOpenChange,
  });

  const [resolvedOptions, setResolvedOptions] = useState<
    Record<string, SelectOption[]>
  >({});

  const handleOpen = useCallback(async () => {
    await open();
    const lazyFields = descriptor.fields.filter(
      (f) => f.type === "select" && f.options && !Array.isArray(f.options)
    );
    const resolved = await Promise.all(
      lazyFields.map(async (f) => {
        const loader = f.options as () => Promise<SelectOption[]>;
        return { name: f.name, options: await loader() };
      })
    );
    setResolvedOptions((prev) => {
      const next = { ...prev };
      for (const { name, options } of resolved) {
        next[name] = options;
      }
      return next;
    });
  }, [descriptor.fields, open]);

  useEffect(() => {
    if (externalOpen !== undefined) {
      if (externalOpen && !isOpen) handleOpen();
      if (!externalOpen && isOpen) close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalOpen]);

  const resolveOptions = useCallback(
    (field: FieldDefinition) => resolvedOptions[field.name],
    [resolvedOptions]
  );

  const title = mode === "create" ? `Agregar ${name}` : `Actualizar ${name}`;
  const defaultSubmit = mode === "create" ? "Agregar" : "Guardar";

  const renderTrigger = () => {
    if (trigger !== undefined) return trigger;
    if (mode === "create") {
      return (
        <Button variant="primary" onClick={handleOpen}>
          {`Agregar ${name}`}
        </Button>
      );
    }
    return (
      <Button
        variant="secondary"
        onClick={handleOpen}
        icon={
          <SquarePen className="text-gray-600 dark:text-gray-300" />
        }
      />
    );
  };

  return (
    <>
      {renderTrigger()}
      <FormModal
        isOpen={isOpen}
        onClose={close}
        title={title}
        onSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting || loading}
        isValid={formik.isValid}
        submitText={submitText ?? defaultSubmit}
        size={size}
      >
        <div className="p-6">
          <DynamicFormFields
            fields={descriptor.fields}
            values={formik.values}
            errors={formik.errors as Record<string, string | undefined>}
            touched={formik.touched as Record<string, boolean | undefined>}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            resolveOptions={resolveOptions}
          />
          <AnimatePresence>
            {error && (
              <div className="mt-4">
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default GenericFormModal;

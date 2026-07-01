import { useCallback, useState } from "react";
import { useFormik, type FormikHelpers } from "formik";
import { useTableMutations } from "@/components/common/Modals/CrearDataTables/Hook/useTablesMutations";
import type { FormDescriptor } from "./types";

export type DynamicFormMode = "create" | "edit";

interface UseDynamicFormParams {
  mode: DynamicFormMode;
  descriptor: FormDescriptor;
  endPoint: string;
  updateEndPoint?: string;
  source?: Record<string, unknown> | null;
  onSuccess?: () => void;
  onClose: () => void;
}

export const useDynamicForm = ({
  mode,
  descriptor,
  endPoint,
  updateEndPoint,
  source,
  onSuccess,
  onClose,
}: UseDynamicFormParams) => {
  const { create, update, loading, error } = useTableMutations();
  const [isOpen, setIsOpen] = useState(false);

  const computeInitialValues = useCallback(
    (src: Record<string, unknown> | null | undefined) =>
      descriptor.mapInitialValues(mode === "edit" ? src : null),
    [descriptor, mode]
  );

  const formik = useFormik({
    initialValues: computeInitialValues(source),
    validationSchema: descriptor.validationSchema,
    enableReinitialize: false,
    onSubmit: async (
      values: Record<string, unknown>,
      helpers: FormikHelpers<Record<string, unknown>>
    ) => {
      const handler = () => {
        setIsOpen(false);
        onClose();
        onSuccess?.();
      };

      try {
        if (mode === "create") {
          await create(values, endPoint, handler);
        } else {
          const id = Number(values.id);
          const target = updateEndPoint ?? endPoint;
          await update(id, values, target, handler);
        }
      } catch {
        // El error ya se expone vía `error` del hook de mutaciones.
      }

      helpers.resetForm({ values: computeInitialValues(null) });
    },
  });

  const open = useCallback(() => {
    formik.resetForm({ values: computeInitialValues(source ?? null) });
    setIsOpen(true);
  }, [formik, computeInitialValues, source]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  return {
    formik,
    isOpen,
    open,
    close,
    loading,
    error,
  };
};

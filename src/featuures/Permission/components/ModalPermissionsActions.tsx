import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState, useMemo } from "react";
import FormModal from "@/components/common/Ui/FormModal";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import Button from "@/components/common/Ui/Button";
import { ModalActionsProps } from "../type/IRequestsPermissions";
import { FormatDate } from "@/utils/FormatDate";
import {
  getActionsByStepType,
  getCommentLabel,
  isCommentRequired,
} from "../constants/stepActionsConfig";
import { UseMutationsPermission } from "../hook/useMutationsPermission";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

const ModalPermissionsActions: React.FC<ModalActionsProps> = ({
  permission,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {update, error, isLoading} = UseMutationsPermission();

  const currentStep = useMemo(() => {
    return permission.steps && permission.steps.length > 0
      ? permission.steps[0]
      : null;
  }, [permission.steps]);

  const availableActions = useMemo(() => {
    if (!currentStep) return [];
    return getActionsByStepType(permission.category, currentStep.stepType);
  }, [currentStep, permission.category]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        action: Yup.string()
          .required("La acción es requerida")
          .oneOf(
            availableActions.map((a) => a.value),
            "Acción no válida para este tipo de aprobación"
          ),
        comment: Yup.string()
          .max(500, "Comentario debe tener máximo 500 caracteres")
          .when("action", {
            is: "RECHAZADO",
            then: (schema) =>
              schema.required("El comentario es obligatorio al rechazar"),
          }),
      }),
    [availableActions]
  );

  const formik = useFormik({
    initialValues: {
      action: "",
      comment: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        
        await update(values, permission.id, currentStep?.id || 0 , () => {
          setIsOpen(false);
          formik.resetForm();
          toast.success("Acción realizada con éxito");
          onSuccess?.();
        })

      } catch (error) {
        
      }
    },
  });

  const commentLabel = useMemo(() => {
    return getCommentLabel(formik.values.action);
  }, [formik.values.action]);

  const isCommentRequiredForAction = useMemo(() => {
    return isCommentRequired(formik.values.action);
  }, [formik.values.action]);

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Acciones de Permiso"
        onSubmit={formik.handleSubmit}
        isValid={formik.isValid && formik.dirty}
        isSubmitting={formik.isSubmitting || isLoading}
        submitText="Guardar Cambios"
        size="lg"
      >
        {!currentStep ? (
           <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No hay acciones pendientes para esta solicitud.
            </p>
          </div>
        ): availableActions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Solo puedes visualizar esta solicitud. No hay acciones
              disponibles.
            </p>
          </div>
        ): (
        <div className="space-y-4">
          <div className="space-y-4 my-4 border rounded-lg dark:border-gray-700 shadow-sm shadow-teal-400 m-4 p-1">
            <div className="border-b border-gray-200 dark:border-gray-700 py-2 mb-4">
              <div className="flex items-center justify-center">
                <h3 className="text-base text-start px-4 font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Solicitud: #{permission?.id}
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                  Detalles de la solicitud
                </p>
              </div>
            </div>
            {/* Detalles de la solicitud */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Estado Actual:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.overallStatus}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Fecha Creación Solicitud:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{FormatDate(permission?.createdAt, false)}</p>
              </div>
              <div className="col-span-2">
                <h5 className="text-base font-semibold dark:text-gray-100">Paso Actual #{currentStep?.order}:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStep?.stepType}
                </p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Granularidad:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.granularity}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Tipo de Solicitud:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.category}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Fecha de Inicio:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{FormatDate(permission?.startDate, false)}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Fecha de Fin:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{FormatDate(permission?.endDate, false)}</p>
              </div>
              <div className="col-span-2">
                <h5 className="text-base font-semibold dark:text-gray-100">Nota:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.notes || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Solicitante:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission.requesterName}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">
                  {currentStep?.stepType === "JEFE" ? "Jefe Inmediato (Tú)" : 
                   currentStep?.stepType === "RRHH" ? "Recursos Humanos (Tú)" :
                   `${currentStep?.stepType} (Tú)`}:
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStep?.approverName || "N/A"}
                </p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">Días Solicitados:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.requestedDays}</p>
              </div>
              <div>
                <h5 className="text-base font-semibold dark:text-gray-100">No remunerado:</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{permission?.nonRemunerated ? "Sí" : "No"}</p>
              </div>
            </div>
          </div>
          {currentStep && currentStep.status === "PENDIENTE" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 py-3 px-4">
            <Select
              options={availableActions}
              label="Acción"
              name="action"
              value={formik.values.action}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.action && formik.errors.action
                  ? formik.errors.action
                  : undefined
              }
              touched={formik.touched.action}
              required
            />
            <Input
              label={commentLabel}
              name="comment"
              type="text"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.comment && formik.errors.comment
                  ? formik.errors.comment
                  : undefined
              }
              touched={formik.touched.comment}
              required={isCommentRequiredForAction}
            />
          </div>
          ): (
            <div className="grid grid-cols-1 py-3 px-4">
              <p className="text-gray-600 dark:text-gray-400">
                Ya se ha tomado una acción en este paso. No se pueden realizar más acciones.
              </p>
            </div>
          )}
          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
        )}
      </FormModal>
    </>
  );
};

export default ModalPermissionsActions;

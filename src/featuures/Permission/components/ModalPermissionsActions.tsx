import * as Yup from "yup";
import { useFormik } from "formik";
import FormModal from "@/components/common/Ui/FormModal";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import React, { useState } from "react";
import Button from "@/components/common/Ui/Button";
import { ModalActionsProps } from "../type/IRequestsPermissions";
import { FormatDate } from "@/utils/FormatDate";

const ModalPermissionsActions: React.FC<ModalActionsProps> = ({
  permission,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const validationSchema = Yup.object({
    action: Yup.string().required("Status is required"),
    comment: Yup.string().max(
      500,
      "Comentario debe tener máximo 500 caracteres"
    ),
  });

  const formik = useFormik({
    initialValues: {
      action: "",
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
        isValid={formik.isValid}
        isSubmitting={formik.isSubmitting}
        submitText="Guardar Cambios"
        size="lg"
      >
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
                <h5 className="text-base font-semibold dark:text-gray-100">Jefe inmediato (Tu):</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nombre de jefe inmediato</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 py-3 px-4">
            <Select
              options={[
                { value: "APROBADO", label: "Aprobar" },
                { value: "RECHAZADO", label: "Rechazar" },
                { value: "PENDIENTE", label: "Pendiente" },
                { value: "VISTO", label: "Visto" },
              ]}
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
              label="Comentario"
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
            />
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalPermissionsActions;

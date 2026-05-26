//*Fuctions and Hooks
import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";
import { FormikErrors, FormikValues } from "@/models/IFotmikValues";

//*Properties
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { auditCups } from "@/models/IAuditar";
import useStoreAuthService from "../store/useStoreAuthService";
import FormModal from "@/components/common/Ui/FormModal";
import { BookCheck } from "lucide-react";
import { useStoreFuntionalUnit } from "@/store/useStoreFuntionalUnit";
import { useStoreServicesStatus } from "@/store/useStoreServicesStatus";

interface ModalAuthorizedServiceProps {
  cups: auditCups[];
  serviceId: number;
}

const ModalAuthorizedServices: React.FC<ModalAuthorizedServiceProps> = ({ cups, serviceId }) => {
  const {
    authorizeService,
    error: authorizeError,
    isLoading,
  } = useStoreAuthService();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { units, error: errorUnit, getFuntionalUnit } = useStoreFuntionalUnit();
  const { status, getStatus, error: statusError } = useStoreServicesStatus();

  const handleOpenModal = async () => {
    setIsOpen(true);
    await Promise.all([getFuntionalUnit(), getStatus()]);
  }

  const validationSchema = Yup.object({
    justificacion: Yup.string()
      .required("La justificación es requerida.")
      .min(3, "La justificación debe tener al menos 3 caracteres.")
      .max(500, "La justificación no debe exceder los 500 caracteres."),
    cupsDetails: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().required("ID CUPS radicado es requerido."),
        idRadicado: Yup.string().required("ID radicado es requerido."),
        observation: Yup.string()
          .required("La observación CUPS es requerida.")
          .min(1, "La observación debe tener al menos 1 carácter.")
          .max(500, "La observación no debe exceder los 500 caracteres."),
        funtionalUnit: Yup.string().required(
          "La unidad funcional es requerida."
        ),
        status: Yup.string().required("El estado CUPS es requerido."),
        quantity: Yup.number().required("La quantity es requerida."),
      })
    ),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      id: serviceId,
      justificacion: "",
      cupsDetails: cups.map((cups) => ({
        code: cups.code,
        description: cups.description,
        id: cups.id,
        idRadicado: cups.idRadicado,
        observation: "",
        funtionalUnit: "",
        status: "",
        quantity: cups.quantity,
        serviceId: cups.serviceId,
      })),
    },
    validationSchema,
    onSubmit: async (values) => {
      await authorizeService(values, serviceId, () => {
        toast.success("Servicio autorizado correctamente");
        formik.resetForm();
        setIsOpen(false);
      });
    },
  });

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="action"
        icon={<BookCheck className="w-3 h-3" />}
      />

      {errorUnit || statusError ? (
        <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
          {errorUnit || statusError}
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Autorizar Servicio"
          onSubmit={formik.handleSubmit}
          isSubmitting={isLoading}
          isValid={formik.isValid}
          submitText="Autorizar"
          size="full"
        >
          <div className="flex flex-col gap-6 p-4">
            <div className="w-full space-y-3">
              <Select
              options={[
                { value: "Contratado PFGP", label: "Contratado PFGP" },
                { value: "Otro", label: "Otro" },
              ]}
                id="justificacion"
                name="justificacion"
                label="Justificación:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.justificacion}
                error={formik.errors.justificacion}
                touched={formik.touched.justificacion}
                required
              />
              <AnimatePresence>
                {authorizeError && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {authorizeError}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
              {formik.values.cupsDetails.map((detalle, index) => (
                <div
                  key={index}
                  className="flex flex-col border-l-4 border-blue-500 bg-gray-100 border rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-blue-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase rounded bg-blue-600 text-white shrink-0">
                        CUPS
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {detalle.code}
                      </span>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400" htmlFor={`cupsDetails[${index}].quantity`}>
                        Cantidad:
                      </label>
                      <input
                        id={`cupsDetails[${index}].quantity`}
                        type="number"
                        name={`cupsDetails[${index}].quantity`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cupsDetails[index].quantity}
                        className="w-16 px-2 py-1 text-sm text-center border-2 border-gray-200 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-color2 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <p className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 line-clamp-2" title={detalle.description}>
                    {detalle.description}
                  </p>

                  <div className="flex flex-col gap-3 p-4">
                    <Input
                      id={`cupsDetails[${index}].observation`}
                      type="text"
                      name={`cupsDetails[${index}].observation`}
                      label="Observación CUPS:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].observation}
                      error={
                        formik.touched.cupsDetails?.[index]?.observation &&
                          formik.errors.cupsDetails &&
                          typeof formik.errors.cupsDetails !== "string" &&
                          (formik.errors.cupsDetails as Array<FormikErrors>)[
                            index
                          ]?.observation
                          ? "Requerido, máximo 500 caracteres."
                          : undefined
                      }
                      touched={
                        formik.touched.cupsDetails?.[index]?.observation
                      }
                      placeholder={`Observación para ${detalle.code}`}
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Select
                        id={`cupsDetails[${index}].funtionalUnit`}
                        name={`cupsDetails[${index}].funtionalUnit`}
                        label="Unidad Funcional:"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cupsDetails[index].funtionalUnit}
                        options={units.map((unidad) => ({
                          value: unidad.id,
                          label: unidad.name,
                        }))}
                        error={
                          formik.touched.cupsDetails?.[index]?.funtionalUnit &&
                            formik.errors.cupsDetails &&
                            typeof formik.errors.cupsDetails !== "string" &&
                            (formik.errors.cupsDetails as Array<FormikErrors>)[
                              index
                            ]?.funtionalUnit
                            ? "Requerido."
                            : undefined
                        }
                        touched={
                          formik.touched.cupsDetails?.[index]?.funtionalUnit
                        }
                      />

                      <Select
                        id={`cupsDetails[${index}].status`}
                        name={`cupsDetails[${index}].status`}
                        label="Estado CUPS:"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cupsDetails[index].status}
                        options={status.map((s) => ({
                          value: s.id,
                          label: s.name,
                        }))}
                        error={
                          formik.touched.cupsDetails?.[index]?.status &&
                            formik.errors.cupsDetails &&
                            typeof formik.errors.cupsDetails !== "string" &&
                            (formik.errors.cupsDetails as Array<FormikErrors>)[
                              index
                            ]?.status
                            ? "Requerido."
                            : undefined
                        }
                        touched={formik.touched.cupsDetails?.[index]?.status}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FormModal>
      )}
    </>
  );
};

export default ModalAuthorizedServices;

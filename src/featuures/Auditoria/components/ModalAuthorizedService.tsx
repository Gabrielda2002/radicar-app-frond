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
import Textarea from "@/components/common/Ui/Textarea";

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
    auditora: Yup.string()
      .required("El nombre de la auditora es requerido.")
      .min(3, "El nombre de la auditora debe tener al menos 3 caracteres.")
      .max(100, "El nombre de la auditora no debe exceder los 100 caracteres."),
    fechaAuditoria: Yup.date().required("La fecha de auditoría es requerida."),
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
      auditora: "",
      fechaAuditoria: "",
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
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-[25%_73%] sm:grid-cols-[40%_60%] md:gap-6 p-4"
          >
            <div className="flex flex-col w-full md:w-full space-y-3">
              <Input
                id="auditora"
                type="text"
                name="auditora"
                label="Auditora:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.auditora}
                error={formik.errors.auditora}
                touched={formik.touched.auditora}
                placeholder="Nombre de la auditora"
              />
              <Input
                id="fechaAuditoria"
                type="date"
                name="fechaAuditoria"
                label="Fecha Auditoría:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fechaAuditoria}
                error={formik.errors.fechaAuditoria}
                touched={formik.touched.fechaAuditoria}
              />
              <Input
                id="justificacion"
                type="text"
                name="justificacion"
                label="Justificación:"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.justificacion}
                error={formik.errors.justificacion}
                touched={formik.touched.justificacion}
                placeholder="Justificación"
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

            <div className="grid w-full grid-cols-1 gap-3 mt-5 md:mt-0 md:flex sm:grid-cols-1">
              {/* CUPS Details */}
              {formik.values.cupsDetails.map((detalle, index) => (
                <div
                  key={index}
                  className="w-full p-3 space-y-3 bg-gray-100 border border-gray-700 rounded-md shadow-md dark:bg-gray-900"
                >
                  <Input
                    id={`cupsDetails[${index}].codigoCups`}
                    type="text"
                    label="Código CUPS:"
                    value={detalle.code}
                    readOnly
                    placeholder="Código CUPS"
                  />

                    <Textarea
                      label="Descripción CUPS:"
                      id={`cupsDetails[${index}].descripcionCups`}
                      value={detalle.description} // Muestra la descripción CUPS correspondiente
                      readOnly
                      className="w-full p-1 text-sm bg-transparent border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                      placeholder="Descripción CUPS"
                    />

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
                      placeholder="Observación CUPS"
                    />

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

                    <Input
                      id={`cupsDetails[${index}].quantity`}
                      type="number"
                      name={`cupsDetails[${index}].quantity`}
                      label="Cantidad:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].quantity}
                      error={
                        formik.touched.cupsDetails?.[index]?.quantity &&
                          formik.errors.cupsDetails &&
                          typeof formik.errors.cupsDetails !== "string" &&
                          (formik.errors.cupsDetails as Array<FormikErrors>)[
                            index
                          ]?.quantity
                          ? "Requerido."
                          : undefined
                      }
                      touched={formik.touched.cupsDetails?.[index]?.quantity}
                    />
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

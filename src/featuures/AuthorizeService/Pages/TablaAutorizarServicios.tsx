//*Fuctions and Hooks
import * as Yup from "yup";
import { useState, useMemo } from "react";
import { useFormik } from "formik";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { AnimatePresence } from "framer-motion";
import {
  useFetchEstados,
  useFetchUnidadFuncional,
} from "../../../hooks/useFetchUsers";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";
import {
  CupsDetail,
  FormikErrors,
  FormikValues,
} from "@/models/IFotmikValues";
import { UpdateService } from "../Services/UpdateService";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";

const FormularioAutorizacion = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const loadEstados = true;

  const location = useLocation();
  const memoizedCUPS = useMemo(
    () => location.state.CUPS || [],
    [location.state]
  );
  const memoizedId = useMemo(() => location.state.id || 0, [location.state]);

  const { data, error, loading } = useFetchUnidadFuncional();
  const { dataEstados, errorEstados } = useFetchEstados(loadEstados);

  const validationSchema = Yup.object({
    auditora: Yup.string()
      .required("El nombre de la auditora es requerido.")
      .min(3, "El nombre de la auditora debe tener al menos 3 caracteres.")
      .max(100, "El nombre de la auditora no debe exceder los 100 caracteres."),
    fechaAuditoria: Yup.date().required("La fecha de auditoría es requerida."),
    justificacion: Yup.string()
      .required("La justificación es requerida.")
      .min(3, "La justificación debe tener al menos 3 caracteres.")
      .max(500, "La justificación no debe exceder los 150 caracteres."),
    cupsDetails: Yup.array().of(
      Yup.object().shape({
        idCupsRadicado: Yup.string().required("ID CUPS radicado es requerido."),
        idRadicado: Yup.string().required("ID radicado es requerido."),
        observacionCups: Yup.string()
          .required("La observación CUPS es requerida.")
          .min(1, "La observación debe tener al menos 1 carácter.")
          .max(150, "La observación no debe exceder los 150 caracteres."),
        unidadFuncional: Yup.string().required(
          "La unidad funcional es requerida."
        ),
        estadoCups: Yup.string().required("El estado CUPS es requerido."),
      })
    ),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      id: memoizedId,
      auditora: "",
      fechaAuditoria: "",
      justificacion: "",
      cupsDetails: memoizedCUPS.map((cups: CupsDetail) => ({
        code: cups.code,
        description: cups.description,
        idCupsRadicado: cups.id,
        idRadicado: cups.idRadicado,
        observacionCups: "",
        unidadFuncional: "",
        estadoCups: "",
      })),
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSuccess(false);

      try {
        const response = await UpdateService(values, memoizedId);

        if (response?.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/tabla-auditoria";
          }, 3000);
        } else {
          throw new Error("Error al registrar la autorización.");
        }
      } catch (error) {
        console.log(error);
      }

      setIsSubmitting(false);
    },
  });
  //   console.log("Errors:", formik.errors);
  // console.log("Touched:", formik.touched);

  if (error) return <h2>{error}</h2>;
  if (loading) return <LoadingSpinner duration={500} />;
  if (errorEstados)
    return (
      <h2 className="flex justify-center text-lg dark:text-white">
        {errorEstados}
      </h2>
    );

  return (
    <>
      <ModalSection
        title="Autorización de servicios"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Autorizacion Servicios", path: "" },
        ]}
      />
      <div className="">
        {/* Formulario */}
        <div className="w-full p-6 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
          <h2 className="px-2 mb-6 mr-2 text-xl font-semibold text-stone-600 dark:text-stone-300">
            Crear autorización
          </h2>
          {/* FORM   CONTENT */}
          <form onSubmit={formik.handleSubmit} className="flex gap-10">
            <div className="flex flex-col w-[500px]">
              {/* Auditora */}
              <div className="flex flex-col">
                <label
                  htmlFor="auditora"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Auditora:
                </label>
                <input
                  id="auditora"
                  type="text"
                  name="auditora"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.auditora}
                  className={` w-full p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    formik.touched.auditora && formik.errors.auditora
                      ? "border-red-500 dark:border-red-500"
                      : "dark:border-gray-600 border-gray-200"
                  }`}
                  placeholder="Nombre de la auditora"
                />
                <AnimatePresence>
                  {formik.touched.auditora && formik.errors.auditora && (
                    <ErrorMessage>{formik.errors.auditora}</ErrorMessage>
                  )}
                </AnimatePresence>
              </div>

              {/* Fecha Auditoría */}
              <div className="flex flex-col">
                <label
                  htmlFor="fechaAuditoria"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Fecha Auditoría:
                </label>
                <input
                  onChange={formik.handleChange}
                  id="fechaAuditoria"
                  type="date"
                  onBlur={formik.handleBlur}
                  value={formik.values.fechaAuditoria}
                  name="fechaAuditoria"
                  className={` w-full p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    formik.touched.fechaAuditoria &&
                    formik.errors.fechaAuditoria
                      ? "border-red-500 dark:border-red-500"
                      : "dark:border-gray-600 border-gray-200"
                  }`}
                />
                <AnimatePresence>
                  {formik.touched.fechaAuditoria &&
                    formik.errors.fechaAuditoria && (
                      <ErrorMessage>
                        {formik.errors.fechaAuditoria}
                      </ErrorMessage>
                    )}
                </AnimatePresence>
              </div>
              {/* Justificación Concepto Auditor */}
              <div className="flex flex-col">
                <label
                  htmlFor="justificacion"
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Justificación:
                </label>
                <input
                  id="justificacion"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.justificacion}
                  name="justificacion"
                  placeholder="Justificación"
                  className={`w-full p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    formik.touched.justificacion && formik.errors.justificacion
                      ? "border-red-500 dark:border-red-500"
                      : "dark:border-gray-600 border-gray-200"
                  }`}
                />
                <AnimatePresence>
                  {formik.touched.justificacion &&
                    formik.errors.justificacion && (
                      <ErrorMessage>{formik.errors.justificacion}</ErrorMessage>
                    )}
                </AnimatePresence>
              </div>
              <div className="flex translate-y-48">
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="w-full h-20 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                >
                  {isSubmitting ? "Enviando..." : "Autorizar"}
                </button>
              </div>
            </div>

            <div className="flex w-full grid-cols-1 gap-3">
              {formik.values.cupsDetails.map((detalle, index) => (
                <div
                  key={index}
                  className="w-full p-4 mx-1 mb-4 border rounded-md shadow-md"
                >
                  {/* Código CUPS 1*/}
                  <div className="mb-4">
                    <label
                      htmlFor={`cupsDetails[${index}].codigoCups`}
                      className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                    >
                      Código CUPS:
                    </label>
                    <input
                      id={`cupsDetails[${index}].codigoCups`}
                      type="text"
                      value={detalle.code} // Muestra el código CUPS correspondiente
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Código CUPS"
                    />
                  </div>

                  {/* Descripción CUPS */}
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor={`cupsDetails[${index}].descripcionCups`}
                      className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                    >
                      Descripción CUPS:
                    </label>
                    <textarea
                      id={`cupsDetails[${index}].descripcionCups`}
                      value={detalle.description} // Muestra la descripción CUPS correspondiente
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                      placeholder="Descripción CUPS"
                    />
                  </div>

                  {/* Observación CUPS */}
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor={`cupsDetails[${index}].observacionCups`}
                      className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                    >
                      Observación CUPS:
                    </label>
                    <input
                      id={`cupsDetails[${index}].observacionCups`}
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].observacionCups}
                      name={`cupsDetails[${index}].observacionCups`}
                      className={` w-full p-2 border-2 border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formik.touched.cupsDetails && formik.errors.cupsDetails
                          ? "border-red-500 dark:borde-red-500"
                          : "dark:border-gray-600 border-gray-200"
                      }`}
                      placeholder="Observación CUPS"
                    />
                    <AnimatePresence>
                      {formik.touched.cupsDetails?.[index]?.observacionCups &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.observacionCups && (
                          <ErrorMessage>
                            Requerido, máximo 150 caracteres.
                          </ErrorMessage>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Unidad Funcional */}
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor={`cupsDetails[${index}].unidadFuncional`}
                      className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                    >
                      Unidad Funcional:
                    </label>
                    <select
                      id={`cupsDetails[${index}].unidadFuncional`}
                      name={`cupsDetails[${index}].unidadFuncional`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].unidadFuncional}
                      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Seleccione Unidad Funcional</option>
                      {data.map((unidad) => (
                        <option key={unidad.id} value={unidad.id}>
                          {unidad.name}
                        </option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {formik.touched.cupsDetails?.[index]?.unidadFuncional &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.unidadFuncional && (
                          <ErrorMessage>Requerido.</ErrorMessage>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Estado CUPS 2*/}
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor={`cupsDetails[${index}].estadoCups`}
                      className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                    >
                      Estado CUPS:
                    </label>
                    <select
                      id={`cupsDetails[${index}].estadoCups`}
                      name={`cupsDetails[${index}].estadoCups`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].estadoCups}
                      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Seleccione Estado CUPS</option>
                      {dataEstados.map((estado) => (
                        <option key={estado.id} value={estado.id}>
                          {estado.name}
                        </option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {formik.touched.cupsDetails?.[index]?.estadoCups &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.estadoCups && (
                          <ErrorMessage>Requerido.</ErrorMessage>
                        )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {success && <p className="text-green-500">Autorización exitosa.</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioAutorizacion;

//*Fuctions and Hooks
import * as Yup from "yup";
import { useMemo } from "react";
import { useFormik } from "formik";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";
import { CupsDetail, FormikErrors, FormikValues } from "@/models/IFotmikValues";
import { useFetchFuntionalUnit } from "../Hooks/UseFetchFuntionalUnit";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { useFetchStatus } from "@/hooks/UseFetchStatus";
import { toast } from "react-toastify";
import { useAuthorizeServices } from "../Hooks/useAuthorizeServices";
import { AnimatePresence } from "framer-motion";

const FormularioAutorizacion = () => {
  const {
    authorizeService,
    error: authorizeError,
    isLoading,
  } = useAuthorizeServices();

  const loadEstados = true;

  const location = useLocation();
  const memoizedCUPS = useMemo(
    () => location.state.CUPS || [],
    [location.state]
  );
  const memoizedId = useMemo(() => location.state.id || 0, [location.state]);

  const { data, error, loading } = useFetchFuntionalUnit();
  const { dataEstados, errorEstados } = useFetchStatus(loadEstados);

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
        idCupsRadicado: Yup.string().required("ID CUPS radicado es requerido."),
        idRadicado: Yup.string().required("ID radicado es requerido."),
        observacionCups: Yup.string()
          .required("La observación CUPS es requerida.")
          .min(1, "La observación debe tener al menos 1 carácter.")
          .max(500, "La observación no debe exceder los 500 caracteres."),
        unidadFuncional: Yup.string().required(
          "La unidad funcional es requerida."
        ),
        estadoCups: Yup.string().required("El estado CUPS es requerido."),
        cantidad: Yup.number().required("La cantidad es requerida."),
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
        cantidad: 0,
      })),
    },
    validationSchema,
    onSubmit: async (values) => {
      await authorizeService(values, memoizedId, () => {
        toast.success("Servicio autorizado correctamente");
        formik.resetForm();
        window.location.href = "/tabla-auditoria";
      });
    },
  });

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
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-[25%_73%] sm:grid-cols-[40%_60%] md:gap-6"
          >
            <div className="flex flex-col w-full md:w-full">
              {/* Auditora */}
              <div className="flex flex-col">
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
              </div>

              {/* Fecha Auditoría */}
              <div className="flex flex-col">
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
              </div>
              {/* Justificación Concepto Auditor */}
              <div className="flex flex-col">
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
              </div>
              <div className="hidden translate-x-0 translate-y-4 md:flex md:translate-y-10 md:translate-x-1">
                <Button
                  type="submit"
                  disabled={isLoading || !formik.isValid}
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  isLoading={isLoading}
                >
                  Autorizar
                </Button>
              </div>
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
                  className="w-full p-3 mx-1 mb-4 bg-gray-100 border border-gray-700 rounded-md shadow-md dark:bg-gray-900"
                >
                  {/* Código CUPS 1*/}
                  <div className="mb-4">
                    <Input
                      id={`cupsDetails[${index}].codigoCups`}
                      type="text"
                      label="Código CUPS:"
                      value={detalle.code}
                      readOnly
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
                      className="w-full p-1 text-sm bg-transparent border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                      placeholder="Descripción CUPS"
                    />
                  </div>

                  {/* Observación CUPS */}
                  <div className="flex flex-col mb-6">
                    <Input
                      id={`cupsDetails[${index}].observacionCups`}
                      type="text"
                      name={`cupsDetails[${index}].observacionCups`}
                      label="Observación CUPS:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].observacionCups}
                      error={
                        formik.touched.cupsDetails?.[index]?.observacionCups &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.observacionCups
                          ? "Requerido, máximo 500 caracteres."
                          : undefined
                      }
                      touched={
                        formik.touched.cupsDetails?.[index]?.observacionCups
                      }
                      placeholder="Observación CUPS"
                    />
                  </div>

                  {/* Unidad Funcional */}
                  <div className="flex flex-col mb-4">
                    <Select
                      id={`cupsDetails[${index}].unidadFuncional`}
                      name={`cupsDetails[${index}].unidadFuncional`}
                      label="Unidad Funcional:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].unidadFuncional}
                      options={data.map((unidad) => ({
                        value: unidad.id,
                        label: unidad.name,
                      }))}
                      error={
                        formik.touched.cupsDetails?.[index]?.unidadFuncional &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.unidadFuncional
                          ? "Requerido."
                          : undefined
                      }
                      touched={
                        formik.touched.cupsDetails?.[index]?.unidadFuncional
                      }
                    />
                  </div>

                  {/* Estado CUPS 2*/}
                  <div className="flex flex-col mb-4">
                    <Select
                      id={`cupsDetails[${index}].estadoCups`}
                      name={`cupsDetails[${index}].estadoCups`}
                      label="Estado CUPS:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].estadoCups}
                      options={dataEstados.map((estado) => ({
                        value: estado.id,
                        label: estado.name,
                      }))}
                      error={
                        formik.touched.cupsDetails?.[index]?.estadoCups &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.estadoCups
                          ? "Requerido."
                          : undefined
                      }
                      touched={formik.touched.cupsDetails?.[index]?.estadoCups}
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <Input
                      id={`cupsDetails[${index}].cantidad`}
                      type="number"
                      name={`cupsDetails[${index}].cantidad`}
                      label="Cantidad:"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cupsDetails[index].cantidad}
                      error={
                        formik.touched.cupsDetails?.[index]?.cantidad &&
                        formik.errors.cupsDetails &&
                        typeof formik.errors.cupsDetails !== "string" &&
                        (formik.errors.cupsDetails as Array<FormikErrors>)[
                          index
                        ]?.cantidad
                          ? "Requerido."
                          : undefined
                      }
                      touched={formik.touched.cupsDetails?.[index]?.cantidad}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex translate-x-0 translate-y-1 md:hidden md:translate-y-8 md:translate-x-1">
              <Button
                type="submit"
                disabled={isLoading || !formik.isValid}
                variant="primary"
                size="md"
                fullWidth={true}
                isLoading={isLoading}
                className="h-12 md:h-16"
              >
                {isLoading ? "Enviando..." : "Autorizar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioAutorizacion;

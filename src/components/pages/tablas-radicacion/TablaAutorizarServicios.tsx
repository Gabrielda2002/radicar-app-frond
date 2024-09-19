import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useFetchEstados,
  useFetchUnidadFuncional,
} from "../../../hooks/useFetchUsers";
import LoadingSpinner from "../../LoadingSpinner";
import { useLocation, Link } from "react-router-dom";
import back from "/assets/back.svg";
import { CupsDetail, FormikValues } from "../../../models/IFotmikValues";
import { submitAutorizacionRadicado } from "../../../services/submitAutorizacionRadicado";
import { useState } from "react";

const FormularioAutorizacion = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const location = useLocation();
  const CUPS = location.state.CUPS || [];
  const id = location.state.id || 0;

  const { data, error, loading } = useFetchUnidadFuncional();
  const { dataEstados, errorEstados } = useFetchEstados();

  const validationSchema = Yup.object({
    auditora: Yup.string()
      .required("El nombre de la auditora es requerido.")
      .min(3, "El nombre de la auditora debe tener al menos 3 caracteres.")
      .max(100, "El nombre de la auditora no debe exceder los 100 caracteres."),
    fechaAuditoria: Yup.date().required("La fecha de auditoría es requerida."),
    justificacion: Yup.string()
      .required("La justificación es requerida.")
      .min(3, "La justificación debe tener al menos 3 caracteres.")
      .max(150, "La justificación no debe exceder los 150 caracteres."),
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
      id: id,
      auditora: "",
      fechaAuditoria: "",
      justificacion: "",
      cupsDetails: CUPS.map((cups: CupsDetail) => ({
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
        const response = await submitAutorizacionRadicado(values, id);

        if (response?.status === 200) {
          setSuccess(true);

          window.location.href = "/tabla-auditoria";
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
  if (errorEstados) return <h2>{errorEstados}</h2>;

  return (
    <>
      <section className=" dark:bg-gray-900">
        <LoadingSpinner duration={500} />
        <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
          Autorización
        </h1>
        <nav>
          <ol className="flex mb-2 text-gray-700 dark:text-gray-300">
            <Link to="/inicio">
              <li className="text-slate-400 after:mr-2">Inicio</li>
            </Link>
            <Link to="/tabla-auditoria">
              <li className="text-slate-400 before:content-['/'] before:mr-2 after:mr-2 before:text-slate-400">
                Servicio Auditoría
              </li>
            </Link>
            <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
              Autorización Servicios
            </li>
          </ol>
          <div className="w-10 pb-2">
            <Link to="/inicio">
              <img src={back} alt="Back" />
            </Link>
          </div>
        </nav>
      </section>

      {/* Formulario */}
      <div className="w-full p-6 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
        <h2 className="mb-6 text-xl font-semibold text-stone-600 dark:text-stone-300">
          Crear autorización
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
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
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Nombre de la auditora"
            />
            {formik.touched.auditora && formik.errors.auditora && (
              <p className="text-red-500">{formik.errors.auditora}</p>
            )}
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
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {formik.touched.fechaAuditoria && formik.errors.fechaAuditoria && (
              <p className="text-red-500">{formik.errors.fechaAuditoria}</p>
            )}
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
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {formik.touched.justificacion && formik.errors.justificacion && (
              <p className="text-red-500">{formik.errors.justificacion}</p>
            )}
          </div>

          {formik.values.cupsDetails.map((detalle, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md shadow-md">
              {/* Código CUPS */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor={`cupsDetails[${index}].codigoCups`}
                  className="mb-2 font-medium text-stone-600 dark:text-stone-300"
                >
                  Código CUPS:
                </label>
                <input
                  id={`cupsDetails[${index}].codigoCups`}
                  type="text"
                  value={CUPS[index].code} // Muestra el código CUPS correspondiente
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
                  value={CUPS[index].description} // Muestra la descripción CUPS correspondiente
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                  placeholder="Descripción CUPS"
                />
              </div>

              {/* Observación CUPS */}
              <div className="flex flex-col mb-4">
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
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Observación CUPS"
                />
                {formik.touched.cupsDetails?.[index]?.observacionCups &&
                  formik.errors.cupsDetails?.[index]?.observacionCups && (
                    <p className="text-red-500">
                      {formik.errors.cupsDetails[index].observacionCups}
                    </p>
                  )}
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
                {formik.touched.cupsDetails?.[index]?.unidadFuncional &&
                  formik.errors.cupsDetails?.[index]?.unidadFuncional && (
                    <p className="text-red-500">
                      {formik.errors.cupsDetails[index].unidadFuncional}
                    </p>
                  )}
              </div>

              {/* Estado CUPS */}
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
                {formik.touched.cupsDetails?.[index]?.estadoCups &&
                  formik.errors.cupsDetails?.[index]?.estadoCups && (
                    <p className="text-red-500">
                      {formik.errors.cupsDetails[index].estadoCups}
                    </p>
                  )}
              </div>
            </div>
          ))}

          {success && <p className="text-green-500">Autorización exitosa.</p>}

          <button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Enviando..." : "Autorizar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormularioAutorizacion;

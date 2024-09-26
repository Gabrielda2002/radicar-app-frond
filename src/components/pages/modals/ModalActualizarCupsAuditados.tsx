//*Funciones y Hooks
import React, { useEffect, useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
//*Icons
import editar from "/assets/editar.svg";
import { Cup } from "../../../models/IAuditados";
import { useFetchEstados } from "../../../hooks/useFetchUsers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { sendCupsAuditados } from "../../../services/updateCupsAuditados";

interface ModalActualizarCupsAuditadosProps {
  cup: Cup;
}

const ModalActualizarCupsAuditoria: React.FC<
  ModalActualizarCupsAuditadosProps
> = ({ cup }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [stadopen, setStadopen] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

  // * se agreaga estado para el control de la carga de los estados
  const [loadEstados, setLoadEstados] = useState(false);
  // * el hook espera el loadEstados para cargar los estados, si es true carga los estados
  const { dataEstados, errorEstados } = useFetchEstados(loadEstados);


  // * se agrega un efecto para cargar los estados cuando stadopen sea true, es decir cuando el modal se abra
  useEffect(() => {
    if (stadopen) {
      setLoadEstados(true);
    }
  }, [stadopen]);

  

  const validationSchema = Yup.object({
    estado: Yup.string().required("El estado es requerido."),
    observacion: Yup.string()
      .min(10, "La observación debe tener al menos 10 caracteres.")
      .max(200, "La observación no debe exceder los 200 caracteres.")
      .required("La observación es requerida."),
  });

  // hook de formik
  const formik = useFormik({
    initialValues: {
      estado: "",
      observacion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmiting(true);

      const formData = new FormData();
      formData.append("observation", values.observacion);
      formData.append("status", values.estado);

      try {
        const response = await sendCupsAuditados(cup.id, formData);

        if (response && response.status === 200) {
          setSuccess(true);
          setTimeout(() => {
            setStadopen(false);
            window.location.reload();
          }, 2000);
        } else {
          setError("Error al actualizar el CUPS");
        }
      } catch (error) {
        setError(`Ocurrio un error al actualizar el CUPS: ${error}`);
      }
      setIsSubmiting(false);
    },
  });

  if (errorEstados) return <h2>Error Al cargar Estados {errorEstados}</h2>;

  return (
    <>
      <button className="" onClick={() => setStadopen(true)}>
        <img className="dark:invert" src={editar} alt="icon-editar" />
      </button>

      {/* init-event-modal */}
      {stadopen && (
        <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm" >
          <section className="">
            <div
              className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg container-modal bg dark:bg-gray-800 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between px-2 py-2 ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200">
                  Actualizar CUPS Auditados
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* init-form */}
              <form
                onSubmit={formik.handleSubmit}
                className="max-h-[70Vh] overflow-y-auto dark:bg-gray-800"
              >
                <div className="p-8">
                  {cup && (
                    <section
                      className="grid grid-cols-3 gap-x-16"
                      key={cup.code}
                    >
                      <div>
                        <label htmlFor="">
                          <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200">
                            Codigo CUPS
                          </span>
                          <input
                            name=""
                            value={cup.code}
                            className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200">
                            Descripción CUPS
                          </span>
                          <textarea
                            id=""
                            name=""
                            value={cup.description}
                            className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          ></textarea>
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="flex mb-2 font-bold text-gray-700  after:content-['*'] after:text-red-600 after:ml-2 dark:text-gray-200 ">
                            Estado CUP
                          </span>
                          <select
                            id=""
                            name="estado"
                            value={formik.values.estado}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          >
                            <option value="">- SELECT -</option>
                            {dataEstados?.map((estado) => (
                              <option key={estado.id} value={estado.id}>
                                {estado.name}
                              </option>
                            ))}
                          </select>
                          {formik.touched.estado && formik.errors.estado && (
                            <label className="text-red-500">
                              {formik.errors.estado}
                            </label>
                          )}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="">
                          <span className="flex mb-2 font-bold text-gray-700  after:content-['*'] after:text-red-600 after:ml-2 dark:text-gray-200">
                            Observación hecha anteriormente
                          </span>
                          <textarea
                            id=""
                            name="observacion"
                            value={formik.values.observacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 px-3 border border-gray-200 rounded dark-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                          ></textarea>
                          {formik.touched.observacion && formik.errors.observacion && (
                            <label className="text-red-500">
                              {formik.errors.observacion}
                            </label>
                          )}
                        </label>
                      </div>
                    </section>
                  )}
                </div>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                  <button
                    className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setStadopen(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                  >
                    {isSubmiting ? "Enviando..." : "Actualizar"}
                  </button>
                </div>
                {success && (
                  <div className="mb-4 text-green-500">
                    CUPS actualizado correctamente!
                  </div>
                )}
                {error && <div className="mb-4 text-red-500">{error}</div>}
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalActualizarCupsAuditoria;

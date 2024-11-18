//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
//*Icons
import onOff from "/assets/on-off.svg";
import { useFormik } from "formik";
import { updateCupsData } from "../../../services/updateCupsData";

interface ModalUpdateCupsDiagnosticoProps {
  id: number;
  modulo: string;
}

const ModalUpdateCupsDiagnostico: React.FC<ModalUpdateCupsDiagnosticoProps> = ({ id, modulo }) => {
  const [stadopen, setStadopen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );

  const getValidationSchema = (Modulo: string) => {
    const validationSchema = {
      nombreCups: Yup.string().required("El nombre del cups es requerido")
        .min(1, "El nombre del cups debe tener al menos 1 caracter")
        .max(150, "El nombre del cups debe tener máximo 150 caracteres")
    };

    if (Modulo === "cups") {
      return {
        ...validationSchema,
        estado: Yup.string().required("El estado del cups es requerido"),
      };
    }
    return validationSchema;
  };

  const formik = useFormik({
    initialValues: {
      id: id,
      estado: "",
      nombreCups: "",
    },
    validationSchema: Yup.object(getValidationSchema(modulo)),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        if (values.nombreCups) {
          formData.append("name", values.nombreCups);
        }
        if (values.estado) {
          formData.append("status", values.estado);
        }

        const response = await updateCupsData(
          formData,
          id,
          modulo === "cups"
            ? "servicio-solicitado-update-table"
            : "diagnosticos"
        );

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setStadopen(false);
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setError(
          `Error al modificar ${modulo} ${error}`
        );
        setSuccess(false);
      }
    },
  });

  return (
    <>
      <button className=" focus:outline-none" onClick={() => setStadopen(true)}>
        <img className="dark:invert " src={onOff} alt="" />
      </button>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center  pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={` w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-800 ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Modificar {modulo === "cups" ? "CUPS" : "Diagnóstico"}
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 hover:bg-gray-300 dark:hover:text-gray-900 hover:text-gray-900 w-7 h-7"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form
                onSubmit={formik.handleSubmit}
                className=" max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="p-4">
                  <section className="grid grid-cols-3 p-6">
                    <div className="flex">
                      <label htmlFor="" className="p-x-2">
                        <span className="flex mb-2 text-base font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          ID {modulo === "cups" ? "Cups" : "Diagnóstico"}:
                        </span>
                        <input
                          type="text"
                          id=""
                          name="id"
                          value={formik.values.id}
                          className="w-[200px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700 cursor-not-allowed"
                          disabled
                        />
                        {formik.touched.id && formik.errors.id ? (
                          <label className="text-red-500">
                            {formik.errors.id}
                          </label>
                        ) : null}
                      </label>
                    </div>
                    {modulo === "cups" && (
                      <div className="flex">
                        <label htmlFor="">
                          <span className="flex text-base mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                            Estado:
                          </span>
                          <select
                            id=""
                            name="estado"
                            value={formik.values.estado}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                          >
                            <option value="">- SELECT -</option>
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                          </select>
                          {formik.touched.estado && formik.errors.estado ? (
                            <label className="text-red-500">
                              {formik.errors.estado}
                            </label>
                          ) : null}
                        </label>
                      </div>
                    )}
                    <div className="">
                      <label htmlFor="">
                        <span className="flex text-base mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          Descripción {modulo === "cups" ? "Cups" : "Diagnóstico"}:
                        </span>
                        <input
                          type="text"
                          id=""
                          name="nombreCups"
                          value={formik.values.nombreCups}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-[250px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {formik.touched.nombreCups &&
                        formik.errors.nombreCups ? (
                          <label className="text-red-500">
                            {formik.errors.nombreCups}
                          </label>
                        ) : null}
                      </label>
                    </div>
                  </section>
                </div>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-300 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-500 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    onClick={() => setStadopen(false)}
                  >
                    Cerrar
                  </button>
                  <button className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                    Actualizar
                  </button>

                  {success && (
                    <div className="text-green-500 dark:text-green-300">
                      Actualizado correctamente.
                    </div>
                  )}
                  {error && (
                    <div className="text-red-500 dark:text-red-300">
                      {error}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalUpdateCupsDiagnostico;

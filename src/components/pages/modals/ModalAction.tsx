  //*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
//*Icons
import onOff from "/assets/on-off.svg";
import { useFormik } from "formik";
import { updateStatus } from "../../../services/updateStatus";

interface ModalActionProps {
  id: number;
  name: string;
  endPoint: string;
}

const ModalAction: React.FC<ModalActionProps> = ({ id, name, endPoint }) => {
  const [stadopen, setStadopen] = useState(false);
  const { showAnimation, closing } = useAnimation(
    stadopen,
    () => setStadopen(false),
    300
  );
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const validationSchema = Yup.object({
    id: Yup.number().required("El ID es requerido"),
    status: Yup.string().optional(),
    name: Yup.string()
      .optional()
      .min(2, "El nombre debe tener al menos 3 caracteres")
      .max(200, "El nombre debe tener como máximo 200 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      id: id,
      status: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const formData = new FormData();

        if (values.name) {
          formData.append("name", values.name);
        } else if (values.status) {
          formData.append("status", values.status);
        }
        const response = await updateStatus(values.id, formData, endPoint);

        if (response && response.status === 200) {
          setSuccess(true);
          setSubmitting(false);
          setTimeout(() => {
            window.location.reload();
            setStadopen(false);
            setSuccess(false);
          }, 2000);
        }
      } catch (error) {
        setError(`Error al actualizar el estado ${name}, ${error}`);
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      <button className="focus:outline-none" onClick={() => setStadopen(true)}>
        <img className="dark:invert " src={onOff} alt="Configuraciones" />
      </button>

      {/* init event modal */}
      {stadopen && (
        <section
          className={`fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section className="">
            <div
              className={`w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg dark:bg-gray-800 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              {/* container-header */}
              <div className="flex items-center justify-between px-4 py-2 ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200">
                  Módulos
                </h1>
                <button
                  onClick={() => setStadopen(false)}
                  className="w-6 text-2xl duration-300 rounded text-gray-3 00 hover:text-gray-700 hover:bg-gray-300"
                >
                  &times;
                </button>
              </div>

              {/* init form */}
              <form
                onSubmit={formik.handleSubmit}
                className="px-4 py-2 max-h-[70Vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
              >
                <div className="p-4 ">
                  <section className="grid grid-cols-3">
                    <div className="flex">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          ID {name}
                        </span>
                        <input
                          type="text"
                          id=""
                          name="id"
                          value={formik.values.id}
                          readOnly
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
                    <div className="flex">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                          Estado
                        </span>
                        <select
                          id=""
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-[200px] p-2 px-3 py-2 border border-gray-200 rounded text-stone-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                        >
                          <option value="">- SELECT -</option>
                          <option value={1}>Activo</option>
                          <option value={0}>Inactivo</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                          <label className="text-red-500">
                            {formik.errors.status}
                          </label>
                        ) : null}
                      </label>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        <span className="flex mb-2 font-bold text-gray-700 dark:text-gray-200 after:content-['*'] after:ml-2 after:text-red-600">
                          Cambiar Nombre
                        </span>
                        <input
                          type="text"
                          id=""
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-[250px] p-2 px-3 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <label className="text-red-500">
                            {formik.errors.name}
                          </label>
                        ) : null}
                      </label>
                    </div>
                  </section>
                </div>

                {/* container-footer */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                  <button
                    className="w-20 h-10 text-blue-400 duration-200 rounded-md hover:text-red-600 hover:bg-red-200 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    onClick={() => setStadopen(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-24 h-10 text-white duration-200 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Actualizando..." : "Actualizando"}
                  </button>
                  {success && (
                    <div className="text-green-500">
                      Estado actualizado con éxito
                    </div>
                  )}
                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </form>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default ModalAction;

import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const HelpDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showAnimation, closing } = useAnimation(isModalOpen, () =>
    setIsModalOpen(false)
  );

  useBlockScroll(isModalOpen);

  const schemaValidation = Yup.object({
    title: Yup.string().required("El titulo es requerido"),
    description: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(500, "La descripcion debe tener maximo 100 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schemaValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color"
      >
        Mesa de Ayuda
      </button>

      {/* Modal */}
      {isModalOpen && (
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section
            className={`w-full max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
              isModalOpen && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
              <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                Pausas Activas
              </h1>
              <button
                onClick={() => setIsModalOpen(false)}
                // disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-4 space-y-3">
              <h3 className="text-4xl font-bold text-color dark:text-gray-200">
                Formulario de Mesa de Ayuda
              </h3>
              <p className="text-xs text-black dark:text-gray-200">
                {" "}
                por favor rellene los siguientes campos con su respectiva
                informacion para solicitar ayuda relacionada con el area de
                sistemas.
              </p>
              <div>
                <form action="">
                  <div>
                    <div>
                      <label 
                        htmlFor="title"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                      >
                        Titulo:
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.title && formik.errors.title
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                        placeholder="Titulo de la solicitud"
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-400">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label 
                        htmlFor="description"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                        >
                        Descripcion:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                        placeholder="Descripcion de la solicitud"
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div className="text-red-400">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-gray-100 border-t-2 border-black dark:border-white h-14 dark:bg-gray-600">
                    <button
                      type="button"
                      className="w-20 h-10 text-blue-400 duration-300 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cerrar
                    </button>
                    <button
                      type="submit"
                      className="w-20 h-10 text-white duration-300 border-2 border-gray-400 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600 dark:hover:border-gray-900"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default HelpDesk;

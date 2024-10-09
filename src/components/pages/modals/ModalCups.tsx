//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createCups } from "../../../services/createCups";

const ModalCups = () => {
  const [stadopen, setStadopen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

  const toggleModal = () => {
    setStadopen(!stadopen);
  };
  // Se agrega useEffect para controlar la animación de la ventana emergente

  const validationSchema = Yup.object({
    code: Yup.number().required("El código es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("name", values.description);

        const response = await createCups(formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setStadopen(false);
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setSuccess(false);
        setError(`Ocurrió un error al intentar guardar el cups ${error}`);
      }
    },
  });

  return (
    <>
      <button
        className="border-2 w-[120px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900 "
        onClick={() => setStadopen(true)}
      >
        Agregar Cups
      </button>

      {stadopen && (
        <div
          className={`fixed z-50 flex  justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section>
            <div
              className="fixed inset-0 transition-opacity duration-300 bg-black opacity-50 backdrop-blur-sm "
              onClick={toggleModal}
            ></div>

            {/* Contenido del formulario */}

            <div
              className={`z-10 w-[800px]  bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
                showAnimation && !closing ? "translate-y-0" : "translate-y-10"
              }`}
            >
              <div className="flex items-center justify-between  px-2 py-2 dark:bg-gray-800 ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200 ">
                  Agregar CUPS
                </h1>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* formulario con dos columnas */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-10 mb-4 p-4">
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Código
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese código..."
                      className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {
                          formik.touched.code && formik.errors.code ? (
                            <label className="text-red-500">
                              {formik.errors.code}
                            </label>
                          ) : null
                        }
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Descripción
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción"
                      className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {
                          formik.touched.description && formik.errors.description ? (
                            <label className="text-red-500">
                              {formik.errors.description}
                            </label>
                          ) : null
                        }
                  </div>
                </div>

                {/* Botones */}

                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                  <button
                    onClick={toggleModal}
                    className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                   >
                    Subir
                  </button>
                  {success && (
                    <div className="text-green-500 dark:text-green-300">
                      CUPS creado correctamente.
                    </div>
                  )}
                  {error && (
                    <div className="text-red-500 dark:text-red-300">{error}</div>
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalCups;

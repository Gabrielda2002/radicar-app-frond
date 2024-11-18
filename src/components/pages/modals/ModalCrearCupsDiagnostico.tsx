//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState, useCallback } from "react";
import useAnimation from "../../../hooks/useAnimations";
import { createCups } from "../../../services/createCups";

interface ModalCrearCupsDiagnosticoProps{
  modulo: string; 
}

const ModalCrearCupsDiagnostico: React.FC<ModalCrearCupsDiagnosticoProps> = ({
  modulo
}) => {
  const [stadopen, setStadopen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const { showAnimation, closing } = useAnimation(stadopen, () =>
    setStadopen(false)
  );

  const toggleModal = useCallback(() => {
    setStadopen((prev) => !prev);
  }, []);


  const getValidationSchema = (Modulo: string) => {
    const validationSchema = {
      description: Yup.string().required("El nombre del cups es requerido")
        .min(1, "El nombre del cups debe tener al menos 1 caracter")
        .max(150, "El nombre del cups debe tener máximo 150 caracteres")
    };

    if (Modulo === "diagnostico") {
      return {
        ...validationSchema,
        code: Yup.string().required("El estado del cups es requerido")
         .matches(/^[a-zA-Z]{1,2}(\d{1,3}[a-zA-Z]?|[a-zA-Z]{1})$/, "El código debe tener 1 o 2 letras seguidas de 1 a 3 dígitos y opcionalmente una letra")
      };
    }else{
      return{
        ...validationSchema,
        code: Yup.string().required("El estado del cups es requerido")
          .min(1, "El código debe tener al menos 1 caracter")
          .max(10, "El código debe tener máximo 10 caracteres")
      }
    }

    return validationSchema;
  };


  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
    },
    validationSchema: Yup.object(getValidationSchema(modulo)),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("code", values.code);
        formData.append("name", values.description);

        const response = await createCups(formData , modulo == "cups" ? "servicio-solicitado" : "diagnosticos");

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
        setError(`Ocurrió un error al intentar guardar el ${modulo} ${error}`);
      }
    },
  });

  return (
    <>
      <button
        className="border-2 w-[120px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900 "
        onClick={() => setStadopen(true)}
      >
        Agregar {modulo === "cups" ? "CUPS" : "Diagnóstico"}
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
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h1 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  Agregar {modulo === "cups" ? "CUPS" : "Diagnóstico"}
                </h1>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* formulario con dos columnas */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-10 p-4 mb-4">
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Código:
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese código..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.code && formik.errors.code
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    {formik.touched.code && formik.errors.code ? (
                      <label className="text-red-500">
                        {formik.errors.code}
                      </label>
                    ) : null}
                  </div>
                  <div>
                    <label className="block mb-2 text-lg font-bold text-gray-700 dark:text-gray-200">
                      Descripción:
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Descripción..."
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.description && formik.errors.description
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <label className="text-red-500">
                        {formik.errors.description}
                      </label>
                    ) : null}
                  </div>
                </div>

                {/* Botones */}

                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-300 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    onClick={toggleModal}
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-500 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600"
                    type="submit"
                  >
                    Subir
                  </button>
                  {success && (
                    <div className="text-green-500 dark:text-green-300">
                      {modulo == "cups" ? "CUPS": "Diagnostico"} creado correctamente.
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
        </div>
      )}
    </>
  );
};

export default ModalCrearCupsDiagnostico;

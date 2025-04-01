//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import useAnimation from "@/hooks/useAnimations";
import { createDataTableRadicacion } from "./Services/CreateDataTableRadicacion";
import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ModalTipoServicioProps {
  name: string;
  endPoint: string;
}

const ModalAgregarDato: React.FC<ModalTipoServicioProps> = ({
  name,
  endPoint,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const { showAnimation, closing } = useAnimation(isOpen, () =>
    setIsOpen(false)
  );
  useBlockScroll(isOpen);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const response = await createDataTableRadicacion(values.name, endPoint);

        if (
          (response && response.status === 200) ||
          (response && response.status === 201)
        ) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setIsOpen(false);
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setError(`Error al crear el dato ${name}: ${error}`);
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      <button
        onClick={toggleModal}
        className="border-2 w-[200px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900 "
      >
        {`Agregar ${name}`}
      </button>
      {isOpen && (
        <div className="fixed z-50 flex justify-center pt-16 transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <section>
            <div
              onClick={toggleModal}
              className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
            ></div>

            {/* Contenido del Formulario */}

            <div
              className={`z-10 w-[440px] md:w-[900px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
                <h2 className="text-2xl font-semibold text-color dark:text-gray-200 ">
                  {`Agregar ${name}`}
                </h2>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>

              {/* Contenido del Formulario */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-10 mb-4">
                  <div className="p-4">
                    <label className="block mb-2 text-lg font-bold text-gray-7000 dark:text-gray-200">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={`Nombre del ${name}`}
                      className={` w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    />
                    <AnimatePresence>
                      {formik.touched.name && formik.errors.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Botones */}

                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-200 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
                  <button
                    onClick={toggleModal}
                    className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button
                    className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    {submitting ? "Enviando..." : `Agregar`}
                  </button>
                  {success && (
                    <div className="text-green-500">
                      Dato agregado correctamente
                    </div>
                  )}

                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalAgregarDato;

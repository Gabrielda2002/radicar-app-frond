//*Funciones y Hooks
import React, { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createDataTableRadicacion } from "../../../services/createDataTableRadicacion";

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

        if (response && response.status === 200 || response && response.status === 201) {
          
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
        className="border-2 w-[200px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-emerald-900 active:bg-emerald-800"
      >
        {`Agregar ${name}`}
      </button>
      {isOpen && (
        <div className="fixed z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            onClick={toggleModal}
            className="fixed inset-0 transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
          ></div>

          {/* Contenido del Formulario */}

          <div
            className={`z-10 w-[900px] p-10 bg-white rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800  ${
              showAnimation && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-lg font-semibold text-color">
                {`Agregar ${name}`}
              </h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Contenido del Formulario */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-10 mb-10">
                <div>
                  <label className="block mb-2 font-bold text-gray-7000 dark:text-gray-200">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={`Nombre del ${name}`}
                    className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>

              {/* Botones */}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg round hover:bg-gray-600"
                >
                  Cerrar
                </button>
                <button 
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  {submitting ? "Enviando..." : `Agregar`}
                </button>
                {success && (
                  <div className="text-green-500">Dato agregado correctamente</div>
                )}

                {error && <div className="text-red-500">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAgregarDato;

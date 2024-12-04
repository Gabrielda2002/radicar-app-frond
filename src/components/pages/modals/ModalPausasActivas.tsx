// * Functions and hooks
import { useState } from "react";
import * as Yup from "yup";
import useAnimation from "../../../hooks/useAnimations";
import VideoFile from "../../../imgs/Pink Floyd – Time (Official Audio) (1).mp4";
import { useFormik } from "formik";
import { CreateActiveBreakes } from "../../../services/createActiveBreakes";
const ModalPausasActivas = () => {
  // * Constants
  const [isModalPausasOpen, setIsModalPausasOpen] = useState(false);
  const { showAnimation, closing } = useAnimation(isModalPausasOpen, () =>
    setIsModalPausasOpen(false)
  );

  const [success , setSuccess] = useState<boolean>(false)
  const [error , setError] = useState<string>("")
  const [loading , setLoading] = useState<boolean>(false)
  
  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    observacion: Yup.string().optional()
      .min(2, "La observación debe tener al menos 2 caracteres")
      .max(200, "La observación debe tener como máximo 100 caracteres")
  })

  const formik = useFormik({
    initialValues: {
      observacion: ''
    },
    validationSchema,
    onSubmit: async values => {

      try {

        setLoading(true)

        const formData = new FormData()

        formData.append('observation', values.observacion)
        formData.append("userId", idUsuario)

        const response = await CreateActiveBreakes(formData)

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true)
          setError("")
          setTimeout(() => {
            setIsModalPausasOpen(false)
            window.location.reload()
          }, 2000)
        }else{
          setError("SUcedio un error al subir la observación")
        }

      } catch (error) {
        setError(`Error inesperado ${error}`)
      }

      setLoading(false)
    }
  })

  // * Se crea logica para evitar el desplazamiento del scroll dentro del modal
  // * Se implementa eventos del DOM para distribucion en demas propiedades anteiormente establecidas
  const openModal = () => {
    document.body.style.overflow = "hidden";
  }
  const closeModal = () => {
    document.body.style.overflow = "";
    setIsModalPausasOpen(false);
  }
  if (isModalPausasOpen) {
    openModal();
  }

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        type="button"
        onClick={() => setIsModalPausasOpen(true)}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color"
      >
        Pausas Activas
      </button>

      {/* Modal */}
      {isModalPausasOpen && (
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center pt-12 pb-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section
            className={`w-full max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-600 ${
              isModalPausasOpen && !closing
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
                onClick={closeModal}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6">
              {/* Video */}
              <div className="w-full h-1/2 aspect-video">
                <video
                  controls
                  className="w-full h-full rounded-md"
                  preload="metadata"
                >
                  <source src={VideoFile} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </video>
              </div>

              {/* Caja de comentarios */}
            <form onSubmit={formik.handleSubmit}>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                  Comentarios
                </h3>
                <div className="p-2 overflow-y-auto border rounded-lg dark:border-gray-700 dark:bg-gray-900 max-h-48">
                  <textarea
                    name="observacion"
                    onChange={formik.handleChange}
                    value={formik.values.observacion}
                    onBlur={formik.handleBlur}
                    className="w-full h-16 p-2 border rounded-lg resize-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Escribe tu comentario aquí..."
                  ></textarea>
                  {formik.touched.observacion && formik.errors.observacion ? (
                    <div className="text-red-500">{formik.errors.observacion}</div>
                  ) : null}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
                  >
                    Enviar
                  </button>
                  
                  {success && <div className="text-green-500">Observación enviada correctamente</div>}
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

export default ModalPausasActivas;

// * Functions and hooks
import { useRef, useState } from "react";
import * as Yup from "yup";
import useAnimation from "@/hooks/useAnimations";
import VideoFile from "@/../public/videos/Pausas-activas-prueba.mp4";
import { useFormik } from "formik";
import { CreateActiveBreakes } from "../services/CreateActiveBreakes";

const ModalPausasActivas = () => {
  // * Constants
  const [isModalPausasOpen, setIsModalPausasOpen] = useState(false);

  // * estado para controlar si el video fue completado
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPaused(false);
    } else {
      videoRef.current?.pause();
      setIsPaused(true);
    }
  };

  const { showAnimation, closing } = useAnimation(isModalPausasOpen, () => {
    // Solo permitir cerrar si el video está completo y el formulario enviado
    if (videoCompleted && success) {
      setIsModalPausasOpen(false);
    }
  });

  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    observacion: Yup.string()
      .optional()
      .min(2, "La observación debe tener al menos 2 caracteres")
      .max(200, "La observación debe tener como máximo 100 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      observacion: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append("observation", values.observacion);
        formData.append("userId", idUsuario);

        const response = await CreateActiveBreakes(formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setIsModalPausasOpen(false);
            window.location.reload();
          }, 2000);
        } else {
          setError("SUcedio un error al subir la observación");
          setSuccess(false);
        }
      } catch (error) {
        setError(`Error inesperado ${error}`);
        setSuccess(false);
      }

      setLoading(false);
    },
  });

  // * Se crea logica para evitar el desplazamiento del scroll dentro del modal
  // * Se implementa eventos del DOM para distribucion en demas propiedades anteiormente establecidas
  const openModal = () => {
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    document.body.style.overflow = "";
    setIsModalPausasOpen(false);
  };
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
          className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
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
                disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-4 space-y-3">
              {/* Video */}
              <div className="relative w-full h-full overflow-hidden bg-black rounded-lg shadow-lg aspect-[38/16]">
                <video
                  src={VideoFile}
                  ref={videoRef}
                  onEnded={handleVideoEnd}
                  controls={false}
                  // autoPlay
                  className="w-full h-full"
                />
                <button
                  onClick={handlePlayPause}
                  className="absolute p-3 transition-all duration-200 transform -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-white/80 hover:bg-white dark:bg-gray-100/90 dark:hover:bg-gray-300/90"
                >
                  {isPaused ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  )}
                </button>

                {/* Indicador de progreso (opcional) */}
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all bg-blue-500"
                  style={{
                    width: `${
                      ((videoRef.current?.currentTime || 0) /
                        (videoRef.current?.duration || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>

              {/* Caja de comentarios */}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2 bg-gray-800/20">
                  <p className="p-2 text-sm text-gray-800 border-l-4 border-yellow-300 rounded-lg dark:text-gray-200 dark:border-yellow-500">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-300 rounded-full">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01M12 5.5a7.5 7.5 0 11-7.5 7.5 7.5 7.5 0 017.5-7.5z"
                        ></path>
                      </svg>
                      Advertencia
                    </span>
                    Para que sea registrada la pausa activa se debe ver el video
                    completo, la ventana se cerrará automáticamente una vez
                    terminado el video. Los botones de accion estaran bloqueados
                    durante la reproduccion de la pausa activa.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                    Comentario de la pausa activa:
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
                      <div className="text-red-500">
                        {formik.errors.observacion}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={!videoCompleted || loading}
                    className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
                  >
                    {loading ? "Enviando..." : "Registrar pausa activa"}
                  </button>

                  {success && (
                    <div className="text-green-500">
                      Observación enviada correctamente
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

export default ModalPausasActivas;

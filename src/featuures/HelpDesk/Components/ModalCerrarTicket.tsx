import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { UpdateStatusTicketEp } from "../Services/UpdateStatusTicketEp";
import { Bounce, toast } from "react-toastify";

interface CerrarModalProps {
  IdTicket: number;
  onTicketClosed: () => void;
}

const CerrarModal: React.FC<CerrarModalProps> = ({ IdTicket, onTicketClosed  }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAnimation, closing } = useAnimation(showModal, () =>
    setShowModal(false)
  );

  const user = localStorage.getItem("user");
  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    observation: Yup.string().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      observation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append("ticketId", IdTicket.toString());
        formData.append("usuarioId", idUsuario )
        formData.append("coment", values.observation);

        const reponse = await UpdateStatusTicketEp(formData);

        if (reponse.status === 200 || reponse.status === 201) {

          toast.success("Ticket creado exitosamente.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          onTicketClosed();
          setShowModal(false);
          formik.resetForm();
        }

      } catch (errors) {
        setError(`Error al cerrar el ticket ${errors}`);
      }finally{
        setLoading(false);
      }
    },
  });

  useBlockScroll(showModal);
  return (
    <>
      <button
        type="button"
        className="text-xl font-extrabold text-gray-500 transition-colors duration-200 hover:text-red-600 focus:outline-none"
        onClick={() => setShowModal(true)}
        title="Cerrar Ticket"
      >
        X
      </button>
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center  transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-[90%] p-4 max-w-2xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
              showModal && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Cerrar Ticket #{IdTicket}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl font-extrabold text-gray-500 transition-colors duration-200 hover:text-red-600 focus:outline-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="observation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Observación (Motivo de cierre)
                </label>
                <textarea
                  id="observation"
                  name="observation"
                  value={formik.values.observation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={4}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Escriba el motivo por el cual está cerrando este ticket..."
                ></textarea>
                {formik.touched.observation && formik.errors.observation ? (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.observation}
                  </div>
                ) : null}
              </div>

              {error && (
                <div className="p-2 mb-4 text-sm text-red-600 bg-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  disabled={!formik.isValid || loading}
                >
                  Cerrar Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CerrarModal;

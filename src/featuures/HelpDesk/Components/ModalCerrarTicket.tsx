import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { UpdateStatusTicketEp } from "../Services/UpdateStatusTicketEp";
import { Bounce, toast } from "react-toastify";
import { useTickets } from "@/context/ticketContext";

interface CerrarModalProps {
  IdTicket: number;
  onTicketClosed: () => void;
}

const CerrarModal: React.FC<CerrarModalProps> = ({
  IdTicket,
  onTicketClosed,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { validateUserTicketStatus } = useTickets();

  const { showAnimation, closing } = useAnimation(showModal, () =>
    setShowModal(false)
  );

  const user = localStorage.getItem("user");
  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    observation: Yup.string().required("Este campo es obligatorio"),
    status: Yup.string().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      observation: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append("ticketId", IdTicket.toString());
        formData.append("usuarioId", idUsuario);
      formData.append("coment", values.observation);
        formData.append("status", values.status);

        const reponse = await UpdateStatusTicketEp(formData);

        if (reponse.status === 200 || reponse.status === 201) {
          toast.success("Estado actualizado exitosamente.", {
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

          await validateUserTicketStatus(idUsuario);
          onTicketClosed();
          setShowModal(false);
          formik.resetForm();
        }
      } catch (errors) {
        setError(`Error al cerrar el ticket ${errors}`);
      } finally {
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
        title="Cambiar estado"
      >
        O
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
                  className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                >
                  Estado
                </label>

                <select
                  name="status"
                  id="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                    formik.touched.status && formik.errors.status
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <option value="">Seleccione</option>
                  <option value="2">Cerrado</option>
                  <option value="3">Pendiente</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="mt-1 text-sm text-red-600">
                    {formik.errors.status}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="observation"
                  className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
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
                  className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                    formik.touched.observation && formik.errors.observation
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
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
                  className={`px-4 py-2 text-sm font-medium text-white ${ formik.values.status == '2' ? 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' : "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700" }  rounded-lg`}
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

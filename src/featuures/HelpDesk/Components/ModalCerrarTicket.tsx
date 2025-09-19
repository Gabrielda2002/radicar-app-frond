import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { UpdateStatusTicketEp } from "../Services/UpdateStatusTicketEp";
import { Bounce, toast } from "react-toastify";
import { useTickets } from "@/context/ticketContext";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import { AnimatePresence } from "framer-motion";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import { ITickets } from "@/models/ITickets";
import { FormatDate } from "@/utils/FormatDate";

interface CerrarModalProps {
  ticket: ITickets;
  onTicketClosed: () => void;
}

const CerrarModal: React.FC<CerrarModalProps> = ({
  ticket,
  onTicketClosed,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useBlockScroll(showModal);

  const { validateUserTicketStatus } = useTickets();

  const user = localStorage.getItem("user");
  const idUsuario = user ? JSON.parse(user).id : "";

  const validationSchema = Yup.object({
    observation: Yup.string().required("Este campo es obligatorio"),
    status: Yup.string().required("Este campo es obligatorio"),
    remote: Yup.boolean().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      observation: "",
      status: "",
      remote: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("ticketId", ticket.id.toString());
        formData.append("usuarioId", idUsuario);
        formData.append("coment", values.observation);
        formData.append("status", values.status);
        formData.append("remote", values.remote.toString());

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
      }
    },
  });

  // UI helpers
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Cerrado":
        return "text-red-500";
      case "Abierto":
        return "text-green-500";
      case "Pendiente":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "Baja":
        return "text-yellow-400";
      case "Media":
        return "text-orange-400";
      case "Alta":
        return "text-red-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowModal(true)}
        title="Cambiar estado"
      >
        O
      </Button>

      <FormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Cambiar Estado Ticket"
        onSubmit={formik.handleSubmit}
        submitText={`${formik.values.status == "2" ? "Cerrar" : "En Espera"} Ticket`}
        isSubmitting={formik.isSubmitting}
        isValid={formik.isValid}
        size="lg"
      >
        <div className="px-5 py-6 space-y-6">
          {/* Detalles del Ticket */}
          <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 shadow-sm">
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Ticket #{ticket.id}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Detalles del caso y contexto</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white/70 dark:bg-gray-900/40 ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white/70 dark:bg-gray-900/40 ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Título</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.title}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Categoría</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.category}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Descripción</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.description}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Solicitante</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.nameRequester} {ticket.lastNameRequester}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Celular</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.phone}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Sede</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.headquarter}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Municipio</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{ticket.municipio}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Creación</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{FormatDate(ticket.createdAt)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400/90">Última modificación</div>
                <div className="text-sm text-gray-800 dark:text-gray-100">{FormatDate(ticket.updatedAt)}</div>
              </div>
            </div>
          </section>

          {/* Formulario de actualización */}
          <div className="mb-4">
            <Select
              label="Estado"
              options={[
                { value: "2", label: "Cerrado" },
                { value: "3", label: "Pendiente" },
              ]}
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.status && formik.touched.status ? formik.errors.status : undefined}
              touched={formik.touched.status}
              required
            />
          </div>

          <div className="mb-4">
            <Input
              variant="checkbox"
              label="¿El ticket fue cerrado de forma remota?"
              type="checkbox"
              id="remote"
              name="remote"
              checked={formik.values.remote}
              onChange={(e) => formik.setFieldValue("remote", e.target.checked)}
              error={formik.errors.remote && formik.touched.remote ? formik.errors.remote : undefined}
              touched={formik.touched.remote}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Observación (Motivo de cierre)"
              id="observation"
              name="observation"
              value={formik.values.observation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Escriba el motivo por el cual está cerrando este ticket..."
              error={formik.errors.observation && formik.touched.observation ? formik.errors.observation : undefined}
              touched={formik.touched.observation}
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default CerrarModal;

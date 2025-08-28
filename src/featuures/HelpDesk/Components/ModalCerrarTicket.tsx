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

interface CerrarModalProps {
  IdTicket: number;
  onTicketClosed: () => void;
}

const CerrarModal: React.FC<CerrarModalProps> = ({
  IdTicket,
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

        formData.append("ticketId", IdTicket.toString());
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
        submitText={`${
          formik.values.status == "2" ? "Cerrar" : "En Espera"
        } Ticket`}
        isSubmitting={formik.isSubmitting}
        isValid={formik.isValid}
        size="md"
      >
        <div className="px-5 py-6">
          <div className="mb-4">
            <Select
              label="Estado"
              options={[
                { value: "2", label: "Cerrado"},
                { value: "3", label: "Pendiente"}
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

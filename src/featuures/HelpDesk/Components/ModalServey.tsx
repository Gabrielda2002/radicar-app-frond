import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import StarRating from "./StarRating";
import { useServey } from "../Hooks/useServey";
import { Star } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import { useNotification } from "@/context/notificationContext";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import { AnimatePresence } from "framer-motion";
import Textarea from "@/components/common/Ui/Textarea";
import Input from "@/components/common/Ui/Input";

interface ModalServeyProps {
  idTicket: number;
}

const ModalServey: React.FC<ModalServeyProps> = ({ idTicket }) => {
  const [showModal, setShowModal] = useState(false);

  const { error, loading, createServey } = useServey();
  const { refreshNotifications } = useNotification();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = user.id;

  const schemaValidation = Yup.object({
    scoring: Yup.number().required("Este campo es obligatorio"),
    timeAnswer: Yup.number().required("Este campo es obligatorio"),
    consciousness: Yup.number().required("Este campo es obligatorio"),
    kindness: Yup.number().required("Este campo es obligatorio"),
    solution: Yup.boolean().required("Este campo es obligatorio"),
    comment: Yup.string().required("Este campo es obligatorio").max(500, "El comentario no puede exceder los 500 caracteres"),
    recommendation: Yup.boolean().required("Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      scoring: 0,
      timeAnswer: 0,
      consciousness: 0,
      kindness: 0,
      solution: false,
      comment: "",
      recommendation: false,
    },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("ticketId", idTicket.toString());
        formData.append("usuarioId", userId.toString());
        formData.append("calificacionGeneral", values.scoring.toString());
        formData.append("tiempoRespuesta", values.timeAnswer.toString());
        formData.append("conocimientoTecnico", values.consciousness.toString());
        formData.append("amabilidadSoporte", values.kindness.toString());
        formData.append("solucionEfectiva", values.solution.toString());
        formData.append("comentario", values.comment);
        formData.append(
          "recomendariaServicio",
          values.recommendation.toString()
        );

        const result = await createServey(formData);
        if (result) {
          toast.success("Encuesta enviada exitosamente.", {
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
          await refreshNotifications();
          setShowModal(false);
        }
      } catch (error) {
        console.log("Error al enviar la encuesta ", error);
      }
    },
  });

  const handleStarChange = (name: string, value: number) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, false);
  };

  return (
    <>
      <Button
        variant="any"
        type="button"
        onClick={() => setShowModal(true)}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
        title="Encuesta Satisfacción"
      >
        <Star className="w-4 h-4" />
      </Button>

      <FormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Encuesta de Satisfacción"
        onSubmit={formik.handleSubmit}
        submitText="Enviar"
        isSubmitting={loading}
      >
        <div className="flex items-center gap-4 p-4 space-y-4">
          <div>
            <p className="my-4 text-sm text-gray-500 dark:text-gray-500">
              Agradecemos diligenciar esta encuesta para calificar él
              soporte prestado por sistemas. Califique marcando él número
              de estrellas de acuerdo a su experiencia entendiendo que 0
              estrellas es “Malo” y 5 “Excelente”.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <StarRating
                name="scoring"
                rating={formik.values.scoring}
                onChange={handleStarChange}
                error={formik.errors.scoring}
                touched={formik.touched.scoring}
                label="Puntuación general"
              />

              <StarRating
                name="timeAnswer"
                rating={formik.values.timeAnswer}
                onChange={handleStarChange}
                error={formik.errors.timeAnswer}
                touched={formik.touched.timeAnswer}
                label="Tiempo de respuesta"
              />

              <StarRating
                name="consciousness"
                rating={formik.values.consciousness}
                onChange={handleStarChange}
                error={formik.errors.consciousness}
                touched={formik.touched.consciousness}
                label="Conocimiento del personal"
              />

              <StarRating
                name="kindness"
                rating={formik.values.kindness}
                onChange={handleStarChange}
                error={formik.errors.kindness}
                touched={formik.touched.kindness}
                label="Amabilidad"
              />
              <Input
                id="solution"
                name="solution"
                label="¿Se solucionó su problema?"
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.solution ? formik.errors.solution : undefined}
                touched={formik.touched.solution}
                className="w-5 h-5"
              />
              <Input
                id="recommendation"
                name="recommendation"
                label="¿Recomendaría nuestro servicio?"
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.recommendation ? formik.errors.recommendation : undefined}
                touched={formik.touched.recommendation}
                className="w-5 h-5"
              />
            </div>
            <Textarea
              id="comment"
              name="comment"
              label="Comentarios adicionales"
              placeholder="Escriba sus comentarios aquí..."
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comment ? formik.errors.comment : undefined}
              touched={formik.touched.comment}
              showCharCount
              maxLength={500}
            />
          </div>

          <AnimatePresence>
            {error && (
              <div>
                <div className="p-2 text-base text-white bg-red-500 rounded-lg shadow-lg">
                  {error} error
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalServey;

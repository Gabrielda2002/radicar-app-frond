import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import StarRating from "./StarRating";
import { useServey } from "../Hooks/useServey";
import { Star } from 'lucide-react'

interface ModalServeyProps {
  idTicket: number;
}

const ModalServey: React.FC<ModalServeyProps> = ({ idTicket }) => {
  const [showModal, setShowModal] = useState(false);

  const { error, success, loading, createServey, validate, isValidate } =
    useServey();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = user.id;

  const { showAnimation, closing } = useAnimation(showModal, () =>
    setShowModal(false)
  );

  useBlockScroll(showModal);

  const schemaValidation = Yup.object({
    scoring: Yup.number().required("Este campo es obligatorio"),
    timeAnswer: Yup.number().required("Este campo es obligatorio"),
    consciousness: Yup.number().required("Este campo es obligatorio"),
    kindness: Yup.number().required("Este campo es obligatorio"),
    solution: Yup.boolean().required("Este campo es obligatorio"),
    comment: Yup.string().required("Este campo es obligatorio"),
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
          await validate(formData);
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

  useEffect(() => {
    if (showModal) {
      const chekValidation = async () => {
        const formData = new FormData();
        formData.append("ticketId", idTicket.toString());
        formData.append("usuarioId", userId.toString());
        await validate(formData);
      };

      chekValidation();
    }
  }, [showModal, userId, validate]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center hover:opacity-80 transition-opacity"
        title="Encuesta de satisfacción"
      >
        <Star className="w-4 h4" />
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
                Encuesta Satisfaccion ticket #{idTicket}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl font-extrabold text-gray-500 transition-colors duration-200 hover:text-red-600 focus:outline-none"
              >
                &times;
              </button>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                {isValidate ? (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Ya se ha enviado una encuesta para este ticket
                  </p>
                ) : (
                  <div>
                    <p className="my-4 text-sm text-gray-700 dark:text-gray-300">
                      Agradecemos diligenciar esta encuesta para calificar él
                      soporte prestado por sistemas. Califique marcando él
                      número de estrellas de acuerdo a su experiencia
                      entendiendo que 0 estrellas es “Malo” y 5 “Excelente”.
                    </p>

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

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Solucion Efectiva
                      </label>
                      <input
                        type="checkbox"
                        name="solution"
                        checked={formik.values.solution}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-5 h-5 text-blue-500 border border-gray-300 rounded-md focus:ring-blue-500"
                      />
                      {formik.touched.solution && formik.errors.solution && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formik.errors.solution}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Recomendaria el servicio
                      </label>
                      <input
                        type="checkbox"
                        name="recommendation"
                        checked={formik.values.recommendation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-5 h-5 text-blue-500 border border-gray-300 rounded-md focus:ring-blue-500"
                      />
                      {formik.touched.recommendation &&
                        formik.errors.recommendation && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {formik.errors.recommendation}
                          </p>
                        )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Comentarios adicionales
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        placeholder="Escriba sus comentarios aquí..."
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.comment && formik.errors.comment && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formik.errors.comment}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Encuesta enviada correctamente
                  </p>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                  {!isValidate && (
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                      disabled={!formik.isValid || loading}
                    >
                      {loading ? "Enviando..." : "Enviar"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalServey;

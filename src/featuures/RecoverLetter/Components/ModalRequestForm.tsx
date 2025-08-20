import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { CreateRequestLetter } from "../Services/CreateRequestLetter";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";

interface ModalRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  idRadicado: number;
  isRequested?: boolean;
}

const ModalRequestForm: FC<ModalRequestFormProps> = ({
  isOpen,
  onClose,
  idRadicado,
  isRequested,
}) => {
  // estados formulario
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(false);


  const validationSchema = Yup.object({
    justify: Yup.string().required("La justificación es requerida"),
  });

  const user = localStorage.getItem("user");
  const idUsuario = user ? JSON.parse(user).id : "";

  const formik = useFormik({
    initialValues: {
      justify: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("justification", values.justify);
        formData.append("idRadicado", idRadicado.toString());
        formData.append("idUserRequest", idUsuario);

        const response = await CreateRequestLetter(formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          formik.resetForm();
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        } else {
          setError("Error al enviar la solicitud");
        }
      } catch (error) {
        setError("Error al enviar la solicitud" + error);
      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        title="Enviar Solicitud"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        isValid={formik.isValid}
        submitText="Solicitar"
        size="md"
      >
        <div>
          {isRequested ? (
            <div className="p-2 text-sm text-center text-red-500">
              Ya has solicitado la carta de radicado.
            </div>
          ) : (
            <div className="px-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h5 className="p-2 mt-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                  Datos para hacer la solicitud
                </h5>
              </div>

              <section className="grid-cols-1 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
                <div>
                  <Input
                    label="Justificación"
                    id="justify"
                    name="justify"
                    onChange={formik.handleChange}
                    value={formik.values.justify}
                    onBlur={formik.handleBlur}
                    placeholder="Escriba"
                    error={
                      formik.touched.justify && formik.errors.justify
                        ? formik.errors.justify
                        : undefined
                    }
                    touched={formik.touched.justify}
                    required
                  />
                </div>
              </section>
              {success && (
                <div className="text-green-500">Solicitud enviada</div>
              )}

              {error && <div className="text-red-500">{error}</div>}
            </div>
          )}
        </div>
      </FormModal>
    </>
  );
};
export default ModalRequestForm;

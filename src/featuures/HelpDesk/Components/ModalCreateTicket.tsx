import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";
// Lazy data hooks to avoid fetching until modal opens
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { MdSupportAgent } from "react-icons/md";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import { AnimatePresence } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Textarea from "@/components/common/Ui/Textarea";
import useTicketsStore from "../Store/useTicketsStore";

interface TicketFormValues {
  type: string;
  title: string;
  description: string;
  categoryId: string;
  file: File | null;
  attachmentType?: string;
}

const HelpDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createTicket, error, isLoading } = useTicketsStore();

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const schemaValidation = Yup.object({
    type: Yup.string().required("El tipo es requerido"),
    title: Yup.string().required("El titulo es requerido"),
    description: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(500, "La descripcion debe tener maximo 100 caracteres"),
    categoryId: Yup.number().required("La categoria es requerida"),
    file: Yup.mixed()
      .nullable()
      .optional()
      .test(
        "fileSize",
        "El archivo es demasiado grande. El tamaño máximo es 5MB.",
        (value: any) => {
          if (value) {
            return value.size <= 5 * 1024 * 1024; // 5MB
          }
          return true;
        }
      ),
    attachmentType: Yup.string().when("file", {
      is: (file: File | null) => file !== null,
      then: (schema) => schema.required("El tipo de archivo es requerido cuando se adjunta un archivo"),
      otherwise: (schema) => schema.notRequired(),
    })
  });

  const handleSubmit = useCallback(
    async (values: TicketFormValues) => {
      await createTicket(values, () => {
        toast.success("Ticket creado exitosamente.");
        formik.resetForm();
        setIsModalOpen(false);
      });
    },
    [idUsuario]
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      categoryId: "",
      file: null,
      attachmentType: "",
      userId: idUsuario,
    },
    validationSchema: schemaValidation,
    onSubmit: handleSubmit,
  });

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    // await Promise.all([fetchCategory()]);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color border-2 border-gray-300 dark:border-gray-600"
        title="Solicitar Soporte"
        variant="any"
        size="xs"
      >
        <MdSupportAgent className="w-6 h-6 md:w-8 md:h-8" />
      </Button>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Formulario de Mesa de Ayuda"
        onSubmit={formik.handleSubmit}
        isSubmitting={isLoading}
        isValid={formik.isValid && formik.dirty}
        submitText="Enviar"
        size="lg"
      >
        <div className="p-4 space-y-4">
          <h3 className="text-4xl font-bold text-color dark:text-gray-200">
            Formulario de Mesa de Ayuda
          </h3>
          <p className="text-xs text-black dark:text-gray-200">
            {" "}
            Por favor rellene los siguientes campos con su respectiva
            informacion para solicitar ayuda relacionada con el area de
            sistemas.
          </p>
          <div>
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  options={[
                    { value: "Solicitud", label: "Solicitud" },
                    { value: "Incidente", label: "Incidente" }
                  ]}
                  label="Tipo"
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="default"
                  error={
                    formik.touched.type && formik.errors.type
                      ? formik.errors.type
                      : undefined
                  }
                  touched={formik.touched.type}
                  required
                />
                <InputAutocompletado
                  label="Categoria"
                  required
                  apiRoute={`categories/${formik.values.type}`}
                  onInputChanged={(value: string) => {
                    formik.setFieldValue("categoryId", value);
                  }}
                  placeholder={
                    !formik.values.type
                      ? "Primero selecciona un tipo"
                      : "Buscar categoría..."
                  }
                  error={
                    formik.touched.categoryId && formik.errors.categoryId
                      ? formik.errors.categoryId
                      : undefined
                  }
                  touched={formik.touched.categoryId}
                  disabled={!formik.values.type}
                />
                <Input
                  label="Titulo"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.title && formik.errors.title
                      ? formik.errors.title
                      : undefined
                  }
                  touched={formik.touched.title}
                  required
                />
                
                <Select
                  label="Tipo de Archivo"
                  options={[
                    { value: "document", label: "Documento" },
                    { value: "screenshot", label: "Imagen" },
                    { value: "Video", label: "Video" },
                    { value: "log", label: "Logs" },
                    { value: "pdf", label: "PDF" },
                    { value: "other", label: "Otro" },
                  ]}
                  id="attachmentType"
                  name="attachmentType"
                  value={formik.values.attachmentType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="default"
                  error={
                    formik.touched.attachmentType && formik.errors.attachmentType
                      ? formik.errors.attachmentType
                      : undefined
                  }
                  touched={formik.touched.attachmentType}
                />
                <Input
                  type="file"
                  label="Adjuntar Archivo"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    const file = event.target.files
                      ? event.target.files[0]
                      : null;
                    formik.setFieldValue("file", file);
                  }}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.file}
                  error={formik.touched.file && formik.errors.file ? formik.errors.file : undefined}
                  icon={<IoDocumentTextOutline className="w-4 h-4" />}
                />

                {/* reemplazar input descripcion por un textarea que se expande dos columnas en md: */}
                <div className="col-span-1 w-full sm:col-span-2">
                  <Textarea
                    label="Descripcion"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    placeholder="Descripcion de la solicitud"
                    required
                    error={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : undefined
                    }
                    touched={formik.touched.description}
                    maxLength={500}
                    showCharCount
                    autoResize
                  />
                </div>


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
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default HelpDesk;

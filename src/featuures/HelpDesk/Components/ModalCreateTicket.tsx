import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";
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
import { DESK_CONFIG } from "../config/ConfigDesk";

type DeskType = keyof typeof DESK_CONFIG;

const DESK_OPTIONS = Object.entries(DESK_CONFIG).map(([value, cfg]) => ({
  value,
  label: cfg.label,
}));

interface TicketFormValues {
  deskType: DeskType | "";
  type: string;
  title: string;
  description: string;
  categoryId: string;
  locationDescription: string;
  file: File | null;
  attachmentType?: string;
  headquartersId: string;
}

const HelpDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createTicket, error, isLoading } = useTicketsStore();

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  const schemaValidation = Yup.object({
    deskType: Yup.string().required("La mesa de ayuda es requerida"),
    type: Yup.string().when("deskType", {
      is: "sistemas",
      then: (schema) => schema.required("El tipo es requerido para la mesa de sistemas"),
      otherwise: (schema) => schema.notRequired(),
    }),
    title: Yup.string().required("El titulo es requerido")
      .min(5, "El titulo debe tener al menos 5 caracteres")
      .max(50, "El titulo debe tener maximo 50 caracteres"),
    description: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(500, "La descripcion debe tener maximo 500 caracteres"),
    categoryId: Yup.number().required("La categoria es requerida"),
    locationDescription: Yup.string().when("deskType", {
      is: "infraestructura",
      then: (schema) => schema.required("La localización es requerida"),
      otherwise: (schema) => schema.notRequired(),
    }),
    headquartersId: Yup.string().when("deskType", {
      is: "infraestructura",
      then: (schema) => schema.required("La sede es requerida"),
      otherwise: (schema) => schema.notRequired(),
    }),

    file: Yup.mixed<File>()
      .nullable()
      .test(
        "fileRequiredWhenAttachmentType",
        "El archivo es requerido cuando se selecciona un tipo de archivo",
        function (value) {
          const attachmentType = (this.parent?.attachmentType ?? "") as string;
          const hasAttachmentType = attachmentType.trim().length > 0;
          if (!hasAttachmentType) return true;
          return value instanceof File;
        }
      )
      .test(
        "fileSize",
        "El archivo es demasiado grande. El tamaño máximo es 5MB.",
        (value) => {
          if (!(value instanceof File)) return true;
          return value.size <= 5 * 1024 * 1024;
        }
      ),
    attachmentType: Yup.string()
      .nullable()
      .test(
        "attachmentTypeRequiredWhenFile",
        "El tipo de archivo es requerido cuando se adjunta un archivo",
        function (value) {
          const file = this.parent?.file as File | null | undefined;
          const hasFile = file instanceof File;
          if (!hasFile) return true;
          return typeof value === "string" && value.trim().length > 0;
        }
      ),
  });

  const handleSubmit = useCallback(
    async (values: TicketFormValues) => {
      const config = DESK_CONFIG[values.deskType as DeskType];
      await createTicket(config.createEndpoint, values, () => {
        toast.success("Ticket creado exitosamente.");
        formik.resetForm();
        setIsModalOpen(false);
      });
    },
    [idUsuario]
  );

  const formik = useFormik({
    initialValues: {
      deskType: "" as DeskType | "",
      title: "",
      type: "",
      description: "",
      categoryId: "",
      locationDescription: "",
      file: null,
      attachmentType: "",
      headquartersId: "",
      userId: idUsuario,
    },
    validationSchema: schemaValidation,
    onSubmit: handleSubmit,
  });

  const activeConfig = formik.values.deskType
    ? DESK_CONFIG[formik.values.deskType as DeskType]
    : null;

  const handleDeskTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    formik.setFieldValue("categoryId", "");
    formik.setFieldValue("type", "");
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
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
            Por favor rellene los siguientes campos con su respectiva
            informacion para solicitar ayuda relacionada con el area seleccionada.
          </p>
          <div>
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-2">
                  <Select
                    options={DESK_OPTIONS}
                    label="Mesa de Ayuda"
                    id="deskType"
                    name="deskType"
                    value={formik.values.deskType}
                    onChange={handleDeskTypeChange}
                    onBlur={formik.handleBlur}
                    variant="default"
                    error={
                      formik.touched.deskType && formik.errors.deskType
                        ? formik.errors.deskType
                        : undefined
                    }
                    touched={formik.touched.deskType}
                    required
                  />
                </div>

                {formik.values.deskType === "sistemas" && (
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
                    disabled={!formik.values.deskType}
                  />
                )}
                <InputAutocompletado
                  label="Categoria"
                  required
                  apiRoute={
                    activeConfig
                      ? activeConfig.categoryRequiresType
                        ? formik.values.type
                          ? `${activeConfig.categoryRoute}/${formik.values.type}`
                          : ""
                        : activeConfig.categoryRoute
                      : ""
                  }
                  onInputChanged={(value: string) => {
                    formik.setFieldValue("categoryId", value);
                  }}
                  placeholder={
                    !formik.values.deskType
                      ? "Primero selecciona una mesa"
                      : activeConfig?.categoryRequiresType && !formik.values.type
                        ? "Primero selecciona un tipo"
                        : "Buscar categoría..."
                  }
                  error={
                    formik.touched.categoryId && formik.errors.categoryId
                      ? formik.errors.categoryId
                      : undefined
                  }
                  touched={formik.touched.categoryId}
                  disabled={
                    !formik.values.deskType ||
                    (!!activeConfig?.categoryRequiresType && !formik.values.type)
                  }
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

                {activeConfig?.showLocation && (
                  <Input
                    label="Localización"
                    id="locationDescription"
                    name="locationDescription"
                    value={formik.values.locationDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ej: Consultorio 3 - Piso 2"
                    error={
                      formik.touched.locationDescription && formik.errors.locationDescription
                        ? formik.errors.locationDescription
                        : undefined
                    }
                    touched={formik.touched.locationDescription}
                    required
                  />
                )}

                <InputAutocompletado
                  label="Lugar Radicación"
                  onInputChanged={(value) =>
                    formik.setFieldValue("headquartersId", value)
                  }
                  apiRoute="lugares-radicacion-name"
                  error={formik.errors.headquartersId}
                  touched={formik.touched.headquartersId}
                  placeholder="Ej: Calle 15"
                  required={true}
                />

                <Select
                  label="Tipo de Archivo"
                  options={[...activeConfig?.attachmentsOptions || []]}
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

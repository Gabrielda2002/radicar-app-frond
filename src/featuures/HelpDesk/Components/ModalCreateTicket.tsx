import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";
import { CreateTicket } from "../Services/CreateTickets";
// Lazy data hooks to avoid fetching until modal opens
import { useLazyFetchCategory } from "../Hooks/useLazyFetchCategory";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useLazyFetchPriority } from "../Hooks/useLazyFetchPriority";
import { Bounce, toast } from "react-toastify";
import { useValidateTicketUser } from "../Hooks/useValidateTicketUser";
import { useTickets } from "@/context/ticketContext.tsx";
import titlesHDOptions from "@/data-dynamic/titlesHDOptions.json";
import { MdSupportAgent } from "react-icons/md";
import FormModal from "@/components/common/Ui/FormModal";
import Button from "@/components/common/Ui/Button";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";

interface TitlesHDOptions {
  Software: string[];
  Hardware: string[];
  Redes: string[];
  Administrativo: string[];
  Infraestructura: string[];
  "Otros Soportes": string[];
  [key: string]: string[];
}

const typedTitlesHDOptions = titlesHDOptions as TitlesHDOptions;

interface TicketFormValues {
  title: string;
  description: string;
  category: string;
  priority: string;
}

const HelpDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refetchTickets } = useTickets();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { dataCategory, fetchCategory } = useLazyFetchCategory();
  const { dataPriority, fetchPriority } = useLazyFetchPriority();

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";

  // validar si el usuario ya tiene un ticket
  const { hasTicket, validatingTicket, revalidate } =
    useValidateTicketUser(idUsuario);

  const schemaValidation = Yup.object({
    title: Yup.string().required("El titulo es requerido"),
    description: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(500, "La descripcion debe tener maximo 100 caracteres"),
    category: Yup.number().required("La categoria es requerida"),
    priority: Yup.number().required("La prioridad es requerida"),
  });

  const handleSubmit = useCallback(
    async (values: TicketFormValues) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("userId", idUsuario);
        formData.append("categoryId", values.category);
        formData.append("priorityId", values.priority);

        const response = await CreateTicket(formData);

        if (response?.status === 201 || response?.status === 200) {
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
          await refetchTickets();
          await revalidate();
          formik.resetForm();
          setIsModalOpen(false);
        } else {
          setError("Error al crear el ticket, por favor intentelo de nuevo.");
        }
      } catch (error) {
        setError(
          "Error al crear el ticket, por favor intentelo de nuevo. " + error
        );
      } finally {
        setLoading(false);
      }
    },
    [idUsuario, revalidate]
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      priority: "",
    },
    validationSchema: schemaValidation,
    onSubmit: handleSubmit,
  });

  const [opcionesTitulo, setOpcionesTitulo] = useState<string[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategoryName(selectedCategory);

    // validar si selectedCategory es igual a algun valor de dataCategory.name y si es igual a ese valor entonces setear el valor de selectedCategory a dataCategory.id
    const category = dataCategory.find((cat) => cat.name === selectedCategory);
    const formatCategory = category ? category.id : "";
    formik.setFieldValue("category", formatCategory);
    setOpcionesTitulo(typedTitlesHDOptions[selectedCategory] || []);
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    await Promise.all([fetchCategory(), fetchPriority()]);
  };

  if (loading || validatingTicket) return <LoadingSpinner />;
  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color"
        title="Solicitar Soporte"
        variant="any"
      >
        <MdSupportAgent className="text-2xl text-gray-700 dark:text-gray-200" />
      </Button>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Formulario de Mesa de Ayuda"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
        isValid={formik.isValid && !hasTicket}
        submitText="Enviar"
        size="md"
      >
        <div className="p-4 space-y-3">
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
              {hasTicket ? (
                <div className="text-red-400">
                  Ya tienes un ticket en proceso, por favor espera a que sea
                  resuelto.
                </div>
              ) : (
                <div>
                  <div>
                    <Select
                      options={Object.keys(typedTitlesHDOptions).map((cat) => ({
                        value: cat,
                        label: cat,
                      }))}
                      label="Categoria"
                      name="category"
                      id="categoria"
                      variant="default"
                      value={selectedCategoryName}
                      onChange={handleCategoryChange}
                      onBlur={formik.handleBlur}
                      required
                      error={
                        formik.touched.category && formik.errors.category
                          ? formik.errors.category
                          : undefined
                      }
                      touched={formik.touched.category}
                    />
                  </div>
                  <div>
                    <Select
                      label="Titulo"
                      options={opcionesTitulo.map((title) => ({
                        value: title,
                        label: title,
                      }))}
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="default"
                      error={
                        formik.touched.title && formik.errors.title
                          ? formik.errors.title
                          : undefined
                      }
                      touched={formik.touched.title}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="Descripcion"
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      placeholder="Descripcion de la solicitud"
                      error={
                        formik.touched.description && formik.errors.description
                          ? formik.errors.description
                          : undefined
                      }
                      touched={formik.touched.description}
                      required
                    />
                  </div>
                  <div>
                    <Select
                      label="Prioridad"
                      options={dataPriority.map((pri) => ({
                        value: pri.id,
                        label: pri.name,
                      }))}
                      name="priority"
                      id="prioridad"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.priority && formik.errors.priority
                          ? formik.errors.priority
                          : undefined
                      }
                      touched={formik.touched.priority}
                      variant="default"
                      required
                    />
                  </div>
                </div>
              )}

              {error && <div className="text-red-400">{error}</div>}
            </div>
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default HelpDesk;

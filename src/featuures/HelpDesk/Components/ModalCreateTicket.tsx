import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";
import { CreateTicket } from "../Services/CreateTickets";
import { useFetchCategory } from "../Hooks/useFetchCategory";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchPriority } from "../Hooks/useFetchPriority";
import { Bounce, toast } from "react-toastify";
import { useValidateTicketUser } from "../Hooks/useValidateTicketUser";
import {useTickets} from "@/context/ticketContext.tsx";
import titlesHDOptions from "@/data-dynamic/titlesHDOptions.json";

interface TitlesHDOptions{
  Software: string[];
  Hardware: string[];
  Redes: string[];
  Administrativo: string[];
  "Otros Soportes": string[];
  [key: string]: string[];
}

const typedTitlesHDOptions =  titlesHDOptions as TitlesHDOptions;

interface TicketFormValues {
  title: string;
  description: string;
  category: string;
  priority: string;
}

const HelpDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {refetchTickets} = useTickets();

  const { showAnimation, closing } = useAnimation(isModalOpen, () =>
    setIsModalOpen(false)
  );


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const { dataCategory } = useFetchCategory(true);
  const { dataPriority } = useFetchPriority(true);

  const user = localStorage.getItem("user");

  const idUsuario = user ? JSON.parse(user).id : "";
  
  // validar si el usuario ya tiene un ticket
  const {hasTicket, validatingTicket, revalidate} = useValidateTicketUser(idUsuario);
    
  useBlockScroll(isModalOpen);

  const schemaValidation = Yup.object({
    title: Yup.string().required("El titulo es requerido"),
    description: Yup.string()
      .required("La descripcion es requerida")
      .min(10, "La descripcion debe tener al menos 10 caracteres")
      .max(500, "La descripcion debe tener maximo 100 caracteres"),
    category: Yup.number().required("La categoria es requerida"),
    priority: Yup.number().required("La prioridad es requerida"),
  });

  const handleSubmit = useCallback(async (values: TicketFormValues) => {
    
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
          await revalidate()
          formik.resetForm();
          setIsModalOpen(false);
      } else {
        setError("Error al crear el ticket, por favor intentelo de nuevo.");
      }
    } catch (error) {
      setError(
        "Error al crear el ticket, por favor intentelo de nuevo. " + error
      );
    }finally{
      setLoading(false);
    }

  }, [idUsuario, revalidate]);

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;

    // validar si selectedCategory es igual a algun valor de dataCategory.name y si es igual a ese valor entonces setear el valor de selectedCategory a dataCategory.id
    const category = dataCategory.find((cat) => cat.name === selectedCategory);
    const formatCategory = category ? category.id : "";
    formik.setFieldValue("category", formatCategory);
    setOpcionesTitulo(typedTitlesHDOptions[selectedCategory] || []);
  };

  if (loading || validatingTicket) return <LoadingSpinner />;
  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="p-2 mr-4 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:bg-teal-600 dark:bg-color"
      >
        Mesa de Ayuda
      </button>

      {/* Modal */}
      {isModalOpen && (
        <section
          className={`fixed inset-0 z-50 flex items-center justify-center pt-10 pb-10 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm ${
            showAnimation && !closing ? "opacity-100" : "opacity-0"
          }`}
        >
          <section
            className={`w-[90%] max-w-2xl 2xl:max-w-5xl overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 ${
              isModalOpen && !closing
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between p-3 bg-gray-200 border-b-2 dark:bg-gray-600 border-b-gray-900 dark:border-b-white">
              <h1 className="text-2xl font-semibold text-color dark:text-gray-200">
                Solicitar Soporte
              </h1>
              <button
                onClick={() => setIsModalOpen(false)}
                // disabled={!videoCompleted || loading || !success}
                className="text-xl text-gray-400 duration-200 rounded-md dark:text-gray-100 w-7 h-7 hover:bg-gray-400 dark:hover:text-gray-900 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Contenido del modal */}
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
                <form onSubmit={formik.handleSubmit}>
                 {hasTicket ? (
                    <div className="text-red-400">
                      Ya tienes un ticket en proceso, por favor espera a que sea
                      resuelto.
                    </div>
                  
                 ): (
                  <div>
                    <div>
                      <label
                        htmlFor="categoria"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                      >
                        Categoria
                      </label>
                      <select
                        name="category"
                        id="categoria"
                        value={formik.values.category}
                        onChange={handleCategoryChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.category && formik.errors.category
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">Seleccione</option>
                        {Object.keys(titlesHDOptions).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                      >
                        Titulo:
                      </label>
                      <select
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.title && formik.errors.title
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">Seleccione un título...</option>
                        {opcionesTitulo.map((opcion) => (
                          <option key={opcion} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </select>
                      {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-400">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                      >
                        Descripcion:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        className={` w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                        placeholder="Descripcion de la solicitud"
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div className="text-red-400">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="prioridad"
                        className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200"
                      >
                        Prioridad
                      </label>
                      <select
                        name="priority"
                        id="prioridad"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border-2 border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800 ${
                          formik.touched.priority && formik.errors.priority
                            ? "border-red-500 dark:border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <option value="">Seleccione</option>
                        {dataPriority.map((pri) => (
                          <option key={pri.id} value={pri.id}>
                            {pri.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                 )}

                  {error && <div className="text-red-400">{error}</div>}

                  <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-medium bg-gray-100 border-t-2 border-black dark:border-white h-14 dark:bg-gray-600">
                    <button
                      type="button"
                      className="w-20 h-10 text-blue-400 duration-300 border-2 border-gray-400 rounded-md hover:border-red-500 hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cerrar
                    </button>
                    {!hasTicket && (
                    <button
                      type="submit"
                      className="w-20 h-10 text-white duration-300 border-2 border-gray-400 rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600 dark:hover:border-gray-900"
                      disabled={!formik.isValid}
                    >
                      Enviar
                    </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default HelpDesk;

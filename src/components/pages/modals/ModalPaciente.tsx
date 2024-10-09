//*Funciones y Hooks
import { useState } from "react";
import useAnimation from "../../../hooks/useAnimations";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createPaciente } from "../../../services/createPaciente";
import { useFetchConvenio, useFetchDocumento, useFetchIpsPrimaria } from "../../../hooks/useFetchUsers";

const ModalPaciente = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  //hook para traer los tipos de documentos
  const {dataDocumento, errorDocumento} = useFetchDocumento();

  // hook para traer los convenios
  const { dataConvenios, errorConvenio } = useFetchConvenio();

  // hook para traer  las ips primarias
  const { dataIpsPrimaria, errorIpsPrimaria } = useFetchIpsPrimaria();

  const validationSchema = Yup.object({
    tipoDocumento: Yup.string().required("El tipo de documento es obligatorio"),
    correo: Yup.string().required("El correo es obligatorio"),
    identificacion: Yup.string()
      .required("La identificación es obligatoria")
      .min(5, "La identificación debe tener al menos 5 caracteres")
      .max(11, "La identificación debe tener como máximo 15 caracteres"),
    telefonoFijo: Yup.string()
      .required("El teléfono fijo es obligatorio")
      .min(1, "El teléfono fijo debe tener al menos 1 caracter")
      .max(20, "El teléfono fijo debe tener como máximo 20 caracteres"),
    nombreCompleto: Yup.string()
      .required("El nombre completo es obligatorio")
      .min(3, "El nombre completo debe tener al menos 3 caracteres")
      .max(100, "El nombre completo debe tener como máximo 100 caracteres"),
    convenio: Yup.string().required("El convenio es obligatorio"),
    numeroCelular: Yup.string()
      .required("El número de celular es obligatorio")
      .min(1, "El número de celular debe tener al menos 1 caracter")
      .max(15, "El número de celular debe tener como máximo 15 caracteres"),
    ipsPrimaria: Yup.string().required("La IPS primaria es obligatoria"),
    direccion: Yup.string().required("La dirección es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      correo: "",
      identificacion: "",
      telefonoFijo: "",
      nombreCompleto: "",
      convenio: "",
      numeroCelular: "",
      ipsPrimaria: "",
      direccion: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const formData = new FormData();
        formData.append("documentType", values.tipoDocumento);
        formData.append("email", values.correo);
        formData.append("documentNumber", values.identificacion);
        formData.append("landline", values.telefonoFijo);
        formData.append("name", values.nombreCompleto);
        formData.append("convenio", values.convenio);
        formData.append("phoneNumber", values.numeroCelular);
        formData.append("ipsPrimaria", values.ipsPrimaria);
        formData.append("address", values.direccion);

        const response = await createPaciente(formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setError("");
          setTimeout(() => {
            setIsOpen(false);
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setSuccess(false);
        setError(`Ocurrió un error al intentar guardar el cups ${error}`);
      }
    },
  });

  console.log(formik.errors);
  

  const { showAnimation, closing } = useAnimation(
    isOpen,
    () => setIsOpen(false),
    300
  );
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if(errorDocumento) return <p>Error al cargar los tipos de documentos</p>
  if(errorConvenio) return <p>Error al cargar los convenios</p>
  if(errorIpsPrimaria) return <p>Error al cargar las ips primarias</p>

  return (
    <>
      <button
        className={`border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white  hover:bg-teal-800  active:bg-teal-900  ${
          showAnimation && !closing ? "opacity-100" : "opacity-100"
        }`}
        onClick={toggleModal}
      >
        Agregar Paciente
      </button>
      {isOpen && (
        <div className="fixed z-50 flex pt-16 justify-center transition-opacity duration-300 bg-black bg-opacity-40 -inset-5 backdrop-blur-sm">
          <div
            className="fixed inset-0  transition-opacity duration-300 bg-black opacity-40 backdrop-blur-sm"
            onClick={toggleModal}
          ></div>

          {/* Contenido del Formulario */}
          <section>
            <div
              className={`z-10 w-[900px] bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
                showAnimation && !closing
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between  px-2 py-2 dark:bg-gray-800 ">
                <h1 className="text-xl font-semibold text-color dark:text-gray-200 ">
                  Agregar Paciente
                </h1>
                <button
                  onClick={toggleModal}
                  className="text-xl text-gray-500 hover-gray-700 pr-2"
                >
                  &times;
                </button>
              </div>

              {/* Contenido del formulario */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-3 gap-x-10 mb-4 p-4">
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Tipo Documento
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      name="tipoDocumento"
                      value={formik.values.tipoDocumento}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">SELECCIONE</option>
                      {dataDocumento.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.tipoDocumento &&
                    formik.errors.tipoDocumento ? (
                      <label className="text-red-500">
                        {formik.errors.tipoDocumento}
                      </label>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Correo Electrónico
                    </label>
                    <input
                      type="mail"
                      placeholder="Ingresa Correo..."
                      name="correo"
                      value={formik.values.correo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.correo && formik.errors.correo ? (
                      <label className="text-red-500">
                        {formik.errors.correo}
                      </label>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Identificación
                    </label>
                    <input
                      name="identificacion"
                      value={formik.values.identificacion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      placeholder="Ingrese Identificación..."
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.identificacion &&
                    formik.errors.identificacion ? (
                      <label className="text-red-500">
                        {formik.errors.identificacion}
                      </label>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-10 mb-4 p-4">
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Teléfono Fijo
                    </label>
                    <input
                      name="telefonoFijo"
                      value={formik.values.telefonoFijo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      placeholder="Ingrese Teléfono Fijo..."
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.telefonoFijo &&
                    formik.errors.telefonoFijo ? (
                      <label className="text-red-500">
                        {formik.errors.telefonoFijo}
                      </label>
                    ) : null}
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formik.values.nombreCompleto}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Nombre Completo..."
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.nombreCompleto &&
                    formik.errors.nombreCompleto ? (
                      <label className="text-red-500">
                        {formik.errors.nombreCompleto}
                      </label>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-10 mb-4 p-4">
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Convenio
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      name="convenio"
                      value={formik.values.convenio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">SELECCIONE</option>
                      {dataConvenios.map((convenio) => (
                        <option key={convenio.id} value={convenio.id}>
                          {convenio.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.convenio && formik.errors.convenio ? (
                      <label className="text-red-500">
                        {formik.errors.convenio}
                      </label>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Número de Celular
                    </label>
                    <input
                      type="text"
                      name="numeroCelular"
                      value={formik.values.numeroCelular}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Número..."
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.numeroCelular &&
                    formik.errors.numeroCelular ? (
                      <label className="text-red-500">
                        {formik.errors.numeroCelular}
                      </label>
                    ) : null}
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formik.values.direccion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ingrese Direccion..."
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {formik.touched.direccion && formik.errors.direccion ? (
                      <label className="text-red-500">
                        {formik.errors.direccion}
                      </label>
                    ) : null}
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                      IPS Primaria
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      name="ipsPrimaria"
                      value={formik.values.ipsPrimaria}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">SELECCIONE</option>
                      {dataIpsPrimaria.map((ips) => (
                        <option key={ips.id} value={ips.id}>
                          {ips.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.ipsPrimaria && formik.errors.ipsPrimaria ? (
                      <label className="text-red-500">
                        {formik.errors.ipsPrimaria}
                      </label>
                    ) : null}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
                  <button
                    onClick={toggleModal}
                    className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    Cerrar
                  </button>
                  <button className="w-20 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
                    Subir
                  </button>
                  {success && (
                    <span className="text-green-500">Paciente creado con éxito</span>
                  )}
                  {error && (
                    <span className="text-red-500">{error}</span>
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ModalPaciente;

//*Funciones y Hooks
import React, { useState } from "react";
import * as Yup from "yup";
//*Icons
import logo from "/src/imgs/logo.png";
import { useFormik } from "formik";
import { useFetchDocumento, useFetchMunicipio, useFetchRoles } from "../../hooks/useFetchUsers";
import { createUser } from "../../services/createUser";

const RegistrarUsuarios: React.FC = () => {

  const {data, error} = useFetchMunicipio();
  const {dataDocumento, errorDocumento} = useFetchDocumento();
  const {dataRol, errorRol} = useFetchRoles();

  // const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorPage , setErrorPage] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>(false);

  // const toggleAccordion = () => {
  //   setIsAccordionOpen(!isAccordionOpen);
  // };
  

  const validationSchema = Yup.object({
    municipio: Yup.string().required("El municipio es obligatorio"),
    rol: Yup.string().required("El rol es obligatorio"),
    tipoDocumento: Yup.string().required("El tipo de documento es obligatorio"),
    numeroDocumento: Yup.string().required("El número de documento es obligatorio")
      .min(1, "El número de documento no puede ser menor a 1")
      .max(10, "El número de documento no puede ser mayor a 10"),
    nombresCompletos: Yup.string().required("Los nombres completos son obligatorios")
      .min(2, 'Debe tener minimo 2 caracteres')
      .max(150, 'Debe tener máximo 150 caracteres'),
    apellidosCompletos: Yup.string().required("Los apellidos completos son obligatorios")
      .min(2, 'Debe tener minimo 2 caracteres')
      .max(150, 'Debe tener máximo 150 caracteres'),
    correo: Yup.string().email("Correo inválido").required("El correo es obligatorio")
      .email('Correo inválido')
      .min(10, 'Debe tener minimo 5 caracteres')
      .max(150, 'Debe tener máximo 150 caracteres'),
    contraseña: Yup.string().required("La contraseña es obligatoria")
      .min(8, 'Debe tener minimo 8 caracteres')
      .max(150, 'Debe tener máximo 150 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)'),
    date: Yup.date().required("La fecha de nacimiento es obligatoria")
  })

  const formik = useFormik({
    initialValues: {
      municipio: "",
      rol: "",
      tipoDocumento: "",
      numeroDocumento: "",
      nombresCompletos: "",
      apellidosCompletos: "",
      correo: "",
      contraseña: "",
      date: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      const formData = new FormData();
      formData.append("municipio", values.municipio);
      formData.append("rol", values.rol);
      formData.append("dniType", values.tipoDocumento);
      formData.append("dniNumber", values.numeroDocumento);
      formData.append("name", values.nombresCompletos);
      formData.append("lastName", values.apellidosCompletos);
      formData.append("email", values.correo);
      formData.append("password", values.contraseña);
      formData.append("date", values.date);
      
      try {
        
        setSubmitting(true);
        setSuccess(false);

        const response = await createUser(formData);

        if ( response?.status === 200 || response?.status === 201) {
          setSuccess(true);
          setErrorPage(null);
          formik.resetForm();
        }
      } catch (error) {
        setErrorPage(`Ocurrio un error al registrar el usuario: ${error}`);
        
      }

      setSubmitting(false);

    }
  })

  if (error) return <div>Error: {error}</div>;
  if (errorDocumento) return <div>errorDocumento: {errorDocumento}</div>;
  if (errorRol) return <div>errorRol: {errorRol}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="mb-4 text-center">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto"
            style={{ width: "200px" }}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Municipio */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Municipio
              </label>
              <select
                name="municipio"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.municipio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {data.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.name}
                  </option>
                ))}
              </select>
              {
                formik.touched.municipio && formik.errors.municipio ? <div className="text-red-500">{formik.errors.municipio}</div> : null
              }
            </div>

            {/* Rol */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Rol
              </label>
              <select
                name="rol"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.rol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {dataRol.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.name}
                  </option>
                ))}
              </select>
              {
                formik.touched.rol && formik.errors.rol ? <div className="text-red-500">{formik.errors.rol}</div> : null
              }
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Tipo de Documento
              </label>
              <select
                name="tipoDocumento"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.tipoDocumento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {dataDocumento.map((tipoDoc) => (
                  <option key={tipoDoc.id} value={tipoDoc.id}>
                    {tipoDoc.name}
                  </option>
                ))} 
              </select>
              {
                formik.touched.tipoDocumento && formik.errors.tipoDocumento ? <div className="text-red-500">{formik.errors.tipoDocumento}</div> : null
              }
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Fecha nacimiento
              </label>
              <input 
                type="date"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.date && formik.errors.date ? <div className="text-red-500">{formik.errors.date}</div> : null
              }
            </div>


            {/* Número Documento */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Número Documento
              </label>
              <input
                type="text"
                name="numeroDocumento"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.numeroDocumento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.numeroDocumento && formik.errors.numeroDocumento ? <div className="text-red-500">{formik.errors.numeroDocumento}</div> : null
              }
            </div>

            {/* Nombres Completos */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Nombres Completos
              </label>
              <input
                type="text"
                name="nombresCompletos"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.nombresCompletos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.nombresCompletos && formik.errors.nombresCompletos ? <div className="text-red-500">{formik.errors.nombresCompletos}</div> : null
              }
            </div>

            {/* Apellidos Completos */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Apellidos Completos
              </label>
              <input
                type="text"
                name="apellidosCompletos"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.apellidosCompletos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.apellidosCompletos && formik.errors.apellidosCompletos ? <div className="text-red-500">{formik.errors.apellidosCompletos}</div> : null
              }
            </div>

            {/* Correo */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Correo
              </label>
              <input
                type="email"
                name="correo"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.touched.correo && formik.errors.correo ? <div className="text-red-500">{formik.errors.correo}</div> : null
              }
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                name="contraseña"
                className="w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={formik.values.contraseña}
                onChange={formik.handleChange}
              />
              {
                formik.touched.contraseña && formik.errors.contraseña ? <div className="text-red-500">{formik.errors.contraseña}</div> : null
              }
            </div>

            {/* Permisos con Acordeón */}
            {/* <div className="col-span-2">
              <button
                type="button"
                className="flex items-center justify-between w-full text-gray-700 cursor-pointer dark:text-gray-300 focus:outline-none"
                onClick={toggleAccordion}
              >
                <span className="text-lg font-medium">Permisos</span>
                <img
                  src={arrowUp}
                  alt="Toggle"
                  className={`w-5 h-5 transform ${
                    isAccordionOpen ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300`}
                />
              </button>
              {isAccordionOpen && (
                <div className="pl-4 mt-2">
                  {opcionesPermisos.map((permiso) => (
                    <div key={permiso} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={permiso}
                        checked={formValues.permisos.includes(permiso)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 form-checkbox dark:bg-gray-700"
                        id={`permiso-${permiso}`}
                      />
                      <label
                        htmlFor={`permiso-${permiso}`}
                        className="ml-2 text-gray-700 dark:text-gray-300"
                      >
                        {permiso}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
          </div>

          {/* Botón de Envío */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
            >
              {submitting ? "Enviando..." : "Registrar Usuario"}
            </button>
            {
              errorPage && <div className="text-red-500">{errorPage}</div>
            }
            {
              success && <div className="text-green-500">Usuario registrado con éxito</div>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsuarios;

//*Funciones y Hooks
import * as Yup from "yup";
import React, { useMemo } from "react";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { AnimatePresence } from "framer-motion";
import { useCreateUser } from "@/featuures/RegisterUser/Hooks/useCreateUser";
import areas from '@/data-dynamic/areas.json'; 
import {
  useFetchRoles,
} from "@/hooks/UseFetchRoles";
import { useFetchMunicipio } from "@/hooks/UseFetchMunicipio";

//*Icons
import logo from "@/assets/Layout/logo.png";
import { useFormik } from "formik";
import { useFetchDocumento } from "@/hooks/UseFetchDocument";
import { useFetchSede } from "@/hooks/UseFetchSede";

const RegistrarUsuarios: React.FC = () => {
  const isOpen = true;
  const { dataDocumento, errorDocumento } = useFetchDocumento(isOpen);
  const load = true;

  // traer los datos de los roles
  const { dataRol, errorRol } = useFetchRoles(load);
  // traer los datos de los municipios
  const { municipios, errorMunicipios } = useFetchMunicipio(load);

  // hook pora traer las sedes
  const { data } = useFetchSede();

  const { createUser, success, error, loading } = useCreateUser();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        municipio: Yup.string().required("El municipio es obligatorio"),
        rol: Yup.string().required("El rol es obligatorio"),
        tipoDocumento: Yup.string().required(
          "El tipo de documento es obligatorio"
        ),
        numeroDocumento: Yup.string()
          .required("El número de documento es obligatorio")
          .min(1, "El número de documento no puede ser menor a 1")
          .max(10, "El número de documento no puede ser mayor a 10"),
        nombresCompletos: Yup.string()
          .required("Los nombres completos son obligatorios")
          .min(2, "Debe tener minimo 2 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        apellidosCompletos: Yup.string()
          .required("Los apellidos completos son obligatorios")
          .min(2, "Debe tener minimo 2 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        correo: Yup.string()
          .email("Correo inválido")
          .required("El correo es obligatorio")
          .email("Correo inválido")
          .min(10, "Debe tener minimo 5 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        contraseña: Yup.string()
          .required("La contraseña es obligatoria")
          .min(8, "Debe tener minimo 8 caracteres")
          .max(150, "Debe tener máximo 150 caracteres")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)"
          ),
        // date: Yup.date().required("La fecha de nacimiento es obligatoria"),
        area: Yup.string().required("El área es obligatoria"),
        cargo: Yup.string().required("El cargo es obligatorio"),
        sede: Yup.string().required("La sede es obligatoria"),
        celular: Yup.string().required("El celular es obligatorio")
      }),
    []
  );

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
      area: "",
      date: "",
      cargo: "",
      sede: "",
      celular: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();
      formData.append("municipio", values.municipio);
      formData.append("rol", values.rol);
      formData.append("dniType", values.tipoDocumento);
      formData.append("dniNumber", values.numeroDocumento);
      formData.append("name", values.nombresCompletos);
      formData.append("lastName", values.apellidosCompletos);
      formData.append("email", values.correo);
      formData.append("password", values.contraseña);
      // formData.append("date", values.date);
      formData.append("area", values.area);
      formData.append("cargo", values.cargo);
      formData.append("sedeId", values.sede);
      formData.append("phoneNumber", values.celular);

      try {

        const response = await createUser(formData);

        if (response?.status === 200 || response?.status === 201) {
          formik.resetForm();
        }
      } catch (error) {
        console.log('Error inesperado al registrar usuario', error);
      }

    },
  });

  if (errorMunicipios)
    return (
      <div className="flex justify-center text-lg dark:text-white">
        Error: {errorMunicipios}
      </div>
    );
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Tipo de Documento */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Tipo de Documento
              </label>
              <select
                name="tipoDocumento"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.tipoDocumento && formik.errors.tipoDocumento
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
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
              <AnimatePresence>
                {formik.touched.tipoDocumento && formik.errors.tipoDocumento ? (
                  <ErrorMessage>{formik.errors.tipoDocumento}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Número Documento */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Número Documento 
              </label>
              <input
                type="text"
                name="numeroDocumento"
                placeholder="Número de Documento"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.numeroDocumento &&
                  formik.errors.numeroDocumento
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.numeroDocumento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.numeroDocumento &&
                formik.errors.numeroDocumento ? (
                  <ErrorMessage>{formik.errors.numeroDocumento}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
            {/* Area */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Area
              </label>
              <select
               name="area" 
               id="area"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.area && formik.errors.area
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               >
                <option value="">SELECCIONE</option>
                {
                  areas.areas.map((area) => (
                    <option key={area.id} value={area.name}>
                      {area.name}
                    </option>
                  ))
                }
               </select>
              <AnimatePresence>
                {formik.touched.area && formik.errors.area ? (
                  <ErrorMessage>{formik.errors.area}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Cargo */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Cargo
              </label>
              <select
                name="cargo"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.cargo && formik.errors.cargo
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.cargo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {
                  areas.cargos.map((cargo) => (
                    <option key={cargo.id} value={cargo.name}>
                      {cargo.name}
                    </option>
                  ))
                }
              </select>
              <AnimatePresence>
                {formik.touched.cargo && formik.errors.cargo ? (
                  <ErrorMessage>{formik.errors.cargo}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Sede */}
            
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Sede
              </label>
              <select
                name="sede"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.sede && formik.errors.sede
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.sede}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {data?.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.name}
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {formik.touched.sede && formik.errors.sede ? (
                  <ErrorMessage>{formik.errors.sede}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>
              
              {/* Celular */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Celular
              </label>
              <input
                type="text"
                name="celular"
                placeholder="Número de Celular"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.celular && formik.errors.celular
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.celular && formik.errors.celular ? (
                  <ErrorMessage>{formik.errors.celular}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Municipio */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Municipio
              </label>
              <select
                name="municipio"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.municipio && formik.errors.municipio
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.municipio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">SELECCIONE</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.name}
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {formik.touched.municipio && formik.errors.municipio ? (
                  <ErrorMessage>{formik.errors.municipio}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Nombres Completos */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Nombres Completos
              </label>
              <input
                type="text"
                name="nombresCompletos"
                placeholder="Nombres Completos"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.nombresCompletos &&
                  formik.errors.nombresCompletos
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.nombresCompletos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.nombresCompletos &&
                formik.errors.nombresCompletos ? (
                  <ErrorMessage>{formik.errors.nombresCompletos}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Apellidos Completos */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Apellidos Completos
              </label>
              <input
                type="text"
                name="apellidosCompletos"
                placeholder="Apellidos Completos"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.apellidosCompletos &&
                  formik.errors.apellidosCompletos
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.apellidosCompletos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.apellidosCompletos &&
                formik.errors.apellidosCompletos ? (
                  <ErrorMessage>
                    {formik.errors.apellidosCompletos}
                  </ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Rol */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Rol
              </label>
              <select
                name="rol"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.rol && formik.errors.rol
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
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
              <AnimatePresence>
                {formik.touched.rol && formik.errors.rol ? (
                  <ErrorMessage>{formik.errors.rol}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Correo */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Correo
              </label>
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.correo && formik.errors.correo
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.correo && formik.errors.correo ? (
                  <ErrorMessage>{formik.errors.correo}</ErrorMessage>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                className={` w-full px-3 py-2 border-2 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  formik.touched.contraseña && formik.errors.contraseña
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                }`}
                value={formik.values.contraseña}
                onChange={formik.handleChange}
              />
              {formik.touched.contraseña && formik.errors.contraseña ? (
                <div className="text-red-500">{formik.errors.contraseña}</div>
              ) : null}
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={ !formik.isValid || loading}
              className="w-full py-2 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
            >
              {loading ? "Enviando..." : "Registrar Usuario"}
            </button>
            {error && <div className="text-red-500">{error}</div>}
            {success && (
              <div className="text-green-500">Usuario registrado con éxito</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsuarios;

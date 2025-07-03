//*Funciones y Hooks
import * as Yup from "yup";
import React, { useMemo } from "react";
import { useCreateUser } from "@/featuures/RegisterUser/Hooks/useCreateUser";
import areas from '@/data-dynamic/areas.json'; 
import {
  useFetchRoles,
} from "@/hooks/UseFetchRoles";

//*Icons
import logo from "@/assets/Layout/logo.png";
import { useFormik } from "formik";
import { useFetchDocumento } from "@/hooks/UseFetchDocument";
import { useFetchSede } from "@/hooks/UseFetchSede";
import Input from "@/components/common/Ui/Input";
import Select, { SelectOption } from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";

const RegistrarUsuarios: React.FC = () => {
  const isOpen = true;
  const { dataDocumento, errorDocumento } = useFetchDocumento(isOpen);
  const load = true;

  // traer los datos de los roles
  const { dataRol, errorRol } = useFetchRoles(load);
  // hook pora traer las sedes
  const { data } = useFetchSede();

  const { createUser, success, error, loading } = useCreateUser();

  const validationSchema = useMemo(
    () =>
      Yup.object({
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

  console.log(formik.errors)
  
  if (errorDocumento) return <div>errorDocumento: {errorDocumento}</div>;
  if (errorRol) return <div>errorRol: {errorRol}</div>;

  // Adaptar los datos a opciones para Select
  const tipoDocumentoOptions: SelectOption[] = dataDocumento?.map((tipoDoc) => ({
    value: tipoDoc.id,
    label: tipoDoc.name,
  })) || [];

  const areaOptions: SelectOption[] = areas.areas.map((area) => ({
    value: area.name,
    label: area.name,
  }));

  const cargoOptions: SelectOption[] = areas.cargos.map((cargo) => ({
    value: cargo.name,
    label: cargo.name,
  }));

  const sedeOptions: SelectOption[] = data?.map((sede) => ({
    value: sede.id,
    label: sede.name,
  })) || [];

  const rolOptions: SelectOption[] = dataRol?.map((rol) => ({
    value: rol.id,
    label: rol.name,
  })) || [];

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
            <Select
              label="Tipo de Documento"
              name="tipoDocumento"
              options={tipoDocumentoOptions}
              value={formik.values.tipoDocumento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.tipoDocumento}
              touched={formik.touched.tipoDocumento}
              required
            />

            {/* Número Documento */}
            <Input
              label="Número Documento"
              name="numeroDocumento"
              type="text"
              placeholder="Número de Documento"
              value={formik.values.numeroDocumento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.numeroDocumento}
              touched={formik.touched.numeroDocumento}
              required
            />

            {/* Area */}
            <Select
              label="Area"
              name="area"
              options={areaOptions}
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.area}
              touched={formik.touched.area}
              required
            />

            {/* Cargo */}
            <Select
              label="Cargo"
              name="cargo"
              options={cargoOptions}
              value={formik.values.cargo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cargo}
              touched={formik.touched.cargo}
              required
            />

            {/* Sede */}
            <Select
              label="Sede"
              name="sede"
              options={sedeOptions}
              value={formik.values.sede}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.sede}
              touched={formik.touched.sede}
              required
            />

            {/* Celular */}
            <Input
              label="Celular"
              name="celular"
              type="text"
              placeholder="Número de Celular"
              value={formik.values.celular}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.celular}
              touched={formik.touched.celular}
              required
            />

            {/* Nombres Completos */}
            <Input
              label="Nombres Completos"
              name="nombresCompletos"
              type="text"
              placeholder="Nombres Completos"
              value={formik.values.nombresCompletos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.nombresCompletos}
              touched={formik.touched.nombresCompletos}
              required
            />

            {/* Apellidos Completos */}
            <Input
              label="Apellidos Completos"
              name="apellidosCompletos"
              type="text"
              placeholder="Apellidos Completos"
              value={formik.values.apellidosCompletos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.apellidosCompletos}
              touched={formik.touched.apellidosCompletos}
              required
            />

            {/* Rol */}
            <Select
              label="Rol"
              name="rol"
              options={rolOptions}
              value={formik.values.rol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.rol}
              touched={formik.touched.rol}
              required
            />

            {/* Correo */}
            <Input
              label="Correo"
              name="correo"
              type="email"
              placeholder="Correo"
              value={formik.values.correo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.correo}
              touched={formik.touched.correo}
              required
            />

            {/* Contraseña */}
            <Input
              label="Contraseña"
              name="contraseña"
              type="password"
              placeholder="Contraseña"
              value={formik.values.contraseña}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.contraseña}
              touched={formik.touched.contraseña || !!formik.errors.contraseña}
              required
              helpText="Debe tener al menos una mayúscula, una minúscula, un número y un caracter especial (!@#$%^&*)"
            />
          </div>

          {/* Botón de Envío */}
          <div className="mt-6">
            <Button
              type="submit"
              disabled={!formik.isValid || loading}
              className="w-full py-2 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
            >
              {loading ? "Enviando..." : "Registrar Usuario"}
            </Button>
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

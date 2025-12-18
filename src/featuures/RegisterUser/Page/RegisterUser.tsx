//*Funciones y Hooks
import * as Yup from "yup";
import React, { useMemo } from "react";
import { useFetchRoles } from "@/hooks/UseFetchRoles";

//*Icons
import { useFormik } from "formik";
import { useFetchDocumento } from "@/hooks/UseFetchDocument";
import { useFetchSede } from "@/hooks/UseFetchSede";
import Input from "@/components/common/Ui/Input";
import Select, { SelectOption } from "@/components/common/Ui/Select";
import Button from "@/components/common/Ui/Button";
import { useUsersMutations } from "@/featuures/Usuarios/Hooks/useUsersMutations";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { AnimatePresence } from "framer-motion";

const RegistrarUsuarios: React.FC = () => {
  const isOpen = true;
  const { dataDocumento, errorDocumento } = useFetchDocumento(isOpen);
  const load = true;

  // traer los datos de los roles
  const { dataRol, errorRol } = useFetchRoles(load);
  // hook pora traer las sedes
  const { data } = useFetchSede();

  const { create, error, isLoading } = useUsersMutations();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        rol: Yup.string().required("El rol es obligatorio"),
        dniType: Yup.string().required("El tipo de documento es obligatorio"),
        dniNumber: Yup.string()
          .required("El número de documento es obligatorio")
          .min(1, "El número de documento no puede ser menor a 1")
          .max(10, "El número de documento no puede ser mayor a 10"),
        name: Yup.string()
          .required("Los nombres completos son obligatorios")
          .min(2, "Debe tener minimo 2 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        lastName: Yup.string()
          .required("Los apellidos completos son obligatorios")
          .min(2, "Debe tener minimo 2 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        email: Yup.string()
          .email("Correo inválido")
          .required("El email es obligatorio")
          .email("Correo inválido")
          .min(10, "Debe tener minimo 5 caracteres")
          .max(150, "Debe tener máximo 150 caracteres"),
        password: Yup.string()
          .required("La password es obligatoria")
          .min(8, "Debe tener minimo 8 caracteres")
          .max(150, "Debe tener máximo 150 caracteres")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "La password debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)"
          ),
        // date: Yup.date().required("La fecha de nacimiento es obligatoria"),
        headquarters: Yup.string().required("La sede es obligatoria"),
        phoneNumber: Yup.string().required("El celular es obligatorio"),
        position: Yup.string().required("El cargo es obligatorio"),
        contractType: Yup.string().required(
          "El tipo de contrato es obligatorio"
        ),
        dateStartContract: Yup.date().required(
          "La fecha de inicio del contrato es obligatoria"
        ),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      rol: "",
      dniType: "",
      dniNumber: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      date: "",
      headquarters: "",
      phoneNumber: "",
      position: "",
      contractType: "",
      dateStartContract: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await create(values, () => {
          formik.resetForm();
        });
      } catch (error) {
        console.log("Error inesperado al registrar usuario", error);
      }
    },
  });

  if (errorDocumento) return <div>errorDocumento: {errorDocumento}</div>;
  if (errorRol) return <div>errorRol: {errorRol}</div>;

  // Adaptar los datos a opciones para Select
  const tipoDocumentoOptions: SelectOption[] =
    dataDocumento?.map((tipoDoc) => ({
      value: tipoDoc.id,
      label: tipoDoc.name,
    })) || [];

  const sedeOptions: SelectOption[] =
    data?.map((headquarters) => ({
      value: headquarters.id,
      label: headquarters.name,
    })) || [];

  const rolOptions: SelectOption[] =
    dataRol?.map((rol) => ({
      value: rol.id,
      label: rol.name,
    })) || [];

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Tipo de Documento"
              name="dniType"
              options={tipoDocumentoOptions}
              value={formik.values.dniType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dniType}
              touched={formik.touched.dniType}
              required
            />

            <Input
              label="Número Documento"
              name="dniNumber"
              type="text"
              placeholder="Número de Documento"
              value={formik.values.dniNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dniNumber}
              touched={formik.touched.dniNumber}
              required
            />

            <Input
              label="Nombres"
              name="name"
              type="text"
              placeholder="Nombres Completos"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              required
            />

            <Input
              label="Apellidos"
              name="lastName"
              type="text"
              placeholder="Apellidos Completos"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              required
            />

            <Select
              label="Sede"
              name="headquarters"
              options={sedeOptions}
              value={formik.values.headquarters}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.headquarters}
              touched={formik.touched.headquarters}
              required
            />

            <Input
              label="Celular"
              name="phoneNumber"
              type="text"
              placeholder="Número de Celular"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              required
            />

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

            <Input
              label="Fecha de Inicio de Contrato"
              name="dateStartContract"
              type="date"
              value={formik.values.dateStartContract}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dateStartContract}
              touched={formik.touched.dateStartContract}
              required
            />
            <Select
              label="Tipo de Contrato"
              name="contractType"
              value={formik.values.contractType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={[
                { value: "FIJO", label: "Fijo" },
                { value: "INDEFINIDO", label: "Indefinido" },
                { value: "POR OBRA LABOR", label: "Por Obra Labor" },
                {
                  value: "PRESTACION DE SERVICIOS",
                  label: "Prestación de Servicios",
                },
              ]}
              error={formik.errors.contractType}
              touched={formik.touched.contractType}
              required
            />

            <InputAutocompletado
              apiRoute="cargo/name"
              onInputChanged={(id, _name) => {
                formik.setFieldValue("position", id);
              }}
              label="Cargo"
              touched={formik.touched.position}
              error={formik.errors.position}
              placeholder="Ej: Auxiliar de enfermería"
              required={true}
            />

            <Input
              label="Correo"
              name="email"
              type="email"
              placeholder="Correo"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              required
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password || !!formik.errors.password}
              required
              helpText="Debe tener al menos una mayúscula, una minúscula, un número y un caracter especial (!@#$%^&*)"
            />
          </div>

            <Button
              disabled={!formik.isValid || isLoading}
              isLoading={isLoading || formik.isSubmitting}
              variant="primary"
              className="w-full my-6"
            >
              Crear
            </Button>
          <AnimatePresence>
            {error && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};
export default RegistrarUsuarios;

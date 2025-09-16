//*Funciones y Hooks
import React, { useEffect, useState, useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IUsuarios } from "@/models/IUsuarios";

//*Icons
import { MapPinIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useUsers } from "@/featuures/Usuarios/Context/UsersContext.tsx";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useLazyFetchTypeDocument } from "@/hooks/useLazyFetchTypeDocument";
import { useLazyFetchRol } from "@/hooks/useLazyFetchRol";
import { useLazyFetchHeadquarters } from "@/hooks/useLazyFetchHeadquarters";
import { FormatDate } from "@/utils/FormatDate";
import { useUsersMutations } from "../Hooks/useUsersMutations";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";

interface ModalActionUsuarioProps {
  id: number;
  ususario: IUsuarios | null;
}

const ModalActionUsuario: React.FC<ModalActionUsuarioProps> = ({
  id,
  ususario,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refreshUsers } = useUsers();

  //hook para traer los tipos de documentos
  const { dataDocument, errorDocument, fetchDocument } =
    useLazyFetchTypeDocument();

  // hook para traer los roles
  const { rols, errorRol, fetchRols } = useLazyFetchRol();

  // hook para traer las sedes
  const { headquarters, errorHeadquarters, fetchHeadquarters } =
    useLazyFetchHeadquarters();

  const { error, isLoading, update } = useUsersMutations();

  const handleOpenModal = async () => {
    setIsOpen(true);
    Promise.all([fetchDocument(), fetchRols(), fetchHeadquarters()]);
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        dniType: Yup.string().required("El tipo de documento es obligatorio"),
        email: Yup.string()
          .email("Correo invalido")
          .required("El email es obligatorio")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Correo invalido debe terminar con un dominio valido"
          ),
        dniNumber: Yup.string()
          .required("La identificación es obligatoria")
          .min(5, "La identificación debe tener al menos 5 caracteres")
          .max(11, "La identificación debe tener como máximo 15 caracteres"),
        name: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        lastName: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        rol: Yup.string().required("El rol es obligatorio"),
        password: Yup.string()
          .optional()
          .min(8, "Debe tener minimo 8 caracteres")
          .max(150, "Debe tener máximo 150 caracteres")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial (!@#$%^&*)"
          ),
        status: Yup.string().required("El estado es obligatorio"),
        area: Yup.string()
          .required("El área es obligatoria")
          .min(2, "El área debe tener al menos 2 caracteres")
          .max(100, "El área debe tener como máximo 100 caracteres"),
        cargo: Yup.string()
          .required("El cargo es obligatorio")
          .min(2, "El cargo debe tener al menos 2 caracteres")
          .max(200, "El cargo debe tener como máximo 200 caracteres"),
        headquarters: Yup.string().required("La sede es obligatoria"),
        phoneNumber: Yup.string()
          .required("El celular es obligatorio")
          .min(1, "El celular debe tener al menos 1 caracteres")
          .max(10, "El celular debe tener como máximo 10 caracteres"),
        dateStartContract: Yup.date().optional().nullable(),
        contractType: Yup.string().optional(),
        // positionId: Yup.string().optional(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      dniType: "",
      email: "",
      dniNumber: "",
      name: "",
      lastName: "",
      rol: "",
      password: "",
      status: "",
      area: "",
      cargo: "",
      headquarters: "",
      phoneNumber: "",
      dateStartContract: "",
      contractType: "",
      positionId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await update(id, values, () => {
          setIsOpen(false);
          refreshUsers();
          formik.resetForm();
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
  // console.log(formik.errors)

  useEffect(() => {
    if (ususario) {
      formik.setValues({
        dniType: ususario.idDocumento.toString(),
        email: ususario.email,
        dniNumber: ususario.dniNumber.toString(),
        name: ususario.name,
        lastName: ususario.lastName,
        rol: ususario.idRol.toString(),
        password: "",
        status: ususario.status ? "1" : "0",
        area: ususario.area,
        cargo: ususario.cargo,
        headquarters: ususario.sedeId.toString(),
        phoneNumber: ususario.celular.toString(),
        dateStartContract: ususario.dateStartContract
          ? FormatDate(ususario.dateStartContract, false)
          : "",
        contractType: ususario.contractType || "",
        positionId: ususario.positionId ? ususario.positionId.toString() : "",
      });
    }
  }, [ususario]);

  if (errorDocument) return <p>{errorDocument}</p>;
  if (errorRol) return <p>{errorRol}</p>;
  if (errorHeadquarters) return <p>{errorHeadquarters}</p>;

  return (
    <>
      <Button type="button" onClick={handleOpenModal} variant="outline">
        Actualizar
      </Button>
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Actualizar Usuario"
        onSubmit={formik.handleSubmit}
        isValid={formik.isValid}
        isSubmitting={formik.isSubmitting || isLoading}
        submitText="Actualizar"
      >
          <div className="mx-6 my-4 space-y-6">
            <div className="flex items-center">
              <InformationCircleIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
              <h2 className="pl-1 text-xl text-color dark:text-white">
                Datos Personales:
              </h2>
            </div>
            {/* USER NAMES */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="Nombres"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Ingrese Nombres..."
                error={formik.errors.name}
                touched={formik.touched.name}
                required
              />

              <Input
                label="Apellidos"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Ingrese Apellidos..."
                error={formik.errors.lastName}
                touched={formik.touched.lastName}
                required
              />

              <Select
                label="Tipo Documento"
                name="dniType"
                value={formik.values.dniType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={dataDocument.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                error={formik.errors.dniType}
                touched={formik.touched.dniType}
                required
              />

              <Input
                label="Numero Cedula"
                name="dniNumber"
                value={formik.values.dniNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="Ingrese Identificación..."
                error={formik.errors.dniNumber}
                touched={formik.touched.dniNumber}
                required
              />

              <InputAutocompletado
                apiRoute="cargo/name"
                onInputChanged={(id, _name) => {
                  formik.setFieldValue("positionId", id);
                }}
                label="Cargo"
                touched={formik.touched.positionId}
                error={formik.errors.positionId}
                placeholder="Ej: Auxiliar de enfermería"
                required={true}
                initialId={ususario?.positionId?.toString() || ""}
                initialName={ususario?.positionName || ""}
              />

              <Select
                label="Sede"
                name="headquarters"
                value={formik.values.headquarters}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={headquarters.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                error={formik.errors.headquarters}
                touched={formik.touched.headquarters}
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
              />
            </div>

            {/* USER MAIL AND DATES */}
            <div className="flex items-center mb-4">
              <IdentificationIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
              <h2 className="pl-2 text-xl text-color dark:text-gray-100">
                Contacto:
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="Ingresa Correo..."
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
                required
              />
              <Input
                label="Celular"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Ingrese Celular..."
                error={formik.errors.phoneNumber}
                touched={formik.touched.phoneNumber}
                required
              />
            </div>
            {/* USER ROLE AND PASSWORD */}
            <div className="flex items-center">
              <MapPinIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
              <h2 className="pl-1 text-xl text-color dark:text-white">
                Rol y Contraseña:
              </h2>
            </div>
            {/* USER LOCATION AND THEIR PROPERTIES */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
              <Select
                label="Rol"
                name="rol"
                value={formik.values.rol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={rols.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                error={formik.errors.rol}
                touched={formik.touched.rol}
                required
              />

              <Input
                label="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder="Ingrese Contraseña..."
                error={formik.errors.password}
                touched={formik.touched.password}
              />

              <Select
                label="Estado"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                  { value: 1, label: "Activo" },
                  { value: 0, label: "Inactivo" },
                ]}
                error={formik.errors.status}
                touched={formik.touched.status}
                required
              />
            </div>
          {error && (
            <div className="flex items-center justify-center w-full p-2 text-sm font-semibold text-red-500 bg-red-100 border-2 border-red-500 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
              {error}
            </div>
          )}
        </div>
      </FormModal>
    </>
  );
};
export default ModalActionUsuario;

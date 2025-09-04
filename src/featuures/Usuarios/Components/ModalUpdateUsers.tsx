//*Funciones y Hooks
import React, { useEffect, useState, useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import areas from "@/data-dynamic/areas.json";
import { IUsuarios } from "@/models/IUsuarios";
import { updateUsuarios } from "../Services/UpdarteUsuarios";

//*Icons
import { MapPinIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Bounce, toast } from "react-toastify";
import { useUsers } from "@/featuures/Usuarios/Context/UsersContext.tsx";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useLazyFetchTypeDocument } from "@/hooks/useLazyFetchTypeDocument";
import { useLazyFetchRol } from "@/hooks/useLazyFetchRol";
import { useLazyFetchHeadquarters } from "@/hooks/useLazyFetchHeadquarters";

interface ModalActionUsuarioProps {
  id: number;
  ususario: IUsuarios | null;
}

const ModalActionUsuario: React.FC<ModalActionUsuarioProps> = ({
  id,
  ususario,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  const { refreshUsers } = useUsers();

  // estados para inputs autocompletado de areas
  const [searchArea, setSearchArea] = useState<string>("");
  const [suggestionsArea, setSuggestionsArea] = useState<string[]>([]);
  const [searchCargo, setSearchCargo] = useState<string>("");
  const [suggestionsCargo, setSuggestionsCargo] = useState<string[]>([]);


  //hook para traer los tipos de documentos
  const { dataDocument, errorDocument, fetchDocument } = useLazyFetchTypeDocument();

  // hook para traer los roles
  const { rols, errorRol, fetchRols } = useLazyFetchRol();

  // hook para traer las sedes
  const { headquarters, errorHeadquarters, fetchHeadquarters } = useLazyFetchHeadquarters();

  const handleOpenModal = async () => {
    setIsOpen(true);
    Promise.all([fetchDocument(), fetchRols(), fetchHeadquarters()]);
  }

  const validationSchema = useMemo(
    () =>
      Yup.object({
        tipoDocumento: Yup.string().required(
          "El tipo de documento es obligatorio"
        ),
        correo: Yup.string()
          .email("Correo invalido")
          .required("El correo es obligatorio")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Correo invalido debe terminar con un dominio valido"
          ),
        identificacion: Yup.string()
          .required("La identificación es obligatoria")
          .min(5, "La identificación debe tener al menos 5 caracteres")
          .max(11, "La identificación debe tener como máximo 15 caracteres"),
        nombres: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        apellidos: Yup.string()
          .required("El nombre completo es obligatorio")
          .min(2, "El nombre completo debe tener al menos 2 caracteres")
          .max(150, "El nombre completo debe tener como máximo 150 caracteres"),
        rol: Yup.string().required("El rol es obligatorio"),
        contrasena: Yup.string()
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
        sede: Yup.string().required("La sede es obligatoria"),
        celular: Yup.string()
          .required("El celular es obligatorio")
          .min(1, "El celular debe tener al menos 1 caracteres")
          .max(10, "El celular debe tener como máximo 10 caracteres"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      correo: "",
      identificacion: "",
      nombres: "",
      apellidos: "",
      rol: "",
      contrasena: "",
      status: "",
      area: "",
      cargo: "",
      sede: "",
      celular: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("dniType", values.tipoDocumento);
        formData.append("email", values.correo);
        formData.append("dniNumber", values.identificacion);
        formData.append("name", values.nombres);
        formData.append("lastName", values.apellidos);
        formData.append("rol", values.rol);
        formData.append("password", values.contrasena);
        formData.append("status", values.status);
        formData.append("area", values.area);
        formData.append("position", values.cargo);
        formData.append("headquarters", values.sede);
        formData.append("phoneNumber", values.celular);

        const response = await updateUsuarios(id, formData);

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(true);

          toast.success("Usuario Actualizado exitosamente.", {
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

          await refreshUsers();

          setError("");
          setTimeout(() => {
            setIsOpen(false);
          }, 30000);
        } else {
          setError("Error revise los campos e intente nuevamente.");
        }
      } catch (error) {
        setSuccess(false);
        setError(`Error inesperado ${error}`);
      }
    },
  });
  // console.log(formik.errors)

  useEffect(() => {
    if (ususario) {
      formik.setValues({
        tipoDocumento: ususario.idDocumento.toString(),
        correo: ususario.email,
        identificacion: ususario.dniNumber.toString(),
        nombres: ususario.name,
        apellidos: ususario.lastName,
        rol: ususario.idRol.toString(),
        contrasena: "",
        status: ususario.status ? "1" : "0",
        area: ususario.area,
        cargo: ususario.cargo,
        sede: ususario.sedeId.toString(),
        celular: ususario.celular.toString(),
      });
      setSearchArea(ususario.area);
      setSearchCargo(ususario.cargo);
    }
  }, [ususario]);

  // funciones para el autocompletado de inputs
  const handleSearchChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchArea(query);

    if (query) {
      const filteredSuggestions = areas.areas
        .filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((option) => option.name);
      setSuggestionsArea(filteredSuggestions);
    } else {
      setSuggestionsArea([]);
    }
  };

  const handleSuggestionClickArea = (suggestion: string) => {
    formik.setFieldValue("area", suggestion);
    setSearchArea(suggestion);
    setSuggestionsArea([]);
  };

  const handleSearchChangeCargo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchCargo(query);

    if (query) {
      const filteredSuggestions = areas.cargos
        .filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((option) => option.name);
      setSuggestionsCargo(filteredSuggestions);
    } else {
      setSuggestionsCargo([]);
    }
  };

  const handleSuggestionClickCargo = (suggestion: string) => {
    formik.setFieldValue("cargo", suggestion);
    setSearchCargo(suggestion);
    setSuggestionsCargo([]);
  };
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
        isSubmitting={formik.isSubmitting}
        submitText="Actualizar"
      >
        <div>
          <div className="overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 gap-6 p-4">
              <div className="flex items-center">
                <InformationCircleIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                <h2 className="pl-1 text-xl text-color dark:text-white">
                  Datos Personales:
                </h2>
              </div>
              {/* USER NAMES */}
              <div className="grid grid-cols-1 gap-2 px-3 md:grid-cols-2">
                <Input
                  label="Nombres"
                  name="nombres"
                  value={formik.values.nombres}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Ingrese Nombres..."
                  error={formik.errors.nombres}
                  touched={formik.touched.nombres}
                  required
                />

                <Input
                  label="Apellidos"
                  name="apellidos"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Ingrese Apellidos..."
                  error={formik.errors.apellidos}
                  touched={formik.touched.apellidos}
                  required
                />

                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  <Select
                    label="Tipo Documento"
                    name="tipoDocumento"
                    value={formik.values.tipoDocumento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={dataDocument.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    error={formik.errors.tipoDocumento}
                    touched={formik.touched.tipoDocumento}
                    required
                  />

                  <div className="mt-0 md:mt-2">
                    <Input
                      label="Numero Cedula"
                      name="identificacion"
                      value={formik.values.identificacion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      placeholder="Ingrese Identificación..."
                      error={formik.errors.identificacion}
                      touched={formik.touched.identificacion}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[35%_65%] gap-2 md:grid-cols-1">
                  <Input
                    label="Celular"
                    name="celular"
                    value={formik.values.celular}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Ingrese Celular..."
                    error={formik.errors.celular}
                    touched={formik.touched.celular}
                    required
                  />

                  <div className="relative">
                    <Input
                      label="Area"
                      name="area"
                      value={searchArea}
                      onChange={handleSearchChangeArea}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                      error={formik.errors.area}
                      touched={formik.touched.area}
                      required
                    />
                    {suggestionsArea.length > 0 && (
                      <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded top-22 dark:bg-gray-800 dark:border-gray-600 max-h-40">
                        {suggestionsArea.map((suggestion) => (
                          <li
                            key={
                              areas.areas.find((a) => a.name === suggestion)?.id
                            }
                            onClick={() =>
                              handleSuggestionClickArea(suggestion)
                            }
                            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    label="Cargo"
                    name="cargo"
                    value={searchCargo}
                    onChange={handleSearchChangeCargo}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    error={formik.errors.cargo}
                    touched={formik.touched.cargo}
                    required
                  />
                  {suggestionsCargo.length > 0 && (
                    <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded top-22 dark:bg-gray-800 dark:border-gray-600 max-h-40">
                      {suggestionsCargo.map((suggestion) => (
                        <li
                          key={
                            areas.cargos.find(
                              (cargo) => cargo.name === suggestion
                            )?.id
                          }
                          onClick={() => handleSuggestionClickCargo(suggestion)}
                          className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-200"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Select
                  label="Sede"
                  name="sede"
                  value={formik.values.sede}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={headquarters.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  error={formik.errors.sede}
                  touched={formik.touched.sede}
                  required
                />
              </div>

              {/* USER MAIL AND DATES */}
              <div className="flex items-center">
                <IdentificationIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                <h2 className="pl-2 text-xl text-color dark:text-gray-100">
                  Contacto:
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 px-3 md:grid-cols-2">
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="Ingresa Correo..."
                  name="correo"
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.correo}
                  touched={formik.touched.correo}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-4">
              <div className="flex items-center">
                <MapPinIcon className="text-gray-900 dark:text-gray-100 w-7 h-7" />
                <h2 className="pl-1 text-xl text-color dark:text-white">
                  Rol y Contraseña:
                </h2>
              </div>
              {/* USER LOCATION AND THEIR PROPERTIES */}
              <div className="grid grid-cols-2 gap-3 px-3">
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
                  name="contrasena"
                  value={formik.values.contrasena}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  placeholder="Ingrese Contraseña..."
                  error={formik.errors.contrasena}
                  touched={formik.touched.contrasena}
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
            </div>
          </div>

          {success && (
            <span className="text-xl text-right text-green-500 ">
              Usuario actualizado con éxito!
            </span>
          )}
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

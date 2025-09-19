//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import ServicioForm from "./GenerarInputsCUPS";
import React, { useEffect, useState } from "react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useFetchPaciente } from "@/hooks/useFetchPaciente";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals";
import { AnimatePresence } from "framer-motion";
import Input from "@/components/common/Ui/Input";

//*Icons
import useFetchDiagnostico from "../Hooks/UseFetchDiagnostico";
import FormModal from "@/components/common/Ui/FormModal";
import {
  IdCard,
  Mail,
  MapPinHouse,
  Phone,
  PlusCircleIcon,
  Smartphone,
} from "lucide-react";
import Button from "@/components/common/Ui/Button";
import ModalProfessional from "@/components/common/Modals/ModalProfessinal/ModalProfessional";
import { useRequestService } from "../Hooks/useRequestService";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);
  const navigate = useNavigate();

  {
    /* hook que trae los datos del paciente */
  }
  const { data, error: errorDataPatient, getData } = useFetchPaciente();

  const {
    createRequestService,
    error: errorRequestService,
    loading: creatingRequestService,
  } = useRequestService();

  const [errorCups, setErrorCups] = useState<string | null>(null);

  const { diagnostico, loading, errorDiagnostico, fetchDiagnostico } =
    useFetchDiagnostico();

  const user = localStorage.getItem("user");
  const nombreUsuario = user
    ? JSON.parse(user).name + " " + JSON.parse(user).lastname
    : "";

  const idUsuario = user ? JSON.parse(user).id : "";

  const [identificacion, setIdentificacion] = useState<string>("");
  const [diagnosicoValue, setDiagnosticoValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantityInputs, setCantidadInputs] = useState<string>("1");
  const [servicios, setServicios] = useState<string[]>([]);

  const [quantityServices, setQuantityServices] = useState<string[]>([]);
  const [descripciones, setDescripciones] = useState<string[]>([]);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const items = Array.from({ length: parseInt(quantityInputs || "0") || 0 }, (_, index) => ({
    id: serviceIds[index],
    code: servicios[index],
    description: descripciones[index],
    quantity: quantityServices[index],
  }));

  // * usar formik y yup para validar los campos
  const validationSchema = Yup.object({
    telefonoFijo: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 1 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    numeroCelular: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    numeroCelular2: Yup.string()
      .optional()
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    direccion: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    idIpsRemite: Yup.string().required("Campo requerido"),
    idEspecialidad: Yup.string().required("Campo requerido"),
    idGrupoServicios: Yup.string().required("Campo requerido"),
    idLugarRadicacion: Yup.string().required("Campo requerido"),
    idTipoServicios: Yup.string().required("Campo requerido"),
    nombreProfesional: Yup.string().required("Campo requerido"),
    dateOrden: Yup.string().required("Campo requerido"),
    soporte: Yup.mixed().required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      telefonoFijo: "",
      numeroCelular: "",
      numeroCelular2: "",
      direccion: "",
      email: "",
      idIpsRemite: "",
      idEspecialidad: "",
      idGrupoServicios: "",
      idLugarRadicacion: "",
      idTipoServicios: "",
      nombreProfesional: "",
      dateOrden: "",
      idDiagnostico: "",
      descripcionDiagnostico: "",
      codigoDiagnostico: "",
      idPaciente: "",
      soporte: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      // ? validar que cantidad no este vacia y sea mayor a 0
      if (!quantityInputs || parseInt(quantityInputs) <= 0) {
        setErrorCups(
          "La cantidad de servicios solicitados no puede estar vacía."
        );
        return;
      }

      // ! validar si la cantidad de cups ingresados es igual a la cantidad de pares de inputs que solicito el usuario
      // ! tambien se valida que no haya campos vacios
      let errorCups = "";
      if (servicios.length !== parseInt(quantityInputs)) {
        errorCups =
          "La cantidad de códigos de CUPS no coincide con la cantidad especificada.";
      } else if (descripciones.length !== parseInt(quantityInputs)) {
        errorCups =
          "La cantidad de descripciones de CUPS no coincide con la cantidad especificada.";
      } else if (quantityServices.length !== parseInt(quantityInputs)) {
        errorCups =
          "La cantidad de cantidades de CUPS no coincide con la cantidad especificada.";
      } else if (serviceIds.length !== parseInt(quantityInputs)) {
        errorCups =
          "La cantidad de IDs de CUPS no coincide con la cantidad especificada.";
      } else {
        for (let i = 0; i < parseInt(quantityInputs); i++) {
          if (!servicios[i]) {
            errorCups = `Falta el código del CUPS N° ${i + 1}.`;
            break;
          }
          if (!descripciones[i]) {
            errorCups = `Falta la descripción del CUPS N° ${i + 1}.`;
            break;
          }
          if (!quantityServices[i]) {
            errorCups = `Falta la cantidad del CUPS N° ${i + 1}.`;
            break;
          }
          if (!serviceIds[i]) {
            errorCups = `Falta el ID del CUPS N° ${i + 1}.`;
            break;
          }
        }
      }

      if (errorCups) {
        setErrorCups(errorCups);
        return;
      }
      const formData = new FormData();
      formData.append("landline", values.telefonoFijo);
      formData.append("phoneNumber", values.numeroCelular);
      formData.append("phoneNumber2", values.numeroCelular2);
      formData.append("address", values.direccion);
      formData.append("email", values.email);
      formData.append("ipsRemitente", values.idIpsRemite);
      formData.append("specialty", values.idEspecialidad);
      formData.append("groupServices", values.idGrupoServicios);
      formData.append("place", values.idLugarRadicacion);
      formData.append("typeServices", values.idTipoServicios);
      formData.append("radicador", idUsuario);
      formData.append("profetional", values.nombreProfesional);
      formData.append("orderDate", values.dateOrden);
      if (values.soporte) {
        formData.append("file", values.soporte);
      }
      formData.append("idDiagnostico", values.idDiagnostico);
      formData.append("items", JSON.stringify(items));
      formData.append("idPatient", values.idPaciente);

      const response = await createRequestService(formData);

      if (response?.status === 201 || response?.status === 200) {
        setErrorCups(null);
        formik.resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    },
  });

  // * efecto para llenar los campos del formulario con los datos del paciente cada que data cambie
  useEffect(() => {
    if (data) {
      formik.setFieldValue("telefonoFijo", data.landline);
      formik.setFieldValue("numeroCelular", data.phoneNumber);
      formik.setFieldValue("numeroCelular2", data.phoneNumber2 || "");
      formik.setFieldValue("direccion", data.address);
      formik.setFieldValue("email", data.email);
    }
  }, [data]);

  useEffect(() => {
    if (diagnostico) {
      formik.setFieldValue(
        "idDiagnostico",
        diagnostico.map((item) => item.id).join(", ")
      );
      setDescription(diagnostico.map((item) => item.description).join(", "));
      // formik.setFieldValue("servicios", diagnostico.map((item) => item.id).join(", "));
    }
  }, [diagnostico]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("idPaciente", data.id.toString());
      // setIdPaciente(data.id.toString());
    }
  }, [data]);

  const handleDiagnosticoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab") {
      if (diagnosicoValue) {
        fetchDiagnostico(diagnosicoValue);
      }
    }
  };

  const handleBlur = () => {
    if (identificacion) {
      getData(identificacion);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      if (identificacion) {
        getData(identificacion);
      }
    }
  };

  // ? redirigir al usuario a la tabla de pacientes para registrar un nuevo paciente
  const handleRegisterPaciente = () => {
    navigate("/tabla-pacientes", { state: { openModal: true } });
  };

  // ? validar que la cantidad de servicios sea un número entero mayor a 0
  const HandleQuantityInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
      setCantidadInputs(value);
    }
    // reiniciar arrays de servicios y descripciones
    setServicios(Array(Number(value)).fill(""));
    setDescripciones(Array(Number(value)).fill(""));
    setQuantityServices(Array(Number(value)).fill(""));
    setServiceIds(Array(Number(value)).fill(""));
  };

  const handleServicioChange = (index: number, value: string) => {
    const newServicios = [...servicios];
    newServicios[index] = value;
    setServicios(newServicios);
  };

  const handleDescripcionChange = (index: number, value: string) => {
    const newDescripciones = [...descripciones];
    newDescripciones[index] = value;
    setDescripciones(newDescripciones);
  };

  const handleCantidadInputChange = (index: number, value: string) => {
    const newCantidadInput = [...quantityServices];
    newCantidadInput[index] = value;
    setQuantityServices(newCantidadInput);
  };

  const handleIdServicioChange = (index: number, value: string) => {
    const newIds = [...serviceIds];
    newIds[index] = value;
    setServiceIds(newIds);
  };

  const EventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setStadopen(true)}
        icon={<PlusCircleIcon className="w-5 h-5" />}
        iconPosition="left"
        variant="primary"
        size="md"
      >
        Radicar
      </Button>

      {/* init form */}
      <FormModal
        isOpen={stadopen}
        onClose={() => setStadopen(false)}
        title="Radicar Servicios"
        showCancelButton={true}
        onSubmit={formik.handleSubmit}
        size="lg"
        submitText="Radicar"
        isSubmitting={creatingRequestService || formik.isSubmitting}
        isValid={formik.isValid}
      >
        <div>
          <div className="px-2 md:px-5">
            <div>
              <h5 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos Paciente:
              </h5>
            </div>

            <section className="grid grid-cols-3 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
              <div>
                <Input
                  type="text"
                  id="identificacion"
                  name="identificacion"
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  placeholder="Ej: 1234567890"
                  label="Identificación"
                  required={true}
                  icon={<IdCard className="w-5 h-5" />}
                  iconPosition="left"
                />
              </div>
              {errorDataPatient && !data && (
                <div className="text-red-500 dark:text-red-300">
                  {errorDataPatient}
                  <div></div>
                  <button
                    type="button"
                    className="text-blue-500 dark:text-blue-300"
                    onClick={handleRegisterPaciente}
                  >
                    Registrar Paciente
                  </button>
                </div>
              )}

              {data && (
                <>
                  <div>
                    <Input
                      type="text"
                      value={data.documentRelation.name}
                      label="Tipo Documento"
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      value={data.name}
                      label="Nombre Completo"
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      value={data.convenioRelation.name}
                      label="Convevio"
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      value={data.ipsPrimariaRelation.name}
                      label="IPS Primaria"
                      disabled={true}
                    />
                  </div>
                </>
              )}
              <div>
                <input
                  type="text"
                  value={formik.values.idPaciente}
                  className="hidden"
                />
              </div>
            </section>

            <div>
              <h5 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos Contacto Paciente:
              </h5>
            </div>

            <section className="grid grid-cols-1 mb-6 text-sm md:grid-cols-2 gap-x-10 gap-y-2 ms-2">
              <div className="mb-4">
                <Input
                  type="number"
                  name="telefonoFijo"
                  placeholder="Ingrese teléfono..."
                  onChange={formik.handleChange}
                  value={formik.values.telefonoFijo}
                  onBlur={formik.handleBlur}
                  label="Telefono Fijo"
                  required={true}
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.telefonoFijo}
                  error={formik.errors.telefonoFijo}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Ingrese número de celular..."
                  onChange={formik.handleChange}
                  value={formik.values.numeroCelular}
                  name="numeroCelular"
                  onBlur={formik.handleBlur}
                  label="N° Celular"
                  required={true}
                  icon={<Smartphone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.numeroCelular}
                  error={formik.errors.numeroCelular}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Ej: 3001234567"
                  onChange={formik.handleChange}
                  value={formik.values.numeroCelular2}
                  name="numeroCelular2"
                  onBlur={formik.handleBlur}
                  label="N° Celular 2"
                  icon={<Smartphone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.numeroCelular2}
                  error={formik.errors.numeroCelular2}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Ingrese dirección..."
                  name="direccion"
                  onChange={formik.handleChange}
                  value={formik.values.direccion}
                  onBlur={formik.handleBlur}
                  label="Dirección"
                  required={true}
                  icon={<MapPinHouse className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.direccion}
                  error={formik.errors.direccion}
                />
              </div>
              <div>
                <Input
                  type="email"
                  onChange={formik.handleChange}
                  name="email"
                  placeholder="Ingrese correo electronico..."
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  label="Email"
                  required={true}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.email}
                  error={formik.errors.email}
                />
              </div>
            </section>

            <div>
              <h5 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                CUPS:
              </h5>
            </div>
            {/* el usuario ingresa la cantidad de servicios que desea ingresar */}
            <section className="grid grid-cols-1 mb-6 text-sm border-2 border-transparent gap-x-10 gap-y-3 ps-2">
              <div className="mb-3">
                <Input
                  type="text"
                  id="cantidad"
                  name="cantidad"
                  maxLength={1}
                  value={quantityInputs}
                  onChange={HandleQuantityInputs}
                  onKeyDown={EventEnter}
                  placeholder="Digite número . . . ."
                  label="Cantidad de Servicios Solicitados"
                  required={true}
                  className="w-24 md:w-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[24%_24%_46%] gap-5">
                <ServicioForm
                  quantityInputs={quantityInputs}
                  servicios={servicios}
                  quantityServices={quantityServices}
                  descripciones={descripciones}
                  onServicioChange={handleServicioChange}
                  onDescripcionChange={handleDescripcionChange}
                  onCantidadInputChange={handleCantidadInputChange}
                  idsServicios={serviceIds}
                  onIdServicioChange={handleIdServicioChange}
                />
              </div>
            </section>

            <div>
              <h5 className="p-2 mt-2 mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Información del Servicio a Radicar:
              </h5>
            </div>

            <section className="grid grid-cols-3 mb-4 text-sm gap-x-2 md:gap-x-10 gap-y-4 ps-2">
              <div className="mb-1">
                <InputAutocompletado
                  label="IPS Remite"
                  onInputChanged={(value) =>
                    formik.setFieldValue("idIpsRemite", value)
                  }
                  apiRoute="ips-remite-name"
                  error={formik.errors.idIpsRemite}
                  touched={formik.touched.idIpsRemite}
                  placeholder="Ej: IPS San Juan"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.idIpsRemite && formik.errors.idIpsRemite ? (
                    <ErrorMessage>{formik.errors.idIpsRemite}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Especialidad"
                  onInputChanged={(value) =>
                    formik.setFieldValue("idEspecialidad", value)
                  }
                  apiRoute="especialidades-name"
                  error={formik.errors.idEspecialidad}
                  touched={formik.touched.idEspecialidad}
                  placeholder="Ej: Endodoncia"
                  required={true}
                />
                {formik.touched.idEspecialidad &&
                formik.errors.idEspecialidad ? (
                  <div className="mt-2 text-red-500 dark:text-red-300">
                    {formik.errors.idEspecialidad}
                  </div>
                ) : null}
              </div>
              <div>
                <InputAutocompletado
                  label="Profesional remite"
                  apiRoute="profesionales/buscar"
                  error={
                    formik.touched.nombreProfesional
                      ? formik.errors.nombreProfesional
                      : undefined
                  }
                  onInputChanged={(value) =>
                    formik.setFieldValue("nombreProfesional", value)
                  }
                  touched={formik.touched.nombreProfesional}
                  required={true}
                  placeholder="Digite nombre del profesional..."
                  helpText={`¿No encuentras el profesional?`}
                />
                <ModalProfessional />
              </div>
              <div>
                <Input
                  type="date"
                  name="dateOrden"
                  onChange={formik.handleChange}
                  value={formik.values.dateOrden}
                  onBlur={formik.handleBlur}
                  label="Fecha Orden"
                  required={true}
                  touched={formik.touched.dateOrden}
                  error={formik.errors.dateOrden}
                />
              </div>
              <div>
                <InputAutocompletado
                  label="Grupo Servicios"
                  onInputChanged={(value) =>
                    formik.setFieldValue("idGrupoServicios", value)
                  }
                  apiRoute="grupo-servicios-name"
                  error={formik.errors.idGrupoServicios}
                  touched={formik.touched.idGrupoServicios}
                  placeholder="Ej: Cirugía General"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.idGrupoServicios &&
                  formik.errors.idGrupoServicios ? (
                    <ErrorMessage>
                      {formik.errors.idGrupoServicios}
                    </ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Tipo Servicios"
                  onInputChanged={(value) =>
                    formik.setFieldValue("idTipoServicios", value)
                  }
                  apiRoute="servicios-name"
                  error={formik.errors.idTipoServicios}
                  touched={formik.touched.idTipoServicios}
                  placeholder="Ej: PGP"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.idTipoServicios &&
                  formik.errors.idTipoServicios ? (
                    <ErrorMessage>{formik.errors.idTipoServicios}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Lugar Radicación"
                  onInputChanged={(value) =>
                    formik.setFieldValue("idLugarRadicacion", value)
                  }
                  apiRoute="lugares-radicacion-name"
                  error={formik.errors.idLugarRadicacion}
                  touched={formik.touched.idLugarRadicacion}
                  placeholder="Ej: Calle 15"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.idLugarRadicacion &&
                  formik.errors.idLugarRadicacion ? (
                    <ErrorMessage>
                      {formik.errors.idLugarRadicacion}
                    </ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <br />
            </section>
            <section className="w-[95%] md:w-[98%] grid gap-o md:gap-x-9 gap-y-2 grid-cols-1 md:grid-cols-2 place-self-center">
              <div className="">
                <div className="mt-4 md:mt-0">
                  <Input
                    type="text"
                    onChange={(e) => setDiagnosticoValue(e.target.value)}
                    onKeyDown={handleDiagnosticoKeyDown}
                    placeholder="Digite código"
                    label="Diagnóstico"
                    required={true}
                  />
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <label
                  htmlFor=""
                  className="disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  <span className="block mb-2 text-base font-bold text-gray-700 dark:text-gray-200">
                    Descripción Diagnóstico
                  </span>
                  <textarea
                    id=""
                    name=""
                    value={
                      description || (loading ? "" : errorDiagnostico || "")
                    }
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded cursor-not-allowed dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                  ></textarea>
                </label>
              </div>
              <div>
                <Input
                  type="text"
                  value={nombreUsuario}
                  disabled={true}
                  label="Quién Radica"
                  required={true}
                />
              </div>
              <div className="mt-4 mb-4 md:mt-0">
                <Input
                  type="file"
                  name="soporte"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      formik.setFieldValue("soporte", e.target.files[0]);
                    }
                  }}
                  label="Soporte"
                  required={true}
                  touched={formik.touched.soporte}
                  error={formik.errors.soporte}
                />
              </div>
            </section>
            <div>
              <input
                type="text"
                value={formik.values.idDiagnostico}
                className="hidden"
              />
            </div>
          </div>

          <AnimatePresence>
            {errorRequestService || errorCups && (
              <div>
                <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                  {errorRequestService || errorCups}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </FormModal>
    </>
  );
};

export default ModalRadicacion;

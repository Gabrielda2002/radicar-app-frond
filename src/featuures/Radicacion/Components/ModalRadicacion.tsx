//*Funciones y Hooks
import * as Yup from "yup";
import { useFormik } from "formik";
import ServicioForm from "./GenerarInputsCUPS";
import React, { useEffect, useState } from "react";
import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import { useFetchPatient } from "@/featuures/Patient/Hooks/useFetchPatient";
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
import { useLazyFetchConvenio } from "@/hooks/useLazyFetchConvenio";
import Select from "@/components/common/Ui/Select";

const ModalRadicacion = () => {
  const [stadopen, setStadopen] = useState(false);
  const navigate = useNavigate();

  {
    /* hook que trae los datos del paciente */
  }
  const { data, error: errorDataPatient, getData } = useFetchPatient();

  const {
    createRequestService,
    error: errorRequestService,
    loading: creatingRequestService,
  } = useRequestService();

  const { dataConvenios, fetchConvenios } = useLazyFetchConvenio();

  const handleOpenModal = async () => {
    setStadopen(true);
    await Promise.all([fetchConvenios()]);
  }

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

  // * usar formik y yup para validar los campos
  const validationSchema = Yup.object({
    agreement: Yup.string().required("Campo requerido"),
    landline: Yup.string()
      .optional()
      .min(1, "El número debe tener al menos 1 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    phoneNumber: Yup.string()
      .required("Campo requerido")
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    phoneNumber2: Yup.string()
      .optional()
      .min(1, "El número debe tener al menos 10 caracteres.")
      .max(10, "El número debe tener máximo 10 caracteres."),
    address: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    ipsRemiteId: Yup.string().required("Campo requerido"),
    specialty: Yup.string().required("Campo requerido"),
    groupService: Yup.string().required("Campo requerido"),
    placeId: Yup.string().required("Campo requerido"),
    typeService: Yup.string().required("Campo requerido"),
    professional: Yup.string().required("Campo requerido"),
    orderDate: Yup.string().required("Campo requerido"),
    file: Yup.mixed().required("Campo requerido"),
    numberOfCups: Yup.string().required("Campo requerido"),
    cupsData: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required("Código CUPS requerido"),
        description: Yup.string().required("Descripción CUPS requerida"),
        quantity: Yup.string().required("Cantidad CUPS requerida"),
        id: Yup.string().required("ID CUPS requerido"),
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      agreement: "",
      landline: "",
      phoneNumber: "",
      phoneNumber2: "",
      address: "",
      email: "",
      ipsRemiteId: "",
      specialty: "",
      groupService: "",
      placeId: "",
      typeService: "",
      professional: "",
      orderDate: "",
      diagnosisId: "",
      descripcionDiagnostico: "",
      codigoDiagnostico: "",
      patientId: "",
      file: null,
      assistantId: idUsuario,
      numberOfCups: 1,
      cupsData: [{
        code: "",
        description: "",
        quantity: "",
        id: "",
      }]
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      if (errorCups) {
        setErrorCups(errorCups);
        return;
      }

      const response = await createRequestService(values);

      if (response?.status === 201 || response?.status === 200) {
        setErrorCups(null);
        formik.resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    },
  });

  useEffect(() => {
    const numberOfCups = formik.values.numberOfCups;
    const currentCupsLength = formik.values.cupsData.length;

    if(numberOfCups > currentCupsLength) {
      const newCups = [...formik.values.cupsData];
      for(let i = currentCupsLength; i < numberOfCups; i++) {
        newCups.push({
          code: "",
          description: "",
          quantity: "",
          id: ""
        });
      }
      formik.setFieldValue("cupsData", newCups);
    }else {
      formik.setFieldValue("cupsData", formik.values.cupsData.slice(0, numberOfCups));
    }

  }, [formik.values.numberOfCups]);

  // * efecto para llenar los campos del formulario con los datos del paciente cada que data cambie
  useEffect(() => {
    if (data) {
      formik.setFieldValue("landline", data.landline);
      formik.setFieldValue("phoneNumber", data.phoneNumber);
      formik.setFieldValue("phoneNumber2", data.phoneNumber2 || "");
      formik.setFieldValue("address", data.address);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("agreement", data.convenio);
    }
  }, [data]);

  useEffect(() => {
    if (diagnostico) {
      formik.setFieldValue(
        "diagnosisId",
        diagnostico.map((item) => item.id).join(", ")
      );
      setDescription(diagnostico.map((item) => item.description).join(", "));
      // formik.setFieldValue("servicios", diagnostico.map((item) => item.id).join(", "));
    }
  }, [diagnostico]);

  useEffect(() => {
    if (data) {
      formik.setFieldValue("patientId", data.id.toString());
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

  const EventEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleOpenModal}
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
                    <Input
                      type="text"
                      value={data.documentRelation.name}
                      label="Tipo Documento"
                      disabled={true}
                    />
                    <Input
                      type="text"
                      value={data.name}
                      label="Nombre Completo"
                      disabled={true}
                    />
                    <Select
                      options={dataConvenios.map(c => ({ value: c.id, label: c.name }))}
                      value={formik.values.agreement}
                      label="Convenio"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="agreement"
                      touched={formik.touched.agreement}
                      error={formik.errors.agreement}
                      required
                    />
                    <Input
                      type="text"
                      value={data.ipsPrimariaRelation.name}
                      label="IPS Primaria"
                      disabled={true}
                    />
                </>
              )}
              <div>
                <input
                  type="text"
                  value={formik.values.patientId}
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
                  name="landline"
                  placeholder="Ingrese teléfono..."
                  onChange={formik.handleChange}
                  value={formik.values.landline}
                  onBlur={formik.handleBlur}
                  label="Telefono Fijo"
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.landline}
                  error={formik.errors.landline}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Ingrese número de celular..."
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  label="N° Celular"
                  required={true}
                  icon={<Smartphone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.phoneNumber}
                  error={formik.errors.phoneNumber}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Ej: 3001234567"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber2}
                  name="phoneNumber2"
                  onBlur={formik.handleBlur}
                  label="N° Celular 2"
                  icon={<Smartphone className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.phoneNumber2}
                  error={formik.errors.phoneNumber2}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Ingrese dirección..."
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  label="Dirección"
                  required={true}
                  icon={<MapPinHouse className="w-5 h-5" />}
                  iconPosition="left"
                  touched={formik.touched.address}
                  error={formik.errors.address}
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
                  id="numberOfCups"
                  name="numberOfCups"
                  maxLength={1}
                  value={formik.values.numberOfCups}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyDown={EventEnter}
                  placeholder="Digite número . . . ."
                  label="Cantidad de Servicios Solicitados"
                  required={true}
                  className="w-24 md:w-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[24%_24%_46%] gap-5">
                <ServicioForm
                  formik={formik}
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
                    formik.setFieldValue("ipsRemiteId", value)
                  }
                  apiRoute="ips-remite-name"
                  error={formik.errors.ipsRemiteId}
                  touched={formik.touched.ipsRemiteId}
                  placeholder="Ej: IPS San Juan"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.ipsRemiteId && formik.errors.ipsRemiteId ? (
                    <ErrorMessage>{formik.errors.ipsRemiteId}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Especialidad"
                  onInputChanged={(value) =>
                    formik.setFieldValue("specialty", value)
                  }
                  apiRoute="especialidades-name"
                  error={formik.errors.specialty}
                  touched={formik.touched.specialty}
                  placeholder="Ej: Endodoncia"
                  required={true}
                />
                {formik.touched.specialty &&
                formik.errors.specialty ? (
                  <div className="mt-2 text-red-500 dark:text-red-300">
                    {formik.errors.specialty}
                  </div>
                ) : null}
              </div>
              <div>
                <InputAutocompletado
                  label="Profesional remite"
                  apiRoute="profesionales/buscar"
                  error={
                    formik.touched.professional
                      ? formik.errors.professional
                      : undefined
                  }
                  onInputChanged={(value) =>
                    formik.setFieldValue("professional", value)
                  }
                  touched={formik.touched.professional}
                  required={true}
                  placeholder="Digite nombre del profesional..."
                  helpText={`¿No encuentras el profesional?`}
                />
                <ModalProfessional />
              </div>
              <div>
                <Input
                  type="date"
                  name="orderDate"
                  onChange={formik.handleChange}
                  value={formik.values.orderDate}
                  onBlur={formik.handleBlur}
                  label="Fecha Orden"
                  required={true}
                  touched={formik.touched.orderDate}
                  error={formik.errors.orderDate}
                />
              </div>
              <div>
                <InputAutocompletado
                  label="Grupo Servicios"
                  onInputChanged={(value) =>
                    formik.setFieldValue("groupService", value)
                  }
                  apiRoute="grupo-servicios-name"
                  error={formik.errors.groupService}
                  touched={formik.touched.groupService}
                  placeholder="Ej: Cirugía General"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.groupService &&
                  formik.errors.groupService ? (
                    <ErrorMessage>
                      {formik.errors.groupService}
                    </ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Tipo Servicios"
                  onInputChanged={(value) =>
                    formik.setFieldValue("typeService", value)
                  }
                  apiRoute="servicios-name"
                  error={formik.errors.typeService}
                  touched={formik.touched.typeService}
                  placeholder="Ej: PGP"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.typeService &&
                  formik.errors.typeService ? (
                    <ErrorMessage>{formik.errors.typeService}</ErrorMessage>
                  ) : null}
                </AnimatePresence>
              </div>
              <div>
                <InputAutocompletado
                  label="Lugar Radicación"
                  onInputChanged={(value) =>
                    formik.setFieldValue("placeId", value)
                  }
                  apiRoute="lugares-radicacion-name"
                  error={formik.errors.placeId}
                  touched={formik.touched.placeId}
                  placeholder="Ej: Calle 15"
                  required={true}
                />
                <AnimatePresence>
                  {formik.touched.placeId &&
                  formik.errors.placeId ? (
                    <ErrorMessage>
                      {formik.errors.placeId}
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
                  name="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      formik.setFieldValue("file", e.target.files[0]);
                    }
                  }}
                  label="Soporte"
                  required={true}
                  touched={formik.touched.file}
                  error={formik.errors.file}
                />
              </div>
            </section>
          </div>

          <AnimatePresence>
            {(errorRequestService != null || errorCups) && (
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

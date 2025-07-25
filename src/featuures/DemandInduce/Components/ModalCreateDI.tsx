import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useFetchPaciente } from "@/hooks/useFetchPaciente";
import { useFormik } from "formik";
import { PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useCreateDI } from "../Hooks/useCreateDI";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

interface ModalCreateDIProps {
  refresh: () => void;
}

const ModalCreateDI: React.FC<ModalCreateDIProps> = ({
  refresh,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [documento, setDocumento] = useState<string>("");

  const { data, error, getData } = useFetchPaciente();

  const { createDI, error: errorCreating, loading } = useCreateDI();

  const validationSchema = Yup.object({
    document: Yup.string(),
    tipoDocumento: Yup.string().required("El tipo de documento es obligatorio"),
    elementDemand: Yup.string().required(
      "El elemento de demanda inducida es obligatorio"
    ),
    typeElementDemand: Yup.string().required(
      "El tipo de elemento de demanda inducida es obligatorio"
    ),
    objetive: Yup.string().required("El objetivo es obligatorio"),
    contactNumbers: Yup.string()
      .required("Los numeros de contacto es obligatorio")
      .min(10, "El número de contacto debe tener al menos 10 dígitos")
      .max(30, "El número de contacto no debe exceder los 30 dígitos"),

    // actualizaciond e datos del paciente
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    phoneNumber: Yup.string()
      .required("El número de teléfono es obligatorio")
      .max(10, "El número de teléfono debe tener al menos 10 dígitos"),
    phoneNumber2: Yup.string()
      .optional()
      .max(10, "El número de teléfono debe tener al menos 10 dígitos").nullable(),
    address: Yup.string().required("La dirección es obligatoria"),

    // llamada telefonica (2)
    classification: Yup.boolean().when("elementDemand", {
      is: (value: string) => value == "2",
      then: (schema) => schema.required("La clasificación es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    acceptCall: Yup.string().when("classification", {
      is: (value: boolean) => value == true,
      then: (schema) =>
        schema.required("La aceptación de llamada es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    relationshipUser: Yup.string().when("classification", {
      is: (value: boolean) => value == true,
      then: (schema) =>
        schema.required("La relación con el usuario es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    dateCall: Yup.string().when("classification", {
      is: (value: boolean) => value === true,
      then: (schema) =>
        schema.required("La fecha de la llamada es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    hourCall: Yup.string().when("classification", {
      is: (value: boolean) => value === true,
      then: (schema) => schema.required("La hora de la llamada es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    textCall: Yup.string().when("classification", {
      is: (value: boolean) => value === true,
      then: (schema) =>
        schema.required("El texto de la llamada es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),
    dificulties: Yup.boolean().optional(),
    areaDificulties: Yup.string().when("dificulties", {
      is: (value: boolean) => value === true,
      then: (schema) =>
        schema.required("El área de dificultades es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }), // cambiar validacion
    areaEps: Yup.string().when("dificulties", {
      is: (value: boolean) => value === true,
      then: (schema) => schema.required("El área EPS es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    summaryCall: Yup.string().when("classification", {
      is: (value: boolean) => value === true,
      then: (schema) =>
        schema.required("El resumen de la llamada es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),
    conditionUser: Yup.boolean().optional(),
    suport: Yup.string().optional(),
    // resultado de la llamada no efectiva
    resultCall: Yup.string().when(["classification", "elementDemand"], {
      is: (classification: boolean, elementDemand: string) => classification === false && elementDemand == "2",
      then: (schema) =>
        schema.required("El resultado de la llamada es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),

    // elementos de demanda inducida = mensaje (1)
    dateSend: Yup.string().when("elementDemand", {
      is: (value: string) => value === "1",
      then: (schema) => schema.required("La fecha de envío es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    hourSend: Yup.string().when("elementDemand", {
      is: (value: string) => value === "1",
      then: (schema) => schema.required("La hora de envío es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    textSend: Yup.string().when("elementDemand", {
      is: (value: string) => value === "1",
      then: (schema) => schema.required("El texto de envío es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),

    // visita preventiva de salud (4)
    dateVisit: Yup.string().when("elementDemand", {
      is: (value: string) => value === "4",
      then: (schema) => schema.required("La fecha de la visita es obligatoria"),
      otherwise: (schema) => schema.optional(),
    }),
    sumaryVisit: Yup.string().when("elementDemand", {
      is: (value: string) => value === "4",
      then: (schema) =>
        schema.required("El resumen de la visita es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),
    reasonVisitNotEffective: Yup.string().when("elementDemand", {
      is: (value: string) => value === "4",
      then: (schema) =>
        schema.required("El motivo de la visita no efectiva es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),
    areaPersonProcess: Yup.string().required(
      "El área de la persona que procesa es obligatoria"
    ),
    programPerson: Yup.string().required("El programa es obligatorio"),
    assignmentDate: Yup.string().required("La de asignación es obligatoria"),
    profetional: Yup.string().required("El profesional es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      document: "",
      tipoDocumento: "",
      email: "",
      phoneNumber: "",
      phoneNumber2: "",
      address: "",
      elementDemand: "",
      typeElementDemand: "",
      objetive: "",
      contactNumbers: "",
      classification: false,
      acceptCall: "",
      relationshipUser: "",
      dateCall: "",
      hourCall: "",
      textCall: "",
      dificulties: false,
      areaDificulties: "",
      areaEps: "",
      summaryCall: "",
      conditionUser: false,
      suport: "",
      resultCall: "",
      dateSend: "",
      hourSend: "",
      textSend: "",
      dateVisit: "",
      sumaryVisit: "",
      reasonVisitNotEffective: "",
      areaPersonProcess: "",
      programPerson: "",
      assignmentDate: "",
      idPatient: data?.id || "",
      profetional: "",
      idUser: 1,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createDI(values);

        if (response ) {
          formik.resetForm();
          setDocumento("");
          await refresh();
          toast.success("Demanda inducida creada exitosamente");
        }
        
      } catch (error) {
        console.log("Error inesperado al crear la demanda inducida. :", error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      formik.setFieldValue("tipoDocumento", data.documentRelation.name);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phoneNumber", data.phoneNumber);
      formik.setFieldValue("phoneNumber2", data.phoneNumber2);
      formik.setFieldValue("address", data.address);
      formik.setFieldValue("idPatient", data.id.toString());
    }
  }, [documento, data]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="lg"
        icon={<PlusCircleIcon />}
        iconPosition="left"
      >
        Crear
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Crear Demanda Inducida"
        size="lg"
        submitText="Crear"
        onSubmit={formik.handleSubmit}
        isSubmitting={loading}
      >
        <div className="py-3 px-5">
          {/* datos iniciales de la demanda inducida */}
          <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Datos de la demanda inducida:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Input
                type="text"
                id="document"
                value={documento}
                name="document"
                onChange={(e) => setDocumento(e.target.value)}
                onBlur={() => {
                  getData(documento)
                  formik.handleBlur
                }}
                touched={formik.touched.document}
                error={formik.errors.document}
                label="Documento"
                placeholder="Ej: 123456789"
                required={true}
              />
            </div>

            <div>
              <InputAutocompletado
                apiRoute="elementos/demanda-inducida/buscar"
                label="Elemento de demanda inducida"
                onInputChanged={(value) => {
                  formik.setFieldValue("elementDemand", value);
                }}
                error={
                  formik.touched.elementDemand && formik.errors.elementDemand
                    ? formik.errors.elementDemand
                    : undefined
                }
                required={true}
                placeholder="Ej: Llamada telefónica"
                touched={formik.touched.elementDemand}
              />
              {formik.touched.elementDemand && formik.errors.elementDemand && (
                <div className="text-red-500">
                  {formik.errors.elementDemand}
                </div>
              )}
            </div>

            <div>
              <InputAutocompletado
                apiRoute="tipo/demanda-inducida/buscar"
                label="Tipo de elemento de demanda inducida"
                onInputChanged={(value) =>
                  formik.setFieldValue("typeElementDemand", value)
                }
                error={
                  formik.touched.typeElementDemand &&
                  formik.errors.typeElementDemand
                    ? formik.errors.typeElementDemand
                    : undefined
                }
                required={true}
                placeholder="Ej: Mensaje"
                touched={formik.touched.typeElementDemand}
              />
              {formik.touched.typeElementDemand &&
                formik.errors.typeElementDemand && (
                  <div className="text-red-500">
                    {formik.errors.typeElementDemand}
                  </div>
                )}
            </div>

            <div>
              <InputAutocompletado
                apiRoute="objetivo/demanda-inducida/buscar"
                label="Objetivo"
                onInputChanged={(value) =>
                  formik.setFieldValue("objetive", value)
                }
                error={
                  formik.touched.objetive && formik.errors.objetive
                    ? formik.errors.objetive
                    : undefined
                }
                required={true}
                placeholder="Ej: Autocuidado"
                touched={formik.touched.objetive}
              />
              {formik.touched.objetive && formik.errors.objetive && (
                <div className="text-red-500">{formik.errors.objetive}</div>
              )}
            </div>
            <div>
              <Input
                label="Número de telefono con el que se establece el contacto"
                helpText="Ingresa los numeros con los que se intenta contactar al paciente sin espacios ni caracteres especiales."
                type="text"
                id="contactNumbers"
                value={formik.values.contactNumbers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="contactNumbers"
                touched={formik.touched.contactNumbers}
                error={formik.errors.contactNumbers}
                required
                placeholder="Ej: 30012345673012345678"
              />
            </div>
          </div>
          {/* datos del paciente */}
          {data ? (
            <>
              <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos del paciente (actualización):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="Tipo de Documento"
                    id="tipoDocumento"
                    value={data.documentRelation.name}
                    touched={formik.touched.tipoDocumento}
                    error={formik.errors.tipoDocumento}
                    required
                    readOnly
                  />
                </div>

                <div>
                  <Input
                    label="Email"
                    type="text"
                    id="email"
                    variant="default"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    touched={formik.touched.email}
                    error={formik.errors.email}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Telefono"
                    type="text"
                    id="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="phoneNumber"
                    touched={formik.touched.phoneNumber}
                    error={formik.errors.phoneNumber}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Segundo Numero de telefono"
                    type="text"
                    id="phoneNumber2"
                    value={formik.values.phoneNumber2 || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="phoneNumber2"
                    touched={formik.touched.phoneNumber2}
                    error={formik.errors.phoneNumber2}
                  />
                </div>
                <div>
                  <Input
                    label="Direccion de residencia:"
                    type="text"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address"
                    touched={formik.touched.address}
                    error={formik.errors.address}
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            error && <div className="text-red-500">{error}</div>
          )}

          {/* elemento = llamada telefonica */}
          {formik.values.elementDemand == "2" && (
            <>
              <div>
                <Input
                  label="Clasificación del seguimiento"
                  type="checkbox"
                  id="classification"
                  checked={formik.values.classification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="classification"
                  touched={formik.touched.classification}
                  error={formik.errors.classification}
                  helpText="Selecciona si la llamada es efectiva."
                />
              </div>

              {/* clasificacion === true (llamda efectiva) */}
              {formik.values.classification ? (
                <>
                  <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                    Datos de la llamada efectiva:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Input
                        label="Persona recibe llamada"
                        type="text"
                        id="acceptCall"
                        value={formik.values.acceptCall}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="acceptCall"
                        touched={formik.touched.acceptCall}
                        error={formik.errors.acceptCall}
                        placeholder="Ej: Juan Pérez"
                        required
                      />
                    </div>
                    <div>
                      <InputAutocompletado
                        apiRoute="relacion/demanda-inducida/buscar"
                        label="Relación con el usuario"
                        onInputChanged={(value) =>
                          formik.setFieldValue("relationshipUser", value)
                        }
                        error={
                          formik.touched.relationshipUser &&
                          formik.errors.relationshipUser
                            ? formik.errors.relationshipUser
                            : undefined
                        }
                        required
                        placeholder="Ej: Padre"
                        touched={formik.touched.relationshipUser}
                      />
                      {formik.touched.relationshipUser &&
                        formik.errors.relationshipUser && (
                          <div className="text-red-500">
                            {formik.errors.relationshipUser}
                          </div>
                        )}
                    </div>
                    <div>
                      <Input
                        label="Fecha llamada"
                        type="date"
                        id="dateCallWait"
                        value={formik.values.dateCall}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="dateCall"
                        touched={formik.touched.dateCall}
                        error={formik.errors.dateCall}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="Hora llamada"
                        type="time"
                        id="hourCall"
                        value={formik.values.hourCall}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="hourCall"
                        touched={formik.touched.hourCall}
                        error={formik.errors.hourCall}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="Texto llamada"
                        id="textCall"
                        value={formik.values.textCall}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        name="textCall"
                        touched={formik.touched.textCall}
                        error={formik.errors.textCall}
                        placeholder="Ej: Llamada realizada con éxito, paciente en buen estado de salud."
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="Dificultades para el acceso al tratamiento"
                        type="checkbox"
                        id="dificulties"
                        checked={formik.values.dificulties}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="dificulties"
                        touched={formik.touched.dificulties}
                        error={formik.errors.dificulties}
                      />
                    </div>

                    {/* presenta dificultades para asistir === true */}
                    {formik.values.dificulties && (
                      <>
                        <div>
                          <Input
                            label="Área de dificultades"
                            type="text"
                            id="areaDificulties"
                            value={formik.values.areaDificulties}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="areaDificulties"
                            touched={formik.touched.areaDificulties}
                            error={formik.errors.areaDificulties}
                            required
                          />
                        </div>
                        <div>
                          <InputAutocompletado
                            apiRoute="area-eps/demanda-inducida/buscar"
                            label="Área EPS"
                            onInputChanged={(value) =>
                              formik.setFieldValue("areaEps", value)
                            }
                            error={
                              formik.touched.areaEps && formik.errors.areaEps
                                ? formik.errors.areaEps
                                : undefined
                            }
                            required={true}
                            placeholder="Ej: Afiliaciones"
                            touched={formik.touched.areaEps}
                          />
                          {formik.touched.areaEps && formik.errors.areaEps && (
                            <div className="text-red-500">
                              {formik.errors.areaEps}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* otros campos llamada telefonica */}
                    <div>
                      <InputAutocompletado
                        apiRoute="resumen/demanda-inducida/buscar"
                        label="Resumen de la llamada"
                        onInputChanged={(value) =>
                          formik.setFieldValue("summaryCall", value)
                        }
                        error={formik.errors.summaryCall}
                        required={true}
                        placeholder="Ej: Educación de salud"
                        touched={formik.touched.summaryCall}
                      />
                      {formik.touched.summaryCall &&
                        formik.errors.summaryCall && (
                          <div className="text-red-500">
                            {formik.errors.summaryCall}
                          </div>
                        )}
                    </div>
                    <div>
                      <Input
                        label="Condición del usuario"
                        type="checkbox"
                        id="conditionUser"
                        checked={formik.values.conditionUser}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="conditionUser"
                        touched={formik.touched.conditionUser}
                        error={formik.errors.conditionUser}
                        helpText="Checkea si el usuario está vivo"
                      />
                    </div>
                    <div>
                      <Input
                        label="Soporte"
                        type="text"
                        id="suport"
                        value={formik.values.suport}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="suport"
                        touched={formik.touched.suport}
                        error={formik.errors.suport}
                        placeholder="Ej: Soporte brindado al paciente."
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <InputAutocompletado
                    apiRoute="resultado/demanda-inducida/buscar"
                    label="Resultado de la llamada no efectiva"
                    onInputChanged={(value) =>
                      formik.setFieldValue("resultCall", value)
                    }
                    error={
                      formik.touched.resultCall && formik.errors.resultCall
                        ? formik.errors.resultCall
                        : undefined
                    }
                    required={true}
                    placeholder="Ej: Otro"
                    touched={formik.touched.resultCall}
                  />
                  {formik.touched.resultCall && formik.errors.resultCall && (
                    <div className="text-red-500">
                      {formik.errors.resultCall}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* elemento = mensaje */}
          {formik.values.elementDemand == "1" && (
            <>
              <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos del mensaje enviado:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="Fecha de envío"
                    type="date"
                    id="dateSend"
                    value={formik.values.dateSend}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="dateSend"
                    touched={formik.touched.dateSend}
                    error={formik.errors.dateSend}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Hora de envío"
                    type="time"
                    id="hourSend"
                    value={formik.values.hourSend}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="hourSend"
                    touched={formik.touched.hourSend}
                    error={formik.errors.hourSend}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Texto de envío"
                    id="textSend"
                    value={formik.values.textSend}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="textSend"
                    touched={formik.touched.textSend}
                    error={formik.errors.textSend}
                    placeholder="Ej: Mensaje enviado con éxito, paciente informado."
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* elemento = visita preventiva de salud */}
          {formik.values.elementDemand == "4" && (
            <>
              <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos de la visita preventiva de salud:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="Fecha de visita"
                    type="date"
                    id="dateVisit"
                    value={formik.values.dateVisit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="dateVisit"
                    touched={formik.touched.dateVisit}
                    error={formik.errors.dateVisit}
                  />
                </div>
                <div>
                  <Input
                    label="Resumen de la visita"
                    id="sumaryVisit"
                    value={formik.values.sumaryVisit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="sumaryVisit"
                    touched={formik.touched.sumaryVisit}
                    error={formik.errors.sumaryVisit}
                    placeholder="Ej: Visita realizada con éxito, paciente en buen estado de salud."
                  />
                </div>
                <div>
                  <InputAutocompletado
                    apiRoute="motivo-visita/demanda-inducida/buscar"
                    label="Motivo de la visita no efectiva"
                    onInputChanged={(value) =>
                      formik.setFieldValue("reasonVisitNotEffective", value)
                    }
                    error={
                      formik.touched.reasonVisitNotEffective &&
                      formik.errors.reasonVisitNotEffective
                        ? formik.errors.reasonVisitNotEffective
                        : undefined
                    }
                    required={true}
                    placeholder="Ej: No esta interesado"
                    touched={formik.touched.reasonVisitNotEffective}
                  />
                  {formik.touched.reasonVisitNotEffective &&
                    formik.errors.reasonVisitNotEffective && (
                      <div className="text-red-500">
                        {formik.errors.reasonVisitNotEffective}
                      </div>
                    )}
                </div>
              </div>
            </>
          )}

          {/* campos finales */}
          <h4 className="p-2 mt-2 mb-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Datos finales de la demanda inducida:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <InputAutocompletado
                apiRoute="area-persona/demanda-inducida/buscar"
                label="Área de la persona que procesa"
                onInputChanged={(value) =>
                  formik.setFieldValue("areaPersonProcess", value)
                }
                error={
                  formik.touched.areaPersonProcess &&
                  formik.errors.areaPersonProcess
                    ? formik.errors.areaPersonProcess
                    : undefined
                }
                required={true}
                placeholder="Ej: PYMS"
                touched={formik.touched.areaPersonProcess}
              />
              {formik.touched.areaPersonProcess &&
                formik.errors.areaPersonProcess && (
                  <div className="text-red-500">
                    {formik.errors.areaPersonProcess}
                  </div>
                )}
            </div>
            <div>
              <InputAutocompletado
                apiRoute="programas/buscar"
                onInputChanged={(value) =>
                  formik.setFieldValue("programPerson", value)
                }
                label="Programa"
                touched={formik.touched.programPerson}
                error={formik.errors.programPerson}
                placeholder="Ej: Vacunación menores de 6"
                required={true}
              />
            </div>
            <div>
              <Input
                label="Fecha de asignación"
                type="date"
                id="assignmentDate"
                value={formik.values.assignmentDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="assignmentDate"
                touched={formik.touched.assignmentDate}
                error={formik.errors.assignmentDate}
                required={true}
              />
            </div>
            <div>
              <Select
                options={[
                  { value: "Medicina General", label: "Medicina General" },
                  { value: "Enfermería", label: "Enfermería" },
                ]}
                label="Profesional"
                id="profetional"
                value={formik.values.profetional}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="profetional"
                touched={formik.touched.profetional}
                error={formik.errors.profetional}
                required={true}
              />
            </div>
          </div>

            <AnimatePresence>
                {errorCreating && (
                  <div>
                    <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                      {errorCreating}
                    </div>
                  </div>
                )}
              </AnimatePresence>

        </div>
      </FormModal>
    </>
  );
};

export default ModalCreateDI;

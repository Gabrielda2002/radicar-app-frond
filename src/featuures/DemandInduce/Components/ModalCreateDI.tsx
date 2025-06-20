import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
import Input from "@/components/common/Ui/Input";
import { useFetchPaciente } from "@/hooks/useFetchPaciente";
import { useFormik } from "formik";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const ModalCreateDI = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [documento, setDocumento] = useState<string>("");

  const { data, error, getData } = useFetchPaciente();

  const validationSchema = Yup.object({
    document: Yup.string().required("El documento es obligatorio"),
    tipoDocumento: Yup.string().required("El tipo de documento es obligatorio"),
    elementDemand: Yup.string().required(
      "El elemento de demanda inducida es obligatorio"
    ),
    typeElementDemand: Yup.string().required(
      "El tipo de elemento de demanda inducida es obligatorio"
    ),
    objetive: Yup.string().required("El objetivo es obligatorio"),
    // actualizaciond e datos del paciente
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    phoneNumber: Yup.string().required("El número de teléfono es obligatorio"),
    phoneNumber2: Yup.string().optional(),
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
    areaDificulties: Yup.string().optional(),
    areaEps: Yup.string().optional(),
    summaryCall: Yup.string().optional(),
    conditionUser: Yup.boolean().optional(),
    suport: Yup.string().optional(),
    // resultado de la llamada no efectiva
    resultCall: Yup.string().when("classification", {
      is: (value: boolean) => value === false,
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
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      // Aquí puedes manejar el envío del formulario
    },
  });

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
      >
        <div className="grid grid-cols-4 gap-4">
          <div className="">
            <Input
              type="text"
              id="document"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              onBlur={() => getData(documento)}
              touched={formik.touched.document}
              error={formik.errors.document}
              label="Documento"
            />
            {error && (
            <div className="text-red-500">
              Error al buscar el paciente: {error}
            </div>
          )}
          </div>

          {data && (
            <>
              <div>
                <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                <select id="tipoDocumento" value={data.documentRelation.name}>
                  {data.documentRelation && (
                    <option value={data.documentRelation.id}>
                      {data.documentRelation.name}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <Input
                  label="Email"
                  type="text"
                  id="email"
                  variant="default"
                  value={data.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  touched={formik.touched.email}
                  error={formik.errors.email}
                />
              </div>
              <div>
                <Input
                  label="Telefono"
                  type="text"
                  id="phoneNumber"
                  value={data.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phoneNumber"
                  touched={formik.touched.phoneNumber}
                  error={formik.errors.phoneNumber}
                />
              </div>
              <div>
                <Input
                  label="Segundo Numero de telefono"
                  type="text"
                  id="phoneNumber2"
                  value={data.phoneNumber2 || ""}
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
                  value={data.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address"
                  touched={formik.touched.address}
                  error={formik.errors.address}
                />
              </div>
            </>
          )}

          <div>
            <InputAutocompletado
              apiRoute="elementos/demanda-inducida/buscar"
              label="Elemento de demanda inducida"
              onInputChanged={(value) => {
                formik.setFieldValue("elementDemand", value);
              }}
              error={
                formik.touched.elementDemand && !!formik.errors.elementDemand
              }
            />
            {formik.touched.elementDemand && formik.errors.elementDemand && (
              <div className="text-red-500">{formik.errors.elementDemand}</div>
            )}
          </div>

          <div>
            <InputAutocompletado
              apiRoute="tipo/demanda-inducida/buscar"
              label="Tipo de elemento de demanda inducida"
              onInputChanged={(value) => console.log(value)}
              error={false}
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
              onInputChanged={(value) => console.log(value)}
              error={false}
            />
            {formik.touched.objetive && formik.errors.objetive && (
              <div className="text-red-500">{formik.errors.objetive}</div>
            )}
          </div>

          {/* elemento = llamada telefonica */}
          {formik.values.elementDemand == "2" && (
            <>
              <div>
                <Input
                  type="checkbox"
                  id="classification"
                  checked={formik.values.classification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="classification"
                  label="Clasificación de la llamada"
                  touched={formik.touched.classification}
                  error={formik.errors.classification}
                />
              </div>

              {/* clasificacion === true (llamda efectiva) */}
              {formik.values.classification ? (
                <>
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
                    />
                  </div>

                  <div>
                    <Input
                      label="Relación con el usuario"
                      type="text"
                      id="relationshipUser"
                      value={formik.values.relationshipUser}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="relationshipUser"
                      touched={formik.touched.relationshipUser}
                      error={formik.errors.relationshipUser}
                    />
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
                    />
                  </div>
                  <div>
                    <Input
                      label="Hora llamada"
                      type="time"
                      id="dateCall"
                      value={formik.values.dateCall}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="hourCall"
                      touched={formik.touched.hourCall}
                      error={formik.errors.hourCall}
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
                        />
                      </div>
                      <div>
                        <Input
                          label="Área EPS"
                          type="text"
                          id="areaEps"
                          value={formik.values.areaEps}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="areaEps"
                          touched={formik.touched.areaEps}
                          error={formik.errors.areaEps}
                        />
                      </div>
                    </>
                  )}

                  {/* otros campos llamada telefonica */}
                  <div>
                    <Input
                      label="Resumen llamada"
                      type="text"
                      name="summaryCall"
                      id="summaryCall"
                      value={formik.values.summaryCall}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.summaryCall}
                      error={formik.errors.summaryCall}
                    />
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
                    />
                  </div>
                </>
              ) : (
                <div>
                  <Input
                    label="Resultado de la llamada no efectiva"
                    type="text"
                    id="resultCall"
                    value={formik.values.resultCall}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="resultCall"
                    touched={formik.touched.resultCall}
                    error={formik.errors.resultCall}
                  />
                </div>
              )}
            </>
          )}

          {/* elemento = mensaje */}
          {formik.values.elementDemand == "1" && (
            <>
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
                />
              </div>
            </>
          )}

          {/* elemento = visita preventiva de salud */}
          {formik.values.elementDemand == "4" && (
            <>
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
                />
              </div>
              <div>
                <Input
                  label="Motivo de la visita no efectiva"
                  type="text"
                  id="reasonVisitNotEffective"
                  value={formik.values.reasonVisitNotEffective}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="reasonVisitNotEffective"
                  touched={formik.touched.reasonVisitNotEffective}
                  error={formik.errors.reasonVisitNotEffective}
                />
              </div>
            </>
          )}

          {/* campos finales */}
          <div>
            <Input
              label="Área de la persona que procesa"
              type="text"
              id="areaPersonProcess"
              value={formik.values.areaPersonProcess}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="areaPersonProcess"
              touched={formik.touched.areaPersonProcess}
              error={formik.errors.areaPersonProcess}
            />
          </div>
          <div>
            <Input
              label="Programa"
              type="text"
              id="programPerson"
              value={formik.values.programPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="programPerson"
              touched={formik.touched.programPerson}
              error={formik.errors.programPerson}
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
            />
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalCreateDI;

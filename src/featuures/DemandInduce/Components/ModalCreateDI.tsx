import InputAutocompletado from "@/components/common/InputAutoCompletado/InputAutoCompletado";
import Button from "@/components/common/Ui/Button";
import FormModal from "@/components/common/Ui/FormModal";
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
        <div className="">
          <div className="">
            <label htmlFor="document">Documento:</label>
            <input
              type="text"
              id="document"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              onBlur={() => getData(documento)}
            />
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
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={data.email} />
              </div>
              <div>
                <label htmlFor="phoneNumber">Telefono:</label>
                <input type="text" id="phoneNumber" value={data.phoneNumber} />
              </div>
              <div>
                <label htmlFor="phoneNumber2">
                  Segundo Numero de telefono:
                </label>
                <input
                  type="text"
                  id="phoneNumber2"
                  value={data.phoneNumber2 || ""}
                />
              </div>
              <div>
                <label htmlFor="address">Direccion de residencia:</label>
                <input type="text" id="address" value={data.address} />
              </div>
            </>
          )}

          {error && (
            <div className="text-red-500">
              Error al buscar el paciente: {error}
            </div>
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
                <label htmlFor="classification">Clasificación:</label>
                <input
                  type="checkbox"
                  id="classification"
                  checked={formik.values.classification}
                  onChange={(e) =>
                    formik.setFieldValue("classification", e.target.checked)
                  }
                />
                {formik.touched.classification &&
                  formik.errors.classification && (
                    <div className="text-red-500">
                      {formik.errors.classification}
                    </div>
                  )}
              </div>
              {/* clasificacion === true (llamda efectiva) */}
              {formik.values.classification ? (
                <>
                  <div>
                    <label htmlFor="acceptCall">Persona recibe llamada:</label>
                    <input
                      type="text"
                      id="acceptCall"
                      value={formik.values.acceptCall}
                      onChange={(e) =>
                        formik.setFieldValue("acceptCall", e.target.value)
                      }
                    />
                    {formik.touched.acceptCall && formik.errors.acceptCall && (
                      <div className="text-red-500">
                        {formik.errors.acceptCall}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="relationshipUser">
                      Relación con el usuario:
                    </label>
                    <input
                      type="text"
                      id="relationshipUser"
                      value={formik.values.relationshipUser}
                      onChange={(e) =>
                        formik.setFieldValue("relationshipUser", e.target.value)
                      }
                    />
                    {formik.touched.relationshipUser &&
                      formik.errors.relationshipUser && (
                        <div className="text-red-500">
                          {formik.errors.relationshipUser}
                        </div>
                      )}
                  </div>
                  <div>
                    <label htmlFor="dateCallWait">Fecha llamada:</label>
                    <input
                      type="date"
                      id="dateCallWait"
                      value={formik.values.dateCall}
                      onChange={(e) =>
                        formik.setFieldValue("dateCallWait", e.target.value)
                      }
                    />
                    {formik.touched.dateCall && formik.errors.dateCall && (
                      <div className="text-red-500">
                        {formik.errors.dateCall}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="dateCall">Hora llamada:</label>
                    <input
                      type="time"
                      id="dateCall"
                      value={formik.values.dateCall}
                      onChange={(e) =>
                        formik.setFieldValue("dateCall", e.target.value)
                      }
                    />
                    {formik.touched.dateCall && formik.errors.dateCall && (
                      <div className="text-red-500">
                        {formik.errors.dateCall}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="textCall">Texto llamada:</label>
                    <textarea
                      id="textCall"
                      value={formik.values.textCall}
                      onChange={(e) =>
                        formik.setFieldValue("textCall", e.target.value)
                      }
                    />
                    {formik.touched.textCall && formik.errors.textCall && (
                      <div className="text-red-500">
                        {formik.errors.textCall}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dificulties">
                      Dificultades para el acceso al tratamiento?:
                    </label>
                    <input
                      type="checkbox"
                      id="dificulties"
                      checked={formik.values.dificulties}
                      onChange={(e) =>
                        formik.setFieldValue("dificulties", e.target.checked)
                      }
                    />
                    {formik.touched.dificulties &&
                      formik.errors.dificulties && (
                        <div className="text-red-500">
                          {formik.errors.dificulties}
                        </div>
                      )}
                  </div>
                  {/* presenta dificultades para asistir === true */}
                  {formik.values.dificulties && (
                    <>
                      <div>
                        <label htmlFor="areaDificulties">
                          Área de dificultades:
                        </label>
                        <input
                          type="text"
                          id="areaDificulties"
                          value={formik.values.areaDificulties}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "areaDificulties",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.areaDificulties &&
                          formik.errors.areaDificulties && (
                            <div className="text-red-500">
                              {formik.errors.areaDificulties}
                            </div>
                          )}
                      </div>
                      <div>
                        <label htmlFor="areaEps">Área EPS:</label>
                        <input
                          type="text"
                          id="areaEps"
                          value={formik.values.areaEps}
                          onChange={(e) =>
                            formik.setFieldValue("areaEps", e.target.value)
                          }
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
                    <label htmlFor="summaryCall">Resumen llamada:</label>
                    <textarea
                      id="summaryCall"
                      value={formik.values.summaryCall}
                      onChange={(e) =>
                        formik.setFieldValue("summaryCall", e.target.value)
                      }
                    />
                    {formik.touched.summaryCall &&
                      formik.errors.summaryCall && (
                        <div className="text-red-500">
                          {formik.errors.summaryCall}
                        </div>
                      )}
                  </div>
                  <div>
                    <label htmlFor="conditionUser">
                      Condición del usuario:
                    </label>
                    <input
                      type="checkbox"
                      id="conditionUser"
                      checked={formik.values.conditionUser}
                      onChange={(e) =>
                        formik.setFieldValue("conditionUser", e.target.checked)
                      }
                    />
                    {formik.touched.conditionUser &&
                      formik.errors.conditionUser && (
                        <div className="text-red-500">
                          {formik.errors.conditionUser}
                        </div>
                      )}
                  </div>
                  <div>
                    <label htmlFor="suport">Soportes:</label>
                    <input
                      type="text"
                      id="suport"
                      value={formik.values.suport}
                      onChange={(e) =>
                        formik.setFieldValue("suport", e.target.value)
                      }
                    />
                    {formik.touched.suport && formik.errors.suport && (
                      <div className="text-red-500">{formik.errors.suport}</div>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="resultCall">
                    Resultado de la llamada no efectiva:
                  </label>
                  <input
                    type="text"
                    id="resultCall"
                    value={formik.values.resultCall}
                    onChange={(e) =>
                      formik.setFieldValue("resultCall", e.target.value)
                    }
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
              <div>
                <label htmlFor="dateSend">Fecha de envío:</label>
                <input
                  type="date"
                  id="dateSend"
                  value={formik.values.dateSend}
                  onChange={(e) =>
                    formik.setFieldValue("dateSend", e.target.value)
                  }
                />
                {formik.touched.dateSend && formik.errors.dateSend && (
                  <div className="text-red-500">{formik.errors.dateSend}</div>
                )}
              </div>
              <div>
                <label htmlFor="hourSend">Hora de envío:</label>
                <input
                  type="time"
                  id="hourSend"
                  value={formik.values.hourSend}
                  onChange={(e) =>
                    formik.setFieldValue("hourSend", e.target.value)
                  }
                />
                {formik.touched.hourSend && formik.errors.hourSend && (
                  <div className="text-red-500">{formik.errors.hourSend}</div>
                )}
              </div>
              <div>
                <label htmlFor="textSend">Texto de envío:</label>
                <textarea
                  id="textSend"
                  value={formik.values.textSend}
                  onChange={(e) =>
                    formik.setFieldValue("textSend", e.target.value)
                  }
                />
                {formik.touched.textSend && formik.errors.textSend && (
                  <div className="text-red-500">{formik.errors.textSend}</div>
                )}
              </div>
            </>
          )}

          {/* elemento = visita preventiva de salud */}
          {formik.values.elementDemand == "4" && (
            <>
              <div>
                <label htmlFor="dateVisit">Fecha de visita:</label>
                <input
                  type="date"
                  id="dateVisit"
                  value={formik.values.dateVisit}
                  onChange={(e) =>
                    formik.setFieldValue("dateVisit", e.target.value)
                  }
                />
                {formik.touched.dateVisit && formik.errors.dateVisit && (
                  <div className="text-red-500">{formik.errors.dateVisit}</div>
                )}
              </div>
              <div>
                <label htmlFor="sumaryVisit">Resumen de la visita:</label>
                <textarea
                  id="sumaryVisit"
                  value={formik.values.sumaryVisit}
                  onChange={(e) =>
                    formik.setFieldValue("sumaryVisit", e.target.value)
                  }
                />
                {formik.touched.sumaryVisit && formik.errors.sumaryVisit && (
                  <div className="text-red-500">
                    {formik.errors.sumaryVisit}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="reasonVisitNotEffective">
                  Motivo de la visita no efectiva:
                </label>
                <input
                  type="text"
                  id="reasonVisitNotEffective"
                  value={formik.values.reasonVisitNotEffective}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "reasonVisitNotEffective",
                      e.target.value
                    )
                  }
                />
                {formik.touched.reasonVisitNotEffective &&
                  formik.errors.reasonVisitNotEffective && (
                    <div className="text-red-500">
                      {formik.errors.reasonVisitNotEffective}
                    </div>
                  )}
              </div>
            </>
          )}

          {/* campos finales */}
          <div>
            <label htmlFor="areaPersonProcess">
              Área de la persona que procesa:
            </label>
            <input
              type="text"
              id="areaPersonProcess"
              value={formik.values.areaPersonProcess}
              onChange={(e) =>
                formik.setFieldValue("areaPersonProcess", e.target.value)
              }
            />
            {formik.touched.areaPersonProcess &&
              formik.errors.areaPersonProcess && (
                <div className="text-red-500">
                  {formik.errors.areaPersonProcess}
                </div>
              )}
          </div>
          <div>
            <label htmlFor="programPerson">Programa:</label>
            <input
              type="text"
              id="programPerson"
              value={formik.values.programPerson}
              onChange={(e) =>
                formik.setFieldValue("programPerson", e.target.value)
              }
            />
            {formik.touched.programPerson && formik.errors.programPerson && (
              <div className="text-red-500">{formik.errors.programPerson}</div>
            )}
          </div>
          <div>
            <label htmlFor="assignmentDate">Fecha de asignación:</label>
            <input
              type="date"
              id="assignmentDate"
              value={formik.values.assignmentDate}
              onChange={(e) =>
                formik.setFieldValue("assignmentDate", e.target.value)
              }
            />
            {formik.touched.assignmentDate && formik.errors.assignmentDate && (
              <div className="text-red-500">{formik.errors.assignmentDate}</div>
            )}
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default ModalCreateDI;

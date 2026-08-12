import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Save, ArrowLeft } from "lucide-react";
import { api } from "@/utils/api-config";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import type { SelectOption } from "@/components/common/Ui/Select";
import Textarea from "@/components/common/Ui/Textarea";
import BuscadorPaciente from "@/components/common/BuscadorPaciente";
import { useStorePqrsdf } from "@/featuures/Pqrsdf/store/useStorePqrsdf";
import {
  IPqrsdf,
  IPqrsdfFormValues,
  PRESENTADO_POR_OPTIONS,
  CLASIFICACION_OPTIONS,
  INSTANCIA_OPTIONS,
  MEDIO_RECEPCION_OPTIONS,
  ESTADO_OPTIONS,
  MEDIO_NOTIFICACION_OPTIONS,
  ATRIBUTO_AFECTADO_OPTIONS,
  CatalogoItem,
} from "@/featuures/Pqrsdf/models/IPqrsdf";
import { IPacientes } from "@/models/IPacientes";

interface PqrsdfFormularioProps {
  initialData?: IPqrsdf | null;
}
/** Convierte un array de { id, name } en SelectOption[] */
const toSelectOptions = (items: CatalogoItem[]): SelectOption[] =>
  items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

//* Esquema de validación Yup
const validationSchema = Yup.object({
  patientId: Yup.number()
    .typeError("Debe buscar un paciente")
    .min(1, "Debe buscar un paciente")
    .required("Debe buscar un paciente"),
  populationTypeId: Yup.number()
    .typeError("Requerido")
    .min(1, "Requerido")
    .required("Requerido"),
  presentedBy: Yup.string().required("Requerido"),
  presenterName: Yup.string().when("presentedBy", {
    is: (val: string) => val && val !== "USUARIO_AFECTADO",
    then: (schema) =>
      schema.required("Requerido cuando no es el usuario afectado"),
    otherwise: (schema) => schema.notRequired(),
  }),
  classification: Yup.string().required("Requerido"),
  instance: Yup.string().required("Requerido"),
  receptionMedium: Yup.string().required("Requerido"),
  originAreaId: Yup.number()
    .typeError("Requerido")
    .min(1, "Requerido")
    .required("Requerido"),
  generalReasonId: Yup.number()
    .typeError("Requerido")
    .min(1, "Requerido")
    .required("Requerido"),
  generationAreaId: Yup.number()
    .typeError("Requerido")
    .min(1, "Requerido")
    .required("Requerido"),
  description: Yup.string().required("Requerido"),
  specificReason: Yup.string().required("Requerido"),
  pqrsDate: Yup.string().required("Requerido"),
  receivedDate: Yup.string().required("Requerido"),
  // Resolución — opcionales en create, editables en edit
  status: Yup.string().notRequired(),
  resolutionAreaId: Yup.number()
    .nullable()
    .when("status", {
      is: "CERRADO",
      then: (schema) =>
        schema
          .typeError("Requerido")
          .min(1, "Requerido")
          .required("Requerido"),
      otherwise: (schema) => schema.notRequired(),
    }),
  responseDate: Yup.string().when("status", {
    is: "CERRADO",
    then: (schema) => schema.required("Requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
  responseSummary: Yup.string().notRequired(),
  notificationMedium: Yup.string().when("status", {
    is: "CERRADO",
    then: (schema) => schema.required("Requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
  affectedAttribute: Yup.string().when("status", {
    is: "CERRADO",
    then: (schema) => schema.required("Requerido"),
    otherwise: (schema) => schema.notRequired(),
  }),
  improvementAction: Yup.boolean().notRequired(),
  filingNumber: Yup.number().required('Requerido'),
  riskCode: Yup.string().required('Requerido'),
  improvementActionDetails: Yup.string().when("improvementAction", {
    is:  (val: boolean) => val === true,
    then: (schema) => schema.required("Requerido cuando hay acción de mejora"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

//* Valores iniciales del formulario (creación)
const emptyInitialValues: IPqrsdfFormValues = {
  patientId: "",
  populationTypeId: "",
  presentedBy: "",
  presenterName: "",
  classification: "",
  instance: "",
  receptionMedium: "",
  originAreaId: 0,
  generalReasonId: "",
  generationAreaId: "",
  description: "",
  specificReason: "",
  pqrsDate: "",
  receivedDate: "",
  status: undefined,
  resolutionAreaId: 0,
  responseDate: "",
  responseSummary: "",
  notificationMedium: "",
  affectedAttribute: "",
  improvementAction: false,
  filingNumber: 0,
  riskCode: "",
  improvementActionDetails: ''
};

//* Convierte datos del backend (IPqrsdf) a valores del formulario
const pqrsdfToFormValues = (pqrsdf: IPqrsdf): IPqrsdfFormValues => ({
  patientId: pqrsdf.patientId,
  populationTypeId: pqrsdf.populationTypeId,
  presentedBy: pqrsdf.presentedBy,
  presenterName: pqrsdf.presenterName || "",
  classification: pqrsdf.classification,
  instance: pqrsdf.instance,
  receptionMedium: pqrsdf.receptionMedium,
  originAreaId: pqrsdf.originAreaId,
  generalReasonId: pqrsdf.generalReasonId,
  generationAreaId: pqrsdf.generationAreaId || 0,
  description: pqrsdf.description,
  specificReason: pqrsdf.specificReason || "",
  pqrsDate: pqrsdf.pqrsDate.toString(),
  receivedDate: pqrsdf.receivedDate.toString(),
  status: pqrsdf.status,
  filingNumber: pqrsdf.filingNumber,
  resolutionAreaId: pqrsdf.resolutionAreaId || 0,
  responseDate: pqrsdf.responseDate?.toString(),
  notificationMedium: pqrsdf.notificationMedium || "",
  affectedAttribute: pqrsdf.affectedAttribute || "",
  improvementAction: pqrsdf.improvementAction || false,
  riskCode: pqrsdf.riskCode,
  improvementActionDetails: pqrsdf.improvementActionDetails || ''
});

const PqrsdfFormulario: React.FC<PqrsdfFormularioProps> = ({
  initialData = null,
}) => {
  const navigate = useNavigate();
  const { createPqrsdf, updatePqrsdf, isLoading, error } = useStorePqrsdf();

  const isEditMode = !!initialData;
  const pqrsdfId = initialData?.id;

  //* Catálogos — se cargan al montar
  const [areas, setAreas] = useState<CatalogoItem[]>([]);
  const [populations, setPopulations] = useState<CatalogoItem[]>([]);
  const [reasons, setReasons] = useState<CatalogoItem[]>([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [resAreas, resPop, resReasons] = await Promise.all([
          api.get("/pqrs-areas"),
          api.get("/pqrs-population-types"),
          api.get("/pqrs-general-reasons"),
        ]);
        if (resAreas.status === 200) setAreas(resAreas.data);
        if (resPop.status === 200) setPopulations(resPop.data);
        if (resReasons.status === 200) setReasons(resReasons.data);
      } catch {
        toast.error("Error al cargar catálogos");
      } finally {
        setLoadingCatalogos(false);
      }
    };
    cargarCatalogos();
  }, []);

  const formik = useFormik<IPqrsdfFormValues>({
    initialValues: initialData
      ? pqrsdfToFormValues(initialData)
      : emptyInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (isEditMode && pqrsdfId) {
        await updatePqrsdf(pqrsdfId, values, () => {
          toast.success("PQRSDF actualizado exitosamente");
          navigate(`/pqrsdf`);
        });
      } else {
        await createPqrsdf(values, () => {
          toast.success("PQRSDF creado exitosamente");
          navigate("/pqrsdf");
        });
      }
    },
  });

  //* Callback del BuscadorPaciente → asigna patientId al form
  const handlePatientFound = (patient: IPacientes) => {
    formik.setFieldValue("patientId", patient.id);
    formik.setFieldTouched("patientId", true, false);
  };

  return (
    <>
      <HeaderPage
        title={isEditMode ? "Editar PQRSDF" : "Nuevo PQRSDF"}
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "PQRSDF", path: "/pqrsdf" },
          {
            label: isEditMode ? "Editar PQRSDF" : "Nuevo PQRSDF",
            path: isEditMode ? `/pqrsdf/${pqrsdfId}` : "/pqrsdf/nueva",
          },
        ]}
        duration={300}
      />

      <div className="px-4 pb-8 mx-auto max-w-6xl">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* ── Sección 1: Datos del Paciente ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            {isEditMode ? (
              <>
                <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                  Datos del Paciente:
                </h5>
                <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Paciente:{" "}
                    <span className="font-semibold">
                      {initialData?.patientName}
                    </span>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    Documento: {initialData?.patientDocument}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    Documento: {initialData?.patientDocument}
                  </p>
                </div>
              </>
            ) : (
              <BuscadorPaciente
                onPatientFound={handlePatientFound}
                disabled={formik.isSubmitting}
                renderPatientInfo={(patient) => (
                  <>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Paciente encontrado:{" "}
                      <span className="font-semibold">{patient.name}</span>
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-300">
                      Documento: {patient.documentNumber}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-300">
                      Tipo de Documento: {patient?.documentRelation?.name}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-300">
                      Convenio: {patient?.convenioRelation?.name}
                    </p>
                  </>
                )}
              />
            )}
          </section>

          {/* ── Sección 2: Tipo de Población ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Población:
            </h5>
            <Select
              label="Tipo de Población"
              name="populationTypeId"
              value={formik.values.populationTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.populationTypeId &&
                  formik.errors.populationTypeId
                  ? formik.errors.populationTypeId
                  : undefined
              }
              touched={formik.touched.populationTypeId as boolean}
              required
              disabled={
                loadingCatalogos || isEditMode || formik.isSubmitting
              }
              options={toSelectOptions(populations)}
            />
          </section>

          {/* ── Sección 3: Presentado Por ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Origen del PQRSDF:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Presentado por"
                name="presentedBy"
                value={formik.values.presentedBy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.presentedBy && formik.errors.presentedBy
                    ? formik.errors.presentedBy
                    : undefined
                }
                touched={formik.touched.presentedBy as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
                options={PRESENTADO_POR_OPTIONS}
              />
              <Input
                type="text"
                label="Nombre del presentador"
                name="presenterName"
                value={formik.values.presenterName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.presenterName &&
                    formik.errors.presenterName
                    ? formik.errors.presenterName
                    : undefined
                }
                touched={formik.touched.presenterName as boolean}
                disabled={isEditMode || formik.isSubmitting}
              />
            </div>
          </section>

          {/* ── Sección 4: Clasificación, Instancia, Medio Recepción ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Clasificación:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Select
                label="Clasificación"
                name="classification"
                value={formik.values.classification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.classification &&
                    formik.errors.classification
                    ? formik.errors.classification
                    : undefined
                }
                touched={formik.touched.classification as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
                options={CLASIFICACION_OPTIONS}
              />
              <Select
                label="Instancia"
                name="instance"
                value={formik.values.instance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.instance && formik.errors.instance
                    ? formik.errors.instance
                    : undefined
                }
                touched={formik.touched.instance as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
                options={INSTANCIA_OPTIONS}
              />
              <Select
                label="Medio de Recepción"
                name="receptionMedium"
                value={formik.values.receptionMedium}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.receptionMedium &&
                    formik.errors.receptionMedium
                    ? formik.errors.receptionMedium
                    : undefined
                }
                touched={formik.touched.receptionMedium as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
                options={MEDIO_RECEPCION_OPTIONS}
              />
            </div>
          </section>

          {/* ── Sección 5: Áreas y Motivo ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Áreas y Motivo:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Select
                label="Área de Origen"
                name="originAreaId"
                value={formik.values.originAreaId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.originAreaId && formik.errors.originAreaId
                    ? formik.errors.originAreaId
                    : undefined
                }
                touched={formik.touched.originAreaId as boolean}
                required
                disabled={
                  loadingCatalogos || isEditMode || formik.isSubmitting
                }
                options={toSelectOptions(areas)}
              />
              <Select
                label="Motivo General"
                name="generalReasonId"
                value={formik.values.generalReasonId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.generalReasonId &&
                    formik.errors.generalReasonId
                    ? formik.errors.generalReasonId
                    : undefined
                }
                touched={formik.touched.generalReasonId as boolean}
                required
                disabled={
                  loadingCatalogos || isEditMode || formik.isSubmitting
                }
                options={toSelectOptions(reasons)}
              />
              <Select
                label="Área de Generación"
                name="generationAreaId"
                value={formik.values.generationAreaId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.generationAreaId &&
                    formik.errors.generationAreaId
                    ? formik.errors.generationAreaId
                    : undefined
                }
                touched={formik.touched.generationAreaId as boolean}
                required
                disabled={
                  loadingCatalogos || isEditMode || formik.isSubmitting
                }
                options={toSelectOptions(areas)}
              />
            </div>
          </section>

          {/* ── Sección 6: Descripción y Motivo Específico ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Detalle del PQRSDF:
            </h5>
            <div className="space-y-4">
              <Textarea
                label="Descripción"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : undefined
                }
                touched={formik.touched.description as boolean}
                required
                disabled={formik.isSubmitting}
                minRows={4}
              />
              <Input
                type="text"
                label="Motivo Específico"
                name="specificReason"
                value={formik.values.specificReason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.specificReason &&
                    formik.errors.specificReason
                    ? formik.errors.specificReason
                    : undefined
                }
                touched={formik.touched.specificReason as boolean}
                required
                disabled={formik.isSubmitting}
              />
              <Input
                type="number"
                label="Número de Radicado"
                name="filingNumber"
                value={formik.values.filingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.filingNumber && formik.errors.filingNumber
                    ? formik.errors.filingNumber
                    : undefined
                }
                touched={formik.touched.filingNumber as boolean}
                required
                disabled={formik.isSubmitting}
              />
              <Select
                label="Código de Riesgo"
                options={[
                  { value: "VITAL", label: "Vital" },
                  { value: "PRIORIZADO", label: "Priorizado" },
                  { value: "SIMPLE", label: "Simple" },
                  { value: "GENERAL", label: "General" },
                ]}
                name="riskCode"
                value={formik.values.riskCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.riskCode && formik.errors.riskCode
                    ? formik.errors.riskCode
                    : undefined
                }
                touched={formik.touched.riskCode as boolean}
                required
                disabled={formik.isSubmitting}
              />
            </div>
          </section>

          {/* ── Sección 7: Fechas ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Fechas:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="date"
                label="Fecha PQRS"
                name="pqrsDate"
                value={formik.values.pqrsDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pqrsDate && formik.errors.pqrsDate
                    ? formik.errors.pqrsDate
                    : undefined
                }
                touched={formik.touched.pqrsDate as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
              />
              <Input
                type="date"
                label="Fecha Recibido"
                name="receivedDate"
                value={formik.values.receivedDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.receivedDate && formik.errors.receivedDate
                    ? formik.errors.receivedDate
                    : undefined
                }
                touched={formik.touched.receivedDate as boolean}
                required
                disabled={isEditMode || formik.isSubmitting}
              />
            </div>
          </section>

          {/* ── Sección 8: Resolución (solo en modo edición) ── */}
          {isEditMode && (
            <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
              <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Resolución:
              </h5>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Select
                    label="Estado"
                    name="status"
                    value={formik.values.status || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.status && formik.errors.status
                        ? formik.errors.status
                        : undefined
                    }
                    touched={formik.touched.status as boolean}
                    disabled={formik.isSubmitting}
                    options={ESTADO_OPTIONS}
                  />
                  <Select
                    label="Área de Resolución"
                    name="resolutionAreaId"
                    value={formik.values.resolutionAreaId || 0}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.resolutionAreaId &&
                        formik.errors.resolutionAreaId
                        ? formik.errors.resolutionAreaId
                        : undefined
                    }
                    touched={formik.touched.resolutionAreaId as boolean}
                    disabled={loadingCatalogos || formik.isSubmitting}
                    options={toSelectOptions(areas)}
                  />
                  <Input
                    type="date"
                    label="Fecha de Respuesta"
                    name="responseDate"
                    value={formik.values.responseDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.responseDate &&
                        formik.errors.responseDate
                        ? formik.errors.responseDate
                        : undefined
                    }
                    touched={formik.touched.responseDate as boolean}
                    disabled={formik.isSubmitting}
                  />
                </div>
                <Textarea
                  label="Resumen de Respuesta"
                  name="responseSummary"
                  value={formik.values.responseSummary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.responseSummary &&
                      formik.errors.responseSummary
                      ? formik.errors.responseSummary
                      : undefined
                  }
                  touched={formik.touched.responseSummary as boolean}
                  disabled={formik.isSubmitting}
                  minRows={3}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Select
                    label="Medio de Notificación"
                    name="notificationMedium"
                    value={formik.values.notificationMedium}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.notificationMedium &&
                        formik.errors.notificationMedium
                        ? formik.errors.notificationMedium
                        : undefined
                    }
                    touched={formik.touched.notificationMedium as boolean}
                    disabled={formik.isSubmitting}
                    options={MEDIO_NOTIFICACION_OPTIONS}
                  />
                  <Select
                    label="Atributo Afectado"
                    name="affectedAttribute"
                    value={formik.values.affectedAttribute}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.affectedAttribute &&
                        formik.errors.affectedAttribute
                        ? formik.errors.affectedAttribute
                        : undefined
                    }
                    touched={formik.touched.affectedAttribute as boolean}
                    disabled={formik.isSubmitting}
                    options={ATRIBUTO_AFECTADO_OPTIONS}
                  />
                </div>
                <Input
                  type="checkbox"
                  label="Acción de Mejora"
                  variant="checkbox"
                  name="improvementAction"
                  onChange={formik.handleChange}
                  checked={formik.values.improvementAction}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.improvementAction &&
                      formik.errors.improvementAction
                      ? formik.errors.improvementAction
                      : undefined
                  }
                  touched={formik.touched.improvementAction as boolean}
                  disabled={formik.isSubmitting}
                />
              </div>
              {formik.values.improvementAction && (
                <Textarea
                  label="Detalles de la Acción de Mejora"
                  name="improvementActionDetails"
                  value={formik.values.improvementActionDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.improvementActionDetails &&
                      formik.errors.improvementActionDetails
                      ? formik.errors.improvementActionDetails
                      : undefined
                  }
                  touched={formik.touched.improvementActionDetails as boolean}
                  disabled={formik.isSubmitting}
                />
              )}
            </section>
          )}

          {/* ── Error del store ── */}
          {error && (
            <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {/* ── Botones de acción ── */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              icon={<ArrowLeft className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => navigate("/pqrsdf")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={<Save className="w-5 h-5" />}
              iconPosition="left"
              isLoading={isLoading}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {isEditMode ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PqrsdfFormulario;

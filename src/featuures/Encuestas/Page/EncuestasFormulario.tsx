import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { api } from "@/utils/api-config";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Button from "@/components/common/Ui/Button";
import Select from "@/components/common/Ui/Select";
import type { SelectOption } from "@/components/common/Ui/Select";
import BuscadorPaciente from "@/components/common/BuscadorPaciente";
import GridSiNoNa from "@/featuures/Encuestas/Components/GridSiNoNa";
import { useStoreEncuestas } from "@/featuures/Encuestas/store/useStoreEncuestas";
import {
  Calificacion,
  ENUM_LABELS,
  ExperienciaGlobal,
  Recomendacion,
  IEncuestaFormValues,
  IEncuestaSatisfaccion,
} from "@/models/IEncuestaSatisfaccion";
import { Save, ArrowLeft } from "lucide-react";
import { IPacientes } from "@/models/IPacientes";

interface EncuestasFormularioProps {
  /** Datos iniciales para modo edición (cuando se usa embebido desde Detalle) */
  initialData?: IEncuestaSatisfaccion | null;
}

//* Catálogos genéricos
interface CatalogoItem {
  id: number;
  name: string;
}

/** Convierte un array de { id, nombre } en SelectOption[] */
const toSelectOptions = (items: CatalogoItem[]): SelectOption[] =>
  items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

//* Esquema de validación Yup — todos los campos requeridos
const validationSchema = Yup.object({
  patientId: Yup.number()
    .typeError("Debe buscar un paciente")
    .required("Debe buscar un paciente"),
  municipalityId: Yup.number()
    .typeError("Seleccione un municipio")
    .required("El municipio es obligatorio"),
  specialPopulationId: Yup.number()
    .typeError("Seleccione una población especial")
    .required("La población especial es obligatoria"),
  attentionServiceId: Yup.number()
    .typeError("Seleccione un servicio de atención")
    .required("El servicio de atención es obligatorio"),
  timelyAppointment: Yup.string().required("Esta pregunta es obligatoria"),
  punctualCare: Yup.string().required("Esta pregunta es obligatoria"),
  professionalInterest: Yup.string().required("Esta pregunta es obligatoria"),
  clearRecommendations: Yup.string().required("Esta pregunta es obligatoria"),
  signageHelped: Yup.string().required("Esta pregunta es obligatoria"),
  adequateFacilities: Yup.string().required("Esta pregunta es obligatoria"),
  cleanFacilities: Yup.string().required("Esta pregunta es obligatoria"),
  professionalCareRating: Yup.string().required("Seleccione una calificación"),
  customerServiceRating: Yup.string().required("Seleccione una calificación"),
  globalExperience: Yup.string().required("Seleccione una opción"),
  wouldRecommend: Yup.string().required("Seleccione una opción"),
});

//* Valores iniciales del formulario
const emptyInitialValues: IEncuestaFormValues = {
  patientId: "",
  municipalityId: "",
  specialPopulationId: "",
  attentionServiceId: "",
  timelyAppointment: "",
  punctualCare: "",
  professionalInterest: "",
  clearRecommendations: "",
  signageHelped: "",
  adequateFacilities: "",
  cleanFacilities: "",
  professionalCareRating: "",
  customerServiceRating: "",
  globalExperience: "",
  wouldRecommend: "",
};

//* Convierte datos del backend (IEncuestaSatisfaccion) a valores del formulario
const surveyToFormValues = (
  survey: IEncuestaSatisfaccion
): IEncuestaFormValues => ({
  patientId: survey.patientId ?? "",
  municipalityId: survey.municipalityId ?? "",
  specialPopulationId: survey.specialPopulationId ?? "",
  attentionServiceId: survey.attentionServiceId ?? "",
  timelyAppointment: survey.timelyAppointment ?? "",
  punctualCare: survey.punctualCare ?? "",
  professionalInterest: survey.professionalInterest ?? "",
  clearRecommendations: survey.clearRecommendations ?? "",
  signageHelped: survey.signageHelped ?? "",
  adequateFacilities: survey.adequateFacilities ?? "",
  cleanFacilities: survey.cleanFacilities ?? "",
  professionalCareRating: survey.professionalCareRating ?? "",
  customerServiceRating: survey.customerServiceRating ?? "",
  globalExperience: survey.globalExperience ?? "",
  wouldRecommend: survey.wouldRecommend ?? "",
});

const EncuestasFormulario: React.FC<EncuestasFormularioProps> = ({
  initialData = null,
}) => {

  console.log(EncuestasFormulario)
  const navigate = useNavigate();
  const { createSurvey, updateSurvey, isLoading, error } = useStoreEncuestas();

  const isEditing = initialData !== null;
  const surveyId = initialData?.id;

  //* Catálogos — se cargan al montar
  const [municipios, setMunicipios] = useState<CatalogoItem[]>([]);
  const [poblaciones, setPoblaciones] = useState<CatalogoItem[]>([]);
  const [servicios, setServicios] = useState<CatalogoItem[]>([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [resMuni, resPob, resServ] = await Promise.all([
          api.get("/municipios"),
          api.get("/special-populations"),
          api.get("/attention-services"),
        ]);
        if (resMuni.status === 200) setMunicipios(resMuni.data);
        if (resPob.status === 200) setPoblaciones(resPob.data);
        if (resServ.status === 200) setServicios(resServ.data);
      } catch (err: unknown) {
        console.error("Error al cargar catálogos:", err);
      } finally {
        setLoadingCatalogos(false);
      }
    };
    cargarCatalogos();
  }, []);

  const formik = useFormik<IEncuestaFormValues>({
    initialValues: initialData
      ? surveyToFormValues(initialData)
      : emptyInitialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {

      if (isEditing && surveyId) {
        await updateSurvey(surveyId, values, () => {
          toast.success("Encuesta actualizada exitosamente");
          navigate(`/encuestas`);
        });
      } else {
        await createSurvey(values, () => {
          toast.success("Encuesta creada exitosamente");
          navigate("/encuestas");
        });
      }
    },
  });

  const handlePatientFound = (patient: IPacientes) => {
    formik.setFieldValue("patientId", patient.id);
    formik.setFieldTouched("patientId", true, false);
  };

  //* Opciones para los Selects de calificación y experiencia global
  const calificacionOptions: SelectOption[] = Object.values(Calificacion).map(
    (val) => ({
      value: val,
      label: ENUM_LABELS.Calificacion[val],
    })
  );

  const experienciaOptions: SelectOption[] = Object.values(
    ExperienciaGlobal
  ).map((val) => ({
    value: val,
    label: ENUM_LABELS.ExperienciaGlobal[val],
  }));

  const recomendacionOptions: SelectOption[] = Object.values(Recomendacion).map(
    (val) => ({
      value: val,
      label: ENUM_LABELS.Recomendacion[val],
    })
  );

  return (
    <>
      <HeaderPage
        title={isEditing ? "Editar Encuesta" : "Nueva Encuesta"}
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "Encuestas de Satisfacción", path: "/encuestas" },
          {
            label: isEditing ? "Editar Encuesta" : "Nueva Encuesta",
            path: isEditing
              ? `/encuestas/${surveyId}`
              : "/encuestas/nueva",
          },
        ]}
        duration={300}
      />

      <div className="px-4 pb-8 mx-auto max-w-6xl">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* ── Sección 1: Datos del Paciente ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <BuscadorPaciente
              onPatientFound={handlePatientFound}
              disabled={isEditing || formik.isSubmitting}
              renderPatientInfo={(patient) => (
                <>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Paciente encontrado:{" "}
                    <span className="font-semibold">{patient.name}</span>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    Documento: {patient.documentNumber}
                  </p>
                  {patient.convenioRelation && (
                    <p className="text-xs text-green-600 dark:text-green-300">
                      Convenio: {patient.convenioRelation.name}
                    </p>
                  )}
                </>
              )}
            />
          </section>

          {/* ── Sección 2: Municipio ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Ubicación:
            </h5>
            <Select
              label="Municipio"
              name="municipalityId"
              value={formik.values.municipalityId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.municipalityId && formik.errors.municipalityId
                  ? formik.errors.municipalityId
                  : undefined
              }
              touched={formik.touched.municipalityId as boolean}
              required
              disabled={loadingCatalogos || formik.isSubmitting}
              options={toSelectOptions(municipios)}
            />
          </section>

          {/* ── Sección 3: Población Especial ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Población:
            </h5>
            <Select
              label="Población Especial"
              name="specialPopulationId"
              value={formik.values.specialPopulationId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.specialPopulationId &&
                formik.errors.specialPopulationId
                  ? formik.errors.specialPopulationId
                  : undefined
              }
              touched={formik.touched.specialPopulationId as boolean}
              required
              disabled={loadingCatalogos || formik.isSubmitting}
              options={toSelectOptions(poblaciones)}
            />
          </section>

          {/* ── Sección 4: Servicio de Atención ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Servicio:
            </h5>
            <Select
              label="Servicio de Atención"
              name="attentionServiceId"
              value={formik.values.attentionServiceId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.attentionServiceId &&
                formik.errors.attentionServiceId
                  ? formik.errors.attentionServiceId
                  : undefined
              }
              touched={formik.touched.attentionServiceId as boolean}
              required
              disabled={loadingCatalogos || formik.isSubmitting}
              options={toSelectOptions(servicios)}
            />
          </section>

          {/* ── Sección 5: Grid SI/NO/NA ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <GridSiNoNa
              formik={formik}
              disabled={formik.isSubmitting}
            />
          </section>

          {/* ── Sección 6: Calificaciones ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Calificación:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Calificación Atención"
                name="professionalCareRating"
                value={formik.values.professionalCareRating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.professionalCareRating &&
                  formik.errors.professionalCareRating
                    ? formik.errors.professionalCareRating
                    : undefined
                }
                touched={formik.touched.professionalCareRating as boolean}
                required
                disabled={formik.isSubmitting}
                options={calificacionOptions}
              />
              <Select
                label="Calificación Servicio"
                name="customerServiceRating"
                value={formik.values.customerServiceRating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.customerServiceRating &&
                  formik.errors.customerServiceRating
                    ? formik.errors.customerServiceRating
                    : undefined
                }
                touched={formik.touched.customerServiceRating as boolean}
                required
                disabled={formik.isSubmitting}
                options={calificacionOptions}
              />
            </div>
          </section>

          {/* ── Sección 7: Experiencia Global y Recomendación ── */}
          <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
              Experiencia y Recomendación:
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Experiencia Global"
                name="globalExperience"
                value={formik.values.globalExperience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.globalExperience &&
                  formik.errors.globalExperience
                    ? formik.errors.globalExperience
                    : undefined
                }
                touched={formik.touched.globalExperience as boolean}
                required
                disabled={formik.isSubmitting}
                options={experienciaOptions}
              />
              <Select
                label="¿Recomendaría la institución?"
                name="wouldRecommend"
                value={formik.values.wouldRecommend}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.wouldRecommend &&
                  formik.errors.wouldRecommend
                    ? formik.errors.wouldRecommend
                    : undefined
                }
                touched={formik.touched.wouldRecommend as boolean}
                required
                disabled={formik.isSubmitting}
                options={recomendacionOptions}
              />
            </div>
          </section>

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
              onClick={() =>
                  navigate("/encuestas")
              }
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
              {isEditing ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EncuestasFormulario;

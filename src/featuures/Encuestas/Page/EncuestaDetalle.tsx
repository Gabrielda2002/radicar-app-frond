import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Button from "@/components/common/Ui/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import GridSiNoNa from "@/featuures/Encuestas/Components/GridSiNoNa";
import EncuestasFormulario from "@/featuures/Encuestas/Page/EncuestasFormulario";
import { useStoreEncuestas } from "@/featuures/Encuestas/store/useStoreEncuestas";
import {
  ENUM_LABELS,
} from "@/models/IEncuestaSatisfaccion";

const EncuestaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentSurvey, isLoading, error, getSurveyById } =
    useStoreEncuestas();

  const [isEditing, setIsEditing] = useState(false);

  //* Cargar encuesta al montar
  useEffect(() => {
    if (id) {
      getSurveyById(id);
    }
  }, [id]);

  const rol = Number(localStorage.getItem("rol"));

  // ── Vista de carga ──
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // ── Vista de error / no encontrada ──
  if (error || !currentSurvey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            Encuesta no encontrada
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            La encuesta que buscas no existe o no está disponible.
          </p>
        </div>
        <Link
          to="/encuestas"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </Link>
      </div>
    );
  }

  // ── Modo edición ──
  if (isEditing) {
    return <EncuestasFormulario initialData={currentSurvey} />;
  }

  const survey = currentSurvey;

  // ── Construir Formik-like values para GridSiNoNa en modo lectura ──
  const readOnlyFormikValues: Record<string, string> = {
    timelyAppointment: survey.timelyAppointment ?? "",
    punctualCare: survey.punctualCare ?? "",
    professionalInterest: survey.professionalInterest ?? "",
    clearRecommendations: survey.clearRecommendations ?? "",
    signageHelped: survey.signageHelped ?? "",
    adequateFacilities: survey.adequateFacilities ?? "",
    cleanFacilities: survey.cleanFacilities ?? "",
  };

  //* Objeto formik mínimo para GridSiNoNa en modo lectura
  const readOnlyFormik = {
    values: readOnlyFormikValues,
    setFieldValue: () => { },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  console.log(survey)

  return (
    <>
      <HeaderPage
        title="Detalle de Encuesta"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "Encuestas de Satisfacción", path: "/encuestas" },
          {
            label: `Encuesta #${survey.id}`,
            path: `/encuestas/${survey.id}`,
          },
        ]}
        duration={300}
      />

      <div className="px-4 pb-8 mx-auto max-w-6xl space-y-6">
        {/* Paciente */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Datos del Paciente:
          </h5>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Nombre Completo
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.patientName ?? "—"}
            </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Tipo Documento
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.patientTypeDocument ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                N° Documento
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.documentPatient ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Convenio
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.patientAgreement ?? "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Municipio */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-3 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Ubicación:
          </h5>
          <div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Municipio
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {survey.municipality ?? "—"}
            </p>
          </div>
        </section>

        {/* Población */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-3 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Población:
          </h5>
          <div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Población Especial
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {survey.specialPopulation ?? "—"}
            </p>
          </div>
        </section>

        {/* Servicio */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-3 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Servicio:
          </h5>
          <div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Servicio de Atención
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {survey.attentionService ?? "—"}
            </p>
          </div>
        </section>

        {/* Grid SI/NO/NA en modo lectura */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <GridSiNoNa formik={readOnlyFormik} disabled={true} />
        </section>

        {/* Calificaciones */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Calificación:
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Calificación Atención
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.professionalCareRating
                  ? ENUM_LABELS.Calificacion[survey.professionalCareRating] ??
                  survey.professionalCareRating
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Calificación Servicio
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.customerServiceRating
                  ? ENUM_LABELS.Calificacion[survey.customerServiceRating] ??
                  survey.customerServiceRating
                  : "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Experiencia y Recomendación */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Experiencia y Recomendación:
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Experiencia Global
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.globalExperience
                  ? ENUM_LABELS.ExperienciaGlobal[survey.globalExperience] ??
                  survey.globalExperience
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                ¿Recomendaría?
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.wouldRecommend
                  ? ENUM_LABELS.Recomendacion[survey.wouldRecommend] ??
                  survey.wouldRecommend
                  : "—"}
              </p>
            </div>
          </div>
        </section>

        {/* Metadata */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Información de Registro:
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Registrado por
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.registeredBy ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha de creación
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {survey.createdAt
                  ? new Date(survey.createdAt).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : "—"}
              </p>
            </div>
            {survey.updatedAt && (
              <div>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Última actualización
                </span>
                <p className="text-gray-800 dark:text-gray-200">
                  {new Date(survey.updatedAt).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Botones de acción al final */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => navigate("/encuestas")}
          >
            Volver al listado
          </Button>
          {[1, 11].includes(rol) && (
            <Button
              type="button"
              variant="primary"
              size="lg"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Editar encuesta
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default EncuestaDetalle;

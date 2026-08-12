import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import Button from "@/components/common/Ui/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import PqrsdfFormulario from "@/featuures/Pqrsdf/Page/PqrsdfFormulario";
import { useStorePqrsdf } from "@/featuures/Pqrsdf/store/useStorePqrsdf";
import { ENUM_LABELS, IPqrsdfStatusHistory } from "@/featuures/Pqrsdf/models/IPqrsdf";
import { FormatDate } from "@/utils/FormatDate";
import { getStatusColor } from "@/featuures/Permission/utils/getColorTicketColumn";
import { responseOpportunityDays } from "../utils/oportunityDays";
import { ColumnConfig, DataTable, useTableState } from "@/components/common/ReusableTable";

//* Helper: muestra "—" si el valor es null/undefined/empty
const displayValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
};

const PqrsdfDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPqrsdf, isLoading, error, getPqrsdfById } = useStorePqrsdf();

  const [editMode, setEditMode] = useState(false);

  const tableState = useTableState({
    data: currentPqrsdf?.statusHistory || [],
    searchFields: ["status", "note", "actor"],
    initialItemsPerPage: 5,
  });

  const columns: ColumnConfig<IPqrsdfStatusHistory>[] = [
    {
      key: "status",
      header: "Estado",
      size: "sm",
      render: (item) => (
        <span className={getStatusColor(item.status)}>
          {item.status}
        </span>
      ),
    },
    {
      key: "note",
      header: "Nota",
      size: "md",
      accessor: (item) => item.note,
    },
    {
      key: "actor",
      header: "Actor",
      size: "md",
      accessor: (item) => item.actor,
    },
  ];

  useEffect(() => {
    if (id) {
      getPqrsdfById(id);
    }
  }, [id, getPqrsdfById]);

  const rol = Number(localStorage.getItem("rol"));
  const canEdit = [1, 11].includes(rol);

  // ── Vista de carga ──
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // ── Vista de error / no encontrado ──
  if (error || !currentPqrsdf) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            PQRSDF no encontrado
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            El PQRSDF que buscas no existe o no está disponible.
          </p>
        </div>
        <Link
          to="/pqrsdf"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </Link>
      </div>
    );
  }

  // ── Modo edición ──
  if (editMode) {
    return <PqrsdfFormulario initialData={currentPqrsdf} />;
  }

  const pqrsdf = currentPqrsdf;

  return (
    <>
      <HeaderPage
        title={`PQRSDF #${pqrsdf.filingNumber}`}
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "PQRSDF", path: "/pqrsdf" },
          {
            label: `#${pqrsdf.filingNumber}`,
            path: `/pqrsdf/${pqrsdf.id}`,
          },
        ]}
        duration={300}
      />

      <div className="px-4 pb-8 mx-auto max-w-6xl space-y-6">
        {/* ── Estado ── */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Estado:
            </span>
            <span className={getStatusColor(pqrsdf.status) + `text-sm`}>
              {pqrsdf.status}
            </span>
           </div>
        </section>

        {/* ── Datos del PQRSDF ── */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Datos del PQRSDF:
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Radicado #
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.filingNumber)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Paciente
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.patientName)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Documento
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.patientDocument)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Tipo de Población
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.populationType)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Presentado por
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.presentedBy
                  ? ENUM_LABELS.presentedBy[pqrsdf.presentedBy] ||
                  pqrsdf.presentedBy
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Clasificación
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.classification
                  ? ENUM_LABELS.classification[pqrsdf.classification] ||
                  pqrsdf.classification
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Instancia
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.instance
                  ? ENUM_LABELS.instance[pqrsdf.instance] || pqrsdf.instance
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Medio de Recepción
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.receptionMedium
                  ? ENUM_LABELS.receptionMedium[pqrsdf.receptionMedium] ||
                  pqrsdf.receptionMedium
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Área de Origen
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.originAreaName)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Motivo General
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.generalReason)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Área de Generación
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.originAreaName)}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Descripción
              </span>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {displayValue(pqrsdf.description)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Motivo Específico
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.specificReason)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Nombre del Presentador
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.presenterName)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha PQRS
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.pqrsDate)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha Recibido
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.receivedDate)}
              </p>
            </div>
          </div>
        </section>

        {/* Historial de Estados */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Historial de Estados:
          </h5>
          <DataTable
            data={tableState.currentData()}
            columns={columns}
            getRowKey={(item) => item.id.toString()}
          />
        </section>

        {/* ── Resolución ── */}
        <section className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
          <h5 className="mb-4 text-xl font-semibold text-blue-500 dark:text-gray-200">
            Resolución:
          </h5>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Área de Resolución
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.resolutionAreaName)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha de Respuesta
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {displayValue(pqrsdf.responseDate)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha Oportunidad de Respuesta
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {responseOpportunityDays(
                  pqrsdf.receivedDate,
                  pqrsdf.responseDate
                )}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Medio de Notificación
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.notificationMedium
                  ? ENUM_LABELS.notificationMedium[
                  pqrsdf.notificationMedium
                  ] || pqrsdf.notificationMedium
                  : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Atributo Afectado
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {pqrsdf.affectedAttribute
                  ? ENUM_LABELS.affectedAttribute[
                  pqrsdf.affectedAttribute
                  ] || pqrsdf.affectedAttribute
                  : "—"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Acción de Mejora
              </span>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {pqrsdf.improvementAction ? "Sí" : "No"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Detalles Plan de Accion
              </span>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {displayValue(pqrsdf.improvementActionDetails)}
              </p>
            </div>
          </div>
        </section>

        {/* ── Metadata ── */}
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
                {displayValue(pqrsdf.createdBy)}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Fecha de creación
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {FormatDate(pqrsdf.createdAt) ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Última actualización
              </span>
              <p className="text-gray-800 dark:text-gray-200">
                {FormatDate(pqrsdf.updatedAt) ?? "—"}
              </p>
            </div>
          </div>
        </section>

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
            Volver al listado
          </Button>
          {canEdit && (
            <Button
              type="button"
              variant="primary"
              size="lg"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setEditMode(true)}
            >
              Editar PQRSDF
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PqrsdfDetalle;

//*Funciones y Hooks
import { useState, lazy, Suspense, useCallback, useMemo } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import { Cup, IRadicados } from "@/models/IRadicados.ts";

//? Using lazy load functions for modals
const ModalGestionAuxiliar = lazy(
  () =>
    import(
      "@/components/common/Modals/GestionAuxiliar/ModalTableMonitoringAssistent.tsx"
    )
);
const ModalMostrarDatos = lazy(
  () => import("@/components/common/Modals/ShowData/ShowMoreData.tsx")
);
const ModalRadicacion = lazy(() => import("../Components/ModalRadicacion.tsx"));

//*Props
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";

//*Iconos
import gestion from "/assets/gestion.svg";
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";
import { FormatDate } from "@/utils/FormatDate.ts";
import Button from "@/components/common/Ui/Button.tsx";
import Input from "@/components/common/Ui/Input.tsx";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess.ts";
import { useTableState, ColumnConfig, DataTable } from "@/components/common/ReusableTable/index.ts";
import { getColorStatus, getLastManagementStatusColor } from "../utils/getColorStatus.ts";
import { useStoreRadicacion } from "../store/useStoreRadicacion.ts";

const TablaRadicacion = () => {
  // estado para el numero de documento del paciente
  const [documento, setDocumento] = useState<string>("");


  // hook para buscar radicado por numero documento paciente
  const { radicacion, isLoading, error: errorRadicacion, getRadicacionByDocument } =
    useStoreRadicacion();

  const tableState = useTableState({
    data: radicacion || [],
    searchFields: ["documentNumber", "namePatient", "convenioName"],
    initialItemsPerPage: 10,
  });

  const { openSecureFile } = useSecureFileAccess();

  // estado para controlar la apertura del modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGestionAuxiliar, setIsOpenGestionAuxiliar] = useState(false);
  const [selectedRadicacion, setSelectedRadicacion] = useState<
    Cup | IRadicados | null
  >(null);

  // Estado para controlar qué filas tienen expandido el detalle de servicios
  const [expandedRowIds, setExpandedRowIds] = useState<Set<number>>(new Set());

  const toggleRowExpand = useCallback((id: number) => {
    setExpandedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleShowData = useCallback((radicacion: IRadicados) => {
    setSelectedRadicacion(radicacion);
    setIsOpen(true);
  }, []);

  const handleShowGestionAuxiliar = useCallback((radicacion: Cup) => {
    setSelectedRadicacion(radicacion);
    setIsOpenGestionAuxiliar(true);
  }, []);

  const cupsColumns: ColumnConfig<Cup>[] = useMemo(
    () => [
      {
        key: "code",
        header: "Código",
        size: "xs" as const,
        accessor: (item: Cup) => item.code,
      },
      {
        key: "description",
        header: "Descripción",
        size: "lg" as const,
        render: (item: Cup) => (
          <div className="text-left font-normal leading-relaxed text-slate-800 dark:text-slate-200">
            <div>{item.description}</div>
            {item.observation && (
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 italic">
                Obs: {item.observation}
              </p>
            )}
          </div>
        ),
      },
      {
        key: "status",
        header: "Estado Auditoría",
        size: "sm" as const,
        render: (item: Cup) => (
          <span className={getColorStatus(item.status)}>
            {item.status}
          </span>
        ),
      },
      {
        key: "lastManagementStatus",
        header: "Última Gestión",
        size: "md" as const,
        render: (item: Cup) => {
          const lastManagement =
            item.seguimiento && item.seguimiento.length > 0 && item.seguimiento[0].estado
              ? item.seguimiento[0].estado
              : "N/A";
          return (
            <span className={getLastManagementStatusColor(lastManagement)}>
              {lastManagement}
            </span>
          );
        },
      },
      {
        key: "management",
        header: "Gestión",
        size: "xs" as const,
        render: (item: Cup) => (
          <button
            type="button"
            onClick={() => handleShowGestionAuxiliar(item)}
            className="inline-flex items-center justify-center p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            title="Gestionar servicio"
          >
            <img
              className="w-7 h-7 dark:invert"
              src={gestion}
              alt="Gestionar"
            />
          </button>
        ),
      },
    ],
    [handleShowGestionAuxiliar]
  );

  const renderExpandedRow = useCallback(
    (item: IRadicados) => {
      const cups = item.cups || [];

      return (
        <div className="p-3 sm:p-4 bg-slate-50/80 dark:bg-gray-900/50">
          <div className="overflow-hidden bg-white border rounded-lg shadow-sm dark:bg-gray-800 border-slate-200 dark:border-gray-700">
            <div className="p-3">
              <DataTable
                data={cups}
                columns={cupsColumns}
                getRowKey={(cup) => cup.id.toString()}
                loading={false}
                error={null}
                showMobileCards={false}
                emptyMessage="No hay servicios (CUPS) registrados para este radicado."
              />
            </div>
          </div>
        </div>
      );
    },
    [cupsColumns],
  );

  if (isLoading) return <LoadingSpinner duration={100000} />;

  const columns: ColumnConfig<IRadicados>[] = [
    {
      key: "createdAt",
      header: "Fecha - Hora",
      size: "sm" as const,
      accessor: (item: IRadicados) => FormatDate(item.createdAt),
    },
    {
      key: "id",
      header: "N.º Radicado",
      size: "xs" as const,
      accessor: (item: IRadicados) => item.id,
    },
    {
      key: "documentType",
      header: "Documento",
      size: "xs" as const,
      accessor: (item: IRadicados) => item.documentType,
    },
    {
      key: "documentNumber",
      header: "N.º Documento",
      size: "sm" as const,
      accessor: (item: IRadicados) => item.documentNumber,
    },
    {
      key: "namePatient",
      header: "Paciente",
      size: "sm" as const,
      accessor: (item: IRadicados) => item.namePatient,
    },
    {
      key: "convenioName",
      header: "Convenio",
      size: "xs" as const,
      accessor: (item: IRadicados) => item.convenioName,
    },
    {
      key: "auditDate",
      header: "Fecha Auditoría",
      size: "sm" as const,
      accessor: (item: IRadicados) => FormatDate(item.auditDate, false),
    },
    {
      key: "cups",
      header: "CUPS",
      size: "sm" as const,
      render: (item: IRadicados) => {
        const count = item.cups?.length || 0;
        const isExpanded = expandedRowIds.has(item.id);

        if (count === 0) {
          return (
            <span className="text-xs italic text-gray-400 dark:text-gray-500">
              Sin servicios
            </span>
          );
        }

        return (
          <Button
          variant="any"
            onClick={() => toggleRowExpand(item.id)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              isExpanded
                ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-700"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 dark:hover:bg-indigo-900/80"
            }`}
            title={isExpanded ? "Ocultar detalle de servicios" : "Ver detalle de servicios"}
          >
            <span className="font-semibold">{count}</span>
            <span>{count === 1 ? "servicio" : "servicios"}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        );
      },
    },
    {
      key: "support",
      header: "Soporte",
      size: "xs" as const,
      render: (item: IRadicados) => (
        <button
          onClick={() => openSecureFile(item.supportId.toString(), "VIEW", "soporte")}
          className="cursor-pointer"
          title="Ver soporte"
        >
          <img className="dark:invert" src={soporte} alt="Soporte" />
        </button>
      ),
    },
    {
      key: "details",
      header: "Mostrar",
      size: "xs" as const,
      render: (item: IRadicados) => (
        <button
          onClick={() => handleShowData(item)}
          className="cursor-pointer"
          title="Mostrar más datos"
        >
          <img className="dark:invert" src={mostrar} alt="Mostrar" />
        </button>
      ),
    },
  ];


  return (
    <>
      <ModalSection
        title="Módulo Radicación"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Radicación", path: "" },
        ]}
      />

      <section className="p-5 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end justify-between w-full mb-4">
          <div className="flex flex-col w-80">
            <Input
              label="Buscar por Documento Paciente:"
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Documento Paciente"
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              error={errorRadicacion ? errorRadicacion : undefined}
              touched={!!errorRadicacion}
              required={true}
              helpText="Ingrese el número de documento del paciente para buscar su radicado."
            />
            <Button
              variant="secondary"
              type="button"
              onClick={() => getRadicacionByDocument(documento)}
            >
              Buscar
            </Button>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <ModalRadicacion />
          </Suspense>
        </section>
        {radicacion && radicacion.length !== 0 && (
          <DataTable
            columns={columns}
            data={tableState.currentData()}
            getRowKey={(item) => item.id.toString()}
            loading={isLoading}
            error={errorRadicacion}
            isRowExpanded={(item) => expandedRowIds.has(item.id)}
            renderExpandedRow={renderExpandedRow}
          />
        )}

        {/* Modal para mostrar los datos de la radicación */}
        <Suspense fallback={<LoadingSpinner />}>
          <ModalMostrarDatos
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            radicacion={selectedRadicacion as IRadicados | null} // Se asegura que sea IRadicados
          />

          <ModalGestionAuxiliar
            isOpen={isOpenGestionAuxiliar}
            onClose={() => setIsOpenGestionAuxiliar(false)}
            cup={selectedRadicacion as Cup | null} // Se asegura que sea Cup
            cirugias={null}
          />
        </Suspense>
      </section>
    </>
  );
};
export default TablaRadicacion;

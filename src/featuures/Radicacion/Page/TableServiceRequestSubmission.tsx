//*Funciones y Hooks
import { useState, lazy, Suspense, useCallback } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import { Cup, IRadicados } from "@/models/IRadicados.ts";
import { useFetchDocumentoRadicado } from "../Hooks/UseFetchDocumentRadicado.ts";

//? Using lazy load functions for modals
const ModalGestionAuxiliar = lazy(
  () =>
    import(
      "@/components/common/Modals/GestionAuxiliar/ModalTableMonitoringAssistent.tsx"
    )
);
const ModalMostrarDatos = lazy(
  () => import("@/components/common/Modals/ShowData/ModalDatosRadicacion.tsx")
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

const TablaRadicacion = () => {
  // estado para el numero de documento del paciente
  const [documento, setDocumento] = useState<string>("");


  // hook para buscar radicado por numero documento paciente
  const { radicados, loading, errorRadicados, getData } =
    useFetchDocumentoRadicado();

  const tableState = useTableState({
    data: radicados || [],
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

  const handleShowData = useCallback((radicacion: IRadicados) => {
    setSelectedRadicacion(radicacion);
    setIsOpen(true);
  }, []);

  const handleShowGestionAuxiliar = useCallback((radicacion: Cup) => {
    setSelectedRadicacion(radicacion);
    setIsOpenGestionAuxiliar(true);
  }, []);


  if (loading) return <LoadingSpinner duration={100000} />;

  const handleLastManagementStatusColor = (status: string) => {
    switch (status) {
      case "Asignado":
        return "text-green-500 font-semibold";
      case "Cancelado":
        return "text-red-500 font-semibold";
      case "Pendiente":
        return "text-yellow-600 font-semibold";
      case "Cerrado":
        return "text-blue-500 font-semibold";
      case "Programado":
        return "text-purple-500 font-semibold";
      case "Cumplido":
        return "text-teal-500 font-semibold";
      case "Reprogramado":
        return "text-orange-500 font-semibold";
      default:
        return "text-gray-600 font-semibold";
    }
  };

  const culumnsSubTable: ColumnConfig<Cup>[] = [
    {
      key: "code",
      header: "Código CUPS",
      accessor: (item: Cup) => item.code,
    },
    {
      key: "description",
      header: "Descripción",
      render: (item: Cup) => (

        <span
          className="block max-w-[200px] truncate cursor-pointer"
          title={item.description}
        >
          {item.description}
        </span>
      ),
    },
    {
      key: "status",
      header: "Auditoría",
      render: (item: Cup) => (item.status),
    },
    {
      key: "lastManagementStatus",
      header: "Última Gestión",
      render: (item: Cup) => {
        const lastManagement = item.seguimiento.length > 0 &&
          item.seguimiento[0].estado
          ? item.seguimiento[0].estado
          : "N/A"
        return (
          <span className={handleLastManagementStatusColor(lastManagement)}>
            {lastManagement}
          </span>
        )
      }
    },
    {
      key: "management",
      header: "Gestión",
      render: (item: Cup) => (
        <button
          onClick={() =>
            handleShowGestionAuxiliar(item)
          }
        >
          <img
            className="w-8 h-8 dark:invert"
            src={gestion}
            alt=""
          />
        </button>
      )
    }
  ]

  const columns: ColumnConfig<IRadicados>[] = [
    {
      key: "createdAt",
      header: "Fecha - Hora",
      accessor: (item: IRadicados) => FormatDate(item.createdAt),
    },
    {
      key: "id",
      header: "N.º Radicado",
      accessor: (item: IRadicados) => item.id,
    },
    {
      key: "documentType",
      header: "Documento",
      accessor: (item: IRadicados) => item.documentType,
    },
    {
      key: "documentNumber",
      header: "N.º Documento",
      accessor: (item: IRadicados) => item.documentNumber,
    },
    {
      key: "namePatient",
      header: "Paciente",
      accessor: (item: IRadicados) => item.namePatient,
    },
    {
      key: "convenioName",
      header: "Convenio",
      accessor: (item: IRadicados) => item.convenioName,
    },
    {
      key: "auditDate",
      header: "Fecha Auditoría",
      accessor: (item: IRadicados) => FormatDate(item.auditDate, false),
    },
    {
      key: "cups",
      header: "Gestión del servicio",
      render: (item: IRadicados) => (
        <div>
          <DataTable
            data={item.cups}
            columns={culumnsSubTable}
            getRowKey={(subItem) => subItem.id.toString()}
            loading={false}
            error={null}
          />
        </div>
      )
    },
    {
      key: "support",
      header: "Soporte",
      render: (item: IRadicados) => (
        <button
          onClick={() => openSecureFile(item.supportId.toString(), "VIEW", "soporte")}
        >
          <img className="dark:invert" src={soporte} alt="" />
        </button>
      )
    },
    {
      key: "details",
      header: "Mostrar Datos",
      render: (item: IRadicados) => (
        <button onClick={() => handleShowData(item)}>
          <img className="dark:invert" src={mostrar} alt="" />
        </button>
      )
    }
  ]


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
              error={errorRadicados ? errorRadicados : undefined}
              touched={!!errorRadicados}
              required={true}
              helpText="Ingrese el número de documento del paciente para buscar su radicado."
            />
            <Button
              variant="secondary"
              type="button"
              onClick={() => getData(documento)}
            >
              Buscar
            </Button>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <ModalRadicacion />
          </Suspense>
        </section>

        <DataTable
          columns={columns}
          data={tableState.currentData()}
          getRowKey={(item) => item.id.toString()}
          loading={loading}
          error={errorRadicados}
        />

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

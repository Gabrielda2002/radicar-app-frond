//*Funciones y Hooks
import { useState, lazy, Suspense, useEffect } from "react";

import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import { IAuditar, auditCups } from "@/models/IAuditar.ts";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { FormatDate } from "@/utils/FormatDate";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import Button from "@/components/common/Ui/Button";
import { ColumnConfig, DataTable, DataTableContainer, FilterFieldConfig, useTableState } from "@/components/common/ReusableTable";
import useStoreAuthService from "../store/useStoreAuthService";
import ModalAuthorizedServices from "../components/ModalAuthorizedService";
import { Eye, File } from "lucide-react";

const AUTORIZED_SERVICES_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    key: "createdAt",
    label: "Fecha de Creación",
    type: "date-range"
  },
  {
    key: "ipsPrimary",
    label: "IPS Primaria",
    type: "multi-select",
    getOptionsFromData: true
  },
  {
    key: "agreementName",
    label: "Convenio",
    type: "multi-select",
    getOptionsFromData: true
  },
  {
    key: "place",
    label: "Lugar de Radicación",
    type: "multi-select",
    getOptionsFromData: true
  },
  {
    key: "ipsRemitente",
    label: "IPS Remitente",
    type: "multi-select",
    getOptionsFromData: true
  },
  {
    key: "speciality",
    label: "Especialidad",
    type: "multi-select",
    getOptionsFromData: true
  },
  {
    key: "assistant",
    label: "Radicador",
    type: "multi-select",
    getOptionsFromData: true
  }
];

const ModalMostrarDatosCUPS = lazy(
  () => import("@/components/common/Modals/MostrarCUPS/ModalMostrarDatos.tsx")
);

const TableAuthorized = () => {
  const { services: data, isLoading: loading, error, getAuthorizedServices } = useStoreAuthService();
  const [selectedCups, setSelectedCups] = useState<auditCups[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAuthorizedServices();
  }, [getAuthorizedServices]);

  const tableState = useTableState({
    data: data || [],
    searchFields: [
      "id",
      "documentNumber",
      "namePatient",
      "agreementName",
      "ipsPrimary",
      "documentType",
      "place",
      "ipsRemitente",
      "professional",
      "speciality",
      "typeService",
      "assistant",
      "createdAt"
    ],
    initialItemsPerPage: 10,
    filterConfig: AUTORIZED_SERVICES_FILTER_CONFIG,
  });

  const columns: ColumnConfig<IAuditar>[] = [
    {
      key: "id",
      header: "ID",
      accessor: (item) => item.id,
    },
    {
      key: "createdAt",
      header: "Fecha Creación",
      accessor: (item) => FormatDate(item.createdAt),
    },
    {
      key: "documentNumber",
      header: "N. Documento",
      accessor: (item) => item.documentNumber,
    },
    {
      key: "namePatient",
      header: "Nombre Completo",
      accessor: (item) => item.namePatient,
    },
    {
      key: "agreementName",
      header: "Convenio",
      accessor: (item) => item.agreementName,
    },
    {
      key: "ipsPrimary",
      header: "IPS Primaria",
      accessor: (item) => item.ipsPrimary,
    },
    {
      key: "orderDate",
      header: "Fecha Orden",
      accessor: (item) => FormatDate(item.orderDate, false),
    },
    {
      key: "place",
      header: "Lugar Radicación",
      accessor: (item) => item.place,
    },
    {
      key: "ipsRemitente",
      header: "IPS Remite",
      accessor: (item) => item.ipsRemitente,
    },
    {
      key: "professional",
      header: "Profesional",
      accessor: (item) => item.professional,
    },
    {
      key: "speciality",
      header: "Especialidad",
      accessor: (item) => item.speciality,
    },
    {
      key: "typeService",
      header: "Servicio",
      accessor: (item) => item.typeService,
    },
    {
      key: "assistant",
      header: "Radicador",
      accessor: (item) => item.assistant,
    }
  ];

  const { openSecureFile } = useSecureFileAccess();

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return <h2 className="flex justify-center dark:text-white">{error}</h2>;

  const handleShowServicios = (statusCups: auditCups[]) => {
    setSelectedCups(statusCups);
    setIsOpen(true);
  };

  return (
    <>
      <ModalSection
        title="Módulo Auditoría"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Auditoría", path: "" },
        ]}
      />


      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
        filterState={tableState.filterState}
        headerActions={
          <>
            <Link to={"/tabla-registros-auditados"}>
              <Button
                variant="secondary"
                title="Ir a Auditados"
                className="h-10 truncate w-fit"
              >
                Auditados
              </Button>
              {/* ! no se funciona | focus:outline-none | ! */}
            </Link>
            <Link to={"/tabla-radicacion"}>
              <Button
                variant="secondary"
                title="Ir a Radicación"
                className="h-10 truncate w-fit"
              >
                Ver Autorizaciones
              </Button>
            </Link>
          </>
        }
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item: IAuditar) => item.id.toString()}
          loading={loading}
          error={error}
          renderActions={(item: IAuditar) => (
            <>
              <Button
                variant="action"
                onClick={() =>
                  openSecureFile(item.supportId.toString(), "VIEW", "soporte")
                }
                title="Ver Soporte"
                icon={<File className="w-3 h-3" />}
              />

              {/* Botón Mostrar Servicios */}
              <Button
                variant="action"
                onClick={() =>
                  handleShowServicios(item.cups)
                }
                title="Mostrar Servicios"
                icon={<Eye className="w-3 h-3" />}
              />

              <ModalAuthorizedServices 
                serviceId={item.id}
                cups={item.cups}
              />
            </>
          )}
        />
      </DataTableContainer>


      <Suspense fallback={<LoadingSpinner />}>
        <ModalMostrarDatosCUPS
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={selectedCups}
          cirugias={null}
          dateOrder={null}
        />
      </Suspense>
    </>
  );
};

export default TableAuthorized;

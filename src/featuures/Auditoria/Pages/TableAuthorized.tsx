//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";

import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import { IAuditar, IStatusCup } from "@/models/IAuditar.ts";
import { useFetchAuditoria } from "../Hooks/UseFetchAuditar";

//*Icons
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";
import autorizar from "/assets/autorizar.svg";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { FormatDate } from "@/utils/FormatDate";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import Button from "@/components/common/Ui/Button";
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";


const ModalMostrarDatosCUPS = lazy(
  () => import("@/components/common/Modals/MostrarCUPS/ModalMostrarDatos.tsx")
);

const TableAuthorized = () => {
  const { data, loading, error } = useFetchAuditoria();
  const [selectedCups, setSelectedCups] = useState<IStatusCup[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const tableState = useTableState({
    data: data || [],
    searchFields: [
      "documentNumber",
      "namePatient",
      "convenio",
      "ipsPrimary",
      "documentType",
      "place",
      "ipsRemitente",
      "profetional",
      "speciality",
      "typeServices",
      "radicador",
    ],
    initialItemsPerPage: 10
  });

  const columns: ColumnConfig<IAuditar>[] = [
    {
      key: "radicadoDate",
      header: "Fecha",
      accessor: (item) => FormatDate(item.radicadoDate),
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
      key: "convenio",
      header: "Convenio",
      accessor: (item) => item.convenio,
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
      key: "profetional",
      header: "Profesional",
      accessor: (item) => item.profetional,
    },
    {
      key: "speciality",
      header: "Especialidad",
      accessor: (item) => item.speciality,
    },
    {
      key: "typeServices",
      header: "Servicio",
      accessor: (item) => item.typeServices,
    },
    {
      key: "radicador",
      header: "Radicador",
      accessor: (item) => item.radicador,
    }
  ];

  const { openSecureFile } = useSecureFileAccess();

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return <h2 className="flex justify-center dark:text-white">{error}</h2>;

  const handleShowServicios = (statusCups: IStatusCup[]) => {
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
                variant="secondary"
                onClick={() =>
                  openSecureFile(item.supportId.toString(), "VIEW", "soporte")
                }
                title="Ver Soporte"
                icon={<img src={soporte} alt="soporte-icon" className="w-7 h-7 dark:invert" />}
              />

              {/* Botón Mostrar Servicios */}
              <Button
                variant="secondary"
                onClick={() =>
                  handleShowServicios(item.statusCups)
                }
                title="Mostrar Servicios"
                icon={<img src={mostrar} alt="mostrar-icon" className="w-7 h-7 dark:invert" />}
              />

              <Link
                to="/tabla-autorizar-servicios"
                state={{
                  CUPS: item.statusCups,
                  id: item.id,
                }}
                title="Autorizar Servicios"
              >
                <Button
                  variant="secondary"
                  title="Autorizar Servicios"
                  icon={<img src={autorizar} alt="autorizar-icon" className="w-7 h-7 dark:invert" />}
                />
              </Link>
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

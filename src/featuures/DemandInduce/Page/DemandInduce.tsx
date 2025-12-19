import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import ModalCreateDI from "../Components/ModalCreateDI";
import { useFetchDI } from "../Hooks/useFetchDI";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";
import { IDemandInduced } from "@/models/IDemandInduced";
import { useState } from "react";
import ModalSummaryDI from "../Components/ModalSummaryDI";
import Button from "@/components/common/Ui/Button";
import ModalProgramGoals from "../Components/ModalProgramGoals";
import { AnimatePresence } from "framer-motion";
import StatisticsDemandInduced from "../Components/StatisticsDemandInduced";
import { ColumnConfig, DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";

const DemandInduce = () => {

  const [activeSection, setActiveSection] = useState<number>(1);

  const { data, loading, error, refetch } = useFetchDI();

  const tableState = useTableState({
    data: data || [],
    searchFields: [
      'id',
      'typeDocument',
      'document',
      'dateCreated',
      'elementDI',
      'typeElementDI',
      'objetive',
      'programPerson',
      'personProcess',
      'areaPersonProcess',
      'assignmentDate',
      'profetional',
      'headquartersPersonProcess'
    ],
    initialItemsPerPage: 10
  });

  const columns: ColumnConfig<IDemandInduced>[] = [
    {
      key: "typeDocument",
      header: "Tipo Documento",
      accessor: (row: IDemandInduced) => row.typeDocument,
    },
    {
      key: "numberDocument",
      header: "Documento",
      accessor: (row: IDemandInduced) => row.document,
    },
    {
      key: "dateCreated",
      header: "Fecha Creacion",
      accessor: (row: IDemandInduced) => FormatDate(row.dateCreated, true),
    },
    {
      key: "elementDI",
      header: "Elemento Demanda Inducida",
      accessor: (row: IDemandInduced) => row.elementDI,
    },
    {
      key: "typeElementDI",
      header: "Tipo Demanda inducida",
      accessor: (row: IDemandInduced) => row.typeElementDI,
    },
    {
      key: "classification",
      header: "Clasificacion",
      render: (row: IDemandInduced) => (
        <span className={row.classification ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {row.classification ? "Efectiva" : "No Efectiva"}
        </span>
      )
    },
    {
      key: "objetive",
      header: "Objetivo",
      accessor: (row: IDemandInduced) => row.objetive,
    },
    {
      key: "programPerson",
      header: "Programa",
      accessor: (row: IDemandInduced) => row.programPerson,
    },
    {
      key: "namePatient",
      header: "Paciente",
      accessor: (row: IDemandInduced) => row.namePatient,
    },
    {
      key: "areaPersonProcess",
      header: "Area P. Seguimiento",
      accessor: (row: IDemandInduced) => row.areaPersonProcess,
    },
    {
      key: "assignmentDate",
      header: "Fecha Cita",
      accessor: (row: IDemandInduced) => FormatDate(row.assignmentDate, false),
    },
    {
      key: "personProcess",
      header: "Enfermera",
      accessor: (row: IDemandInduced) => row.personProcess,
    },
    {
      key: "headquartersPersonProcess",
      header: "Sede",
      accessor: (row: IDemandInduced) => row.headquartersPersonProcess,
    },
    {
      key: "profetional",
      header: "Profesional",
      accessor: (row: IDemandInduced) => row.profetional,
    }
  ];

  const SECTIONS = [
    { id: 1, name: "Listado DI" },
    { id: 2, name: "Cuadro de Control DI" },
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <ModalSection
            title="Inducción de demanda"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "/Inducción de demanda", path: "/demanda/inducida" },
            ]}
          />
          {SECTIONS.map((s) => (
            <Button
              key={s.id}
              role="tab"
              onClick={() => setActiveSection(s.id)}
              aria-selected={activeSection === s.id}
              aria-controls={`panel-${s.id}`}
              variant="any"
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap flex-1 text-center ${activeSection === s.id
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-400"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                }`}
            >
              {s.name}
            </Button>
          ))}

          {activeSection === 1 ? (
            <>
              <DataTableContainer
                searchValue={tableState.searchQuery}
                onSearchChange={tableState.setSearchQuery}
                itemsPerPage={tableState.itemsPerPage}
                onItemsPerPageChange={tableState.setItemsPerPage}
                currentPage={tableState.currentPage}
                totalPages={tableState.totalPages}
                onPageChange={tableState.paginate}
                // falta el renderizado de las acciones del header
                headerActions={
                  <>
                    <ModalSummaryDI
                      filteredData={tableState.currentData()}
                      totalRecords={tableState.currentData().length}
                    />
                    <ModalProgramGoals />
                    <ModalCreateDI refresh={refetch} />
                  </>
                }
              >
                <DataTable
                  data={tableState.currentData()}
                  columns={columns}
                  getRowKey={(item) => item.id.toString()}
                  loading={loading}
                  error={error}
                />
              </DataTableContainer>
            </>
          ) : (
            activeSection === 2 && (
              <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
                <StatisticsDemandInduced />
              </div>
            )
          )}
          <AnimatePresence>
            {error && (
              <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                {error}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default DemandInduce;

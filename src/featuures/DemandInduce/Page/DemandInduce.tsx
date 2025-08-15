import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import ModalCreateDI from "../Components/ModalCreateDI";
import { useFetchDI } from "../Hooks/useFetchDI";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import { IDemandInduced } from "@/models/IDemandInduced";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import { useCallback, useState } from "react";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";
import { Search } from "lucide-react";
import ModalSummaryDI from "../Components/ModalSummaryDI";
import Button from "@/components/common/Ui/Button";
import ModalProgramGoals from "../Components/ModalProgramGoals";
import { AnimatePresence } from "framer-motion";
import StatisticsDemandInduced from "../Components/StatisticsDemandInduced";

const DemandInduce = () => {
  const ITEMS_PER_PAGE = 10;

  const [activeSection, setActiveSection] = useState<number>(1);

  const { data, loading, error, refetch } = useFetchDI();

  const { query, setQuery, filteredData } = useSearch<IDemandInduced>(data, [
    "id",
    "typeDocument",
    "document",
    "dateCreated",
    "elementDI",
    "typeElementDI",
    "objetive",
    "programPerson",
    "personProcess",
    "areaPersonProcess",
    "assignmentDate",
    "profetional",
    "personProcess",
    "headquartersPersonProcess"
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
    },
    [setItemsPerPage]
  );

  const SECTIONS = [
    { id: 1, name: "Listado DI" },
    { id: 2, name: "Cuadro de Control DI" },
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap flex-1 text-center ${
                activeSection === s.id
                  ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-400"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              }`}
            >
              {s.name}
            </Button>
          ))}

          <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
            {activeSection === 1 ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-2 md:space-y-0 container-filter">
                  <div className="flex flex-col w-2/5 gap-4 mb-4 space-x-2 md:flex-row md:items-center md:mb-0 md:w-full">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar"
                      icon={
                        <Search className="text-black dark:text-white"></Search>
                      }
                      className="ml-2"
                      size="md"
                    />
                    <Select
                      options={[
                        { value: "10", label: "10 Paginas" },
                        { value: "20", label: "20 Paginas" },
                        { value: "30", label: "30 Paginas" },
                      ]}
                      id="itemsPerPage"
                      selectSize="md"
                      value={ITEMS_PER_PAGE}
                      onChange={handleItemsPerPageChange}
                    />
                    <ModalSummaryDI
                      filteredData={filteredData}
                      totalRecords={data.length}
                    />
                    <ModalProgramGoals />
                  </div>
                  <div className="flex justify-start w-full md:justify-end">
                    <ModalCreateDI refresh={refetch} />
                  </div>
                </div>
                <div className="mt-4 mb-5 overflow-y-auto">
                  <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
                    <thead>
                      <tr className="text-sm text-center text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                        <th>Tipo Documento</th>
                        <th>Documento</th>
                        <th>Fecha Creacion</th>
                        <th>Elemento Demanda Inducida</th>
                        <th>Tipo Demanda inducida</th>
                        <th>Clasificacion</th>
                        <th>Objetivo</th>
                        <th>Programa</th>
                        <th>Paciente</th>
                        <th>Area P. Seguimiento</th>
                        <th>Fecha Cita</th>
                        <th>Enfermera</th>
                        <th>Sede</th>
                        <th>Profesional</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600 dark:text-gray-300">
                      {currentData().length === 0 ? (
                        <tr>
                          <td colSpan={14} className="p-4 text-center">
                            No hay datos disponibles
                          </td>
                        </tr>
                      ) : (
                        currentData().map((d) => (
                          <tr
                            key={d.id}
                            className="text-xs transition duration-200 ease-in-out bg-white shadow-md md:text-sm dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                          >
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.typeDocument}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.document}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {FormatDate(d.dateCreated, true)}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.elementDI}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.typeElementDI}
                            </td>
                            <td className={`md:p-3 p-1 border-b dark:border-gray-700 ${d.classification ? "text-green-500" : "text-red-500"}`}>
                              {d.classification ? "Efectiva" : "No Efectiva"}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.objetive}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.programPerson}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.namePatient}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.areaPersonProcess}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {FormatDate(d.assignmentDate, false)}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.personProcess}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.headquartersPersonProcess}
                            </td>
                            <td className="p-1 border-b md:p-3 dark:border-gray-700">
                              {d.profetional}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                  />
                </div>
              </>
            ) : (
              activeSection === 2 && (
                <div>
                  <StatisticsDemandInduced/>
                </div>
              )
            )}
            <AnimatePresence>
              {error && (
                <div>
                  <div className="p-4 text-white bg-red-500 rounded-lg shadow-lg">
                    {error}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
};

export default DemandInduce;

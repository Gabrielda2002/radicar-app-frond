//*Fuctions and Hooks
import { format } from "date-fns";
import React, { useState } from "react";
import Pagination from "../../Pagination";
import useSearch from "../../../hooks/useSearch";
import LoadingSpinner from "../../LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import { Cup, IAuditados } from "../../../models/IAuditados";
import { useFetchAuditados } from "../../../hooks/useFetchUsers";
import ModalActualizarCupsAuditoria from "../modals/ModalActualizarCupsAuditados";

//*Properties
import { motion } from "framer-motion";
import ModalSection from "../../ModalSection";


const ITEMS_PER_PAGE = 10;

// * funcion para formatear la fecha
const formatDate = (date: Date | null) => {
  return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
};

const TablaRegistrosAuditados: React.FC = () => {
  const { data, loading, error } = useFetchAuditados();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch(data, [
    "id",
    "document",
    "patientName",
  ]);
  const { currentPage, totalPages, paginate, currentData } = usePagination(
    filteredData,
    itemsPerPage
  );

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <h2 className="flex justify-center text-lg dark:text-white">{error}</h2>
    );

  return (
    <>
      <Header />
      <MainContent
        query={query}
        setQuery={setQuery}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        filteredData={filteredData}
        currentData={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
};

const Header: React.FC = () => (
  <ModalSection
    title="Tabla Registros Auditados"
    breadcrumb={[
      { label: "Inicio", path: "/inicio" },
      { label: "/ Servicio Registros Auditados", path: "" },
    ]}
  />
);

interface MainContentProps {
  query: string;
  setQuery: (query: string) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filteredData: IAuditados[];
  currentData: () => IAuditados[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  query,
  setQuery,
  itemsPerPage,
  handleItemsPerPageChange,
  filteredData,
  currentData,
  currentPage,
  totalPages,
  paginate,
}) => (
  <section className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
    <SearchAndFilter
      query={query}
      setQuery={setQuery}
      itemsPerPage={itemsPerPage}
      handleItemsPerPageChange={handleItemsPerPageChange}
    />
    {filteredData.length === 0 ? (
      <NoResultsMessage />
    ) : (
      <TableContent
        currentData={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    )}
  </section>
);

interface SearchAndFilterProps {
  query: string;
  setQuery: (query: string) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  query,
  setQuery,
  itemsPerPage,
  handleItemsPerPageChange,
}) => (
  <>
    <label
      htmlFor=""
      className="text-lg font-bold text-stone-600 dark:text-stone-300"
    >
      Buscar registros Auditados:
    </label>
    <section className="flex justify-between pb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:focus:bg-gray-500 dark:focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder=" Consultar..."
        />
      </div>
      <div className="flex items-center">
        <select
          className="border-2 h-12 w-[100px] rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value="">Paginas</option>
          <option value="10">10 Paginas</option>
          <option value="20">20 Paginas</option>
          <option value="30">30 Paginas</option>
        </select>
      </div>
    </section>
  </>
);

const NoResultsMessage: React.FC = () => (
  <div className="text-center text-red-500 dark:text-red-300">
    No se encontraron resultados para la búsqueda.
  </div>
);

interface TableContentProps {
  currentData: () => IAuditados[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const TableContent: React.FC<TableContentProps> = ({
  currentData,
  currentPage,
  totalPages,
  paginate,
}) => (
  <>
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg dark:text-gray-100">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr className="text-base text-center shadow-md bg-gray-50 dark:bg-gray-700 dark:text-gray-300 rounded-t-md">
            <th className="px-2">ID Radicación</th>
            <th>Número Documento</th>
            <th>Nombre Paciente</th>
            <th>CUPS</th>
          </tr>
        </thead>
        <tbody className="text-xs text-center dark:text-gray-200">
          {currentData().map((auditado) => (
            <tr
              className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              key={auditado.id}
            >
              <td className="p-3 border-b dark:border-gray-700">
                {auditado.id}
              </td>
              <td className="p-3 border-b dark:border-gray-700">
                {auditado.document}
              </td>
              <td className="p-3 border-b dark:border-gray-700">
                {auditado.patientName}
              </td>
              <td className="p-3 border-b dark:border-gray-700">
                <CupsTable cups={auditado.CUPS} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>‎</div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={paginate}
    />
  </>
);

interface CupsTableProps {
  cups: Cup[];
}

const CupsTable: React.FC<CupsTableProps> = ({ cups }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg border-[2px] border-gray-800 border-dashed dark:border-gray-300 dark:text-gray-100">
      <thead>
        <tr className="text-gray-800 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200">
          <th>Código</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Observación</th>
          <th>Última modificación</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {cups.map((cup) => (
          <tr
            className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            key={cup.id}
          >
            <td className="p-3 border-b dark:border-gray-700">{cup.code}</td>
            <td className="border-b dark:border-gray-700">
              <span
                className="block max-w-[150px] truncate cursor-pointer"
                title={cup.description}
              >
                {cup.description}
              </span>
            </td>
            <td className="p-3 border-b dark:border-gray-700">{cup.status}</td>
            <td className="p-3 border-b dark:border-gray-700">
              {cup.observation}
            </td>
            <td className="p-3 border-b dark:border-gray-700">
              {formatDate(cup.modifyDate)}
            </td>
            <td className="p-3 border-b dark:border-gray-700">
              <ModalActualizarCupsAuditoria cup={cup} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TablaRegistrosAuditados;

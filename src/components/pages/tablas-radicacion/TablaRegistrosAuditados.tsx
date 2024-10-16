import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import LoadingSpinner from "../../LoadingSpinner";
import usePagination from "../../../hooks/usePagination";
import { useFetchAuditados } from "../../../hooks/useFetchUsers";
import ModalActualizarCupsAuditoria from "../modals/ModalActualizarCupsAuditados";
import useSearch from "../../../hooks/useSearch";
import salir from "/assets/back.svg";

const ITEMS_PER_PAGE = 10;

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
  if (error) return <h2>{error}</h2>;

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
  <section className="p-4 dark:bg-gray-900 ps-0">
    <LoadingSpinner duration={500} />
    <h1 className="mb-4 text-4xl text-color dark:text-gray-100">
      Módulo Registro Auditados
    </h1>
    <nav>
      <ol className="flex mb-3 text-gray-700 dark:text-gray-300">
        <Link to="/inicio">
          <li className="text-slate-400 after:mr-2">Inicio</li>
        </Link>
        <Link to="/tabla-auditoria">
          <li className="text-slate-400 before:content-['/'] before:mr-2 after:mr-2 before:text-slate-400">
            Servicio Auditoría
          </li>
        </Link>
        <li className="text-slate-700 before:content-['/'] before:mr-2 before:text-slate-400">
          Registros Auditados
        </li>
      </ol>
    </nav>
    <div className="w-10">
      <img
        src={salir}
        alt="icon-salir"
        onClick={() => window.history.back()}
        className="cursor-pointer"
      />
    </div>
  </section>
);

interface MainContentProps {
  query: string;
  setQuery: (query: string) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filteredData: any[];
  currentData: () => any[];
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
  currentData: () => any[];
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
    <table className="min-w-full dark:text-gray-100">
      <thead>
        <tr className="text-sm text-center bg-gray-50 dark:bg-gray-700">
          <th>ID Radicación</th>
          <th>Número Documento</th>
          <th>Nombre Paciente</th>
          <th>CUPS</th>
        </tr>
      </thead>
      <tbody>
        {currentData().map((auditado) => (
          <tr className="mt-2 text-xs text-center" key={auditado.id}>
            <td>{auditado.id}</td>
            <td>{auditado.document}</td>
            <td>{auditado.patientName}</td>
            <td>
              <CupsTable cups={auditado.CUPS} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={paginate}
    />
  </>
);

interface CupsTableProps {
  cups: any[];
}

const CupsTable: React.FC<CupsTableProps> = ({ cups }) => (
  <table>
    <thead>
      <tr>
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
        <tr key={cup.id}>
          <td>{cup.code}</td>
          <td>{cup.description}</td>
          <td>{cup.status}</td>
          <td>{cup.observation}</td>
          <td>{cup.modifyDate ? cup.modifyDate.toISOString() : "N/A"}</td>
          <td>
            <ModalActualizarCupsAuditoria cup={cup} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TablaRegistrosAuditados;

//*Funciones y Hooks
import { useState, useCallback } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable.tsx";
import useSearch from "@/hooks/useSearch.ts";
import usePagination from "@/hooks/usePagination.ts";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { useFetchTickets } from "../Hooks/useFetchTickets";
import { ITickets } from "@/models/ITickets";
import { FormatDate } from "@/utils/FormatDate";

const ITEMS_PER_PAGE = 8;

const ProcessHelpDesk = () => {
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const { tickets } = useFetchTickets();

  const { query, setQuery, filteredData } = useSearch<ITickets>(tickets, [
    "id",
    "title",
    "description",
    "nameRequester",
    "lastNameRequester",
    "category",
    "priority",
    "status",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);


  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
    },
    [setItemsPerPage]
  );

  return (
    <>
      <ModalSection
        title="Gestión de Tickets"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ GestiónTickets", path: "" },
        ]}
      />
      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar Tickets :
        </label>

        <div className="flex items-center w-full mt-2 space-x-2 container-filter">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Consultar..."
            className="block ps-2 w-full h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex items-center space-x-[10px] ml-4">
            <select
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
          </div>
        </div>

        <div className="mt-4 mb-5 overflow-x-auto">
          <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
            <thead>
              <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                <th># Ticket</th>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Categoria</th>
                <th>Creacion</th>
                <th>Ultima modificacion</th>
              </tr>
            </thead>
            <tbody className="text-xs text-center dark:text-gray-200">
              {currentData().map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.nameRequester}</td>
                  <td>{ticket.lastNameRequester}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.category}</td>
                  <td>{FormatDate(ticket.createdAt)}</td>
                  <td>{FormatDate(ticket.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </div>
    </>
  );
};

export default ProcessHelpDesk;

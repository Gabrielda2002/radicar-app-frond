//*Funciones y Hooks
import { useState, useCallback } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable.tsx";
import useSearch from "@/hooks/useSearch.ts";
import usePagination from "@/hooks/usePagination.ts";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { ITickets } from "@/models/ITickets";
import { FormatDate } from "@/utils/FormatDate";
import CerrarModal from "../Components/ModalCerrarTicket";
import {useTickets} from "@/context/ticketContext.tsx";

const ITEMS_PER_PAGE = 8;

const ProcessHelpDesk = () => {
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const { tickets, refetchTickets } = useTickets();

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

  // Función para obtener el color de fondo según el estado del ticket
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Cerrado":
        return "text-red-500";
      case "Abierto":
        return "text-green-500";
      case "Pendiente":
        return "text-blue-500";
      default:
        return "";
    }
  };

  // Función para obtener el color de fondo según la prioridad del ticket
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "Baja":
        return "text-yellow-400";
      case "Media":
        return "text-orange-400";
      case "Alta":
        return "text-red-400";
      default:
        return "";
    }
  };

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
                <th className="p-2"># Ticket</th>
                <th className="p-2">Titulo</th>
                <th className="p-2">Descripcion</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Celular</th>
                <th className="p-2">Prioridad</th>
                <th className="p-2">Categoria</th>
                <th className="p-2">Sede</th>
                <th className="p-2">Municipio</th>
                <th className="p-2">Creacion</th>
                <th className="p-2">Ultima modificacion</th>
                <th className="p-2">Accion</th>
              </tr>
            </thead>
            <tbody className="text-xs text-center dark:text-gray-200">
              {currentData().map((ticket) => (
                <tr key={ticket.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{ticket.id}</td>
                  <td className="p-2">{ticket.title}</td>
                  <td className="p-2">{ticket.description}</td>
                  <td className="p-2">{ticket.nameRequester}</td>
                  <td className="p-2">{ticket.lastNameRequester}</td>
                  <td className="p-2">{ticket.phone}</td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-2">{ticket.category}</td>
                  <td className="p-2">{ticket.headquarter}</td>
                  <td className="p-2">{ticket.municipio}</td>
                  <td className="p-2">{FormatDate(ticket.createdAt)}</td>
                  <td className="p-2">{FormatDate(ticket.updatedAt)}</td>
                  <td className="p-2">
                    {ticket.status != "Cerrado" ? (
                      <CerrarModal
                       IdTicket={ticket.id} 
                       onTicketClosed={refetchTickets}
                       />
                    ) : (
                      <button
                        className="text-lg text-gray-400"
                        title="Ticket ya cerrado"
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </div>

      {/* Componente modal para cerrar tickets */}
    </>
  );
};

export default ProcessHelpDesk;

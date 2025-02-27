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
  const { tickets, updateTicketStatus } = useFetchTickets();
  const [showModal, setShowModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | number | null>(null);
  const [observation, setObservation] = useState("");

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

  const handleOpenModal = (ticketId: string | number) => {
    setSelectedTicketId(ticketId);
    setShowModal(true);
    // Bloquear scroll cuando el modal está abierto
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicketId(null);
    setObservation("");
    // Restaurar scroll cuando el modal se cierra
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  };

  const handleSubmitObservation = () => {
    if (selectedTicketId) {
      console.log(
        "Cerrando ticket:",
        selectedTicketId,
        "Observación:",
        observation
      );
      updateTicketStatus(selectedTicketId, "Cerrado");
      handleCloseModal();
    }
  };

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
                <th className="p-2">Prioridad</th>
                <th className="p-2">Categoria</th>
                <th className="p-2">Creacion</th>
                <th className="p-2">Ultima modificacion</th>
                <th className="p-2">Cerrar</th>
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
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-2">{ticket.category}</td>
                  <td className="p-2">{FormatDate(ticket.createdAt)}</td>
                  <td className="p-2">{FormatDate(ticket.updatedAt)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleOpenModal(ticket.id)}
                      className="text-lg font-bold text-red-500 transition-colors hover:text-red-600 focus:outline-none"
                      title="Cerrar Ticket"
                    >
                      X
                    </button>
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

      {/* Modal para observaciones al cerrar ticket */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Cerrar Ticket #{selectedTicketId}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-2xl font-extrabold text-gray-500 transition-colors duration-200 hover:text-red-600 focus:outline-none"
                title="Cerrar Ticket"
              >
                X
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="observation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Observación (Motivo de cierre)
              </label>
              <textarea
                id="observation"
                rows={4}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Escriba el motivo por el cual está cerrando este ticket..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmitObservation}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Cerrar Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessHelpDesk;

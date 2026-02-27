//*Funciones y Hooks
import { Suspense, useEffect } from "react";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { ITickets } from "@/models/ITickets";
import CerrarModal from "../Components/ModalCerrarTicket";
import ModalCommetsTicket from "../Components/ModalCommetsTicket";
import {
  DataTable,
  DataTableContainer,
  useTableState,
  type FilterFieldConfig,
} from "@/components/common/ReusableTable";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";
import { getPriorityColor, getStatusColor } from "@/featuures/MyRequestsPermissions/utils/getColorTicketColumn";
import Button from "@/components/common/Ui/Button";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import useTicketsStore from "../Store/useTicketsStore";
import { IoDocumentTextOutline } from "react-icons/io5";

/** Configuración de filtros para la tabla de tickets */
const TICKET_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    key: "status",
    label: "Estado",
    type: "multi-select",
    options: [
      { value: "Abierto", label: "Abierto" },
      { value: "Pendiente", label: "Pendiente" },
      { value: "Cerrado", label: "Cerrado" },
    ],
  },
  {
    key: "priority",
    label: "Prioridad",
    type: "multi-select",
    options: [
      { value: "Alta", label: "Alta" },
      { value: "Media", label: "Media" },
      { value: "Baja", label: "Baja" },
      { value: "Urgente", label: "Urgente" },
    ],
  },
  {
    key: "type",
    label: "Tipo",
    type: "multi-select",
    options: [
      { value: "Solicitud", label: "Solicitud" },
      { value: "Incidente", label: "Incidente" }
    ],
  },
  {
    key: "category",
    label: "Categoría",
    type: "multi-select",
    getOptionsFromData: true,
  },
  {
    key: "headquarter",
    label: "Sede",
    type: "multi-select",
    getOptionsFromData: true,
  },
  {
    key: "createdAt",
    label: "Fecha creación",
    type: "date-range",
  },
];

const ProcessHelpDesk = () => {

  const { tickets, fetchTickets, error, isLoading } = useTicketsStore();

  useEffect(() => {
    fetchTickets();
  }, [])

  const  { downloadSecureFile } = useSecureFileAccess();

  const tableState = useTableState({
    data: tickets || [],
    searchFields: ["id", "title", "description", "nameRequester", "lastNameRequester", "category", "priority", "status"],
    initialItemsPerPage: 10,
    filterConfig: TICKET_FILTER_CONFIG,
  });

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "10%",
      accessor: (item: ITickets) => item.id,
    },
    {
      key: "title",
      header: "Titulo",
      width: "20%",
      accessor: (item: ITickets) => item.title,
    },
    {
      key: "tipo",
      header: "Tipo",
      width: "15%",
      render: (item: ITickets) => item.type
    },
    {
      key: "description",
      header: "Descripcion",
      width: "30%",
      accessor: (item: ITickets) => item.description,
    },
    {
      key: "nameRequester",
      header: "Nombre",
      width: "15%",
      accessor: (item: ITickets) => item.nameRequester,
    },
    {
      key: "lastName",
      header: "Apellido",
      width: "15%",
      accessor: (item: ITickets) => item.lastNameRequester,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      render: (item: ITickets) => (
        <span className={getStatusColor(item.status)}>
          {item.status}
        </span>
      )
    },
    {
      key: "phoneNumber",
      header: "Celular",
      width: "15%",
      accessor: (item: ITickets) => item.phone,
    },
    {
      key: "priority",
      header: "Prioridad",
      width: "15%",
      render: (item: ITickets) => (
        <span className={getPriorityColor(item.priority)}>
          {item.priority}
        </span>
      )
    },
    {
      key: "category",
      header: "Categoria",
      width: "20%",
      accessor: (item: ITickets) => item.category,
    },
    {
      key: "headquarter",
      header: "Sede",
      width: "20%",
      accessor: (item: ITickets) => item.headquarter,
    },
    {
      key: "municipio",
      header: "Municipio",
      width: "20%",
      accessor: (item: ITickets) => item.municipio,
    },
    {
      key: "createdAt",
      header: "Creacion",
      width: "25%",
      accessor: (item: ITickets) => FormatDate(item.createdAt),
    },
    {
      key: "updatedAt",
      header: "Ultima modificacion",
      width: "25%",
      accessor: (item: ITickets) => FormatDate(item.updatedAt),
    },
    {
      key: "comments",
      header: "Comentarios",
      width: "10%",
      render: (item: ITickets) => (
        <Suspense fallback={<LoadingSpinner />}>
          <ModalCommetsTicket idTicket={item.id} />
        </Suspense>
      )
    },
    {
      key: "attachment",
      header: "Adjuntos",
      width: "10%",
      render: (item: ITickets) => {
        return item.attachments.length > 0 ? (
          item.attachments.map(a => (
            <Button
              key={a.id}
              variant="any"
              icon={<IoDocumentTextOutline className="w-4 h-4"/>}
              className="p-2 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
              onClick={() => downloadSecureFile(a.id.toString(), "attachments-tickets")}
            />
          ))
        ) : (
          <span className="text-gray-400">-</span>
        ) 
      }
    }
  ]

  return (
    <>
      <ModalSection
        title="Gestión de Tickets"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ GestiónTickets", path: "" },
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
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={isLoading}
          error={error}
          renderActions={(item) => (
            item.status != "Cerrado" ? (
              <Suspense fallback={<LoadingSpinner />}>
                <CerrarModal ticket={item} />
              </Suspense>
            ) : (
              <button
                className="text-lg text-gray-400"
                title="Ticket ya cerrado"
              >
                -
              </button>
            )
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default ProcessHelpDesk;

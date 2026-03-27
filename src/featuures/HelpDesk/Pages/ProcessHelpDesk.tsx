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
import { getPriorityColor, getStatusColor } from "@/featuures/Permission/utils/getColorTicketColumn";
import Button from "@/components/common/Ui/Button";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import useTicketsStore from "../Store/useTicketsStore";
import { Paperclip } from "lucide-react";

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

  const { downloadSecureFile } = useSecureFileAccess();

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
      size: "xs" as const,
      accessor: (item: ITickets) => item.id,
    },
    {
      key: "title",
      header: "Titulo",
      size: "md" as const,
      accessor: (item: ITickets) => item.title,
    },
    {
      key: "tipo",
      header: "Tipo",
      size: "sm" as const,
      render: (item: ITickets) => item.type
    },
    {
      key: "category",
      header: "Categoria",
      size: "md" as const,
      accessor: (item: ITickets) => item.category,
    },
    {
      key: "description",
      header: "Descripcion",
      size: "lg" as const,
      accessor: (item: ITickets) => (
        <span className="line-clamp-5" title={item.description}>
          {item.description}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      size: "sm" as const,
      render: (item: ITickets) => (
        <span className={getStatusColor(item.status)}>
          {item.status}
        </span>
      )
    },
    {
      key: "priority",
      header: "Prioridad",
      size: "sm" as const,
      render: (item: ITickets) => (
        <span className={getPriorityColor(item.priority)}>
          {item.priority}
        </span>
      )
    },
    {
      key: "nameRequester",
      header: "Nombre",
      size: "md" as const,
      accessor: (item: ITickets) => item.nameRequester,
    },
    {
      key: "lastName",
      header: "Apellido",
      size: "md" as const,
      accessor: (item: ITickets) => item.lastNameRequester,
    },
    {
      key: "phoneNumber",
      header: "Celular",
      size: "md" as const,
      accessor: (item: ITickets) => item.phone,
    },
    {
      key: "headquarter",
      header: "Sede",
      size: "md" as const,
      accessor: (item: ITickets) => item.headquarter,
    },
    {
      key: "municipio",
      header: "Municipio",
      size: "sm" as const,
      accessor: (item: ITickets) => item.municipio,
    },
    {
      key: "createdAt",
      header: "Creacion",
      size: "md" as const,
      accessor: (item: ITickets) => FormatDate(item.createdAt),
    },
    {
      key: "updatedAt",
      header: "Ultima modificacion",
      size: "md" as const,
      accessor: (item: ITickets) => FormatDate(item.updatedAt),
    },
    {
      key: "attachment",
      header: "Acciones",
      size: "md" as const,
      render: (item: ITickets) => (
        <div className="grid gap-2">
          {item.attachments.length > 0 && (
            item.attachments.map((a) => (
              <Button
                key={a.id}
                variant="any"
                icon={<Paperclip className="w-4 h-4" />}
                className="p-2 duration-300 ease-in-out bg-gray-200 rounded-full hover:text-white hover:bg-gray-700 dark:text-white focus:outline-none dark:hover:opacity-80 dark:bg-gray-500"
                onClick={() => downloadSecureFile(a.id.toString(), "attachments-tickets")}
              />
            ))
          )}
          <ModalCommetsTicket idTicket={item.id} />
          {item.status != "Cerrado" && (
            <Suspense fallback={<LoadingSpinner />}>
              <CerrarModal ticket={item} />
            </Suspense>
          )}
        </div>
      )
    },
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
        />
      </DataTableContainer>
    </>
  );
};

export default ProcessHelpDesk;

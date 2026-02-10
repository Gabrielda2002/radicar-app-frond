//*Funciones y Hooks
import { Suspense } from "react";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";
import { ITickets } from "@/models/ITickets";
import CerrarModal from "../Components/ModalCerrarTicket";
import ModalCommetsTicket from "../Components/ModalCommetsTicket";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";
import { useFetchTickets } from "../Hooks/useFetchTickets";
import { getPriorityColor, getStatusColor } from "@/featuures/MyRequestsPermissions/utils/getColorTicketColumn";

const ProcessHelpDesk = () => {
  const { tickets, refetchTickets, error, isLoading: loading } = useFetchTickets();

  const tableState = useTableState({
    data: tickets || [],
    searchFields: ["id", "title", "description", "nameRequester", "lastNameRequester", "category", "priority", "status"],
    initialItemsPerPage: 10
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
      >
        <DataTable
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={loading}
          error={error}
          renderActions={(item) => (
            item.status != "Cerrado" ? (
              <Suspense fallback={<LoadingSpinner />}>
                <CerrarModal ticket={item} onTicketClosed={refetchTickets} />
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

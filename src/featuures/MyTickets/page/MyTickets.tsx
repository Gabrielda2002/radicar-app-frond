import HeaderPage from '@/components/common/HeaderPage/HeaderPage'
import { DataTable, DataTableContainer, useTableState } from '@/components/common/ReusableTable'
import useStoreTickets from '../hooks/useStoreTickets';
import { Suspense, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { ITicketsUser } from '@/models/ITickets';
import { FormatDate } from '@/utils/FormatDate';
import { getPriorityColor, getStatusColor } from '@/featuures/MyRequestsPermissions/utils/getColorTicketColumn';
import ModalCommetsTicket from '@/featuures/HelpDesk/Components/ModalCommetsTicket';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const MyTickets = () => {

    const { tickets, fetchTicketsUser, error, isLoading } = useStoreTickets();

    const { user } = useAuth();

    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            fetchTicketsUser(userId);
        }
    }, [userId, fetchTicketsUser]);

    const tableState = useTableState({
        data: tickets || [],
        searchFields: [],
        initialItemsPerPage: 10
    })

    const columns = [
        {   
            key: "id",
            header: "ID",
            width: "10%",
            accessor: (item: ITicketsUser) => item.id,
        },
        {
            key: "title",
            header: "Titulo",
            width: "20%",
            accessor: (item: ITicketsUser) => item.title,
        },
        {
            key: "tipo",
            header: "Tipo",
            width: "15%",
            render: (item: ITicketsUser) => item.type
        },
        {
            key: "description",
            header: "Descripcion",
            width: "30%",
            accessor: (item: ITicketsUser) => item.description,
        },
        {
            key: "status",
            header: "Estado",
            width: "15%",
            render: (item: ITicketsUser) => (
                <span className={getStatusColor(item.status)}>
                    {item.status}
                </span>
            ),
        },
        {
            key: "priority",
            header: "Prioridad",
            width: "15%",
            accessor: (item: ITicketsUser) => (
                <span className={getPriorityColor(item.priority)}>
                    {item.priority}
                </span>
            ),
        },
        {
            key: "category",
            header: "Categoria",
            width: "15%",
            accessor: (item: ITicketsUser) => item.category,
        },
        {
            key: "createdAt",
            header: "Fecha de Creacion",
            width: "20%",
            accessor: (item: ITicketsUser) => FormatDate(item.createdAt),
        },
        {
            key: "updatedAt",
            header: "Ultima Actualizacion",
            width: "20%",
            accessor: (item: ITicketsUser) => FormatDate(item.updatedAt),
        },
        {
            key: "comments",
            header: "Comentarios",
            width: "20%",
            render: (item: ITicketsUser) => (
                <Suspense fallback={<LoadingSpinner/>}>
                    <ModalCommetsTicket idTicket={item.id}/>
                </Suspense>
            )
        },
    ]

    return (
        <>
            <HeaderPage
                breadcrumb={[
                    { label: 'Inicio', path: '/' },
                    { label: 'Mis Tickets', path: '/mis-tickets' }]}
                title='Mis Tickets'
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
                    loading={isLoading}
                    error={error}
                />

            </DataTableContainer>

        </>
    )
}

export default MyTickets

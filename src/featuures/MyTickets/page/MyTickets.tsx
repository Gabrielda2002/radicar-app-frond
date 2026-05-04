import HeaderPage from '@/components/common/HeaderPage/HeaderPage'
import { DataTable, DataTableContainer, useTableState } from '@/components/common/ReusableTable'
import { Suspense, useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { ITicketsWithSource } from '@/featuures/HelpDesk/types/ITickets';
import { FormatDate } from '@/utils/FormatDate';
import { getPriorityColor, getStatusColor } from '@/featuures/Permission/utils/getColorTicketColumn';
import ModalCommetsTicket from '@/featuures/HelpDesk/Components/ModalCommetsTicket';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import ModalServey from '@/featuures/HelpDesk/Components/ModalServey';
import useTicketsStore from '@/featuures/HelpDesk/Store/useTicketsStore';
import Tabs, { type TabItem } from '@/components/common/Ui/Tabs';
import { DESK_CONFIG, TICKET_FILTER_CONFIG } from '../config/MyTicketsConfig';

const MyTickets = () => {

    const [activeDesk, setActiveDesk] = useState<string>("sistemas");
    const { tickets, fetchUserTicketsByEndpoint, isLoading, error } = useTicketsStore();

    const { user } = useAuth();
    const userId = user?.id;

    const handleTabChange = (tabId: string) => {
        setActiveDesk(tabId);
    };

    useEffect(() => {
        if (userId && activeDesk) {
            const endpoint = DESK_CONFIG[activeDesk].endpoint;
            fetchUserTicketsByEndpoint(endpoint, userId);
        }
    }, [userId, activeDesk, fetchUserTicketsByEndpoint]);

    const SEARCH_FIELDS: (keyof ITicketsWithSource)[] = ["id", "title", "description", "category", "priority", "status"];

    const tableState = useTableState({
        data: tickets,
        searchFields: SEARCH_FIELDS,
        initialItemsPerPage: 10,
        filterConfig: TICKET_FILTER_CONFIG,
    });

    const columns = [
        {   
            key: "id",
            header: "ID",
            size: "xs" as const,
            accessor: (item: ITicketsWithSource) => item.id,
        },
        {
            key: "title",
            header: "Titulo",
            size: "md" as const,
            accessor: (item: ITicketsWithSource) => item.title,
        },
        {
            key: "tipo",
            header: "Tipo",
            size: "sm" as const,
            render: (item: ITicketsWithSource) => item.type
        },
        {
            key: "description",
            header: "Descripcion",
            size: "lg" as const,
            accessor: (item: ITicketsWithSource) => item.description,
        },
        {
            key: "status",
            header: "Estado",
            size: "xs" as const,
            render: (item: ITicketsWithSource) => (
                <span className={getStatusColor(item.status)}>
                    {item.status}
                </span>
            ),
        },
        {
            key: "priority",
            header: "Prioridad",
            size: "sm" as const,
            accessor: (item: ITicketsWithSource) => (
                <span className={getPriorityColor(item.priority)}>
                    {item.priority}
                </span>
            ),
        },
        {
            key: "category",
            header: "Categoria",
            size: "md" as const,
            accessor: (item: ITicketsWithSource) => item.category,
        },
        {
            key: "createdAt",
            header: "Creacion",
            size: "sm" as const,
            accessor: (item: ITicketsWithSource) => FormatDate(item.createdAt),
        },
        {
            key: "updatedAt",
            header: "Actualizacion",
            size: "sm" as const,
            accessor: (item: ITicketsWithSource) => FormatDate(item.updatedAt),
        },
        {
            key: "comments",
            header: "Comentarios",
            size: "xs" as const,
            render: (item: ITicketsWithSource) => (
                <Suspense fallback={<LoadingSpinner/>}>
                    <ModalCommetsTicket idTicket={item.id} source={item._source} />
                </Suspense>
            )
        },
        {
            key: 'survey',
            header: 'Encuesta',
            size: 'xs' as const,
            render: (item: ITicketsWithSource) => (
                item.surveyId === null ? (
                    <Suspense fallback={<LoadingSpinner/>}>
                        <ModalServey idTicket={item.id} />
                    </Suspense>
                ) : (
                    <span className="text-gray-500">Enviada</span>
                )
            )
        }
    ]

    const renderTable = () => (
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
    );

    const tabs: TabItem[] = [
        {
            id: "sistemas",
            label: "Sistemas",
            content: renderTable(),
        },
        {
            id: "infraestructura",
            label: "Infraestructura",
            content: renderTable(),
        },
        {
            id: "sst",
            label: "SST",
            content: renderTable(),
        }
    ];

    return (
        <>
            <HeaderPage
                breadcrumb={[
                    { label: 'Inicio', path: '/' },
                    { label: 'Mis Tickets', path: '/mis-tickets' }]}
                title='Mis Tickets'
            />

            <Tabs tabs={tabs} variant="underline" onChange={handleTabChange} />

        </>
    )
}

export default MyTickets
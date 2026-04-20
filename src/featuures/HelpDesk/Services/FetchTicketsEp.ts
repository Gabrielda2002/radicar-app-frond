import { ITickets } from "@/featuures/HelpDesk/types/ITickets";
import { api } from "@/utils/api-config";

export const FetchTicketsEp = async (): Promise<ITickets[]> => {
    const response = await api.get("/tickets-table");
    const data = response.data.map((ticket: ITickets) => ({
            ...ticket,
            createdAt: new Date(ticket.createdAt),
            updatedAt: new Date(ticket.updatedAt),
    }));
    return data;
}
import { ICustomDataTickets } from "@/models/ICustomDataTickets";
import { api } from "@/utils/api-config";

export const FetchPriorityEp = async (): Promise<ICustomDataTickets[]> => {
    const response = await api.get('/prioridades');
    return response.data;
}
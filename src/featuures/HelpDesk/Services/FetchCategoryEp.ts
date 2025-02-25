import { ICustomDataTickets } from "@/models/ICustomDataTickets"
import { api } from "@/utils/api-config"

export const FetchCategoryEp = async (): Promise<ICustomDataTickets[]> => {
    const response = await api.get('/categorias');
    return response.data;
}
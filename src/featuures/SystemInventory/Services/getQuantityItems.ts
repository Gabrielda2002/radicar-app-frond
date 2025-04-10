import { api } from "@/utils/api-config"

export const getQuantityItems = async (endPoint: string) => {
    return await api.get(`/${endPoint}`);
}
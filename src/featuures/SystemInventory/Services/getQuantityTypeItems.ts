import { api } from "@/utils/api-config"

export const getQuantityTypeItems = async (typeItem: string) => {
    return await api.get(`${typeItem}`);
}
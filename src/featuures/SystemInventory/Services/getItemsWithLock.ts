import { api } from "@/utils/api-config"

export const getItemsWithLock = async (endpoint: string) => {
    return await api.get(`/${endpoint}`)
}
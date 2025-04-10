import { api } from "@/utils/api-config"

export const getAssetByClassification = async (id: string) => {
    return await api.get(`/activos/${id}`)
}
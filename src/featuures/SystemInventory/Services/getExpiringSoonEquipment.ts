import { api } from "@/utils/api-config"

export const getExpiringSoonEquipment = async (endPoint: string) => {
    const response = await api.get(`/${endPoint}`)
    return response;
} 
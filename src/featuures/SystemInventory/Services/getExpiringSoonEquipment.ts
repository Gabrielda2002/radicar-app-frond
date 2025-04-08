import { api } from "@/utils/api-config"

export const getExpiringSoonEquipment = async () => {
    const response = await api.get('/equipments/statics/warrantyExpiration')
    return response;
} 
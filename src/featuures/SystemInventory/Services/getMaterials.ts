import { api } from "@/utils/api-config"

export const getMaterials = async () => {
    return await api.get(`/materiales`)
}
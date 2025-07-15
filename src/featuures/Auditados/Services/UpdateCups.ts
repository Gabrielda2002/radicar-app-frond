import { api } from "@/utils/api-config"

export const UpdateCups = async (id: number, data: FormData) => {
        return api.put(`/actualizar-cups/${id}`, data)
    
}
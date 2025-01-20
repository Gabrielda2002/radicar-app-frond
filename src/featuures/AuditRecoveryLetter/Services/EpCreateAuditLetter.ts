import { api } from "@/utils/api-config"

export const EpCreateAuditLetter = async (data: object, id: number) => {
    const response = await api.put(`/create-audit-letter/${id}`, data)
    
    return response;
}
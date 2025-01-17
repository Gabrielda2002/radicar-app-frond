import { api } from "@/utils/api-config"

export const SaveDateDownload = async (date: string, id: number) => {
    return api.put(`/save-date-print/${id}`, { dateImpression: date })
}
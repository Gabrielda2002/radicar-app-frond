import { api } from "@/utils/api-config"

export const UpdateStatusTicketEp = async (content: FormData) => {
    return await api.post(`/comment-status`, content);
}
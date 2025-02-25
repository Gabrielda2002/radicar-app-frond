import { api } from "@/utils/api-config"

export const CreateTicketEp = async (data: FormData) => {
    return api.post('/tickets', data)
}
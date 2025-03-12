import { api } from "@/utils/api-config"

export const validateServeyTicketEp = async (data: FormData) => {
    return await api.post('/validate/servey-ticket', data);
}
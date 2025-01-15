import { api } from "@/utils/api-config"

export const EpCreateRequestLetter = async (data: FormData) => {
    return api.post('/create-request-letter', data);
}
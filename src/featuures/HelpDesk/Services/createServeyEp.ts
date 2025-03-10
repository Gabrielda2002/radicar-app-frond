import { api } from "@/utils/api-config"

export const createServeyEp = async (data: FormData) => {
    return api.post('/encuestas-satisfaccion', data);
}
import { api } from "@/utils/api-config"

export const getTypeArea = async () => {
    return await api.get('/tipo-area');
}
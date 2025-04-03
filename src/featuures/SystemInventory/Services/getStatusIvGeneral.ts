import { api } from "@/utils/api-config"

export const getStatusIvGeneral = async () => {
    return await api.get('/estado/iv-general')
}
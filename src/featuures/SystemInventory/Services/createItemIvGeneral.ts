import { api } from "@/utils/api-config"

export const createItemIvGeneral = async (data: FormData) => {
    return api.post('/inventario/general', data)
}
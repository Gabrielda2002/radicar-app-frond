import { api } from "@/utils/api-config"

export const updateItemIvGeneral = async (data: FormData, id: number) => {
    return await api.put(`/inventario/general/${id}`,  data);
}
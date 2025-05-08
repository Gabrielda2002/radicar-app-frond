import { api } from "@/utils/api-config";

export const updateItemTv = async (data: Object, id: number) => {
    return await api.put(`/televisores/${id}`, data);
}
import { api } from "@/utils/api-config"

export const updatePhone = async (items: Object, id: number) => {
    return await api.put(`/celular/${id}`, items, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
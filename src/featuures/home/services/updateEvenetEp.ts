import { api } from "@/utils/api-config";

export const updateEvenetEp = async (data: FormData, id: number) => {
    return api.put(`/eventos/${id}`, data);
}
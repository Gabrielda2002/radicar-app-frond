import { api } from "@/utils/api-config";

export const createItemTv = async (data: Object) => {
    return await api.post('/televisores', data);
};
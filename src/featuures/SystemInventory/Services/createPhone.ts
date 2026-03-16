import { api } from "@/utils/api-config"

export const createPhone = async (data: Object) => {
    return api.post('/phones/inventory', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}
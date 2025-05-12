import { api } from "@/utils/api-config"

export const createPhone = async (data: Object) => {
    return api.post('/celular', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}
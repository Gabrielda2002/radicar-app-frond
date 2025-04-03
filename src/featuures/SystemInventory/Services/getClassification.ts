import { api } from "@/utils/api-config";

export const getClassification = async () => {
    const response = await api.get('/clasificaciones');
    return response;
}
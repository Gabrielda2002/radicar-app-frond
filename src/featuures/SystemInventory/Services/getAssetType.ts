import { api } from "@/utils/api-config";

export const getAssetType = async () => {
    return await api.get('/tipo-activo');
}
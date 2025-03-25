import { IRegisterUser } from "@/models/IRegisterUser";
import { api } from "@/utils/api-config";

export const getRegisterUser = async (documentNumber: string): Promise<IRegisterUser[]> => {
    const response = await api.get(`/registro/entrada/${documentNumber}`)
    return response.data
}
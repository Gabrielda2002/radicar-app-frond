import { IRegisterUser } from "@/models/IRegisterUser";
import { api } from "@/utils/api-config";

export const getRegisterUser = async (documentNumber: string, dateStart: string, dateEnd: string): Promise<IRegisterUser[]> => {
    console.log(documentNumber, dateStart, dateEnd)
    const response = await api.post(`/registro-entrada`, {
            "dateStart" : dateStart,
            "dateEnd" : dateEnd,
            "documentNumber" : documentNumber
    })
    return response.data
}
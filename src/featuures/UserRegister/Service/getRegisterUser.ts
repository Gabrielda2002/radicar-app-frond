import { IRegisterUser } from "@/models/IRegisterUser";
import { api } from "@/utils/api-config";

export const getRegisterUser = async (documentNumber: string, dateStart: string, dateEnd: string): Promise<IRegisterUser[]> => {
    const response = await api.post(`/registro-entrada`, {
            "dateStart" : dateStart,
            "dateEnd" : dateEnd,
            "documentNumber" : documentNumber
    })
    console.log(response.data);
    const registerUser = response.data.map((r: IRegisterUser) => ({
        ...r,
        registerDate: new Date(r.registerDate),
    }))

    console.log("despues del formateo", registerUser)
    return registerUser;
}
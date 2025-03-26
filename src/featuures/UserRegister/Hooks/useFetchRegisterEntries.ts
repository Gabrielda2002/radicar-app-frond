import { IRegisterUser } from "@/models/IRegisterUser";
import { useState } from "react";
import { getRegisterUser } from "../Service/getRegisterUser";

export const useFetchRegisterEntries = () => {
    const [dataRegister, setDataRegister] = useState<IRegisterUser[]>([]);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
    const [errorRegister, setErrorRegister] = useState<string | null>(null);

    const getData = async (documentNumber: string, dateStart: string, dateEnd: string) => {
        try {
            
            setLoadingRegister(true);
            
            const response = await getRegisterUser(documentNumber, dateStart, dateEnd);
            setDataRegister(response);

        } catch (error: any) {
            if (error.response.status === 404) {
                setErrorRegister("No se encontraron registros");
            }else{
                setErrorRegister("Error inesperado");
            }
        }finally{
            setLoadingRegister(false);
        }
    }
    return { dataRegister, loadingRegister, errorRegister, getData };
}
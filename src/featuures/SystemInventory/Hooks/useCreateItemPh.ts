import { useState } from "react";
import { createPhone } from "../Services/createPhone";
import { updatePhone } from "../Services/updatePhone";

export const useCreateItemPh = () => {
    const  [ loading, setLoading ] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateItem = async (items: Object) => {
        try {
            
            setLoading(true);

            const response = await createPhone(items);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                return response;
            }

        } catch (error: any) {
            if (error.response.status === 400) {
                setError("Revise los campos: " + error.mensage);
            }else{
                setError("Error al crear el item: " + error);
            }
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    const handleUpdatePhone = async (items: Object, id: number) => {
        try {
            
            const response = await updatePhone(items, id);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                return response;
            }
            
        } catch (error: any) {
            if (error.response.status === 400) {
                setError("Revise los campos: " + error.mensage);
            }else if (error.response.status === 404) {
                setError("No se encontró el item: " + error.mensage);
            }else{
                setError("Error al crear el item: " + error);
            }
            console.log(error)
        }
    }

    return { handleCreateItem, handleUpdatePhone ,error, loading };

}
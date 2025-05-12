import { useState } from "react";
import { createPhone } from "../Services/createPhone";

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
            }
            setError("Error al crear el item: " + error);
            console.log('entra al catch')
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    return { handleCreateItem, error, loading };

}
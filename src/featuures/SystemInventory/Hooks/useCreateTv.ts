import { useState } from "react";
import { createItemTv } from "../Services/createItemTv";
import { updateItemTv } from "../Services/updateItemTv";

export const useCreateTv = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createTv = async (data: Object) => {
        try {
            
            setLoading(true);

            const response = await createItemTv(data);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                return response;
            }

        } catch (error: any) {
            if (error.response.status === 400) {
                setError("Revise los campos: " + error);
            }
            setError("Error al crear el item: " + error);
        }finally{
            setLoading(false);
        }
    }

    const updateTv = async (data: Object, id: number) => {
        try {
            setLoading(true);

            const response = await updateItemTv(data, id);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                return response;
            }

        } catch (error: any) {
            if (error.response.status === 404) {
                setError("No se encontró el item: " + error);
            }
            setError("Error al actualizar el item: " + error);
        }finally{
            setLoading(false);
        }
    }

    return { createTv, updateTv, error, loading };
}
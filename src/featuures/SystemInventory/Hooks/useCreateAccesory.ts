import { createAccesoryEquipmentEp } from "@/utils/api-config";
import { useState } from "react";

export const useCreateAcceosry = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAccesory = async (item: FormData, ep: string) => {
        try {
            
            setLoading(true);

            const response = await createAccesoryEquipmentEp(item, ep);

            if (response.status === 201 || response.status === 200) {
                setError(null);
                return response;
            }

        } catch (error: any) {
            if (error.response.status === 400) {
                setError(
                    "Error en los datos enviados. Por favor, revisa los campos." +
                    error.response.data.message
                );
            } else if (error.response.status === 409) {
                setError(
                    "El elemento ya existe. Por favor, verifica los datos. " +
                    error.response.data.message
                );
            } else if (error.response.status === 500) {
                setError("Error interno del servidor. Por favor, intenta más tarde. " + error);
            }
        }finally {
            setLoading(false);
        }
    }

    return{
        createAccesory,
        loading,
        error
    };

}
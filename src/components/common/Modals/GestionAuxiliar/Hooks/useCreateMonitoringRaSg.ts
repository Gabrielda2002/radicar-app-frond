import { useState } from "react";
import { CreateMonitoringRaSg } from "../Services/CreateMonitoringRaSg";

export const useCreateMonitoringRaSg = ()=> {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createMonitoring = async (formData: FormData, url: string) => {
        try {
            
            setLoading(true);

            const response = await CreateMonitoringRaSg(formData, url);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                return response;
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                setError("Error interno del servidor. Por favor, inténtelo más tarde.");
            }else {
                setError("Error al registrar la gestión: " + error.response?.data?.message);
            }
        }finally{
            setLoading(false);
        }
    }

    return {
        createMonitoring,
        loading,
        error,
    }

}
import { api } from "@/utils/api-config";
import { useState } from "react";

interface UsePatientMutationsReturn {
    loading: boolean;
    error: string | null;
    createPatient: (data: Object, onSuccess: () => void) => Promise<any>;
    updatePatient: (data: Object, id: number, onSuccess: () => void) => Promise<any>;
}

export const usePatientMutations = (): UsePatientMutationsReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createPatient = async (data: Object, onSuccess: () => void) => {
        try {
            
            setLoading(true);
            const response = await api.post("/patient" , data);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                onSuccess();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor, por favor intente más tarde.");
            }else {
                setError(error.response.data.message);
            }
        }finally{
            setLoading(false);
        }
    }

    const updatePatient = async (data: Object, id: number, onSuccess: () => void) => {
        try {
            setLoading(true);
            const response = await api.put(`/table/patient/${id}`, data);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                onSuccess();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor, por favor intente más tarde.");
            } else {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, createPatient, updatePatient };

}
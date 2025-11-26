import { api } from "@/utils/api-config";
import { useState } from "react";
import { toast } from "react-toastify";

export const usePatient = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createPatient = async (data: FormData) => {
        try {
            
            setLoading(true);
            const response = await api.post("/pacientes" , data);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                toast.success("Paciente creado exitosamente");
                return response.data;
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

    const updatePatient = async (data: FormData, id: number) => {
        try {
            setLoading(true);
            const response = await api.put(`/pacientes-actualizar-tablet/${id}`, data);

            if (response.status === 200 || response.status === 201) {
                setError(null);
                toast.success("Paciente actualizado exitosamente");
                return response.data;
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
import { useState } from "react";
import { UseBalancesMutationsReturn } from "../Types/IBalancesVacations";
import { api } from "@/utils/api-config";

export const useBalancesMutations = (): UseBalancesMutationsReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const configureBalances = async (config: Object,userId: number, onSuccess: () => void) => {
        try {
            setIsLoading(true);
            
            const response = await api.post(`/configure/${userId}`, config);

            if (response.status === 200) {
                onSuccess();
                setError(null);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setError(`${error.response.data.message || "Error desconocido. Por favor, inténtelo de nuevo."}`);
            }
        }finally{
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        configureBalances,
    }
}
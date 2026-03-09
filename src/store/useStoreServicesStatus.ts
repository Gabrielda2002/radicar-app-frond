import { IEstados } from "@/models/IEstados";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStoreServicesStatus {
    status: IEstados[];
    isLoading: boolean;
    error: string | null;
    getStatus: () => Promise<void>;
}

export const useStoreServicesStatus = create<UseStoreServicesStatus>((set) => ({
    status: [],
    isLoading: false,
    error: null,

    getStatus: async () => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.get('/estados');

            if (response.status === 200) {
                set({ status: response.data });
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error?.response?.data?.message })
            }
        } finally {
            set({ isLoading: false });
        }
    }
}));
import { IUnidadFuncional } from "@/models/IUnidadFuncional";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface useStoreFuntionalUnit {
    units: IUnidadFuncional[];
    isLoading: boolean;
    error: string | null;
    getFuntionalUnit: () => Promise<void>;
}

export const useStoreFuntionalUnit = create<useStoreFuntionalUnit>((set) => ({
    units: [],
    isLoading: false,
    error: null,

    getFuntionalUnit: async () => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.get('/unidad-funcional');

            if (response.status === 200) {
                set({ units: response.data });
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
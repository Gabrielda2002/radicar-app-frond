import { api } from "@/utils/api-config";
import { create } from "zustand";

export interface IAssets {
    id: number;
    name: string;
    classificationId: number;
    classificationName: string;
}

interface UseStoreAsset {
    asset: IAssets[];
    error: string | null;
    isLoading: boolean;
    getAssetByClassification: (id: string) => Promise<void>;
    getAssets: () => Promise<void>;
    refetch: () => Promise<void>;
}

export const useStoreAsset = create<UseStoreAsset>((set, get) => ({
    asset: [],
    error: null,
    isLoading: false,

    getAssetByClassification: async (id: string) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.get(`/activos/${id}`);

            if (response.status === 200 || response.status === 201) {
                set({ asset: response.data, error: null });
            }

        } catch (error: any) {
            if (error.response?.status === 404) {
                set({ error: "No se encontraron activos disponibles." });
            } else if (error.response?.status === 500) {
                set({ error: "Error del servidor, intenta nuevamente más tarde" });
            } else {
                set({ error: error?.response?.data?.message || "Error inesperado al obtener los activos." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    getAssets: async () => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.get("/activos");

            if (response.status === 200) {
                set({ asset: response.data, error: null });
            }

        } catch (error: any) {
            if (error.response?.status === 404) {
                set({ error: "No se encontraron activos disponibles." });
            } else if (error.response?.status === 500) {
                set({ error: "Error del servidor, intenta nuevamente más tarde" });
            } else {
                set({ error: error?.response?.data?.message || "Error inesperado al obtener los activos." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    refetch: async () => {
        await get().getAssets();
    }

}));

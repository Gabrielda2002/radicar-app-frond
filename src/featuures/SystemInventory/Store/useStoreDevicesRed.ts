import { IItemsNetworking } from "@/models/IItemsNetworking";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStoreDevicesRed {
    devices: IItemsNetworking[];
    error: string | null;
    isLoading: boolean;
    getDevicesByHeadquartersId: (headquartersId: number) => Promise<void>;
    createDevice: (data: Object, onSuccess?: () => void) => Promise<void>;
    updateDevice: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStoreDevicesRed = create<UseStoreDevicesRed>((set) => ({
    devices: [],
    error: null,
    isLoading: false,

    getDevicesByHeadquartersId: async (headquartersId: number) => {},

    createDevice: async (data: Object, onSuccess?: () => void) => {
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.post("/devices-red", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                onSuccess?.()
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            }else {
                set({ error: error.response?.data?.message });
            }
        }finally{
            set({ isLoading: false });
        }
    },

    updateDevice: async (id: number, data: Object, onSuccess?: () => void) => {
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.put(`/devices-red/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                onSuccess?.()
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            }else {
                set({ error: error.response?.data?.message });
            }
        }finally{
            set({ isLoading: false });
        }
    }
}));
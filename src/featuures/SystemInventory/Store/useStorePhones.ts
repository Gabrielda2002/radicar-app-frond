import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStorePhones {
    phones: any[];
    error: string | null;
    isLoading: boolean;
    getPhonesByHeadquartersId: (headquartersId: number) => Promise<void>;
    createPhone: (data: Object, onSuccess?: () => void) => Promise<void>;
    updatePhone: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStorePhones = create<UseStorePhones>((set) => ({
    phones: [],
    error: null,
    isLoading: false,

    getPhonesByHeadquartersId: async (_headquartersId: number) => { },

    createPhone: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post('/phones/inventory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: 'Error interno del servidor' });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updatePhone: async (id: number, data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.put(`/phones/inventory/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: 'Error interno del servidor' });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));
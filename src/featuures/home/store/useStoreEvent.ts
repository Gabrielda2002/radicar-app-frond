import { IEventos } from "@/models/IEventos";
import { api } from "@/utils/api-config";
import { create } from "zustand";

type UseStoreEventReturn = {
    data: IEventos[];
    error: string | null;
    isLoading: boolean;
    get: () => void;
    create: (data: Object, onSuccess: () => void) => void;
}

export const useStoreEvent = create<UseStoreEventReturn>((set, get) => ({
    data: [],
    error: null,
    isLoading: false,

    get: async () => {
        set({ isLoading: true })
        try {

            const response = await api.get('/events');

            if (response.status === 200 || response.status === 201) {
                set({ data: response.data })
            }

        } catch (error: any) {
            const errorMsg = error?.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : error?.response?.message

            set({ error: errorMsg })
        } finally {
            set({ isLoading: false })
        }
    },

    create: async (data, onSuccess) => {
        set({ isLoading: true })
        try {

            const response = await api.post('/events', data)

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
                await get().get()
            }


        } catch (error: any) {
            const errorMsg = error?.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : error?.response?.message

            set({ error: errorMsg })
        } finally {
            set({ isLoading: false })
        }
    }
}))
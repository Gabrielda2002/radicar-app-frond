import { IEventos } from "@/models/IEventos";
import { api } from "@/utils/api-config";
import { create } from "zustand";

type ApiError = {
    response?: {
        status?: number;
        data?: { message?: string };
    };
};

const normalizeEvent = (event: IEventos): IEventos => ({
    ...event,
    location: event.location || event.place || event.lugar,
    responsibleName: event.responsibleName || event.responsible || event.responsableNombre,
    responsibleEmail: event.responsibleEmail || event.emailResponsible || event.responsableCorreo,
});

type UseStoreEventReturn = {
    data: IEventos[];
    error: string | null;
    isLoading: boolean;
    get: () => void;
    create: (data: object, onSuccess: () => void) => void;
    update: (id: number, data: object, onSuccess: () => void) => void;
    remove: (id: number, onSuccess: () => void) => void;
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
                set({ data: response.data.map(normalizeEvent) })
            }

        } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMsg = apiError.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : apiError.response?.data?.message

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


        } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMsg = apiError.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : apiError.response?.data?.message

            set({ error: errorMsg })
        } finally {
            set({ isLoading: false })
        }
    },

    update: async (id, data, onSuccess) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.put(`/events/${id}`, data)

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
                await get().get()
            }
        } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMsg = apiError.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : apiError.response?.data?.message || "No fue posible actualizar el evento"

            set({ error: errorMsg })
        } finally {
            set({ isLoading: false })
        }
    },

    remove: async (id, onSuccess) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.delete(`/events/${id}`)

            if (response.status === 200 || response.status === 204) {
                onSuccess?.();
                await get().get()
            }
        } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMsg = apiError.response?.status === 500 ?
                "Error inesperado, por favor intenta mas tarde"
                : apiError.response?.data?.message || "No fue posible eliminar el evento"

            set({ error: errorMsg })
        } finally {
            set({ isLoading: false })
        }
    }
}))
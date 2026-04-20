import { ITickets } from "@/models/ITickets";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseTicketsStoreReturn {
    tickets: ITickets[];
    error: string | null;
    isLoading: boolean;
    fetchTickets: (endpoints?: string[]) => Promise<void>;
    createTicket: (endpoint: string, data: Object, onSuccess?: () => void) => Promise<void>;
}

const useTicketsStore = create<UseTicketsStoreReturn>((set) => ({
    tickets: [],
    error: null,
    isLoading: false,

    fetchTickets: async () => {
        try {
            set({ isLoading: true, error: null });

            const responses = await api.get("/tickets-table");

            if (responses.status === 200) {
                set({ tickets: responses.data, error: null });
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtelo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error desconocido. Por favor, inténtelo de nuevo." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createTicket: async (endpoint, data, onSuccess) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.post(endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.status === 200) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtelo de nuevo más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error desconocido. Por favor, inténtelo de nuevo." });
            }
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useTicketsStore;
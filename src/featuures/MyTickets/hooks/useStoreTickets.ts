import { ITicketsUser } from "@/models/ITickets";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStoreTickets {
    tickets: ITicketsUser[] | null;
    error: string | null;
    isLoading: boolean;
    fetchTicketsUser: (id: number) => Promise<void>;
}

const useStoreTickets =  create<UseStoreTickets>((set) => ({
    tickets: null,
    error: null,
    isLoading: false,
    
    fetchTicketsUser: async (id: number) => {   
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.get(`/tickets/user/${id}`);

            set({
                tickets: response.data
            })

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            }else{
                set({ error: error.response?.data?.message || "Error al cargar los tickets" });
            }
        }   finally {
            set({ isLoading: false });
        }
    }

}))

export default useStoreTickets;
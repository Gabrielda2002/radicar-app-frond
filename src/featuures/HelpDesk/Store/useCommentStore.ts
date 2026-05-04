import { IComment } from "@/models/IComment";
import { api } from "@/utils/api-config";
import { create } from "zustand";
import { DeskSource } from "../types/ITickets";
import { DESK_VIEW_CONFIG, getCommentsEndpoint } from "../config/ConfigDesk";
import useTicketsStore from "./useTicketsStore";

interface UseCommentStore {
    comments: IComment[];
    addComment: (endpoint: string, data: Object, onSuccess?: () => void) => void;
    fetchComments: (source: DeskSource, ticketId: number) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const useCommentStore = create<UseCommentStore>((set) => ({
    comments: [],
    isLoading: false,
    error: null,

    addComment: async (endpoint: string, data: Object, onSuccess?: () => void) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.post(endpoint, data);

            const ticketsStore = useTicketsStore.getState()
            const fetchTickets = ticketsStore.fetchTickets

            const endPoints = DESK_VIEW_CONFIG[localStorage.getItem("rol") ?? ""] ?? ["/tickets-table"];
        
            console.log('endpoints seleccionados', endPoints)

            if (response.status === 201 || response.status === 200) {
                await fetchTickets(endPoints);
                onSuccess?.();
            }

        } catch (error: any) {
            if (error?.response?.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error?.response?.data?.message || "Error al agregar el comentario" });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    fetchComments: async (source: DeskSource, ticketId: number) => {
        try {
            set({ isLoading: true, error: null, comments: [] });

            const endpoint = getCommentsEndpoint(source, ticketId);
            const response = await api.get(endpoint);

            const data = response.data.map((comment: IComment) => ({
                ...comment,
                createdAt: new Date(comment.createdAt),
            }));

            set({ comments: data, error: null });
        } catch (error: any) {
            if (error?.response?.status === 404) {
                set({ error: "No se encontraron comentarios para este ticket", comments: [] });
            } else {
                set({ error: "Error al obtener los comentarios del ticket. " + error });
            }
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useCommentStore;

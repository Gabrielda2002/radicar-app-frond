import { IComment } from "@/models/IComment";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseCommentStore {
    comments: IComment[];
    addComment: (data: Object, onSuccess?: () => void) => void;
    isLoading: boolean;
    error: string | null;
}

const useCommentStore = create<UseCommentStore>((set) => ({
    comments: [],
    isLoading: false,
    error: null,

    addComment: async (data: Object, onSuccess?: () => void) => {
        try {
            set({ isLoading: true, error: null });

            await api.post(`/comment-status`, data);

            onSuccess?.();

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            }else {
                set({ error: error?.response?.data?.message || "Error al agregar el comentario" });
            }
        }finally {
            set({ isLoading: false });
        }
    }

}));

export default useCommentStore;
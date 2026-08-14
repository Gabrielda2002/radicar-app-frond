import { create } from "zustand";
import { api } from "@/utils/api-config";
import {
  ICreatePqrsdfCommentInput,
  IPqrsdfComment,
} from "@/featuures/Pqrsdf/models/IPqrsdfComment";

interface UseStoreComments {
  comments: IPqrsdfComment[];
  error: string | null;
  isLoading: boolean;
  isCreating: boolean;
  fetchComments: (pqrsdfId: number | string) => Promise<void>;
  createComment: (
    pqrsdfId: number | string,
    data: ICreatePqrsdfCommentInput,
    onSuccess?: () => void
  ) => Promise<void>;
  resetComments: () => void;
}

const getApiErrorMessage = (error: unknown): string | undefined => {
  if (typeof error !== "object" || error === null) return undefined;

  const response = (error as {
    response?: { data?: { message?: unknown } };
  }).response;

  return typeof response?.data?.message === "string"
    ? response.data.message
    : undefined;
};

let fetchToken = 0;

export const useStoreComments = create<UseStoreComments>((set) => ({
  comments: [],
  error: null,
  isLoading: false,
  isCreating: false,

  fetchComments: async (pqrsdfId) => {
    const token = ++fetchToken;
    try {
      set({ isLoading: true, error: null });

      const response = await api.get(`/pqrsdf/${pqrsdfId}/comments`);

      if (token !== fetchToken) return;

      if (response.status === 200) {
        set({ comments: response.data });
      }
    } catch (error: unknown) {
      if (token !== fetchToken) return;

      const response = (error as { response?: { status?: number } }).response;

      if (response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error: getApiErrorMessage(error) || "Error al obtener los comentarios.",
        });
      }
    } finally {
      if (token === fetchToken) {
        set({ isLoading: false });
      }
    }
  },

  createComment: async (pqrsdfId, data, onSuccess) => {
    try {
      set({ isCreating: true, error: null });

      const formData = new FormData();
      formData.append("comment", data.comment);
      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await api.post(`/pqrsdf/${pqrsdfId}/comments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        onSuccess?.();
      }
    } catch (error: unknown) {
      const response = (error as { response?: { status?: number } }).response;

      if (response?.status === 500) {
        set({ error: "Error del servidor, por favor intente más tarde." });
      } else {
        set({
          error: getApiErrorMessage(error) || "Error al guardar el comentario.",
        });
      }
    } finally {
      set({ isCreating: false });
    }
  },

  resetComments: () => {
    fetchToken++;
    set({ comments: [], error: null, isLoading: false, isCreating: false });
  },
}));

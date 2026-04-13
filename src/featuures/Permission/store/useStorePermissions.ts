import { create } from "zustand";
import { IMyRequestsPermissions } from "../type/MyRequestsPermissions,.type";
import { api } from "@/utils/api-config";
import { IRequestsPermissions } from "../type/IRequestsPermissions";

interface UseStorePermissions {
    permissionsUser: IMyRequestsPermissions[];
    requestPermissions: IRequestsPermissions[];
    error: string | null;
    isLoading: boolean;
    getMyRequests: () => Promise<void>;
    createRequest: (data: Object, onSuccess?: () => void) => Promise<void>;
    cancelRequest: (requestId: number, onSuccess?: () => void) => Promise<void>;
    updateRequest: (data: Object, requestId: number, stepId: number, onSuccess?: () => void) => Promise<void>;
    getRequest: () => Promise<void>;
}

export const useStorePermissions = create<UseStorePermissions>((set, get) => ({
    permissionsUser: [],
    error: null,
    isLoading: false,
    requestPermissions: [],

    getMyRequests: async () => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.get('/list/requests/user');

            if (response.status === 200) {
                set({ permissionsUser: response.data });
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error?.response?.data?.message })
            }
        } finally {
            set({ isLoading: false });
        }
    },
    createRequest: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post("/permisos/requests", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error?.response?.data?.message })
            }
        } finally {
            set({ isLoading: false });
        }
    },

    cancelRequest: async (requestId: number, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.put(`/permission/requests/${requestId}/cancel`);

            if (response.status === 200) {
                onSuccess?.();
                get().getRequest();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error?.response?.data?.message })
            }
        } finally {
            set({ isLoading: false });
        }
    },

updateRequest: async (data: Object, requestId: number, stepId: number, onSuccess?: () => void) => {
    try {
        
        set({ isLoading: true, error: null });

      const response = await api.post(`/permissions/requests/${requestId}/steps/${stepId}/actions`, data);
    
        if (response.status === 200) {
            onSuccess?.();
            get().getRequest();
        }

    } catch (error: any) {
        if (error.response.status === 500) {
            set({ error: "Error interno del servidor" });
        } else {
            set({ error: error?.response?.data?.message })
        }
    } finally {
        set({ isLoading: false });
    }
},

getRequest: async () => {
    try {
        
        set({ isLoading: true, error: null });

      const response = await api.get("/list/requests");

        if (response.status === 200) {
            set({ requestPermissions: response.data });
        }

    } catch (error: any) {
        if (error.response.status === 500) {
            set({ error: "Error interno del servidor" });
        } else {
            set({ error: error?.response?.data?.message })
        }
    }finally {
        set({ isLoading: false });
    }
}

}));
import { IAuditados } from "@/models/IAuditados";
import { IAuditar } from "@/models/IAuditar";
import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseAuthService {
    services: IAuditar[];
    servucesAuthorized: IAuditados[];
    isLoading: boolean;
    error: string | null;
    getAuthorizedServices: () => Promise<void>;
    authorizeService: (data: Object, radicadoId: number, onSuccess: () => void) => void;
    getAllServices: () => Promise<void>;
    updateCupsAuthorized: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

const useStoreAuthService = create<UseAuthService>((set, get) => ({
    services: [],
    isLoading: false,
    error: null,
    servucesAuthorized: [],

    getAuthorizedServices: async () => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get('/auditoria-table');
            
            if (response.status === 200) {
                set({ services: response.data });
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            }else {
                set({ error: error?.response?.data?.message || "Error al obtener los servicios autorizados." });
            }
        }finally {
            set({ isLoading: false });
        }
    },
    
    authorizeService: async (data: Object, radicadoId: number, onSuccess: () => void) => {
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.put(`/autorizar-radicado/${radicadoId}`, data);

            if (response.status === 200) {
                onSuccess();
                await get().getAuthorizedServices();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error?.response?.data?.message || "Error al autorizar el servicio." });
            }
        }finally {
            set({ isLoading: false });
        }
    },

    getAllServices: async () => {
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.get('/auditoria-auditados');

            if (response.status === 200) {
                set({ servucesAuthorized: response.data });
            }
            
        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error?.response?.data?.message || "Error al obtener los servicios." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updateCupsAuthorized: async (id: number, data: Object, onSuccess?: () => void) => {
        try {
            
            set({ isLoading: true, error: null });

            const response = await api.put(`/actualizar-cups/${id}`, data);

            if (response.status === 200) {
                onSuccess?.();
                await get().getAllServices();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, inténtalo de nuevo más tarde." });
            } else {
                set({ error: error?.response?.data?.message || "Error al actualizar el CUPS autorizado." });
            }
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useStoreAuthService;
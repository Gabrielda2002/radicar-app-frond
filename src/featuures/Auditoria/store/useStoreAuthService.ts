import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseAuthService {
    services: any[];
    isLoading: boolean;
    error: string | null;
    getAuthorizedServices: () => Promise<void>;
    authorizeService: (data: Object, radicadoId: number, onSuccess: () => void) => void;
}

const useStoreAuthService = create<UseAuthService>((set) => ({
    services: [],
    isLoading: false,
    error: null,

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
    }
}));

export default useStoreAuthService;
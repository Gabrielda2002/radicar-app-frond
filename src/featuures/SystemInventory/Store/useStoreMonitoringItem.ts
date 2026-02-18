import { create } from "zustand";
import { MaintenanceData } from "../data/maintenanceChecklist";
import { api } from "@/utils/api-config";

interface UseStoreMonitoringItemProps {
    monitoringData: any[]; 
    isLoading: boolean;
    error: string | null;
    checklistData: MaintenanceData;
    addMonitoring: (data: Object, ep: string, onSuccess?: () => void) => Promise<void>;
    getChecklistsByMonitoringId: (monitoringId: string) => Promise<void>;
    updateChecklistItem: (id: string, checklistData: Object, onSuccess?: () => void) => Promise<void>;
}

const useStoreMonitoringItem = create<UseStoreMonitoringItemProps>((set) => ({
    monitoringData: [],
    checklistData: { checklist: [], accessories: [] },
    isLoading: false,
    error: null,

    addMonitoring: async (data: Object, ep: string, onSuccess?: () => void) => {
        try {
            set({ isLoading: true, error: null });

            const reponse = await api.post(`/${ep}`, data);

            set((state) => ({
                monitoringData: [...state.monitoringData, reponse.data],
            }));

            onSuccess?.();

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, intenta nuevamente más tarde." });
            }else {
                set({ error: error?.response?.data?.message || "Error al agregar el seguimiento. Por favor, intenta nuevamente." });
            }
        }finally{ 
            set({ isLoading: false });
        }
    },

    getChecklistsByMonitoringId: async (monitoringId: string) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/maintenance-checklist/seguimiento/${monitoringId}`);

            set({ checklistData: response.data });

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, intenta nuevamente más tarde." });
            }else {
                set({ error: error?.response?.data?.message || "Error al obtener los checklists del seguimiento. Por favor, intenta nuevamente." });
            }
            set({ checklistData: { checklist: [], accessories: [] } });
        }finally{
            set({ isLoading: false });
        }
    },
    
    updateChecklistItem: async (id: string, checklistData: Object, onSuccess?: () => void) => {
        try {
            set({ isLoading: true, error: null });

            await api.put(`/maintenance-checklist/seguimiento/${id}`, checklistData ); 

            onSuccess?.();

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error del servidor. Por favor, intenta nuevamente más tarde." });
            }else {
                set({ error: error?.response?.data?.message || "Error al actualizar el checklist del seguimiento. Por favor, intenta nuevamente." });
            }
        }finally{
            set({ isLoading: false });
        }
    }

    
    
}))

export default useStoreMonitoringItem;
import { create } from "zustand";
import { MaintenanceChecklistItem } from "../data/maintenanceChecklist";
import { api } from "@/utils/api-config";

interface UseStoreMonitoringItemProps {
    monitoringData: any[]; 
    isLoading: boolean;
    error: string | null;
    checklistData: MaintenanceChecklistItem[];
    addMonitoring: (data: Object, ep: string, onSuccess?: () => void) => Promise<void>;
    getChecklistsByMonitoringId: (monitoringId: string) => MaintenanceChecklistItem[];
}

const useStoreMonitoringItem = create<UseStoreMonitoringItemProps>((set, get) => ({
    monitoringData: [],
    checklistData: [],
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

    getChecklistsByMonitoringId: (monitoringId: string) => {
        const { monitoringData, checklistData } = get();
        const monitoringItem = monitoringData.find((item) => item.id === monitoringId);
        if (!monitoringItem) return [];
        const checklistIds: string[] = monitoringItem.checklist || [];
        return checklistData.filter((checklist) => checklistIds.includes(checklist.id));
    }

    
    
}))

export default useStoreMonitoringItem;
import { IItems } from "@/models/IItems";
import { api } from "@/utils/api-config";
import { create } from "zustand";

type AccessoryType = "Periferico" | "hardware" | "software";

export interface ICreateEquipmentAccessoryPayload {
    typeAdd: AccessoryType;
    name: string;
    brand: string;
    serial: string;
    model: string;
    version: string;
    license: string;
    dateInstallation: string;
    status: string;
    capacity: string;
    speed: string;
    othersData: string;
    inventoryNumber: string;
    equipmentId: number;
}

interface UseStoreEquipments {
    equipments: IItems[];
    error: string | null;
    isLoading: boolean;
    getEquipmentsByHeadquartersId: (headquartersId: number) => Promise<void>;
    createEquipment: (data: Object, onSuccess?: () => void) => Promise<void>;
    updateEquipment: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
    createEquipmentAccessory: (data: ICreateEquipmentAccessoryPayload, onSuccess?: () => void) => Promise<void>;
}

export const useStoreEquipments = create<UseStoreEquipments>((set) => ({
    equipments: [],
    error: null,
    isLoading: false,

    getEquipmentsByHeadquartersId: async (_headquartersId: number) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/equipments/sede/${_headquartersId}`);

            if (!response.data || response.data.length === 0) {
                set({ equipments: [], error: "No se encontraron resultados" });
                return;
            }

            set({ equipments: response.data, error: null });
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Ocurrió un error al obtener los equipos." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createEquipment: async (data: Object, onSuccess?: () => void) => {
        try {
            
            set({ isLoading: true });

            const response = await api.post("/equipments", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 201) {
                onSuccess?.()
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            }else {
                set({ error: error.response?.data?.message });
            }
        }finally{
            set({ isLoading: false });
        }
    },

    updateEquipment: async (id: number, data: Object, onSuccess?: () => void) => {
        try {
            
            set({ isLoading: true });

            const response = await api.put(`/equipments/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                onSuccess?.()
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            }else {
                set({ error: error.response?.data?.message });
            }
        }finally{
            set({ isLoading: false });
        }
    },

    createEquipmentAccessory: async (data: ICreateEquipmentAccessoryPayload, onSuccess?: () => void) => {
        try {
            set({ isLoading: true, error: null });

            const endpointByType: Record<AccessoryType, string> = {
                Periferico: "accesorios-equipos",
                hardware: "componentes",
                software: "software",
            };

            const endpoint = endpointByType[data.typeAdd];

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("otherData", data.othersData);
            formData.append("equipmentId", data.equipmentId.toString());

            if (data.typeAdd === "Periferico" || data.typeAdd === "hardware") {
                formData.append("brand", data.brand);
                formData.append("serial", data.serial);
                formData.append("model", data.model);
            }

            if (data.typeAdd === "software") {
                formData.append("version", data.version);
                formData.append("license", data.license);
                formData.append("dateInstallation", data.dateInstallation);
                formData.append("status", data.status);
            }

            if (data.typeAdd === "hardware") {
                formData.append("capacity", data.capacity);
                formData.append("speed", data.speed);
            }

            if (data.typeAdd === "Periferico") {
                formData.append("status", data.status);
                formData.append("inventoryNumber", data.inventoryNumber);
            }

            const response = await api.post(`/${endpoint}`, formData);

            if (response.status === 201 || response.status === 200) {
                onSuccess?.();
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Error desconocido" });
            }
        } finally {
            set({ isLoading: false });
        }
    },

}))
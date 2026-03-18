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

interface UseStorePeripheral {
    error: string | null;
    isLoading: boolean;
    createPeripheral: (data: ICreateEquipmentAccessoryPayload, onSuccess?: () => void) => Promise<void>;
    updatePeripheral: (id: number, data: Record<string, any>, typeItem: string, onSuccess?: () => void) => Promise<void>;
    deletePeripheral: (id: number, typeItem: string, onSuccess?: () => void) => Promise<void>;
}

export const useStorePeripheral = create<UseStorePeripheral>((set) => ({
    error: null,
    isLoading: false,

    createPeripheral: async (data: ICreateEquipmentAccessoryPayload, onSuccess?: () => void) => {
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

    updatePeripheral: async (id: number, data: Record<string, any>, typeItem: string, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const endPoint =
                typeItem === "perifericos"
                    ? "accesorios/equipos/"
                    : typeItem === "hardware"
                        ? "componentes/"
                        : typeItem === "software"
                            ? "software/"
                            : null;

            const dataToSave = data[id];

            const response = await api.put(`/${endPoint}${id}`, dataToSave);

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    deletePeripheral: async (id: number, typeItem: string, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const endPoint =
                typeItem === "perifericos"
                    ? "accesorios/equipos/"
                    : typeItem === "hardware"
                        ? "componentes/"
                        : typeItem === "software"
                            ? "software/"
                            : null;

            // if (endPoint === null) {
            //     return {
            //         success: false,
            //         error: "Tipo de accesorio no válido"
            //     }
            // }

            const response = await api.delete(`/${endPoint}${id}`);

            if (response.status === 200 || response.status === 201) {
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

}));
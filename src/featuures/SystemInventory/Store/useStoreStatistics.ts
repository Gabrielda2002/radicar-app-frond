import { api } from "@/utils/api-config";
import { create } from "zustand";
import { IQuantityTypeItems } from "../Models/IQuantityTypeItems";
import { IExpiringEquipment } from "../Models/IExpiringEquipment";
import { IAgeStatics } from "../Models/IAgeStatics";
import { IItemsWithLock } from "../Models/IItemsWithLock";

interface UseStoreStatistics {
    quantity: IQuantityTypeItems[];
    expiringSoon: IExpiringEquipment;
    age: IAgeStatics;
    withLock: IItemsWithLock;
    error: string | null;
    isLoading: boolean;
    getQuantityItems: (typeItem: string, idHeadquarters?: number) => Promise<void>;
    getExpiringSoon: (typeItem: string, idHeadquarters?: number) => Promise<void>;
    getAge: (typeItem: string, idHeadquarters?: number) => Promise<void>;
    getItemsWithLock: (typeItem: string, idHeadquarters?: number) => Promise<void>;
}

export const useStoreStatistics = create<UseStoreStatistics>((set) => ({
    quantity: [],
    expiringSoon: {} as IExpiringEquipment,
    error: null,
    isLoading: false,
    age: {} as IAgeStatics,
    withLock: {} as IItemsWithLock,

    getQuantityItems: async (typeItem: string, idHeadquarters?: number) => {
        try {
            
            set({ isLoading: true, error: null });

            const endPoint = typeItem === "equipos" ? "equipments/statics/typeEquipment" : typeItem === "dispositivos-red" ? "dispositivos-red/statistics/headquarters" : "inventario/general/statistics/headquarters"

                const response = await api.get(`${endPoint}/${idHeadquarters}`);

            if (response.status === 200 || response.status === 201) {
                set({ quantity: response.data, error: null });
            }


        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            }else {
                set({ error: error.response?.data?.message });
            }
        }finally {
            set({ isLoading: false });
        }
    },
    getExpiringSoon: async (typeItem: string, idHeadquarters?: number) => {
        try {
            
            set({ isLoading: true, error: null });

             const endPoint = typeItem === "equipos" 
                ? 'equipments/statics/warrantyExpiration' 
                : typeItem ==='general/inventory'
                ? 'general/inventory/statistics/warrantyExpiration'
                : typeItem === 'tv/inventory' 
                ? 'tv/inventory/statics/warrantyExpiration'
                : 'phones/inventory/statics/warrantyExpiration';
                
                const response = await api.get(`/${endPoint}/${idHeadquarters}`);

            if (response.status === 200 || response.status === 201) {
                set({ expiringSoon: response.data, error: null });
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
    getAge: async (typeItem: string, idHeadquarters?: number) => {
        try {
            
            set({ isLoading: true, error: null });

             const endPoint = typeItem === "equipos" 
                ? "equipments/statics/age" 
                : typeItem === 'general/inventory'
                ? 'general/inventory/statistics/age'
                : typeItem === 'tv/inventory' 
                ? 'tv/inventory/statics/age'
                : 'phones/inventory/statics/age'

                const response = await api.get(`${endPoint}/${idHeadquarters}`);

            if (response.status === 200 || response.status === 201) {
                set({ age: response.data, error: null });
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

    getItemsWithLock: async (typeItem: string, idHeadquarters?: number) => {
        try {
            
            set({ isLoading: true, error: null });

            const endpoint = typeItem === "equipos" ? "equipments/statics/withLock" : "items/locked/dispositivos-red";

                const response = await api.get(`/${endpoint}/${idHeadquarters}`);

            if (response.status === 200 || response.status === 201) {
                set({ withLock: response.data, error: null });
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
    }
}));
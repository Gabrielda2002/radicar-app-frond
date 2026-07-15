import { create } from "zustand";
import { PreviewData, UploadResult } from "../types/UploadData";
import { api } from "@/utils/api-config";

type UseStoreUploadPatientsReturn = {
    error: string | null;
    isLoading: boolean;
    previewData: PreviewData | null;
    uploadResult: UploadResult | null;
    validationFile: (data: Object, onSuccess?: () => void) => Promise<void>;
    confirmUpload: (data: Object, onSuccess?: () => void) => Promise<void>;
    resetPreview: () => void;
}

export const useStoreUploadPatients = create<UseStoreUploadPatientsReturn>((set) => ({
    error: null,
    isLoading: false,
    previewData: null,
    uploadResult: null,

    validationFile: async (data, onSuccess) => {
        try {
            set({ isLoading: true });

            const response = await api.post('/pacientes/carga-masiva/validar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                set({ previewData: response.data, error: null });
                onSuccess?.()
            }

        } catch (error: any) {
            const responseData = error?.response?.data;

            if (responseData && typeof responseData === 'object' && 'rows' in responseData && 'ok' in responseData) {
                set({ previewData: responseData as PreviewData, error: responseData.rows.length === 0 ? 'Formato de encabezados erroneos, rectifique e intente nuevamente.' : null });
            } else {
                set({ error: 'Error inesperado al validar el archivo.' });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    confirmUpload: async (data, onSuccess) => {
        try {
            
            set({ isLoading: true })

            const response = await api.post('/pacientes/carga-masiva/confirmar', data, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            if (response.status === 200 && response.data.ok) {
                set({ uploadResult: response.data, error: null })
                onSuccess?.();
            }

        } catch (error: any) {
            
            const responseData = error?.response?.data;

            if (responseData && typeof responseData === 'object' && 'message' in responseData && 'ok' in responseData) {
                set({ uploadResult: responseData as UploadResult });
            } else {
                set({ error: 'Error inesperado al validar el archivo.' });
            }

        }finally {
            set({ isLoading: false })
        }
    },

    resetPreview: () => set({ previewData: null, error: null }),
}))
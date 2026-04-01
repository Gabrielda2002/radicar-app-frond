import { api } from "@/utils/api-config";
import { useState } from "react";
import { ReportPreviewData } from "../types/Report.type";

interface UseGeneratePreviewProps {
    dataPreview: ReportPreviewData;
    isLoading: boolean;
    error: string | null;
    generatePreview: (previewEndpoint: string, payload: Record<string, any>) => Promise<void>;
}

export const useGeneratePreview = (): UseGeneratePreviewProps => {
    const [dataPreview, setDataPreview] = useState<ReportPreviewData>({ total: 0, data: [] });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generatePreview = async (previewEndpoint: string, payload: Record<string, any>) => {
        try {
            setIsLoading(true);

            const response = await api.post(previewEndpoint, payload);

            if (response.status === 200) {
                setDataPreview(response.data);
                setError(null);
            }

        } catch (error: any) {
            if (error.response?.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            } else {
                setError(error.response?.data?.message || "Error desconocido");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        dataPreview,
        isLoading,
        error,
        generatePreview
    }
}
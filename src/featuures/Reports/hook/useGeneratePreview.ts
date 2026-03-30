import { api } from "@/utils/api-config";
import { useState } from "react";
import { ReportRadicacion } from "../types/Report.type";

interface UseGeneratePreviewProps {
    dataPreview: ReportRadicacion;
    isLoading: boolean;
    error: string | null;
    generatePreview: (dateStart: string, dateEnd: string, cupsCode?: string, statusCups?: string) => Promise<void>;
}

export const useGeneratePreview = (): UseGeneratePreviewProps => {
    const [dataPreview, setDataPreview] = useState<ReportRadicacion>({ total: 0, data: [] });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generatePreview = async (dateStart: string, dateEnd: string, cupsCode?: string, statusCups?: string) => {
        try {
            setIsLoading(true);

            const response = await api.post('/report/excel/radicacion/preview', {
                dateStart,
                dateEnd,
                cupsCode,
                statusCups
            })

            if (response.status === 200) {
                setDataPreview(response.data);
                setError(null);
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                setError("Error del servidor. Por favor, inténtelo de nuevo más tarde.");
            }else {
                setError(error.response?.data?.message);
            }
        }finally {
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
import { api } from "@/utils/api-config";
import { useState } from "react";

interface FileAccessTokenResponse {
    token: string;
    expiredIn: number;
    url: string;
    action: "VIEW" | "DOWNLOAD";
}

type FileType = "files" | "soporte" | "attachments" | "attachments-tickets" | null;

const customEndPoint = [
    {
        type: "files",
        epGenerateToken: "files",
        epSecureAccess: "secure-file"
    },
    {
        type: "soporte",
        epGenerateToken: "soportes",
        epSecureAccess: "secure-soporte"
    },
    {
        type: "attachments-inventory",
        epGenerateToken: "attachments",
        epSecureAccess: "secure-attachments"
    },
    {
        type: "attachments-tickets",
        epGenerateToken: "attachments/tickets",
        epSecureAccess: "secure-download"
    }

]

interface UseSecureFileAccessReturn {
    isLoading: boolean;
    error: string | null;
    openSecureFile: (fileId: string, action: "VIEW" | "DOWNLOAD", type?: FileType) => Promise<void>;
    downloadSecureFile: (fileId: string, type?: FileType) => Promise<void>;
}

export const useSecureFileAccess = (): UseSecureFileAccessReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // solicitar token de acceso para el archivo
    const requestAccessToken = async (fileId: number, action: "VIEW" | "DOWNLOAD", type: FileType = "files"): Promise<FileAccessTokenResponse> => {

        try {

            const endPoint = customEndPoint.find(ep => ep.type === type)?.epGenerateToken

            const response = await api.post(`/${endPoint}/${fileId}/access-token?action=${action}`)

            if (response.status === 200) {
                setError(null);
                return response.data;
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.message || "Unknown error");
            throw new Error(error.response?.data?.message || error.message || "Unknown error");
        }
    }

    const openSecureFile = async (fileId: string, action: "VIEW" | "DOWNLOAD", type: FileType = "files") => {
        setIsLoading(true);
        setError(null);
        try {

            const tokenData = await requestAccessToken(Number(fileId), action, type);

            const endPoint = customEndPoint.find(ep => ep.type === type)?.epSecureAccess

            const secureUrl = `${import.meta.env.VITE_URL_BACKEND}/api/v1/${endPoint}/${tokenData.token}`;

            if (action === "VIEW") {
                window.open(secureUrl, "_blank");
            } else if (action === "DOWNLOAD") {
                const link = document.createElement("a");
                link.href = secureUrl;
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const downloadSecureFile = async (fileId: string, type: FileType = "files") => {
        await openSecureFile(fileId, "DOWNLOAD", type);
    }

    return {
        isLoading,
        error,
        openSecureFile,
        downloadSecureFile
    }

}


import { api } from "@/utils/api-config"


export const EpDownloadPdf = (id: string) => {
    const response =  api.get(`/generate-pdf/${id}`,  {
        responseType: 'blob',
    })
    return response;
}
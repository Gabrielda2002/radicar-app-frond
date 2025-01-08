import { saveGestionAuxiliar } from "@/utils/api-config"

export const  submitGestionAuxiliar = async (data: FormData, endpoint: string) => {
    try {
        
        const response  = saveGestionAuxiliar(data, endpoint)

        return response

    } catch (error) {
        console.error(error)
        
    }
}
import { saveGestionAuxiliar } from "../utils/api-config"

export const  submitGestionAuxiliar = async (data: FormData) => {
    try {
        
        const response  = saveGestionAuxiliar(data)

        return response

    } catch (error) {
        console.error(error)
        
    }
}
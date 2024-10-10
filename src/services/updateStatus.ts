import { updateStatusData } from "../utils/api-config"

export const updateStatus = async (id: number, data: FormData, endPonint: string) => {
    try {
        
        const response = await updateStatusData(id, data, endPonint)

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log(`Error al actualizar el estado ${endPonint}`,error)
    }
}
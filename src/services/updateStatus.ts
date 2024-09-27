import { updateStatusData } from "../utils/api-config"

export const updateStatus = async (id: number, status: string, endPonint: string) => {
    try {
        
        const response = await updateStatusData(id, status, endPonint)

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log(`Error al actualizar el estado ${endPonint}`,error)
    }
}
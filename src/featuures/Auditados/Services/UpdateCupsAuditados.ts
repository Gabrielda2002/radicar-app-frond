import { updateCupsAuditados } from "@/utils/api-config"

export const UpdateCupsAuditados = async (id: number, data: FormData) => {

    try {
        
        const response = await updateCupsAuditados(id, data);

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log("Error al actualizar el cups. ",error)
    }

}
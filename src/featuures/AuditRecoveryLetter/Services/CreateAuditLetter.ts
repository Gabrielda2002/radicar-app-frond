import { EpCreateAuditLetter } from "./EpCreateAuditLetter"

export const CreateAuditLetter = async (data: object, id: number) => {
    try {
        
        const response = await EpCreateAuditLetter(data, id)

        if (response.status === 200 || response.status === 201) { 
            return response;
        }

    } catch (error) {
        console.log("Error inesperado: ", error)
    }
}
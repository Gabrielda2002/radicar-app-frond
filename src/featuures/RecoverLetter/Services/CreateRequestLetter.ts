import { EpCreateRequestLetter } from "../Utils/EpCreateRequestLetter";

export const CreateRequestLetter = async (data: FormData) => {
    try {
        
        const response = await EpCreateRequestLetter(data);

        if (response.status === 200 || response.status === 201) {
            return response;
            
        }

    } catch (error) {
        console.log("Error inesperado al enviar la solicitud" + error);
    }
}
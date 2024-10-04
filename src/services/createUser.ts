import { createUsuario } from "../utils/api-config"

export const createUser = async (data: FormData) => {
    try {
        
        const response = await createUsuario(data)

        if (response.status === 200 || response.status === 201) {
            return response;
        }


    } catch (error) {
        console.log(error)
    }
}
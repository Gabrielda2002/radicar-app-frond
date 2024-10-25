import { updateUsuariosTableEp } from "../utils/api-config"

export const updateUsuarios = async (id: number, data: FormData) => {
    
    try {
        
        const response = await updateUsuariosTableEp( data, id);

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log("Error al actualizar el usuario. ",error)
    }

}
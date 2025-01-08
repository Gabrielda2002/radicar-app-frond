import { updatePasswordUsuarioEp } from "@/utils/api-config"

export const updatePasswordUsuario = async (formData: FormData, id: number) => {
    try {
        
        const response = await updatePasswordUsuarioEp(formData, id)

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(error)
    }
}
import { createProgramacionCirugia } from "../../../utils/api-config"

export const CreateCirugia = async (data: FormData) => {
    try {
        
        const response = await createProgramacionCirugia(data)

        if (response.status === 200 || response.status === 201) {
            return response;
        }
        
    } catch (error) {
        console.log(error)
    }
}
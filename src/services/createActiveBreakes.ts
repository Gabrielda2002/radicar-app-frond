import { createActiveBreakesEp } from "../utils/api-config"

export const CreateActiveBreakes = async (data: FormData) => {
    try {
        
        const response = await createActiveBreakesEp(data)

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(error)
    }
}
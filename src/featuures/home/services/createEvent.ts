import { createEventEp } from "@/utils/api-config"

export const createEvent = async (data: FormData) => {
    try {
        
        const response = await createEventEp(data);

        if (response?.status === 200 || response?.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(error)
    }
}
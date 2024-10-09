import { updateUserDataEp } from "../utils/api-config";

export const updateUserData = async (data: FormData, id: string) => {
    try {
        
        const response = await updateUserDataEp(data, id);

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(error)
    }
}
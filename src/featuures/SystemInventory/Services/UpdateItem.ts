import { updateItemEp } from "@/utils/api-config"

export const updateItem = async (id: number, data: FormData, endPoint: string) => {
    try {
        
        const response = await updateItemEp(data, id, endPoint);

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log(error);
    }
}
import { createItemEp } from "@/utils/api-config";

export const createItem = async (item: FormData, ep: string) => {

    try {
        
        const response  = await createItemEp(item, ep);

        if (response.status === 201 || response.status === 200) {
            return response;
        }

    } catch (error) {
        console.error(error);
    }
    
}
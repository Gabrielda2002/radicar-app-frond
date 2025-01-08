import { createAccesoryEquipmentEp } from "@/utils/api-config"

export const createAccesoryEquipment = async (data: FormData, ep: string) => {
    try {
        
        const response = await createAccesoryEquipmentEp(data, ep)

        if (response.status === 200 || response.status === 201) {
            return response;
        }


    } catch (error) {
        console.log(error)
    }
}
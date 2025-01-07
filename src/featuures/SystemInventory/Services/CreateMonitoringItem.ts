import { createSeguimientoItemEp } from "../../../utils/api-config";

export const createMonitoringItem = async (data: FormData, ep: string) => {
    try {
        
        const response = await createSeguimientoItemEp(data, ep);

        if (response.status === 201 || response.status === 200) {
            return response;
        }

    } catch (error) {
        console.error(error);
    }
}
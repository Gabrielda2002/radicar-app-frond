import { createTableRadicacion } from "../utils/api-config";

export const createDataTableRadicacion = async (name: string, endPoint: string) => {
    try {
        
        const response = await createTableRadicacion(name, endPoint);

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(`Error al crear en la tabla ${endPoint}: ${error}`);
    }
}
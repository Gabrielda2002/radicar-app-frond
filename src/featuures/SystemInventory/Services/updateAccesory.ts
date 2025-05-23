import { api } from "@/utils/api-config";

export const updateAccesory = async (id: string | number, itemType: string, editedData: Record<string, any>) => {
    try {
        const endPoint =
          itemType === "perifericos"
            ? "accesorios/equipos/"
            : itemType === "hardware"
            ? "componentes/"
            : itemType === "software"
            ? "software/"
            : null;
      
        const dataToSave = editedData[id];

        const response = await api.put(`/${endPoint}${id}`, dataToSave);

        if (response.status === 200 || response.status === 201) {
            return response;
        }
        
    } catch (error) {
        console.log("Error al guardar los cambios:", error);
    }
}

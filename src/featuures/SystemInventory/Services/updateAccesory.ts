import { api } from "@/utils/api-config";

export const saveChanges = async (id: string | number, itemType: string, editedData: Record<string, any>) => {
    try {
        const endPoint =
          itemType === "perifericos"
            ? "accesorios/equipos/"
            : itemType === "hardware"
            ? "componentes/equipos/"
            : itemType === "software"
            ? "software/equipos/"
            : null;
      
        const dataToSave = editedData[id];
        console.log(dataToSave);

        const response = await api.put(`/${endPoint}${id}`, dataToSave);

        if (response.status === 200 || response.status === 201) {
            return response;
        }
        
    } catch (error) {
        console.log("Error al guardar los cambios:", error);
    }
}

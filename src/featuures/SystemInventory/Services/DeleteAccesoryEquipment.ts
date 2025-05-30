import { api } from "@/utils/api-config"

export const deleteAccesoryEquipment = async (id: number, itemType: string, refreshItems: () => void) => {
    try {
        
         const endPoint =
          itemType === "perifericos"
            ? "accesorios/equipos/"
            : itemType === "hardware"
            ? "componentes/"
            : itemType === "software"
            ? "software/"
            : null;

        if (!endPoint) {
            throw new Error("Tipo de accesorio o equipo no válido");
            return false;
        }

        const response = await api.delete(`/${endPoint}${id}`);

        if (response.status === 200 || response.status === 201) {
            refreshItems();
            return true;
        }

    } catch (error: any ) {
        if (error.response.status === 404) {
            console.log("No se encontró el accesorio o equipo para eliminar");
        }else if (error.response.status === 403){
            console.log("No tienes permiso para eliminar este accesorio o equipo")
        }else{
            console.log("Error al eliminar el accesorio o equipo:", error);
        }
        return false;
    }
}
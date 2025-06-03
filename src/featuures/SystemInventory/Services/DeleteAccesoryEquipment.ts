import { api } from "@/utils/api-config"

export const deleteAccesoryEquipment = async (id: number, itemType: string) => {
    try {
         const endPoint =
          itemType === "perifericos"
            ? "accesorios/equipos/"
            : itemType === "hardware"
            ? "componentes/"
            : itemType === "software"
            ? "software/"
            : null;

        if (endPoint === null) {
            return {
                success: false,
                error: "Tipo de accesorio no válido"
            }
        }

        const response = await api.delete(`/${endPoint}${id}`);

        if (response.status === 200 || response.status === 201) {
            return {
                success: true,
                error: null
            };
        }

        return {
            success: false,
            error: "Error inesperado al eliminar el accesorio o equipo"
        };

    } catch (error: any ) {

        let  errorMessage: string = "";

        if (error.response.status === 404) {
            errorMessage = "No se encontró el accesorio o equipo para eliminar"
        }else if (error.response.status === 403){
            errorMessage = "No tienes permiso para eliminar este accesorio o equipo"
        }else{
            errorMessage = "Error al eliminar el accesorio o equipo:", error;
        }
        return {
            success: false,
            error: errorMessage
        };
    }
}
import { IServiciosContratados } from "@/models/IServiciosContratados";
import { api } from "@/utils/api-config";

export const fetchServicioContratadoEp = async (codigo: string): Promise<IServiciosContratados[]> => {
    const response = await api.post('/servicio-contratado', {
        code: codigo
    });

    const serviciosContratados = response.data.map((servicio: IServiciosContratados) => ({
        ...servicio
    }));
    return serviciosContratados;
}
import { IRadicacion } from "../models/TableRadicacion";
import { api } from "../utils/api-config";

export const fetchUsers = async (): Promise<IRadicacion[]> => {
    const response = await api.get('/radicacion-table');
    const radicaciones = response.data.map((radicacion: IRadicacion) => ({
        ...radicacion,
        createdAt: new Date(radicacion.createdAt),
        auditDate: radicacion.auditDate ? new Date(radicacion.auditDate) : null
    }));
    return radicaciones;
}
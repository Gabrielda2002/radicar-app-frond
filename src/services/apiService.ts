import { IAuditoria } from "../models/IAuditoria";
import { ICups } from "../models/ICups";
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

export const fetchAuditoria = async (): Promise<IAuditoria[]> => {
    const response = await api.get('/auditoria-table');
    const auditorias = response.data.map((auditoria: IAuditoria) => ({
        ...auditoria,
        radicadoDate: new Date(auditoria.radicadoDate),
        orderDate: new Date(auditoria.orderDate)
    }));
    return auditorias;
}

export const fetchCups = async (): Promise<ICups[]> => {
    const response = await api.get('/servicio-solicitado');
    const cups = response.data.map((cup: ICups) => ({
        ...cup,
        updatedAt: new Date(cup.updatedAt),
        createdAt: new Date(cup.createdAt)
    }));
    return cups;
}
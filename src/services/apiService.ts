import { IAuditoria } from "../models/IAuditoria";
import { IConvenios } from "../models/IConvenios";
import { ICups } from "../models/ICups";
import { IDocumento } from "../models/IDocumento";
import { IIPSPrimaria } from "../models/IIpsPrimaria";
import { IMunicipios } from "../models/IMunicipios";
import { IRadicador } from "../models/IRadicador";
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

export const fetchRadicador = async (): Promise<IRadicador[]> => {

    const response = await api.get('/radicador');
    const radicadores = response.data.map((radicador: IRadicador) => ({
        ...radicador,
        createdAt: new Date(radicador.createdAt),
        updatedAt: new Date(radicador.updatedAt)
    }));
    return radicadores;

}

export const fetchMunicipio = async (): Promise<IMunicipios[]> => {
    const response = await api.get('/municipios');
    const municipios = response.data.map((municipio: IMunicipios) => ({
        ...municipio,
        updatedAt: new Date(municipio.updatedAt),
        createdAt: new Date(municipio.createdAt)
    }));
    return municipios;
}

export const fetchConvenio = async (): Promise<IConvenios[]> => {
    const response = await api.get('/convenio');
    const convenios = response.data.map((convenio: IConvenios) => ({
        ...convenio,
        updatedAt: new Date(convenio.updatedAt),
        createdAt: new Date(convenio.createdAt)
    }));
    return convenios;
}

export const fetchDocumento = async (): Promise<IDocumento[]> => {
    const response = await api.get('/documento');
    const documentos = response.data.map((documento: IDocumento) => ({
        ...documento,
        updatedAt: new Date(documento.updatedAt),
        createdAt: new Date(documento.createdAt)
    }));
    return documentos;
}

export const fetchIpsPrimaria = async (): Promise<IIPSPrimaria[]> => {
    const response = await api.get('/ips-primaria');
    const ipsPrimaria = response.data.map((ips: IIPSPrimaria) => ({
        ...ips,
        updatedAt: new Date(ips.updatedAt),
        createdAt: new Date(ips.createdAt)
    }));
    return ipsPrimaria;
}

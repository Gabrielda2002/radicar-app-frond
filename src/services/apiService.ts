import { IConvenios } from "../models/IConvenios";
import { ICups } from "../models/ICups";
import { IDocumento } from "../models/IDocumento";
import { IEspecialidad } from "../models/IEspecialidad";
import { IIPSPrimaria } from "../models/IIpsPrimaria";
import { IIPSRemite } from "../models/IIpsRemite";
import { ILugarRadicacion } from "../models/ILugarRadicado";
import { IMunicipios } from "../models/IMunicipios";
import { IRadicados } from "../models/IRadicados";
import { IRadicador } from "../models/IRadicador";
import { IServicios } from "../models/IServicio";
import { IUsuarios } from "../models/IUsuarios";
import { api } from "../utils/api-config";
import { IAuditar } from "../models/IAuditar";
import { IUnidadFuncional } from "../models/IUnidadFuncional";
import { IEstados } from "../models/IEstados";
import { IAuditados } from "../models/IAuditados";
import { IRol } from "../models/IRol";
import { IPacientes } from "../models/IPacientes";
import { ICirugias } from "../models/ICirugias";

export const fetchUsers = async (): Promise<IRadicados[]> => {
    const response = await api.get('/radicacion');
    const radicaciones = response.data.map((radicacion: IRadicados) => ({
        ...radicacion,
        createdAt: new Date(radicacion.createdAt),
        auditDate: radicacion.auditDate ? new Date(radicacion.auditDate) : null
        
    }));
    return radicaciones;
}

export const fetchAuditoria = async (): Promise<IAuditar[]> => {
    const response = await api.get('/auditoria-table');
    const auditorias = response.data.map((auditoria: IAuditar) => ({
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

export const fetchLugarRadicado = async (): Promise<ILugarRadicacion[]> => {
    const response = await api.get('/lugares-radicacion');
    const lugarRadicado = response.data.map((lugar: ILugarRadicacion) => ({
        ...lugar,
        updatedAt: new Date(lugar.updatedAt),
        createdAt: new Date(lugar.createdAt)
    }));
    return lugarRadicado;
}

export const fetchIpsRemite = async (): Promise<IIPSRemite[]> => {
    const response = await api.get('/ips-remite');
    const ipsRemite = response.data.map((ips: IIPSRemite) => ({
        ...ips,
        updatedAt: new Date(ips.updatedAt),
        createdAt: new Date(ips.createdAt)
    }));
    return ipsRemite;
}

export const fetchEspecialidad = async (): Promise<IEspecialidad[]> => {
    const response = await api.get('/especialidades');
    const especialidad = response.data.map((especialidad: IEspecialidad) => ({
        ...especialidad,
        updatedAt: new Date(especialidad.updatedAt),
        createdAt: new Date(especialidad.createdAt)
    }));
    return especialidad;
}

export const fetchServicio = async (): Promise<IServicios[]> => {
    const response = await api.get('/servicios');
    const servicios = response.data.map((servicio: IServicios) => ({
        ...servicio,
        updatedAt: new Date(servicio.updatedAt),
        createdAt: new Date(servicio.createdAt)
    }));
    return servicios;
}

export const fetchUsuario = async (): Promise<IUsuarios[]> => {
    const response = await api.get('/usuarios-table');
    const usuarios = response.data.map((usuario: IUsuarios) => ({
        ...usuario,
        updatedAt: new Date(usuario.updatedAt),
        createdAt: new Date(usuario.createdAt)
    }));
    return usuarios;

}

export const fetchUnidadFuncional = async (): Promise<IUnidadFuncional[]> => {
    const response = await api.get('/unidad-funcional');
    const unidadFuncional = response.data.map((unidad: IUnidadFuncional) => ({
        ...unidad,
        updatedAt: new Date(unidad.updatedAt),
        createdAt: new Date(unidad.createdAt)
    }));
    return unidadFuncional;
} 

export const fetchEstados = async (): Promise<IEstados[]> => {

    const response = await api.get('/estados');
    const estados = response.data.map((estado: IEstados) => ({
        ...estado,
        updatedAt: new Date(estado.updatedAt),
        createdAt: new Date(estado.createdAt)
    }));
    return estados;
}

export const fetchAuditados = async (): Promise<IAuditados[]> => {
    const response = await api.get('/auditoria-auditados');
    const auditados = response.data.map((auditado: IAuditados) => ({
        ...auditado,
        CUPS: auditado.CUPS.map((cups) => ({
            ...cups,
            modifyDate: cups.modifyDate ? new Date(cups.modifyDate) : null
        }))
    }));    
    return auditados;   
}

export const fetchRoles = async (): Promise<IRol[]> => {
    const response = await api.get('/roles');
    const roles = response.data.map((rol: IRol) => ({
        ...rol,
        updatedAt: new Date(rol.updatedAt),
        createdAt: new Date(rol.createdAt)
    }));
    return roles;
}

// traer los pacientes
export const fetchPacientes = async (): Promise<IPacientes[]> => {
    const response = await api.get(`/pacientes`);
    const pacientes = response.data.map((paciente: IPacientes) => ({
        ...paciente,
        updatedAt: new Date(paciente.updatedAt),
        createdAt: new Date(paciente.createdAt)
    }));
    return pacientes;
}

// tabla cirugias
export const fetchCirugias = async (): Promise<ICirugias[]> => {
    const response = await api.get('/tabla-cirugias');
    const cirugias = response.data.map((cirugia: ICirugias) => ({
        ...cirugia,
        fechaRadicado: new Date(cirugia.fechaRadicado),
        fechaAuditoria: cirugia.fechaAuditoria ? new Date(cirugia.fechaAuditoria) : null,
        programacionCirugia: cirugia.programacionCirugia.map((programacion) => ({
            ...programacion,
            fechaProgramada: new Date(programacion.fechaProgramada),
            fechaCirugia: new Date(programacion.fechaCirugia),
            gestionAuxiliarCirugia: programacion.gestionAuxiliarCirugia.map((gestion) => ({
                ...gestion,
                fechaCreacion: new Date(gestion.fechaCreacion)
            }))
        }))
        
    }));
    return cirugias;
}
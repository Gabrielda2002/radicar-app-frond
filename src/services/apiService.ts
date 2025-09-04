import { IConvenios } from "../models/IConvenios";
import { ICups } from "../models/ICups";
import { IRadicados } from "../models/IRadicados";
import { IRadicador } from "../models/IRadicador";
import { IUsuarios } from "../models/IUsuarios";
import { api } from "../utils/api-config";
import { IAuditar } from "../models/IAuditar";
import { IUnidadFuncional } from "../models/IUnidadFuncional";
import { IEstados } from "../models/IEstados";
import { IAuditados } from "../models/IAuditados";
import { IRol } from "../models/IRol";
import { ICirugias } from "../models/ICirugias";
import { IDiagnostico } from "../models/IDiagnostico";
import { IEstadisticaCups } from "../models/IMonthDataRadicacion";
import { IEventos } from "../models/IEventos";

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

export const fetchConvenio = async (): Promise<IConvenios[]> => {
    const response = await api.get('/convenio');
    const convenios = response.data.map((convenio: IConvenios) => ({
        ...convenio,
        updatedAt: new Date(convenio.updatedAt),
        createdAt: new Date(convenio.createdAt)
    }));
    return convenios;
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
        radicadoDate: auditado.radicadoDate,
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

// tabla cirugias
export const fetchCirugias = async (): Promise<ICirugias[]> => {
    const response = await api.get('/tabla-cirugias');
    const cirugias = response.data.map((cirugia: ICirugias) => ({
        ...cirugia,
        fechaRadicado: new Date(cirugia.fechaRadicado),
        fechaOrden: cirugia.fechaOrden ? new Date(cirugia.fechaOrden) : null,
        fechaAuditoria: cirugia.fechaAuditoria ? new Date(cirugia.fechaAuditoria) : null,
        programacionCirugia: cirugia.programacionCirugia.map((programacion) => ({
            ...programacion,
            fechaProgramada: new Date(programacion.fechaProgramada),
            fechaCirugia: new Date(programacion.fechaCirugia),
            fechaParaclinoco: new Date(programacion.fechaParaclinoco),
            fechaAnesteciologia: new Date(programacion.fechaAnesteciologia),
            gestionAuxiliarCirugia: programacion.gestionAuxiliarCirugia.map((gestion) => ({
                ...gestion,
                fechaCreacion: new Date(gestion.fechaCreacion)
            }))
        }))
        
    }));
    return cirugias;
}

export const fetchDiagnosticos = async (): Promise<IDiagnostico[]> => {
    const response = await api.get('/diagnosticos');
    const diagnosticos = response.data.map((diagnostico: ICups) => ({
        ...diagnostico,
        updatedAt: new Date(diagnostico.updatedAt),
        createdAt: new Date(diagnostico.createdAt)
    }));
    return diagnosticos;
}

export const fetchMonthRadicacionEp = async (): Promise<IEstadisticaCups[]> => {
    const response = await api.get('/estadistica-cups-estado');
    
    return response.data;
}

export const fetchEventosEp = async (): Promise<IEventos[]> => {
    const response = await api.get('/eventos');
    const eventos = response.data.map((evento: IEventos) => ({
        ...evento,
    }));
    return eventos;
}
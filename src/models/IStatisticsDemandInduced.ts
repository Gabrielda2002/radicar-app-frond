export interface IStatisticsDemandInduced {
    meta: number;
    estadisticasPorPrograma: EstadisticasPorPrograma[];
    estadisticasLlamadasTelefonicas: EstadisticasLlamadasTelefonicas;
    estadisticasLlamadasNoEfectivas: EstadisticasLlamadasNoEfectivas[];
    cantidadDemandInduced: CantidadDemandInduced[];
    estResultadoLlamadasNoEfectivas: EstResultadoLlamadasNoEfectivas[];
}

export interface EstadisticasPorPrograma {
    programa: string;
    elemento: string;
    profesional: string;
    cantidad: number;
    porcentaje: number;
}

export interface EstadisticasLlamadasTelefonicas {
    efectivas: EstadisticaProfesional[];
    noEfectivas: any[];
}

export interface EstadisticaProfesional {
    profesional: string;
    cantidad: number;
    porcentaje: number;
}

export interface EstadisticasLlamadasNoEfectivas {
    programa: string;
    resultadoLlamada: string;
    profesional: string;
    porcentaje: number;
    cantidad: number;
}

export interface CantidadDemandInduced {
    programa: string;
    cantidad: number;
}

export interface EstResultadoLlamadasNoEfectivas {
    resultadoLlamada: string;
    cantidad: number;
}
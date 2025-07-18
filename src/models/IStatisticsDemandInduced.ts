export interface IStatisticsDemandInduced {
    meta: number;
    estadisticasPorPrograma: EstadisticasPorPrograma[];
    estadisticasLlamadasTelefonicas: EstadisticasLlamadasTelefonicas;
    estadisticasLlamadasNoEfectivas: EstadisticasLlamadasNoEfectivas[];
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
export interface IStatisticsDemandInduced {
    meta: number;
    estadisticasPorPrograma: EstadisticasPorPrograma[];
    estadisticasLlamadasTelefonicas: EstadisticasLlamadasTelefonicas;
    estadisticasLlamadasNoEfectivas: []
}

interface EstadisticasPorPrograma {
    programa: string;
    elemento: string;
    profesional: string;
    cantidad: number;
    porcentaje: number;
}

interface EstadisticasLlamadasTelefonicas {
    efectivas: [profesional:string, cantidad: number, porcentaje: number]
    noEfectivas: []
}
export interface IStatisticsDemandInduced {
    goal: number;
    // estadisticasPorPrograma: EstadisticasPorPrograma[];
    phoneCallStatistics: PhoneCallStatistics;
    // estadisticasLlamadasNoEfectivas: EstadisticasLlamadasNoEfectivas[];
    quantityDemandByElement: QuantityDemandByElement[];
    totalRecordsInducedDemand: TotalRecordsInducedDemand[];
    statisticsIneffectiveCalls: StatisticsIneffectiveCalls[];
}
    
// export interface EstadisticasPorPrograma {
//     programa: string;
//     elemento: string;
//     profesional: string;
//     cantidad: number;
//     porcentaje: number;
// }

export interface PhoneCallStatistics {
    efectivas: EstadisticaProfesional[];
    noEfectivas: any[];
}

export interface EstadisticaProfesional {
    profesional: string;
    cantidad: number;
    porcentaje: number;
}

// export interface EstadisticasLlamadasNoEfectivas {
//     programa: string;
//     resultadoLlamada: string;
//     profesional: string;
//     porcentaje: number;
//     cantidad: number;
// }

export interface QuantityDemandByElement {
    programa: string;
    cantidad: number;
}

export interface TotalRecordsInducedDemand {
    cantidad: number;
}

export interface StatisticsIneffectiveCalls {
    resultadoLlamada: string;
    cantidad: number;
}
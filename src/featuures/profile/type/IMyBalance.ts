export interface IMyBalance {
    ok:   boolean;
    data: Data;
}

export interface Data {
    configuracionCompleta: boolean;
    totalDiasDisponibles:  string;
    periodos:              Periodo[];
}

export interface Periodo {
    balanceId:        number;
    periodo:          number;
    fechaInicio:      Date;
    fechaFin:         Date;
    fechaVencimiento: Date;
    diasAsignados:    string;
    diasTomados:      string;
    diasDisponibles:  string;
    vencido:          boolean;
    configurado:      boolean;
}

export interface UseFetchMyBalanceReturn {
    data: IMyBalance | null;
    isLoading: boolean;
    error: string | null;
}

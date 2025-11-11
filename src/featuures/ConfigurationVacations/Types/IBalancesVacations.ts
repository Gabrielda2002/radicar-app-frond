export interface IBalancesVacations {
    ok:   boolean;
    data: Datum[];
}

export interface Datum {
    setupId:           number;
    userId:            number;
    userName:          string;
    fechaContrato:     Date;
    periodosGenerados: number;
    requiereRevision:  boolean;
    observaciones:     string;
    balances:          Balance[];
}

export interface Balance {
    balanceId:        number;
    periodo:          number;
    fechaInicio:      Date;
    fechaFin:         Date;
    fechaVencimiento: Date;
    vencido:          boolean;
    diasAsignados:    string;
}

export interface UseFetchBalanceReturn {
    data: IBalancesVacations;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}
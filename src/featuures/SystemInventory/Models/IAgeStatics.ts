export interface IAgeStatics {
    distribution: Distribution[];
    averageAge:   AverageAge;
}

export interface AverageAge {
    days:   number;
    months: number;
    years:  number;
}

export interface Distribution {
    label: string;
    value: number;
}

export interface ChartData {
    name: string;
    value: any;
}

export interface ChartDataMultipleFileds {
    name: string;
    [key: string]: number | string; // Dynamic keys with numeric values
}

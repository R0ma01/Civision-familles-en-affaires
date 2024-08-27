import { MainDataFields } from '../enums/data-types-enum';
import { ChartData, ChartDataMultipleFileds } from './chart-data';

export interface ChartContent {
    donnees: MainDataFields[];
    data: ChartData[] | ChartDataMultipleFileds[];
    totalData: number;
    median?: number;
    midPoint?: number;
    doNotSort?: boolean;
    multiple_mentions?: any;
    nonNullCount?: any;
    width?: number;
    smallerSize?: boolean;
    noWrap?: boolean;
}

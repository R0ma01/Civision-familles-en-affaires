import { MainDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { ChartData, ChartDataMultipleFileds } from './chart-data';

export default interface GraphBoxContent {
    graphType: GraphBoxType;
    donnes: MainDataFields[];
    
}

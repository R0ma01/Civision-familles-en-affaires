import { MainDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';

export default interface GraphBoxContent {
    graphType: GraphBoxType;
    donnes: MainDataFields[];
}

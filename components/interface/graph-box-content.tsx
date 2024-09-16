import {
    AlbumDataFields,
    DataBaseOrigin,
} from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';

export default interface GraphBoxContent {
    graphType: GraphBoxType;
    dataOrigin?: DataBaseOrigin;
    donnes: any[];
}

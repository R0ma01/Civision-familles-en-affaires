import { DataCardType } from '../enums/data-card-type-enum';

import { ChercheurDropdownItem } from './chercheur-drop-down-content';
import GraphBoxContent from './graph-box-content';

export default interface DataCardContent {
    type: DataCardType;
    title: string;
    description: string;
    graphData: GraphBoxContent[];
    searchBox?: any;
    chercheurDropdownOnCLick?: (item: ChercheurDropdownItem) => void;
}

import { MainDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '../enums/graph-box-enum';

export interface ChercheurDropdownItem {
    label: string;
    selected: boolean;
    graphType: GraphBoxType;
    donnees: MainDataFields[];
}

export interface ChercheurDropdownSection {
    label: string;
    items: (ChercheurDropdownItem | ChercheurDropdownSection)[];
}

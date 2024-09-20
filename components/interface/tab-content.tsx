import { DataBaseOrigin } from '../enums/data-types-enum';
import DataCardContent from './data-card-content';

export interface TabContent {
    // title: string;
    // acronym?: string;
    tabType: DataBaseOrigin;
    description: string;
    cards: DataCardContent[];
    visible: boolean;
}
//some compoennt

import { DataBaseOrigin } from '../enums/data-types-enum';
import { Traductions } from '../enums/language';
import DataCardContent from './data-card-content';

export interface TabContent {
    tabType: DataBaseOrigin;
    description: Traductions;
    cards: DataCardContent[];
    visible: boolean;
}
//some compoennt

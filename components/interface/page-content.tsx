import DataCardContent from './data-card-content';
import { TabContent } from './tab-content';

export default interface PageContent {
    _id?: string;
    title: string;
    description: string;
    tabs: TabContent[];
    backgroundImage: string;
    visible: boolean;
}

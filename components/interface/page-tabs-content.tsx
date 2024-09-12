import { TabContent } from './tab-content';

export default interface PageTabContent {
    _id?: string;
    title: string;
    description: string;
    tabs: TabContent[];
    backgroundImage: string;
    visible: boolean;
}

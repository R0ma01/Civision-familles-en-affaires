import DataCardContent from './data-card-content';

export default interface PageContent {
    _id: string;
    title: string;
    description: string;
    cards: DataCardContent[];
    backgroundImage: string;
    visible: boolean;
}

import React from 'react';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContent from '@/components/interface/data-card-content';

interface DataCardContainerProps {
    cards: DataCardContent[];
    className?: string;
}

const DataCardContainer: React.FC<DataCardContainerProps> = ({
    cards,
    className,
}) => {
    return (
        <div className={`flex z-10 justify-center items-center ${className}`}>
            {cards.map((content, index) => (
                <DataCard key={index} content={content} className="m-4" />
            ))}
        </div>
    );
};

export default DataCardContainer;

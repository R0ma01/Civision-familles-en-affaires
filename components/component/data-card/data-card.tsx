import React, { useState } from 'react';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import DataCardContent from '@/components/interface/data-card-content';
import GraphBox from '@/components/component/graph-box/graph-box';
import SearchBox from '@/components/component/search-box/search-box';

import ListeFournisseurs from '@/components/component/liste-fournisseurs/liste-fournisseurs';
import StaticDropdown from '../drop-down-menu/chercheur-drop-down';
import { UserType } from '@/components/enums/user-type-enum';

interface DataCardProps {
    className?: string;
    content: DataCardContent;
    admin?: boolean;
}

const DataCard: React.FC<DataCardProps> = ({
    content,
    className,
    admin = false,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const DataCardDiv: React.FC<{
        children: React.ReactNode;
        title: string;
    }> = ({ children, title }) => {
        return (
            <div
                className={`w-[500px] bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 dark:text-white backdrop-filter
                     backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-xl shadow-3xl py-8 px-8 pointer-events-auto
                     flex flex-col items-center h-auto space-y-1  ${className}`}
            >
                <button
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="absolute top-2 right-2 z-20"
                >
                    {isCollapsed ? (
                        <span className="text-lg text-black dark:text-white">
                            &#9650;
                        </span>
                    ) : (
                        <span className="text-lg text-black dark:text-white">
                            &#9660;
                        </span>
                    )}
                </button>
                <span
                    className={`text-md dark:font-semi-bold text-md text-center w-[80%]`}
                >
                    {title}
                </span>
                {!isCollapsed && children}
            </div>
        );
    };
    interface DescriptionComponentProps {
        children: string;
    }

    const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
        children,
    }) => {
        return <p className="text-xs">{children}</p>;
    };

    switch (content.type) {
        case DataCardType.SIMPLE:
            return (
                <DataCardDiv title={content.title}>
                    <DescriptionComponent>
                        {content.description}
                    </DescriptionComponent>
                </DataCardDiv>
            );

        case DataCardType.SIMPLE_GRAPH:
            return (
                <DataCardDiv title={content.title}>
                    <DescriptionComponent>
                        {content.description}
                    </DescriptionComponent>
                    <GraphBox content={content.graphData[0]} />
                </DataCardDiv>
            );

        case DataCardType.MULTIPLE_GRAPH:
            return (
                <DataCardDiv title={content.title}>
                    <DescriptionComponent>
                        {content.description}
                    </DescriptionComponent>
                    {content.graphData?.map((graph, index) => (
                        <GraphBox key={index} content={graph} />
                    ))}
                </DataCardDiv>
            );

        case DataCardType.SEARCH:
            return (
                <DataCardDiv title={content.title}>
                    <DescriptionComponent>
                        {content.description}
                    </DescriptionComponent>
                    <SearchBox />
                </DataCardDiv>
            );

        case DataCardType.SOLO_GRAPH:
            return (
                <DataCardDiv title={content.title}>
                    {content.graphData !== undefined && (
                        <GraphBox content={content.graphData[0]} />
                    )}
                </DataCardDiv>
            );

  

        case DataCardType.CHERCHEUR_DROPDOWN:
            return (
                <DataCardDiv title={content.title}>
                    <StaticDropdown
                        onClick={content.chercheurDropdownOnCLick}
                    />
                </DataCardDiv>
            );

        default:
            return (
                <DataCardDiv title="ERROR">
                    SOME ERROR OCCURRED HERE
                </DataCardDiv>
            );
    }
};

export default DataCard;

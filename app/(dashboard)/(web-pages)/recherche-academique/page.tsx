'use client';
import React, { useEffect, useState } from 'react';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import DataCardContent from '@/components/interface/data-card-content';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import DataCard from '@/components/component/data-card/data-card';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import DataCardContainer from '@/components/component/data-card/data-card-container';
import { ChercheurDropdownItem } from '@/components/interface/chercheur-drop-down-content';

export default function RechercheAcademique() {
    const { mapType, setMapStyle } = useMapStore((state) => ({
        mapType: state.mapType,
        setMapStyle: state.setMapStyle,
    }));

    const [cards, setCards] = useState<Map<string, DataCardContent>>(new Map());

    useEffect(() => {
        if (!mapType) {
            setMapStyle(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    function showGraph(item: ChercheurDropdownItem) {
        setCards((prevCards) => {
            const newCards = new Map(prevCards);

            if (newCards.has(item.label)) {
                newCards.delete(item.label);
            } else {
                const newDataCard: DataCardContent = {
                    title: item.label,
                    description: '',
                    type: DataCardType.SIMPLE_GRAPH,
                    graphData: [
                        {
                            graphType: item.graphType,
                            donnes: item.donnees,
                        },
                    ],
                };
                newCards.set(item.label, newDataCard);
            }

            return newCards;
        });
    }

    const firstItem: DataCardContent = {
        title: 'Sélecteur de données',
        description: '',
        graphData: [],
        chercheurDropdownOnCLick: showGraph,
        type: DataCardType.CHERCHEUR_DROPDOWN,
    };

    return (
        <PageContentContainer
            className="overflow-y-auto pb-10 pl-[30px] w-full"
            filterMenu={true}
        >
            <h1 className="text-5xl tracking-wide text-black dark:text-white z-10 mt-12 mb-10 cursor-default">
                Recherche Académique
            </h1>
            <div className="flex flex-col space-y-4 w-full">
                <DataCard content={firstItem} className="z-10" />
                <DataCardContainer
                    cards={Array.from(cards.values())}
                    className="flex-wrap w-full z-10"
                />
            </div>
        </PageContentContainer>
    );
}

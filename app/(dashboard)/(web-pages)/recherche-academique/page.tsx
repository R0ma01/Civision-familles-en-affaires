'use client';
import React, { useEffect, useState } from 'react';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import DataCardContent from '@/components/interface/data-card-content';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContainer from '@/components/component/data-card/data-card-container';
import { ChercheurDropdownItem } from '@/components/interface/chercheur-drop-down-content';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import { RecherchePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { PagePaths } from '@/components/enums/page-paths-enum';
import { useRouter } from 'next/navigation';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';

export default function RechercheAcademique() {
    const lang: Language = useDataStore((state) => state.lang);
    const router = useRouter();
    const [cards, setCards] = useState<Map<string, DataCardContent>>(new Map());

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    const { checkToken } = useGlobalUserStore((state: any) => ({
        checkToken: state.checkToken,
    }));
    const [user, setUser] = useState<UserType>(UserType.VISITOR);

    useEffect(() => {
        async function check() {
            const newUser = await checkToken();
            setUser(newUser);
            if (newUser === UserType.VISITOR || !newUser) {
                router.push(PagePaths.LOGIN);
            }
        }

        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUserToken]);

    useEffect(() => {
        async function check() {
            const newUser = await checkToken();

            setUser(newUser);
            if (newUser === UserType.VISITOR || !newUser) {
                router.push(PagePaths.LOGIN);
            }
        }

        check();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION_ALBUM) {
            setMapStyle(MapType.PAGE_INFORMATION_ALBUM);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    function showGraph(item: ChercheurDropdownItem) {
        setCards((prevCards) => {
            const newCards = new Map(prevCards);

            if (newCards.has(item.label)) {
                newCards.delete(item.label);
            } else {
                const newDataCard: DataCardContent = {
                    title: { FR: item.label, EN: '' },
                    description: { FR: '', EN: '' },
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
        title: { FR: 'Sélecteur de données', EN: '' },
        description: { FR: '', EN: '' },
        graphData: [],
        chercheurDropdownOnCLick: showGraph,
        type: DataCardType.CHERCHEUR_DROPDOWN,
    };

    return (
        <PageContentContainer
            className="overflow-y-auto pb-10 pl-[30px] w-full"
            filterMenu={true}
        >
            <div className="flex flex-col gap-4 w-full mt-12">
                <DataCardContainer
                    cards={[firstItem, ...Array.from(cards.values())]}
                    className="flex-wrap w-full z-10"
                    year={2022}
                />
            </div>
        </PageContentContainer>
    );
}

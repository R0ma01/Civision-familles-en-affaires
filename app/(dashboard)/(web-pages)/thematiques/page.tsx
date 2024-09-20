'use client';
import React, { useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalPageStore from '@/stores/global-page-store';
import PageTabContent from '@/components/interface/page-tabs-content';
import { html_object_constants } from '@/constants/constants';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';

export default function Thematiques() {
    const { pagesData, pageLoading, pageError } = useGlobalPageStore(
        (state: any) => {
            return {
                pagesData: state.pagesData,
                pageLoading: state.pageLoading,
                pageError: state.pageError,
            };
        },
    );
    const [pages, setPages] = useState<PageTabContent[]>([]);

    const { mapType, setMapStyle } = useMapStore((state) => {
        return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    });

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION) {
            setMapStyle(MapType.PAGE_INFORMATION);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    useEffect(() => {
        if (pagesData) {
            setPages(pagesData);
        }
    }, [pagesData]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                Thématiques
            </h1>
            <div className="justify-center flex flex-wrap w-[80%]">
                {pages.length > 0 ? (
                    pages.map(
                        (card, index) =>
                            card.visible && (
                                <ThemeCard
                                    key={`${html_object_constants.theme_card_id}-${index}`}
                                    index={`${html_object_constants.theme_card_id}-${index}`}
                                    page={card}
                                />
                            ),
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </PageContentContainer>
    );
}

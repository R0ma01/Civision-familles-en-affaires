'use client';
import React, { useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalPageStore from '@/stores/global-page-store';
import PageTabContent from '@/components/interface/page-tabs-content';
import { html_object_constants } from '@/constants/constants';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import {
    SharedPromptsTranslations,
    ThematiquePromptsTranslations,
} from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';

export default function Thematiques() {
    const lang: Language = useDataStore((state) => state.lang);

    const {
        pagesData,
        pageLoading,
        pageError,
        pageDataFetched,
        loading,
        fetchPageData,
    } = useGlobalPageStore((state: any) => {
        return {
            pagesData: state.pagesData,
            pageDataFetched: state.pageDataFetched,
            pageLoading: state.pageLoading,
            pageError: state.pageError,
            loading: state.loading,
            fetchPageData: state.fetchPageData,
        };
    });

    useEffect(() => {
        async function fetchPages() {
            await fetchPageData();
        }
        if (!pageDataFetched && !loading) {
            fetchPages();
        }
    }, [pageDataFetched, loading, fetchPageData]);

    const [pages, setPages] = useState<PageTabContent[]>([]);

    const { mapType, setMapStyle } = useMapStore((state) => {
        return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    });

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION_ALBUM) {
            setMapStyle(MapType.PAGE_INFORMATION_ALBUM);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    useEffect(() => {
        if (pagesData) {
            setPages(pagesData);
        }
    }, [pagesData]);

    if (pageError)
        return (
            <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-screen">
                <div className="absolute top-[50vh] w-fit dark:text-white text-xl">
                    {SharedPromptsTranslations.error[lang]}
                    {pageError}
                </div>
            </PageContentContainer>
        );
    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-screen">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                {ThematiquePromptsTranslations.page_title[lang]}
            </h1>
            {!pageLoading ? (
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
                        <p>{SharedPromptsTranslations.loading[lang]}</p>
                    )}
                </div>
            ) : (
                <div className="loader-circle absolute top-[35vh] w-fit"></div>
            )}
        </PageContentContainer>
    );
}

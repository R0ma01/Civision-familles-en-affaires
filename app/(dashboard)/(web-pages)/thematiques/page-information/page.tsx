'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { TabContainer } from '@/components/component/tab/tab-container';
import useGlobalPageStore from '@/stores/global-page-store';
import PageContent from '@/components/interface/page-content';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';

const TestPage: PageContent = {
    _id: '66b4e544cad59ae8b5a4b710',
    backgroundImage: '/images/gouvernement-parties/3.png',
    title: "Solidité de l'entreprise",
    description:
        "Celle-ci est une section contenant des données concernant l'objectif gouvernemental: Solidité de l'entreprise.",
    tabs: [
        {
            title: 'tab 1',
            description: 'Some desc',
            visible: true,
            cards: [
                {
                    type: 1,
                    title: "Nombre d'actionnaires dans l'entreprise",
                    description: '',
                    graphData: [
                        {
                            graphType: GraphBoxType.VERTICAL_BARCHART,
                            donnes: [MainDataFields.ACTIONNAIRES_EXTERNE],
                        },
                    ],
                },
                {
                    type: 1,
                    title: "Types d'actionnaires externes à la famille",
                    description: '',
                    graphData: [
                        {
                            graphType: GraphBoxType.HORIZONTAL_BARCHART,
                            donnes: [MainDataFields.ACTIONNAIRES_EXTERNE],
                        },
                    ],
                },
            ],
        },
        {
            title: 'tab 2',
            description: 'Some new desc',
            visible: true,
            cards: [
                {
                    type: 1,
                    title: 'Structures de gouvernances des entreprises familiales',
                    description: '',
                    graphData: [
                        {
                            graphType: GraphBoxType.HORIZONTAL_BARCHART,
                            donnes: [MainDataFields.GOUVERNANCE_STRUCTURES],
                        },
                    ],
                },
            ],
        },
    ],

    visible: true,
};

function PageContentComponent() {
    const [page, setPage] = useState<PageContent | undefined>(undefined);
    const searchParams = useSearchParams();
    const _id = searchParams.get('_id');
    const { pagesData, pageLoading, pageError } = useGlobalPageStore(
        (state: any) => ({
            pagesData: state.pagesData,
            pageLoading: state.pageLoading,
            pageError: state.pageError,
        }),
    );

    const { mapType, setMapStyle } = useMapStore((state) => ({
        mapType: state.mapType,
        setMapStyle: state.setMapStyle,
    }));

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION) {
            setMapStyle(MapType.PAGE_INFORMATION);
        }
    }, [mapType]);

    useEffect(() => {
        if (!page && pagesData) {
            setPage(pagesData.find((p: PageContent) => p._id === _id));
        }
    }, [page, pagesData, _id]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;

    return (
        <>
            <PageContentContainer className="overflow-auto pb-10 pl-[30px] w-full">
                <h1 className="text-2xl font-bold tracking-wide text-black dark:text-white mt-12 mb-4 z-10">
                    {page?.title || 'Loading Title...'}
                </h1>
                {page && (
                    <div className="flex flex-col space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 z-10">
                            {page?.description}
                        </p>
                        <TabContainer tabs={page.tabs} className="z-10" />
                    </div>
                )}
            </PageContentContainer>
        </>
    );
}

export default function PageInformation() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContentComponent />
        </Suspense>
    );
}

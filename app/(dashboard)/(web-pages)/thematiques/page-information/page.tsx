'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';

import useGlobalPageStore from '@/stores/global-page-store';

import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { TabContainer } from '@/components/component/tab/tab-container';
import PageTabContent from '@/components/interface/page-tabs-content';

function PageContentComponent() {
    const [page, setPage] = useState<PageTabContent | undefined>(undefined);
    const searchParams = useSearchParams();
    const _id = searchParams.get('_id');
    const { pagesData, pageLoading, pageError } = useGlobalPageStore(
        (state: any) => {
            return {
                pagesData: state.pagesData,
                pageLoading: state.pageLoading,
                pageError: state.pageError,
            };
        },
    );

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
        if (!page && pagesData) {
            setPage(pagesData.find((page: PageTabContent) => page._id === _id));
        }
    }, [page, pagesData, _id]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;
    // console.log(page);
    return (
        <>
            <PageContentContainer
                className="overflow-auto pb-10 pl-[30px]"
                filterMenu={true}
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    {page?.title}
                </h1>

                {/* {page ? (
                    <div className="flex flex-col space-y-4 dark:text-white">
                        <p className="z-10 text-xs">{page?.description}</p>
                        {page.cards.map((card) => (
                            <DataCard key={card.title} content={card} />
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )} */}
                {page && <TabContainer tabs={page?.tabs ?? []}></TabContainer>}
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

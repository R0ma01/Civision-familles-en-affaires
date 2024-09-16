'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import DataCard from '@/components/component/data-card/data-card';
import useGlobalPageStore from '@/stores/global-page-store';
import PageTabContent from '@/components/interface/page-tabs-content';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { TabContainer } from '@/components/component/tab/tab-container';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import {
    AlbumDataFields,
    DataBaseOrigin,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import { title } from 'process';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { value_constants } from '@/constants/constants';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';

import useGlobalFilterStore from '@/stores/global-filter-store';

function PageContentComponent() {
    const [page, setPage] = useState<PageTabContent | undefined>(undefined);
    const searchParams = useSearchParams();
    const { matchStage } = useGlobalFilterStore((state) => ({
        matchStage: state.matchStage,
    }));
    const _id = '66b4e544cad59ae8b5a4b710'; //searchParams.get('_id');
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
        async function fetchMe() {
            const pageTemp = await PageHttpRequestService.getTabPage(_id);
            setPage(pageTemp);
        }
        if (!page) {
            fetchMe();
        }
        console.log(page);
    }, [page, pagesData, _id]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;

    return (
        <>
            <PageContentContainer
                className="overflow-auto pb-10 pl-[30px]"
                filterMenu={true}
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    {page?.title}
                </h1>
                {Object.values(IndexeDataFieldsB).map((value, index) => {
                    return (
                        <DataCard
                            key={index}
                            content={{
                                type: DataCardType.SIMPLE_GRAPH,
                                title: value,
                                description: '',
                                graphData: [
                                    {
                                        graphType: GraphBoxType.DOUGHNUT,
                                        donnes: [value],
                                        dataOrigin: DataBaseOrigin.INDEX_VOLETB,
                                    },
                                ],
                            }}
                        ></DataCard>
                    );
                })}
                {/* {page && <TabContainer tabs={page?.tabs ?? []}></TabContainer>} */}
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

{
    /* return (
                    <DataCard
                        content={{
                            type: DataCardType.SIMPLE_GRAPH,
                            title: value,
                            description: '',
                            graphData: [
                                {
                                    graphType:
                                        GraphBoxType.VERTICAL_BARCHART,
                                    donnes: [value],
                                },
                            ],
                        }}
                    ></DataCard>
                ); */
}

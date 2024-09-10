'use client';
import React, { useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';

export default function test() {
    // const { mapType, setMapStyle } = useMapStore((state) => {
    //     return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    // });

    // useEffect(() => {
    //     if (mapType !== MapType.PAGE_INFORMATION) {
    //         setMapStyle(MapType.PAGE_INFORMATION);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [mapType]);

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        async function fetch() {
            const laData: any = await SheetsHTTPService.getSheetData();
            console.log(laData);
            console.log('Some data' + JSON.stringify(laData));
            setData(laData['data']['values']);

            console.log('Some other data' + JSON.stringify(data));
        }
        if (data.length === 0) fetch();
    }, [data]);

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                TEST
            </h1>
            {/* {Object.values(MainDataFields).map((filed: MainDataFields) => {
                const content: GraphBoxContent = {
                    graphType: GraphBoxType.VERTICAL_BARCHART,
                    donnes: [filed],
                };
                return (
                    <div className="bg-black">
                        <p className="text-xl text-white">{filed}</p>
                        <GraphBox content={content}></GraphBox>
                    </div>
                );
            })} */}

            {data.map((item) => {
                return (
                    <div>
                        <p>{JSON.stringify(item)}</p>
                    </div>
                );
            })}
            <div className="justify-center flex flex-wrap w-[80%]"></div>
        </PageContentContainer>
    );
}

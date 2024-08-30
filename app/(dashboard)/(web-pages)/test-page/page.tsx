// 'use client';
// import React, { useEffect, useState } from 'react';
// import PageContentContainer from '@/components/component/page-content-container/page-content-container';
// import ThemeCard from '@/components/component/theme-card/theme-card';
// import useGlobalPageStore from '@/stores/global-page-store';
// import PageContent from '@/components/interface/page-content';
// import constants from '@/constants/constants';
// import useMapStore from '@/stores/global-map-store';
// import { MapType } from '@/components/enums/map-type-enum';
// import { MainDataFields } from '@/components/enums/data-types-enum';
// import GraphBox from '@/components/component/graph-box/graph-box';
// import { GraphBoxType } from '@/components/enums/graph-box-enum';
// import { Field } from 'formik';
// import GraphBoxContent from '@/components/interface/graph-box-content';

// export default function test() {
//     const { mapType, setMapStyle } = useMapStore((state) => {
//         return { mapType: state.mapType, setMapStyle: state.setMapStyle };
//     });

//     useEffect(() => {
//         if (mapType !== MapType.PAGE_INFORMATION) {
//             setMapStyle(MapType.PAGE_INFORMATION);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [mapType]);

//     return (
//         <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
//             <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
//                 TEST
//             </h1>
//             {Object.values(MainDataFields).map((filed: MainDataFields) => {
//                 const content: GraphBoxContent = {
//                     graphType: GraphBoxType.VERTICAL_BARCHART,
//                     donnes: [filed],
//                 };
//                 return (
//                     <div className="bg-black">
//                         <p className="text-xl text-white">{filed}</p>
//                         <GraphBox content={content}></GraphBox>
//                     </div>
//                 );
//             })}
//             <div className="justify-center flex flex-wrap w-[80%]"></div>
//         </PageContentContainer>
//     );
// }

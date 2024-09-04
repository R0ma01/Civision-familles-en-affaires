'use client';

import Mapbox from '@/components/component/carte/Mapbox';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useRef } from 'react';
import Chloropleth from './Chloropleth';
import ClusterCloud from './ClusterCloud';
import Repertoire from '@/app/(dashboard)/(web-pages)/repertoire/page';
import { MapType } from '@/components/enums/map-type-enum';

export default function Carte() {
    // global variables
    const mapRef = useRef(null);
    const map = useMapStore((state) => state.map);
    const mapType = useMapStore((state) => state.mapType);
    const filterData = useGlobalFilterStore((state: any) => state.filterData);

    const {
        studyData,
        repertoireData,
        fetchStudyData,
        studyDataFetched,
        repertoireDataFetched,
        fetchRepertoireData,
        loading,
    } = useGlobalDataStore((state: any) => ({
        studyData: state.studyData,
        repertoireData: state.repertoireData,
        fetchStudyData: state.fetchStudyData,
        fetchRepertoireData: state.fetchRepertoireData,
        studyDataFetched: state.studyDataFetched,
        repertoireDataFetched: state.repertoireDataFetched,
        loading: state.loading,
    }));

    useEffect(() => {
        async function studyFetch() {
            await fetchStudyData(filterData);
        }
        async function repertoireFetch() {
            await fetchRepertoireData(filterData);
        }

        if (
            !studyDataFetched &&
            mapType == MapType.PAGE_INFORMATION &&
            !loading
        ) {
            console.log('study data');
            studyFetch();
            console.log(studyData);
        }

        if (
            !repertoireDataFetched &&
            mapType == MapType.REPERTOIRE &&
            !loading
        ) {
            console.log('rep data');
            repertoireFetch();
            console.log(repertoireData);
        }
    }, [
        studyData,
        repertoireData,
        repertoireDataFetched,
        fetchRepertoireData,
        studyDataFetched,
        fetchStudyData,
    ]);

    useEffect(() => {
        // update map reference
        mapRef.current = map;
        console.log('i am called');
    }, [map]);

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
            {mapType == MapType.PAGE_INFORMATION && (
                <Chloropleth data={studyData} dataField="count"></Chloropleth>
            )}
            {loading && (
                <div className="absolute top-0 left-[18%] w-full h-full flex justify-center items-center">
                    <div className="loader-map"></div>
                </div>
            )}
            {mapType == MapType.REPERTOIRE && (
                <ClusterCloud data={repertoireData}></ClusterCloud>
            )}
        </div>
    );
}

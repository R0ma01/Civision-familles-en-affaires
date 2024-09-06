'use client';

import Mapbox from '@/components/component/carte/Mapbox';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useRef, useState } from 'react';
import Chloropleth from './Chloropleth';
import ClusterCloud from './ClusterCloud';
import Repertoire from '@/app/(dashboard)/(web-pages)/repertoire/page';
import { MapType } from '@/components/enums/map-type-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import ColorLegend from './Color-Legend';
import { choroplethColors, clusterColors } from '@/constants/color-palet';

export default function Carte() {
    // global variables
    const mapRef = useRef(null);
    const map = useMapStore((state) => state.map);
    const mapType = useMapStore((state) => state.mapType);
    const filterData = useGlobalFilterStore((state: any) => state.filterData);
    const [fournisseurMapData, setFournisseurMapData] = useState<any>({});
    const {
        studyData,
        repertoireData,
        fournisseurData,
        fetchStudyData,
        fetchRepertoireData,
        fetchFournisseurData,
        studyDataFetched,
        loading,
        fournisseurDataFetched,
        repertoireDataFetched,
    } = useGlobalDataStore((state: any) => ({
        studyData: state.studyData,
        repertoireData: state.repertoireData,
        fournisseurData: state.fournisseurData,
        fetchStudyData: state.fetchStudyData,
        fetchRepertoireData: state.fetchRepertoireData,
        fetchFournisseurData: state.fetchFournisseurData,
        studyDataFetched: state.studyDataFetched,
        fournisseurDataFetched: state.fournisseurDataFetched,
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

        async function fournisseurFetch() {
            await fetchFournisseurData();
        }

        if (
            !studyDataFetched &&
            mapType == MapType.PAGE_INFORMATION &&
            !loading
        ) {
            console.log('study fetch');
            studyFetch();
        }

        if (
            (!repertoireDataFetched || repertoireData.length === 0) &&
            mapType == MapType.REPERTOIRE &&
            !loading
        ) {
            console.log('repertoire fetch');
            repertoireFetch();
        }

        if (
            !fournisseurDataFetched &&
            mapType == MapType.FOURNISSEURS &&
            !loading
        ) {
            console.log('i am called');
            fournisseurFetch();
        }
    }, [
        studyData,
        repertoireData,
        fetchRepertoireData,
        studyDataFetched,
        fetchStudyData,
        fetchFournisseurData,
        fournisseurDataFetched,
        fournisseurData,
        repertoireDataFetched,
    ]);

    useEffect(() => {
        // update map reference
        mapRef.current = map;
        console.log(studyDataFetched);
        console.log(studyData);
        console.log(repertoireDataFetched);
        console.log(repertoireData);
        console.log(fournisseurDataFetched);
        console.log(fournisseurData);
    }, [map]);

    useEffect(() => {
        setFournisseurMapData(convertFournisseurData(fournisseurData));
    }, [fournisseurData]);

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
            {mapType == MapType.PAGE_INFORMATION && (
                <>
                    <Chloropleth
                        data={studyData}
                        dataField="count"
                    ></Chloropleth>
                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {loading && (
                <div className="absolute top-0 left-[18%] w-full h-full flex justify-center items-center">
                    <div className="loader-circle"></div>
                </div>
            )}
            {mapType == MapType.REPERTOIRE && (
                <>
                    <ClusterCloud data={repertoireData}></ClusterCloud>
                    <ColorLegend
                        gradientValues={clusterColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {mapType == MapType.FOURNISSEURS && (
                <>
                    <Chloropleth
                        data={fournisseurMapData}
                        dataField="count"
                    ></Chloropleth>
                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
        </div>
    );
}

function convertFournisseurData(fournisseurs: Fournisseur[]) {
    const secteurCount = fournisseurs.reduce(
        (acc: any, fournisseur: Fournisseur) => {
            fournisseur.secteurs_geographique.forEach((secteur) => {
                if (!acc[secteur]) {
                    acc[secteur] = 0;
                }
                acc[secteur] += 1;
            });
            return acc;
        },
        {},
    );

    // Convert the secteurCount object into an array of { secteur_geographique, count }
    return Object.entries(secteurCount).map(
        ([secteur_geographique, count]) => ({
            region: secteur_geographique,
            count,
        }),
    );
}

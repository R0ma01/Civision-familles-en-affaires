'use client';

import Mapbox from '@/components/component/carte/Mapbox';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useRef, useState } from 'react';
import Chloropleth from './Chloropleth';
import ClusterCloud from './ClusterCloud';
import { MapType } from '@/components/enums/map-type-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import ColorLegend from './Color-Legend';
import { choroplethColors, clusterColors } from '@/constants/color-palet';

export default function Carte() {
    // global variables
    const mapRef = useRef(null);
    const map = useMapStore((state) => state.map);
    const mapType = useMapStore((state) => state.mapType);
    const matchStage = useGlobalFilterStore((state: any) => state.matchStage);
    const [fournisseurMapData, setFournisseurMapData] = useState<any>({});
    const {
        studyData,
        repertoireData,
        fournisseurData,
        indexeAData,
        indexeBData,
        fetchStudyData,
        fetchRepertoireData,
        fetchFournisseurData,
        fetchIndexeAData,
        fetchIndexeBData,
        studyDataFetched,
        loading,
        fournisseurDataFetched,
        repertoireDataFetched,
        indexeADataFetched,
        indexeBDataFetched,
    } = useGlobalDataStore((state: any) => ({
        studyData: state.studyData,
        repertoireData: state.repertoireData,
        fournisseurData: state.fournisseurData,
        indexeAData: state.indexeAData,
        indexeBData: state.indexeBData,
        fetchStudyData: state.fetchStudyData,
        fetchRepertoireData: state.fetchRepertoireData,
        fetchFournisseurData: state.fetchFournisseurData,
        fetchIndexeAData: state.fetchIndexeAData,
        fetchIndexeBData: state.fetchIndexeBData,
        studyDataFetched: state.studyDataFetched,
        fournisseurDataFetched: state.fournisseurDataFetched,
        repertoireDataFetched: state.repertoireDataFetched,
        indexeADataFetched: state.indexeADataFetched,
        indexeBDataFetched: state.indexeBDataFetched,
        loading: state.loading,
    }));

    useEffect(() => {
        // update map reference
        mapRef.current = map;
    }, [map]);

    useEffect(() => {
        async function studyFetch() {
            await fetchStudyData(matchStage);
        }
        async function repertoireFetch() {
            await fetchRepertoireData(matchStage);
        }

        async function fournisseurFetch() {
            await fetchFournisseurData(matchStage);
        }

        async function indexeAFetch() {
            await fetchIndexeAData(matchStage);
        }

        async function indexeBFetch() {
            await fetchIndexeBData(matchStage);
        }

        if (
            !studyDataFetched &&
            mapType === MapType.PAGE_INFORMATION_ALBUM &&
            !loading
        ) {
            studyFetch();
        }

        if (
            !repertoireDataFetched &&
            mapType === MapType.REPERTOIRE &&
            !loading
        ) {
            repertoireFetch();
        }

        if (
            !fournisseurDataFetched &&
            mapType === MapType.FOURNISSEURS &&
            !loading
        ) {
            fournisseurFetch();
        }

        if (
            !indexeADataFetched &&
            mapType === MapType.PAGE_INFORMATION_INDEX_VOLETA &&
            !loading
        ) {
            indexeAFetch();
        }

        if (
            !indexeBDataFetched &&
            mapType === MapType.PAGE_INFORMATION_INDEX_VOLETB &&
            !loading
        ) {
            indexeBFetch();
        }
    }, [
        studyData,
        repertoireData,
        fournisseurData,
        indexeAData,
        indexeBData,
        fetchStudyData,
        fetchRepertoireData,
        fetchFournisseurData,
        fetchIndexeAData,
        fetchIndexeBData,
        studyDataFetched,
        loading,
        fournisseurDataFetched,
        repertoireDataFetched,
        indexeADataFetched,
        indexeBDataFetched,
        mapType,
        matchStage,
    ]);

    useEffect(() => {
        setFournisseurMapData(convertFournisseurData(fournisseurData));
    }, [fournisseurData]);

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
            {mapType == MapType.PAGE_INFORMATION_ALBUM && (
                <>
                    <Chloropleth
                        map={map}
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
                    <ClusterCloud
                        data={repertoireData}
                        map={map}
                    ></ClusterCloud>
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
                        map={map}
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
            {mapType == MapType.PAGE_INFORMATION_INDEX_VOLETA && (
                <>
                    <Chloropleth
                        map={map}
                        data={indexeAData}
                        dataField="count"
                    ></Chloropleth>
                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {mapType == MapType.PAGE_INFORMATION_INDEX_VOLETB && (
                <>
                    <Chloropleth
                        map={map}
                        data={indexeBData}
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

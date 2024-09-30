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
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
import { setDefaultHighWaterMark } from 'stream';
import {
    AlbumDataFields,
    FournisseurDataFields,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import { GraphTextService } from '@/services/translations';
import { MapRegions } from '@/components/enums/map-regions';

export default function Carte() {
    // global variables
    const user = useGlobalUserStore((state: any) => state.user);
    const mapRef = useRef(null);
    const map = useMapStore((state) => state.map);
    const mapType = useMapStore((state) => state.mapType);
    const { matchStage, resetFilters, setFilter } = useGlobalFilterStore(
        (state: any) => ({
            matchStage: state.matchStage,
            resetFilters: state.resetFilters,
            setFilter: state.setFilter,
        }),
    );
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
        filterRepertoireData,
        filterFournisseurData,
        filterIndexeBData,
        filterIndexeAData,
        filterStudyData,
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
        filterRepertoireData: state.filterRepertoireData,
        filterStudyData: state.filterStudyData,
        filterIndexeAData: state.filterIndexeAData,
        filterIndexeBData: state.filterIndexeBData,
        filterFournisseurData: state.filterFournisseurData,
    }));

    useEffect(() => {
        // update map reference
        mapRef.current = map;
    }, [map]);

    useEffect(() => {
        async function studyFetch() {
            console.log('I am called');
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
        setFournisseurMapData(
            convertFournisseurData(
                fournisseurData,
                matchStage,
                user === UserType.ADMIN,
            ),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fournisseurData]);

    function filter(region: any, field: any, mapTypeInside: MapType) {
        const filterKeys = MapRegions.get(mapTypeInside); // Get the map corresponding to the mapType
        if (!filterKeys) return;

        let filterRegion = undefined;

        // Convert the Map to an array and iterate over the entries
        Array.from(filterKeys.entries()).forEach(([key, value]) => {
            console.log(value === region);
            console.log(key); // The key is already available, no need to convert to array

            // Check if the current value matches the region
            if (value === region) {
                filterRegion = key;
            }
        });

        // If filterRegion was set, use it; otherwise, use the original region
        if (filterRegion !== undefined) {
            setFilter(field, filterRegion);
        } else {
            setFilter(field, region);
        }

        console.log(matchStage);

        // Handle the filtering logic based on the mapTypeInside
        switch (mapTypeInside) {
            case MapType.REPERTOIRE:
                filterRepertoireData();
                break;
            case MapType.PAGE_INFORMATION_ALBUM:
                filterStudyData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETA:
                filterIndexeAData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETB:
                filterIndexeBData();
                break;
            case MapType.FOURNISSEURS:
                filterFournisseurData();
                break;
            default:
                break;
        }
    }

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
            {mapType == MapType.PAGE_INFORMATION_ALBUM && (
                <>
                    <Chloropleth
                        map={map}
                        data={studyData}
                        dataField="count"
                        filterFunction={(region: any) => {
                            filter(
                                region,

                                AlbumDataFields.COORDONNES_REGION,
                                mapType,
                            );
                        }}
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
                        filterFunction={(region: any) => {
                            filter(
                                region,
                                FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
                                mapType,
                            );
                        }}
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
                        filterFunction={(region: any) => {
                            filter(region, IndexeDataFieldsB.Q0QC, mapType);
                        }}
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
                        filterFunction={(region: any) => {
                            filter(region, IndexeDataFieldsB.Q0QC, mapType);
                        }}
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

function convertFournisseurData(
    fournisseurs: Fournisseur[],
    matchStage: Record<any, any>,
    admin: boolean,
) {
    const regions: string[] = matchStage['secteurs_geographique']?.$in;

    const secteurCount = fournisseurs.reduce(
        (acc: any, fournisseur: Fournisseur) => {
            if (fournisseur.visible || admin)
                fournisseur.secteurs_geographique.forEach((secteur) => {
                    if (!acc[secteur]) {
                        acc[secteur] = 0;
                    }
                    if (
                        !regions ||
                        regions.findIndex((region) => region === secteur) >= 0
                    ) {
                        acc[secteur] += 1;
                    }
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

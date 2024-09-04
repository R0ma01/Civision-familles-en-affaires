import quebec_regions from '@/geojson/quebec_regions.json';
import { logoPalette } from '@/constants/color-palet';
import { MapType } from '@/components/enums/map-type-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import { CompanyInfo } from '@/components/interface/company';
import mapboxgl from 'mapbox-gl';
import { AuthMechanism } from 'mongodb';
import { RepertoireData } from '@/components/interface/repertoire-data';
import { mapColors } from '@/constants/color-palet';
import { GraphDataHttpRequestService } from '../data-http-request-service';
import { TableauxTraitementMap } from '../tableaux-taitement';
import {
    MapChloroplethePointData,
    MapClusterPointData,
} from '@/components/interface/point-data';
import { populateRepertoire } from './populate-repertoire';
import { MainDataFields } from '@/components/enums/data-types-enum';
import { populatePageInformation } from './populate-page-information';

function aggregateFournisseursByRegion(fournisseurs: Fournisseur[]) {
    const regionCounts: any = {};

    fournisseurs.forEach((fournisseur) => {
        fournisseur.secteurs_geographique.forEach((region: any) => {
            if (regionCounts[region]) {
                regionCounts[region] += 1;
            } else {
                regionCounts[region] = 1;
            }
        });
    });

    return regionCounts;
}

function createRegionFeatures(
    regionCounts: Record<string, number>,
    regionsGeoJSON: any,
) {
    const features: any[] = [];

    regionsGeoJSON.features.forEach((region: any) => {
        const regionName = region.properties.res_nm_reg;

        // Find the count of companies in this region
        const count = regionCounts[regionName] || 0;

        // Push the entire region as a feature with a 'Polygon' or 'MultiPolygon'
        features.push({
            type: 'Feature',
            geometry: region.geometry, // Use the original geometry of the region
            properties: {
                region: regionName,
                count: count,
            },
        });
    });

    return {
        type: 'FeatureCollection',
        features: features,
    };
}

function convertClusterData(compagnies: MapClusterPointData[]) {
    const features = compagnies
        .flatMap((compagnie: MapClusterPointData) => {
            if (compagnie.coords && compagnie.nom) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: compagnie.coords,
                    },
                    properties: {
                        weight: 0.5,
                        id: compagnie._id,
                        // taille_entreprise: compagnie.taille_entreprise,
                        // annee_fondation: compagnie.annee_fondation,
                        // adresse: compagnie.adresse,
                    },
                };
            }
            return null;
        })
        .filter((feature) => feature !== null);

    return {
        type: 'FeatureCollection',
        features: features.flat(), // Flatten the array of arrays
    };
}

export function populateMapLayers(
    mapRef: any,
    mapType: any,
    filteredFournisseurData: any,
    studyFilteredData: any,
    isDarkMode: any,
    hoveredStateId: any,
    repertoireFilteredData: any,
) {
    try {
        switch (mapType) {
            case MapType.PAGE_INFORMATION:
                //CLUSTERS DE COMPAGNIES POUR LE RÉPERTOIRE ET LES PAGES
                // Add companies source
                populatePageInformation(
                    mapRef,
                    studyFilteredData,
                    createRegionFeatures,
                    isDarkMode,
                );
                break;

            case MapType.FOURNISSEURS:
                //REGIONS POUR LES FOURNISSEURS
                mapRef.current.addSource('quebec-regions', {
                    type: 'geojson',
                    data: quebec_regions,
                });

                const regionCounts = aggregateFournisseursByRegion(
                    filteredFournisseurData,
                );
                const regionFeatures = createRegionFeatures(
                    regionCounts,
                    quebec_regions,
                );

                mapRef.current.addSource('fournisseurs-regions', {
                    type: 'geojson',
                    data: regionFeatures,
                    cluster: true,
                    clusterMaxZoom: 14,
                    clusterRadius: 50,
                });

                mapRef.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'fournisseurs-regions',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            mapColors.colorValue1,
                            1,
                            mapColors.colorValue5,
                            5,
                            mapColors.colorValue15,
                            10,
                            mapColors.colorValue30,
                            30,
                            mapColors.colorValue50,
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40,
                        ],
                    },
                });

                mapRef.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'fournisseurs-regions',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold',
                        ],
                        'text-size': 12,
                    },
                });

                mapRef.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'fournisseurs-regions',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff',
                    },
                });

                // Add region boundaries fill layer with conditional opacity
                mapRef.current.addLayer({
                    id: 'region-boundaries',
                    type: 'fill',
                    source: 'quebec-regions',
                    paint: {
                        'fill-color': logoPalette.custom_gray,
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            0.2,
                            0.05,
                        ],
                    },
                });

                // Add region boundaries outline layer
                mapRef.current.addLayer({
                    id: 'region-boundaries-outline',
                    type: 'line',
                    source: 'quebec-regions',
                    paint: {
                        'line-color': `${isDarkMode ? logoPalette.logo_light_blue : logoPalette.logo_dark_blue}`,
                        'line-width': 0.5,
                    },
                });

                // Add event listeners for hover effect
                mapRef.current.on('mouseenter', 'region-boundaries', () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });

                mapRef.current.on('mouseleave', 'region-boundaries', () => {
                    mapRef.current.getCanvas().style.cursor = '';
                    if (hoveredStateId.current !== null) {
                        mapRef.current.setFeatureState(
                            {
                                source: 'quebec-regions',
                                id: hoveredStateId.current,
                            },
                            { hover: false },
                        );
                    }
                    hoveredStateId.current = null;
                });

                mapRef.current.on(
                    'mousemove',
                    'region-boundaries',
                    (e: any) => {
                        if (e.features.length > 0) {
                            if (hoveredStateId.current !== null) {
                                mapRef.current.setFeatureState(
                                    {
                                        source: 'quebec-regions',
                                        id: hoveredStateId.current,
                                    },
                                    { hover: false },
                                );
                            }
                            hoveredStateId.current = e.features[0].id;
                            mapRef.current.setFeatureState(
                                {
                                    source: 'quebec-regions',
                                    id: hoveredStateId.current,
                                },
                                { hover: true },
                            );
                        }
                    },
                );
                break;

            case MapType.REPERTOIRE:
                populateRepertoire(
                    mapRef,
                    repertoireFilteredData,
                    convertClusterData,
                );
                break;

            default:
                break;
        }
    } catch (e) {
        console.error(e);
    }
}

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGlobalDataStore from '@/stores/global-data-store';
import useMapStore from '@/stores/global-map-store';
import constants from '@/constants/constants';
import quebec_regions from '@/geojson/quebec_regions.json';
import { logoPalette } from '@/constants/color-palet';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';

function aggregateFournisseursByRegion(fournisseurs) {
    const regionCounts = {};

    fournisseurs.forEach((fournisseur) => {
        fournisseur.secteurs_geographique.forEach((region) => {
            if (regionCounts[region]) {
                regionCounts[region] += 1;
            } else {
                regionCounts[region] = 1;
            }
        });
    });

    return regionCounts;
}

function createRegionFeatures(regionCounts, regionsGeoJSON) {
    const features = [];

    regionsGeoJSON.features.forEach((region) => {
        const regionName = region.properties.res_nm_reg;

        const count = regionCounts[regionName] || 0;

        if (count > 0) {
            features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: region.geometry.center || [
                        -76.06832627558094, 48.0,
                    ],
                },
                properties: {
                    region: regionName,
                    count: count,
                },
            });
        }
    });

    return {
        type: 'FeatureCollection',
        features: features,
    };
}

function convertData(compagnies) {
    const features = compagnies
        .map((compagnie) => {
            if (
                compagnie.coordonnees.latitude &&
                compagnie.coordonnees.longitude
            ) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            compagnie.coordonnees.longitude,
                            compagnie.coordonnees.latitude,
                        ],
                    },
                    properties: {
                        weight: 0.5,
                        nom_entreprise: compagnie.nom_entreprise,
                        secteur_activite: compagnie.secteur_activite,
                        taille_entreprise: compagnie.taille_entreprise,
                        annee_fondation: compagnie.annee_fondation,
                        adresse: compagnie.adresse,
                    },
                };
            }
            return null;
        })
        .filter((feature) => feature !== null);

    return {
        type: 'FeatureCollection',
        features: features,
    };
}

const MapBox = () => {
    const { mapType, setMap } = useMapStore((state) => {
        return { mapType: state.mapType, setMap: state.setMap };
    });
    const { point } = useMapStore();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const { filteredData } = useGlobalDataStore((state) => ({
        filteredData: state.filteredData,
    }));

    const { filteredFournisseurData } = useGlobalFournisseursStore((state) => ({
        filteredFournisseurData: state.filteredFournisseurData,
    }));
    const [isDarkMode, setIsDarkMode] = useState(false);
    const hoveredStateId = useRef(null); // To keep track of the hovered region

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleDarkModeChange);

        return () =>
            darkModeQuery.removeEventListener('change', handleDarkModeChange);
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: isDarkMode
                    ? 'mapbox://styles/mapbox/dark-v11'
                    : 'mapbox://styles/francisdomonte/clw9fq5b800j501nx042lhkwk/draft',
                center: [-76.06832627558094, 48.0],
                zoom: 5,
            });

            mapRef.current.on('load', () => {
                setMap(mapRef.current);
                {
                    if (mapType) {
                        //CLUSTERS DE COMPAGNIES POUR LE RÉPERTOIRE ET LES PAGES
                        // Add companies source
                        mapRef.current.addSource('compagnies', {
                            type: 'geojson',
                            data: convertData(filteredData),
                            cluster: true,
                            clusterMaxZoom: 10,
                            clusterRadius: 100,
                        });

                        // Add clusters layer
                        mapRef.current.addLayer({
                            id: 'clusters',
                            type: 'circle',
                            source: 'compagnies',
                            filter: ['has', 'point_count'],
                            paint: {
                                'circle-color': [
                                    'step',
                                    ['get', 'point_count'],
                                    '#8dd0cf',
                                    1,
                                    '#75CDCC',
                                    5,
                                    '#33A0AB',
                                    15,
                                    '#4987A0',
                                    25,
                                    '#06768d',
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

                        // Add cluster count layer
                        mapRef.current.addLayer({
                            id: 'cluster-count',
                            type: 'symbol',
                            source: 'compagnies',
                            filter: ['has', 'point_count'],
                            layout: {
                                'text-field': [
                                    'get',
                                    'point_count_abbreviated',
                                ],
                                'text-font': [
                                    'DIN Offc Pro Medium',
                                    'Arial Unicode MS Bold',
                                ],
                                'text-size': 12,
                            },
                        });

                        // Add unclustered points layer
                        mapRef.current.addLayer({
                            id: 'unclustered-point',
                            type: 'circle',
                            source: 'compagnies',
                            filter: ['!', ['has', 'point_count']],
                            paint: {
                                'circle-color': '#11b4da',
                                'circle-radius': 4,
                                'circle-stroke-width': 1,
                                'circle-stroke-color': '#fff',
                            },
                        });

                        // Popup for unclustered points
                        mapRef.current.on('click', 'unclustered-point', (e) => {
                            const coordinates =
                                e.features[0].geometry.coordinates.slice();
                            const properties = e.features[0].properties;

                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(
                                    `
                            <strong>${properties.nom_entreprise}</strong><br>
                            Secteur d'activité: ${properties.secteur_activite}<br>
                            Taille de l'entreprise: ${properties.taille_entreprise}<br>
                            Année de fondation: ${properties.annee_fondation}<br>
                            Adresse: ${properties.adresse}
                        `,
                                )
                                .addTo(mapRef.current);
                        });

                        // Zoom into clusters on click
                        mapRef.current.on('click', 'clusters', (e) => {
                            const features =
                                mapRef.current.queryRenderedFeatures(e.point, {
                                    layers: ['clusters'],
                                });
                            const clusterId = features[0].properties.cluster_id;
                            mapRef.current
                                .getSource('compagnies')
                                .getClusterExpansionZoom(
                                    clusterId,
                                    (err, zoom) => {
                                        if (err) return;

                                        mapRef.current.easeTo({
                                            center: features[0].geometry
                                                .coordinates,
                                            zoom: zoom,
                                        });
                                    },
                                );
                        });

                        mapRef.current.on('mouseenter', 'clusters', () => {
                            mapRef.current.getCanvas().style.cursor = 'pointer';
                        });
                        mapRef.current.on('mouseleave', 'clusters', () => {
                            mapRef.current.getCanvas().style.cursor = '';
                        });
                    } else {
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
                                    '#8dd0cf',
                                    1,
                                    '#75CDCC',
                                    5,
                                    '#33A0AB',
                                    10,
                                    '#4987A0',
                                    15,
                                    '#06768d',
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
                                'text-field': [
                                    'get',
                                    'point_count_abbreviated',
                                ],
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
                                    [
                                        'boolean',
                                        ['feature-state', 'hover'],
                                        false,
                                    ],
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
                        mapRef.current.on(
                            'mouseenter',
                            'region-boundaries',
                            () => {
                                mapRef.current.getCanvas().style.cursor =
                                    'pointer';
                            },
                        );

                        mapRef.current.on(
                            'mouseleave',
                            'region-boundaries',
                            () => {
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
                            },
                        );

                        mapRef.current.on(
                            'mousemove',
                            'region-boundaries',
                            (e) => {
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
                    }
                }
                // Add Quebec region boundaries source

                // Change cursor on cluster hover
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkMode, mapType]);

    useEffect(() => {
        if (point && mapRef.current) {
            mapRef.current.flyTo({
                center: [
                    point.geometry.coordinates[0] + constants.offset,
                    point.geometry.coordinates[1],
                ],
                zoom: 12,
                speed: 0.9,
                essential: true,
            });

            new mapboxgl.Popup()
                .setLngLat(point.geometry.coordinates)
                .setHTML(
                    `
                    <strong>${point.properties.nom_entreprise}</strong><br>
                    Secteur d'activité: ${point.properties.secteur_activite}<br>
                    Taille de l'entreprise: ${point.properties.taille_entreprise}<br>
                    Année de fondation: ${point.properties.annee_fondation}<br>
                    Adresse: ${point.properties.adresse}
                `,
                )
                .addTo(mapRef.current);
        }
    }, [point]);

    useEffect(() => {
        if (mapRef.current) {
            const source = mapRef.current.getSource('compagnies');
            if (source) {
                source.setData(convertData(filteredData));
            }
        }
    }, [filteredData]);

    return <div id="map" ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapBox;

import mapboxgl from 'mapbox-gl';
import { GraphDataHttpRequestService } from '../data-http-request-service';
import { mapColors } from '@/constants/color-palet';

export function populateRepertoire(
    mapRef: any,
    repertoireFilteredData: any,
    convertData: (data: any) => void,
) {
    try {
        mapRef.current.addSource('compagnies-repertoire', {
            type: 'geojson',
            data: convertData(repertoireFilteredData),
            cluster: true,
            clusterMaxZoom: 14, // Adjust this value to control when clusters break apart
            clusterRadius: 100, // Adjust this value for cluster size
        });

        // Add clusters layer
        mapRef.current.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'compagnies-repertoire',
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
                    15,
                    mapColors.colorValue30,
                    50,
                    mapColors.colorValue50,
                    100,
                    mapColors.colorValue100,
                    250,
                    mapColors.colorValue250,
                    500,
                    mapColors.colorValue500,
                    1000,
                    mapColors.colorValue1000,
                    1500,
                    mapColors.colorValue1500,
                    2000,
                    mapColors.colorValue2000,
                    3000,
                    mapColors.colorValue3000,
                ],
                'circle-stroke-width': 0.5,
                'circle-stroke-color': '#000',
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    10, // Minimum radius
                    15, // Soft increase for small clusters
                    30,
                    50, // Soft increase for medium clusters
                    20,
                    100, // Larger increase for larger clusters
                    25,
                    500, // Gradual increase for very large clusters
                    30,
                    1000,
                    35,
                    3000,
                    40, // Maximum radius
                ],
            },
        });

        // Add cluster count layer
        mapRef.current.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'compagnies-repertoire',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12,
            },
            paint: {
                'text-color': [
                    'case',
                    ['>', ['get', 'point_count'], 500], // If point_count > 3000
                    '#ffffff', // Use white text color for clusters above 3000
                    '#000000', // Use black text color for all other clusters
                ],
            },
        });

        // Add unclustered points layer
        mapRef.current.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'compagnies-repertoire', // Use the same source as clusters
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#fff',
                'circle-radius': 4,
                'circle-stroke-width': 0.5,
                'circle-stroke-color': '#000',
            },
        });

        //Popup for unclustered points
        mapRef.current.on('click', 'unclustered-point', async (e: any) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const properties = e.features[0].properties;

            const point =
                await GraphDataHttpRequestService.getEntrepriseInformation(
                    properties.id,
                );

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                    `
                    <strong>${point.nom}</strong><br>
                    Secteur d'activité: ${point.secteur_activite}<br>
                    Taille Entreprise: ${point.taille_entreprise}<br>
                    Adresse: ${point.adresse}<br>
                  
                `,
                )
                .addTo(mapRef.current);
        });

        // Zoom into clusters on click
        mapRef.current.on('click', 'clusters', (e: any) => {
            const features = mapRef.current.queryRenderedFeatures(e.point, {
                layers: ['clusters'],
            });
            const clusterId = features[0].properties.cluster_id;
            mapRef.current
                .getSource('compagnies-repertoire')
                .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                    if (err) return;

                    mapRef.current.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom,
                    });
                });
        });

        // Change cursor when hovering over clusters
        mapRef.current.on('mouseenter', 'clusters', () => {
            mapRef.current.getCanvas().style.cursor = 'pointer';
        });
        mapRef.current.on('mouseleave', 'clusters', () => {
            mapRef.current.getCanvas().style.cursor = '';
        });
    } catch (e: any) {
        console.error(e.message);
    }
}

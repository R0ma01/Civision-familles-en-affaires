// // import { useEffect, useState, useRef, useMemo } from 'react';
// // import quebec_regions from '@/geojson/quebec_regions.json';
// // import { choroplethColors } from '@/constants/color-palet';
// // import { AlbumDataFields } from '@/components/enums/data-types-enum';
// // import { GraphTextService } from '@/services/translations';

// // interface ChloroplethProps {
// //     data: any[]; // GeoJSON data for regions
// //     dataField: string; // Field in the GeoJSON properties to base the color on
// //     map: any;
// //     filterFunction: (region: any) => void;
// // }

// // const Chloropleth: React.FC<ChloroplethProps> = ({
// //     data,
// //     dataField,
// //     map,
// //     filterFunction,
// // }) => {
// //     const [feature, setFeature] = useState<any>(null);
// //     const [chloroData, setChloroData] = useState<any>([]);
// //     const hoveredRegionIdRef = useRef<string | null>(null); // Use ref for hovered region ID

// //     useEffect(() => {
// //         setChloroData(data);
// //     }, [data]);

// //     // Memoized function to create region features based on chloroData
// //     const regionFeatures = useMemo(() => {
// //         const newRegionCounts: Record<string, number> = newRegionCount();
// //         chloroData.forEach((item: any) => {
// //             newRegionCounts[item.region] = item.count;
// //         });
// //         return createRegionFeatures(newRegionCounts, quebec_regions);
// //     }, [chloroData]);

// //     useEffect(() => {
// //         if (!map) return;

// //         const handleMapLoad = () => {
// //             setFeature(regionFeatures);
// //         };

// //         if (map.isStyleLoaded()) {
// //             handleMapLoad();
// //         } else {
// //             map.on('load', handleMapLoad);
// //         }

// //         return () => {
// //             if (map && handleMapLoad) {
// //                 map.off('load', handleMapLoad);
// //             }
// //         };
// //     }, [map, regionFeatures]);

// //     useEffect(() => {
// //         if (!map || !feature) return;

// //         const sourceExists = map.getSource('chloropleth-source');
// //         const layerExists = (layerId: string) => !!map.getLayer(layerId);
// //         console.log(sourceExists);
// //         // Remove the old source and layers if they exist
// //         if (sourceExists) {
// //             if (layerExists('chloropleth-layer')) {
// //                 map.removeLayer('chloropleth-layer');
// //             }
// //             if (layerExists('chloropleth-outline-layer')) {
// //                 map.removeLayer('chloropleth-outline-layer');
// //             }
// //             if (layerExists('chloropleth-hover-layer')) {
// //                 map.removeLayer('chloropleth-hover-layer');
// //             }
// //             map.removeSource('chloropleth-source');
// //         }

// //         // Add the source
// //         map.addSource('chloropleth-source', {
// //             type: 'geojson',
// //             data: feature,
// //         });
// //         map.addLayer({
// //             id: 'chloropleth-layer',
// //             type: 'fill',
// //             source: 'chloropleth-source',
// //             paint: {
// //                 'fill-color': [
// //                     'interpolate',
// //                     ['linear'],
// //                     ['get', dataField],
// //                     ...choroplethColors,
// //                 ],
// //                 'fill-opacity': 0.45,
// //             },
// //         });

// //         map.addLayer({
// //             id: 'chloropleth-outline-layer',
// //             type: 'line',
// //             source: 'chloropleth-source',
// //             paint: {
// //                 'line-color': '#000',
// //                 'line-width': 0.5,
// //             },
// //         });

// //         map.addLayer({
// //             id: 'chloropleth-hover-layer',
// //             type: 'line',
// //             source: 'chloropleth-source',
// //             paint: {
// //                 'line-color': [
// //                     'case',
// //                     ['==', ['get', 'region'], hoveredRegionIdRef.current],
// //                     '#FFCC00', // Highlight color on hover
// //                     'rgba(0, 0, 0, 0)', // Transparent when not hovered
// //                 ],
// //                 'line-width': 2,
// //             },
// //         });

// //         map.on('mouseup', 'chloropleth-layer', (e: any) => {
// //             console.log(hoveredRegionIdRef.current);
// //             if (e.features.length > 0) {
// //                 const hoveredRegion = e.features[0].properties.region;

// //                 // Update hovered region ID via ref
// //                 if (hoveredRegion !== hoveredRegionIdRef.current) {
// //                     hoveredRegionIdRef.current = hoveredRegion;
// //                 } else {
// //                     hoveredRegionIdRef.current = null;
// //                 }

// //                 map.setPaintProperty('chloropleth-hover-layer', 'line-color', [
// //                     'case',
// //                     ['==', ['get', 'region'], hoveredRegionIdRef.current],
// //                     '#FFCC00', // Highlight color on hover
// //                     'rgba(0, 0, 0, 0)', // Transparent when not hovered
// //                 ]);

// //                 filterFunction(hoveredRegionIdRef.current);
// //             } else {
// //                 hoveredRegionIdRef.current = null;
// //             }
// //         });

// //         return () => {
// //             map.off('mouseup', 'chloropleth-layer');
// //         };
// //     }, [map, feature, dataField]);

// //     return null;
// // };

// // export default Chloropleth;

// // function createRegionFeatures(
// //     regionCounts: Record<string, number>,
// //     regionsGeoJSON: any,
// // ) {
// //     return {
// //         type: 'FeatureCollection',
// //         features: regionsGeoJSON.features.map((region: any) => ({
// //             type: 'Feature',
// //             geometry: region.geometry,
// //             properties: {
// //                 region: region.properties.res_nm_reg,
// //                 count: regionCounts[region.properties.res_nm_reg] || 0,
// //             },
// //         })),
// //     };
// // }

// // function newRegionCount() {
// //     const regions = GraphTextService.getKeys(AlbumDataFields.COORDONNES_REGION);

// //     const newRegionCounts: Record<string, number> = {};
// //     regions?.forEach((region) => (newRegionCounts[region] = 0));

// //     return newRegionCounts;
// // }

// import { useEffect, useState, useRef, useMemo } from 'react';
// import quebec_regions from '@/geojson/quebec_regions.json';
// import { choroplethColors } from '@/constants/color-palet';
// import { AlbumDataFields } from '@/components/enums/data-types-enum';
// import { GraphTextService } from '@/services/translations';

// interface ChloroplethProps {
//     data: any[]; // GeoJSON data for regions
//     dataField: string; // Field in the GeoJSON properties to base the color on
//     map: any;
//     filterFunction: (region: any) => void;
// }

// const Chloropleth: React.FC<ChloroplethProps> = ({
//     data,
//     dataField,
//     map,
//     filterFunction,
// }) => {
//     const [feature, setFeature] = useState<any>(null);
//     const [chloroData, setChloroData] = useState<any>([]);
//     const hoveredRegionIdRef = useRef<string | null>(null); // Use ref for hovered region ID

//     useEffect(() => {
//         setChloroData(data);
//     }, [data]);

//     // Memoized function to create region features based on chloroData
//     const regionFeatures = useMemo(() => {
//         const newRegionCounts: Record<string, number> = newRegionCount();
//         chloroData.forEach((item: any) => {
//             newRegionCounts[item.region] = item.count;
//         });
//         return createRegionFeatures(newRegionCounts, quebec_regions);
//     }, [chloroData]);

//     useEffect(() => {
//         if (!map) return;

//         const handleMapLoad = () => {
//             setFeature(regionFeatures);
//         };

//         if (map.isStyleLoaded()) {
//             handleMapLoad();
//         } else {
//             map.on('load', handleMapLoad);
//         }

//         return () => {
//             if (map && handleMapLoad) {
//                 map.off('load', handleMapLoad);
//             }
//         };
//     }, [map, regionFeatures]);

//     useEffect(() => {
//         if (!map || !regionFeatures) return;
//         console.log(map.current);
//         console.log('hi');
//         const source = map.getSource('chloropleth-source');
//         console.log('hi');
//         // If the source already exists, just update the data
//         if (source) {
//             (source as any).setData(regionFeatures);
//         } else {
//             // If the source doesn't exist, create it and the necessary layers
//             map.addSource('chloropleth-source', {
//                 type: 'geojson',
//                 data: feature,
//             });

//             map.addLayer({
//                 id: 'chloropleth-layer',
//                 type: 'fill',
//                 source: 'chloropleth-source',
//                 paint: {
//                     'fill-color': [
//                         'interpolate',
//                         ['linear'],
//                         ['get', dataField],
//                         ...choroplethColors,
//                     ],
//                     'fill-opacity': 0.45,
//                 },
//             });

//             map.addLayer({
//                 id: 'chloropleth-outline-layer',
//                 type: 'line',
//                 source: 'chloropleth-source',
//                 paint: {
//                     'line-color': '#000',
//                     'line-width': 0.5,
//                 },
//             });

//             map.addLayer({
//                 id: 'chloropleth-hover-layer',
//                 type: 'line',
//                 source: 'chloropleth-source',
//                 paint: {
//                     'line-color': [
//                         'case',
//                         ['==', ['get', 'region'], hoveredRegionIdRef.current],
//                         '#FFCC00', // Highlight color on hover
//                         'rgba(0, 0, 0, 0)', // Transparent when not hovered
//                     ],
//                     'line-width': 2,
//                 },
//             });

//             // Add mouseup listener for hover effects and filtering
//             map.on('mouseup', 'chloropleth-layer', (e: any) => {
//                 if (e.features.length > 0) {
//                     const hoveredRegion = e.features[0].properties.region;

//                     // Update hovered region ID via ref
//                     hoveredRegionIdRef.current = hoveredRegion;

//                     map.setPaintProperty(
//                         'chloropleth-hover-layer',
//                         'line-color',
//                         [
//                             'case',
//                             [
//                                 '==',
//                                 ['get', 'region'],
//                                 hoveredRegionIdRef.current,
//                             ],
//                             '#FFCC00', // Highlight color on hover
//                             'rgba(0, 0, 0, 0)', // Transparent when not hovered
//                         ],
//                     );

//                     filterFunction(hoveredRegionIdRef.current);
//                 } else {
//                     hoveredRegionIdRef.current = null;
//                 }
//             });
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [map, regionFeatures, dataField]);

//     return null;
// };

// export default Chloropleth;

// function createRegionFeatures(
//     regionCounts: Record<string, number>,
//     regionsGeoJSON: any,
// ) {
//     return {
//         type: 'FeatureCollection',
//         features: regionsGeoJSON.features.map((region: any) => ({
//             type: 'Feature',
//             geometry: region.geometry,
//             properties: {
//                 region: region.properties.res_nm_reg,
//                 count: regionCounts[region.properties.res_nm_reg] || 0,
//             },
//         })),
//     };
// }

// function newRegionCount() {
//     const regions = GraphTextService.getKeys(AlbumDataFields.COORDONNES_REGION);

//     const newRegionCounts: Record<string, number> = {};
//     regions?.forEach((region) => (newRegionCounts[region] = 0));

//     return newRegionCounts;
// }

import { useEffect, useState, useRef, useMemo } from 'react';
import quebec_regions from '@/geojson/quebec_regions.json';
import { choroplethColors } from '@/constants/color-palet';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphTextService } from '@/services/translations';

interface ChloroplethProps {
    data: any[]; // GeoJSON data for regions
    dataField: string; // Field in the GeoJSON properties to base the color on
    map: any;
    filterFunction: (region: any) => void;
}

const Chloropleth: React.FC<ChloroplethProps> = ({
    data,
    dataField,
    map,
    filterFunction,
}) => {
    const hoveredRegionIdRef = useRef<string | null>(null); // Use ref for hovered region ID

    // Memoized function to create region features based on data
    const regionFeatures = useMemo(() => {
        const newRegionCounts: Record<string, number> = newRegionCount();

        data.forEach((item: any) => {
            newRegionCounts[item.region] = item.count;
        });
        console.log(newRegionCounts);
        return createRegionFeatures(newRegionCounts, quebec_regions);
    }, [data]);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            // If the source already exists, just update the data
            const source = map.getSource('chloropleth-source');
            if (source) {
                (source as any).setData(regionFeatures);
            } else {
                // If the source doesn't exist, create it and the necessary layers
                map.addSource('chloropleth-source', {
                    type: 'geojson',
                    data: regionFeatures,
                });

                map.addLayer({
                    id: 'chloropleth-layer',
                    type: 'fill',
                    source: 'chloropleth-source',
                    paint: {
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', dataField],
                            ...choroplethColors,
                        ],
                        'fill-opacity': 0.45,
                    },
                });

                map.addLayer({
                    id: 'chloropleth-outline-layer',
                    type: 'line',
                    source: 'chloropleth-source',
                    paint: {
                        'line-color': '#000',
                        'line-width': 0.5,
                    },
                });

                map.addLayer({
                    id: 'chloropleth-hover-layer',
                    type: 'line',
                    source: 'chloropleth-source',
                    paint: {
                        'line-color': [
                            'case',
                            [
                                '==',
                                ['get', 'region'],
                                hoveredRegionIdRef.current,
                            ],
                            '#FFCC00', // Highlight color on hover
                            'rgba(0, 0, 0, 0)', // Transparent when not hovered
                        ],
                        'line-width': 2,
                    },
                });

                // Add mouseup listener for hover effects and filtering
                map.on('mouseup', 'chloropleth-layer', (e: any) => {
                    if (e.features.length > 0) {
                        const hoveredRegion = e.features[0].properties.region;

                        if (hoveredRegion !== hoveredRegionIdRef.current) {
                            hoveredRegionIdRef.current = hoveredRegion;
                        } else {
                            hoveredRegionIdRef.current = null;
                        }

                        map.setPaintProperty(
                            'chloropleth-hover-layer',
                            'line-color',
                            [
                                'case',
                                [
                                    '==',
                                    ['get', 'region'],
                                    hoveredRegionIdRef.current,
                                ],
                                '#FFCC00', // Highlight color on hover
                                'rgba(0, 0, 0, 0)', // Transparent when not hovered
                            ],
                        );

                        filterFunction(hoveredRegionIdRef.current);
                    } else {
                        hoveredRegionIdRef.current = null;
                    }
                });
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            if (map && handleMapLoad) {
                map.off('load', handleMapLoad);
            }
        };
    }, [map, regionFeatures, dataField, filterFunction]);

    return null;
};

export default Chloropleth;

function createRegionFeatures(
    regionCounts: Record<string, number>,
    regionsGeoJSON: any,
) {
    return {
        type: 'FeatureCollection',
        features: regionsGeoJSON.features.map((region: any) => ({
            type: 'Feature',
            geometry: region.geometry,
            properties: {
                region: region.properties.res_nm_reg,
                count: regionCounts[region.properties.res_nm_reg] || 0,
            },
        })),
    };
}

function newRegionCount() {
    const regions = GraphTextService.getKeys(AlbumDataFields.COORDONNES_REGION);

    const newRegionCounts: Record<string, number> = {};
    regions?.forEach((region) => (newRegionCounts[region] = 0));

    return newRegionCounts;
}

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
    const [chloroData, setChloroData] = useState<any>([]);
    const hoveredRegionIdRef = useRef<string | null>(null); // Use ref for hovered region ID

    useEffect(() => {
        setChloroData(data);
    }, [data]);

    // Memoized function to create region features based on chloroData
    const regionFeatures = useMemo(() => {
        const newRegionCounts: Record<string, number> = newRegionCount();
        chloroData.forEach((item: any) => {
            newRegionCounts[item.region] = item.count;
        });
        return createRegionFeatures(newRegionCounts, quebec_regions);
    }, [chloroData]);

    useEffect(() => {
        if (!map || !regionFeatures) return;

        const source = map.getSource('chloropleth-source');

        // If the source already exists, just update the data
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
                        ['==', ['get', 'region'], hoveredRegionIdRef.current],
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
                    if (hoveredRegionIdRef.current !== hoveredRegion) {
                        hoveredRegionIdRef.current = hoveredRegion;
                    } else {
                        hoveredRegionIdRef.current = null;
                    }
                    // Update hovered region ID via ref

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
    }, [map, regionFeatures, dataField]);

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

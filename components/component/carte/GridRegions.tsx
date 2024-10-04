import { useEffect, useRef, useState } from 'react';
import qc_regions from '@/geojson/quebec_regions.json';
import useGlobalFilterStore from '@/stores/global-filter-store';

interface ChloroplethProps {
    map: any;
    mapGrid: boolean;
    filterFunction: (mrc_idu: number) => void;
}

const RegionGrid: React.FC<ChloroplethProps> = ({
    map,
    mapGrid,
    filterFunction,
}) => {
    const hoveredRegionIdRef = useRef<number[]>([]); // Array of highlighted region IDs
    const matchStage = useGlobalFilterStore((state) => state.matchStage);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!map || !loaded) return;
        const newFilters: number[] = [];
        const mrc_match = matchStage['REG_IDU'];
        if (mrc_match && mrc_match.$in) {
            mrc_match.$in.forEach((value: string) => {
                newFilters.push(parseInt(value, 10));
            });
        }

        hoveredRegionIdRef.current = newFilters;

        if (map) {
            map.setPaintProperty('region-outline', 'line-color', [
                'case',
                [
                    'in',
                    ['get', 'regio_s_id'],
                    ['literal', hoveredRegionIdRef.current],
                ],
                '#FFCC00', // Highlight color for selected regions
                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchStage, map]);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            if (mapGrid) {
                if (!map.getSource('gridRegion-source')) {
                    // Add GeoJSON source if it doesn't already exist
                    map.addSource('gridRegion-source', {
                        type: 'geojson',
                        data: qc_regions,
                    });

                    // Add layers for region outlines and fill
                    map.addLayer({
                        id: 'regions-outlines',
                        type: 'line',
                        source: 'gridRegion-source',
                        paint: {
                            'line-color': '#FFF',
                            'line-width': 0.5,
                        },
                    });

                    map.addLayer({
                        id: 'region-outline',
                        type: 'line',
                        source: 'gridRegion-source',
                        paint: {
                            'line-color': [
                                'case',
                                [
                                    'in',
                                    ['get', 'regio_s_id'],
                                    ['literal', hoveredRegionIdRef.current],
                                ],
                                '#FFCC00',
                                'rgba(0, 0, 0, 0)',
                            ],
                            'line-width': 3,
                        },
                    });

                    map.addLayer({
                        id: 'region-fill',
                        type: 'fill',
                        source: 'gridRegion-source',
                        paint: {
                            'fill-color': 'rgba(0, 0, 0, 0)', // Transparent fill
                        },
                    });

                    // Handle map clicks on the region-fill layer
                    map.on('click', 'region-fill', (e: any) => {
                        if (e.features.length > 0) {
                            const clickedRegionId =
                                e.features[0].properties.regio_s_id;

                            if (
                                hoveredRegionIdRef.current.includes(
                                    clickedRegionId,
                                )
                            ) {
                                hoveredRegionIdRef.current =
                                    hoveredRegionIdRef.current.filter(
                                        (id) => id !== clickedRegionId,
                                    );
                            } else {
                                hoveredRegionIdRef.current = [
                                    ...hoveredRegionIdRef.current,
                                    clickedRegionId,
                                ];
                            }

                            filterFunction(clickedRegionId ?? 0);
                        }
                    });
                    setLoaded(true);
                } else {
                    // If source exists, update data
                    const source = map.getSource('gridRegion-source') as any;
                    if (source) {
                        source.setData(qc_regions);
                    }
                    setLoaded(true);
                }
            }
            // Remove layers and sources if mapGrid is true (conditional rendering)
            // if (mapGrid && loaded) {
            //     if (map.getLayer('region-outline'))
            //         map.removeLayer('region-outline');
            //     if (map.getLayer('region-fill')) map.removeLayer('region-fill');
            //     if (map.getLayer('regions-outlines'))
            //         map.removeLayer('regions-outlines');
            //     if (map.getSource('gridRegion-source'))
            //         map.removeSource('gridRegion-source');
            //     setLoaded(false);
            // }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        // Cleanup function to remove layers and sources when component unmounts
        return () => {
            if (map && loaded) {
                if (map.getLayer('region-outline'))
                    map.removeLayer('region-outline');
                if (map.getLayer('region-fill')) map.removeLayer('region-fill');
                if (map.getLayer('regions-outlines'))
                    map.removeLayer('regions-outlines');
                if (map.getSource('gridRegion-source'))
                    map.removeSource('gridRegion-source');
                setLoaded(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, mapGrid]);

    return null;
};

export default RegionGrid;

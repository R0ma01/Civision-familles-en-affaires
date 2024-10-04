import { useEffect, useRef, useState } from 'react';
import qcMrcs from '@/geojson/qc_mrcs2.json';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { FlakesTexture } from 'three/examples/jsm/Addons.js';

interface ChloroplethProps {
    map: any;
    mapGrid: boolean;
    filterFunction: (mrc_idu: number) => void;
}

const MrcGrid: React.FC<ChloroplethProps> = ({
    map,
    mapGrid,
    filterFunction,
}) => {
    const hoveredRegionIdRef = useRef<number[]>([]); // Array of highlighted region IDs
    const matchStage = useGlobalFilterStore((state) => state.matchStage);
    const [loaded, setLoaded] = useState<boolean>(false);

    const updateRegionOutlines = () => {
        if (map && map.getLayer('mrc-outline')) {
            map.setPaintProperty('mrc-outline', 'line-color', [
                'case',
                [
                    'in',
                    ['get', 'DRIDU'],
                    ['literal', hoveredRegionIdRef.current],
                ],
                '#FFCC00', // Highlight color for selected regions
                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
            ]);
        }
    };

    // Effect to handle region filtering when `matchStage` changes
    useEffect(() => {
        if (!map || !loaded) return;
        const newFilters: number[] = [];
        const mrc_match = matchStage['MRC_IDU'];
        if (mrc_match?.['$in']) {
            mrc_match.$in.forEach((value: number) => newFilters.push(value));
        }

        hoveredRegionIdRef.current = newFilters;
        updateRegionOutlines();
    }, [matchStage, map]);

    // Effect to handle grid creation/removal based on `mapGrid`
    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            if (!mapGrid) {
                if (!map.getSource('gridMrc-source')) {
                    map.addSource('gridMrc-source', {
                        type: 'geojson',
                        data: qcMrcs,
                    });

                    map.addLayer({
                        id: 'mrc-outlines',
                        type: 'line',
                        source: 'gridMrc-source',
                        paint: {
                            'line-color': '#FFF',
                            'line-width': 0.5,
                        },
                    });

                    map.addLayer({
                        id: 'mrc-fill',
                        type: 'fill',
                        source: 'gridMrc-source',
                        paint: {
                            'fill-color': 'rgba(0, 0, 0, 0)',
                        },
                    });

                    map.addLayer({
                        id: 'mrc-outline',
                        type: 'line',
                        source: 'gridMrc-source',
                        paint: {
                            'line-color': [
                                'case',
                                [
                                    'in',
                                    ['get', 'DRIDU'],
                                    ['literal', hoveredRegionIdRef.current],
                                ],
                                '#FFCC00',
                                'rgba(0, 0, 0, 0)',
                            ],
                            'line-width': 3,
                        },
                    });

                    map.on('click', 'mrc-fill', (e: any) => {
                        if (e.features.length > 0) {
                            const clickedRegionId =
                                e.features[0].properties.DRIDU;

                            // Toggle clicked region in the hoveredRegionIdRef array
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
                                hoveredRegionIdRef.current.push(
                                    clickedRegionId,
                                );
                            }

                            updateRegionOutlines();
                            filterFunction(clickedRegionId ?? 0);
                        }
                    });
                }
                setLoaded(true);
            } else {
                // Remove layers/sources when `mapGrid` is false
                if (!mapGrid) {
                    ['mrc-outline', 'mrc-fill', 'mrc-outlines'].forEach(
                        (layer) => {
                            if (map.getLayer(layer)) map.removeLayer(layer);
                        },
                    );
                    if (map.getSource('gridMrc-source'))
                        map.removeSource('gridMrc-source');
                }
                setLoaded(true);
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            // Cleanup layers and sources when component is unmounted or dependencies change
            if (loaded && !mapGrid) {
                ['mrc-outline', 'mrc-fill', 'mrc-outlines'].forEach((layer) => {
                    if (map.getLayer(layer)) map.removeLayer(layer);
                });
                if (map.getSource('gridMrc-source'))
                    map.removeSource('gridMrc-source');
            }
            setLoaded(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, mapGrid]);

    return null;
};

export default MrcGrid;

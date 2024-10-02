import { useEffect, useRef } from 'react';
import qc_regions from '@/geojson/quebec_regions.json';

interface ChloroplethProps {
    map: any;
    filterFunction: (mrc_idu: number) => void;
}

const RegionGrid: React.FC<ChloroplethProps> = ({ map, filterFunction }) => {
    const hoveredRegionIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            // Check if the source already exists
            if (!map.getSource('gridRegions-source')) {
                // Add GeoJSON source
                map.addSource('gridRegions-source', {
                    type: 'geojson',
                    data: qc_regions,
                });

                // Add a line layer to show MRC outlines
                map.addLayer({
                    id: 'mrc-outlines',
                    type: 'line', // Use 'line' to display outlines
                    source: 'gridRegions-source',
                    paint: {
                        'line-color': '#FFF', // White outlines
                        'line-width': 0.5,
                    },
                });
                map.addLayer({
                    id: 'mrc-fill',
                    type: 'fill', // Use 'line' to display outlines
                    source: 'gridRegions-source',
                    paint: {
                        'fill-color': 'rgba(0, 0, 0, 0)', // White outlines
                    },
                });

                map.addLayer({
                    id: 'region-outline',
                    type: 'line',
                    source: 'gridRegions-source',

                    paint: {
                        'line-color': [
                            'case',
                            [
                                '==',
                                ['get', 'DRIDU'],
                                hoveredRegionIdRef.current,
                            ],
                            '#FFCC00', // Highlight color on hover
                            'rgba(0, 0, 0, 0)', // Transparent when not hovered
                        ],
                        'line-width': 3, // Width of the outline
                    },
                });

                // Add click event listener for mrc outlines
                map.on('click', 'mrc-fill', (e: any) => {
                    if (e.features.length > 0) {
                        const clickedRegionId =
                            e.features[0].properties.regio_s_id; // Ensure this matches your GeoJSON property

                        // Remove existing highlight if any
                        hoveredRegionIdRef.current = clickedRegionId;
                        map.setPaintProperty('region-outline', 'line-color', [
                            'case',
                            ['==', ['get', 'regio_s_id'], clickedRegionId],
                            '#FFCC00', // Highlight color on hover
                            'rgba(0, 0, 0, 0)', // Transparent when not hovered
                        ]);
                        filterFunction(hoveredRegionIdRef.current ?? 0);
                        // Create an outline layer for the clicked region
                        // Position this layer above the mrc-outlines layer
                    }
                });
            } else {
                // Update the existing source if it already exists
                (map.getSource('gridRegions-source') as any).setData(
                    qc_regions,
                );
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            map.off('load', handleMapLoad);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    return null;
};

export default RegionGrid;

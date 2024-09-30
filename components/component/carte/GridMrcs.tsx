import { useEffect, useRef } from 'react';
import geoJsonData from '@/geojson/quebec_regions_mrcs.json';

interface ChloroplethProps {
    map: any;
}

const MrcGrid: React.FC<ChloroplethProps> = ({ map }) => {
    const hoveredRegionIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            // Check if the source already exists
            if (!map.getSource('gridMrc-source')) {
                // Add GeoJSON source
                map.addSource('gridMrc-source', {
                    type: 'geojson',
                    data: geoJsonData,
                });

                // Add a line layer to show MRC outlines
                map.addLayer({
                    id: 'mrc-outlines',
                    type: 'line', // Use 'line' to display outlines
                    source: 'gridMrc-source',
                    paint: {
                        'line-color': '#FFF', // White outlines
                        'line-width': 0.5,
                    },
                });

                // Add click event listener for mrc outlines
                map.on('click', 'mrc-outlines', (e: any) => {
                    if (e.features.length > 0) {
                        const clickedRegionId = e.features[0].properties.region; // Ensure this matches your GeoJSON property

                        // Remove existing highlight if any
                        hoveredRegionIdRef.current = clickedRegionId;

                        // Create an outline layer for the clicked region
                        map.addLayer(
                            {
                                id: 'region-outline',
                                type: 'line',
                                source: 'gridMrc-source',
                                filter: [
                                    '==',
                                    ['get', 'region'],
                                    clickedRegionId,
                                ],
                                paint: {
                                    'line-color': '#FFCC00', // Highlight color
                                    'line-width': 3, // Width of the outline
                                },
                            },
                            'mrc-outlines',
                        ); // Position this layer above the mrc-outlines layer
                    }
                });
            } else {
                // Update the existing source if it already exists
                (map.getSource('gridMrc-source') as any).setData(geoJsonData);
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
    }, [map]);

    return null;
};

export default MrcGrid;

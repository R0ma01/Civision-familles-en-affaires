import { useEffect, useRef } from 'react';
import geoJsonData from '@/geojson/quebec_regions_mrcs.json';
//import qcMrcs from '@/geojson/qc_mrcs2.geojson';

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
                map.addLayer({
                    id: 'mrc-fill',
                    type: 'fill', // Use 'line' to display outlines
                    source: 'gridMrc-source',
                    paint: {
                        'fill-color': 'rgba(0, 0, 0, 0)', // White outlines
                    },
                });

                map.addLayer({
                    id: 'region-outline',
                    type: 'line',
                    source: 'gridMrc-source',

                    paint: {
                        'line-color': [
                            'case',
                            [
                                '==',
                                ['get', 'MRS_NM_MRC'],
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
                        console.log(e);
                        console.log(e.features);
                        const clickedRegionId =
                            e.features[0].properties.MRS_NM_MRC; // Ensure this matches your GeoJSON property
                        console.log(clickedRegionId);
                        // Remove existing highlight if any
                        hoveredRegionIdRef.current = clickedRegionId;
                        map.setPaintProperty('region-outline', 'line-color', [
                            'case',
                            [
                                '==',
                                ['get', 'MRS_NM_MRC'],
                                hoveredRegionIdRef.current,
                            ],
                            '#FFCC00', // Highlight color on hover
                            'rgba(0, 0, 0, 0)', // Transparent when not hovered
                        ]);

                        // Create an outline layer for the clicked region
                        // Position this layer above the mrc-outlines layer
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

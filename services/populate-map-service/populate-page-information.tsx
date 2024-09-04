import mapboxgl from 'mapbox-gl';
import { logoPalette, choroplethMapColors } from '@/constants/color-palet';
import quebec_regions from '@/geojson/quebec_regions.json';

export function populatePageInformation(
    mapRef: any,
    studyFilteredData: { count: number; region: string }[],
    createRegionFeatures: (
        regionCounts: Record<number, number>,
        regionsGeoJSON: any,
    ) => any,
    isDarkMode: boolean,
) {
    try {
        // Convert studyFilteredData into a format that can be matched with Quebec regions
        const regionCounts: Record<string, number> = {};
        studyFilteredData.forEach((item) => {
            regionCounts[item.region] = item.count;
        });

        // Create features based on the counts and region boundaries
        const regionFeatures = createRegionFeatures(
            regionCounts,
            quebec_regions,
        );

        mapRef.current.addSource('entreprises-regions', {
            type: 'geojson',
            data: regionFeatures,
        });

        // Add a choropleth layer to visualize the data
        mapRef.current.addLayer({
            id: 'region-choropleth',
            type: 'fill',
            source: 'entreprises-regions',
            paint: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'count'], // The property to base the color on
                    0,
                    choroplethMapColors.low, // Minimum value color
                    10,
                    choroplethMapColors.medium, // Middle value color
                    100,
                    choroplethMapColors.high, // Maximum value color
                ],
                'fill-opacity': 0.6,
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
    } catch (e: any) {
        console.error(e.message);
    }
}

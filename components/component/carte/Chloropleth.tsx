import { useEffect, useState } from 'react';
import useMapStore from '@/stores/global-map-store';
import quebec_regions from '@/geojson/quebec_regions.json';
import { choroplethColors } from '@/constants/color-palet';

interface ChloroplethProps {
    data: any[]; // GeoJSON data for regions
    dataField: string; // Field in the GeoJSON properties to base the color on
}

const Chloropleth: React.FC<ChloroplethProps> = ({ data, dataField }) => {
    const { map } = useMapStore((state: any) => ({
        map: state.map,
    }));

    const [feature, setFeature] = useState<any>(null);

    useEffect(() => {
        if (!map) return;

        const newRegionCounts: Record<string, number> = {};
        data.forEach((item: any) => {
            newRegionCounts[item.region] = item.count;
        });

        const newFeature = createRegionFeatures(
            newRegionCounts,
            quebec_regions,
        );
        setFeature(newFeature);
    }, [data, map]);

    useEffect(() => {
        console.log(map);
        if (!map || !feature) return;
        console.log('map' + map.getSource('choropleth-source'));
        // Check if source exists before removing
        if (map.getSource('choropleth-source') !== undefined) {
            if (map.getLayer('choropleth-layer')) {
                map.removeLayer('choropleth-layer');
            }
            if (map.getLayer('choropleth-outline-layer')) {
                map.removeLayer('choropleth-outline-layer');
            }
            map.removeSource('choropleth-source');
        }

        map.addSource('choropleth-source', {
            type: 'geojson',
            data: feature,
        });

        // Add the fill layer for the regions
        map.addLayer({
            id: 'choropleth-layer',
            type: 'fill',
            source: 'choropleth-source',
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

        // Add the outline layer for the regions
        map.addLayer({
            id: 'choropleth-outline-layer',
            type: 'line',
            source: 'choropleth-source',
            paint: {
                'line-color': '#000', // Black outline color
                'line-width': 0.5, // Width of the outline
            },
        });

        return () => {
            if (map.getSource('choropleth-source')) {
                if (map.getLayer('choropleth-layer')) {
                    map.removeLayer('choropleth-layer');
                }
                if (map.getLayer('choropleth-outline-layer')) {
                    map.removeLayer('choropleth-outline-layer');
                }
                map.removeSource('choropleth-source');
            }
        };
    }, [map, feature, dataField]);

    return null;
};

export default Chloropleth;

function createRegionFeatures(
    regionCounts: Record<string, number>,
    regionsGeoJSON: any,
) {
    const features: any[] = [];

    regionsGeoJSON.features.forEach((region: any) => {
        const regionName = region.properties.res_nm_reg;
        const count = regionCounts[regionName] || 0;

        features.push({
            type: 'Feature',
            geometry: region.geometry,
            properties: {
                region: regionName,
                count: count,
            },
        });
    });

    return {
        type: 'FeatureCollection',
        features: features,
    };
}

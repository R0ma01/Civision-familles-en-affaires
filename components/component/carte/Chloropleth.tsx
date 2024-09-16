import { useEffect, useState } from 'react';
import useMapStore from '@/stores/global-map-store';
import quebec_regions from '@/geojson/quebec_regions.json';
import { choroplethColors } from '@/constants/color-palet';
import { PossibleDataFileds } from '@/services/tableaux-taitement';
import { AlbumDataFields } from '@/components/enums/data-types-enum';

interface ChloroplethProps {
    data: any[]; // GeoJSON data for regions
    dataField: string; // Field in the GeoJSON properties to base the color on
    map: any;
}

const Chloropleth: React.FC<ChloroplethProps> = ({ data, dataField, map }) => {
    const [feature, setFeature] = useState<any>(null);
    const [chloroData, setchloroData] = useState<any>([]);

    useEffect(() => {
        setchloroData(data);
    }, [data]);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            const newRegionCounts: Record<string, number> = newRegionCount();
            chloroData.forEach((item: any) => {
                newRegionCounts[item.region] = item.count;
            });
            const newFeature = createRegionFeatures(
                newRegionCounts,
                quebec_regions,
            );
            setFeature(newFeature);
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
    }, [chloroData, map]);

    useEffect(() => {
        if (!map || !feature) return;

        const source = map.getSource('chloropleth-source');
        if (!source) {
            console.warn(
                "Source 'chloropleth-source' not found. Skipping update.",
            );
        } else {
            if (map.getLayer('chloropleth-layer')) {
                map.removeLayer('chloropleth-layer');
            }
            if (map.getLayer('chloropleth-outline-layer')) {
                map.removeLayer('chloropleth-outline-layer');
            }
            map.removeSource('chloropleth-source');
        }

        map.addSource('chloropleth-source', {
            type: 'geojson',
            data: feature,
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

function newRegionCount() {
    const regions = PossibleDataFileds.get(AlbumDataFields.COORDONNES_REGION);
    const newRegionCounts: Record<string, number> = {};
    regions?.forEach((region) => (newRegionCounts[region] = 0));

    return newRegionCounts;
}

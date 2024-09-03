import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGlobalDataStore from '@/stores/global-data-store';
import useMapStore from '@/stores/global-map-store';
import constants from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';
import { populateMapLayers } from '@/services/populate-map-service';

const MapBox = () => {
    const { mapType, setMap } = useMapStore((state) => {
        return { mapType: state.mapType, setMap: state.setMap };
    });
    const { point } = useMapStore();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const { studyFilteredData, repertoireFilteredData } = useGlobalDataStore(
        (state) => ({
            studyFilteredData: state.studyFilteredData,
            repertoireFilteredData: state.repertoireFilteredData,
        }),
    );

    const { filteredFournisseurData } = useGlobalFournisseursStore((state) => ({
        filteredFournisseurData: state.filteredFournisseurData,
    }));
    const [isDarkMode, setIsDarkMode] = useState(false);
    const hoveredStateId = useRef(null); // To keep track of the hovered region

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleDarkModeChange);

        return () =>
            darkModeQuery.removeEventListener('change', handleDarkModeChange);
    }, []);

    const { repertoireCompanyData, fetchRepertoireData, loading, error } =
        useGlobalDataStore((state) => ({
            repertoireCompanyData: state.repertoireCompanyData,
            fetchRepertoireData: state.fetchRepertoireData,
            loading: state.loading,
            error: state.error,
        }));

    useEffect(() => {
        async function fetchData() {
            await fetchRepertoireData();
        
        }
        if (mapType === MapType.REPERTOIRE && repertoireCompanyData.length === 0 && !loading) {
            fetchData();
        }
    }, [repertoireCompanyData, loading, mapType]);


    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: isDarkMode
                    ? 'mapbox://styles/mapbox/dark-v11'
                    : 'mapbox://styles/francisdomonte/clw9fq5b800j501nx042lhkwk/draft',
                center: [-76.06832627558094, 48.0],
                zoom: 5,
            });

            mapRef.current.on('load', () => {
                setMap(mapRef.current);
                populateMapLayers(
                    mapRef,
                    mapType,
                    filteredFournisseurData,
                    studyFilteredData,
                    isDarkMode,
                    hoveredStateId,
                    repertoireFilteredData,
                );
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkMode, mapType]);

    useEffect(() => {
        if (point && mapRef.current) {
            mapRef.current.flyTo({
                center: [
                    point.geometry.coordinates[0] + constants.offset,
                    point.geometry.coordinates[1],
                ],
                zoom: 12,
                speed: 0.9,
                essential: true,
            });

            new mapboxgl.Popup()
                .setLngLat(point.geometry.coordinates)
                .setHTML(
                    `
                    <strong>${point.properties.nom_entreprise}</strong><br>
                    Secteur d'activité: ${point.properties.secteur_activite}<br>
                    Taille de l'entreprise: ${point.properties.taille_entreprise}<br>
                    Année de fondation: ${point.properties.annee_fondation}<br>
                    Adresse: ${point.properties.adresse}
                `,
                )
                .addTo(mapRef.current);
        }
    }, [point]);

    useEffect(() => {
        if (mapRef.current) {
            const source = mapRef.current.getSource('compagnies');
            if (source) {
                source.setData(convertData(studyFilteredData));
            }
        }
    }, [studyFilteredData]);

    return <div id="map" ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapBox;

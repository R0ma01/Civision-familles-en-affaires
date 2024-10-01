import React, { useState, useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import {
    ZoomInSVG,
    ZoomOutSVG,
    LegendSVG,
} from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import useMapStore from '@/stores/global-map-store';
import { html_object_constants } from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

const MapMenu: React.FC = () => {
    const lang: Language = useDataStore((state) => state.lang);

    const { map, legend, toggleLegend } = useMapStore((state) => ({
        map: state.map,
        toggleLegend: state.toggleLegend,
        legend: state.legend,
    }));

    const zoomIn = () => {
        if (map) {
            map.zoomIn();
        }
    };

    const zoomOut = () => {
        if (map) {
            map.zoomOut();
        }
    };

    return (
        <>
            <div className="z-20 h-[300px] w-[200px] bg-white flex flex-col items-center gap-4">
                <Button
                    id={html_object_constants.zoom_in_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={zoomIn}
                    scaleOnHover={false}
                    className={`bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-md`}
                >
                    <ZoomInSVG />
                </Button>
                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={zoomOut}
                    scaleOnHover={false}
                    className={`bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-md`}
                >
                    <ZoomOutSVG />
                </Button>
                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={toggleLegend}
                    scaleOnHover={false}
                    className={`bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-md`}
                >
                    <LegendSVG />
                </Button>
            </div>
        </>
    );
};

export default MapMenu;

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

interface MapManuProps {
    className?: string;
}
const MapMenu: React.FC<MapManuProps> = ({ className }) => {
    const { map, toggleLegend, legend } = useMapStore((state) => ({
        map: state.map,
        legend: state.legend,
        toggleLegend: state.toggleLegend,
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
            <div
                className={`z-20 w-fit h-fit pt-4 pb-4 pl-2 pr-2 bg-white flex flex-col items-center gap-4 rounded-full ${className}`}
            >
                <Button
                    id={html_object_constants.zoom_in_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomIn();
                    }}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 hover:bg-custom-grey group`}
                >
                    <ZoomInSVG className="group-hover:fill-black" />
                </Button>
                <div className="h-[1px] w-7 bg-black"></div>
                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomOut();
                    }}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 group hover:bg-custom-grey`}
                >
                    <ZoomOutSVG className="group-hover:fill-black" />
                </Button>
                <div className="h-[1px] w-7 bg-black"></div>
                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLegend();
                    }}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 hover:bg-custom-grey group ${legend ? 'bg-logo-dark-blue' : ''}`}
                >
                    <LegendSVG className="group-hover:fill-black" />
                </Button>
            </div>
        </>
    );
};

export default MapMenu;

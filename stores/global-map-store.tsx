import { MapType } from '@/components/enums/map-type-enum';
import { create } from 'zustand';

interface GlobalMapStoreProps {
    map: any;
    setMap: (map: any) => void;
    mapType: MapType;
    setMapStyle: (type: MapType) => void;
    point: any;
    setMapPoint: (point: any) => void;
}

const useMapStore = create<GlobalMapStoreProps>((set) => ({
    // this state stores the map reference
    map: null,
    setMap: (map: any) => {
        set({ map });
    },
    mapType: MapType.PAGE_INFORMATION,
    setMapStyle: (type: MapType) => {
        set({ mapType: type });
    },
    point: null,
    setMapPoint: (point: any) => {
        set({ point });
    },
}));

export default useMapStore;

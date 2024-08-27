import { create } from 'zustand';

interface GlobalMapStoreProps {
    map: any;
    setMap: (map: any) => void;
    mapType: boolean;
    setMapStyle: (type: boolean) => void;
    point: any;
    setMapPoint: (point: any) => void;
}

const useMapStore = create<GlobalMapStoreProps>((set) => ({
    // this state stores the map reference
    map: null,
    setMap: (map: any) => {
        set({ map });
    },
    mapType: true,
    setMapStyle: (type: boolean) => {
        set({ mapType: type });
    },
    point: null,
    setMapPoint: (point: any) => {
        set({ point });
    },
}));

export default useMapStore;

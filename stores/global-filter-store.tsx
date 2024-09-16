import { create } from 'zustand';
import { produce } from 'immer';

import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { value_constants } from '@/constants/constants';

interface GlobalState {
    matchStage: Record<string, any>;
    setFilter: (
        filterName: AlbumDataFields | string,
        filterValue: string | number,
    ) => void;
    getFilter: (filterName: AlbumDataFields | string) => any;
}

const useGlobalFilterStore = create<GlobalState>((set, get) => ({
    matchStage: {},

    setFilter: (filterPath, newValue) => {
        const previousFilter: Record<string, any> = { ...get().matchStage };

        if (
            newValue === value_constants.all_values_string_filter ||
            newValue === value_constants.all_values_number_filter ||
            newValue === value_constants.all_values_else_filter
        ) {
            if (previousFilter[filterPath]) {
                delete previousFilter[filterPath];
            }
        } else {
            previousFilter[filterPath] = {
                $exists: true,
                $nin: [null, NaN],
                $in: [newValue],
            };
        }

        set({ matchStage: previousFilter });
    },

    getFilter(filterPath) {
        const filters = get().matchStage;
        return filters[filterPath]
            ? filters[filterPath]['$in'][0]
            : value_constants.all_values_string_filter;
    },
}));

export default useGlobalFilterStore;

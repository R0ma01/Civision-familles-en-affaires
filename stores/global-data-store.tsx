import { CompanyInfo } from '@/components/interface/company';
import {
    MapChloroplethePointData,
    MapClusterPointData,
} from '@/components/interface/point-data';

import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    // devtools(
    //     persist(
    (set, get) => ({
        studyData: [],
        repertoireData: [],

        studyDataFetched: false,
        repertoireDataFetched: false,

        fetchStudyData: async (filters: CompanyInfo) => {
            console.log('fetch study data');
            if ((get() as any).studyDataFetched) return;
            console.log('fetch stusdfrtgyhujikolmnbv cdxrftgyhuj');
            set({ loading: true, error: null });
            try {
                const responseStudy =
                    await GraphDataHttpRequestService.getAllStudyData(filters);

                set({
                    studyData: responseStudy,
                    loading: false,
                    studyDataFetched: true,
                });
            } catch (err: any) {
                set({ error: err.message, loading: false });
            }
        },

        fetchRepertoireData: async (filterData: CompanyInfo) => {
            if ((get() as any).repertoireDataFetched) return;
            set({ loading: true, error: null });
            try {
                const responseRepertoire =
                    await GraphDataHttpRequestService.getAllRepertoireData();
                console.log(responseRepertoire);
                set({
                    repertoireData: responseRepertoire,
                    loading: false,
                    repertoireDataFetched: true,
                });
            } catch (err: any) {
                set({ error: err.message, loading: false });
            }
        },

        filterStudyData: () => {
            if ((get() as any).studyDataFetched) {
                set({ studyDataFetched: false });
            }
        },

        filterRepertoireData: () => {
            if ((get() as any).repertoireDataFetched) {
                set({ repertoireDataFetched: false });
            }
        },
        loading: false,
        error: null,
    }),
    //         {
    //             name: 'global-data-store', // unique name for local storage
    //         },
    //     ),
    // ),
);

export default useGlobalDataStore;

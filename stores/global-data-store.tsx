import { CompanyInfo } from '@/components/interface/company';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { FournisseursHttpRequestService } from '@/services/fournisseur-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    devtools(
        persist(
            (set, get) => ({
                studyData: [],
                repertoireData: [],
                fournisseurData: [],

                studyDataFetched: false,
                repertoireDataFetched: false,
                fournisseurDataFetched: false,

                loading: false,
                error: false,

                fetchStudyData: async (filters: CompanyInfo) => {
                    console.log('fetch study data');
                    if ((get() as any).studyDataFetched) return;
                    console.log('fetch stusdfrtgyhujikolmnbv cdxrftgyhuj');
                    set({ loading: true, error: null });
                    try {
                        console.log('I am called');
                        console.log(filterData);
                        const responseStudy =
                            await GraphDataHttpRequestService.getAllStudyData(
                                filters,
                            );

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

                fetchFournisseurData: async () => {
                    if ((get() as any).fournisseurDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const responseFournisseur =
                            await FournisseursHttpRequestService.getAll();
                        console.log(responseFournisseur);
                        set({
                            fournisseurData: responseFournisseur,
                            loading: false,
                            fournisseurDataFetched: true,
                        });
                        console.log((get() as any).fournisseurData);
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

                filterFournisseurData: () => {
                    if ((get() as any).fournisseurDataFetched) {
                        set({ fournisseurDataFetched: false });
                    }
                },
            }),
            {
                name: 'global-data-store', // unique name for local storage
            },
        ),
    ),
);

export default useGlobalDataStore;

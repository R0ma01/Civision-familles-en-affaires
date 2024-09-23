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
                indexeData: [],
                repertoireData: [],
                fournisseurData: [],

                studyDataFetched: false,
                indexeDataFetched: false,
                repertoireDataFetched: false,
                fournisseurDataFetched: false,

                loading: false,
                error: false,

                fetchStudyData: async (filters: CompanyInfo) => {
                    console.log('fetch study data');
                    if ((get() as any).studyDataFetched) return;

                    set({ loading: true, error: null });
                    try {
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

                fetchRepertoireData: async (
                    matchStage: Record<string, any>,
                ) => {
                    if ((get() as any).repertoireDataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const responseRepertoire =
                            await GraphDataHttpRequestService.getAllRepertoireData(
                                matchStage,
                            );

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

                        set({
                            fournisseurData: responseFournisseur,
                            loading: false,
                            fournisseurDataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },

                fetchIndexeData: async (matchStage: Record<string, any>) => {
                    if ((get() as any).indexeData) return;
                    set({ loading: true, error: null });
                    try {
                        const responseIndexe =
                            await GraphDataHttpRequestService.getAllRepertoireData(
                                matchStage,
                            );

                        set({
                            indexeData: responseIndexe,
                            loading: false,
                            indexeDataFetched: true,
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

                filterFournisseurData: () => {
                    if ((get() as any).fournisseurDataFetched) {
                        set({ fournisseurDataFetched: false });
                    }
                },

                filterIndexeData: () => {
                    if ((get() as any).indexeDataFetched) {
                        set({ indexeDataFetched: false });
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

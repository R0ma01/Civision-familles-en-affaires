import { CompanyInfo } from '@/components/interface/company';
import { RepertoireData } from '@/components/interface/repertoire-data';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    devtools(
        persist(
            (set, get) => ({
                studyCompanyData: [],
                studyFilteredData: [],
                repertoireCompanyData: [],
                repertoireFilteredData: [],
                loading: false,
                error: null,
                dataFetched: false,

                fetchStudyData: async (filterData: CompanyInfo) => {
                    console.log('hello');
                    if ((get() as any).dataFetched) return;

                    set({ loading: true, error: null });
                    try {
                        console.log('I am called');
                        console.log(filterData);
                        const responseStudy =
                            await GraphDataHttpRequestService.getAllStudyData(
                                filterData,
                            );

                        set({
                            studyCompanyData: responseStudy,
                            studyFilteredData: responseStudy,
                            loading: false,
                            dataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
                    }
                },
                fetchRepertoireData: async () => {
                    if ((get() as any).dataFetched) return;

                    set({ loading: true, error: null });
                    try {
                        const responseRepertoire =
                            await GraphDataHttpRequestService.getAllRepertoireData();
                        set({
                            repertoireCompanyData: responseRepertoire,
                            repertoireFilteredData: responseRepertoire,
                            loading: false,
                            dataFetched: true,
                        });
                    } catch (err: any) {
                        set({ error: err.message, loading: false });
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

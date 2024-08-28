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
                setStudyFilteredData: (fData: CompanyInfo[]) =>
                    set({ studyFilteredData: fData }),
                setRepertoireFilteredData: (fData: RepertoireData[]) =>
                    set({ repertoirefilteredData: fData }),
                fetchData: async () => {
                    if ((get() as any).dataFetched) return;

                    set({ loading: true, error: null });
                    try {
                        const responseStudy =
                            await GraphDataHttpRequestService.getAllStudyData();

                        const responseRepertoire =
                            await GraphDataHttpRequestService.getAllRepertoireData();

                        set({
                            studyCompanyData: responseStudy,
                            studyFilteredData: responseStudy,
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

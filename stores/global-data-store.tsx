import { CompanyInfo } from '@/components/interface/company';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useGlobalDataStore = create(
    devtools(
        persist(
            (set, get) => ({
                companyData: [],
                filteredData: [],
                loading: false,
                error: null,
                dataFetched: false,
                setFilteredData: (fData: CompanyInfo[]) =>
                    set({ filteredData: fData }),
                fetchData: async () => {
                    if ((get() as any).dataFetched) return;
                    set({ loading: true, error: null });
                    try {
                        const response =
                            await GraphDataHttpRequestService.getAll();
                        set({
                            companyData: response,
                            filteredData: response,
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

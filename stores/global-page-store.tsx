import { create } from 'zustand';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import PageContent from '@/components/interface/page-content';

interface GlobalState {
    pagesData: PageContent[] | null;
    pageLoading: boolean;
    pageError: string | null;
    pageDataFetched: boolean;
    fetchPageData: () => Promise<void>;
    refreshPageData: () => Promise<void>;
}

const useGlobalPageStore = create<GlobalState>((set, get) => ({
    pagesData: null,
    pageLoading: false,
    pageError: null,
    pageDataFetched: false,
    fetchPageData: async () => {
        if (get().pageDataFetched) return; // Prevent redundant fetches

        set({ pageLoading: true, pageError: null });
        try {
            const response = await PageHttpRequestService.getAll();
            set({
                pagesData: response,
                pageLoading: false,
                pageDataFetched: true,
            });
        } catch (err: any) {
            set({ pageError: err.message, pageLoading: false });
        }
    },
    refreshPageData: async () => {
        try {
            const response = await PageHttpRequestService.getAll();
            set({
                pagesData: response,
                pageLoading: false,
                pageDataFetched: true,
            });
        } catch (err: any) {
            set({ pageError: err.message, pageLoading: false });
        }
    },
}));

export default useGlobalPageStore;

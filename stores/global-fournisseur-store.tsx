import { Fournisseur } from '@/components/interface/fournisseur';
import { FournisseursHttpRequestService } from '@/services/fournisseur-http-request-service';
import { create } from 'zustand';

interface GlobalFournisseursStoreProps {
    fournisseurData: Fournisseur[];
    filteredFournisseurData: Fournisseur[];
    loading: boolean;
    error: any;
    dataFetched: boolean;
    setUpdatedFournisseurData: (fData: Fournisseur[]) => void;
    fetchFournisseurData: () => void;
}

const useGlobalFournisseursStore = create<GlobalFournisseursStoreProps>(
    (set, get) => ({
        fournisseurData: [],
        filteredFournisseurData: [],
        loading: false,
        error: null,
        dataFetched: false,
        setUpdatedFournisseurData: (fData: Fournisseur[]) =>
            set({ filteredFournisseurData: fData }),
        fetchFournisseurData: async () => {
            if (get().dataFetched) return;
            set({ loading: true, error: null });
            try {
                const response = await FournisseursHttpRequestService.getAll();

                set({
                    fournisseurData: response,
                    filteredFournisseurData: response,
                    loading: false,
                    dataFetched: true,
                });
            } catch (err: any) {
                set({ error: err.message, loading: false });
            }
        },
    }),
);

export default useGlobalFournisseursStore;

import { create } from 'zustand';
import { produce } from 'immer';

import { CompanyInfo } from '@/components/interface/company';
import { MainDataFields } from '@/components/enums/data-types-enum';

interface GlobalState {
    filterData: CompanyInfo;
    setFilter: (filterName: MainDataFields | string, filterValue: any) => void;
    getFilter: (filterName: MainDataFields | string) => any;
}

const useGlobalFilterStore = create<GlobalState>((set, get) => ({
    filterData: {
        CAE_FAMILLE: 'toutes',
        CAE_NAME: 'toutes',
        CAE_SECTION: 'toutes',
        CAE_SUBSECTION: 'toutes',
        COD_ACT_ECON_CAE: 'toutes',
        CodeScian: 'toutes',
        Cree_ou_repris: null,
        DAT_STAT_IMMAT: 'toutes',
        J_aurai_le_temps_de_démarrer_une_nouvelle_entreprise: null,
        J_aurai_le_temps_de_faire_du_bénévolat_travailler_pour_une_œuvre_caritative:
            null,
        Je_continuerai_à_avoir_un_rôle_informel_auprès_des_entrepreneurs_qui_reprennent:
            null,
        Je_n_ai_pas_l_intention_de_suivre_l_évolution_de_mon_entreprise_après_sa_vente_transfert:
            null,
        NB_EMPLO: null,
        NEQ: 'toutes',
        QREP7r8: null,
        a_determiner: 'toutes',
        actionnaires: 'toutes',
        annee_fondation: null,
        autres_entreprises: 'toutes',
        continuite_familiale: 'toutes',
        coordonnees: {
            region: -1,
            latitude: -1,
            longitude: -1,
        },
        dirigeant: {
            sexe: 'toutes',
            age: 'toutes',
            generation: 'toutes',
        },
        exports: 'toutes',
        femmes_direction_: 'toutes',
        gestion_familiale: 'toutes',
        gouvernance: 'toutes',
        imports: 'toutes',
        nom_entreprise: 'toutes',
        questionnaires: 'toutes',
        repondant: {
            niveau_etude: -1,
        },
        revenus_rang: 'toutes',
        secteur_activite: 'toutes',
        succession: {
            plan: -1,
        },
        taille_entreprise: 'toutes',
    },

    setFilter: (filterPath, newValue) => {
        set((state) => {
            const updatedFilters = updateFilter(
                state.filterData,
                filterPath,
                newValue,
            );

            return { filterData: updatedFilters };
        });
    },

    getFilter(filterPath) {
        const filters = get().filterData;
        const result = retrieveFilter(filters, filterPath);

        return result;
    },
}));

function updateFilter(filters: CompanyInfo, filterPath: string, newValue: any) {
    return produce(filters, (draft) => {
        const keys = filterPath.split('.');
        let current = draft as any;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = newValue;
    });
}

function retrieveFilter(filters: CompanyInfo, filterPath: string) {
    const keys = filterPath.split('.');
    let current = filters as any;
    for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) return '';
        current = current[keys[i]];
    }
    return current;
}

export default useGlobalFilterStore;

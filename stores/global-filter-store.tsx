import { create } from 'zustand';

import * as filters from '@/components/enums/filter-enum';
import { CompanyInfo } from '@/components/interface/company';
import { MainDataFields } from '@/components/enums/data-types-enum';

interface GlobalState {
    filterData: CompanyInfo;
    setFilter: (filterName: any, filterValue: any) => void;
    getFilter: (filterName: MainDataFields) => any;
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

    setFilter: (filter: any, newValue: any) => {
        const currentFilters = get().filterData;

        const updatedFilters = updateFilter(currentFilters, filter, newValue);

        set({ filterData: updatedFilters });
    },

    getFilter(filterName) {
        const filters: any = get().filterData;
        const filterPathDecomp = filterName.split(' ');
        if (filterPathDecomp.length === 1) {
            return filters[filterPathDecomp[0]];
        } else if (filterPathDecomp.length === 2) {
            return filters[filterPathDecomp[0]][filterPathDecomp[1]];
        } else if (filterPathDecomp.length === 3) {
            return filters[filterPathDecomp[0]][filterPathDecomp[1]][
                filterPathDecomp[2]
            ];
        }
        return '';
    },
}));

function updateFilter(filters: any, filterPath: string, newValue: any) {
    const filterPathDecomp = filterPath.split(' ');
    if (filterPathDecomp.length === 1) {
        filters[filterPathDecomp[0]] = newValue;
    } else if (filterPathDecomp.length === 2) {
        filters[filterPathDecomp[0]][filterPathDecomp[1]] = newValue;
    } else if (filterPathDecomp.length === 3) {
        filters[filterPathDecomp[0]][filterPathDecomp[1]][filterPathDecomp[2]] =
            newValue;
    }
    return filters;
}

export default useGlobalFilterStore;

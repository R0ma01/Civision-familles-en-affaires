import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

export interface Fournisseur {
    contact: {
        nom: string;
        courriel: string;
        telephone: number;
        compagnie: string;
        titre: string;
        profil_linkedin: string;
    };
    secteurs_geographique: SecteursGeographiques[];
    services_offerts: ServiceOffert[];
}

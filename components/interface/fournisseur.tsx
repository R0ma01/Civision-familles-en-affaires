import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

export interface Fournisseur {
    _id: string;
    contact: {
        lastName: string;
        firstName: string;
        email: string;
        cellPhone: number;
        company: string;
        title: string;
        linkedin: string;
    };
    secteurs_geographique: SecteursGeographiques[];
    services_offerts: ServiceOffert[];
    visible: boolean;
}

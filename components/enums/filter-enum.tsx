export enum TailleEntrepriseFilters {
    TOUTES = 'toutes',
    PETITE = 'petite',
    MOYENNE = 'moyenne',
    GRANDE = 'grande',
    TRES_PETITE = 'très petite',
    TRES_GRANDE = 'très grande',
}

export enum AnneFondationFilters {
    TOUTES = 'toutes',
    AVANT_1900 = 'avant 1900',
    ENTRE_1900_1960 = '1900 à 1960',
    ENTRE_1960_1970 = '1961 à 1970',
    ENTRE_1971_1980 = '1971 à 1980',
    ENTRE_1982_1990 = '1981 à 1990',
    ENTRE_1991_2000 = '1991 à 2000',
    ENTRE_2001_2010 = '2001 à 2010',
    APRES_2010 = 'après 2010',
}

export enum RevenuFilters {
    TOUTES = 'toutes',
    MOINS_DEMI_MILLION = 'Moins de 500 000 $',
    ENTRE_DEMI_2_MILLIONS = '500 000 $ à 2 500 000 $',
    ENTRE_2_5_MILLIONS = '2 500 000 $ à 10 000 000 $',
    ENTRE_10_100_MILLIONS = '10 000 000 $ à 100 000 000 $',
    PLUS_100_MILLIONS = 'Plus de 100 000 000 $',
}

export enum SecteurActiviteFilters {
    TOUTES = 'toutes',
    MANUFACTURE = 'Manufacture, fabrication et exploitation',
    FINANCIER = 'Financier',
    HEBERGEMENT = 'Hébergement et hôtellerie',
    TECHNOLOGIES_INFORMATION = "Technologies de l'information et logiciels",
    SERVICES_AUTRES = 'Autres services',
    SANTE = 'Santé',
    ENVIRONNEMENT = 'Environnement',
    AUTRE = 'Autres',
    ELECTRONIQUE_COMMUNICATION = 'Électronique et communications',
    LOGEMENT = 'Logement',
    BIOTECHNOLOGIE = 'Biotechnologie',
    CONSTRUCTION = 'Construction',
    ENERGIE = 'Énergie',
    ALIMENTATION = 'Alimentation, agriculture et pêche',
    PHARMACEUTIQUE = 'Pharmaceutique',
    RESTAURATION = 'Restaurantation',
    SERVICES_PROFESSIONNELS = 'Services professionels',
    VENTE_DETAIL = 'Vente de détail',
    ENTREPOSAGE = 'Entreposage, transport et distribution',
}

export enum NombreGenerationsFilters {
    TOUTES = 'toutes',
    GENERATION_1 = '1ère génération',
    GENERATION_2 = '2ème génération',
    GENERATION_3 = '3ème génération',
    GENERATION_4_OU_PLUS = '4ème génération ou +',
}

export enum EntrepriseRegionFilters {
    TOUTES = 'toutes',
    BAS_ST_LAURENT = 'Bas-Saint-Laurent',
    SAGUENEY = 'Saguenay-Lac-Saint-Jean',
    CAPITALE_NATIONALE = 'Capitale-Nationale',
    MAURICIE = 'Mauricie',
    ESTRIE = 'Estrie',
    MONTREAL = 'Montreal',
    OUTAOUAIS = 'Outaouais',
    ABITIBI = 'Abibti-Témiscamingue',
    COTE_NORD = 'Côte-Nord',
    NORD_QUEBEC = 'Nord-du-Québec',
    GASPESIE_ILE_MADELEINE = 'Gaspésie-Îles-de-la-Madeleine',
    CHAUDIERE_APALACHE = 'Chaudière-Appalaches',
    LAVAL = 'Laval',
    LANAUDIERE = 'Lanaudière',
    LAURENTIDES = 'Laurentides',
    MONTEREGIE = 'Montérégie',
    CENTRE_QUEBEC = 'Centre-du-Québec',
}

export enum NombreActionnaireFilters {
    TOUTES = 'toutes',
    UN = '1',
    DEUX = '2',
    TROIS = '3',
    QUATRE = '4',
    CINQ_PLUS = '5+',
}

export enum PlanSuccessionFilters {
    TOUTES = 'toutes',
    INEXISTANT = 'plan inexistant',
    INFORMEL = 'plan informel',
    FORMEL = 'plan formel',
}

import { AlbumDataFields } from '@/components/enums/data-types-enum';

export const PossibleDataFileds = new Map<AlbumDataFields, any[]>([
    [
        AlbumDataFields.EXPORT_MARGINAL,
        [
            'afrique',
            'amerique centrale & sud',
            'amerique du nord',
            'asie',
            'europe',
            'oceanie',
            'non indique',
            'NaN',
        ],
    ],
    [
        AlbumDataFields.EXPORT_PRINCIPAL,
        [
            'afrique',
            'amerique centrale & sud',
            'amerique du nord',
            'asie',
            'europe',
            'oceanie',
        ],
    ],

    [
        AlbumDataFields.QUESTIONNAIRE_PARTICIPATION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_FORMATION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS, // IMPLEMENT FILTER FUNCTION
        [1, 2, 3, 4, 5, 6],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [AlbumDataFields.QUESTIONNAIRE_SUCCESION, ['1', '2', '3', '4', '5', '6']], // IMPLEMENT FILTER FUNCTION
    [
        AlbumDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_LIENS_SOCIAUX, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        AlbumDataFields.GOUVERNANCE_STRUCTURES,
        [
            'assemblee d’actionnaires',
            "conseil d'administration",
            'conseil de famille',
            'conseil aviseur (ou consultatif)',
            'autre',
            'aucune',
        ],
    ],
    [AlbumDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO, ['true', 'false']],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
        [
            'employe non membre de la famille en affaires',
            'entrepreneur externe a la famille',
            'membre de la famille qui travaille dans l’entreprise',
            'professionnel, expert externe a l’entreprise',
            'membre de la famille qui ne travaille pas dans l’entreprise',
            'autre',
        ],
    ],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES, // implement filter function
        [
            'Moins de 10%',
            '10 a 25%',
            '25 a 50%',
            '50 a 75%',
            'plus de 75%',
            'NaN',
        ],
    ],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
        [
            'approuver les orientations strategiques, le plan d’affaires et les budgets qui en decoulent, en assurant que la direction y donne suite',
            'approuver les reglements generaux',
            'assurer la mise en place d’un systeme integre de gestion des risques',
            'assurer que la gestion de l’entreprise est effectuee avec efficacite et efficience',
            'determiner la remuneration des hauts dirigeants et les criteres d’evaluation de leur performance',
            'faire un suivi du processus de releve',
            'surveiller l’integrite financiere : assurer la qualite de l’information financiere et des mecanismes de divulgation, approuver les etats financiers et attester de leur fiabilite, assurer l’efficacite du controle interne',
            'faire rapport aux actionnaires sur la performance de l’entreprise',
            'elire et pourvoir a la nomination du president et des membres du conseil, du president de l’entreprise ainsi que des autres hauts dirigeants, determiner leurs responsabilites et la portee de leur autorite',
            'autre',
        ],
    ],
    [
        AlbumDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        ['01', '02', '03', '04', '05', '06', '07', '08', '96'],
    ],
    [AlbumDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO, ['true', 'false']],
    [
        AlbumDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        [
            'dans la convention d’actionnaires',
            'document informel',
            'protocole ou charte',
            'autre',
            'politiques implicites',
            'politiques prevues au manuel de l’employe',
            'aucune',
        ],
    ],
    [
        AlbumDataFields.COORDONNES_REGION,
        [
            'Abitibi-Temiscamingue',
            'Bas-Saint-Laurent',
            'Saguenay–Lac-Saint-Jean',
            'Capitale-Nationale',
            'Mauricie',
            'Estrie',
            'Montreal',
            'Outaouais',
            'Cote-Nord',
            'Nord-du-Quebec',
            'Gaspesie–Îles-de-la-Madeleine',
            'Chaudiere-Appalaches',
            'Laval',
            'Lanaudiere',
            'Laurentides',
            'Monteregie',
            'Centre-du-Quebec',
        ],
    ],
    // [
    //     MainDataFields.COORDONNES_REGION,
    //     Array.from({ length: 17 }, (_, i) => i + 1),
    // ],
    [
        AlbumDataFields.SUCCESSION_PLAN,
        ['N/A', 'Plan inexistant', 'Plan informel', 'Plan formel'],
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        ['aucun', 'formel et explicite', 'informel'],
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        ['true', 'false'],
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        ['1ere', '2eme', '3eme', '4eme ou +'],
    ],
    [AlbumDataFields.DIRIGEANT_PRESIDE_CONSEIL, ['true', 'false']],
    [
        AlbumDataFields.DIRIGEANT_AGE,
        [
            '18 a 24 ans',
            '25 a 34 ans',
            '35 a 44 ans',
            '45 a 54 ans',
            '55 a 64 ans',
            '65 et +',
        ],
    ],
    [AlbumDataFields.DIRIGEANT_SEXE, ['femme', 'homme', 'NaN']],
    [
        AlbumDataFields.DIRIGEANT_GENERATION,
        [
            '1ere generation',
            '4eme generation ou +',
            '3eme generation',
            'membre non-familial',
            '2eme generation',
        ],
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE,
        ['true', 'false'],
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        ['01', '02', '03', '04', '05', '06', '07', '96'],
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES, // need to implement decluster function
        ['client', 'investisseur', 'fournisseur', 'autre'],
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
        [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '96',
        ],
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE,
        ['true', 'false'],
    ],
    [
        AlbumDataFields.EXPORT_MARCHES,
        [
            'afrique',
            'amerique centrale & sud',
            'amerique du nord',
            'asie',
            'europe',
            'oceanie',
            'non indique',
            'NaN',
        ],
    ],
    [
        AlbumDataFields.IMPORT_MARGINAL,
        [
            'amerique centrale & sud',
            'asie',
            'europe',
            'oceanie',
            'afrique',
            'amerique du nord',
        ],
    ],
    [
        AlbumDataFields.IMPORT_MARCHES,
        [
            'afrique',
            'amerique centrale & sud',
            'amerique du nord',
            'asie',
            'europe',
            'oceanie',
            'non indique',
            'NaN',
        ],
    ],
    [
        AlbumDataFields.EXPORT_POURCENTAGE,
        ['~70%', '~90%', 'non indique', '- de 10%', 'jamais', '~30%', '~50%'],
    ],

    // [
    //     MainDataFields.DIRIGEANT_NIVEAU_ETUDES,
    //     ['1', '2', '3', '4', '5', '6', '7', '8', 'NaN'],
    // ],
    [
        AlbumDataFields.SECTEUR_ACTIVITE,
        [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            'NaN',
        ],
    ],

    [AlbumDataFields.REVENUS_RANG, ['1', '2', '3', '4', '5', '9', 'NaN']],
    [AlbumDataFields.CONTINUITE_FAMILIALE, ['true', 'false', 'NaN']],
    [
        AlbumDataFields.IMPORT_POURCENTAGE,
        ['~30%', '- de 10%', 'jamais', '~50%', '~90%', '~70%', 'non indique'],
    ],
    [
        AlbumDataFields.IMPORT_PRINCIPAL,
        [
            'afrique',
            'amerique centrale & sud',
            'amerique du nord',
            'asie',
            'europe',
            'oceanie',
        ],
    ],
    [
        AlbumDataFields.FEMMES_DIRECTION_POURCENTAGE,
        ['25% a 49%', '10% a 24%', '50% a 75%', '- de 10%', '+ de 75%', 'NaN'],
    ],
    [
        // implement filter function
        AlbumDataFields.REPONDANT_ANNEE_NAISSANCE,
        [
            'avant 1960',
            '1961 a 1970',
            '1971 a 1980',
            '1981 a 1990',
            '1991 a 2000',
            '2001 a 2010',
            'apres 2010',
        ],
    ],
    [
        AlbumDataFields.REPONDANT_MEMBRE_FAMILLE,
        [
            '3eme generation',
            '2eme generation',
            '4eme generation ou +',
            'Pas membre de la famille',
            '1ere generation',
        ],
    ],

    [AlbumDataFields.REPONDANT_SEXE, ['homme', 'femme', 'NaN']],

    [
        AlbumDataFields.REPONDANT_NIVEAU_ETUDE,
        ['1', '2', '3', '4', '5', '6', '7', '8', 'NaN'],
        // [
        //     'Secondaire',
        //     "Certificat d'apprenti",
        //     "Certicat d'un college",
        //     'Certificat universitaire inferieur',
        //     'Baccalaureat',
        //     'etudes superieures',
        //     'Autre',
        // ],
    ],

    [
        AlbumDataFields.REPONDANT_NIVEAU_SANTE,
        ['excellente', 'tres bonne', 'assez bonne', 'pas tres bonne', 'bonne'],
    ],

    // [
    //     MainDataFields.REPONDANT_AGE,
    //     [
    //         '45 a 54 ans',
    //         '25 a 34 ans',
    //         '55 a 64 ans',
    //         '35 a 44 ans',
    //         '65 et +',
    //         '18 a 24 ans',
    //         NaN,
    //     ],
    // ],

    [
        AlbumDataFields.REPONDANT_POSTE,
        [
            "president du conseil d'administration",
            'employe',
            'equipe de direction',
            'autre',
            'dirigeant',
        ],
    ],

    [
        AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        [
            '0 a 9 ans',
            '10 a 19 ans',
            '20 a 29 ans',
            '30 a 39 ans',
            '40 ans ou plus',
            'NaN',
        ],
    ], // IMPLEMENT FILTER FUNCTION

    [
        AlbumDataFields.NOMBRE_EMPLOYE, // IMPLEMENT FILTER FUNCTION
        [
            '1 a 5',
            'aucun',
            'NaN',
            '11 a 25',
            'Aucun',
            '100 a 249',
            '500 a 749',
            'inconnu',
            'AUCUN',
            '750 a 999',
            '6 a 10',
            '26 a 49',
            '250 a 499',
            '50 a 99',
            '1000 a 2499',
            '2500 a 4999',
        ],
    ],
    [
        AlbumDataFields.ACTIONNAIRES_MAJORITAIRE,
        [
            '1ere generation',
            '2eme generation',
            '3eme generation',
            '4eme generation ou plus',
            'NaN',
        ],
    ],
    [AlbumDataFields.ACTIONNAIRES_NOMBRE, ['0', '1', '2', '3', '4', '5+']], // needs filter function
    [AlbumDataFields.ACTIONNAIRES_EXTERNE, ['true', 'false']],
    [
        AlbumDataFields.ACTIONNAIRES_TYPE, // needs decluster function
        [
            'employe',
            'fonds d’investissement',
            'ami proche de la famille',
            'banque',
            'autre',
            'investisseur',
            'personne physique externe a la famille',
            'autre entreprise',
            'ange investisseur',
            'membre de la famille qui ne travaille pas dans l’entreprise',
            'investisseur, personne physique externe a la famille',
            'investisseur de risque',
        ],
    ],
    [
        AlbumDataFields.TAILLE_ENTREPRISE,
        ['petite', 'moyenne', 'grande', 'tres petite', 'tres grande', 'NaN'],
    ],
    [AlbumDataFields.CREE_OU_REPRISE, ['2', '1']],
    [AlbumDataFields.BENEVOLAT, ['0', '1']],
    [AlbumDataFields.ROLE_INFORMEL, ['0', '1']],
    [AlbumDataFields.APRES_VENTE, ['0', '1']],
    [AlbumDataFields.TEMPS_NOUVELLE_ENTREPRISE, ['0', '1']],

    [
        AlbumDataFields.ANNEE_FONDATION,
        [
            'avant 1900',
            '1900 a 1960',
            '1961 a 1970',
            '1971 a 1980',
            '1981 a 1990',
            '1991 a 2000',
            '2001 a 2010',
            'apres 2010',
            'NaN',
        ],
    ],
]);

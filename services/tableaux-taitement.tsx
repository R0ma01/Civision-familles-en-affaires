import { MainDataFields } from '@/components/enums/data-types-enum';

const keyValuePairs: [MainDataFields, string[]][] = [
    [
        MainDataFields.ANNEE_FONDATION,
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
    [
        MainDataFields.REVENUS_RANG,
        ['1', '2', '3', '4', '5', '9'],
        // [
        //     'Moins de 500 000 $',
        //     '500 000 $ a 2 500 000 $',
        //     '2 500 000 $ a 10 000 000 $',
        //     '10 000 000 $ a 100 000 000 $',
        //     'Plus de 100 000 000 $',
        //     'NaN',
        // ],
    ],
    [
        MainDataFields.SECTEUR_ACTIVITE,
        ['1', '2', '3', '4', '5'],
        // [
        //     'Manufacture, fabrication et exploitation',
        //     'Financier',
        //     'Hebergement et hotellerie',
        //     "Technologies de l'information et logiciels",
        //     'Autres services',
        //     'Sante',
        //     'Environnement',
        //     'Autres',
        //     'electronique et communications',
        //     'Logement',
        //     'Biotechnologie',
        //     'Construction',
        //     'energie',
        //     'Alimentation, agriculture et pêche',
        //     'Pharmaceutique',
        //     'Restaurantation',
        //     'Services professionels',
        //     'Vente de detail',
        //     'Entreposage, transport et distribution',
        //     'NaN',
        // ],
    ],
    [
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        ['0% a 25%', '26% a 50%', '51% a 75%', '76% a 100%', 'NaN'],
    ],
    [
        MainDataFields.TAILLE_ENTREPRISE,
        ['petite', 'moyenne', 'grande', 'tres petite', 'tres grande', 'NaN'],
    ],
    [MainDataFields.CONTINUITE_FAMILIALE, ['Oui', 'Non']],
    // [
    //     MainDataFields.REPONDANT,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    // [
    //     MainDataFields.REPONDANT_AGE,
    //     [
    //         '24 ans et -',
    //         '25 a 34 ans',
    //         '35 a 44 ans',
    //         '45 a 54 ans',
    //         '55 a 64 ans',
    //         '65 ans et +',
    //         'NaN',
    //     ],
    // ],
    [MainDataFields.REPONDANT_SEXE, ['homme', 'femme', 'NaN']],
    [
        MainDataFields.REPONDANT_NIVEAU_ETUDE,
        [
            'Secondaire',
            "Certificat d'apprenti",
            "Certicat d'un college",
            'Certificat universitaire inferieur',
            'Baccalaureat',
            'etudes superieures',
            'Autre',
            '',
        ],
    ],
    [
        MainDataFields.REPONDANT_NIVEAU_SANTE,
        ['excellente', 'tres bonne', 'bonne', 'assez bonne', 'pas tres bonne'],
    ],
    [
        MainDataFields.REPONDANT_POSTE,
        ['equipe de direction', 'dirigeant', 'employe', 'pas de poste'],
    ],
    [
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        [
            '1ere generation',
            '2eme generation',
            '3eme generation',
            '4eme generation ou +',
            'Pas membre de la famille',
        ],
    ],
    [
        MainDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        [
            '0 a 9 ans',
            '10 a 19 ans',
            '20 a 29 ans',
            '30 a 39 ans',
            '40 ans ou plus',
        ],
    ],
    [
        MainDataFields.REPONDANT_ANNEE_NAISSANCE,
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
    // [
    //     MainDataFields.IMPORTS,
    //      [
    //         {name: 'jamais' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.IMPORT_POURCENTAGE,
        ['jamais', '- de 10%', '~30%', '~50%', '~70%', '~90%', 'non indique'],
    ],
    [
        MainDataFields.IMPORT_MARCHES,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    [
        MainDataFields.IMPORT_PRINCIPAL,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    [
        MainDataFields.IMPORT_MARGINAL,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    // [
    //     MainDataFields.EXPORTS,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.EXPORT_POURCENTAGE,
        ['jamais', '- de 10%', '~30%', '~50%', '~70%', '~90%', 'non indique'],
    ],
    [
        MainDataFields.EXPORT_MARCHES,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    [
        MainDataFields.EXPORT_PRINCIPAL,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    [
        MainDataFields.EXPORT_MARGINAL,
        ['asie', 'europe', 'amerique du nord', 'aucun marches'],
    ],
    // [
    //     MainDataFields.ACTIONNAIRES,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    // [
    //     MainDataFields.ACTIONNAIRES_MAJORITAIRE,
    //     [
    //          '1ere generation' ,
    //          '2eme generation' ,
    //          '3eme generation' ,
    //          '4eme generation ou plus' ,
    //          'NaN' ,
    //     ],
    // ],
    // [
    //     MainDataFields.ACTIONNAIRES_NOMBRE,
    //     [
    //          '0' ,
    //          '1' ,
    //          '2' ,
    //          '3' ,
    //          '4' ,
    //          '5+' ,
    //     ],
    // ],
    // [
    //     MainDataFields.ACTIONNAIRES_EXTERNE,
    //     [
    //          'Oui' ,
    //          'Non' ,
    //     ],
    // ],
    // [
    //     MainDataFields.ACTIONNAIRES_TYPE,
    //     [
    //          "pas d'actionnaire externe" ,
    //          'employe' ,
    //          'fonds d’investissement' ,
    //          'ami proche de la famille' ,
    //          'banque' ,
    //          'investisseur' ,
    //          'personne physique externe a la famille' ,
    //          'autre entreprise' ,
    //         {
    //             name: 'membre de la famille qui ne travaille pas dans l’entreprise',
    //             value: 0,
    //         },
    //     ],
    // ],
    // [
    //     MainDataFields.AUTRES_ENTREPRISES,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    // [
    //     MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE,
        ['Oui', 'Non'],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
        [
            'Manufacture, fabrication et exploitation',
            'Financier',
            'Hebergement et hotellerie',
            "Technologies de l'information et logiciels",
            'Autres services',
            'Sante',
            'Environnement',
            'Autres',
            'electronique et communications',
            'Logement',
            'Biotechnologie',
            'Construction',
            'energie',
            'Alimentation, agriculture et pêche',
            'Pharmaceutique',
            'Restaurantation',
            'Services professionels',
            'Vente de detail',
            'Entreposage, transport et distribution',
            'NaN',
        ],
    ],
    // [
    //     MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE,
        ['Oui', 'Non'],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        [
            'Grand-Pere/Grand-Mere',
            'Pere/Mere',
            'Oncle/Tante',
            'Cousin(e)',
            'Frere/Soeur',
            'Fils/Fille',
            'Autre',
            'NaN',
        ],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES,
        ['Client', 'Fournisseur', 'Investisseur', 'NaN'],
    ],
    // [
    //     MainDataFields.DIRIGEANT_NIVEAU_ETUDES,
    //     [
    //         'Secondaire',
    //         "Certificat d'apprenti",
    //         "Certicat d'un college",
    //         'Certificat universitaire inferieur',
    //         'Baccalaureat',
    //         'etudes superieures',
    //         'Autre',
    //     ],
    // ],
    // [
    //     MainDataFields.DIRIGEANT,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.DIRIGEANT_GENERATION,
        [
            '1ere generation',
            '2eme generation',
            '3eme generation',
            '4eme generation ou +',
            'NaN',
        ],
    ],
    [MainDataFields.DIRIGEANT_SEXE, ['Homme', 'Femme', 'NaN']],
    [
        MainDataFields.DIRIGEANT_AGE,
        [
            '24 et -',
            '25 a 34 ans',
            '35 a 44 ans',
            '45 a 54 ans',
            '55 a 64 ans',
            '65 et +',
        ],
    ],
    [MainDataFields.DIRIGEANT_PRESIDE_CONSEIL, ['Oui', 'Non', 'NaN']],
    // [
    //     MainDataFields.GOUVERNANCE,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_STRUCTURES,
    //     [
    //          "assemblee d'actionnaires" ,
    //          "conseil d'administration" ,
    //          'aucune' ,
    //          'conseil de famille' ,
    //          'conseil aviseur (ou consultatif)' ,
    //          'NaN' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO,
    //     [
    //          'Oui' ,
    //          'Non' ,
    //          'NaN' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
    //     [
    //          'autre' ,
    //          'employe non membre de la famille en affaires' ,
    //          'autre entreprise' ,
    //         {
    //             name: 'membre de la famille qui ne travaille pas dans l’entreprise',
    //             value: 0,
    //         },
    //         {
    //             name: 'membre de la famille qui travaille dans l’entreprise',
    //             value: 0,
    //         },
    //          'professionnel, expert externe a l’entreprise' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES,
    //     [
    //          'Moins de 10%' ,
    //          '10 a 25%' ,
    //          '25 a 50%' ,
    //          '50 a 75%' ,
    //          'plus de 75%' ,
    //          'NaN' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
    //     [
    //         {
    //             name: 'approuver les orientations strategiques, le plan d’affaires et les budgets qui en decoulent, en assurant que la direction y donne suite',
    //             value: 0,
    //         },
    //          'approuver les reglements generaux' ,
    //         {
    //             name: "s'assurer que la gestion de l’entreprise est effectuee avec efficacite et efficience",
    //             value: 0,
    //         },
    //         {
    //             name: "determiner la remuneration des hauts dirigeants et les criteres d'evaluation de leur performance",
    //             value: 0,
    //         },
    //         {
    //             name: "faire rapport aux actionnaires sur la performance de l'entreprise",
    //             value: 0,
    //         },
    //         {
    //             name: "surveiller l'integrite financiere : assurer la qualite de l'information financiere et des mecanismes de divulgation, approuver les etats financiers et attester de leur fiabilite, assurer l'efficacite du controle interne",
    //             value: 0,
    //         },
    //         {
    //             name: "elire et pourvoir a la nomination du president et des membres du conseil, du president de l'entreprise ainsi que des autres hauts dirigeants, determiner leurs responsabilites et la portee de leur autorite",
    //             value: 0,
    //         },
    //         {
    //             name: "elire et pourvoir a la nomination du president et des membres du conseil, du president de l'entreprise ainsi que des autres hauts dirigeants, determiner leurs responsabilites et la portee de leur autorite",
    //             value: 0,
    //         },
    //          'autre' ,
    //     ],
    // ],

    [
        MainDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        ['1ere', '2eme', '3eme', '4eme ou +', 'NaN'],
    ],
    [
        MainDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        ['aucun', 'informel', 'formel et explicite', 'NaN'],
    ],
    [
        MainDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        [
            'aucune',
            "dans la convention d'actionnaires",
            'politiques implicites',
            'document informel',
            "politiques prevues au manuel de l'employe",
            'autre',
        ],
    ],

    // [
    //     MainDataFields.SUCCESION,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [
        MainDataFields.SUCCESSION_PLAN,
        ['Plan informel', 'Plan formel', 'Plan inexistant', 'N/A'],
    ],
    [MainDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO, ['Oui', 'Non', 'NaN']],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        [
            'Comptable',
            'Fiscaliste',
            'Coach',
            'Mentor',
            "Professionel en releve d'entreprises",
            'Avocat',
            'Analyste financier',
            'Notaire',
            'Autre',
        ],
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_LIENS_SOCIAUX,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_SUCCESION,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_FORMATION_ENV,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_PARTICIPATION_ENV,
        ['0', '1', '2', '3', '4', '5', '6'],
    ],

    [
        MainDataFields.COORDONNES_REGION,
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
];

export const TableauxTraitementMap = new Map<string, string[]>(keyValuePairs);

export const PossibleDataFileds = new Map<MainDataFields, any[]>([
    [
        MainDataFields.EXPORT_MARGINAL,
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
        MainDataFields.EXPORT_PRINCIPAL,
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
        MainDataFields.QUESTIONNAIRE_PARTICIPATION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_FORMATION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [MainDataFields.QUESTIONNAIRE_SUCCESION, ['1', '2', '3', '4', '5', '6']], // IMPLEMENT FILTER FUNCTION
    [
        MainDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.QUESTIONNAIRE_LIENS_SOCIAUX, // IMPLEMENT FILTER FUNCTION
        ['1', '2', '3', '4', '5', '6'],
    ],
    [
        MainDataFields.GOUVERNANCE_STRUCTURES,
        [
            'assemblee d’actionnaires',
            "conseil d'administration",
            'conseil de famille',
            'conseil aviseur (ou consultatif)',
            'autre',
            'aucune',
        ],
    ],
    [MainDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO, ['true', 'false']],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
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
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES, // implement filter function
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
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
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
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        ['01', '02', '03', '04', '05', '06', '07', '08', '96'],
    ],
    [MainDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO, ['true', 'false']],
    [
        MainDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
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
        MainDataFields.COORDONNES_REGION,
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
        MainDataFields.SUCCESSION_PLAN,
        ['N/A', 'Plan inexistant', 'Plan informel', 'Plan formel'],
    ],
    [
        MainDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        ['aucun', 'formel et explicite', 'informel'],
    ],
    [MainDataFields.GESTION_FAMILIALE_MULTIPLES_FAMILLES, ['true', 'false']],
    [
        MainDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        ['1ere', '2eme', '3eme', '4eme ou +'],
    ],
    [MainDataFields.DIRIGEANT_PRESIDE_CONSEIL, ['true', 'false']],
    [
        MainDataFields.DIRIGEANT_AGE,
        [
            '18 a 24 ans',
            '25 a 34 ans',
            '35 a 44 ans',
            '45 a 54 ans',
            '55 a 64 ans',
            '65 et +',
        ],
    ],
    [MainDataFields.DIRIGEANT_SEXE, ['femme', 'homme', 'NaN']],
    [
        MainDataFields.DIRIGEANT_GENERATION,
        [
            '1ere generation',
            '4eme generation ou +',
            '3eme generation',
            'membre non-familial',
            '2eme generation',
        ],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE,
        ['true', 'false'],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        ['01', '02', '03', '04', '05', '06', '07', '96'],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES, // need to implement decluster function
        ['client', 'investisseur', 'fournisseur', 'autre'],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
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
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE,
        ['true', 'false'],
    ],
    [
        MainDataFields.EXPORT_MARCHES,
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
        MainDataFields.IMPORT_MARGINAL,
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
        MainDataFields.IMPORT_MARCHES,
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
        MainDataFields.EXPORT_POURCENTAGE,
        ['~70%', '~90%', 'non indique', '- de 10%', 'jamais', '~30%', '~50%'],
    ],

    // [
    //     MainDataFields.DIRIGEANT_NIVEAU_ETUDES,
    //     ['1', '2', '3', '4', '5', '6', '7', '8', 'NaN'],
    // ],
    [
        MainDataFields.SECTEUR_ACTIVITE,
        [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
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
            'NaN',
        ],
    ],

    [MainDataFields.REVENUS_RANG, ['1', '2', '3', '4', '5', '9', 'NaN']],
    [MainDataFields.CONTINUITE_FAMILIALE, ['true', 'false', 'NaN']],
    [
        MainDataFields.IMPORT_POURCENTAGE,
        ['~30%', '- de 10%', 'jamais', '~50%', '~90%', '~70%', 'non indique'],
    ],
    [
        MainDataFields.IMPORT_PRINCIPAL,
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
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        ['25% a 49%', '10% a 24%', '50% a 75%', '- de 10%', '+ de 75%', 'NaN'],
    ],
    [
        // implement filter function
        MainDataFields.REPONDANT_ANNEE_NAISSANCE,
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
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        [
            '3eme generation',
            '2eme generation',
            '4eme generation ou +',
            'Pas membre de la famille',
            '1ere generation',
        ],
    ],

    [MainDataFields.REPONDANT_SEXE, ['homme', 'femme', 'NaN']],

    [
        MainDataFields.REPONDANT_NIVEAU_ETUDE,
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
        MainDataFields.REPONDANT_NIVEAU_SANTE,
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
        MainDataFields.REPONDANT_POSTE,
        [
            "president du conseil d'administration",
            'employe',
            'equipe de direction',
            'autre',
            'dirigeant',
        ],
    ],

    [
        MainDataFields.REPONDANT_ANNEE_TRAVAILLEES,
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
        MainDataFields.NOMBRE_EMPLOYE, // IMPLEMENT FILTER FUNCTION
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
        MainDataFields.ACTIONNAIRES_MAJORITAIRE,
        [
            '1ere generation',
            '2eme generation',
            '3eme generation',
            '4eme generation ou plus',
            'NaN',
        ],
    ],
    [MainDataFields.ACTIONNAIRES_NOMBRE, ['0', '1', '2', '3', '4', '5+']], // needs filter function
    [MainDataFields.ACTIONNAIRES_EXTERNE, ['true', 'false']],
    [
        MainDataFields.ACTIONNAIRES_TYPE, // needs decluster function
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
        MainDataFields.TAILLE_ENTREPRISE,
        ['petite', 'moyenne', 'grande', 'tres petite', 'tres grande', 'NaN'],
    ],
    [MainDataFields.CREE_OU_REPRISE, ['0', '1']],
    [MainDataFields.BENEVOLAT, ['0', '1']],
    [MainDataFields.ROLE_INFORMEL, ['0', '1']],
    [MainDataFields.APRES_VENTE, ['0', '1']],
    [MainDataFields.TEMPS_NOUVELLE_ENTREPRISE, ['0', '1']],

    [
        MainDataFields.ANNEE_FONDATION,
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

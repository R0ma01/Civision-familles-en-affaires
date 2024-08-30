import { MainDataFields } from '@/components/enums/data-types-enum';

const keyValuePairs: [MainDataFields, string[]][] = [
    [
        MainDataFields.ANNEE_FONDATION,
        [
            'avant 1900',
            '1900 à 1960',
            '1961 à 1970',
            '1971 à 1980',
            '1981 à 1990',
            '1991 à 2000',
            '2001 à 2010',
            'après 2010',
            'Pas de réponse',
        ],
    ],
    [
        MainDataFields.REVENUS_RANG,
        ['1', '2', '3', '4', '5', '9'],
        // [
        //     'Moins de 500 000 $',
        //     '500 000 $ à 2 500 000 $',
        //     '2 500 000 $ à 10 000 000 $',
        //     '10 000 000 $ à 100 000 000 $',
        //     'Plus de 100 000 000 $',
        //     'Pas de réponse',
        // ],
    ],
    [
        MainDataFields.SECTEUR_ACTIVITE,
        ['1', '2', '3', '4', '5'],
        // [
        //     'Manufacture, fabrication et exploitation',
        //     'Financier',
        //     'Hébergement et hôtellerie',
        //     "Technologies de l'information et logiciels",
        //     'Autres services',
        //     'Santé',
        //     'Environnement',
        //     'Autres',
        //     'Électronique et communications',
        //     'Logement',
        //     'Biotechnologie',
        //     'Construction',
        //     'Énergie',
        //     'Alimentation, agriculture et pêche',
        //     'Pharmaceutique',
        //     'Restaurantation',
        //     'Services professionels',
        //     'Vente de détail',
        //     'Entreposage, transport et distribution',
        //     'Pas de réponse',
        // ],
    ],
    [
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        ['0% à 25%', '26% à 50%', '51% à 75%', '76% à 100%', 'Pas de réponse'],
    ],
    [
        MainDataFields.TAILLE_ENTREPRISE,
        [
            'petite',
            'moyenne',
            'grande',
            'très petite',
            'très grande',
            'Pas de réponse',
        ],
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
    [
        MainDataFields.REPONDANT_AGE,
        [
            '24 ans et -',
            '25 à 34 ans',
            '35 à 44 ans',
            '45 à 54 ans',
            '55 à 64 ans',
            '65 ans et +',
            'Pas de réponse',
        ],
    ],
    [MainDataFields.REPONDANT_SEXE, ['homme', 'femme', 'Pas de réponse']],
    [
        MainDataFields.REPONDANT_NIVEAU_ETUDE,
        [
            'Secondaire',
            "Certificat d'apprenti",
            "Certicat d'un collège",
            'Certificat universitaire inférieur',
            'Baccalauréat',
            'Études supérieures',
            'Autre',
        ],
    ],
    [
        MainDataFields.REPONDANT_NIVEAU_SANTE,
        ['excellente', 'très bonne', 'bonne', 'assez bonne', 'pas très bonne'],
    ],
    [
        MainDataFields.REPONDANT_POSTE,
        ['équipe de direction', 'dirigeant', 'employé', 'pas de poste'],
    ],
    [
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        [
            '1ère génération',
            '2ème génération',
            '3ème génération',
            '4ème génération ou +',
            'Pas membre de la famille',
        ],
    ],
    [
        MainDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        [
            '0 à 9 ans',
            '10 à 19 ans',
            '20 à 29 ans',
            '30 à 39 ans',
            '40 ans ou plus',
        ],
    ],
    [
        MainDataFields.REPONDANT_ANNEE_NAISSANCE,
        [
            'avant 1960',
            '1961 à 1970',
            '1971 à 1980',
            '1981 à 1990',
            '1991 à 2000',
            '2001 à 2010',
            'après 2010',
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
        ['jamais', '- de 10%', '~30%', '~50%', '~70%', '~90%', 'non indiqué'],
    ],
    [
        MainDataFields.IMPORT_MARCHES,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
    ],
    [
        MainDataFields.IMPORT_PRINCIPAL,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
    ],
    [
        MainDataFields.IMPORT_MARGINAL,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
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
        ['jamais', '- de 10%', '~30%', '~50%', '~70%', '~90%', 'non indiqué'],
    ],
    [
        MainDataFields.EXPORT_MARCHES,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
    ],
    [
        MainDataFields.EXPORT_PRINCIPAL,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
    ],
    [
        MainDataFields.EXPORT_MARGINAL,
        ['asie', 'europe', 'amérique du nord', 'aucun marchés'],
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
    //          '1ère génération' ,
    //          '2ème génération' ,
    //          '3ème génération' ,
    //          '4ème génération ou plus' ,
    //          'Pas de réponse' ,
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
    //          'employé' ,
    //          'fonds d’investissement' ,
    //          'ami proche de la famille' ,
    //          'banque' ,
    //          'investisseur' ,
    //          'personne physique externe à la famille' ,
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
            'Hébergement et hôtellerie',
            "Technologies de l'information et logiciels",
            'Autres services',
            'Santé',
            'Environnement',
            'Autres',
            'Électronique et communications',
            'Logement',
            'Biotechnologie',
            'Construction',
            'Énergie',
            'Alimentation, agriculture et pêche',
            'Pharmaceutique',
            'Restaurantation',
            'Services professionels',
            'Vente de détail',
            'Entreposage, transport et distribution',
            'Pas de réponse',
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
            'Grand-Père/Grand-Mère',
            'Père/Mère',
            'Oncle/Tante',
            'Cousin(e)',
            'Frère/Soeur',
            'Fils/Fille',
            'Autre',
            'Pas de réponse',
        ],
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES,
        ['Client', 'Fournisseur', 'Investisseur', 'Pas de réponse'],
    ],
    // [
    //     MainDataFields.DIRIGEANT_NIVEAU_ETUDES,
    //     [
    //         'Secondaire',
    //         "Certificat d'apprenti",
    //         "Certicat d'un collège",
    //         'Certificat universitaire inférieur',
    //         'Baccalauréat',
    //         'Études supérieures',
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
            '1ère génération',
            '2ème génération',
            '3ème génération',
            '4ème génération ou +',
            'Pas de réponse',
        ],
    ],
    [MainDataFields.DIRIGEANT_SEXE, ['Homme', 'Femme', 'Pas de réponse']],
    [
        MainDataFields.DIRIGEANT_AGE,
        [
            '24 et -',
            '25 à 34 ans',
            '35 à 44 ans',
            '45 à 54 ans',
            '55 à 64 ans',
            '65 et +',
        ],
    ],
    [
        MainDataFields.DIRIGEANT_PRESIDE_CONSEIL,
        ['Oui', 'Non', 'Pas de réponse'],
    ],
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
    //          "assemblée d'actionnaires" ,
    //          "conseil d'administration" ,
    //          'aucune' ,
    //          'conseil de famille' ,
    //          'conseil aviseur (ou consultatif)' ,
    //          'pas de réponse' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO,
    //     [
    //          'Oui' ,
    //          'Non' ,
    //          'Pas de Réponse' ,
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
    //          'employé non membre de la famille en affaires' ,
    //          'autre entreprise' ,
    //         {
    //             name: 'membre de la famille qui ne travaille pas dans l’entreprise',
    //             value: 0,
    //         },
    //         {
    //             name: 'membre de la famille qui travaille dans l’entreprise',
    //             value: 0,
    //         },
    //          'professionnel, expert externe à l’entreprise' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES,
    //     [
    //          'Moins de 10%' ,
    //          '10 à 25%' ,
    //          '25 à 50%' ,
    //          '50 à 75%' ,
    //          'plus de 75%' ,
    //          'Pas de réponse' ,
    //     ],
    // ],
    // [
    //     MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
    //     [
    //         {
    //             name: 'approuver les orientations stratégiques, le plan d’affaires et les budgets qui en découlent, en assurant que la direction y donne suite',
    //             value: 0,
    //         },
    //          'approuver les règlements généraux' ,
    //         {
    //             name: "s'assurer que la gestion de l’entreprise est effectuée avec efficacité et efficience",
    //             value: 0,
    //         },
    //         {
    //             name: "déterminer la rémunération des hauts dirigeants et les critères d'évaluation de leur performance",
    //             value: 0,
    //         },
    //         {
    //             name: "faire rapport aux actionnaires sur la performance de l'entreprise",
    //             value: 0,
    //         },
    //         {
    //             name: "surveiller l'intégrité financière : assurer la qualité de l'information financière et des mécanismes de divulgation, approuver les états financiers et attester de leur fiabilité, assurer l'efficacité du contrôle interne",
    //             value: 0,
    //         },
    //         {
    //             name: "élire et pourvoir à la nomination du président et des membres du conseil, du président de l'entreprise ainsi que des autres hauts dirigeants, déterminer leurs responsabilités et la portée de leur autorité",
    //             value: 0,
    //         },
    //         {
    //             name: "élire et pourvoir à la nomination du président et des membres du conseil, du président de l'entreprise ainsi que des autres hauts dirigeants, déterminer leurs responsabilités et la portée de leur autorité",
    //             value: 0,
    //         },
    //          'autre' ,
    //     ],
    // ],
    [MainDataFields.GESTION_FAMILIALE, ['Oui', 'Non', 'Pas de réponse']],
    [
        MainDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        ['1ère', '2ème', '3ème', '4ème ou +', 'Pas de réponse'],
    ],
    [
        MainDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        ['aucun', 'informel', 'formel et explicite', 'Pas de réponse'],
    ],
    [
        MainDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        [
            'aucune',
            "dans la convention d'actionnaires",
            'politiques implicites',
            'document informel',
            "politiques prévues au manuel de l'employé",
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
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO,
        ['Oui', 'Non', 'Pas de réponse'],
    ],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        [
            'Comptable',
            'Fiscaliste',
            'Coach',
            'Mentor',
            "Professionel en relève d'entreprises",
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
            'Abitibi-Témiscamingue',
            'Bas-Saint-Laurent',
            'Saguenay–Lac-Saint-Jean',
            'Capitale-Nationale',
            'Mauricie',
            'Estrie',
            'Montreal',
            'Outaouais',
            'Côte-Nord',
            'Nord-du-Québec',
            'Gaspésie–Îles-de-la-Madeleine',
            'Chaudière-Appalaches',
            'Laval',
            'Lanaudière',
            'Laurentides',
            'Montérégie',
            'Centre-du-Québec',
        ],
    ],
];

export const TableauxTraitementMap = new Map<string, string[]>(keyValuePairs);

export const PossibleDataFileds = new Map<MainDataFields, any[]>([
    [
        MainDataFields.EXPORT_MARGINAL,
        [
            'afrique',
            'amérique centrale & sud',
            'amérique du nord',
            'asie',
            'europe',
            'océanie',
            'non indiqué',
            'NaN',
        ],
    ],
    [
        MainDataFields.EXPORT_PRINCIPAL,
        [
            'afrique',
            'amérique centrale & sud',
            'amérique du nord',
            'asie',
            'europe',
            'océanie',
        ],
    ],
    [
        MainDataFields.QUESTIONNAIRE_PARTICIPATION_ENV, // IMPLEMENT FILTER FUNCTION
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
            'assemblée d’actionnaires',
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
            'employé non membre de la famille en affaires',
            'entrepreneur externe à la famille',
            'membre de la famille qui travaille dans l’entreprise',
            'professionnel, expert externe à l’entreprise',
            'membre de la famille qui ne travaille pas dans l’entreprise',
            'autre',
        ],
    ],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES, // implement filter function
        Array.from({ length: 100 }, (_, i) => i + 1),
    ],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
        [
            'approuver les orientations stratégiques, le plan d’affaires et les budgets qui en découlent, en assurant que la direction y donne suite',
            'approuver les règlements généraux',
            'assurer la mise en place d’un système intégré de gestion des risques',
            'assurer que la gestion de l’entreprise est effectuée avec efficacité et efficience',
            'déterminer la rémunération des hauts dirigeants et les critères d’évaluation de leur performance',
            'faire un suivi du processus de relève',
            'surveiller l’intégrité financière : assurer la qualité de l’information financière et des mécanismes de divulgation, approuver les états financiers et attester de leur fiabilité, assurer l’efficacité du contrôle interne',
            'faire rapport aux actionnaires sur la performance de l’entreprise',
            'élire et pourvoir à la nomination du président et des membres du conseil, du président de l’entreprise ainsi que des autres hauts dirigeants, déterminer leurs responsabilités et la portée de leur autorité',
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
            'politiques prévues au manuel de l’employé',
            'aucune',
        ],
    ],
    [
        MainDataFields.COORDONNES_REGION,
        [
            'Abitibi-Témiscamingue',
            'Bas-Saint-Laurent',
            'Saguenay–Lac-Saint-Jean',
            'Capitale-Nationale',
            'Mauricie',
            'Estrie',
            'Montreal',
            'Outaouais',
            'Côte-Nord',
            'Nord-du-Québec',
            'Gaspésie–Îles-de-la-Madeleine',
            'Chaudière-Appalaches',
            'Laval',
            'Lanaudière',
            'Laurentides',
            'Montérégie',
            'Centre-du-Québec',
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
        ['1ère', '2ème', '3ème', '4ème ou +'],
    ],
    [MainDataFields.DIRIGEANT_PRESIDE_CONSEIL, ['true', 'false']],
    [
        MainDataFields.DIRIGEANT_AGE,
        [
            '18 à 24 ans',
            '25 à 34 ans',
            '35 à 44 ans',
            '45 à 54 ans',
            '55 à 64 ans',
            '65 et +',
        ],
    ],
    [MainDataFields.DIRIGEANT_SEXE, ['femme', 'homme', 'NaN']],
    [
        MainDataFields.DIRIGEANT_GENERATION,
        [
            '1ère génération',
            '4ème génération ou +',
            '3ème génération',
            'membre non-familial',
            '2ème génération',
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
            'amérique centrale & sud',
            'amérique du nord',
            'asie',
            'europe',
            'océanie',
            'non indiqué',
            'NaN',
        ],
    ],
    [
        MainDataFields.IMPORT_MARGINAL,
        [
            'amérique centrale & sud',
            'asie',
            'europe',
            'océanie',
            'afrique',
            'amérique du nord',
        ],
    ],
    [
        MainDataFields.IMPORT_MARCHES,
        [
            'afrique',
            'amérique centrale & sud',
            'amérique du nord',
            'asie',
            'europe',
            'océanie',
            'non indiqué',
            'NaN',
        ],
    ],
    [
        MainDataFields.EXPORT_POURCENTAGE,
        ['~70%', '~90%', 'non indiqué', '- de 10%', 'jamais', '~30%', '~50%'],
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
        ['~30%', '- de 10%', 'jamais', '~50%', '~90%', '~70%', 'non indiqué'],
    ],
    [
        MainDataFields.IMPORT_PRINCIPAL,
        [
            'afrique',
            'amérique centrale & sud',
            'amérique du nord',
            'asie',
            'europe',
            'océanie',
        ],
    ],
    [
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        ['25% à 49%', '10% à 24%', '50% à 75%', '- de 10%', '+ de 75%', 'NaN'],
    ],
    [MainDataFields.REPONDANT_ANNEE_NAISSANCE, ['1', '2', '3']], // Implement the filter function
    [
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        [
            '3ème génération',
            '2ème génération',
            '4ème génération ou +',
            'Pas membre de la famille',
            '1ère génération',
        ],
    ],

    [MainDataFields.REPONDANT_SEXE, ['homme', 'femme', 'NaN']],

    [
        MainDataFields.REPONDANT_NIVEAU_ETUDE,
        ['1', '2', '3', '4', '5', '6', '7', '8', 'NaN', 'null'],
        // [
        //     'Secondaire',
        //     "Certificat d'apprenti",
        //     "Certicat d'un collège",
        //     'Certificat universitaire inférieur',
        //     'Baccalauréat',
        //     'Études supérieures',
        //     'Autre',
        // ],
    ],

    [
        MainDataFields.REPONDANT_NIVEAU_SANTE,
        ['excellente', 'très bonne', 'assez bonne', 'pas très bonne', 'bonne'],
    ],

    [
        MainDataFields.REPONDANT_AGE,
        [
            '45 à 54 ans',
            '25 à 34 ans',
            '55 à 64 ans',
            '35 à 44 ans',
            '65 et +',
            '18 à 24 ans',
            NaN,
        ],
    ],

    [
        MainDataFields.REPONDANT_POSTE,
        [
            "président du conseil d'administration",
            'employé',
            'équipe de direction',
            'autre',
            'dirigeant',
        ],
    ],

    [MainDataFields.REPONDANT_ANNEE_TRAVAILLEES, ['1', '2', '3']], // IMPLEMENT FILTER FUNCTION

    [
        MainDataFields.NOMBRE_EMPLOYE, // IMPLEMENT FILTER FUNCTION
        [
            '1 à 5',
            'aucun',
            'NaN',
            '11 à 25',
            'Aucun',
            '100 à 249',
            '500 à 749',
            'inconnu',
            'AUCUN',
            '750 à 999',
            '6 à 10',
            '26 à 49',
            '250 à 499',
            '50 à 99',
            '1000 à 2499',
            '2500 à 4999',
        ],
    ],
    [
        MainDataFields.ACTIONNAIRES_MAJORITAIRE,
        [
            '1ère génération',
            '2ème génération',
            '3ème génération',
            '4ème génération ou plus',
            'Pas de réponse',
        ],
    ],
    [MainDataFields.ACTIONNAIRES_NOMBRE, ['0', '1', '2', '3', '4', '5+']], // needs filter function
    [MainDataFields.ACTIONNAIRES_EXTERNE, ['true', 'false']],
    [
        MainDataFields.ACTIONNAIRES_TYPE, // needs decluster function
        [
            'employé',
            'fonds d’investissement',
            'ami proche de la famille',
            'banque',
            'autre',
            'investisseur',
            'personne physique externe à la famille',
            'autre entreprise',
            'ange investisseur',
            'membre de la famille qui ne travaille pas dans l’entreprise',
            'investisseur, personne physique externe à la famille',
            'investisseur de risque',
        ],
    ],
    [
        MainDataFields.TAILLE_ENTREPRISE,
        ['petite', 'moyenne', 'grande', 'très petite', 'très grande', 'NaN'],
    ],
]);

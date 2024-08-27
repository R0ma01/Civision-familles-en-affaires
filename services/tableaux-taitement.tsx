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
        [
            'Moins de 500 000 $',
            '500 000 $ à 2 500 000 $',
            '2 500 000 $ à 10 000 000 $',
            '10 000 000 $ à 100 000 000 $',
            'Plus de 100 000 000 $',
            'Pas de réponse',
        ],
    ],
    [
        MainDataFields.SECTEUR_ACTIVITE,
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
    [
        MainDataFields.DIRIGEANT_NIVEAU_ETUDES,
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

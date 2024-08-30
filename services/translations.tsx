import { MainDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';

const keyValuePairs: [string, string][] = [
    [MainDataFields.ANNEE_FONDATION, 'Année de Fondation'],
    [MainDataFields.REVENUS_RANG, 'Rang de Revenu'],
    [MainDataFields.SECTEUR_ACTIVITE, "Secteur d'Activité"],
    [
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        'Pourcentage de Femmes à la direction',
    ],
    [MainDataFields.TAILLE_ENTREPRISE, "Taille de l'Entreprise"],
    [MainDataFields.CONTINUITE_FAMILIALE, 'Continuité Familiale'],

    [MainDataFields.REPONDANT_AGE, 'Age du Pépondant'],
    [MainDataFields.REPONDANT_SEXE, 'Sexe du Répondant'],
    [MainDataFields.REPONDANT_NIVEAU_ETUDE, "Niveau d'Étude du Répondant"],
    [MainDataFields.REPONDANT_NIVEAU_SANTE, 'Niveau de Santé du Répondant'],
    [MainDataFields.REPONDANT_POSTE, 'Poste du Répondant'],
    [
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        'Position du Répondant par rapport à la Famille',
    ],
    [
        MainDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        "Années Travaillées au Sein de l'Entreprise par le Répondant",
    ],
    [
        MainDataFields.REPONDANT_ANNEE_NAISSANCE,
        'Année de Naissance du Répondant',
    ],

    [MainDataFields.IMPORT_POURCENTAGE, "Pourcentage d'Imports"],
    [MainDataFields.IMPORT_MARCHES, "Marches d'Import"],
    [MainDataFields.IMPORT_PRINCIPAL, 'Import Princial'],
    [MainDataFields.IMPORT_MARGINAL, 'Import Marginal'],

    [MainDataFields.EXPORT_POURCENTAGE, "Pourcentage d'Export"],
    [MainDataFields.EXPORT_MARCHES, "Marches d'Export"],
    [MainDataFields.EXPORT_PRINCIPAL, 'Export Principal'],
    [MainDataFields.EXPORT_MARGINAL, 'Export Marginal'],

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
        'Autres Entreprises Familiales Possédées',
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
        'Secteurs des autres Entreprises Familiales Possédées',
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
        "Autres Entreprises Familiales Possédées par d'autres Membres",
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        "Relation Génétiques avec les autres Propriétaires d'Entreprises dans la Famille",
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES,
        "Relation D'Affaires avec les autres Propriétaires d'Entreprises dans la Famille",
    ],
    // [MainDataFields.DIRIGEANT_NIVEAU_ETUDES, "Niveau d'Études du Dirigeant"],
    // [
    //     MainDataFields.DIRIGEANT,
    //      [
    //         {name: 'test 1' ,
    //         {name: 'test 2' ,
    //         {name: 'test 3' ,
    //         {name: 'test 4' ,
    //      ],
    // ],
    [MainDataFields.DIRIGEANT_GENERATION, 'Génération Familiale du Dirigeant'],
    [MainDataFields.DIRIGEANT_SEXE, 'Sexe du Dirigeant'],
    [MainDataFields.DIRIGEANT_AGE, 'Age du Dirigeant'],
    [
        MainDataFields.DIRIGEANT_PRESIDE_CONSEIL,
        'Conseil présidé par le Dirigeant',
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
    [MainDataFields.GESTION_FAMILIALE, 'Gestion Familiale'],
    [
        MainDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        'Générations Impliquées dans la Gestion Familiale',
    ],
    [
        MainDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        'Protocole Familial Établi',
    ],
    [
        MainDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        'Politiques Familiales Établies',
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
    [MainDataFields.SUCCESSION_PLAN, 'Plan de Succession'],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO,
        'Accompagnement Professionnel pour la Succession',
    ],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        "Type d'Accompagnement pour la Succession",
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE,
        "Questionnaire sur le Contrôle d'Influence",
    ],
    [
        MainDataFields.QUESTIONNAIRE_LIENS_SOCIAUX,
        'Questionnaire sur les Liens Sociaux',
    ],
    [
        MainDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE,
        "Questionnaire sur l'Identification d'Influence",
    ],
    [
        MainDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS,
        'Questionnaire sur les Aspects Émotionnels',
    ],
    [MainDataFields.QUESTIONNAIRE_SUCCESION, 'Questionnaire sur la Succession'],
    [
        MainDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT,
        'Questionnaire sur la Consicence Environnementale lors du Recrutement',
    ],
    [
        MainDataFields.QUESTIONNAIRE_FORMATION_ENV,
        'Questionnaire sur la Formation Environnementale',
    ],
    [
        MainDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV,
        'Questionnaire sur le Développement Environnementale',
    ],
    [
        MainDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV,
        'Questionnaire sur la Redistribution Environnementale',
    ],
    [
        MainDataFields.QUESTIONNAIRE_PARTICIPATION_ENV,
        'Questionnaire sur la Participation Environnementale',
    ],

    [MainDataFields.COORDONNES_REGION, 'Régions'],
    [GraphBoxType.DOUGHNUT, 'En Beignet'],
    [GraphBoxType.DOUBLE_HORIZONTAL_BARCHART, 'Barres (y(x))'],
    [GraphBoxType.STACKED_BARCHART, 'Barres Empliées (y(x))'],
    [GraphBoxType.VERTICAL_BARCHART, 'Barres Horizontales'],
    [GraphBoxType.HORIZONTAL_BARCHART, 'Barres Verticales'],
];

export const TableauxTraductions = new Map<string, string>(keyValuePairs);

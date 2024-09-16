export enum AlbumDataFields {
    ANNEE_FONDATION = 'annee_fondation',
    REVENUS_RANG = 'revenus_rang',
    SECTEUR_ACTIVITE = 'secteur_activite',
    FEMMES_DIRECTION_POURCENTAGE = 'femmes_direction_%',
    TAILLE_ENTREPRISE = 'taille_entreprise',
    CONTINUITE_FAMILIALE = 'continuite_familiale',
    REPONDANT_SEXE = 'repondant.sexe',
    REPONDANT_NIVEAU_ETUDE = 'repondant.niveau_etude',
    REPONDANT_NIVEAU_SANTE = 'repondant.niveau_sante',
    REPONDANT_POSTE = 'repondant.poste',
    REPONDANT_MEMBRE_FAMILLE = 'repondant.membre_famille',
    REPONDANT_ANNEE_TRAVAILLEES = 'repondant.annees_travaillees',
    REPONDANT_ANNEE_NAISSANCE = 'repondant.annee_naissance',
    IMPORT_POURCENTAGE = 'imports.pourcentage',
    IMPORT_MARCHES = 'imports.marches',
    IMPORT_PRINCIPAL = 'imports.principal',
    IMPORT_MARGINAL = 'imports.marginal',
    EXPORT_POURCENTAGE = 'exports.pourcentage',
    EXPORT_MARCHES = 'exports.marches',
    EXPORT_PRINCIPAL = 'exports.principal',
    EXPORT_MARGINAL = 'exports.marginal',
    ACTIONNAIRES_MAJORITAIRE = 'actionnaires.majoritaire',
    ACTIONNAIRES_NOMBRE = 'actionnaires.nombre',
    ACTIONNAIRES_EXTERNE = 'actionnaires.externe',
    ACTIONNAIRES_TYPE = 'actionnaires.type',
    AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE = 'autres_entreprises.famille_proprietaire.possede',
    AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS = 'autres_entreprises.famille_proprietaire.secteurs',
    AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE = 'autres_entreprises.autres_membres_famille.possede',
    AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE = 'autres_entreprises.autres_membres_famille.liens_parente',
    AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES = 'autres_entreprises.autres_membres_famille.relations_affaires',
    DIRIGEANT_GENERATION = 'dirigeant.generation',
    DIRIGEANT_SEXE = 'dirigeant.sexe',
    DIRIGEANT_AGE = 'dirigeant.age',
    DIRIGEANT_PRESIDE_CONSEIL = 'dirigeant.preside_conseil',
    GOUVERNANCE_STRUCTURES = 'gouvernance.structures',
    GOUVERNANCE_ACCOMPAGNEMENT_PRO = 'gouvernance.accompagnement_pro',
    GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION = 'gouvernance.conseil_consultatif.composition',
    GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES = 'gouvernance.conseil_consultatif.%_femmes',
    GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES = 'gouvernance.conseil_consultatif.principales_activites',
    GESTION_FAMILIALE_MULTIPLES_FAMILLES = 'gestion_familiale.multiples_familles',
    GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES = 'gestion_familiale.generations_impliquees',
    GESTION_FAMILIALE_PROTOCOLE_FAMILIAL = 'gestion_familiale.protocole_familial',
    GESTION_FAMILIALE_POLITIQUES_FAMILIALES = 'gestion_familiale.politiques_familiales',
    COORDONNES_REGION = 'coordonnees.region',
    SUCCESSION_PLAN = 'succession.plan',
    SUCCESSION_ACCOMPAGNEMENT_PRO = 'succession.accompagnement_pro',
    SUCCESSION_ACCOMPAGNEMENT_TYPE = 'succession.accompagnement_type',
    QUESTIONNAIRE_CONTROLE_INFLUENCE = 'questionnaires.q46_controle_influence',
    QUESTIONNAIRE_LIENS_SOCIAUX = 'questionnaires.q48_liens_sociaux',
    QUESTIONNAIRE_IDENTIFICATION_INFLUENCE = 'questionnaires.q47_identification_appartenance',
    QUESTIONNAIRE_ASPECTS_EMOTIONNELS = 'questionnaires.q49_aspects_emotionnels',
    QUESTIONNAIRE_SUCCESION = 'questionnaires.q50_succession',
    QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT = 'questionnaires.q51_conscience_environnementale_en_recrutement',
    QUESTIONNAIRE_FORMATION_ENV = 'questionnaires.q52_formation_environnementale',
    QUESTIONNAIRE_DEVELOPPEMENT_ENV = 'questionnaires.q53_gestion_developpement_environnemental',
    QUESTIONNAIRE_REDISTRIBUTION_ENV = 'questionnaires.q54_retributions_environnementales_recompenses',
    QUESTIONNAIRE_PARTICIPATION_ENV = 'questionnaires.q55_participation_environnementale',
    CREE_OU_REPRISE = 'Cree_ou_repris',
    TEMPS_NOUVELLE_ENTREPRISE = 'J_aurai_le_temps_de_demarrer_une_nouvelle_entreprise',
    BENEVOLAT = 'J_aurai_le_temps_de_faire_du_benevolat/travailler_pour_une_œuvre_caritative',
    SOIN_PERSONEL_FAMILIAL = 'SOINS PERSONEL FAMILIAL',
    ROLE_INFORMEL = 'Je_continuerai_a_avoir_un_role_informel_aupres_des_entrepreneurs_qui_reprennent',
    APRES_VENTE = 'Je_n_ai_pas_l_intention_de_suivre_l_evolution_de_mon_entreprise_apres_sa_vente/transfert',
    NOMBRE_EMPLOYE = 'NB_EMPLO',
}

export enum IndexeDataFieldsA {
    GENRE = 'GENRE',
    AGE = 'age',
    AGER = 'AgeR',
    Q0QC = 'Q0QC',
    REGIO = 'REGIO',
    TYPETYPE2 = 'TYPETYPE2',
    QE1x = 'QE1x',
    QE1Cx = 'QE1Xx',
    QE3 = 'QE3',
    QE6 = 'QE6',
    QE8r1 = 'QE8r1',
    QE8r2 = 'QE8r2',
    QE8r3 = 'QE8r3',
    QE8r4 = 'QE8r4',
    QE8r5 = 'QE8r5',
    QE8r18 = 'QE8r18',
    QE8r6 = 'QE8r6',
    QE8r7 = 'QE8r7',
    QE8r10 = 'QE8r10',
    QE8r11 = 'QE8r11',
    QE8r12 = 'QE8r12',
    QE8r13 = 'QE8r13',
    QE8r14 = 'QE8r14',
    QE8r15 = 'QE8r15',
    QE8r16 = 'QE8r16',
    QE8r17 = 'QE8r17',
    QE8r19 = 'QE8r19',
}

export enum IndexeDataFieldsB {
    GENRE = 'GENRE',
    AGE = 'age',
    AGER = 'AgeR',
    QZ13 = 'QZ13',
    Q0QC = 'Q0QC',
    REGIO = 'REGIO',
    QD8 = 'QD8',
    QDA1r6 = 'QDA1r6',
    QDD3Ar1 = 'QDD3Ar1',
    QDD3Ar2 = 'QDD3Ar2',
    QD11 = 'QD11',
    QD14A = 'QD14A',
    QD14B = 'QD14B',
    QD14C = 'QD14C',
    ND32r1 = 'ND32r1',
    ND32r2 = 'ND32r2',
    ND32r7 = 'ND32r7',
    ND32r8 = 'ND32r8',
    ND32r4 = 'ND32r4',
    ND32r5 = 'ND32r5',
    ND32r6 = 'ND32r6',
    ND32r9 = 'ND32r9',
    QH1 = 'QH1',
    QD16 = 'QD16',
    QZ19 = 'QZ19',
}

export enum DataBaseOrigin {
    ALBUM_FAMILLE = 0,
    INDEX_VOLETA = 1,
    INDEX_VOLETB = 2,
}

import { MainDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
interface Traductions {
    FR: string;
    EN: string;
}
interface dataInformations {
    label: Traductions;
    dataLabels: Record<string, Traductions>;
}

const keyValuePairs: [string, dataInformations][] = [
    [
        MainDataFields.ANNEE_FONDATION,
        {
            label: { FR: 'Année Fondation', EN: 'Foundation Year' },
            dataLabels: {
                'avant 1900': {
                    FR: 'avant 1900',
                    EN: 'before 1900',
                },
                '1900 a 1960': {
                    FR: '1900 à 1960',
                    EN: '1900 to 1960',
                },
                '1961 a 1970': {
                    FR: '1961 à 1970',
                    EN: '1961 to 1970',
                },
                '1971 a 1980': {
                    FR: '1971 à 1980',
                    EN: '1971 to 1980',
                },
                '1981 a 1990': {
                    FR: '1981 à 1990',
                    EN: '1981 to 1990',
                },
                '1991 a 2000': {
                    FR: '1991 à 2000',
                    EN: '1991 to 2000',
                },
                '2001 a 2010': {
                    FR: '2001 à 2010',
                    EN: '2001 to 2010',
                },
                'apres 2010': {
                    FR: 'après 2010',
                    EN: 'after 2010',
                },
                NaN: {
                    FR: 'Non Applicable',
                    EN: 'Not Applicable',
                },
            },
        },
    ],
    [
        MainDataFields.REVENUS_RANG,
        {
            label: { FR: 'Rang de Revenu', EN: 'Revenue Rank' },
            dataLabels: {
                1: { FR: 'Moins de 500 000$', EN: "Less than 500'000 $" },
                2: {
                    FR: '500 000$ à 2 500 000$',
                    EN: "500'000$ to 2'500'000$",
                },
                3: {
                    FR: '2 500 000$ à 10 000 000$',
                    EN: "2'500'000$ to 10'000'000$",
                },
                4: {
                    FR: '10 000 000$ à 100 000 000$',
                    EN: "10'000'000$ à 100'000'000$",
                },
                5: {
                    FR: 'Plus de 100 000 000$',
                    EN: "More than 100'000'000$",
                },
                9: { FR: 'Pas de réponse', EN: 'No answer' },
            },
        },
    ],
    [
        MainDataFields.SECTEUR_ACTIVITE,
        {
            label: { FR: "Secteur d'Activité", EN: 'Sector of Activity' },
            dataLabels: {
                1: { FR: 'Ressources Naturelles', EN: 'Natural Resources' },
                2: {
                    FR: 'Industries des Biens Transformés',
                    EN: 'Processed Goods Industries',
                },
                3: {
                    FR: 'Transformation Industriel et Minéral',
                    EN: 'Industrial and Mineral Processing',
                },
                4: {
                    FR: 'Construction et Services Connexes',
                    EN: 'Construction and Related Services',
                },
                5: {
                    FR: 'Transports et Logistique',
                    EN: 'Transport and Logistics',
                },
                6: {
                    FR: 'Services Publics et Communications',
                    EN: 'Public Services and Communications',
                },
                7: { FR: 'Commerce de Gros', EN: 'Wholesale Trade' },
                8: { FR: 'Commerce de Détail', EN: 'Retail Trade' },
                9: {
                    FR: 'Intermédiaires Financiers',
                    EN: 'Financial Intermediaries',
                },
                10: {
                    FR: 'Immobilier et Services Connexes',
                    EN: 'Real Estate and Related Services',
                },
                11: {
                    FR: 'Services aux Entreprises et Administratifs',
                    EN: 'Business and Administrative Services',
                },
                12: {
                    FR: 'Education et Service de Santé',
                    EN: 'Education and Health Services',
                },
                13: {
                    FR: 'Divertissement, Services Personnels & Autres',
                    EN: 'Entertainment, Personal Services & Others',
                },
                14: { FR: 'quatorze', EN: 'fourteen' },
                15: { FR: 'quize', EN: 'fifteen' },
                16: { FR: 'seize', EN: 'sixteen' },
                17: { FR: 'dix-sept', EN: 'seventeen' },
                18: { FR: 'dix-huit', EN: 'eighteen' },
                19: { FR: 'dix-neuf', EN: 'nineteen' },
            },
        },
    ],
    [
        MainDataFields.FEMMES_DIRECTION_POURCENTAGE,
        {
            label: {
                FR: 'Pourcentage de Femmes à la direction',
                EN: 'Percentage of Women in Leadership',
            },
            dataLabels: {
                '- de 10%': { FR: 'moins de 10%', EN: 'less than 10%' },
                '10% a 24%': { FR: '10% à 24%', EN: '10% to 24%' },
                '25% a 49%': { FR: '25% à 49%', EN: '25% to 49%' },
                '50% a 75%': { FR: '50% à 75%', EN: '50% to 75%' },
                '+ de 75%': { FR: 'plus de 75%', EN: 'More than 75%' },
            },
        },
    ],
    [
        MainDataFields.TAILLE_ENTREPRISE,
        {
            label: { FR: "Taille de l'Entreprise", EN: 'Company Size' },
            dataLabels: {
                'tres petite': { FR: 'très petite', EN: 'very small' },
                petite: { FR: 'petite', EN: 'small' },
                moyenne: { FR: 'moyenne', EN: 'medium' },
                grande: { FR: 'grande', EN: 'large' },
                'tres grande': { FR: 'très grande', EN: 'very large' },
            },
        },
    ],
    [
        MainDataFields.CONTINUITE_FAMILIALE,
        {
            label: { FR: 'Continuité Familiale', EN: 'Family Continuity' },
            dataLabels: {
                true: { FR: 'Oui', EN: 'Yes' },
                false: { FR: 'Non', EN: 'No' },
            },
        },
    ],

    [
        MainDataFields.REPONDANT_SEXE,
        {
            label: { FR: 'Sexe du Répondant', EN: 'Respondent Gender' },
            dataLabels: {
                homme: { FR: 'homme', EN: 'Man' },
                femme: { FR: 'femme', EN: 'woman' },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_NIVEAU_ETUDE,
        {
            label: {
                FR: "Niveau d'Étude du Répondant",
                EN: 'Respondent Education Level',
            },
            dataLabels: {
                1: { FR: 'Secondaire', EN: 'Secondary' },
                2: {
                    FR: "Certificat d'apprenti",
                    EN: 'Apprentice Certificate',
                },
                3: {
                    FR: "Certificat d'un college",
                    EN: 'College Certificate',
                },
                4: {
                    FR: 'Certificat universitaire inferieur',
                    EN: 'Lower University Certificate',
                },
                5: { FR: 'Baccalauréat', EN: 'Bachelors degree' },
                6: { FR: 'Études superieures', EN: "Graduate's degree" },
                7: { FR: 'Autre', EN: 'Other' },
                8: { FR: 'Aucun', EN: 'None' },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_NIVEAU_SANTE,
        {
            label: {
                FR: 'Niveau de Santé du Répondant',
                EN: 'Respondent Health Level',
            },
            dataLabels: {
                excellente: { FR: 'Excellente', EN: 'Excellent' },
                'tres bonne': { FR: 'Très bonne', EN: 'Very good' },
                bonne: { FR: 'Bonne', EN: 'Good' },
                'assez bonne': { FR: 'Assez bonne', EN: 'Quite good' },
                'pas tres bonne': { FR: 'Pas très bonne', EN: 'Not very good' },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_POSTE,
        {
            label: { FR: 'Poste du Répondant', EN: 'Respondent Position' },
            dataLabels: {
                "president du conseil d'administration": {
                    FR: "Président du conseil d'administration",
                    EN: 'President of the board of directors',
                },
                employe: { FR: 'Employé', EN: 'Employee' },
                'equipe de direction': {
                    FR: 'Équipe de direction',
                    EN: 'Management team',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                dirigeant: { FR: 'Dirigeant', EN: 'Leader' },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_MEMBRE_FAMILLE,
        {
            label: {
                FR: 'Position du Répondant par rapport à la Famille',
                EN: "Respondent's Family Position",
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rn generation',
                },
                '4eme generation ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'Pas membre de la famille': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        {
            label: {
                FR: "Années Travaillées au Sein de l'Entreprise par le Répondant",
                EN: 'Years Worked in the Company by the Respondent',
            },
            dataLabels: {
                '0 a 9 ans': { FR: '0 à 9 ans', EN: '0 to 9 years' },
                '10 a 19 ans': { FR: '10 à 19 ans', EN: '10 to 19 years' },
                '20 a 29 ans': { FR: '20 à 29 ans', EN: '20 to 29 years' },
                '30 a 39 ans': { FR: '30 à 39 ans', EN: '30 to 39 years' },
                '40 ans ou plus': {
                    FR: '40 ans ou plus',
                    EN: '40 years or more',
                },
            },
        },
    ],
    [
        MainDataFields.REPONDANT_ANNEE_NAISSANCE,
        {
            label: {
                FR: 'Année de Naissance du Répondant',
                EN: 'Respondent Year of Birth',
            },
            dataLabels: {
                'avant 1960': { FR: 'Avant 1960', EN: 'Before 1960' },
                '1961 a 1970': { FR: '1961 à 1970', EN: '1961 to 1970' },
                '1971 a 1980': { FR: '1971 à 1980', EN: '1971 to 1980' },
                '1981 a 1990': { FR: '1981 à 1990', EN: '1981 to 1990' },
                '1991 a 2000': { FR: '1991 à 2000', EN: '1991 to 2000' },
                '2001 a 2010': { FR: '2001 à 2010', EN: '2001 to 2010' },
                'apres 2010': { FR: 'Après 2010', EN: 'After 2010' },
            },
        },
    ],

    [
        MainDataFields.IMPORT_POURCENTAGE,
        {
            label: { FR: "Pourcentage d'Imports", EN: 'Percentage of Imports' },
            dataLabels: {
                jamais: { FR: 'Jamais', EN: 'Never' },
                '- de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '~30%': { FR: 'Environ 30%', EN: 'Around 30%' },
                '~50%': { FR: 'Environ 50%', EN: 'Around 50%' },
                '~70%': { FR: 'Environ 70%', EN: 'Around 70%' },
                '~90%': { FR: 'Environ 90%', EN: 'Around 90%' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        MainDataFields.IMPORT_MARCHES,
        {
            label: { FR: "Marchés d'Import", EN: 'Import Markets' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        MainDataFields.IMPORT_PRINCIPAL,
        {
            label: { FR: 'Import Principal', EN: 'Main Import' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],
    [
        MainDataFields.IMPORT_MARGINAL,
        {
            label: { FR: 'Import Marginal', EN: 'Marginal Import' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],

    [
        MainDataFields.EXPORT_POURCENTAGE,
        {
            label: { FR: "Pourcentage d'Export", EN: 'Percentage of Exports' },
            dataLabels: {
                jamais: { FR: 'Jamais', EN: 'Never' },
                '- de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '~30%': { FR: 'Environ 30%', EN: 'Around 30%' },
                '~50%': { FR: 'Environ 50%', EN: 'Around 50%' },
                '~70%': { FR: 'Environ 70%', EN: 'Around 70%' },
                '~90%': { FR: 'Environ 90%', EN: 'Around 90%' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        MainDataFields.EXPORT_MARCHES,
        {
            label: { FR: "Marchés d'Export", EN: 'Export Markets' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        MainDataFields.EXPORT_PRINCIPAL,
        {
            label: { FR: 'Export Principal', EN: 'Main Export' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],
    [
        MainDataFields.EXPORT_MARGINAL,
        {
            label: { FR: 'Export Marginal', EN: 'Marginal Export' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],

    [
        MainDataFields.ACTIONNAIRES_MAJORITAIRE,
        {
            label: {
                FR: 'Actionnaires Majoritaires',
                EN: 'Majority Shareholders',
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rd generation',
                },
                '4eme generation ou plus': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
            },
        },
    ],
    [
        MainDataFields.ACTIONNAIRES_NOMBRE,
        {
            label: {
                FR: "Nombre d'Actionnaires",
                EN: 'Number of Shareholders',
            },
            dataLabels: {
                '0': { FR: '0 Actionnaires', EN: '0 Shareholders' },
                '1': { FR: '1 Actionnaire', EN: '1 Shareholder' },
                '2': { FR: '2 Actionnaires', EN: '2 Shareholders' },
                '3': { FR: '3 Actionnaires', EN: '3 Shareholders' },
                '4': { FR: '4 Actionnaires', EN: '4 Shareholders' },
                '5+': {
                    FR: '5 Actionnaires et plus',
                    EN: '5 Shareholders or more',
                },
            },
        },
    ],
    [
        MainDataFields.ACTIONNAIRES_EXTERNE,
        {
            label: { FR: 'Actionnaires Externes', EN: 'External Shareholders' },
            dataLabels: {
                true: {
                    FR: 'A des actionnnaires externes',
                    EN: 'Has external shareholders',
                },
                false: {
                    FR: "N'a pas d'actionnaires externes",
                    EN: 'Does not have external shareholders',
                },
            },
        },
    ],
    [
        MainDataFields.ACTIONNAIRES_TYPE,
        {
            label: { FR: "Type d'Actionnaires", EN: 'Type of Shareholders' },
            dataLabels: {
                employe: {
                    FR: 'Employé',
                    EN: 'Employee',
                },
                'fonds d’investissement': {
                    FR: "Fonds d'investissement",
                    EN: 'Investment fund',
                },
                'ami proche de la famille': {
                    FR: 'Ami proche de la famille',
                    EN: 'Close family friend',
                },
                banque: {
                    FR: 'Banque',
                    EN: 'Bank',
                },
                autre: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                investisseur: {
                    FR: 'Investisseur',
                    EN: 'Investor',
                },
                'personne physique externe a la famille': {
                    FR: 'Personne physique externe à la famille',
                    EN: 'Individual external to the family',
                },
                'autre entreprise': {
                    FR: 'Autre entreprise',
                    EN: 'Another company',
                },
                'ange investisseur': {
                    FR: 'Ange investisseur',
                    EN: 'Angel investor',
                },
                'membre de la famille qui ne travaille pas dans l’entreprise': {
                    FR: "Membre de la famille qui ne travaille pas dans l'entreprise",
                    EN: 'Family member not working in the company',
                },
                'investisseur, personne physique externe a la famille': {
                    FR: 'Investisseur, personne physique externe à la famille',
                    EN: 'Investor, individual external to the family',
                },
                'investisseur de risque': {
                    FR: 'Investisseur de risque',
                    EN: 'Venture capitalist',
                },
            },
        },
    ],

    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE,
        {
            label: {
                FR: 'Autres Entreprises Familiales Possédées',
                EN: 'Other Family-Owned Businesses',
            },
            dataLabels: {
                true: {
                    FR: "Possèdent d'autres entreprises familiales",
                    EN: 'Has other familial businesses',
                },
                false: {
                    FR: "Ne possèdent pas d'autres entreprises familiales",
                    EN: 'Does not have other familial businesses',
                },
            },
        },
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
        {
            label: {
                FR: 'Secteurs des autres Entreprises Familiales Possédées',
                EN: 'Sectors of Other Family-Owned Businesses',
            },
            dataLabels: {
                1: { FR: 'Ressources Naturelles', EN: 'Natural Resources' },
                2: {
                    FR: 'Industries des Biens Transformés',
                    EN: 'Processed Goods Industries',
                },
                3: {
                    FR: 'Transformation Industriel et Minéral',
                    EN: 'Industrial and Mineral Processing',
                },
                4: {
                    FR: 'Construction et Services Connexes',
                    EN: 'Construction and Related Services',
                },
                5: {
                    FR: 'Transports et Logistique',
                    EN: 'Transport and Logistics',
                },
                6: {
                    FR: 'Services Publics et Communications',
                    EN: 'Public Services and Communications',
                },
                7: { FR: 'Commerce de Gros', EN: 'Wholesale Trade' },
                8: { FR: 'Commerce de Détail', EN: 'Retail Trade' },
                9: {
                    FR: 'Intermédiaires Financiers',
                    EN: 'Financial Intermediaries',
                },
                10: {
                    FR: 'Immobilier et Services Connexes',
                    EN: 'Real Estate and Related Services',
                },
                11: {
                    FR: 'Services aux Entreprises et Administratifs',
                    EN: 'Business and Administrative Services',
                },
                12: {
                    FR: 'Education et Service de Santé',
                    EN: 'Education and Health Services',
                },
                13: {
                    FR: 'Divertissement, Services Personnels & Autres',
                    EN: 'Entertainment, Personal Services & Others',
                },
                14: { FR: 'quatorze', EN: 'fourteen' },
                15: { FR: 'quize', EN: 'fifteen' },
                16: { FR: 'seize', EN: 'sixteen' },
                17: { FR: 'dix-sept', EN: 'seventeen' },
                18: { FR: 'dix-huit', EN: 'eighteen' },
                19: { FR: 'dix-neuf', EN: 'nineteen' },
                96: { FR: 'Pas de secteur', EN: 'No sector' },
            },
        },
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE,
        {
            label: {
                FR: "Autres Entreprises Familiales Possédées par d'autres Membres",
                EN: 'Other Family-Owned Businesses Owned by Other Members',
            },
            dataLabels: {
                true: {
                    FR: "D'autres membres de la famille possèdent des entreprises familiales",
                    EN: 'Other family members own family businesses',
                },
                false: {
                    FR: 'Les autres membres de la famille ne possèdent pas des entreprises familiales',
                    EN: 'Does not have other family businesses',
                },
            },
        },
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        {
            label: {
                FR: "Relation Génétiques avec les autres Propriétaires d'Entreprises dans la Famille",
                EN: 'Genetic Relations with Other Family Business Owners',
            },
            dataLabels: {
                '01': { FR: ' Grand-Père/Grand-Mère', EN: 'Grandpa/Grandma' },
                '02': { FR: 'Père/Mère', EN: 'Father/Mother' },
                '03': { FR: 'Oncle/Tante', EN: 'Uncle/Aunt' },
                '04': { FR: 'Cousin(e)', EN: 'Cousin' },
                '05': { FR: 'Frère/Sœur', EN: 'Brother/Sister' },
                '06': { FR: 'Fils/Fille', EN: 'Son/Daughter' },
                '07': { FR: ' Autre', EN: 'Other' },
                '96': { FR: 'Aucun', EN: 'None' },
            },
        },
    ],
    [
        MainDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES,
        {
            label: {
                FR: "Relation D'Affaires avec les autres Propriétaires d'Entreprises dans la Famille",
                EN: 'Business Relations with Other Family Business Owners',
            },
            dataLabels: {
                client: { FR: 'Client', EN: 'Client' },
                investisseur: { FR: 'Investisseur', EN: 'Investor' },
                fournisseur: { FR: 'Fournisseur', EN: 'Supplier' },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        MainDataFields.DIRIGEANT_GENERATION,
        {
            label: {
                FR: 'Génération Familiale du Dirigeant',
                EN: 'Family Generation of the Leader',
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rd generation',
                },
                '4eme generation ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'membre non-familial': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        MainDataFields.DIRIGEANT_SEXE,
        {
            label: { FR: 'Sexe du Dirigeant', EN: 'Gender of the Leader' },
            dataLabels: {
                homme: { FR: 'homme', EN: 'Man' },
                femme: { FR: 'femme', EN: 'woman' },
            },
        },
    ],
    [
        MainDataFields.DIRIGEANT_AGE,
        {
            label: { FR: 'Age du Dirigeant', EN: 'Age of the Leader' },
            dataLabels: {
                '18 a 24 ans': { FR: '18 à 24ans', EN: '18 to 24 years old' },
                '25 a 34 ans': { FR: '25 à 34ans', EN: '25 to 34 years old' },
                '35 a 44 ans': { FR: '35 à 44ans', EN: '35 to 44 years old' },
                '45 a 54 ans': { FR: '45 à 54ans', EN: '45 to 54 years old' },
                '55 a 64 ans': { FR: '55 à 64ans', EN: '55 to 64 years old' },
                '65 et +': { FR: '65ans et plus', EN: '65 years old and more' },
            },
        },
    ],
    [
        MainDataFields.DIRIGEANT_PRESIDE_CONSEIL,
        {
            label: {
                FR: 'Conseil présidé par le Dirigeant',
                EN: 'Council Led by the Leader',
            },
            dataLabels: {
                true: {
                    FR: 'Le dirigeant préside le conseil',
                    EN: 'The leader chairs the council',
                },
                false: {
                    FR: 'Le dirigeant ne préside pas le conseil',
                    EN: 'The leader doesn not chair the council',
                },
            },
        },
    ],
    [
        MainDataFields.GOUVERNANCE_STRUCTURES,
        {
            label: {
                FR: 'Structure de Gouvernance',
                EN: 'Gouvernance Structure',
            },
            dataLabels: {
                'assemblee d’actionnaires': {
                    FR: "Assemblée d'actionnaires",
                    EN: "Shareholders' assembly",
                },
                "conseil d'administration": {
                    FR: "Conseil d'administration",
                    EN: 'Board of Directors',
                },
                'conseil de famille': {
                    FR: 'Conseil de famille',
                    EN: 'Family Council',
                },
                'conseil aviseur (ou consultatif)': {
                    FR: 'Conseil aviseur (ou consultatif)',
                    EN: 'Advisory (or consultative) Council',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                aucune: { FR: 'Aucune', EN: 'None' },
            },
        },
    ],
    [
        MainDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO,
        {
            label: {
                FR: 'Acompagnement Professionnel',
                EN: 'Professional Support',
            },
            dataLabels: {
                true: {
                    FR: "La gouvernance bénéficie d'un accompagnement professionnel",
                    EN: 'Governance benefits from professional support',
                },
                false: {
                    FR: "La gouvernance ne bénéficie pas d'un accompagnement professionnel",
                    EN: 'Governance does not benefit from professional support',
                },
            },
        },
    ],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
        {
            label: {
                FR: 'Composition du Conseil Consultatif',
                EN: 'Composition of the Advisory Council',
            },
            dataLabels: {
                'employe non membre de la famille en affaires': {
                    FR: 'Employé non membre de la famille',
                    EN: 'Non-family employee',
                },
                'entrepreneur externe a la famille': {
                    FR: 'Entrepreneur externe à la famille',
                    EN: 'Entrepreneur outside the family',
                },
                'membre de la famille qui travaille dans l’entreprise': {
                    FR: 'Membre de la famille qui travaille dans l’entreprise',
                    EN: 'Family member who works in the business',
                },
                'professionnel, expert externe a l’entreprise': {
                    FR: 'Professionnel, expert externe à l’entreprise',
                    EN: 'professional, expert external to the company',
                },
                'membre de la famille qui ne travaille pas dans l’entreprise': {
                    FR: 'Membre de la famille qui ne travaille pas dans l’entreprise',
                    EN: 'family member who does not work in the business',
                },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES,
        {
            label: {
                FR: 'Pourcentage de Femmes sur le Conseil Consultatif',
                EN: 'Percentage of Women on the Advisory Board',
            },
            dataLabels: {
                'Moins de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '10 a 25%': { FR: '10 à 25%', EN: '10 to 25%' },
                '25 a 50%': { FR: '25 à 50%', EN: '25 to 50%' },
                '50 a 75%': { FR: '50 à 75%', EN: '50 to 75%' },
                'plus de 75%': { FR: '75% et plus', EN: '75% and more' },
            },
        },
    ],
    [
        MainDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
        {
            label: {
                FR: 'Principales Responsabilités du Conseil Consultatif',
                EN: 'Key Responsibilities of the Advisory Board',
            },
            dataLabels: {
                'approuver les orientations strategiques, le plan d’affaires et les budgets qui en decoulent, en assurant que la direction y donne suite':
                    {
                        FR: 'Approuver les orientations strategiques, le plan d’affaires et les budgets qui en découlent, en assurant que la direction y donne suite',
                        EN: 'Approve the strategic orientations, the business plan and the resulting budgets, ensuring that management follows up on them',
                    },
                'approuver les reglements generaux': {
                    FR: 'Approuver les règlements généraux',
                    EN: 'Approve general regulations',
                },
                'assurer la mise en place d’un systeme integre de gestion des risques':
                    {
                        FR: 'Assurer la mise en place d’un systeme intégré de gestion des risques',
                        EN: 'Ensure the implementation of an integrated risk management system',
                    },
                'assurer que la gestion de l’entreprise est effectuee avec efficacite et efficience':
                    {
                        FR: 'Assurer que la gestion de l’entreprise est effectuée avec efficacité et éfficience',
                        EN: 'Ensure that the management of the business is carried out effectively and efficiently',
                    },
                'determiner la remuneration des hauts dirigeants et les criteres d’evaluation de leur performance':
                    {
                        FR: 'Determiner la rémuneration des hauts dirigeants et les critères d’évaluation de leur performance',
                        EN: 'Determine the remuneration of senior executives and the criteria for evaluating their performance',
                    },
                'faire un suivi du processus de releve': {
                    FR: 'Faire un suivi du processus de relève',
                    EN: 'Follow up on the succession process',
                },
                'surveiller l’integrite financiere : assurer la qualite de l’information financiere et des mecanismes de divulgation, approuver les etats financiers et attester de leur fiabilite, assurer l’efficacite du controle interne':
                    {
                        FR: 'Surveiller l’intégrité financière : assurer la qualité de l’information financière et des mécanismes de divulgation, approuver les états financiers et attester de leur fiabilité, assurer l’efficacité du controle interne',
                        EN: 'Monitor financial integrity: ensure the quality of financial information and disclosure mechanisms, approve financial statements and certify their reliability, ensure the effectiveness of internal control',
                    },
                'faire rapport aux actionnaires sur la performance de l’entreprise':
                    {
                        FR: 'Faire rapport aux actionnaires sur la performance de l’entreprise',
                        EN: 'Report to shareholders on company performance',
                    },
                'elire et pourvoir a la nomination du president et des membres du conseil, du president de l’entreprise ainsi que des autres hauts dirigeants, determiner leurs responsabilites et la portee de leur autorite':
                    {
                        FR: 'Élire et pourvoir a la nomination du président et des membres du conseil, du président de l’entreprise ainsi que des autres hauts dirigeants, déterminer leurs responsabilités et la portée de leur autorité',
                        EN: 'Elect and provide for the appointment of the president and members of the board, the president of the company as well as other senior managers, determine their responsibilities and the scope of their authority',
                    },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        MainDataFields.GESTION_FAMILIALE_MULTIPLES_FAMILLES,
        {
            label: {
                FR: "Présence de Multiples Familles dans l'Équipe de Gouvernance",
                EN: 'Presence of Multiple Families in the Governance Team',
            },
            dataLabels: {
                true: {
                    FR: "Présence de multiples familles dans l'équipe de gouvernance",
                    EN: 'Presence of multiple families in the governance team',
                },
                false: {
                    FR: "Présence d'une seule famille dans l'équipe de gouvernance",
                    EN: 'Presence of only one family in the governance team',
                },
            },
        },
    ],
    [
        MainDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        {
            label: {
                FR: 'Générations Impliquées dans la Gestion Familiale',
                EN: 'Generations Involved in Family Management',
            },
            dataLabels: {
                '1ere': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme': {
                    FR: '3ème génération',
                    EN: '3rn generation',
                },
                '4eme ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'membre non-familial': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        MainDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        {
            label: {
                FR: 'Protocole Familial Établi',
                EN: 'Established Family Protocol',
            },
            dataLabels: {
                aucun: { FR: 'Aucun', EN: 'None' },
                'formel et explicite': {
                    FR: 'Formel et Explicite',
                    EN: 'Formal and Explicite',
                },
                informel: { FR: 'Informel', EN: 'Informal' },
            },
        },
    ],
    [
        MainDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        {
            label: {
                FR: 'Politiques Familiales Établies',
                EN: 'Established Family Policies',
            },
            dataLabels: {
                'dans la convention d’actionnaires': {
                    FR: 'Informel',
                    EN: 'Informal',
                },
                'document informel': {
                    FR: 'Document informel',
                    EN: 'Informal document',
                },
                'protocole ou charte': {
                    FR: 'Protocole ou charte',
                    EN: 'Protocol or chart',
                },
                'politiques implicites': {
                    FR: 'Politiques implicite',
                    EN: 'Implicite policies',
                },
                'politiques prevues au manuel de l’employe': {
                    FR: 'Politiques prévues au manuel de l’employé',
                    EN: 'Policies provided for in the employee handbook',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                aucune: { FR: 'Aucune', EN: 'None' },
            },
        },
    ],
    [
        MainDataFields.COORDONNES_REGION,
        {
            label: { FR: 'Régions', EN: 'Regions' },
            dataLabels: {
                'Abitibi-Temiscamingue': {
                    FR: 'Abitibi-Témiscamingue',
                    EN: 'Abitibi-Témiscamingue',
                },
                'Bas-Saint-Laurent': {
                    FR: 'Bas-Saint-Laurent',
                    EN: 'Bas-Saint-Laurent',
                },
                'Saguenay–Lac-Saint-Jean': {
                    FR: 'Saguenay–Lac-Saint-Jean',
                    EN: 'Saguenay–Lac-Saint-Jean',
                },
                'Capitale-Nationale': {
                    FR: 'Capitale-Nationale',
                    EN: 'Capitale-Nationale',
                },
                Mauricie: { FR: 'Mauricie', EN: 'Mauricie' },
                Estrie: { FR: 'Estrie', EN: 'Estrie' },
                Montreal: { FR: 'Montréal', EN: 'Montréal' },
                Outaouais: { FR: 'Outaouais', EN: 'Outaouais' },
                'Cote-Nord': { FR: 'Cote-Nord', EN: 'Cote-Nord' },
                'Nord-du-Quebec': {
                    FR: 'Nord-du-Quebec',
                    EN: 'Nord-du-Quebec',
                },
                'Gaspesie–Îles-de-la-Madeleine': {
                    FR: 'Gaspesie–Îles-de-la-Madeleine',
                    EN: 'Gaspesie–Îles-de-la-Madeleine',
                },
                'Chaudiere-Appalaches': {
                    FR: 'Chaudiere-Appalaches',
                    EN: 'Chaudiere-Appalaches',
                },
                Laval: { FR: 'Laval', EN: 'Laval' },
                Lanaudiere: { FR: 'Lanaudière', EN: 'Lanaudière' },
                Laurentides: { FR: 'Laurentides', EN: 'Laurentides' },
                Monteregie: { FR: 'Montéregie', EN: 'Montéregie' },
                'Centre-du-Quebec': {
                    FR: 'Centre-du-Quebec',
                    EN: 'Centre-du-Quebec',
                },
            },
        },
    ],
    [
        MainDataFields.SUCCESSION_PLAN,
        {
            label: { FR: 'Plan de Succession', EN: 'Succession Plan' },
            dataLabels: {
                'N/A': { FR: 'Non applicable', EN: 'Not applicable' },
                'Plan inexistant': {
                    FR: 'Plan inexistant',
                    EN: 'Inexistant plan',
                },
                'Plan informel': { FR: 'Plan informel', EN: 'Informal plan' },
                'Plan formel': { FR: 'Plan formel', EN: 'Formal plan' },
            },
        },
    ],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO,
        {
            label: {
                FR: 'Accompagnement Professionnel pour la Succession',
                EN: 'Professional Support for Succession',
            },
            dataLabels: {
                true: {
                    FR: 'Accompagnement professionel pendant la succession',
                    EN: 'Professional support during succession',
                },
                false: {
                    FR: 'Aucun accompagnement professionel pendant la succession',
                    EN: 'No professional support during succession',
                },
            },
        },
    ],
    [
        MainDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        {
            label: {
                FR: "Type d'Accompagnement pour la Succession",
                EN: 'Type of Support for Succession',
            },
            dataLabels: {
                '01': { FR: 'Comptable', EN: 'Acountant' },
                '02': { FR: 'Fiscaliste', EN: 'Tax expert' },
                '03': { FR: 'Coach', EN: 'Coach' },
                '04': { FR: 'Menteur', EN: 'Mentor' },
                '05': {
                    FR: 'Professionnel en relève d’entreprises',
                    EN: 'Business succession professional',
                },
                '06': { FR: 'Avocat', EN: 'Lawyer' },
                '07': { FR: 'Analyste financier', EN: 'Financial Analyst' },
                '08': { FR: 'Autre', EN: 'Other' },
                '96': { FR: 'Aucun acompagnement', EN: 'No support' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE,
        {
            label: {
                FR: "Questionnaire sur le Contrôle d'Influence",
                EN: 'Influence Control Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_LIENS_SOCIAUX,
        {
            label: {
                FR: 'Questionnaire sur les Liens Sociaux',
                EN: 'Social Connections Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE,
        {
            label: {
                FR: "Questionnaire sur l'Identification d'Influence",
                EN: 'Influence Identification Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS,
        {
            label: {
                FR: 'Questionnaire sur les Aspects Émotionnels',
                EN: 'Emotional Aspects Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_SUCCESION,
        {
            label: {
                FR: 'Questionnaire sur la Succession',
                EN: 'Succession Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT,
        {
            label: {
                FR: 'Questionnaire sur la Consicence Environnementale lors du Recrutement',
                EN: 'Environmental Awareness in Recruitment Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_FORMATION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Formation Environnementale',
                EN: 'Environmental Training Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV,
        {
            label: {
                FR: 'Questionnaire sur le Développement Environnementale',
                EN: 'Environmental Development Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Redistribution Environnementale',
                EN: 'Environmental Redistribution Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.QUESTIONNAIRE_PARTICIPATION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Participation Environnementale',
                EN: 'Environmental Participation Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        MainDataFields.CREE_OU_REPRISE,
        {
            label: {
                FR: 'Entreprise Crée ou Reprise',
                EN: 'Business Created or Takenover',
            },
            dataLabels: {
                1: {
                    FR: "L'entreprise a été créée",
                    EN: 'The company was created',
                },
                2: {
                    FR: "L'entreprise a été reprise",
                    EN: 'The company was taken over',
                },
            },
        },
    ],
    [
        MainDataFields.TEMPS_NOUVELLE_ENTREPRISE,
        {
            label: {
                FR: 'Le répondant aurait-il le temps de créer une nouvelle entreprise?',
                EN: 'Would the respondent have time to start a new business?',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant aurait le temps',
                    EN: 'The respondant would have time',
                },
                1: {
                    FR: "Le répondant n'aurait pas le temps",
                    EN: 'The respondant would not have time',
                },
            },
        },
    ],
    [
        MainDataFields.BENEVOLAT,
        {
            label: {
                FR: 'Le répondant aurait-il le temps de faire du bénévolat ou travailler pour une oeuvre caritative?',
                EN: 'Would the respondent have time to volunteer or work for charity?',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant aurait le temps',
                    EN: 'The respondant would have time',
                },
                1: {
                    FR: "Le répondant n'aurait pas le temps",
                    EN: 'The respondant would not have time',
                },
            },
        },
    ],
    [
        MainDataFields.ROLE_INFORMEL,
        {
            label: {
                FR: 'Le répondant souhaite-t-il asumer un rôle informel auprès des entreprenneurs qui reprendront son entreprise?',
                EN: 'Does the respondent wish to take on an informal role with the entrepreneurs who will take over his business?',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant souhaite un rôle informel',
                    EN: 'The respondant would like an informal role',
                },
                1: {
                    FR: 'Le répondant ne souhaite pas avoir un rôle informel',
                    EN: 'The respondant would not like to have an informal role',
                },
            },
        },
    ],
    [
        MainDataFields.APRES_VENTE,
        {
            label: {
                FR: "Le répondant souhaite-t-il suivre l'évolution de son entreprise suite à sa vente ou son transfert?",
                EN: 'Does the respondent wish to follow the evolution of his business following its sale or transfer?',
            },
            dataLabels: {
                0: {
                    FR: "Le répondant souhaite suivre l'évolution de son entreprise après sa vente / tranfert",
                    EN: 'The respondant would like to keep track of their company after sale / tranfert',
                },
                1: {
                    FR: "Le répondant ne souhaite pas suivre l'évolution de son entreprise après sa vente / tranfert",
                    EN: 'The respondant would not like to keep track of their company after sale / tranfert',
                },
            },
        },
    ],
    [
        MainDataFields.NOMBRE_EMPLOYE,
        {
            label: {
                FR: "Le répondant souhaite-t-il suivre l'évolution de son entreprise suite à sa vente ou son transfert?",
                EN: 'Does the respondent wish to follow the evolution of his business following its sale or transfer?',
            },
            dataLabels: {
                '1 a 5': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                aucun: {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },

                '11 a 25': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                Aucun: {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '100 a 249': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '500 a 749': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                inconnu: {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                AUCUN: {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '750 a 999': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '6 a 10': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '26 a 49': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '250 a 499': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '50 a 99': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '1000 a 2499': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                '2500 a 4999': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
            },
        },
    ],
];

export const TableauxTraductionsMainDataFields = new Map<
    string,
    dataInformations
>(keyValuePairs);

const keyValuePairsGraphs: [string, { FR: string; EN: string }][] = [
    [GraphBoxType.DOUGHNUT, { FR: 'En Beignet', EN: 'Doughnut' }],
    [
        GraphBoxType.DOUBLE_HORIZONTAL_BARCHART,
        {
            FR: 'Barres (y(x))',
            EN: 'Horizontal Bars (y(x))',
        },
    ],
    [
        GraphBoxType.STACKED_BARCHART,
        {
            FR: 'Barres Empliées (y(x))',
            EN: 'Stacked Bars (y(x))',
        },
    ],
    [
        GraphBoxType.VERTICAL_BARCHART,
        {
            FR: 'Barres Horizontales',
            EN: 'Vertical Bars',
        },
    ],
    [
        GraphBoxType.HORIZONTAL_BARCHART,
        {
            FR: 'Barres Verticales',
            EN: 'Horizontal Bars',
        },
    ],
];

export const TableauxTraductionsGraphiques = new Map<
    string,
    { FR: string; EN: string }
>(keyValuePairsGraphs);

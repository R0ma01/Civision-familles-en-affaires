import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import constants from '@/constants/constants';

const RepertoirePageTutorial = () => {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepeard-modal',
            scrollTo: true,
        },
        steps: [
            {
                id: 'prompt-0',
                text: 'Bienvenue sur <i>Familles en Affaires</i>, une platerforme propulsée par Civision.',

                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                    {
                        text: 'Passer le Tutoriel',
                        action: () => {
                            tour.complete();
                        },
                    },
                ],
            },
            {
                id: 'prompt-1',
                text: 'Voici la barre de navigation, elle vous permettra de naviguer au travers des outils disponibles sur la plateforme',
                attachTo: {
                    element: '#' + constants.side_bar_id,
                    on: 'right',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-2',
                text: 'Voici le menu des filtres, il vous permettra de filtrer les données des graphiques en fonction des paramètres qui vous intéressent',
                attachTo: {
                    element: '#' + constants.toggle_filter_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-3',
                text: "Les boutons de zoom et dézoom vous permettrons de changer l'échelle de la carte",
                attachTo: {
                    element: '#' + constants.zoom_in_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-4',
                text: "Ce boutton vous permettra de cacher le contenu d'une page pour ne visualiser que la carte",
                attachTo: {
                    element: '#' + constants.hide_content_tab_id,
                    on: 'left',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },
                    {
                        text: 'Arrêter',
                        action: () => {
                            tour.complete();
                        },
                    },
                    {
                        text: 'Suivant',
                        action: () => {
                            tour.next();
                        },
                    },
                ],
            },
            {
                id: 'prompt-6',
                text: 'Cette boite de recherche vous permettra de visualiser toutes les informations concernant les entreprises familiales au Québec. Le bouton a droite de chaque entreprise vous permettra de la visualiser sur la carte.',
                attachTo: {
                    element: '#' + constants.search_box_id,
                    on: 'right',
                },
                classes: 'shepeard-modal',
                buttons: [
                    {
                        text: 'Retour',
                        action: () => {
                            tour.back();
                        },
                    },

                    {
                        text: 'Finir',
                        action: () => {
                            tour.complete();
                        },
                    },
                ],
            },
        ],
    });

    return tour;
};

export default RepertoirePageTutorial;

import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { html_object_constants } from '@/constants/constants';

const ThematiquePageTutorial = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        classes: 'shepeard-modal',
        scrollTo: true,
    },
    steps: [
        {
            id: 'prompt-1',
            text: 'Chaque carte thématique représente une page rassemblant des données ayant un lien entre-elles',
            attachTo: {
                element: html_object_constants.theme_card_id + '1',
                on: 'top',
            },
            classes: 'shepeard-modal',
            buttons: [
                {
                    text: 'Finir',
                    action: () => {
                        ThematiquePageTutorial.complete();
                    },
                },
            ],
        },
    ],
});

export default ThematiquePageTutorial;

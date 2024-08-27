import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const AdminPageTutorial = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        classes: 'shepeard-modal',
        scrollTo: true,
    },
    steps: [
        {
            id: 'promt-0',
            text: 'Bienvenue dans la console admin. Chaque carte',
            attachTo: {
                element: '#side-bar',
                on: 'right',
            },
            classes: 'shepeard-modal',
            buttons: [
                {
                    text: 'Next',
                    action: () => {
                        AdminPageTutorial.next();
                    },
                },
            ],
        },
    ],
});

export default AdminPageTutorial;

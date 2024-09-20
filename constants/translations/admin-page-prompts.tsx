interface Traductions {
    FR: string;
    EN: string;
}

type AdminPromptsTranslations = {
    [key: string]: Traductions;
};

export const adminPromptsTranslations: AdminPromptsTranslations = {
    new_page_title: {
        FR: 'Votre titre ICI',
        EN: 'Your title HERE',
    },
    new_page_description: {
        FR: 'Votre description ICI',
        EN: 'Your description HERE',
    },
    quelquechose3: {
        FR: '',
        EN: '',
    },
    quelquechose4: {
        FR: '',
        EN: '',
    },
};

import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import Button from '../buttons/button';
import { useEffect, useRef, useState } from 'react';
import { EditTabContainer } from '../tab/edit-tab-container';
import { TabContent } from '@/components/interface/tab-content';
import { StudyOrigin, StudyYears } from '@/components/enums/data-types-enum';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import ImageDropdown from '../drop-down-menu/image-drop-down';

interface AdminModalProps {
    page: PageTabContent;
    closeDialog: () => void;
    submitDialog: (page: PageTabContent) => void;
}
export function AdminModal({
    page,
    closeDialog,
    submitDialog,
}: AdminModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [editPage, setEditPage] = useState<PageTabContent>(page);
    const lang: Language = useDataStore((state) => state.lang);
    const [langEdit, setLang] = useState<Language>(Language.FR);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                closeDialog();
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const handleTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        lang: Language, // 'EN' or 'FR'
    ) => {
        const { name, value } = e.target;

        const updatedPage = { ...editPage };

        if (name === 'title') {
            updatedPage.title[lang] = value;
        } else if (name === 'description') {
            updatedPage.description[lang] = value;
        }

        setEditPage(updatedPage);
    };

    const handleImageInputChange = (image: string) => {
        const updatedPage = { ...editPage };

        if (image) {
            updatedPage.backgroundImage = image;
        }

        setEditPage(updatedPage);
    };

    function handleTabChange(index: number, tab: TabContent | undefined) {
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        if (tab) {
            if (updatedTabs.length > index) {
                updatedTabs[index] = tab;
            } else {
                updatedTabs.push(tab);
            }
        } else {
            updatedTabs = updatedTabs.filter(
                (tab, tabIndex) => tabIndex !== index,
            );
        }
        updatedPage.tabs = updatedTabs;
        setEditPage(updatedPage);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitDialog(editPage);
    };

    function handleTabAdd(e: any) {
        e.preventDefault();
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        updatedTabs.push({
            tabType: StudyOrigin.INDEX_VOLETA,
            years: [StudyYears.YEAR_2023],
            description: { FR: '', EN: '' },
            cards: [],
            visible: false,
        });

        updatedPage.tabs = updatedTabs;

        setEditPage(updatedPage);
    }

    function handleTabDelete(index: number) {
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        updatedTabs = updatedTabs.filter((tab, tabIndex) => tabIndex !== index);

        updatedPage.tabs = updatedTabs;

        setEditPage(updatedPage);
    }

    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleDarkModeChange = (e: any) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleDarkModeChange);

        return () =>
            darkModeQuery.removeEventListener('change', handleDarkModeChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed z-40 h-[100%] backdrop-blur-md flex items-center justify-center w-full overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] rounded-lg shadow-2xl w-[95%] h-[95%] relative overflow-hidden"
            >
                <form className="w-full h-full flex flex-col overflow-auto">
                    <div className="flex-col flex w-[80%] mb-3">
                        <input
                            type="text"
                            placeholder="titre"
                            name="title"
                            value={editPage.title[langEdit]}
                            onChange={(e) => handleTextInputChange(e, langEdit)} // Uncomment and implement this function
                            className="rounded-md text-2xl tracking-wide w-[80%] text-black shadow-sm p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            placeholder="description"
                            type="text"
                            name="description"
                            value={editPage.description[langEdit]}
                            onChange={(e) => handleTextInputChange(e, langEdit)}
                            className="rounded-md text-md tracking-wide w-[60%] text-black shadow-sm p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <EditTabContainer
                        tabs={editPage.tabs}
                        handleInputChange={handleTabChange}
                        handleTabAdd={handleTabAdd}
                        handleTabDelete={handleTabDelete}
                        langEdit={langEdit}
                    ></EditTabContainer>
                </form>
                <ImageDropdown
                    handleImageChange={handleImageInputChange}
                    selectedImage={editPage.backgroundImage}
                    className="absolute top-28 right-2 z-10"
                />
                <Button
                    buttonType={ButtonType.CANCEL}
                    onClick={closeDialog}
                    className="absolute top-1 right-2"
                >
                    X
                </Button>
                <Button
                    onClick={handleSubmit}
                    buttonType={ButtonType.CONFIRM}
                    className="absolute top-1 right-14"
                >
                    {SharedPromptsTranslations.save[lang]}
                </Button>

                <LanguageEditToggle
                    handleLanguageChange={(lang: Language) => {
                        setLang(lang);
                    }}
                    language={Language.FR}
                    className="absolute top-14 right-3"
                ></LanguageEditToggle>
            </div>
        </div>
    );
}

interface LanguageEditToggleProps {
    handleLanguageChange: (language: Language) => void;
    language: Language;
    className?: string;
}

function LanguageEditToggle({
    handleLanguageChange,
    language,
    className = '',
}: LanguageEditToggleProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Get the keys from the Language object
    const languages = Object.keys(Language);

    // Update active index whenever the `language` prop changes
    useEffect(() => {
        const index = languages.findIndex((lang) => lang === language);
        setActiveIndex(index);
    }, [language]);

    return (
        <div
            className={`flex flex-row bg-logo-dark-blue rounded-xl space-x-1 w-fit h-10 items-center ${className}`}
        >
            {languages.map((lang, index) => {
                const isActive = index === activeIndex;
                return (
                    <div
                        key={index}
                        className={`cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center ${
                            isActive
                                ? 'bg-white text-black scale-110 font-bold'
                                : 'bg-logo-dark-blue text-white'
                        } transition-colors duration-300`}
                        onClick={() => {
                            setActiveIndex(index); // Update the active index
                            handleLanguageChange(lang); // Trigger language change on click
                        }}
                    >
                        <p>{lang}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default LanguageEditToggle;

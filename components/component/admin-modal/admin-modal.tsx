import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import Button from '../buttons/button';
import { useEffect, useRef, useState } from 'react';
import { EditTabContainer } from '../tab/edit-tab-container';
import { TabContent } from '@/components/interface/tab-content';
import { StudyOrigin, StudyYears } from '@/components/enums/data-types-enum';
import Image from 'next/image';
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

    const [binaryString, setBinaryString] = useState<any>('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditPage((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

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
                className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[95%] h-[95%] relative"
            >
                <form className="w-full h-full flex flex-col overflow-auto">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center w-full">
                            <label className="text-black dark:text-white text-xs">
                                {Language.FR}
                            </label>
                            <input
                                type="text"
                                placeholder="titre"
                                name="title"
                                value={editPage.title[Language.FR]}
                                onChange={(e) =>
                                    handleTextInputChange(e, Language.FR)
                                } // Uncomment and implement this function
                                className="rounded-md text-2xl m-2 tracking-wide w-[80%] text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-row items-center w-full">
                            <label className="text-black dark:text-white text-xs">
                                {Language.EN}
                            </label>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                value={editPage.title[Language.EN]}
                                onChange={(e) =>
                                    handleTextInputChange(e, Language.EN)
                                } // Uncomment and implement this function
                                className="rounded-md text-2xl m-2 tracking-wide w-[80%] text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center w-full">
                            <label className="text-black dark:text-white text-xs">
                                {Language.FR}
                            </label>
                            <input
                                placeholder="description"
                                type="text"
                                name="description"
                                value={editPage.description[Language.FR]}
                                onChange={(e) =>
                                    handleTextInputChange(e, Language.FR)
                                }
                                className="rounded-md text-md m-2 tracking-wide w-[60%] text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-row items-center w-full">
                            <label className="text-black dark:text-white text-xs">
                                {Language.EN}
                            </label>
                            <input
                                placeholder="description"
                                type="text"
                                name="description"
                                value={editPage.description[Language.EN]}
                                onChange={(e) =>
                                    handleTextInputChange(e, Language.EN)
                                }
                                className="rounded-md text-md m-2 tracking-wide w-[60%] text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-baseline">
                        <ImageDropdown
                            handleImageChange={handleImageInputChange}
                        />
                    </div>
                    <EditTabContainer
                        tabs={editPage.tabs}
                        handleInputChange={handleTabChange}
                        handleTabAdd={handleTabAdd}
                        handleTabDelete={handleTabDelete}
                    ></EditTabContainer>
                </form>
                <Button
                    buttonType={ButtonType.CANCEL}
                    onClick={closeDialog}
                    className="absolute top-1 right-1"
                >
                    X
                </Button>
                <Button
                    onClick={handleSubmit}
                    buttonType={ButtonType.CONFIRM}
                    className="absolute top-1 right-14  "
                >
                    {SharedPromptsTranslations.save[lang]}
                </Button>
            </div>
        </div>
    );
}

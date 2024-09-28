import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import Button from '../buttons/button';
import { useEffect, useRef, useState } from 'react';
import { EditTabContainer } from '../tab/edit-tab-container';
import { TabContent } from '@/components/interface/tab-content';
import { DataBaseOrigin } from '@/components/enums/data-types-enum';
import Image from 'next/image';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

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

    const [binaryString, setBinaryString] = useState<any>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditPage((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    useEffect(() => {
        if (binaryString) {
            setEditPage((prev) =>
                prev ? { ...prev, ['backgroundImage']: binaryString } : prev,
            );
        }
    }, [binaryString]);

    const handleImageUpload = (file: File | null) => {
        if (!file) {
            setBinaryString(null);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            // Get binary string (Base64 encoded)
            const base64Data = reader.result as string;
            const binaryData = base64Data.split(',')[1]; // Get the binary part from data URL
            setBinaryString(binaryData);
        };
        reader.readAsDataURL(file);
    };

    const getImageSRC = () => {
        if (!binaryString) return '';
        return `data:image/jpeg;base64,${binaryString}`; // Replace "jpeg" with the correct image format if necessary
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
            tabType: DataBaseOrigin.INDEX_VOLETA,
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
    }, []);

    return (
        <div className="fixed z-40 h-[100%] backdrop-blur-md flex items-center justify-center w-full overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[95%] h-[95%] relative"
                style={{
                    backgroundImage: `url(${isDarkMode ? '/images/carte_admin.png' : '/images/carte_admin_light.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
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
                        <div className="flex flex-row items-center">
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
                                className="rounded-md text-2xl m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
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
                                className="rounded-md text-md m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-row items-center">
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
                                className="rounded-md text-md m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {binaryString && (
                            <Image
                                src={getImageSRC()}
                                alt="Uploaded Image"
                                width={200}
                                height={200}
                                className="m-4"
                            />
                        )}
                        <ImageUpload
                            onImageUpload={handleImageUpload}
                            className="absolute top-[30%] right-[18%]"
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

interface ImageUploadProps {
    onImageUpload: (file: File | null) => void;
    className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageUpload,
    className,
}) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
        onImageUpload(file); // Pass the file back to parent component
    };

    return (
        <div
            className={`image-upload-container ${className} flex flex-col items-center`}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 mt-2"
            />
        </div>
    );
};

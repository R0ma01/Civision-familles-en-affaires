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

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [binaryString, setBinaryString] = useState<any>(null);

    function uploadFile(file: File | null) {
        var file = file;
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('Encoded Base 64 File String:', reader.result);

            /******************* for Binary ***********************/
            var data = reader.result?.split(',')[1];
            var binaryBlob = atob(data);
            setBinaryString(binaryBlob);
            console.log('Encoded Binary File String:', binaryBlob);
        };
        reader.readAsDataURL(file);
    }

    const handleImageUpload = (file: File | null) => {
        setUploadedImage(file);
        console.log(file);
        uploadFile(file);
        const updatedPage = { ...editPage };
        updatedPage.backgroundImage = file ? file.name : '';
        setEditPage(updatedPage);
        // Perform further actions, like uploading the file to a server, etc.
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditPage((prev) => (prev ? { ...prev, [name]: value } : prev));
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
            description: '',
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
                    <input
                        type="text"
                        name="title"
                        value={editPage.title}
                        onChange={handleInputChange} // Uncomment and implement this function
                        className="rounded-md text-2xl m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="description"
                        value={editPage.description}
                        onChange={handleInputChange}
                        className="rounded-md text-md m-2 tracking-wide text-black shadow-sm mb-2 p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ImageUpload
                        onImageUpload={handleImageUpload}
                        className="absolute top-[30%] right-[18%]"
                        imageURL={editPage.backgroundImage ?? null}
                    />
                    {binaryString && (
                        <div>
                            <textarea
                                value={binaryString}
                                readOnly
                                rows={10}
                                cols={50}
                            />
                        </div>
                    )}
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
    label?: string;
    className?: string;
    imageURL?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageUpload,
    label = 'Upload Image',
    className = '',
    imageURL = null,
}) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(imageURL);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            onImageUpload(file); // Send the file back to parent component
        } else {
            setSelectedImage(null);
            setImagePreview(null);
            onImageUpload(null); // Clear the uploaded file if no file is selected
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        onImageUpload(null);
    };

    return (
        <div
            className={`image-upload-container ${className} w-72 flex flex-col items-center`}
        >
            {/* Display image preview */}
            {imagePreview && (
                <div className="relative max-w-[245px] m-1">
                    <Image
                        src={imagePreview}
                        alt="Selected"
                        className="w-full h-auto max-h-xs max-w-xs object-cover"
                        width={200}
                        height={200}
                    />
                    <button
                        onClick={clearImage}
                        className="absolute -top-3 -right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                    >
                        X
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 mt-2"
            />
        </div>
    );
};

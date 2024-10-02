import { useEffect, useState } from 'react';
import axios from 'axios';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';

interface ImageDropDownProps {
    handleImageChange: (imagePath: string) => void;
    selectedImage: string;
    className?: string;
}

const ImageDropdown = ({
    handleImageChange,
    selectedImage,
    className = '',
}: ImageDropDownProps) => {
    const [images, setImages] = useState<string[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const lang: Language = useDataStore((state) => state.lang);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/api/images');
                setImages(response.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleSelectImage = (image: string) => {
        setIsOpen(false);
        handleImageChange(image);
    };

    return (
        <div className={`${className}`}>
            <div className={`flex flex-col items-center relative`}></div>{' '}
            {/* Ensure parent has relative positioning */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="mb-4 p-3 border rounded bg-gray-200 flex flex-row items-center"
            >
                {selectedImage !== '' ? (
                    <div className="flex items-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-20 h-20 object-cover mr-2"
                        />
                    </div>
                ) : (
                    SharedPromptsTranslations.image[lang]
                )}
                {isOpen ? (
                    <div>
                        {/* Content to show when dropdown is open */}
                        <p>▼</p>
                    </div>
                ) : (
                    <div>
                        {/* Content to show when dropdown is closed */}
                        <p>▲</p>
                    </div>
                )}
            </button>
            {isOpen && (
                <ul className="absolute top-28 w-32 border rounded bg-white shadow-md max-h-64 overflow-y-auto z-30">
                    {images.length > 0 &&
                        images.map((image, index) => {
                            if (selectedImage !== image) {
                                return (
                                    <li
                                        key={index}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSelectImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={image}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </li>
                                );
                            }
                        })}
                </ul>
            )}
        </div>
    );
};

export default ImageDropdown;

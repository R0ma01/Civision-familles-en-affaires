import { useEffect, useState } from 'react';
import axios from 'axios';

interface ImageDropDownProps {
    handleImageChange: (imagePath: string) => void;
}

const ImageDropdown = ({ handleImageChange }: ImageDropDownProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

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
        setSelectedImage(image);
        setIsOpen(false);
        handleImageChange(image);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="mb-4 p-2 border rounded bg-gray-200"
            >
                {selectedImage ? (
                    <div className="flex items-center">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-8 h-8 object-cover mr-2"
                        />
                        <span>{selectedImage.split('/').pop()}</span>
                    </div>
                ) : (
                    'Select an image'
                )}
            </button>

            {isOpen && (
                <ul className="border rounded bg-white shadow-md max-h-64 overflow-y-auto">
                    {images.length > 0 &&
                        images.map((image, index) => (
                            <li
                                key={index}
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSelectImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={image}
                                    className="w-12 h-12 object-cover mr-2"
                                />
                                <span>{image.split('/').pop()}</span>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default ImageDropdown;

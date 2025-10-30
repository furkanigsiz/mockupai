import React, { useRef } from 'react';
import type { UploadedImage } from '../types';
import { processFile } from '../utils/fileUtils';
import UploadIcon from './icons/UploadIcon';
import { useTranslations } from '../hooks/useTranslations';
import XIcon from './icons/XIcon';

interface ImageUploaderProps {
  onImagesChange: (images: UploadedImage[]) => void;
  uploadedImages: UploadedImage[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange, uploadedImages }) => {
  const { t } = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        const processedFiles = await Promise.all(Array.from(files).map(processFile));
        onImagesChange([...uploadedImages, ...processedFiles]);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    }
     if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onImagesChange(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{t('uploader_title')}</label>
      <div className="flex flex-col gap-4">
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {uploadedImages.map((image, index) => (
              <div key={`${image.name}-${index}`} className="relative group">
                <img src={image.previewUrl} alt={image.name} className="w-full h-24 object-cover rounded-md border-2 border-gray-700" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs text-center px-1 truncate">{image.name}</p>
                </div>
                 <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition-all z-10"
                    aria-label={`Remove ${image.name}`}
                >
                    <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div
          onClick={handleContainerClick}
          className={`group flex justify-center items-center w-full ${uploadedImages.length > 0 ? 'h-24' : 'h-64'} bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-300`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-500 group-hover:text-indigo-400 transition-colors" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">{uploadedImages.length > 0 ? t('uploader_add_more') : t('uploader_cta_multi')}</span> {uploadedImages.length === 0 ? t('uploader_cta_alt') : ''}
            </p>
            <p className="text-xs text-gray-500">{t('uploader_file_types')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

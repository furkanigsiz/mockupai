import React, { useRef } from 'react';
import type { UploadedImage } from '../types';
import { processFile } from '../utils/fileUtils';
import UploadIcon from './icons/UploadIcon';
import { useTranslations } from '../hooks/useTranslations';
import XIcon from './icons/XIcon';

interface DesignUploaderProps {
  onDesignChange: (image: UploadedImage | null) => void;
  design: UploadedImage | null;
}

const DesignUploader: React.FC<DesignUploaderProps> = ({ onDesignChange, design }) => {
  const { t } = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const processedFile = await processFile(file);
        onDesignChange(processedFile);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    onDesignChange(null);
  };

  const handleContainerClick = () => {
    if (!design) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{t('design_uploader_title')}</label>
      {design ? (
        <div className="relative group">
          <img src={design.previewUrl} alt={design.name} className="w-full h-40 object-contain rounded-md border-2 border-gray-700 bg-gray-800 p-2" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs text-center px-1 truncate">{design.name}</p>
          </div>
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition-all z-10"
            aria-label={`Remove ${design.name}`}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleContainerClick}
          className="group flex justify-center items-center w-full h-40 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-300"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-500 group-hover:text-indigo-400 transition-colors" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">{t('design_uploader_cta')}</span>
            </p>
            <p className="text-xs text-gray-500">{t('uploader_file_types')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignUploader;

import React, { useRef } from 'react';
import type { UploadedImage } from '../types';
import { processFile } from '../utils/fileUtils';
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-neutral-dark dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">{t('step_1_title')}</h2>
      
      {design ? (
        <div className="p-4">
          <div className="relative group bg-neutral-light dark:bg-white/5 rounded-lg p-4">
            <img src={design.previewUrl} alt={design.name} className="w-full h-40 object-contain" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <p className="text-white text-sm text-center px-2 truncate">{design.name}</p>
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-500 transition-all z-10"
              aria-label={`Remove ${design.name}`}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-4">
          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-neutral-medium/40 px-6 py-14 bg-background-light dark:bg-white/5">
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-neutral-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">{t('design_uploader_cta_title')}</p>
              <p className="text-neutral-medium text-sm font-normal leading-normal max-w-[480px] text-center">{t('design_uploader_cta_subtitle')}</p>
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">{t('design_uploader_cta_button')}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignUploader;

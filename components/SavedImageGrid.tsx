import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import TrashIcon from './icons/TrashIcon';
import { useTranslations } from '../hooks/useTranslations';
import { downloadImage } from '../utils/fileUtils';

interface SavedImageGridProps {
  images: string[];
  onRemoveImage: (base64Image: string) => void;
  onImageClick: (base64Image: string) => void;
}

const SavedImageGrid: React.FC<SavedImageGridProps> = ({ images, onRemoveImage, onImageClick }) => {
  const { t } = useTranslations();

  const handleDownloadAll = () => {
    images.forEach((img, index) => {
      // Add a small delay between downloads to prevent the browser from blocking them
      setTimeout(() => {
        downloadImage(img, `saved_mockup_${index + 1}.png`);
      }, index * 200);
    });
  };

  return (
    <div className="w-full bg-neutral-light dark:bg-neutral-dark/40 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-neutral-dark dark:text-gray-100">{t('saved_grid_title')}</h2>
        {images.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-md bg-neutral-light dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            {t('download_all_button')}
          </button>
        )}
      </div>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg bg-gray-800 cursor-pointer"
              onClick={() => onImageClick(img)}
            >
              <img src={`data:image/png;base64,${img}`} alt={`Saved Mockup ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(img, `saved_mockup_${index + 1}.png`);
                  }}
                  className="flex items-center gap-2 bg-black/50 text-white backdrop-blur-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary"
                  title={t('download_button')}
                >
                  <DownloadIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(img);
                  }}
                  className="flex items-center gap-2 bg-red-600/80 text-white backdrop-blur-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
                  title={t('remove_button')}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[150px] border-2 border-dashed border-neutral-medium/40 rounded-lg text-center p-4">
            <p className="text-sm text-neutral-medium">{t('saved_grid_placeholder')}</p>
        </div>
      )}
    </div>
  );
};

export default SavedImageGrid;
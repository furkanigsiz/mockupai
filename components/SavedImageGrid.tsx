import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import TrashIcon from './icons/TrashIcon';
import { useTranslations } from '../hooks/useTranslations';

interface SavedImageGridProps {
  images: string[];
  onRemoveImage: (base64Image: string) => void;
  onImageClick: (base64Image: string) => void;
}

const SavedImageGrid: React.FC<SavedImageGridProps> = ({ images, onRemoveImage, onImageClick }) => {
  const { t } = useTranslations();

  const downloadImage = (base64Image: string, index: number) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Image}`;
    link.download = `saved_mockup_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-gray-900/50 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-gray-100 mb-4">{t('saved_grid_title')}</h2>
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
                    downloadImage(img, index);
                  }}
                  className="flex items-center gap-2 bg-gray-700/80 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                  title={t('download_button')}
                >
                  <DownloadIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(img);
                  }}
                  className="flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
                  title={t('remove_button')}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[150px] border-2 border-dashed border-gray-700 rounded-lg text-center p-4">
            <p className="text-sm text-gray-500">{t('saved_grid_placeholder')}</p>
        </div>
      )}
    </div>
  );
};

export default SavedImageGrid;

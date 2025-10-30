import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import Spinner from './Spinner';
import { useTranslations } from '../hooks/useTranslations';
import StarIcon from './icons/StarIcon';
import { BatchResult } from '../types';
import SceneIcon from './icons/SceneIcon';

interface GeneratedImageGridProps {
  results: BatchResult[];
  isLoading: boolean;
  error: string | null;
  onImageClick: (base64Image: string) => void;
  savedImages: string[];
  onSaveImage: (base64Image: string) => void;
  progressText?: string;
  onUseInScene?: (base64Image: string) => void;
  showUseInSceneButton?: boolean;
}

const GeneratedImageGrid: React.FC<GeneratedImageGridProps> = ({ results, isLoading, error, onImageClick, savedImages, onSaveImage, progressText, onUseInScene, showUseInSceneButton }) => {
  const { t } = useTranslations();

  const downloadImage = (base64Image: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Image}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <Spinner progressText={progressText} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full min-h-[400px] bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-red-300">{t('error_title')}</h3>
              <p className="mt-2 text-sm text-red-400 max-w-md mx-auto">{error}</p>
          </div>
        </div>
      );
    }

    if (results.length > 0) {
      return (
        <div className="space-y-8">
          {results.map((result, resultIndex) => (
            <div key={resultIndex} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                    <img src={result.source.previewUrl} alt={result.source.name} className="w-12 h-12 object-cover rounded-md border-2 border-gray-700" />
                    <span className="font-semibold text-gray-300 truncate" title={result.source.name}>{result.source.name}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.generated.map((img, index) => {
                    const isSaved = savedImages.includes(img);
                    return (
                    <div 
                        key={`${resultIndex}-${index}`} 
                        className="group relative aspect-square overflow-hidden rounded-lg shadow-lg bg-gray-800 cursor-pointer"
                        onClick={() => onImageClick(img)}
                    >
                        <img src={`data:image/png;base64,${img}`} alt={`Generated Mockup ${index + 1} for ${result.source.name}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2">
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(img, `mockup_${result.source.name}_${index + 1}.png`);
                            }}
                            className="flex items-center gap-2 bg-gray-700/80 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                            title={t('download_button')}
                        >
                            <DownloadIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            onSaveImage(img);
                            }}
                            disabled={isSaved}
                            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-yellow-500 disabled:cursor-default"
                            title={isSaved ? t('saved_button') : t('save_button')}
                        >
                            <StarIcon className={`h-5 w-5 ${isSaved ? 'text-yellow-400' : ''}`} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                        {showUseInSceneButton && onUseInScene && (
                             <button
                                onClick={(e) => {
                                e.stopPropagation();
                                onUseInScene(img);
                                }}
                                className="flex items-center gap-2 bg-teal-600 text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
                                title={t('use_in_scene_button')}
                            >
                                <SceneIcon className="h-5 w-5" />
                            </button>
                        )}
                        </div>
                    </div>
                    )})}
                </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-gray-700 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-lg text-gray-500">{t('grid_batch_placeholder_title')}</p>
        <p className="text-sm text-gray-600">{t('grid_batch_placeholder_description')}</p>
      </div>
    );
  };
  
  return (
    <div className="w-full bg-gray-900/50 rounded-lg p-6 border border-gray-800">
       <h2 className="text-xl font-bold text-gray-100 mb-4">{t('grid_title')}</h2>
       {renderContent()}
    </div>
  )

};

export default GeneratedImageGrid;
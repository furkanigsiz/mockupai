import React, { useState, useCallback, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import GeneratedImageGrid from './components/GeneratedImageGrid';
import ImageModal from './components/ImageModal';
import SavedImageGrid from './components/SavedImageGrid';
import ProjectManager from './components/ProjectManager';
import BrandKit from './components/BrandKit';
import PromptTemplates from './components/PromptTemplates';
import { UploadedImage, BatchResult, Project, BrandKit as BrandKitType, PromptTemplate, AppMode } from './types';
import { generateMockup, suggestPromptsForImage } from './services/geminiService';
import { useTranslations } from './hooks/useTranslations';
import { applyWatermark } from './utils/imageUtils';
import { base64ToFile, processFile } from './utils/fileUtils';
import SparklesIcon from './components/icons/SparklesIcon';
import LanguageSwitcher from './components/LanguageSwitcher';
import SaveIcon from './components/icons/SaveIcon';
import Spinner from './components/Spinner';
import ModeSwitcher from './components/ModeSwitcher';
import ProductSelector, { ProductType } from './components/ProductSelector';
import DesignUploader from './components/DesignUploader';

const DEFAULT_BRAND_KIT: BrandKitType = {
  logo: null,
  useWatermark: false,
  colors: [],
};

const PRODUCT_COLORS = ['White', 'Black', 'Gray', 'Navy', 'Red', 'Green'];

function App() {
  const { t } = useTranslations();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [brandKit, setBrandKit] = useState<BrandKitType>(DEFAULT_BRAND_KIT);
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplate[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [progressText, setProgressText] = useState<string>('');
  const [currentResults, setCurrentResults] = useState<BatchResult[]>([]);
  
  const [mode, setMode] = useState<AppMode>('scene');
  // State for Product Mockup mode
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('t-shirt');
  const [designImage, setDesignImage] = useState<UploadedImage | null>(null);
  const [productColor, setProductColor] = useState<string>('White');
  const [stylePrompt, setStylePrompt] = useState('');
  
  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('mockupProjects');
      const savedProjectId = localStorage.getItem('mockupCurrentProjectId');
      const savedBrandKit = localStorage.getItem('mockupBrandKit');
      const savedTemplates = localStorage.getItem('mockupPromptTemplates');

      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
      if (savedBrandKit) {
        setBrandKit(JSON.parse(savedBrandKit));
      }
      if (savedTemplates) {
        setPromptTemplates(JSON.parse(savedTemplates));
      }
      
      const projectsData = savedProjects ? JSON.parse(savedProjects) : [];
      if (savedProjectId && projectsData.some((p: Project) => p.id === savedProjectId)) {
        setCurrentProjectId(savedProjectId);
      } else if (projectsData.length > 0) {
        setCurrentProjectId(projectsData[0].id);
      } else {
        // Create a default project if none exist
        const newProject: Project = { id: Date.now().toString(), name: t('default_project_name'), uploadedImages: [], prompt: '', aspectRatio: '1:1', savedImages: [], suggestedPrompts: [] };
        setProjects([newProject]);
        setCurrentProjectId(newProject.id);
      }

    } catch (e) {
      console.error("Failed to load data from localStorage", e);
      // If loading fails, create a default project
      if (projects.length === 0) {
        const newProject: Project = { id: Date.now().toString(), name: t('default_project_name'), uploadedImages: [], prompt: '', aspectRatio: '1:1', savedImages: [], suggestedPrompts: [] };
        setProjects([newProject]);
        setCurrentProjectId(newProject.id);
      }
    }
  }, [t]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mockupProjects', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    if (currentProjectId) localStorage.setItem('mockupCurrentProjectId', currentProjectId);
  }, [currentProjectId]);
  useEffect(() => {
    localStorage.setItem('mockupBrandKit', JSON.stringify(brandKit));
  }, [brandKit]);
  useEffect(() => {
    localStorage.setItem('mockupPromptTemplates', JSON.stringify(promptTemplates));
  }, [promptTemplates]);
  
  // Clear results when project changes to avoid showing stale data
  useEffect(() => {
    setCurrentResults([]);
    setError(null);
  }, [currentProjectId]);


  const currentProject = projects.find(p => p.id === currentProjectId);

  const updateCurrentProject = useCallback((updates: Partial<Project>) => {
    if (!currentProjectId) return;
    setProjects(prevProjects => prevProjects.map(p => p.id === currentProjectId ? { ...p, ...updates } : p));
  }, [currentProjectId]);
  
  const aspectRatios = [
    { value: '1:1', label: 'aspect_ratio_square' },
    { value: '16:9', label: 'aspect_ratio_landscape' },
    { value: '9:16', label: 'aspect_ratio_portrait' },
  ] as const;

  const handleSceneGenerate = useCallback(async () => {
    if (!currentProject || currentProject.uploadedImages.length === 0 || !currentProject.prompt.trim()) {
      setError(t('error_no_image_or_prompt'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentResults([]);
    updateCurrentProject({ suggestedPrompts: [] });

    const newResults: BatchResult[] = [];
    const fullPrompt = `${currentProject.prompt} (Image aspect ratio: ${currentProject.aspectRatio})`;

    for (let i = 0; i < currentProject.uploadedImages.length; i++) {
        const image = currentProject.uploadedImages[i];
        setProgressText(t('progress_text_generating', { current: i + 1, total: currentProject.uploadedImages.length, fileName: image.name }) as string);
        try {
            let generated = await generateMockup(fullPrompt, image.base64, image.type);

            if (brandKit.useWatermark && brandKit.logo) {
                generated = await Promise.all(
                    generated.map(g => applyWatermark(g, brandKit.logo!))
                );
            }

            newResults.push({ source: image, generated });
        } catch (e: any) {
            setError(e.message || t('error_unknown'));
            setIsLoading(false);
            return;
        }
    }
    
    setCurrentResults(newResults);
    setIsLoading(false);
    setProgressText('');
  }, [currentProject, brandKit, t, updateCurrentProject]);

  const handleProductGenerate = useCallback(async () => {
    if (!selectedProduct || !designImage) {
      setError(t('error_no_product_or_design'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentResults([]);
    setProgressText(t('progress_text_generating', { current: 1, total: 1, fileName: designImage.name }) as string);

    let prompt = `Place the uploaded design onto a high-quality, photorealistic mockup of a ${productColor} ${selectedProduct.replace('-', ' ')}.`;
    if (stylePrompt.trim()) {
      prompt += ` The style should be: ${stylePrompt.trim()}.`;
    }
    prompt += ` Ensure the design is clearly visible and naturally integrated onto the product. The background should be clean and simple.`;

    try {
      let generated = await generateMockup(prompt, designImage.base64, designImage.type);
      if (brandKit.useWatermark && brandKit.logo) {
          generated = await Promise.all(
              generated.map(g => applyWatermark(g, brandKit.logo!))
          );
      }
      const newResult: BatchResult = { source: designImage, generated };
      setCurrentResults([newResult]);
    } catch (e: any) {
        setError(e.message || t('error_unknown'));
    } finally {
        setIsLoading(false);
        setProgressText('');
    }
  }, [selectedProduct, designImage, productColor, stylePrompt, brandKit, t, updateCurrentProject]);

  const handleSuggestPrompts = useCallback(async () => {
    if (!currentProject || currentProject.uploadedImages.length === 0) {
        setError(t('error_no_image_for_suggestions'));
        return;
    }
    setIsSuggesting(true);
    setError(null);
    updateCurrentProject({ suggestedPrompts: [] });
    try {
        const firstImage = currentProject.uploadedImages[0];
        const suggestions = await suggestPromptsForImage(firstImage.base64, firstImage.type, t('prompt_suggestion_base') as string);
        updateCurrentProject({ suggestedPrompts: suggestions });
    } catch(e: any) {
        setError(e.message || t('error_suggestions_failed'));
    } finally {
        setIsSuggesting(false);
    }
  }, [currentProject, t, updateCurrentProject]);

  const handleSaveImage = (base64Image: string) => {
    if (currentProject && !currentProject.savedImages.includes(base64Image)) {
      updateCurrentProject({ savedImages: [...currentProject.savedImages, base64Image] });
    }
  };

  const handleRemoveSavedImage = (base64Image: string) => {
    if (currentProject) {
      updateCurrentProject({ savedImages: currentProject.savedImages.filter(img => img !== base64Image) });
    }
  };
  
  const handleSavePrompt = () => {
    if (currentProject && currentProject.prompt.trim() && !promptTemplates.some(p => p.text === currentProject.prompt)) {
      setPromptTemplates([...promptTemplates, { id: Date.now().toString(), text: currentProject.prompt }]);
    }
  };

  const handleUseInScene = async (base64Image: string) => {
    if (!currentProject) return;

    const fileName = `mockup_${Date.now()}.png`;
    const imageFile = base64ToFile(base64Image, fileName, 'image/png');
    const uploadedImage = await processFile(imageFile);

    updateCurrentProject({
        uploadedImages: [...currentProject.uploadedImages, uploadedImage]
    });

    setMode('scene');
  };

  const handleGenerateClick = mode === 'scene' ? handleSceneGenerate : handleProductGenerate;
  const isGenerateDisabled = isLoading || (mode === 'scene'
    ? (!currentProject || currentProject.uploadedImages.length === 0 || !currentProject.prompt.trim())
    : (!selectedProduct || !designImage));

  if (!currentProject) {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
            <Spinner progressText={t('loading_project')} />
        </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold text-gray-100">{t('app_title')}</h1>
                <LanguageSwitcher />
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ModeSwitcher currentMode={mode} onModeChange={setMode} />
            <ProjectManager projects={projects} setProjects={setProjects} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId} />
            
            {mode === 'scene' ? (
              <>
                <ImageUploader onImagesChange={(images) => updateCurrentProject({ uploadedImages: images })} uploadedImages={currentProject.uploadedImages} />
                <div className="space-y-2">
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">{t('prompt_label')}</label>
                    <div className="relative">
                        <textarea
                        id="prompt"
                        value={currentProject.prompt}
                        onChange={(e) => updateCurrentProject({ prompt: e.target.value })}
                        placeholder={t('prompt_placeholder') as string}
                        rows={4}
                        className="w-full bg-gray-800 border-2 border-gray-700 rounded-md p-3 pr-10 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button onClick={handleSavePrompt} title={t('save_prompt_button')} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled={!currentProject.prompt.trim() || promptTemplates.some(p => p.text === currentProject.prompt)}>
                            <SaveIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <PromptTemplates templates={promptTemplates} setTemplates={setPromptTemplates} onSelectTemplate={(text) => updateCurrentProject({ prompt: text })} />
                <div className="space-y-2">
                    <button onClick={handleSuggestPrompts} disabled={isSuggesting || currentProject.uploadedImages.length === 0} className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <SparklesIcon className="h-4 w-4" />
                        {isSuggesting ? t('suggest_button_loading') : t('suggest_button')}
                    </button>
                    {currentProject.suggestedPrompts.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {currentProject.suggestedPrompts.map((p, i) => (
                                <button key={i} onClick={() => updateCurrentProject({ prompt: p })} className="text-xs text-left p-2 bg-gray-800 hover:bg-gray-700/80 rounded-md transition-colors truncate" title={p}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('aspect_ratio_label')}</label>
                    <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map(ratio => (
                        <button key={ratio.value} onClick={() => updateCurrentProject({ aspectRatio: ratio.value })} className={`py-2 px-3 text-sm font-semibold rounded-md transition-colors ${currentProject.aspectRatio === ratio.value ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                        {t(ratio.label)}
                        </button>
                    ))}
                    </div>
                </div>
              </>
            ) : (
              <>
                <ProductSelector selectedProduct={selectedProduct} onSelectProduct={setSelectedProduct} />
                <DesignUploader design={designImage} onDesignChange={setDesignImage} />
                <div className="w-full bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-4">
                    <h3 className="text-base font-bold text-gray-100">{t('customize_section_title')}</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t('color_label')}</label>
                        <div className="flex flex-wrap gap-2">
                            {PRODUCT_COLORS.map(color => (
                                <button key={color} onClick={() => setProductColor(color)} className={`px-3 py-1 text-sm rounded-full border-2 ${productColor === color ? 'border-indigo-500 bg-indigo-900/50 text-white' : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'}`} >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label htmlFor="style-prompt" className="block text-sm font-medium text-gray-300">{t('style_prompt_label')}</label>
                        <input
                            id="style-prompt"
                            type="text"
                            value={stylePrompt}
                            onChange={(e) => setStylePrompt(e.target.value)}
                            placeholder={t('style_prompt_placeholder') as string}
                            className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
              </>
            )}
            
            <BrandKit brandKit={brandKit} setBrandKit={setBrandKit} />

            <div className="space-y-4 pt-4 border-t border-gray-800">
                <button
                onClick={handleGenerateClick}
                disabled={isGenerateDisabled}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-500 disabled:bg-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-all text-lg"
                >
                {isLoading ? t('generate_button_loading') : t('generate_button')}
                </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <GeneratedImageGrid 
              results={currentResults}
              isLoading={isLoading}
              error={error}
              onImageClick={setSelectedImage}
              savedImages={currentProject.savedImages}
              onSaveImage={handleSaveImage}
              progressText={progressText}
              onUseInScene={handleUseInScene}
              showUseInSceneButton={mode === 'product'}
            />
            {currentProject.savedImages.length > 0 && (
              <SavedImageGrid
                images={currentProject.savedImages}
                onRemoveImage={handleRemoveSavedImage}
                onImageClick={setSelectedImage}
              />
            )}
          </div>
        </div>
      </main>

      <ImageModal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;
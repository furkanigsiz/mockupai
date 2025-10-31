import React, { useState, useCallback, useEffect } from 'react';
import GeneratedImageGrid from './components/GeneratedImageGrid';
import ImageModal from './components/ImageModal';
import SavedImageGrid from './components/SavedImageGrid';
import { UploadedImage, BatchResult, Project, BrandKit as BrandKitType, PromptTemplate, AppMode, ProductTemplate } from './types';
import { generateMockup, suggestPromptsForImage } from './services/geminiService';
import { useTranslations } from './hooks/useTranslations';
import { applyWatermark } from './utils/imageUtils';
import { base64ToFile, processFile } from './utils/fileUtils';
import Spinner from './components/Spinner';
import LandingPage from './components/LandingPage';
import AppHeader from './components/AppHeader';
import GalleryPage from './components/GalleryPage';
import { StylePreset } from './components/StyleSelector';
import GeneratorControls from './components/GeneratorControls';

const DEFAULT_BRAND_KIT: BrandKitType = {
  logo: null,
  useWatermark: false,
  colors: [],
};

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
  const [selectedProduct, setSelectedProduct] = useState<ProductTemplate | null>(null);
  const [designImage, setDesignImage] = useState<UploadedImage | null>(null);
  const [productColor, setProductColor] = useState<string>('White');
  const [productStyle, setProductStyle] = useState<StylePreset>('Studio');
  const [stylePrompt, setStylePrompt] = useState('');

  const [showApp, setShowApp] = useState(false);
  const [mainView, setMainView] = useState<'generator' | 'gallery'>('generator');
  
  // Load data from localStorage on initial render
  useEffect(() => {
    let loadedProjects: Project[] = [];
    let loadedProjectId: string | null = null;

    try {
      const savedProjectsJSON = localStorage.getItem('mockupProjects');
      const savedProjectId = localStorage.getItem('mockupCurrentProjectId');
      const savedBrandKit = localStorage.getItem('mockupBrandKit');
      const savedTemplates = localStorage.getItem('mockupPromptTemplates');

      if (savedProjectsJSON) {
        const parsedProjects = JSON.parse(savedProjectsJSON);
        loadedProjects = parsedProjects.map((p: Partial<Project>): Project => ({
          id: p.id || `${Date.now()}-${Math.random()}`,
          name: p.name || 'Untitled Project',
          uploadedImages: [], // Never load from storage
          prompt: p.prompt || '',
          aspectRatio: p.aspectRatio || '1:1',
          savedImages: p.savedImages || [],
          suggestedPrompts: [], // Never load from storage
        }));
      }

      if (savedBrandKit) {
        setBrandKit(JSON.parse(savedBrandKit));
      }
      if (savedTemplates) {
        setPromptTemplates(JSON.parse(savedTemplates));
      }

      if (savedProjectId && loadedProjects.some(p => p.id === savedProjectId)) {
        loadedProjectId = savedProjectId;
      } else if (loadedProjects.length > 0) {
        loadedProjectId = loadedProjects[0].id;
      }

    } catch (e) {
      console.error("Failed to load data from localStorage. Data might be corrupt.", e);
      // Clear potentially corrupt data
      localStorage.removeItem('mockupProjects');
      localStorage.removeItem('mockupCurrentProjectId');
    }

    if (loadedProjects.length === 0) {
      const newProject: Project = { id: Date.now().toString(), name: t('default_project_name'), uploadedImages: [], prompt: '', aspectRatio: '1:1', savedImages: [], suggestedPrompts: [] };
      loadedProjects.push(newProject);
      loadedProjectId = newProject.id;
    }

    setProjects(loadedProjects);
    setCurrentProjectId(loadedProjectId);
  }, [t]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length === 0) return; // Don't save during initial load
    try {
      const projectsToSave = projects.map(p => {
        // Exclude transient data from being saved
        const { uploadedImages, suggestedPrompts, ...rest } = p;
        return rest;
      });
      localStorage.setItem('mockupProjects', JSON.stringify(projectsToSave));
    } catch (e) {
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.error("LocalStorage quota exceeded. Please remove some saved mockups to free up space.", e);
      } else {
        console.error("Failed to save projects to localStorage", e);
      }
    }
  }, [projects]);

  // Save other state to localStorage
  useEffect(() => {
    if (currentProjectId) {
      try {
        localStorage.setItem('mockupCurrentProjectId', currentProjectId);
      } catch (e) {
        console.error("Failed to save current project ID.", e);
      }
    }
  }, [currentProjectId]);

  useEffect(() => {
    try {
      localStorage.setItem('mockupBrandKit', JSON.stringify(brandKit));
    } catch (e) {
      console.error("Failed to save brand kit.", e);
    }
  }, [brandKit]);

  useEffect(() => {
    try {
      localStorage.setItem('mockupPromptTemplates', JSON.stringify(promptTemplates));
    } catch (e) {
      console.error("Failed to save prompt templates.", e);
    }
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

    let prompt = `Place the uploaded design onto a high-quality, photorealistic mockup of a ${productColor} ${selectedProduct.name}. The style should be: a "${productStyle}" product shot.`;
    if (stylePrompt.trim()) {
      prompt += ` Additional style notes: ${stylePrompt.trim()}.`;
    }
    prompt += ` Ensure the design is clearly visible and naturally integrated onto the product. The background should be clean and relevant to the style.`;

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
  }, [selectedProduct, designImage, productColor, productStyle, stylePrompt, brandKit, t]);

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

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }
    
  if (!currentProject) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
            <Spinner progressText={t('loading_project')} />
        </div>
    );
  }

  const renderGenerator = () => (
     <main className="flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                <p className="text-neutral-dark dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">{t('create_mockup_title')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              {/* Left Column: Controls */}
              <div className="flex flex-col gap-6">
                <GeneratorControls
                  mode={mode}
                  setMode={setMode}
                  projects={projects}
                  setProjects={setProjects}
                  currentProjectId={currentProjectId}
                  setCurrentProjectId={setCurrentProjectId}
                  currentProject={currentProject}
                  updateCurrentProject={updateCurrentProject}
                  promptTemplates={promptTemplates}
                  setPromptTemplates={setPromptTemplates}
                  handleSuggestPrompts={handleSuggestPrompts}
                  isSuggesting={isSuggesting}
                  handleSavePrompt={handleSavePrompt}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  designImage={designImage}
                  setDesignImage={setDesignImage}
                  productColor={productColor}
                  setProductColor={setProductColor}
                  productStyle={productStyle}
                  setProductStyle={setProductStyle}
                  stylePrompt={stylePrompt}
                  setStylePrompt={setStylePrompt}
                  brandKit={brandKit}
                  setBrandKit={setBrandKit}
                  isLoading={isLoading}
                  handleSceneGenerate={handleSceneGenerate}
                  handleProductGenerate={handleProductGenerate}
                />
              </div>

              {/* Right Column: Results */}
              <div className="space-y-8">
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
        </div>
      </main>
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
       {mainView !== 'gallery' && <AppHeader activeView={mainView} onNavigate={setMainView} />}

       {mainView === 'generator' 
        ? renderGenerator() 
        : <GalleryPage projects={projects} setProjects={setProjects} onNavigate={setMainView} onImageClick={setSelectedImage} />}

      <ImageModal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;
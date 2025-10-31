import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { downloadImage } from '../utils/fileUtils';
import SearchIcon from './icons/SearchIcon';
import DownloadIcon from './icons/DownloadIcon';
import TrashIcon from './icons/TrashIcon';
import GridViewIcon from './icons/GridViewIcon';
import PersonIcon from './icons/PersonIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import NotificationsIcon from './icons/NotificationsIcon';
import ExpandMoreIcon from './icons/ExpandMoreIcon';
import VisibilityIcon from './icons/VisibilityIcon';
import AddPhotoAlternateIcon from './icons/AddPhotoAlternateIcon';

type AppView = 'generator' | 'gallery';
interface GalleryPageProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onNavigate: (view: AppView) => void;
  onImageClick: (base64Image: string) => void;
}

type GalleryImage = {
    base64: string;
    projectId: string;
    projectName: string;
    date: number; // For sorting
};

const GalleryPage: React.FC<GalleryPageProps> = ({ projects, setProjects, onNavigate, onImageClick }) => {
    const { t } = useTranslations();
    const [searchTerm, setSearchTerm] = useState('');

    const allSavedImages: GalleryImage[] = useMemo(() => {
        return projects.flatMap(p => 
            p.savedImages.map((img, index) => {
                // Try to derive a date from project ID, fallback to index
                const date = parseInt(p.id.split('-')[0], 10) || Date.now() - index;
                return {
                    base64: img,
                    projectId: p.id,
                    projectName: p.name,
                    date: date,
                };
            })
        ).sort((a,b) => b.date - a.date); // Show newest first by default
    }, [projects]);
    
    const filteredImages = useMemo(() => {
        return allSavedImages.filter(image => {
            const tempName = `${image.projectName} Mockup`; // Create a name for searching
            const searchMatch = searchTerm === '' || tempName.toLowerCase().includes(searchTerm.toLowerCase());
            return searchMatch;
        });
    }, [allSavedImages, searchTerm]);

    const handleDelete = (imageToDelete: GalleryImage) => {
        setProjects(prevProjects => 
            prevProjects.map(p => {
                if (p.id === imageToDelete.projectId) {
                    return { ...p, savedImages: p.savedImages.filter(img => img !== imageToDelete.base64) };
                }
                return p;
            })
        );
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* SideNavBar */}
            <aside className="flex flex-col w-64 bg-background-light dark:bg-[#101F22] border-r border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2.5 p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="size-6 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Mockups</h2>
                </div>
                <div className="flex flex-col justify-between flex-1 p-4">
                    <div className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary" href="#">
                            <GridViewIcon className="fill-primary" fill="currentColor" />
                            <p className="text-sm font-medium leading-normal">{t('dashboard_nav_creations')}</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" href="#">
                            <PersonIcon />
                            <p className="text-sm font-medium leading-normal">{t('dashboard_nav_profile')}</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" href="#">
                            <SettingsIcon />
                            <p className="text-sm font-medium leading-normal">{t('dashboard_nav_settings')}</p>
                        </a>
                    </div>
                    <div className="flex flex-col gap-1">
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" href="#">
                            <LogoutIcon />
                            <p className="text-sm font-medium leading-normal">{t('dashboard_nav_logout')}</p>
                        </a>
                    </div>
                </div>
            </aside>
             {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* TopNavBar */}
                <header className="flex items-center justify-end whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-8 py-4 bg-background-light dark:bg-[#101F22]">
                    <div className="flex items-center gap-4">
                        <button onClick={() => onNavigate('generator')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111718] text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="truncate">{t('dashboard_generate_new_button')}</span>
                        </button>
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                            <ChatBubbleIcon />
                        </button>
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                            <NotificationsIcon />
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMwZi-pG1PZZYH83MPiRHO9dZEPc2IiF2WaiprfN-d9Oid9-LB-TWFIkn8FWyJZSGY5-BdqGsQARICF-0yjuy2WXB5O88gHnDY2zsyKgqEn7bOVVfb-0Gv84TIXuyRg6wMSAB-hvLP462c7leIeIwD4LDBW-NIwq9Ep92uea5u_MhMZ10vM4NMLH3ZA2-v-nHIJibRUcgoCD9xsCt1Kr6Q2CUai7ujRyocmFEmIc5taClReiba0bNNZ7ILNeZId6t0DMDZlV7vx3Q")'}}></div>
                    </div>
                </header>
                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-between gap-3 mb-6">
                            <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">{t('dashboard_title')}</h1>
                        </div>
                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                            <div className="relative flex-1 w-full">
                                 <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
                                    <SearchIcon className="h-5 w-5"/>
                                 </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800/50 h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-12 text-base font-normal leading-normal" placeholder={t('dashboard_search_placeholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                            </div>
                            <div className="flex gap-2 self-start md:self-center">
                                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 px-4">
                                    <p className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal">{t('dashboard_filter_all')}</p>
                                    <ExpandMoreIcon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
                                </button>
                                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 px-4">
                                    <p className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal">{t('dashboard_filter_by_product')}</p>
                                     <ExpandMoreIcon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
                                </button>
                                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 px-4">
                                    <p className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal">{t('dashboard_filter_by_date')}</p>
                                     <ExpandMoreIcon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        {/* Content Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredImages.map((image, index) => (
                                <div key={`${image.projectId}-${index}`} className="flex flex-col bg-background-light dark:bg-[#101F22] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="relative aspect-square w-full bg-cover bg-center" style={{backgroundImage: `url(data:image/png;base64,${image.base64})`}}>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <button onClick={() => onImageClick(image.base64)} title={t('dashboard_view_button')} className="bg-white/20 backdrop-blur-sm text-white rounded-full size-10 flex items-center justify-center hover:bg-white/30"><VisibilityIcon /></button>
                                            <button onClick={() => downloadImage(image.base64, `${image.projectName}_mockup.png`)} title={t('download_button')} className="bg-white/20 backdrop-blur-sm text-white rounded-full size-10 flex items-center justify-center hover:bg-white/30"><DownloadIcon /></button>
                                            <button onClick={() => handleDelete(image)} title={t('delete_button')} className="bg-white/20 backdrop-blur-sm text-red-400 rounded-full size-10 flex items-center justify-center hover:bg-white/30"><TrashIcon /></button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-gray-900 dark:text-white font-bold truncate">{image.projectName} Mockup</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard_card_created')}: {new Date(image.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                            {filteredImages.length === 0 && (
                                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center flex flex-col items-center justify-center">
                                    <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
                                        <AddPhotoAlternateIcon className="!text-4xl h-10 w-10"/>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t('dashboard_empty_title')}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{t('dashboard_empty_subtitle')}</p>
                                    <button onClick={() => onNavigate('generator')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111718] text-sm font-bold leading-normal tracking-[0.015em]">
                                        <span>{t('dashboard_empty_button')}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GalleryPage;
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import MenuIcon from './icons/MenuIcon';

type AppView = 'generator' | 'gallery';

interface AppHeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ activeView, onNavigate }) => {
    const { t } = useTranslations();
    
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-white/10 px-4 sm:px-6 py-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center gap-4 text-neutral-dark dark:text-white">
                <div className="size-6 text-primary">
                     <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </div>
                <h2 className="text-neutral-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Mockup Gen</h2>
            </div>
             <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                <nav className="flex items-center gap-6">
                     <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); onNavigate('generator'); }} 
                        className={`text-sm font-medium leading-normal ${activeView === 'generator' ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
                    >
                        {t('nav_create_new')}
                    </a>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} 
                         className={`text-sm font-medium leading-normal ${activeView === 'gallery' ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
                    >
                        {t('nav_gallery')}
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                     <button 
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">{t('upgrade_button')}</span>
                    </button>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar with a gradient background" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMwZi-pG1PZZYH83MPiRHO9dZEPc2IiF2WaiprfN-d9Oid9-LB-TWFIkn8FWyJZSGY5-BdqGsQARICF-0yjuy2WXB5O88gHnDY2zsyKgqEn7bOVVfb-0Gv84TIXuyRg6wMSAB-hvLP462c7leIeIwD4LDBW-NIwq9Ep92uea5u_MhMZ10vM4NMLH3ZA2-v-nHIJibRUcgoCD9xsCt1Kr6Q2CUai7ujRyocmFEmIc5taClReiba0bNNZ7ILNeZId6t0DMDZlV7vx3Q")'}}></div>
                </div>
            </div>
             <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                <MenuIcon className="text-gray-800 dark:text-white" />
            </button>
        </header>
    );
};

export default AppHeader;
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, availableLanguages } from '../hooks/useTranslations';
import GlobeIcon from './icons/GlobeIcon';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const currentLang = availableLanguages.find(l => l.code === language) || availableLanguages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode: string) => {
        setLanguage(langCode);
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="h-5 w-5"/>
                <span>{currentLang.code.toUpperCase()}</span>
                 <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20 animate-[fade-in-down_0.2s_ease-out]">
                    <style>{`
                        @keyframes fade-in-down {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                    <ul className="py-1">
                        {availableLanguages.map((lang) => (
                             <li key={lang.code}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLanguageChange(lang.code);
                                    }}
                                    className={`block px-4 py-2 text-sm ${language === lang.code ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                                >
                                    {lang.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher;
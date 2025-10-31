import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Translations } from '../locales';

export type StylePreset = 'Studio' | 'Lifestyle' | 'Outdoor' | 'Flat Lay';

interface StyleSelectorProps {
    selectedStyle: StylePreset;
    onSelectStyle: (style: StylePreset) => void;
}

const styles: { id: StylePreset; labelKey: keyof Translations }[] = [
    { id: 'Studio', labelKey: 'style_preset_studio' },
    { id: 'Lifestyle', labelKey: 'style_preset_lifestyle' },
    { id: 'Outdoor', labelKey: 'style_preset_outdoor' },
    { id: 'Flat Lay', labelKey: 'style_preset_flatlay' },
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
    const { t } = useTranslations();

    return (
        <div className="grid grid-cols-2 gap-2">
        {styles.map((style) => (
            <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={`py-2 px-3 text-sm font-semibold rounded-md transition-colors ${
                selectedStyle === style.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            >
            {t(style.labelKey)}
            </button>
        ))}
        </div>
    );
};

export default StyleSelector;

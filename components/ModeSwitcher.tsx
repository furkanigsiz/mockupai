import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { AppMode } from '../types';

interface ModeSwitcherProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onModeChange }) => {
  const { t } = useTranslations();
  const modes: { id: AppMode; labelKey: 'mode_scene' | 'mode_product' }[] = [
    { id: 'scene', labelKey: 'mode_scene' },
    { id: 'product', labelKey: 'mode_product' },
  ];

  return (
    <div className="w-full bg-gray-800/50 p-1 rounded-lg border border-gray-700 flex">
      {modes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`w-1/2 py-2 px-3 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
            currentMode === mode.id
              ? 'bg-indigo-600 text-white shadow'
              : 'text-gray-400 hover:bg-gray-700'
          }`}
        >
          {t(mode.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;

import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import TshirtIcon from './icons/TshirtIcon';
import MugIcon from './icons/MugIcon';
import HoodieIcon from './icons/HoodieIcon';
import ToteBagIcon from './icons/ToteBagIcon';
import { Translations } from '../locales';

export type ProductType = 't-shirt' | 'mug' | 'hoodie' | 'tote-bag';

interface ProductSelectorProps {
  selectedProduct: ProductType | null;
  onSelectProduct: (product: ProductType) => void;
}

const products: { id: ProductType; labelKey: keyof Translations; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { id: 't-shirt', labelKey: 'product_tshirt', icon: TshirtIcon },
  { id: 'mug', labelKey: 'product_mug', icon: MugIcon },
  { id: 'hoodie', labelKey: 'product_hoodie', icon: HoodieIcon },
  { id: 'tote-bag', labelKey: 'product_tote_bag', icon: ToteBagIcon },
];

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelectProduct }) => {
  const { t } = useTranslations();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{t('product_selector_title')}</label>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors duration-200 ${
              selectedProduct === product.id
                ? 'bg-indigo-900/50 border-indigo-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-indigo-600 hover:text-white'
            }`}
          >
            <product.icon className="h-8 w-8 mb-2" />
            <span className="text-sm font-semibold">{t(product.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;

import React, { useState, useMemo } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ProductTemplate, ProductCategory } from '../types';

interface ProductSelectorProps {
  selectedProduct: ProductTemplate | null;
  onSelectProduct: (product: ProductTemplate) => void;
}

// NOTE: Using placeholder images. In a real app, these would come from a CDN.
const ALL_PRODUCTS: ProductTemplate[] = [
    { id: 't-shirt', name: 'Classic T-Shirt', category: 'Apparel', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAlrloQiOMeEWMldsvD719w--o2Bid6sG2qMnweDyAM1WHSozg6IAerFez8ON22QSB2AjEPuotiIFRkJaDFA-PF2SGyhLjYvlaF8Us5XtAergWE_BA7XwIdzRUwxHNyETOub_gO_2Q_QsHMfj1Im2DvO7nUsghEuXByKCVKZBWX4Ww5l4Erqhjb4Z9ZVd8vVPb-joS-pkKI6VzA6rEtiWNbKjet94e1ebO-WNMaOtzME1Ocq6D5OeXkvxLFiKCT6NEXz_gjZmTsZQ' },
    { id: 'mug', name: '11oz Coffee Mug', category: 'Home Goods', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNPwULM5NIVPQXH8yKcGfBkZBL8yoT8Ur6kGFrEi7fZaIR-AK_8pkty2v_V3xrGgRgPNstiZVDhGF8Y25w6UN215rkhRRXKTG9RXowNykZTGy4i4QJh-ilNx9uHqRNhk7URVZP7AGSBzwfD_qY5fU_ezf7GTWa13gqUH2F76va5zCdTXbEaFegSoYJODrWUhCXeyYFlWFqp75sncCoqmxzkrduWYtwBfxhqfvPFeKWJdCJvU28C2VjR4uCIz6vD2cFTU3HKIxrm8' },
    { id: 'phone-case', name: 'Phone Case', category: 'Tech', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYyZ35xf1gyfKHMrTw7zH3XvzSAPfP6v7HntEGYqZDhFwetJ_5bc-lMVcCh1TmT6Q_i_cJEy8uFzhq7Xul5lZOgcUWjUBtqBZ9iUpxlRp6ZZN2f9cwkTqd0W6SIPa9lM8I8VfsRVw3jjlOreaZqAjmJwkpj_F5kk95G3Qgf7NnOdGneGkH6WdGBPW4KQpP9ALnxuYaFngNVD98H_AyHEjZKzGsqrDUp1u86cBNIUhHXzuyBPoPmQdsz3Krd85EYvZh2GJCAVAhz8E' },
    { id: 'tote-bag', name: 'Tote Bag', category: 'Apparel', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByPu9Hz_lQ0rcXKq_XBkxzyFEB2OVl8a27aw68KNkRiNK0ppLreHKyYr0v-gtEbmOw309ivOn5Mc6DHhNWwIGYTwEL-UTYusIyQ3pL-KJZFKqkRzvIpl34oD0DHtpRDSPIX29pprcRLktj6aA5wv4ll5s8xF1fz-_2hFnPvNaEgJxYsXP_QvzuRMVy2LYGbvUcOLjefCumq7Bm_KOsDWrLN1-SteFbmwHvVrWKF0njkxzGlKcCua_Zse0yV-FsgE2eQetAgppHd_A' },
    { id: 'baseball-cap', name: 'Baseball Cap', category: 'Apparel', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_oiw_6IRBqRYrKKkFLYv0WQdg97dHlP0v2v_TE3zGxhgCQ6ydRHRqfpVUyZN-YgK_CeLA6M7potHbxtbDU5wy_TRX4yIvrrkgoxD0OExLqskjlkrH1h9cZrl9mJ9ueT1qgYYmyAqmmkBKRMjvrbWksxIll5sPAW4xKqBFE69jZDuLbxMydYBa_c457hll5vs0nwYhOQ-ICFbJk3pBBVlYf6KgW96QPn3lq_FoDgsEC-YEBTRohAM00lbbm1g3mnLQsWEOiKtndoE' },
    { id: 'poster', name: 'Wall Poster', category: 'Print', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtGRLCuTwqTE9cGTnLl2YfdNPWhL-kVbzdab3hRONIwZiOUpS5bWf1OqSwHxKnVfNtm1JajcFJlPS58Ks3y0pieSJBlPmGhO64onGUSwcgf0vlzeVw8lh7ueW_3aH4smV4_F_UayD4-xn34c-pDaf3L20oo6MLmgwG7nKtZRLSXRNfPha8HhWvlHNCwA15GhAIuYG9lbkUPq_fOiPy0n6_nGTIYzICmPNSXko99e2KYzqgEUfL-48TJM4G6II-ObvuKZrl8EagIcc' },
];
const CATEGORIES: ProductCategory[] = ['Apparel', 'Home Goods', 'Print', 'Tech'];


const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, onSelectProduct }) => {
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'All'>('All');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
        const categoryMatch = category === 'All' || p.category === category;
        const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });
  }, [searchTerm, category]);

  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-neutral-dark dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">{t('step_2_title')}</h2>
        <p className="px-4 text-neutral-medium text-base">{t('step_2_subtitle')}</p>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 px-4">
            <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium">search</span>
            <input 
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-neutral-light dark:bg-neutral-dark/40 border border-transparent focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-neutral-medium" 
                placeholder={t('search_products_placeholder')} 
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <select 
                className="h-12 rounded-lg bg-neutral-light dark:bg-neutral-dark/40 border border-transparent focus:ring-2 focus:ring-primary focus:border-primary"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory | 'All')}
            >
                <option value="All">{t('all_categories_option')}</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>

        {/* Product Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-h-[400px] overflow-y-auto">
            {filteredProducts.map(product => (
                 <div key={product.id} className="group cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <div className={`aspect-square bg-neutral-light dark:bg-neutral-dark/40 rounded-lg overflow-hidden ring-2 ${selectedProduct?.id === product.id ? 'ring-primary' : 'ring-transparent group-hover:ring-primary'} transition-all`}>
                        <img className="w-full h-full object-cover" alt={product.name} src={product.imageUrl}/>
                    </div>
                    <p className="text-sm mt-2 text-center font-medium text-neutral-dark dark:text-white">{product.name}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ProductSelector;

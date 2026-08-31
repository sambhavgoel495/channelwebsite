'use client';

import React from 'react';
import { MOCK_CATEGORIES } from '@/data/mockData';
import { Grid, TrendingUp, Flame, Layers } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  Grid,
  TrendingUp,
  Flame,
  Layers,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1">
      <div className="flex items-center space-x-2 md:space-x-3 min-w-max">
        {MOCK_CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat.iconName] || Grid;
          const isSelected =
            selectedCategory === cat.name ||
            (selectedCategory === 'All Videos' && cat.id === 'all') ||
            (selectedCategory === 'Trending' && cat.id === 'Trending') ||
            (selectedCategory === 'Combo' && cat.id === 'Combo');

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 text-white border-transparent shadow-lg orange-glow scale-[1.02]'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-orange-50/60 border-slate-200 shadow-sm'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-brand-500'}`} />
              <span>{cat.name}</span>
              <span
                className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

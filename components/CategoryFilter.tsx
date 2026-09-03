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
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center space-x-2 min-w-max">
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
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                  : 'bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 border-zinc-200 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-zinc-400'}`} />
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-zinc-800 text-zinc-300'
                    : 'bg-zinc-100 text-zinc-500'
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

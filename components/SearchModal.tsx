'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_BUNDLES } from '@/data/mockData';
import { Search, X, Video, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useAuth();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredBundles = query.trim() === '' 
    ? [] 
    : MOCK_BUNDLES.filter(b => 
        b.title.toLowerCase().includes(query.toLowerCase()) || 
        b.category.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative z-10 w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-4 border-b border-slate-100 bg-slate-50/50">
            <Search className="w-5 h-5 text-brand-500 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bundles (e.g. Comedy, Reactions, 50 videos)..."
              autoFocus
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-700 mr-2">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200/80 hover:bg-slate-300 rounded-md transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-slate-500">
                <p className="text-sm font-medium">Try searching for <span className="text-brand-600 font-bold">&quot;Comedy&quot;</span>, <span className="text-brand-600 font-bold">&quot;Reactions&quot;</span>, or <span className="text-brand-600 font-bold">&quot;Viral&quot;</span></p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Toddler Comedy', 'Cute Reactions', 'Conversations', 'Viral Collection'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-brand-600 rounded-full border border-slate-200 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredBundles.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <Video className="w-10 h-10 text-slate-400 mx-auto mb-3 stroke-[1.5]" />
                <p className="font-bold text-slate-800">No bundles match &quot;{query}&quot;</p>
                <p className="text-xs text-slate-500 mt-1">Try broadening your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2">
                  Bundles ({filteredBundles.length})
                </div>
                {filteredBundles.map((bundle) => (
                  <Link
                    key={bundle.id}
                    href={`/bundles/${bundle.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50/60 border border-transparent hover:border-orange-200 transition-all group"
                  >
                    <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                      <img src={bundle.thumbnail} alt={bundle.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase bg-orange-100 text-brand-600 rounded-md">
                          {bundle.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">• {bundle.videoCount} Videos</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors truncate mt-0.5">
                        {bundle.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{bundle.tagline}</p>
                    </div>
                    <div className="text-right shrink-0 flex items-center space-x-2">
                      <span className="text-sm font-black text-slate-900">₹{bundle.price}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_BUNDLES } from '@/data/mockData';
import { Search, X, Video, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useAuth();
  const [query, setQuery] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          className="relative z-10 w-full max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-dropdown overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 bg-zinc-50/50">
            <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search video bundles (e.g. Roblox, Car Crash, Satisfying)..."
              autoFocus
              className="w-full bg-transparent text-zinc-950 placeholder-zinc-400 focus:outline-none text-sm font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-zinc-400 hover:text-zinc-700 mr-1.5 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 hover:text-zinc-700 bg-zinc-200/80 rounded border border-zinc-300 transition-colors cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[50vh] overflow-y-auto p-3 divide-y divide-zinc-100">
            {query.trim() === '' ? (
              <div className="py-6 text-center text-zinc-500">
                <p className="text-xs font-normal">Try searching for <span className="text-orange-600 font-semibold">&quot;Roblox&quot;</span>, <span className="text-orange-600 font-semibold">&quot;Car Crash&quot;</span>, or <span className="text-orange-600 font-semibold">&quot;Satisfying&quot;</span></p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {['Roblox', 'Car Crash', 'Stickman', 'Satisfying', 'Motivational', 'Free Fire', 'Mix Reel'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md border border-zinc-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredBundles.length === 0 ? (
              <div className="py-10 text-center text-zinc-500">
                <Video className="w-8 h-8 text-zinc-400 mx-auto mb-2 stroke-[1.5]" />
                <p className="font-semibold text-zinc-800 text-xs">No bundles match &quot;{query}&quot;</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Try searching another category or keyword.</p>
              </div>
            ) : (
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-2">
                  Matching Packs ({filteredBundles.length})
                </div>
                {filteredBundles.map((bundle) => (
                  <Link
                    key={bundle.id}
                    href={`/bundles/${bundle.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-colors group"
                  >
                    <img
                      src={bundle.thumbnail}
                      alt={bundle.title}
                      className="w-10 h-14 rounded-lg object-cover bg-zinc-950 border border-zinc-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[9px] font-semibold uppercase bg-zinc-100 text-zinc-700 px-1.5 py-0.2 rounded border border-zinc-200">
                          {bundle.category}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900 group-hover:text-orange-600 truncate transition-colors">
                          {bundle.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {bundle.videoCount} Videos • {bundle.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-zinc-950 block">₹{bundle.price}</span>
                      <span className="text-[10px] font-semibold text-orange-600 group-hover:underline flex items-center justify-end">
                        <span>View</span>
                        <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                      </span>
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

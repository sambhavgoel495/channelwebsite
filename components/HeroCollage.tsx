'use client';

import React from 'react';
import { Play, Eye, Flame } from 'lucide-react';
import { SAMPLE_VIDEOS } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

export const HeroCollage: React.FC = () => {
  const { openVideoPreview } = useAuth();

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-[420px] sm:h-[480px] flex items-center justify-center">
      {/* Background ambient glow orb */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl" />

      {/* Main Center Card (Floating) */}
      <div
        onClick={() => openVideoPreview({ title: SAMPLE_VIDEOS[0].title, videoUrl: SAMPLE_VIDEOS[0].videoUrl })}
        className="absolute z-20 w-44 sm:w-52 aspect-[9/16] rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 animate-float-slow group"
      >
        <img
          src={SAMPLE_VIDEOS[0].thumbnail}
          alt={SAMPLE_VIDEOS[0].title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[9px] font-black uppercase bg-gradient-to-r from-brand-500 to-pink-500 text-white rounded-full shadow">
          50 Videos Pack
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/90 border border-white/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-500 transition-colors shadow-xl">
            <Play className="w-5 h-5 text-brand-600 fill-brand-600 ml-0.5 group-hover:text-white group-hover:fill-white transition-colors" />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-extrabold text-white truncate">{SAMPLE_VIDEOS[0].title}</p>
          <div className="flex items-center space-x-2 text-[10px] text-slate-200 mt-0.5 font-medium">
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-amber-400" />
              <span>{SAMPLE_VIDEOS[0].viewsCount}</span>
            </span>
            <span>• 9:16 HD</span>
          </div>
        </div>
      </div>

      {/* Left Top Card (Floating Reverse) */}
      <div
        onClick={() => openVideoPreview({ title: SAMPLE_VIDEOS[1].title, videoUrl: SAMPLE_VIDEOS[1].videoUrl })}
        className="absolute z-10 -left-2 sm:left-4 top-4 sm:top-8 w-36 sm:w-44 aspect-[9/16] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 animate-float-reverse group"
      >
        <img
          src={SAMPLE_VIDEOS[1].thumbnail}
          alt={SAMPLE_VIDEOS[1].title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-black uppercase bg-amber-500 text-white rounded">
          Viral
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-brand-600 fill-brand-600 ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <p className="text-[11px] font-bold text-white truncate">{SAMPLE_VIDEOS[1].title}</p>
        </div>
      </div>

      {/* Right Bottom Card (Floating Slow offset) */}
      <div
        onClick={() => openVideoPreview({ title: SAMPLE_VIDEOS[2].title, videoUrl: SAMPLE_VIDEOS[2].videoUrl })}
        className="absolute z-10 -right-2 sm:right-4 bottom-4 sm:bottom-8 w-36 sm:w-44 aspect-[9/16] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 animate-float-slow group"
      >
        <img
          src={SAMPLE_VIDEOS[2].thumbnail}
          alt={SAMPLE_VIDEOS[2].title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-black uppercase bg-purple-600 text-white rounded">
          Reactions
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-brand-600 fill-brand-600 ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <p className="text-[11px] font-bold text-white truncate">{SAMPLE_VIDEOS[2].title}</p>
        </div>
      </div>

      {/* Small Floating Pill Badge */}
      <div className="absolute top-2 right-2 sm:right-12 z-30 px-3 py-1.5 rounded-xl bg-white/95 border border-brand-200 backdrop-blur-md shadow-xl flex items-center space-x-2 animate-bounce">
        <Flame className="w-4 h-4 text-brand-500" />
        <span className="text-xs font-bold text-slate-800">100% Monetizable</span>
      </div>
    </div>
  );
};

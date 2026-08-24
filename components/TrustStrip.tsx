'use client';

import React from 'react';
import { Video, Smartphone, Sparkles, Zap } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Video,
      title: 'Ready-to-Use Videos',
      description: 'Unwatermarked 1080p MP4 clips',
      color: 'text-brand-500',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      icon: Smartphone,
      title: 'Vertical 9:16 Format',
      description: 'Built specifically for Reels & Shorts',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200'
    },
    {
      icon: Sparkles,
      title: 'Curated Video Packs',
      description: 'Hand-picked for high creator retention',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200'
    },
    {
      icon: Zap,
      title: 'Instant Drive Access',
      description: 'Download immediately after purchase',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200'
    }
  ];

  return (
    <section className="py-6 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-slate-300 transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{item.title}</h4>
              <p className="text-[10px] sm:text-xs text-slate-600 font-medium truncate mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

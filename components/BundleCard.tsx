'use client';

import React from 'react';
import Link from 'next/link';
import { Bundle } from '@/types';
import { Video, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface BundleCardProps {
  bundle: Bundle;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const { hasPurchased } = useAuth();
  const isPurchased = hasPurchased(bundle.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400 shadow-md hover:shadow-xl hover:shadow-orange-500/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Popular Badge */}
      {bundle.isPopular && (
        <div className="absolute top-3 right-3 z-20 flex items-center space-x-1 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-brand-500 text-white text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-lg">
          <Sparkles className="w-3 h-3 fill-white" />
          <span>Popular</span>
        </div>
      )}

      {/* Purchased Indicator */}
      {isPurchased && (
        <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-lg">
          <CheckCircle className="w-3.5 h-3.5 fill-white text-emerald-500" />
          <span>Purchased</span>
        </div>
      )}

      {/* Image Poster (9:16 Aspect Box Container) */}
      <Link href={`/bundles/${bundle.id}`} prefetch={true} className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900 block">
        {bundle.category === 'Combo' || String(bundle.id) === '5' ? (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 bg-slate-950 p-0.5 group-hover:scale-105 transition-transform duration-500 ease-out">
            <img src="/roblox_reels_bundle.jpg" alt="Roblox" className="w-full h-full object-cover rounded-tl-lg" />
            <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-tr-lg" />
            <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-bl-lg" />
            <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-br-lg" />
          </div>
        ) : (
          <img
            src={bundle.thumbnail}
            alt={bundle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}
        {/* Subtle Bottom Gradient Overlay for badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Category & Format Badges Overlay on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase bg-white/95 backdrop-blur-md text-brand-600 border border-brand-200 rounded-lg shadow-sm">
            {bundle.categoryBadge}
          </span>
          <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-md text-slate-200 rounded-md border border-slate-700">
            {bundle.formatBadge}
          </span>
        </div>
      </Link>

      {/* Card Details Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="flex items-center space-x-1 text-slate-700 font-bold">
              <Video className="w-3.5 h-3.5 text-brand-500" />
              <span>{bundle.videoCount} curated videos</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{bundle.rating} ({bundle.reviewsCount})</span>
            </span>
          </div>

          <Link href={`/bundles/${bundle.id}`} prefetch={true}>
            <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {bundle.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 font-medium mt-1 line-clamp-2 leading-relaxed">
            {bundle.description}
          </p>
        </div>

        {/* Footer Section: Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Bundle Price</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-black text-slate-900">₹{bundle.price}</span>
              {bundle.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{bundle.originalPrice}</span>
              )}
            </div>
          </div>

          <Link
            href={`/bundles/${bundle.id}`}
            prefetch={true}
            className="px-4 py-2.5 bg-slate-100 hover:bg-brand-500 text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 group/btn shadow-sm"
          >
            <span>{isPurchased ? 'Access' : 'View Bundle'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

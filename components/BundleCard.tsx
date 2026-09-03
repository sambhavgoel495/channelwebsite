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
    <div className="group relative bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-200 flex flex-col h-full">
      {/* Popular Badge */}
      {bundle.isPopular && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center space-x-1 px-2 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase rounded-md shadow-xs border border-white/10">
          <Sparkles className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
          <span>Popular</span>
        </div>
      )}

      {/* Purchased Indicator */}
      {isPurchased && (
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center space-x-1 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-semibold tracking-wider uppercase rounded-md shadow-xs">
          <CheckCircle className="w-3 h-3 text-white" />
          <span>Purchased</span>
        </div>
      )}

      {/* Image Poster (9:16 Aspect Box Container) */}
      <Link href={`/bundles/${bundle.id}`} prefetch={true} className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-900 block">
        {bundle.category === 'Combo' || String(bundle.id) === '5' ? (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 bg-zinc-950 p-0.5 group-hover:scale-[1.03] transition-transform duration-300 ease-out">
            <img src="/roblox_reels_bundle.jpg" alt="Roblox" className="w-full h-full object-cover rounded-tl-md" />
            <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-tr-md" />
            <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-bl-md" />
            <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-br-md" />
          </div>
        ) : (
          <img
            src={bundle.thumbnail}
            alt={bundle.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          />
        )}
        {/* Subtle Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Category & Format Badges Overlay on image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-white/95 text-zinc-900 rounded-md shadow-xs">
            {bundle.categoryBadge}
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-medium tracking-wide uppercase bg-black/60 backdrop-blur-md text-zinc-300 rounded border border-white/10">
            {bundle.formatBadge}
          </span>
        </div>
      </Link>

      {/* Card Details Content */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
            <span className="flex items-center space-x-1 font-medium text-zinc-700">
              <Video className="w-3 h-3 text-orange-500" />
              <span>{bundle.videoCount} videos</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-500 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{bundle.rating} ({bundle.reviewsCount})</span>
            </span>
          </div>

          <Link href={`/bundles/${bundle.id}`} prefetch={true}>
            <h3 className="text-sm font-bold text-zinc-950 group-hover:text-orange-600 transition-colors line-clamp-1">
              {bundle.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-600 font-normal mt-1 line-clamp-2 leading-relaxed">
            {bundle.description}
          </p>
        </div>

        {/* Footer Section: Price & Action */}
        <div className="pt-2.5 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase font-semibold tracking-wider">Price</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-bold text-zinc-950">₹{bundle.price}</span>
              {bundle.originalPrice && (
                <span className="text-xs text-zinc-400 line-through font-normal">₹{bundle.originalPrice}</span>
              )}
            </div>
          </div>

          <Link
            href={`/bundles/${bundle.id}`}
            prefetch={true}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 shadow-xs ${
              isPurchased
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white'
            }`}
          >
            <span>{isPurchased ? 'Library' : 'View Pack'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { VideoItem } from '@/types';

interface LockOverlayCardProps {
  video: VideoItem;
  index: number;
  onBuyClick: () => void;
}

export const LockOverlayCard: React.FC<LockOverlayCardProps> = ({ video, index, onBuyClick }) => {
  return (
    <div
      onClick={onBuyClick}
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-brand-400 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Thumbnail with heavy blur */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover filter blur-[6px] scale-110 group-hover:scale-115 transition-transform duration-500 opacity-70"
        />

        {/* Lock Overlay Content */}
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-white/90 border border-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
            <Lock className="w-4 h-4 text-amber-500" />
          </div>

          <span className="text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded shadow-sm">
            Locked Video #{index + 1}
          </span>
        </div>

        {/* Format Tag */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-bold text-white pointer-events-none">
          <span className="bg-slate-950/80 px-1.5 py-0.5 rounded">{video.duration}</span>
          <span className="bg-slate-950/80 px-1.5 py-0.5 rounded text-brand-300">1080p MP4</span>
        </div>
      </div>

      {/* Title footer */}
      <div className="p-3 bg-white border-t border-slate-100">
        <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 truncate">
          Video {String(index + 1).padStart(2, '0')} — {video.title.split('#')[0]}
        </p>
        <p className="text-[10px] text-slate-500 font-semibold mt-0.5 flex items-center space-x-1">
          <span>🔒 Unlock after purchase</span>
        </p>
      </div>
    </div>
  );
};

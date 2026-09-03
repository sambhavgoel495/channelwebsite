'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface DemoVideoCardProps {
  demo: {
    id?: string;
    title: string;
    video_url?: string;
    videoUrl?: string;
    duration?: string;
    category?: string;
  };
  idx: number;
  onExpand?: (demo: any) => void;
}

export const DemoVideoCard: React.FC<DemoVideoCardProps> = ({ demo, idx, onExpand }) => {
  const videoUrl = demo.video_url || demo.videoUrl || '';
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error, opening preview modal:', err);
        if (onExpand) {
          onExpand({ title: demo.title, videoUrl, duration: demo.duration });
        }
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col">
      {/* 9:16 Aspect Native Video Box */}
      <div 
        className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-950 flex items-center justify-center cursor-pointer"
        onClick={handleTogglePlay}
      >
        {/* Actual Video Element - Loads native first frame */}
        <video
          ref={videoRef}
          src={videoUrl ? `${videoUrl}#t=0.001` : undefined}
          preload="metadata"
          playsInline
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover bg-black"
        />

        {/* Top Demo Badges (Hidden when playing) */}
        {!isPlaying && (
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase bg-orange-600 text-white rounded shadow-xs">
              DEMO #{idx + 1}
            </span>
            {demo.duration && (
              <span className="px-1.5 py-0.5 text-[9px] font-medium bg-black/75 text-white rounded backdrop-blur-sm">
                {demo.duration}
              </span>
            )}
          </div>
        )}

        {/* Center Play Button Overlay (Visible when not playing) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-white/95 border border-white/40 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-orange-600 transition-all duration-200">
              <Play className="w-4 h-4 text-zinc-950 fill-zinc-950 ml-0.5 group-hover:text-white group-hover:fill-white transition-colors" />
            </div>
          </div>
        )}
      </div>

      {/* Card Bottom Details & Watch Button */}
      <div className="p-3 bg-white space-y-2 border-t border-zinc-100 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-semibold uppercase text-orange-600 block">9:16 Vertical HD</span>
          <p className="text-xs font-bold text-zinc-950 truncate mt-0.5">{demo.title}</p>
        </div>

        <div className="flex items-center space-x-1.5 pt-1">
          <button
            onClick={handleTogglePlay}
            className="flex-1 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Play Demo</span>
              </>
            )}
          </button>
          
          {onExpand && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current && isPlaying) {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
                onExpand({ title: demo.title, videoUrl, duration: demo.duration });
              }}
              title="Open Fullscreen Theater View"
              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-lg transition-colors cursor-pointer border border-zinc-200"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

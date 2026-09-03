'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoPreviewModal: React.FC = () => {
  const { activeVideoPreview, closeVideoPreview } = useAuth();

  if (!activeVideoPreview) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideoPreview}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="relative z-10 w-full max-w-sm bg-white border border-zinc-200 rounded-2xl shadow-dropdown overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/60">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase bg-zinc-200 text-zinc-800 rounded">
                  9:16 Preview
                </span>
                {activeVideoPreview.duration && (
                  <span className="text-[11px] text-zinc-500 font-medium">{activeVideoPreview.duration}</span>
                )}
              </div>
              <h3 className="text-xs font-bold text-zinc-950 truncate max-w-[200px] mt-0.5">
                {activeVideoPreview.title}
              </h3>
            </div>

            <button
              onClick={closeVideoPreview}
              className="p-1 text-zinc-400 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-[9/16] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
            <video
              src={activeVideoPreview.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support HTML5 video.
            </video>
          </div>

          {/* Footer note */}
          <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-center">
            <p className="text-[11px] text-zinc-600 font-medium flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Full HD 1080p • No watermark upon purchase</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

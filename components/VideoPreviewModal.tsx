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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideoPreview}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-orange-100 text-brand-600 rounded-md border border-orange-200">
                  9:16 HD Preview
                </span>
                {activeVideoPreview.duration && (
                  <span className="text-xs text-slate-500 font-bold">{activeVideoPreview.duration}</span>
                )}
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-[240px] mt-0.5">
                {activeVideoPreview.title}
              </h3>
            </div>

            <button
              onClick={closeVideoPreview}
              className="p-2 text-slate-400 hover:text-slate-800 bg-slate-200/60 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
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
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600 font-semibold flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full HD 1080p • No Watermark after purchase</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

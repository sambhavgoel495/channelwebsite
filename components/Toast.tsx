'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAuth();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-dropdown flex items-start space-x-2.5 border ${
              toast.type === 'success'
                ? 'bg-zinc-950 border-emerald-500/40 text-zinc-100'
                : toast.type === 'error'
                ? 'bg-zinc-950 border-rose-500/40 text-zinc-100'
                : 'bg-zinc-950 border-zinc-800 text-zinc-100'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs font-medium leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

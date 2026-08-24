'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ShieldCheck, Zap, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export const QuickBuyModal: React.FC = () => {
  const { quickBuyBundle, closeQuickBuy, purchaseBundle } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!quickBuyBundle) return null;

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const success = purchaseBundle(quickBuyBundle.id);
      if (success) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // fallback
        }
        closeQuickBuy();
        router.push('/my-library');
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickBuy}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-brand-500" />
              <h3 className="text-base font-extrabold text-slate-900">Instant Checkout</h3>
            </div>
            <button
              onClick={closeQuickBuy}
              className="p-1.5 text-slate-400 hover:text-slate-800 bg-slate-200/60 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Bundle summary */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
              <img
                src={quickBuyBundle.thumbnail}
                alt={quickBuyBundle.title}
                className="w-16 h-20 object-cover rounded-xl border border-orange-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-orange-100 text-brand-600 rounded">
                  {quickBuyBundle.category}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 truncate mt-1">{quickBuyBundle.title}</h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{quickBuyBundle.videoCount} Vertical 1080p MP4 Videos</p>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-lg font-black text-slate-900">₹{quickBuyBundle.price}</span>
                  <span className="text-xs text-slate-400 line-through">₹{quickBuyBundle.originalPrice}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Save {Math.round((1 - quickBuyBundle.price / quickBuyBundle.originalPrice) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Select Payment Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-orange-50 border-brand-500 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${paymentMethod === 'upi' ? 'text-brand-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold">UPI / GPay / PhonePe</p>
                    <p className="text-[10px] text-slate-500 font-medium">Instant Verification</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-orange-50 border-brand-500 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-brand-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold">Credit / Debit Card</p>
                    <p className="text-[10px] text-slate-500 font-medium">All major cards</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Razorpay Mock Sandbox • Instant Lifetime Access & Drive Link</span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white text-sm font-black rounded-2xl shadow-xl orange-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Complete Purchase (₹{quickBuyBundle.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

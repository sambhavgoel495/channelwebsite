'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ShieldCheck, Zap, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const QuickBuyModal: React.FC = () => {
  const { quickBuyBundle, closeQuickBuy, refetchPurchases, user, addToast } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!quickBuyBundle) return null;

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      if (accessToken) {
        const createRes = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            bundleId: quickBuyBundle.id,
          }),
        });

        const orderData = await createRes.json();

        if (orderData.success && orderData.orderId) {
          const scriptLoaded = await loadRazorpayScript();
          if (!scriptLoaded || !(window as any).Razorpay) {
            addToast('Failed to load Razorpay payment gateway SDK. Please check connection.', 'error');
            setIsProcessing(false);
            return;
          }

          const options = {
            key: orderData.keyId,
            amount: orderData.amount,
            currency: orderData.currency || 'INR',
            name: 'LittleVault',
            description: `Unlock ${quickBuyBundle.title}`,
            order_id: orderData.orderId,
            prefill: {
              name: user?.name || '',
              email: user?.email || '',
              contact: user?.phone || '',
            },
            config: {
              display: {
                blocks: {
                  upi: {
                    name: 'Pay via UPI / QR Code',
                    instruments: [
                      {
                        method: 'upi',
                      },
                    ],
                  },
                },
                sequence: ['block.upi'],
                preferences: {
                  show_default_blocks: true,
                },
              },
            },
            theme: {
              color: '#f97316',
            },
            handler: async function (response: any) {
              try {
                setIsProcessing(true);
                const verifyRes = await fetch('/api/razorpay/verify-payment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    bundleId: quickBuyBundle.id,
                  }),
                });

                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                  await refetchPurchases();
                  try {
                    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                  } catch (e) {}
                  closeQuickBuy();
                  router.push('/my-library');
                } else {
                  addToast(verifyData.error || 'Payment verification failed.', 'error');
                }
              } catch (err: any) {
                addToast('Error verifying payment with server.', 'error');
              } finally {
                setIsProcessing(false);
              }
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
              },
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
          return;
        } else {
          addToast(orderData.error || 'Failed to create Razorpay order.', 'error');
          setIsProcessing(false);
          return;
        }
      } else {
        addToast('Please log in to purchase video bundles.', 'error');
        setIsProcessing(false);
        return;
      }
    } catch (e: any) {
      console.error('Error initiating Razorpay checkout:', e);
      addToast(e.message || 'An unexpected error occurred during checkout.', 'error');
      setIsProcessing(false);
      return;
    }
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative z-10 w-full max-w-md bg-white border border-zinc-200 rounded-2xl shadow-dropdown overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 bg-zinc-50/50">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-600 fill-orange-600" />
              <h3 className="text-sm font-bold text-zinc-950">Instant Checkout</h3>
            </div>
            <button
              onClick={closeQuickBuy}
              className="p-1 text-zinc-400 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Bundle summary */}
            <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <img
                src={quickBuyBundle.thumbnail}
                alt={quickBuyBundle.title}
                className="w-14 h-18 object-cover rounded-lg border border-zinc-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase bg-zinc-200 text-zinc-800 rounded">
                  {quickBuyBundle.category}
                </span>
                <h4 className="text-xs font-bold text-zinc-950 truncate mt-1">{quickBuyBundle.title}</h4>
                <p className="text-[11px] text-zinc-500 font-normal">{quickBuyBundle.videoCount} Vertical 1080p MP4 Videos</p>
                <div className="mt-1.5 flex items-baseline space-x-2">
                  <span className="text-base font-bold text-zinc-950">₹{quickBuyBundle.price}</span>
                  <span className="text-xs text-zinc-400 line-through">₹{quickBuyBundle.originalPrice}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    Save {Math.round((1 - quickBuyBundle.price / quickBuyBundle.originalPrice) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <Smartphone className={`w-4 h-4 shrink-0 ${paymentMethod === 'upi' ? 'text-orange-400' : 'text-zinc-400'}`} />
                  <div>
                    <p className="text-xs font-semibold">UPI / QR Code</p>
                    <p className={`text-[10px] ${paymentMethod === 'upi' ? 'text-zinc-300' : 'text-zinc-400'}`}>Instant Verification</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <CreditCard className={`w-4 h-4 shrink-0 ${paymentMethod === 'card' ? 'text-orange-400' : 'text-zinc-400'}`} />
                  <div>
                    <p className="text-xs font-semibold">Debit / Card</p>
                    <p className={`text-[10px] ${paymentMethod === 'card' ? 'text-zinc-300' : 'text-zinc-400'}`}>All Major Cards</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center space-x-2 text-[11px] text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Commercial License & Lifetime Cloud Access Included</span>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Pay & Unlock — ₹{quickBuyBundle.price}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

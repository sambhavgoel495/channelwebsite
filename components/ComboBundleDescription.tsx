'use client';

import React from 'react';
import { 
  CheckCircle2, 
  FolderDown, 
  Zap, 
  Clock, 
  TrendingUp, 
  Infinity as InfinityIcon, 
  DollarSign, 
  Instagram, 
  Flame, 
  Video,
  Layers,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const ComboBundleDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;

  const driveLinks = [
    { title: '🎮 3,000+ Roblox Reels Bundle', url: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB' },
    { title: '🚗 8,000+ Car Crash Bundle', url: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV' },
    { title: '💃 3,000+ AI Girls Dancing Reels', url: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB' },
    { title: '🥷 1,000+ Stickman Action Bundle', url: 'https://drive.google.com/drive/folders/1Y9aHMGLfSXfXzGKNkZcbNPSiVPkBoGt0' },
  ];

  return (
    <div className="space-y-10 pt-8 border-t border-slate-200 text-slate-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
            <span>Best Value 4-in-1 Mega Saver Vault</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            🔥 ULTIMATE 4-IN-1 CREATOR MEGA COMBO PACK 🔥
          </h2>

          <p className="text-lg sm:text-xl font-bold text-amber-400">
            Get ALL 4 Premium Video Vaults (15,000+ Total Clips) for Only ₹149! 🚀
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong className="text-white font-bold">Why buy single bundles when you can unlock our entire content library in one massive combo discount?</strong>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            The <span className="text-white font-extrabold">Ultimate 4-in-1 Creator Combo Pack</span> combines our top-performing short-form video vaults into one ultimate package for content creators, agency owners, and faceless channel runners.
          </p>
        </div>
      </div>

      {/* 4 BUNDLES SHOWCASE IN COMBO */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-brand-500 text-white rounded-2xl shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600">INCLUDED IN THIS MEGA COMBO</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              📦 4 PREMIUM VAULTS INCLUDED
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Roblox */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-brand-400 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="/roblox_reels_bundle.jpg" alt="Roblox Reels" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">BUNDLE #1</span>
                <h4 className="font-extrabold text-slate-900 text-sm">🎮 3,000+ Roblox Reels</h4>
              </div>
              <p className="text-xs text-slate-600 font-medium">Addictive Roblox parkour, obbies, trolling & challenges.</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Individual: ₹49</span>
              <span className="text-emerald-600 font-black">INCLUDED</span>
            </div>
          </div>

          {/* Card 2: Car Crash */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-brand-400 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">BUNDLE #2</span>
                <h4 className="font-extrabold text-slate-900 text-sm">🚗 8,000+ Car Crash Bundle</h4>
              </div>
              <p className="text-xs text-slate-600 font-medium">Physics-based BeamNG high-impact collision videos.</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Individual: ₹39</span>
              <span className="text-emerald-600 font-black">INCLUDED</span>
            </div>
          </div>

          {/* Card 3: AI Girls Dancing */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-brand-400 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="/ai_girls_dancing_bundle.png" alt="AI Girls Dancing" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">BUNDLE #3</span>
                <h4 className="font-extrabold text-slate-900 text-sm">💃 3,000+ AI Girls Dancing</h4>
              </div>
              <p className="text-xs text-slate-600 font-medium">High-retention 1080p AI dancing reels for fast growth.</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Individual: ₹69</span>
              <span className="text-emerald-600 font-black">INCLUDED</span>
            </div>
          </div>

          {/* Card 4: Stickman */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-brand-400 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-brand-600">BUNDLE #4</span>
                <h4 className="font-extrabold text-slate-900 text-sm">🥷 1,000+ Stickman Action</h4>
              </div>
              <p className="text-xs text-slate-600 font-medium">Epic stickman fights, stunts, parkour & weapon battles.</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Individual: ₹39</span>
              <span className="text-emerald-600 font-black">INCLUDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* GOOGLE DRIVE FOLDERS ACCESS (WHEN PURCHASED) */}
      {isPurchased && (
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950 text-white space-y-6 border border-emerald-500/40 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-2xl font-black">
              <FolderDown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">INSTANT DRIVE ACCESS</span>
              <h3 className="text-2xl font-black text-white">YOUR 4 GOOGLE DRIVE LIBRARIES</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {driveLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/60 rounded-2xl flex items-center justify-between transition-colors"
              >
                <span className="text-xs font-black text-white">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-emerald-300" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FINAL CALL TO ACTION BOX */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-orange-600 to-amber-500 p-6 sm:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            🚨 UNLOCK ALL 15,000+ CLIPS TODAY FOR ₹149! 🚀
          </h3>
          <p className="text-sm font-bold text-orange-100">
            One mega purchase. Lifetime Google Drive access to all 4 video bundles. No subscriptions.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-8 py-4 bg-white text-brand-600 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-brand-600" />
                <span>UNLOCK 4-IN-1 MEGA COMBO NOW — ₹149</span>
              </button>
            ) : (
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>COMBO UNLOCKED! DRIVE LINKS AVAILABLE ABOVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Support & Instagram tag */}
        <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-extrabold text-white/90">
          <span className="flex items-center space-x-1.5">
            <span>📲 Need help? Contact us on Instagram:</span>
            <a 
              href="https://instagram.com/vanshh.2406" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-md flex items-center space-x-1 text-white font-black underline transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@vanshh.2406</span>
            </a>
          </span>
        </div>
      </div>

    </div>
  );
};

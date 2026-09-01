'use client';

import React from 'react';
import { 
  CheckCircle2, 
  FolderDown, 
  Zap, 
  TrendingUp, 
  Infinity as InfinityIcon, 
  Instagram, 
  Video,
  Sparkles,
  Layers,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const MixBundleDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;
  const driveUrl = bundle?.driveUrl || 'https://drive.google.com/drive/folders/1R0YYII2rF3iv8X26iCQ_BXzT6w-uMOAQ';

  return (
    <div className="space-y-10 pt-8 border-t border-slate-200 text-slate-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>All-in-One Mega Vault — 30+ Bundles</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            🎯🔥 60K+ MIX VIRAL REEL BUNDLE 🔥🎯
          </h2>

          <p className="text-lg sm:text-xl font-bold text-amber-400">
            The Ultimate All-in-One Viral Content Vault 🚀
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong className="text-white font-bold">Ek hi bundle mein multiple niches ka massive collection — ab alag-alag reels ke liye alag packs dhoondhne ki zarurat nahi.</strong>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Introducing the <span className="text-white font-extrabold">60K+ Mix Reel Bundle</span> — a huge collection of viral short-form content covering 30+ mega bundles and multiple trending niches, all packed together in one place.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            AI content se lekar motivation, fitness, cartoons, animation, supercars, tech, facts aur bahut kuch — <span className="text-amber-300 font-bold">content variety ki koi kami nahi. 🔥</span>
          </p>
        </div>
      </div>

      {/* WHAT YOU GET SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-brand-500 text-white rounded-2xl shadow-md font-black">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600">INCLUDED IN PACK</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              🎁 WHAT YOU GET
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 60,000+ Viral Reels */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg">
              🔥
            </div>
            <h4 className="text-lg font-black text-slate-900">60,000+ Viral Reels</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>60K+ viral short-form reels</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>30+ mega bundles in one pack</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Multiple trending niches covered</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Content for Instagram Reels, YouTube Shorts & Facebook Reels</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Huge variety of entertaining & engaging content</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-900 font-extrabold">Perfect for building multiple niche pages</span></li>
            </ul>
          </div>

          {/* Card 2: Multiple Niches in One Pack */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-black text-lg">
              📂
            </div>
            <h4 className="text-lg font-black text-slate-900">MULTIPLE NICHES — ONE PACK</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🤖</span> <span>AI Reels</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>💪</span> <span>Motivation & Fitness</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🎨</span> <span>Cartoon Content</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>✏️</span> <span>2D Animation</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🚗</span> <span>Super Cars</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🎨</span> <span>Art & Craft</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>💻</span> <span>Tech Content</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🛕</span> <span>Spiritual Content</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🧠</span> <span>Facts & Knowledge</span></span>
              <span className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center space-x-1.5"><span>🎬</span> <span>30+ More Niches</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* WHY THIS BUNDLE SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl font-black">
            ⚡
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">UNMATCHED POWER</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              WHY THIS BUNDLE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>ONE BUNDLE. 30+ NICHES.</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">No Need to Buy Multiple Packs</h5>
            <p className="text-xs text-slate-300 font-medium">Alag-alag niche ke bundles collect karne ki zarurat nahi. 30+ mega bundles aur 60K+ reels ek hi massive collection mein.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>PERFECT FOR MULTIPLE PAGES</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Scale Across Multiple Accounts</h5>
            <p className="text-xs text-slate-300 font-medium">Different niches par content pages chalana chahte ho? Ye bundle aapko multiple categories ke saath experiment karne ka option deta hai.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <InfinityIcon className="w-4 h-4" />
              <span>MASSIVE CONTENT LIBRARY</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Lifetime Access & Infinite Ideas</h5>
            <p className="text-xs text-slate-300 font-medium">60K+ reels = thousands of content ideas. Ek bundle download karo aur apni content library ko instantly expand karo.</p>
          </div>
        </div>
      </div>

      {/* WHAT CAN YOU CREATE SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl shadow-md font-black">
            🎯
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">ENDLESS CONTENT PAGES</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              WHAT CAN YOU CREATE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            '🤖 AI Reels Pages',
            '💪 Motivation Pages',
            '🏋️ Fitness Content',
            '🎨 Cartoon Pages',
            '✏️ Animation Reels',
            '🚗 Supercar Pages',
            '🎨 Art & Craft Content',
            '💻 Tech Pages',
            '🛕 Religion & Spiritual',
            '🧠 Facts & Knowledge',
            '🔥 Viral Content Pages',
            '📱 Faceless Reels Pages'
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-800 hover:border-amber-400 transition-colors flex items-center space-x-2">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl font-black">
            ⚙️
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">SIMPLE 5-STEP PROCESS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              HOW IT WORKS
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
          {[
            { step: '1️⃣', title: 'GET THE BUNDLE', desc: 'Get access to the 60K+ Mix Reel Bundle.' },
            { step: '2️⃣', title: 'CHOOSE NICHE', desc: 'Pick from 30+ mega bundles & categories.' },
            { step: '3️⃣', title: 'DOWNLOAD', desc: 'Choose the reels and build your library.' },
            { step: '4️⃣', title: 'EDIT', desc: 'Add captions, music, hooks & branding.' },
            { step: '5️⃣', title: 'PUBLISH 🚀', desc: 'Upload content & start growing your page.' },
          ].map((s, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <span className="text-2xl">{s.step}</span>
              <h5 className="font-black text-xs text-slate-900 uppercase">{s.title}</h5>
              <p className="text-[11px] font-semibold text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CALL TO ACTION BOX */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 p-6 sm:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            🚨 STOP SEARCHING. START CREATING. 🚀
          </h3>
          <p className="text-sm font-bold text-amber-100">
            60K+ viral reels. 30+ mega bundles. Multiple trending niches. One massive content vault.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>GET THE 60K+ MIX REEL BUNDLE TODAY — ₹{bundle.price || 39}</span>
              </button>
            ) : (
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-emerald-700 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <FolderDown className="w-4 h-4" />
                <span>OPEN GOOGLE DRIVE FOLDER NOW</span>
              </a>
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

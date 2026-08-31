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
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const SatisfyingBundleDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;

  return (
    <div className="space-y-10 pt-8 border-t border-slate-200 text-slate-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-400 animate-pulse" />
            <span>Official Satisfying Content Vault</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            ✨🔥 1,000+ SATISFYING VIRAL REELS BUNDLE 🔥✨
          </h2>

          <p className="text-lg sm:text-xl font-bold text-purple-400">
            The Ultimate Satisfying Content Vault 🚀
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong className="text-white font-bold">Want to flood your YouTube Shorts, Instagram Reels & TikTok with insanely satisfying content — without spending hours searching for the perfect clips?</strong>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Introducing the <span className="text-white font-extrabold">1,000+ Satisfying Reels Content Bundle</span> — a massive collection of addictive, visually satisfying videos made specifically for short-form content creators.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            From perfectly timed cuts and smooth transformations to cleaning, organizing, crushing, crafting, restoration and oddly satisfying moments — this bundle gives you <span className="text-purple-300 font-bold">thousands of clips designed to grab attention and keep viewers watching.</span>
          </p>
        </div>
      </div>

      {/* WHAT YOU GET SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-600 text-white rounded-2xl shadow-md">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">INCLUDED IN PACK</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ✨ WHAT YOU GET
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1000+ Satisfying Videos */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black">
              🔥
            </div>
            <h4 className="text-lg font-black text-slate-900">1,000+ Satisfying Videos</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>1,000+ short-form satisfying videos</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Designed for YouTube Shorts, Reels & TikTok</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Most videos are under 60 seconds</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>High-quality satisfying & visually engaging</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Addictive, relaxing & mesmerizing moments</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-900 font-extrabold">No watermarks or logos</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Ready to edit, brand & publish</span></li>
            </ul>
          </div>

          {/* Card 2: Easy Access */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-black">
              📂
            </div>
            <h4 className="text-lg font-black text-slate-900">EASY ACCESS</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Organized content library</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Easy-to-navigate Google Drive folders</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Mobile & PC friendly</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Download the clips you need anytime</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Build your satisfying library instantly</span></li>
            </ul>
          </div>

          {/* Card 3: Ready to Edit & Create */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black">
              ✂️
            </div>
            <h4 className="text-lg font-black text-slate-900">READY TO EDIT & CREATE</h4>
            <p className="text-xs font-bold text-slate-500">Add your own:</p>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
              <li>🎵 Trending sounds</li>
              <li>📝 Captions & subtitles</li>
              <li>🔥 Viral hooks</li>
              <li>🎨 Branding</li>
              <li>😂 Memes & reactions</li>
              <li>💥 Sound effects</li>
              <li>🎬 Editing style</li>
            </ul>
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
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">UNMATCHED VALUE</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              WHY THIS BUNDLE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>SAVE HOURS</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Save Hours of Content Creation</h5>
            <p className="text-xs text-slate-300 font-medium">Stop spending hours searching for satisfying clips or wondering what to post next. Your library is ready.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>MADE FOR SHORT-FORM</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Made for Short-Form Content</h5>
            <p className="text-xs text-slate-300 font-medium">Satisfying videos are naturally visual, addictive and highly rewatchable, making them perfect for short-form platforms.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <InfinityIcon className="w-4 h-4" />
              <span>LIFETIME ACCESS</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">No Recurring Subscriptions</h5>
            <p className="text-xs text-slate-300 font-medium">One-time purchase of ₹39. No monthly subscription. No recurring fees. Buy once → Download → Edit → Create → Publish.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <DollarSign className="w-4 h-4" />
              <span>PERFECT FOR CREATORS</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Great for All Platforms</h5>
            <p className="text-xs text-slate-300 font-medium">Great for YouTube Shorts, Reels, TikTok, Facebook Reels, satisfying content pages & faceless channels.</p>
          </div>
        </div>
      </div>

      {/* WHAT CAN YOU CREATE SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-600 text-white rounded-2xl shadow-md">
            🎯
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">ENDLESS CONTENT IDEAS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              WHAT CAN YOU CREATE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            '✨ Oddly Satisfying Moments',
            '🧼 Cleaning & Deep Cleaning',
            '🔪 Perfect Cutting Videos',
            '🪨 Crushing & Breaking',
            '🎨 Smooth Transformations',
            '🛠️ Restoration Videos',
            '📦 Organizing & Packing',
            '💧 Timed Liquid Videos',
            '🏭 Manufacturing Clips',
            '🧩 Perfectly Fitting Objects',
            '😌 Relaxing & Mesmerizing',
            '🎯 Precision Timing Clips',
            '🔥 Before & After Reels',
            '👀 Can\'t Stop Watching'
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-800 hover:border-purple-400 transition-colors flex items-center space-x-2">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-600 text-white rounded-2xl font-black">
            ⚙️
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">SIMPLE 5-STEP PROCESS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              HOW IT WORKS
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
          {[
            { step: '1️⃣', title: 'PURCHASE', desc: 'Complete your one-time ₹39 purchase.' },
            { step: '2️⃣', title: 'GET ACCESS', desc: 'Receive your 1,000+ Satisfying Reels bundle.' },
            { step: '3️⃣', title: 'DOWNLOAD', desc: 'Choose clips and download from Google Drive.' },
            { step: '4️⃣', title: 'EDIT', desc: 'Add captions, music, hooks, branding & effects.' },
            { step: '5️⃣', title: 'PUBLISH 🚀', desc: 'Upload content & start building your page.' },
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
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-brand-600 to-amber-500 p-6 sm:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            🚨 STOP SEARCHING. START CREATING. 🚀
          </h3>
          <p className="text-sm font-bold text-purple-100">
            1,000+ satisfying videos. One massive bundle. One-time payment. Lifetime access.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-8 py-4 bg-white text-purple-700 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-purple-700" />
                <span>GET THE 1,000+ SATISFYING VIDEO BUNDLE TODAY — ₹{bundle.price || 39}</span>
              </button>
            ) : (
              <a
                href={bundle?.driveUrl || '#'}
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

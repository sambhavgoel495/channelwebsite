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
  Sparkles,
  Flame,
  Scissors
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const AIInfluencerBundleDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;

  return (
    <div className="space-y-10 pt-8 border-t border-slate-200 text-slate-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-pink-500/20 border border-pink-400/30 rounded-full text-pink-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
            <span>Official AI Influencer Content Vault</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            💃🔥 3,000+ AI INFLUENCER REELS BUNDLE 🔥💃
          </h2>

          <p className="text-lg sm:text-xl font-bold text-amber-400">
            The Ultimate AI Influencer Content Vault 🚀
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong className="text-white font-bold">Want to grow your Instagram, YouTube Shorts, TikTok & Facebook pages with eye-catching AI influencer content — without spending hours creating videos from scratch?</strong>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Introducing the <span className="text-white font-extrabold">3,000+ AI Influencer Reels Bundle</span> — a massive collection of AI-generated influencer & girls dancing reels created specifically for short-form content creators.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            With 3,000+ high-quality AI influencer videos, this bundle gives you a huge library of visually engaging content that is ready to download, edit, brand and upload across your social media platforms.
          </p>
        </div>
      </div>

      {/* WHAT YOU GET SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-pink-500 text-slate-950 rounded-2xl shadow-md font-black">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-pink-600">PREMIUM PACKAGE</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              💃 WHAT YOU GET
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 3,000+ AI Influencer Reels */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 hover:border-pink-300 transition-colors">
            <div className="flex items-center space-x-3 text-pink-600">
              <Flame className="w-5 h-5 text-orange-500" />
              <h4 className="text-lg font-black text-slate-900">3,000+ AI Influencer Reels</h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>3,000+ AI influencer & girls dancing reels</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>High-quality short-form videos</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Content designed for YouTube Shorts, Instagram Reels & TikTok</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>9:16 vertical format</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Full HD quality</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Visually engaging & attention-grabbing content</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Ready to edit, brand & upload</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>No watermarks or logos</span></li>
            </ul>
          </div>

          {/* Card 2: Google Drive Access */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4 hover:border-pink-300 transition-colors">
            <div className="flex items-center space-x-3 text-pink-600">
              <FolderDown className="w-5 h-5 text-pink-500" />
              <h4 className="text-lg font-black text-slate-900">📂 Google Drive Access</h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Instant access via Google Drive</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Organized content library</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Easy-to-download videos</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Mobile & PC friendly</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Access your content anytime, anywhere</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* READY TO EDIT & CREATE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-200 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-pink-600 text-white rounded-2xl shadow-md font-black">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-pink-600">CUSTOMIZATION</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              ✂️ READY TO EDIT & CREATE
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-700">
          Add your own:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '🎵', text: 'Trending sounds' },
            { icon: '📝', text: 'Captions & subtitles' },
            { icon: '🔥', text: 'Viral hooks' },
            { icon: '🎨', text: 'Branding' },
            { icon: '💥', text: 'Sound effects' },
            { icon: '🎬', text: 'Transitions & effects' },
            { icon: '📱', text: 'Your own editing style' },
            { icon: '⚡', text: 'High retention cuts' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-pink-200 shadow-sm flex items-center space-x-2.5">
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-bold text-slate-800">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHY THIS BUNDLE? */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-slate-950 text-amber-400 rounded-2xl shadow-md font-black">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">BENEFITS</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ⚡ WHY THIS BUNDLE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-pink-300 transition-colors">
            <div className="p-2.5 bg-pink-100 text-pink-600 rounded-xl w-fit"><Clock className="w-5 h-5" /></div>
            <h4 className="font-extrabold text-slate-900 text-sm uppercase">⏰ Save Hours of Creation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Stop spending hours creating or searching for influencer-style content. 3,000+ AI reels are already waiting for you.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-pink-300 transition-colors">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl w-fit"><TrendingUp className="w-5 h-5" /></div>
            <h4 className="font-extrabold text-slate-900 text-sm uppercase">📈 Made for Short-Form</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Vertical 9:16 videos are perfectly suited for modern platforms like Instagram Reels, YouTube Shorts and TikTok.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-pink-300 transition-colors">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl w-fit"><Zap className="w-5 h-5" /></div>
            <h4 className="font-extrabold text-slate-900 text-sm uppercase">🚀 Ready to Upload</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Prepared in high-quality vertical format, so you can quickly download, customize and publish instantly.</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2 hover:border-pink-300 transition-colors">
            <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl w-fit"><InfinityIcon className="w-5 h-5" /></div>
            <h4 className="font-extrabold text-slate-900 text-sm uppercase">♾️ Lifetime Access</h4>
            <p className="text-xs text-slate-600 leading-relaxed">One-time purchase. No monthly subscriptions. Buy once → Download → Edit → Create → Publish.</p>
          </div>
        </div>
      </div>

      {/* PERFECT FOR CREATORS & WHAT CAN YOU CREATE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perfect For Creators */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl"><DollarSign className="w-5 h-5" /></div>
            <h4 className="text-lg font-black text-slate-900">💰 PERFECT FOR CREATORS</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">💃 AI influencer pages</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">📱 Instagram Reels pages</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">▶️ YouTube Shorts channels</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🎵 TikTok accounts</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">📘 Facebook Reels pages</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">👤 Faceless content channels</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🚀 New content creators</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🎬 Social media editors</div>
          </div>
        </div>

        {/* What Can You Create */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Sparkles className="w-5 h-5" /></div>
            <h4 className="text-lg font-black text-slate-900">🎯 WHAT CAN YOU CREATE?</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">💃 AI Influencer Reels</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🔥 AI Girl Dancing Videos</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">📱 Instagram Reels Content</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🎬 YouTube Shorts</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🎵 TikTok Videos</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">✨ AI Lifestyle Content</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">👀 Eye-Catching Viral Reels</div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">🚀 Faceless Social Media Content</div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
        <h3 className="text-xl font-black tracking-tight text-white flex items-center space-x-2">
          <span>⚙️ HOW IT WORKS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { step: '1️⃣', title: 'PURCHASE', desc: 'Complete your one-time purchase.' },
            { step: '2️⃣', title: 'GET ACCESS', desc: 'Receive access to your 3,000+ AI Influencer bundle.' },
            { step: '3️⃣', title: 'DOWNLOAD', desc: 'Access via Google Drive and download clips you want.' },
            { step: '4️⃣', title: 'EDIT', desc: 'Add music, captions, hooks, branding and effects.' },
            { step: '5️⃣', title: 'PUBLISH 🚀', desc: 'Upload and start building your viral AI influencer page.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-2xl">{item.step}</span>
              <h5 className="font-extrabold text-sm text-pink-400">{item.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 p-6 sm:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            💃🔥 GET THE 3,000+ AI INFLUENCER REELS BUNDLE TODAY 🔥💃
          </h3>
          <p className="text-sm font-bold text-pink-100">
            Download. Edit. Brand. Publish. Repeat. 🚀
          </p>

          <p className="text-xs text-pink-200">
            3,000+ AI influencer reels • 9:16 vertical HD videos • Google Drive access • Lifetime access.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-8 py-4 bg-white text-pink-600 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-pink-600" />
                <span>UNLOCK 3,000+ AI INFLUENCER BUNDLE NOW — ₹{bundle.price}</span>
              </button>
            ) : (
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>BUNDLE UNLOCKED! DRIVE LINK AVAILABLE ABOVE</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <a
              href="https://instagram.com/vanshh.2406"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-pink-100 hover:text-white bg-black/20 hover:bg-black/30 px-4 py-2 rounded-xl border border-white/20 transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-300" />
              <span>Need help? Contact on Instagram: @vanshh.2406</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

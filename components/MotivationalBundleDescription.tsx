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
  Sparkles,
  Quote
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const MotivationalBundleDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;

  return (
    <div className="space-y-10 pt-8 border-t border-slate-200 text-slate-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Official Motivation & Inspiration Vault</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            🔥💭 9,000+ MOTIVATIONAL QUOTES BUNDLE 💭🔥
          </h2>

          <p className="text-lg sm:text-xl font-bold text-amber-400">
            The Ultimate Motivation & Inspiration Content Vault 🚀
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong className="text-white font-bold">Want to keep your Instagram, Facebook, YouTube Shorts & other social media pages filled with powerful motivational content — without spending hours searching for quotes every day?</strong>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            Introducing the <span className="text-white font-extrabold">9,000+ Motivational Quotes V1 Bundle</span> — a massive collection of motivational and inspirational quotes created for content creators, theme pages and anyone looking to build a consistent motivation-based content library.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            From success and discipline to mindset, hustle, confidence, self-growth and life lessons — this bundle gives you <span className="text-amber-300 font-bold">9,000+ quotes ready to turn into posts, stories, reels and short-form content.</span>
          </p>
        </div>
      </div>

      {/* WHAT YOU GET SECTION */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl shadow-md font-black">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">INCLUDED IN PACK</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              💭 WHAT YOU GET
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 9000+ Quotes */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black">
              🔥
            </div>
            <h4 className="text-lg font-black text-slate-900">9,000+ Motivational Quotes</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>9,000+ motivational & inspirational quotes</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Content suitable for Posts, Stories & Reels</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Quotes covering motivation & self-growth</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Perfect for daily content creation</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Organized ZIP format for easy storage</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-900 font-extrabold">Build your motivation library instantly</span></li>
            </ul>
          </div>

          {/* Card 2: Easy Access */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-black">
              📂
            </div>
            <h4 className="text-lg font-black text-slate-900">EASY ACCESS</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Organized content collection</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>ZIP format for convenient storage</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Easy to download and manage</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Mobile & PC friendly</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>Keep thousands ready for future posts</span></li>
            </ul>
          </div>

          {/* Card 3: Ready to Edit & Create */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center font-black">
              ✂️
            </div>
            <h4 className="text-lg font-black text-slate-900">READY TO EDIT & CREATE</h4>
            <p className="text-xs font-bold text-slate-500">Turn quotes into your content by adding:</p>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
              <li>🎨 Custom backgrounds</li>
              <li>🎵 Trending sounds</li>
              <li>📝 Typography & text animations</li>
              <li>🔥 Viral hooks</li>
              <li>🎬 Reels & Shorts edits</li>
              <li>🎨 Your own branding</li>
              <li>💥 Effects & transitions</li>
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
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>SAVE HOURS</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Save Hours of Research</h5>
            <p className="text-xs text-slate-300 font-medium">Stop searching for motivational quotes every single day. 9,000+ quotes in one place for endless content.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>CONSISTENT POSTING</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Made for Consistent Content</h5>
            <p className="text-xs text-slate-300 font-medium">Works across formats — quote posts, stories, Reels and Shorts. One quote becomes multiple pieces of content.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <InfinityIcon className="w-4 h-4" />
              <span>LONG-TERM LIBRARY</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">No Recurring Subscriptions</h5>
            <p className="text-xs text-slate-300 font-medium">One-time purchase of ₹39. Download once → Organize → Design → Create → Publish.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center space-x-2 text-yellow-400 font-bold text-sm">
              <DollarSign className="w-4 h-4" />
              <span>PERFECT FOR CREATORS</span>
            </div>
            <h5 className="font-extrabold text-white text-xs uppercase">Great for All Platforms</h5>
            <p className="text-xs text-slate-300 font-medium">Great for Instagram quote pages, Reels creators, YouTube Shorts channels, and faceless pages.</p>
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
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">ENDLESS CONTENT IDEAS</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              WHAT CAN YOU CREATE?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            '🔥 Success Quotes',
            '💪 Discipline Quotes',
            '🧠 Mindset Quotes',
            '🚀 Hustle & Hard Work',
            '💰 Money & Success',
            '❤️ Life Quotes',
            '🌱 Self-Growth Quotes',
            '👑 Confidence Quotes',
            '⚡ Never Give Up',
            '🎯 Goal & Ambition',
            '📈 Business & Startup',
            '🧘 Peace & Life Lessons',
            '🔥 Daily Motivation Posts',
            '💭 Inspirational Stories'
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
            { step: '1️⃣', title: 'DOWNLOAD', desc: 'Get your 9,000+ Motivational Quotes Bundle.' },
            { step: '2️⃣', title: 'ORGANIZE', desc: 'Keep your quote collection easily accessible.' },
            { step: '3️⃣', title: 'DESIGN', desc: 'Turn favourite quotes into posts, Reels or Shorts.' },
            { step: '4️⃣', title: 'EDIT', desc: 'Add backgrounds, music, branding & animations.' },
            { step: '5️⃣', title: 'PUBLISH 🚀', desc: 'Post consistently and keep audience engaged.' },
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
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-brand-600 p-6 sm:p-10 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            🚨 STOP SEARCHING. START CREATING. 🚀
          </h3>
          <p className="text-sm font-bold text-amber-100">
            9,000+ motivational quotes. One massive bundle. One-time payment. Lifetime access.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 text-sm font-black rounded-2xl shadow-2xl transition-transform hover:scale-105 inline-flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>GET THE 9,000+ MOTIVATIONAL BUNDLE TODAY — ₹{bundle.price || 39}</span>
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

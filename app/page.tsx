'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_BUNDLES, SAMPLE_VIDEOS } from '@/data/mockData';
import { BundleCard } from '@/components/BundleCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useAuth } from '@/context/AuthContext';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  HelpCircle
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Available Bundles');
  const { openVideoPreview } = useAuth();

  const filteredBundles = (selectedCategory === 'All Available Bundles' || selectedCategory === 'All Videos')
    ? MOCK_BUNDLES
    : MOCK_BUNDLES.filter(b => b.category === 'Trending' || b.isTrending || b.isPopular);

  const faqs = [
    {
      q: 'What format are the toddler videos provided in?',
      a: 'All videos are delivered in high-definition 1080x1920 MP4 files, pre-cropped to 9:16 vertical aspect ratio—ready to drag & drop straight into Instagram Reels, YouTube Shorts, or TikTok.'
    },
    {
      q: 'Do I get commercial rights to monetize my channels?',
      a: 'Yes! Every bundle includes a full commercial license. You can edit, add text/captions, overlay voiceovers, and monetize on YouTube, Instagram, Facebook, and TikTok without copyright strikes.'
    },
    {
      q: 'How do I access my videos after purchasing?',
      a: 'Access is instant! After completing your purchase, your bundle will immediately appear in your "My Library" page with direct high-speed download links and Google Drive folder access.'
    },
    {
      q: 'Are there any watermarks or channel logos on the clips?',
      a: 'Zero watermarks! You receive 100% clean, unbranded raw clips ready for your custom branding and text overlays.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20 pt-4">
      
      {/* 1. FEATURED BUNDLES SECTION (STARTS DIRECTLY WITH CATEGORY PILLS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
        {/* Category Pills Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Bundles Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      {/* 2. FREE DEMO SECTION ("TRY BEFORE YOU BUY") */}
      <section id="free-demos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xl relative overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black tracking-wider uppercase border border-emerald-200">
              FREE PREVIEWS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Try Before You Buy
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Watch a couple of free previews from our video library to check the quality and retention before making a purchase.
            </p>
          </div>

          {/* 2 Featured Large Demo Video Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SAMPLE_VIDEOS.slice(0, 2).map((demo) => (
              <div
                key={demo.id}
                onClick={() => openVideoPreview({ title: demo.title, videoUrl: demo.videoUrl, duration: demo.duration })}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-brand-400 overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white rounded-md shadow-sm">
                      FREE DEMO
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/80 text-white rounded">
                      {demo.duration}
                    </span>
                  </div>

                  {/* Center Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 border border-white/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="w-6 h-6 text-brand-600 fill-brand-600 ml-0.5 group-hover:text-white group-hover:fill-white transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-600">{demo.category}</span>
                    <h4 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {demo.title}
                    </h4>
                  </div>
                  <button className="px-4 py-2 text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-200">
                    Watch Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CREATOR BENEFITS & WHY LITTLEVAULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-brand-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Engineered for High Retention</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Toddler reactions and comedy moments naturally achieve 80%+ average watch time on short-form platforms, driving algorithmic virality.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">100% Commercial License</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Use all clips safely across Instagram, YouTube Shorts, Facebook Reels, and TikTok without copyright claim risks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Instant One-Click Download</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              No subscription or waiting required. Buy your bundle once and download organized ZIP folders or sync straight to Google Drive.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 pt-2">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}

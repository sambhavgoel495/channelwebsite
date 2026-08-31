'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_BUNDLES, SAMPLE_VIDEOS } from '@/data/mockData';
import { Bundle } from '@/types';
import { supabase } from '@/lib/supabase';
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
  Flame,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Available Bundles');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>(MOCK_BUNDLES);
  const { openVideoPreview } = useAuth();

  useEffect(() => {
    supabase
      .from('bundles')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const formatted = data.map((b) => {
            const mock = MOCK_BUNDLES.find((m) => m.id === String(b.id));
            return {
              ...(mock || {}),
              id: String(b.id),
              title: b.title,
              slug: b.slug,
              tagline: b.tagline || mock?.tagline || '',
              description: b.description || mock?.description || '',
              price: Number(b.price),
              originalPrice: Number(b.original_price || mock?.originalPrice || 299),
              videoCount: b.video_count || mock?.videoCount || 0,
              category: b.category || mock?.category || 'Trending',
              categoryBadge: b.category_badge || mock?.categoryBadge || '',
              formatBadge: b.format_badge || mock?.formatBadge || '',
              quality: b.quality || mock?.quality || '1080p 9:16 Vertical',
              thumbnail: b.thumbnail || mock?.thumbnail || '',
              previewVideoUrl: b.preview_video_url || mock?.previewVideoUrl || '',
              isPopular: b.is_popular ?? mock?.isPopular ?? false,
              isTrending: b.is_trending ?? mock?.isTrending ?? false,
              rating: Number(b.rating || mock?.rating || 5.0),
              reviewsCount: Number(b.reviews_count || mock?.reviewsCount || 0),
              lockedVideosCount: b.locked_videos_count || mock?.lockedVideosCount || 0,
              freeDemos: mock?.freeDemos || [],
              sampleVideos: mock?.sampleVideos || [],
              whatsInside: b.whats_inside || mock?.whatsInside || [],
              driveUrl: b.drive_url || mock?.driveUrl || (
                String(b.id) === '1'
                  ? 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
                  : String(b.id) === '2'
                    ? 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV'
                    : ''
              ),
            } as Bundle;
          });
          setBundles(formatted);
        }
      });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredBundles = (selectedCategory === 'All Available Bundles' || selectedCategory === 'All Videos')
    ? bundles.filter(b => b.category !== 'Combo' && String(b.id) !== '5')
    : (selectedCategory === 'Combos' || selectedCategory === 'Combo Bundles' || selectedCategory.includes('Combo'))
    ? bundles.filter(b => b.category === 'Combo' || String(b.id) === '5')
    : bundles.filter(b => (b.category === 'Trending' || b.isTrending || b.isPopular) && b.category !== 'Combo' && String(b.id) !== '5');

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

      {/* 1.5 DEDICATED COMBOS SECTION BLOCK */}
      <section id="combos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-brand-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-0.5 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>EXCLUSIVE MEGA SAVER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                🔥 COMBOS
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Get all 4 viral video bundles in one mega pack for ultimate savings.
              </p>
            </div>

            <span className="px-4 py-2 bg-gradient-to-r from-brand-500 to-orange-500 text-white text-xs font-black rounded-2xl shadow-lg border border-orange-400/30 self-start md:self-auto">
              Save ₹1,350 Today (90% OFF)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            {/* Left 4-in-1 Collage Preview */}
            <div className="lg:col-span-4">
              <Link href="/bundles/5" className="group relative aspect-[9/16] max-w-xs mx-auto rounded-2xl overflow-hidden bg-slate-950 block border border-slate-700 shadow-2xl">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 group-hover:scale-105 transition-transform duration-500">
                  <img src="/roblox_reels_bundle.jpg" alt="Roblox" className="w-full h-full object-cover rounded-tl-lg" />
                  <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-tr-lg" />
                  <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-bl-lg" />
                  <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-br-lg" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-brand-500 text-white rounded-lg">
                    4-IN-1 MEGA COMBO
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/90 text-slate-200 rounded">
                    15,000+ CLIPS
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Combo Info & Action */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-orange-500/20 text-orange-400 rounded border border-orange-500/30">
                  BESTSELLER COMBO
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  🔥 Ultimate 4-in-1 Creator Combo Pack
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  Unlock lifetime access to Roblox (3,000+), BeamNG Car Crash (8,000+), AI Girls Dancing (3,000+), and Stickman Action (1,000+) bundles in one massive combo!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">ROBLOX</span>
                  <span className="text-xs font-black text-white">3,000+ Clips</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">CAR CRASH</span>
                  <span className="text-xs font-black text-white">8,000+ Clips</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">AI DANCING</span>
                  <span className="text-xs font-black text-white">3,000+ Clips</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">STICKMAN</span>
                  <span className="text-xs font-black text-white">1,000+ Clips</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Mega Combo Price</span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span className="text-3xl font-black text-white">₹149</span>
                    <span className="text-sm text-slate-500 line-through">₹1,499</span>
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                      90% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href="/bundles/5"
                    className="px-6 py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white text-xs font-black rounded-2xl shadow-xl orange-glow transition-all flex items-center justify-center space-x-2"
                  >
                    <span>View Combo Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
            {[SAMPLE_VIDEOS[0], SAMPLE_VIDEOS[2]].map((demo) => (
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

        <div className="space-y-3 pt-2">
          {faqs.map((faq, i) => {
            const isOpen = openFaqs.includes(i);
            return (
              <div 
                key={i} 
                className={`rounded-2xl bg-white border transition-colors duration-200 shadow-sm overflow-hidden ${
                  isOpen ? 'border-brand-300 ring-1 ring-brand-200/50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors select-none focus:outline-none group cursor-pointer"
                >
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    <span className="group-hover:text-brand-600 transition-colors">{faq.q}</span>
                  </h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-orange-100 text-brand-600 rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-xs text-slate-600 pl-6 leading-relaxed font-medium border-t border-slate-100 pt-3">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>



    </div>
  );
}

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
      q: 'What format are the videos provided in?',
      a: 'All videos are delivered in high-definition 1080x1920 MP4 files, pre-formatted to 9:16 vertical aspect ratio—ready to drop straight into Instagram Reels, YouTube Shorts, or TikTok.'
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
    <div className="space-y-12 md:space-y-16 pb-20 pt-2">
      
      {/* 1. FEATURED BUNDLES SECTION WITH CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Category Pills Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Bundles Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-1">
          {filteredBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      {/* 2. DEDICATED MEGA COMBOS BLOCK */}
      <section id="combos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-card relative overflow-hidden space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-md text-amber-300 text-[11px] font-semibold uppercase tracking-wider">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>EXCLUSIVE MEGA SAVER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Creator Combo Pack
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal">
                Get all 4 viral video bundles in one mega pack for ultimate savings.
              </p>
            </div>

            <span className="px-3 py-1.5 bg-zinc-900 text-zinc-300 text-xs font-semibold rounded-lg border border-zinc-800 self-start md:self-auto">
              Save ₹1,350 Today (90% OFF)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-zinc-900/60 p-5 rounded-xl border border-zinc-800">
            {/* Left 4-in-1 Collage Preview */}
            <div className="lg:col-span-4">
              <Link href="/bundles/5" className="group relative aspect-[9/16] max-w-xs mx-auto rounded-xl overflow-hidden bg-zinc-950 block border border-zinc-800 shadow-card">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 group-hover:scale-[1.03] transition-transform duration-300">
                  <img src="/roblox_reels_bundle.jpg" alt="Roblox" className="w-full h-full object-cover rounded-tl-md" />
                  <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-tr-md" />
                  <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-bl-md" />
                  <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-br-md" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-orange-600 text-white rounded">
                    4-IN-1 COMBO
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-medium bg-black/70 text-zinc-300 rounded">
                    15,000+ CLIPS
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Combo Info & Action */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1.5">
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-orange-500/15 text-orange-400 rounded border border-orange-500/25">
                  BESTSELLER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Ultimate 4-in-1 Creator Combo Pack
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                  Unlock lifetime access to Roblox (3,000+), BeamNG Car Crash (8,000+), AI Girls Dancing (3,000+), and Stickman Action (1,000+) bundles in one massive collection.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 font-semibold block uppercase">ROBLOX</span>
                  <span className="text-xs font-bold text-white">3,000+ Clips</span>
                </div>
                <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 font-semibold block uppercase">CAR CRASH</span>
                  <span className="text-xs font-bold text-white">8,000+ Clips</span>
                </div>
                <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 font-semibold block uppercase">AI DANCING</span>
                  <span className="text-xs font-bold text-white">3,000+ Clips</span>
                </div>
                <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 font-semibold block uppercase">STICKMAN</span>
                  <span className="text-xs font-bold text-white">1,000+ Clips</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-zinc-800">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Combo Price</span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span className="text-2xl font-bold text-white">₹149</span>
                    <span className="text-xs text-zinc-500 line-through">₹1,499</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/25">
                      90% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href="/bundles/5"
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>View Combo Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREE DEMO SECTION ("TRY BEFORE YOU BUY") */}
      <section id="free-demos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-card space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold tracking-wide uppercase border border-emerald-200/60">
              FREE PREVIEWS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              Try Before You Buy
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-normal">
              Watch free video previews across our top categories to verify retention and visual quality.
            </p>
          </div>

          {/* 5 Featured Compact Demo Video Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              SAMPLE_VIDEOS.find(v => v.id === 'demo-1') || SAMPLE_VIDEOS[0],
              SAMPLE_VIDEOS.find(v => v.id === 'demo-3') || SAMPLE_VIDEOS[2],
              SAMPLE_VIDEOS.find(v => v.id === 'demo-7') || SAMPLE_VIDEOS[4],
              SAMPLE_VIDEOS.find(v => v.id === 'demo-9') || SAMPLE_VIDEOS[6],
              SAMPLE_VIDEOS.find(v => v.id === 'demo-15') || SAMPLE_VIDEOS[12],
            ].filter(Boolean).map((demo) => (
              <div
                key={demo.id}
                onClick={() => openVideoPreview({ title: demo.title, videoUrl: demo.videoUrl, duration: demo.duration })}
                className="group relative bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 shrink-0">
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-emerald-600 text-white rounded">
                      FREE DEMO
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-medium bg-black/60 text-white rounded">
                      {demo.duration}
                    </span>
                  </div>

                  {/* Center Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 border border-white/40 flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-105 transition-all shadow-xs">
                      <Play className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900 ml-0.5 group-hover:text-white group-hover:fill-white transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-orange-600 block mb-0.5">
                      {demo.category}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-1 leading-snug">
                      {demo.title}
                    </h4>
                  </div>
                  
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px]">
                    <span className="font-medium text-zinc-400">{demo.viewsCount || 'Viral'}</span>
                    <span className="font-semibold text-orange-600 group-hover:underline flex items-center">
                      <span>Watch</span>
                      <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CREATOR BENEFITS & WHY LITTLEVAULT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">Engineered for High Retention</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Fast-paced hooks and engaging visual cuts naturally maximize watch time on short-form platforms.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">100% Commercial License</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Use all clips safely across Instagram, YouTube Shorts, Facebook Reels, and TikTok with full monetization rights.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">Instant Download & Drive Access</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              No subscription or wait time. Unlock once and access high-speed downloads or direct Google Drive cloud folders anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-semibold uppercase tracking-wider border border-zinc-200">
            <HelpCircle className="w-3 h-3 text-orange-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5 pt-1">
          {faqs.map((faq, i) => {
            const isOpen = openFaqs.includes(i);
            return (
              <div 
                key={i} 
                className={`rounded-xl bg-white border transition-colors shadow-card overflow-hidden ${
                  isOpen ? 'border-zinc-300' : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 transition-colors select-none focus:outline-none group cursor-pointer"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span className="group-hover:text-orange-600 transition-colors">{faq.q}</span>
                  </h4>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 bg-zinc-100 text-zinc-900' : 'bg-zinc-50 text-zinc-500 group-hover:bg-zinc-100'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-xs text-zinc-600 pl-5 leading-relaxed font-normal border-t border-zinc-100 pt-2.5">
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

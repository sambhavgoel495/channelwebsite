'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BundleCard } from '@/components/BundleCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useAuth } from '@/context/AuthContext';
import { 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ArrowRight,
  Flame,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_BUNDLES, SAMPLE_VIDEOS } from '@/data/mockData';
import { Bundle } from '@/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Available Bundles');
  const [bundles, setBundles] = useState<Bundle[]>(MOCK_BUNDLES);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openVideoPreview, openQuickBuy } = useAuth();

  useEffect(() => {
    async function fetchBundles() {
      try {
        const { data, error } = await supabase
          .from('bundles')
          .select('*')
          .order('price', { ascending: true });

        if (error) {
          console.warn('Using local bundles fallback:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const mappedBundles: Bundle[] = data.map((b: any) => ({
            id: String(b.id),
            title: b.title,
            slug: b.slug || `bundle-${b.id}`,
            tagline: b.tagline || '',
            description: b.description || '',
            price: Number(b.price) || 39,
            originalPrice: Number(b.original_price) || 399,
            videoCount: Number(b.video_count) || 50,
            category: b.category || 'Trending',
            categoryBadge: b.category_badge || b.category || 'REELS PACK',
            formatBadge: b.format_badge || '9:16 VERTICAL HD',
            quality: b.quality || '1080p 9:16 Vertical',
            thumbnail: b.thumbnail || '/roblox_reels_bundle.jpg',
            previewVideoUrl: b.preview_video_url || '/robloxdemo1.mp4',
            isPopular: b.is_popular ?? true,
            isTrending: b.is_trending ?? true,
            rating: Number(b.rating) || 4.9,
            reviewsCount: Number(b.reviews_count) || 120,
            freeDemos: b.free_demos || [],
            lockedVideosCount: Number(b.locked_videos_count) || 48,
            sampleVideos: b.sample_videos || [],
            whatsInside: b.whats_inside || [],
            driveUrl: b.drive_url,
          }));

          setBundles(mappedBundles);
        }
      } catch (err) {
        console.error('Error fetching bundles from Supabase:', err);
      }
    }

    fetchBundles();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredBundles = (selectedCategory === 'All Available Bundles' || selectedCategory === 'All Videos')
    ? bundles.filter(b => b.category !== 'Combo' && String(b.id) !== '5' && String(b.id) !== '10')
    : (selectedCategory === 'Combos' || selectedCategory === 'Combo Bundles' || selectedCategory.includes('Combo'))
    ? bundles.filter(b => b.category === 'Combo' || String(b.id) === '5' || String(b.id) === '10')
    : bundles.filter(b => (b.category === 'Trending' || b.isTrending || b.isPopular) && b.category !== 'Combo' && String(b.id) !== '5' && String(b.id) !== '10');

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

  // 5 Featured Demo Reels for the All Bundles section
  const masterDemos = [
    {
      name: 'Roblox Reel',
      title: 'Roblox Viral Parkour Reel',
      videoUrl: '/robloxdemo1.mp4',
      thumbnail: '/roblox_reels_bundle.jpg',
      badge: 'Roblox'
    },
    {
      name: 'Car Crash',
      title: 'BeamNG Car Crash Test',
      videoUrl: '/carcrashdemo1.mp4',
      thumbnail: '/car_crash_bundle.jpg',
      badge: 'Car Crash'
    },
    {
      name: 'Satisfying',
      title: 'Oddly Satisfying Kinetic Sand',
      videoUrl: '/satisfyingdemo1.mp4',
      thumbnail: '/satisfying_reels_bundle.jpg',
      badge: 'Satisfying'
    },
    {
      name: 'Stickman',
      title: 'Stickman Epic Action Reel',
      videoUrl: '/stickmandemo1.mp4',
      thumbnail: '/stickman_content_bundle.jpg',
      badge: 'Stickman'
    },
    {
      name: 'Free Fire',
      title: 'Free Fire Gaming Clutch',
      videoUrl: '/freefiredemo1.mp4',
      thumbnail: '/freefire_reels_bundle.jpg',
      badge: 'Free Fire'
    }
  ];

  const comboBundle = bundles.find(b => String(b.id) === '5') || MOCK_BUNDLES.find(b => String(b.id) === '5');
  const allMasterBundle = bundles.find(b => String(b.id) === '10') || MOCK_BUNDLES.find(b => String(b.id) === '10');

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

      {/* 2. DEDICATED MEGA COMBOS & ALL BUNDLES SIDE-BY-SIDE OFFERS */}
      <section id="combos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-md text-amber-700 text-[11px] font-semibold uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>SPECIAL VALUE OFFERS</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
              Exclusive Combo & Master Vaults
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-normal">
            Bundle up multiple niches and save over 90% with lifetime Google Drive access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: 4-in-1 Combo Pack (₹99 / ₹1199) */}
          <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-card flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  🔥 4-IN-1 MEGA COMBO
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  92% OFF
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Ultimate 4-in-1 Creator Combo
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Includes 4 popular video vaults in one pack: Roblox, BeamNG Car Crash, AI Girls Dancing & Stickman.
                </p>
              </div>

              {/* 4-in-1 Mini Visual Collage */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { title: 'Roblox (3K+)', img: '/roblox_reels_bundle.jpg' },
                  { title: 'Car Crash (8K+)', img: '/car_crash_bundle.jpg' },
                  { title: 'AI Girls (3K+)', img: '/ai_girls_dancing_bundle.png' },
                  { title: 'Stickman (1K+)', img: '/stickman_content_bundle.jpg' },
                ].map((item, idx) => (
                  <div key={idx} className="relative aspect-[9/16] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 group">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1 left-1 right-1 text-[8px] font-medium text-white text-center truncate">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Total Videos Included:</span>
                  <span className="text-white font-bold">100,000+ Clips</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Google Drive Folders:</span>
                  <span className="text-emerald-400 font-bold">4 Direct Folders</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Special Price</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-bold text-white">₹99</span>
                  <span className="text-xs text-zinc-500 line-through">₹1,199</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {comboBundle && (
                  <button
                    onClick={() => openQuickBuy(comboBundle)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Unlock for ₹99</span>
                  </button>
                )}
                <Link
                  href="/bundles/5"
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: All Bundles 8-in-1 Master Vault (₹149 / ₹2499) with 4-5 Demo Previews */}
          <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-orange-500/40 shadow-card flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase bg-orange-600 text-white rounded shadow-xs">
                  🎯 ALL BUNDLES • 8-IN-1 MASTER VAULT
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  94% OFF
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  All 8 Bundles Complete Master Vault
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Every single video pack on LittleVault: Roblox, Car Crash, Stickman, Satisfying, Quotes, Mix Reels, Free Fire & AI Dancing.
                </p>
              </div>

              {/* 5 Demo Videos with Play Overlay */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 flex items-center space-x-1">
                  <Play className="w-3 h-3 fill-orange-400" />
                  <span>Click to Watch Demo Previews (5 Demos):</span>
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {masterDemos.map((demo, idx) => (
                    <div
                      key={idx}
                      onClick={() => openVideoPreview({ title: demo.title, videoUrl: demo.videoUrl })}
                      className="group relative aspect-[9/16] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer shadow-xs hover:border-orange-500 transition-colors"
                    >
                      <img src={demo.thumbnail} alt={demo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center shadow-xs">
                          <Play className="w-2.5 h-2.5 text-zinc-950 fill-zinc-950 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 left-0.5 right-0.5 text-[8px] font-semibold text-white text-center truncate bg-black/70 rounded px-0.5">
                        {demo.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Total Vault Content:</span>
                  <span className="text-white font-bold">1,000,000+ Clips</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">Google Drive Folders:</span>
                  <span className="text-emerald-400 font-bold">All 8 Cloud Folders</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-semibold">Master Pack Price</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-bold text-white">₹149</span>
                  <span className="text-xs text-zinc-500 line-through">₹2,499</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {allMasterBundle && (
                  <button
                    onClick={() => openQuickBuy(allMasterBundle)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Unlock All for ₹149</span>
                  </button>
                )}
                <Link
                  href="/bundles/10"
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Details
                </Link>
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-xs group-hover:bg-orange-600 group-hover:scale-105 transition-all">
                      <Play className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900 ml-0.5 group-hover:text-white group-hover:fill-white" />
                    </div>
                  </div>
                  {demo.duration && (
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-semibold bg-black/70 text-white rounded">
                      {demo.duration}
                    </span>
                  )}
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1">
                  <h4 className="text-xs font-bold text-zinc-900 truncate group-hover:text-orange-600 transition-colors">
                    {demo.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                    <span className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700">{demo.category}</span>
                    <span className="text-orange-600 font-semibold">Play Demo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">High-Retention Hooks</h3>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Curated viral content tested for high audience watch time and algorithm boosts on short-form feeds.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
              <Download className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">Instant Cloud Access</h3>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Immediate Google Drive and direct MP4 downloads upon checkout with lifetime file access.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-card space-y-2.5">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950">Commercial License</h3>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              100% royalty-free content. Monetize on YouTube Shorts, Instagram Reels, and TikTok safely.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faqs" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1.5">
          <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-semibold tracking-wide uppercase border border-zinc-200">
            FAQ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-normal">
            Everything you need to know about video packs, licenses, and downloads.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-white border border-zinc-200 overflow-hidden shadow-card transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3.5 text-left flex items-center justify-between text-xs font-bold text-zinc-900 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>

              {openFaq === index && (
                <div className="px-4 pb-3.5 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-2.5 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

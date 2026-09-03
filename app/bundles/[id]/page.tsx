'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Star, 
  Zap, 
  Lock, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_BUNDLES, SAMPLE_VIDEOS } from '@/data/mockData';
import { RobloxBundleDescription } from '@/components/RobloxBundleDescription';
import { CarCrashBundleDescription } from '@/components/CarCrashBundleDescription';
import { StickmanBundleDescription } from '@/components/StickmanBundleDescription';
import { ComboBundleDescription } from '@/components/ComboBundleDescription';
import { SatisfyingBundleDescription } from '@/components/SatisfyingBundleDescription';
import { MotivationalBundleDescription } from '@/components/MotivationalBundleDescription';
import { MixBundleDescription } from '@/components/MixBundleDescription';
import { FreeFireBundleDescription } from '@/components/FreeFireBundleDescription';
import { AIInfluencerBundleDescription } from '@/components/AIInfluencerBundleDescription';
import { AllBundlesDescription } from '@/components/AllBundlesDescription';
import { DriveDropdown } from '@/components/DriveDropdown';
import { DemoVideoCard } from '@/components/DemoVideoCard';

export default function BundleDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { openQuickBuy, openVideoPreview, hasPurchased, addToast } = useAuth();

  const [bundle, setBundle] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBundle = async () => {
    setLoading(true);
    setError(null);

    // Try finding bundle by ID first
    let { data: bundleData, error: bundleError } = await supabase
      .from('bundles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    // Fallback: try finding bundle by slug
    if (!bundleData && !bundleError) {
      const { data: slugBundle, error: slugError } = await supabase
        .from('bundles')
        .select('*')
        .eq('slug', id)
        .maybeSingle();

      bundleData = slugBundle;
      bundleError = slugError;
    }

    if (bundleError) {
      console.error('Bundle fetch error:', bundleError);
      setError(bundleError.message || 'Failed to load bundle details from Supabase.');
      setLoading(false);
      return;
    }

    if (!bundleData) {
      setBundle(null);
      setLoading(false);
      return;
    }

    const formatted = {
      ...bundleData,
      originalPrice: bundleData.original_price || bundleData.originalPrice || 299,
      videoCount: bundleData.video_count || bundleData.videoCount || 0,
      categoryBadge: bundleData.category_badge || bundleData.categoryBadge || '',
      formatBadge: bundleData.format_badge || bundleData.formatBadge || '',
      previewVideoUrl: bundleData.preview_video_url || bundleData.previewVideoUrl || '',
      driveUrl: bundleData.drive_url || bundleData.driveUrl || (
        String(bundleData.id) === '1'
          ? 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
          : String(bundleData.id) === '2'
            ? 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV'
            : ''
      ),
    };
    setBundle(formatted);

    // Fetch videos belonging to this bundle from public.videos
    const { data: videoData, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('bundle_id', bundleData.id)
      .order('created_at', { ascending: true });

    if (videoError) {
      console.error('Videos fetch error from Supabase:', videoError);
    } else {
      setVideos(videoData || []);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    loadBundle();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-semibold text-zinc-500">
          Loading bundle & demo videos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 bg-rose-50 border border-rose-200 rounded-2xl m-8 p-8">
        <h2 className="text-lg font-bold text-rose-800">
          Failed to load bundle videos
        </h2>
        <p className="text-xs text-rose-600 font-medium max-w-md mx-auto">
          {error}
        </p>
        <button
          onClick={loadBundle}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-lg font-bold text-zinc-900">
          Bundle not found
        </h2>
      </div>
    );
  }

  const isPurchased = hasPurchased(bundle.id);

  // Demo clips fetched from Supabase public.videos for this bundle
  const mockFallback = MOCK_BUNDLES.find((b) => String(b.id) === String(bundle.id));
  const demoClips = String(bundle.id) === '3'
    ? [SAMPLE_VIDEOS.find(v => v.id === 'demo-ai-1')!, SAMPLE_VIDEOS.find(v => v.id === 'demo-ai-2')!].filter(Boolean)
    : (videos.length > 0 ? videos.slice(0, 2) : (mockFallback?.freeDemos || []));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-medium text-zinc-500">
        <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-900 truncate font-semibold">{bundle.title}</span>
      </div>

      {/* Main Bundle Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Demo Videos OR Vertical Combo Poster Box */}
        <div className="lg:col-span-6 space-y-4">
          {String(bundle.id) === '5' || String(bundle.id) === '10' ? (
            /* Vertical 9:16 Combo Poster Box */
            <div className="relative aspect-[9/16] w-full rounded-2xl bg-zinc-950 border border-zinc-800 shadow-card overflow-hidden flex flex-col justify-between p-4 group">
              {/* 2x2 Image Collage */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-zinc-950">
                <img src="/roblox_reels_bundle.jpg" alt="Roblox Reels" className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-[1.03] transition-transform duration-300" />
                <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-[1.03] transition-transform duration-300" />
                <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-[1.03] transition-transform duration-300" />
                <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-[1.03] transition-transform duration-300" />
              </div>

              {/* Gradient overlays for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/60 pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-600 text-white rounded-md shadow-xs">
                  {String(bundle.id) === '10' ? '8-IN-1 MASTER VAULT' : '4-IN-1 MEGA COMBO'}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-zinc-900/90 text-amber-400 rounded-md border border-zinc-800 backdrop-blur-sm">
                  {String(bundle.id) === '10' ? '1,000,000+ CLIPS' : '100,000+ CLIPS'}
                </span>
              </div>

              {/* Center Combo Overlay Badge */}
              <div className="relative z-10 text-center space-y-2 py-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">ALL 4 VAULTS INCLUDED</span>
                </div>
              </div>

              {/* Bottom Specs Overlay */}
              <div className="relative z-10 p-3.5 bg-zinc-900/90 backdrop-blur-md rounded-xl border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
                  <span>Roblox (3,000+)</span>
                  <span>Car Crash (8,000+)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
                  <span>AI Influencer (3,000+)</span>
                  <span>Stickman (1,000+)</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase text-amber-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Commercial License Included</span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25">
                    SAVE ₹1,350
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Standard DEMO VIDEOS for Individual Bundles */
            <>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-orange-600 fill-orange-600" />
                  <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                    Free Previews
                  </h2>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                  2 HD Previews
                </span>
              </div>

              {/* 2 Vertical 9:16 Native Video Reel Cards Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {demoClips.map((demo, idx) => (
                  <DemoVideoCard
                    key={demo.id || idx}
                    demo={demo}
                    idx={idx}
                    onExpand={openVideoPreview}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: Bundle Information & Purchase CTA */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-md">
                {bundle.category}
              </span>
              <div className="flex items-center space-x-1 text-amber-500 text-xs font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{bundle.rating} ({bundle.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              {bundle.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-orange-600">
              {bundle.tagline}
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              {bundle.description}
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-white border border-zinc-200 shadow-card">
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Total Videos</span>
              <p className="text-xs font-bold text-zinc-900 mt-0.5">{bundle.videoCount} Clips</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Format</span>
              <p className="text-xs font-bold text-zinc-900 mt-0.5">9:16 Vertical</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Resolution</span>
              <p className="text-xs font-bold text-zinc-900 mt-0.5">1080p MP4</p>
            </div>
          </div>

          {/* Pricing Box & CTA */}
          <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3.5 shadow-card">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-semibold tracking-wider">Bundle Price</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-bold text-zinc-950">₹{bundle.price}</span>
                  {bundle.originalPrice && (
                    <span className="text-xs text-zinc-400 line-through font-normal">₹{bundle.originalPrice}</span>
                  )}
                  {bundle.originalPrice && bundle.price && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                      {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isPurchased ? (
              <div className="space-y-2.5">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You own this bundle! Instant access unlocked.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {String(bundle.id) === '7' ? (
                    <DriveDropdown
                      links={[
                        { label: 'Quotes Pack (Part 1)', url: 'https://drive.google.com/file/d/1AiBYpIBTlT2YqYDeAn2RTreGzTtVMBZ5/view?usp=drivesdk', badge: 'Part 1' },
                        { label: 'Quotes Pack (Part 2)', url: 'https://drive.google.com/file/d/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk', badge: 'Part 2' }
                      ]}
                      className="w-full"
                    />
                  ) : String(bundle.id) === '10' ? (
                    <DriveDropdown
                      links={[
                        { label: 'Roblox (3K+ Reels)', url: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB', badge: 'Roblox' },
                        { label: 'Car Crash (8K+ Videos)', url: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV', badge: 'Crash' },
                        { label: 'Stickman (1K+ Clips)', url: 'https://drive.google.com/drive/folders/1Y9aHMGLfSXfXzGKNkZcbNPSiVPkBoGt0', badge: 'Stickman' },
                        { label: 'Satisfying (1K+ Reels)', url: 'https://drive.google.com/drive/folders/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk', badge: 'Satisfying' },
                        { label: 'Quotes Pack (Part 1)', url: 'https://drive.google.com/file/d/1AiBYpIBTlT2YqYDeAn2RTreGzTtVMBZ5/view?usp=drivesdk', badge: 'Quotes 1' },
                        { label: 'Quotes Pack (Part 2)', url: 'https://drive.google.com/file/d/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk', badge: 'Quotes 2' },
                        { label: 'Mix Reels (60K+ Pack)', url: 'https://drive.google.com/drive/folders/1R0YYII2rF3iv8X26iCQ_BXzT6w-uMOAQ', badge: 'Mix 60K' },
                        { label: 'Free Fire (3.6K+ Reels)', url: 'https://drive.google.com/drive/folders/1SOGtLNLJG7ZZaNZkZezhV6A7t-ASswqb', badge: 'Free Fire' },
                      ]}
                      className="w-full"
                    />
                  ) : String(bundle.id) === '5' ? (
                    <DriveDropdown
                      links={[
                        { label: 'Roblox (3K+ Reels)', url: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB', badge: 'Roblox' },
                        { label: 'Car Crash (8K+ Videos)', url: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV', badge: 'Crash' },
                        { label: 'Stickman (1K+ Clips)', url: 'https://drive.google.com/drive/folders/1Y9aHMGLfSXfXzGKNkZcbNPSiVPkBoGt0', badge: 'Stickman' },
                        { label: 'AI Girls (3K+ Reels)', url: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV', badge: 'AI Girls' },
                      ]}
                      className="w-full"
                    />
                  ) : (
                    <a
                      href={bundle.driveUrl || (
                        String(bundle.id) === '1'
                          ? 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
                          : String(bundle.id) === '2'
                            ? 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV'
                            : String(bundle.id) === '4'
                              ? 'https://drive.google.com/drive/folders/1Y9aHMGLfSXfXzGKNkZcbNPSiVPkBoGt0'
                              : String(bundle.id) === '8'
                                ? 'https://drive.google.com/drive/folders/1R0YYII2rF3iv8X26iCQ_BXzT6w-uMOAQ'
                                : String(bundle.id) === '9'
                                  ? 'https://drive.google.com/drive/folders/1SOGtLNLJG7ZZaNZkZezhV6A7t-ASswqb'
                                  : '#'
                      )}
                      target={bundle.driveUrl || String(bundle.id) === '1' || String(bundle.id) === '2' || String(bundle.id) === '4' || String(bundle.id) === '8' || String(bundle.id) === '9' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Drive</span>
                    </a>
                  )}
                  <Link
                    href="/my-library"
                    className="py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-lg flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                  >
                    <span>My Library</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Unlock Instant Access — ₹{bundle.price}</span>
              </button>
            )}

            <div className="flex items-center justify-around text-[11px] text-zinc-500 font-medium pt-2 border-t border-zinc-100">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Commercial Rights</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Download className="w-3.5 h-3.5 text-orange-600" />
                <span>Instant Cloud Access</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Rich Bundle Sales Description Components */}
      {String(bundle.id) === '1' && <RobloxBundleDescription bundle={bundle} />}
      {String(bundle.id) === '2' && <CarCrashBundleDescription bundle={bundle} />}
      {String(bundle.id) === '3' && <AIInfluencerBundleDescription bundle={bundle} />}
      {String(bundle.id) === '4' && <StickmanBundleDescription bundle={bundle} />}
      {String(bundle.id) === '5' && <ComboBundleDescription bundle={bundle} />}
      {String(bundle.id) === '6' && <SatisfyingBundleDescription bundle={bundle} />}
      {String(bundle.id) === '7' && <MotivationalBundleDescription bundle={bundle} />}
      {String(bundle.id) === '8' && <MixBundleDescription bundle={bundle} />}
      {String(bundle.id) === '9' && <FreeFireBundleDescription bundle={bundle} />}
      {String(bundle.id) === '10' && <AllBundlesDescription bundle={bundle} />}

      {/* What's Inside & Locked Grid Section */}
      <div className="space-y-4 pt-4 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
              CONTENT LIST
            </span>
            <h2 className="text-xl font-bold text-zinc-950 tracking-tight mt-1">
              What&apos;s Inside This Pack ({bundle.videoCount} Videos)
            </h2>
            <p className="text-xs text-zinc-600 font-normal">
              All clips are pre-formatted to 9:16 vertical 1080p MP4 with zero watermarks.
            </p>
          </div>

          {!isPurchased && (
            <button
              onClick={() => openQuickBuy(bundle)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>Unlock Pack for ₹{bundle.price}</span>
            </button>
          )}
        </div>

        {/* 12 Sample Locked Video Card Placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-[9/16] rounded-xl bg-zinc-950 overflow-hidden border border-zinc-200 shadow-card"
            >
              <img
                src={bundle.thumbnail}
                alt={`Video #${i + 1}`}
                className="w-full h-full object-cover filter blur-[2px] opacity-60 scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-1.5 p-2 text-center">
                <div className="w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-[10px] font-semibold text-white">Video #{i + 1}</span>
                <span className="text-[8px] font-medium text-zinc-300 uppercase">1080p 9:16 MP4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

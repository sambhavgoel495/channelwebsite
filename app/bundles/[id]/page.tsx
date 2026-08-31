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
  FolderDown,
  Sparkles,
  Video,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_BUNDLES } from '@/data/mockData';
import { RobloxBundleDescription } from '@/components/RobloxBundleDescription';
import { CarCrashBundleDescription } from '@/components/CarCrashBundleDescription';
import { StickmanBundleDescription } from '@/components/StickmanBundleDescription';
import { ComboBundleDescription } from '@/components/ComboBundleDescription';

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
        <p className="text-sm font-bold text-slate-500">
          Loading bundle & demo videos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 bg-rose-50 border border-rose-200 rounded-3xl m-8 p-8">
        <h2 className="text-xl font-black text-rose-800">
          Failed to load bundle videos from Supabase
        </h2>
        <p className="text-xs text-rose-600 font-medium max-w-md mx-auto">
          {error}
        </p>
        <button
          onClick={loadBundle}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md transition-colors"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-black text-slate-900">
          Bundle not found
        </h2>
      </div>
    );
  }

  const isPurchased = hasPurchased(bundle.id);

  // Demo clips fetched from Supabase public.videos for this bundle
  const mockFallback = MOCK_BUNDLES.find((b) => String(b.id) === String(bundle.id));
  const demoClips = videos.length > 0 ? videos.slice(0, 2) : (mockFallback?.freeDemos || []);

  const handleMockDownload = () => {
    addToast(`📥 Download Started: "${bundle.title}" (1080p 9:16 MP4 Archive). Check your downloads folder.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-900 truncate">{bundle.title}</span>
      </div>

      {/* Main Bundle Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Demo Videos OR Vertical Combo Poster Box */}
        <div className="lg:col-span-6 space-y-4">
          {String(bundle.id) === '5' || bundle.category === 'Combo' ? (
            /* Vertical 9:16 Combo Poster Box (Black Background, No Demo Videos) */
            <div className="relative aspect-[9/16] w-full rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between p-4 group">
              {/* 2x2 Image Collage */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-slate-950">
                <img src="/roblox_reels_bundle.jpg" alt="Roblox Reels" className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500" />
                <img src="/car_crash_bundle.jpg" alt="Car Crash" className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500" />
                <img src="/ai_girls_dancing_bundle.png" alt="AI Girls" className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500" />
                <img src="/stickman_content_bundle.jpg" alt="Stickman" className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Gradient overlays for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 text-white rounded-xl shadow-lg orange-glow">
                  🔥 4-IN-1 MEGA COMBO
                </span>
                <span className="px-2.5 py-1 text-xs font-extrabold bg-slate-900/90 text-amber-400 rounded-xl border border-slate-700 backdrop-blur-md">
                  15,000+ CLIPS
                </span>
              </div>

              {/* Center Combo Overlay Badge */}
              <div className="relative z-10 text-center space-y-2 py-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                  <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="text-sm font-black text-white uppercase tracking-wider">ALL 4 VAULTS INCLUDED</span>
                </div>
              </div>

              {/* Bottom Specs Overlay */}
              <div className="relative z-10 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>🎮 Roblox (3,000+)</span>
                  <span>🚗 Car Crash (8,000+)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>💃 AI Dancing (3,000+)</span>
                  <span>🥷 Stickman (1,000+)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-amber-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Commercial License Included</span>
                  </span>
                  <span className="text-xs font-black text-white bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    SAVE ₹1,350
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Standard DEMO VIDEOS for Individual Bundles */
            <>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-brand-500" />
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    DEMO VIDEOS
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-orange-100 text-brand-600 rounded border border-orange-200">
                  2 Free 9:16 Previews
                </span>
              </div>

              {/* 2 Vertical 9:16 Reel Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {demoClips.map((demo, idx) => (
                  <div
                    key={demo.id || idx}
                    onClick={() => openVideoPreview({ title: demo.title, videoUrl: demo.video_url || demo.videoUrl, duration: demo.duration })}
                    className="group relative bg-slate-900 rounded-3xl border border-slate-200 hover:border-brand-400 overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* 9:16 Aspect Reel Box */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      <img
                        src={demo.thumbnail}
                        alt={demo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      {/* Top Demo Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-brand-500 text-white rounded shadow-sm">
                          DEMO #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/80 text-white rounded backdrop-blur-sm">
                          {demo.duration}
                        </span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 border border-white/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                          <Play className="w-5 h-5 text-brand-600 fill-brand-600 ml-0.5 group-hover:text-white group-hover:fill-white transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Details & Watch Button */}
                    <div className="p-3 bg-white space-y-2 border-t border-slate-100 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase text-brand-600 block">9:16 Vertical HD</span>
                        <p className="text-xs font-extrabold text-slate-900 truncate mt-0.5">{demo.title}</p>
                      </div>

                      <button className="w-full py-2 bg-slate-100 group-hover:bg-brand-500 text-slate-800 group-hover:text-white text-[11px] font-extrabold rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 shadow-sm">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Demo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: Bundle Information & Purchase CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-black uppercase bg-orange-100 text-brand-600 border border-orange-200 rounded-lg">
                {bundle.category}
              </span>
              <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{bundle.rating} ({bundle.reviewsCount} creator reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {bundle.title}
            </h1>

            <p className="text-sm font-extrabold text-brand-600">
              {bundle.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {bundle.description}
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Total Videos</span>
              <p className="text-sm font-black text-slate-900 mt-0.5">{bundle.videoCount} Clips</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Format</span>
              <p className="text-sm font-black text-slate-900 mt-0.5">9:16 Vertical</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Resolution</span>
              <p className="text-sm font-black text-slate-900 mt-0.5">1080p MP4</p>
            </div>
          </div>

          {/* Pricing Box & CTA */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xl">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Lifetime Bundle Price</span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-3xl font-black text-slate-900">₹{bundle.price}</span>
                  {bundle.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">₹{bundle.originalPrice}</span>
                  )}
                  {bundle.originalPrice && bundle.price && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 rounded-md border border-emerald-200">
                      {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isPurchased ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You own this bundle! Instant downloads available.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={bundle.driveUrl || (
                      String(bundle.id) === '1'
                        ? 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
                        : String(bundle.id) === '2'
                          ? 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV'
                          : '#'
                    )}
                    target={bundle.driveUrl || String(bundle.id) === '1' || String(bundle.id) === '2' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="py-3 bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md orange-glow transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Google Drive</span>
                  </a>
                  <Link
                    href="/my-library"
                    className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <span>My Library</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="w-full py-4 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-xl orange-glow transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy & Unlock Instant Access — ₹{bundle.price}</span>
              </button>
            )}

            <div className="flex items-center justify-around text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-100">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Commercial Rights</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Download className="w-3.5 h-3.5 text-brand-500" />
                <span>Instant Google Drive Link</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Rich Roblox Sales Description (Rendered for Roblox Reels Bundle id: 1) */}
      {String(bundle.id) === '1' && (
        <RobloxBundleDescription bundle={bundle} />
      )}

      {/* Rich Car Crash Sales Description (Rendered for Car Crash Bundle id: 2) */}
      {String(bundle.id) === '2' && (
        <CarCrashBundleDescription bundle={bundle} />
      )}

      {/* Rich Stickman Sales Description (Rendered for Stickman Bundle id: 4) */}
      {String(bundle.id) === '4' && (
        <StickmanBundleDescription bundle={bundle} />
      )}

      {/* Rich Combo Sales Description (Rendered for Combo Pack id: 5) */}
      {(String(bundle.id) === '5' || bundle.category === 'Combo') && (
        <ComboBundleDescription bundle={bundle} />
      )}

      {/* What's Inside & Locked Grid Section */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-slate-100 text-slate-700 rounded border border-slate-200">
              FULL CONTENT LIST
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              What&apos;s Inside This Pack ({bundle.videoCount} Videos)
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              All clips are pre-cropped to 9:16 vertical 1080p MP4 format with zero watermarks.
            </p>
          </div>

          {!isPurchased && (
            <button
              onClick={() => openQuickBuy(bundle)}
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center space-x-1.5 shrink-0"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Unlock All {bundle.videoCount} Clips for ₹{bundle.price}</span>
            </button>
          )}
        </div>

        {/* 12 Sample Locked Video Card Placeholders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-[9/16] rounded-2xl bg-slate-900 overflow-hidden border border-slate-200 shadow-sm"
            >
              <img
                src={bundle.thumbnail}
                alt={`Video #${i + 1}`}
                className="w-full h-full object-cover filter blur-[3px] opacity-60 scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-2 p-2 text-center">
                <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-[10px] font-black text-white">Video #{i + 1}</span>
                <span className="text-[8px] font-bold text-slate-300 uppercase">1080p 9:16 MP4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

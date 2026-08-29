'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_BUNDLES } from '@/data/mockData';
import { 
  Library, 
  CheckCircle2, 
  Play, 
  FolderDown, 
  ExternalLink, 
  ArrowRight, 
  Lock,
  Sparkles,
  ShieldCheck,
  Video,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyLibraryPage() {
  const { 
    isLoggedIn, 
    authLoading, 
    purchasesLoading, 
    purchasesError, 
    getPurchasedBundles, 
    openVideoPreview, 
    addToast, 
    hasPurchased, 
    openQuickBuy,
    refetchPurchases 
  } = useAuth();
  
  const router = useRouter();
  const purchasedBundles = getPurchasedBundles();
  const unpurchasedBundles = MOCK_BUNDLES.filter((b) => !hasPurchased(b.id));

  // 1. LOGIN MUST BE REQUIRED FOR MY LIBRARY
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login?redirectTo=/my-library');
    }
  }, [authLoading, isLoggedIn, router]);

  const handleMockDownload = (bundleTitle: string) => {
    addToast(`📥 Download Started: "${bundleTitle}" (.zip archive). Check your downloads.`, 'success');
  };

  const handleMockDriveAccess = (bundleTitle: string) => {
    addToast(`🔗 Opening Google Drive folder for "${bundleTitle}"...`, 'info');
  };

  // 2. LOADING STATE
  if (authLoading || (isLoggedIn && purchasesLoading)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-base font-extrabold text-slate-900">Loading Your Library...</h3>
          <p className="text-xs text-slate-500 font-medium">Synchronizing your purchased video bundles from Supabase</p>
        </div>
      </div>
    );
  }

  // 3. NOT LOGGED IN REDIRECT GUARD
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Unlocked Vault</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            My Library
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Your purchased video collections, all in one place. Access high-speed downloads and Google Drive folders anytime.
          </p>
        </div>

        {purchasedBundles.length > 0 && (
          <div className="flex items-center space-x-2 text-xs text-slate-700 font-bold bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <Library className="w-4 h-4 text-brand-500" />
            <span>Owned Packs: <strong className="text-slate-900 font-black">{purchasedBundles.length}</strong> / {MOCK_BUNDLES.length}</span>
          </div>
        )}
      </div>

      {/* DATABASE ERROR STATE */}
      {purchasesError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-rose-800">
          <div className="flex items-center space-x-3 text-xs font-bold">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>Failed to load purchases from database: {purchasesError}</span>
          </div>
          <button
            onClick={() => refetchPurchases()}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      )}

      {/* 4. EMPTY LIBRARY FOR USERS WITH NO PURCHASES */}
      {purchasedBundles.length === 0 ? (
        <div className="py-20 px-4 text-center max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-brand-500">
            <Library className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Your Library is Empty</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              You haven&apos;t purchased any bundles yet. Explore our high-retention video packs and unlock instant 1080p MP4 downloads today!
            </p>
          </div>
          <Link
            href="/bundles"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-xl orange-glow transition-transform hover:scale-105 text-xs"
          >
            <span>Browse Bundles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* PURCHASED BUNDLES SHOWCASE */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <span>Purchased Packs ({purchasedBundles.length})</span>
            </h2>
            <span className="text-xs text-emerald-600 font-extrabold flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Commercial Usage Rights Licensed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-brand-400 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Bundle Thumbnail & Play Trailer Header */}
                <div
                  onClick={() => openVideoPreview({ title: `${bundle.title} (Main Preview)`, videoUrl: bundle.previewVideoUrl })}
                  className="relative aspect-[16/9] w-full bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={bundle.thumbnail}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Purchased Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-emerald-500 text-white rounded-md shadow-sm">
                      PURCHASED ✓
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-900/80 text-white rounded">
                      {bundle.categoryBadge}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 border border-white/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-5 h-5 text-brand-600 fill-brand-600 ml-0.5 group-hover:text-white group-hover:fill-white" />
                    </div>
                  </div>
                </div>

                {/* Bundle Info & Direct Action CTAs */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2">
                      {bundle.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-700 pt-1">
                      <Video className="w-3.5 h-3.5 text-brand-500" />
                      <span>{bundle.videoCount} Ready-to-Use 1080p MP4 Videos</span>
                    </div>
                  </div>

                  {/* Access CTAs */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      {(() => {
                        const driveLink = bundle.driveUrl || (
                          String(bundle.id) === '1'
                            ? 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB'
                            : String(bundle.id) === '2'
                              ? 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV'
                              : null
                        );
                        return (
                          <a
                            href={driveLink || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!driveLink) {
                                e.preventDefault();
                                handleMockDriveAccess(bundle.title);
                              }
                            }}
                            className="py-3 bg-gradient-to-r from-brand-500 to-orange-500 hover:from-brand-600 hover:to-orange-600 text-white text-xs font-black rounded-xl flex items-center justify-center space-x-1.5 shadow-md orange-glow transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                            <span>Google Drive</span>
                          </a>
                        );
                      })()}

                      <button
                        onClick={() => openVideoPreview({ title: `${bundle.title} (Main Preview)`, videoUrl: bundle.previewVideoUrl })}
                        className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 text-brand-500" />
                        <span>Preview Pack</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expand Your Vault / Available Unpurchased Bundles */}
      {unpurchasedBundles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">Expand Your Content Collection</h2>
              <p className="text-xs text-slate-600 font-medium">More 9:16 vertical video packs ready for instant purchase.</p>
            </div>
            <Link
              href="/bundles"
              className="text-xs font-extrabold text-brand-600 hover:text-brand-700 transition-colors flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {unpurchasedBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-400 flex items-center justify-between space-x-3 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                    <img src={bundle.thumbnail} alt={bundle.title} className="w-full h-full object-cover filter blur-[1px] opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Lock className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-brand-600 truncate">{bundle.title}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{bundle.videoCount} Videos • ₹{bundle.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => openQuickBuy(bundle)}
                  className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white text-[11px] font-black rounded-xl shrink-0 shadow-sm transition-colors"
                >
                  Unlock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

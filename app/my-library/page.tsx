'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_BUNDLES } from '@/data/mockData';
import { 
  Library, 
  CheckCircle2, 
  Play, 
  ExternalLink, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Video, 
  Loader2, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DriveDropdown } from '@/components/DriveDropdown';

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

  const handleMockDriveAccess = (bundleTitle: string) => {
    addToast(`Opening Google Drive folder for "${bundleTitle}"...`, 'info');
  };

  // 2. LOADING STATE
  if (authLoading || (isLoggedIn && purchasesLoading)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 px-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-sm font-bold text-zinc-950">Loading Your Library...</h3>
          <p className="text-xs text-zinc-500 font-normal">Synchronizing your purchased video bundles</p>
        </div>
      </div>
    );
  }

  // 3. NOT LOGGED IN REDIRECT GUARD
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold uppercase tracking-wider mb-2 border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Unlocked Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            My Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 font-normal">
            Your purchased video collections in one place. Access high-speed downloads and Google Drive cloud folders anytime.
          </p>
        </div>

        {purchasedBundles.length > 0 && (
          <div className="flex items-center space-x-2 text-xs text-zinc-700 font-semibold bg-white px-3.5 py-2 rounded-lg border border-zinc-200 shadow-xs">
            <Library className="w-3.5 h-3.5 text-orange-600" />
            <span>Owned Packs: <strong className="text-zinc-950 font-bold">{purchasedBundles.length}</strong> / {MOCK_BUNDLES.length}</span>
          </div>
        )}
      </div>

      {/* DATABASE ERROR STATE */}
      {purchasesError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-rose-800">
          <div className="flex items-center space-x-2.5 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Failed to load purchases from database: {purchasesError}</span>
          </div>
          <button
            onClick={() => refetchPurchases()}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* 4. EMPTY LIBRARY FOR USERS WITH NO PURCHASES */}
      {purchasedBundles.length === 0 ? (
        <div className="py-16 px-4 text-center max-w-md mx-auto bg-white rounded-2xl border border-zinc-200 space-y-5 shadow-card">
          <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-700">
            <Library className="w-7 h-7 stroke-[1.5]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-zinc-950">Your Library is Empty</h2>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              You haven&apos;t purchased any bundles yet. Explore our high-retention video packs and unlock instant 1080p MP4 downloads today.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-xs transition-colors text-xs"
          >
            <span>Browse Bundles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* PURCHASED BUNDLES SHOWCASE */
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-950">
              Purchased Packs ({purchasedBundles.length})
            </h2>
            <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Commercial License Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {purchasedBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="group bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                {/* Bundle Thumbnail & Play Trailer Header */}
                <div
                  onClick={() => openVideoPreview({ title: `${bundle.title} (Main Preview)`, videoUrl: bundle.previewVideoUrl })}
                  className="relative aspect-[16/9] w-full bg-zinc-950 cursor-pointer overflow-hidden"
                >
                  <img
                    src={bundle.thumbnail}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />

                  {/* Top Purchased Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-2 z-10">
                    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-600 text-white rounded shadow-xs">
                      PURCHASED ✓
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-medium bg-black/60 text-white rounded backdrop-blur-sm">
                      {bundle.categoryBadge}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 border border-white/40 flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-105 transition-all shadow-xs">
                      <Play className="w-4 h-4 text-zinc-900 fill-zinc-900 ml-0.5 group-hover:text-white group-hover:fill-white" />
                    </div>
                  </div>
                </div>

                {/* Bundle Info & Direct Action CTAs */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-zinc-950 group-hover:text-orange-600 transition-colors">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-zinc-600 font-normal line-clamp-2 leading-relaxed">
                      {bundle.description}
                    </p>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-700 pt-0.5">
                      <Video className="w-3.5 h-3.5 text-orange-600" />
                      <span>{bundle.videoCount} Ready 1080p MP4 Videos</span>
                    </div>
                  </div>

                  {/* Access CTAs */}
                  <div className="pt-2.5 border-t border-zinc-100">
                    <div className="grid grid-cols-2 gap-2">
                      {String(bundle.id) === '7' ? (
                        <DriveDropdown
                          links={[
                            { label: 'Quotes Pack (Part 1)', url: 'https://drive.google.com/file/d/1AiBYpIBTlT2YqYDeAn2RTreGzTtVMBZ5/view?usp=drivesdk', badge: 'Part 1' },
                            { label: 'Quotes Pack (Part 2)', url: 'https://drive.google.com/file/d/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk', badge: 'Part 2' }
                          ]}
                          className="w-full"
                        />
                      ) : (
                        (() => {
                          const driveLink = bundle.driveUrl || (
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
                              className="py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-white" />
                              <span>Google Drive</span>
                            </a>
                          );
                        })()
                      )}

                      <button
                        onClick={() => openVideoPreview({ title: `${bundle.title} (Main Preview)`, videoUrl: bundle.previewVideoUrl })}
                        className="py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg border border-zinc-200 flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-zinc-700" />
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
        <div className="pt-6 border-t border-zinc-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-zinc-950">Expand Your Content Collection</h2>
              <p className="text-xs text-zinc-600 font-normal">More 9:16 vertical video packs ready for instant unlock.</p>
            </div>
            <Link
              href="/"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors flex items-center space-x-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unpurchasedBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="p-3 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 flex items-center justify-between space-x-3 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="relative w-10 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-zinc-200">
                    <img src={bundle.thumbnail} alt={bundle.title} className="w-full h-full object-cover filter blur-[1px] opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-950 group-hover:text-orange-600 truncate">{bundle.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{bundle.videoCount} Videos • ₹{bundle.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => openQuickBuy(bundle)}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shrink-0 shadow-xs transition-colors cursor-pointer"
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

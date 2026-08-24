'use client';

import React from 'react';
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
  Video
} from 'lucide-react';
import Link from 'next/link';

export default function MyLibraryPage() {
  const { getPurchasedBundles, openVideoPreview, addToast, hasPurchased, openQuickBuy } = useAuth();
  const purchasedBundles = getPurchasedBundles();
  const unpurchasedBundles = MOCK_BUNDLES.filter((b) => !hasPurchased(b.id));

  const handleMockDownload = (bundleTitle: string) => {
    addToast(`📥 Download Started: "${bundleTitle}" (.zip archive). Check your downloads.`, 'success');
  };

  const handleMockDriveAccess = (bundleTitle: string) => {
    addToast(`🔗 Opening Google Drive folder for "${bundleTitle}"...`, 'info');
  };

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

      {/* Purchased Bundles Section */}
      {purchasedBundles.length === 0 ? (
        /* Empty State */
        <div className="py-20 px-4 text-center max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
            <Library className="w-10 h-10 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Your library is empty</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              You haven&apos;t purchased any video bundles yet. Explore our curated toddler video packs and build your creator content collection today!
            </p>
          </div>
          <Link
            href="/bundles"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-xl orange-glow transition-transform hover:scale-105 text-xs"
          >
            <span>Explore Video Bundles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Purchased Bundles Showcase */
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
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleMockDownload(bundle.title)}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
                    >
                      <FolderDown className="w-4 h-4" />
                      <span>Download All Files (.zip)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleMockDriveAccess(bundle.title)}
                        className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-extrabold rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-brand-500" />
                        <span>Google Drive</span>
                      </button>

                      <button
                        onClick={() => openVideoPreview({ title: `${bundle.title} (Main Preview)`, videoUrl: bundle.previewVideoUrl })}
                        className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-extrabold rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
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
              <p className="text-xs text-slate-600 font-medium">More 9:16 vertical toddler packs ready for instant purchase.</p>
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

'use client';

import React from 'react';
import { 
  CheckCircle2, 
  FolderDown, 
  Zap, 
  Layers, 
  ExternalLink, 
  Sparkles,
  Instagram,
  ShieldCheck,
  Video
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Bundle } from '@/types';

interface Props {
  bundle?: Bundle;
}

export const AllBundlesDescription: React.FC<Props> = ({ bundle }) => {
  const { openQuickBuy, hasPurchased } = useAuth();
  const isPurchased = bundle ? hasPurchased(bundle.id) : false;

  const driveLinks = [
    { title: '🎮 3,000+ Roblox Reels', url: 'https://drive.google.com/drive/folders/1CVYKi_oDz3h7h5bBYEbUvf7ID9BI7uaB' },
    { title: '🚗 8,000+ BeamNG Car Crash', url: 'https://drive.google.com/drive/folders/1BEUAM2fnKo6drhy6P42mrM6sBTNWqWbV' },
    { title: '🥷 1,000+ Stickman Action', url: 'https://drive.google.com/drive/folders/1Y9aHMGLfSXfXzGKNkZcbNPSiVPkBoGt0' },
    { title: '🧼 1,000+ Satisfying Reels', url: 'https://drive.google.com/drive/folders/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk' },
    { title: '💭 9,000+ Motivational Quotes (Part 1)', url: 'https://drive.google.com/file/d/1AiBYpIBTlT2YqYDeAn2RTreGzTtVMBZ5/view?usp=drivesdk' },
    { title: '💭 9,000+ Motivational Quotes (Part 2)', url: 'https://drive.google.com/file/d/1wCNM6pGEHqrVQSS4L3MgPOqpYNys9-hQ/view?usp=drivesdk' },
    { title: '🔥 60K+ Mix Viral Reels', url: 'https://drive.google.com/drive/folders/1R0YYII2rF3iv8X26iCQ_BXzT6w-uMOAQ' },
    { title: '🎮 3,600+ Free Fire Reels', url: 'https://drive.google.com/drive/folders/1SOGtLNLJG7ZZaNZkZezhV6A7t-ASswqb' },
  ];

  const allPacks = [
    { id: '1', title: 'Roblox Viral Reels', count: '3,000+ Clips', image: '/roblox_reels_bundle.jpg' },
    { id: '2', title: 'BeamNG Car Crash', count: '8,000+ Clips', image: '/car_crash_bundle.jpg' },
    { id: '4', title: 'Stickman Content', count: '1,000+ Clips', image: '/stickman_content_bundle.jpg' },
    { id: '6', title: 'Satisfying Reels', count: '1,000+ Clips', image: '/satisfying_reels_bundle.jpg' },
    { id: '7', title: 'Motivational Quotes', count: '9,000+ Quotes', image: '/motivational_quotes_bundle.jpg' },
    { id: '8', title: '60K+ Mix Viral Reels', count: '60,000+ Clips', image: '/mix_reels_bundle.jpg' },
    { id: '9', title: 'Free Fire Reels', count: '3,600+ Clips', image: '/freefire_reels_bundle.jpg' },
    { id: '3', title: 'AI Girls Dancing', count: '3,000+ Clips', image: '/ai_girls_dancing_bundle.png' },
  ];

  return (
    <div className="space-y-8 pt-6 border-t border-zinc-200 text-zinc-800">
      
      {/* Hero Banner Box */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 sm:p-8 text-white shadow-card border border-zinc-800 space-y-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-md text-amber-300 text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>ALL 8 BUNDLES INCLUDED • MASTER VAULT</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
            🎯 COMPLETE 8-IN-1 MASTER CREATOR VAULT
          </h2>

          <p className="text-sm sm:text-base font-semibold text-orange-400">
            Get Lifetime Access to ALL 8 Mega Bundles (1,000,000+ Total Clips) for Only ₹149! 🚀
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            Unlock every single niche pack on LittleVault in one ultimate bundle. Over 1,000,000+ viral clips across Gaming, Animation, Satisfying, Quotes, and Multi-Niche viral content.
          </p>
        </div>
      </div>

      {/* 8 BUNDLES SHOWCASE GRID */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-zinc-900 text-white rounded-lg">
            <Layers className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">INCLUDED IN THIS MASTER PACK</span>
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">
              📦 ALL 8 VAULTS INCLUDED
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {allPacks.map((pack, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white border border-zinc-200 shadow-card flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                <div className="aspect-[9/16] w-full rounded-lg overflow-hidden bg-zinc-950">
                  <img src={pack.image} alt={pack.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[9px] font-semibold uppercase text-orange-600 block">PACK #{idx + 1}</span>
                  <h4 className="font-bold text-zinc-950 text-xs truncate">{pack.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-medium">{pack.count}</p>
                </div>
              </div>
              <div className="pt-1.5 border-t border-zinc-100 flex items-center justify-between text-[10px] font-semibold text-zinc-500">
                <span>Value: ₹39-₹99</span>
                <span className="text-emerald-600 font-bold">INCLUDED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GOOGLE DRIVE FOLDERS ACCESS (WHEN PURCHASED) */}
      {isPurchased && (
        <div className="p-5 sm:p-6 rounded-xl bg-zinc-950 text-white space-y-4 border border-zinc-800 shadow-card">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-zinc-900 text-orange-400 rounded-lg">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">INSTANT CLOUD ACCESS</span>
              <h3 className="text-base font-bold text-white">YOUR 8 GOOGLE DRIVE LIBRARIES</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {driveLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-between transition-colors"
              >
                <span className="text-xs font-semibold text-zinc-200">{link.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FINAL CALL TO ACTION BOX */}
      <div className="rounded-2xl bg-zinc-950 p-6 sm:p-8 text-white shadow-card text-center space-y-4 border border-zinc-800">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase">
            🚀 UNLOCK ALL 1,000,000+ CLIPS TODAY FOR ₹149!
          </h3>
          <p className="text-xs text-zinc-400 font-normal">
            One single payment. Lifetime Google Drive cloud access to all 8 video bundles.
          </p>

          <div className="pt-2">
            {!isPurchased && bundle ? (
              <button
                onClick={() => openQuickBuy(bundle)}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>UNLOCK ALL 8 BUNDLES NOW — ₹149</span>
              </button>
            ) : (
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>ALL BUNDLES UNLOCKED! DRIVE LINKS AVAILABLE ABOVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Support & Instagram tag */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-center text-xs text-zinc-400">
          <span className="flex items-center space-x-1.5">
            <span>Support:</span>
            <a 
              href="https://instagram.com/vanshh.2406" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline font-semibold"
            >
              @vanshh.2406
            </a>
          </span>
        </div>
      </div>

    </div>
  );
};

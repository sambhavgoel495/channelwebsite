'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Youtube, Facebook, Twitter, Shield, Play } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-zinc-100">
          
          {/* Brand Info (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3 h-3 text-orange-400 fill-orange-400 ml-0.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-950">
                Little<span className="text-orange-600">Vault</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-600 max-w-sm leading-relaxed font-normal">
              The premier digital content vault for short-form video creators. Curated 9:16 vertical video bundles engineered for high retention across Instagram Reels, YouTube Shorts, and TikTok.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              {[
                { icon: Instagram, href: 'https://instagram.com/vanshh.2406', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-7 h-7 rounded-md bg-zinc-50 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors shadow-xs"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Products
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-600">
              <li>
                <Link href="/" prefetch={true} className="hover:text-zinc-950 transition-colors">
                  Video Bundles
                </Link>
              </li>
              <li>
                <Link href="/#free-demos" prefetch={true} className="hover:text-zinc-950 transition-colors">
                  Free Previews
                </Link>
              </li>
              <li>
                <Link href="/my-library" prefetch={true} className="hover:text-zinc-950 transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link href="/#combos" prefetch={true} className="hover:text-zinc-950 transition-colors flex items-center space-x-1">
                  <span>Combo Packs</span>
                  <span className="px-1 py-0.2 text-[9px] font-bold bg-amber-50 text-amber-700 rounded border border-amber-200">HOT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-600">
              <li>
                <a href="https://instagram.com/vanshh.2406" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 transition-colors">
                  Instagram Support (@vanshh.2406)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-zinc-950 transition-colors">
                  Creator FAQ
                </a>
              </li>
              <li>
                <Link href="/my-library" className="hover:text-zinc-950 transition-colors">
                  Download Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Legal & License
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-600">
              <li>
                <span className="hover:text-zinc-950 transition-colors cursor-pointer">
                  Commercial Rights
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-950 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-950 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-zinc-500 space-y-3 sm:space-y-0">
          <p>© 2026 LittleVault. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-zinc-600 font-medium">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Commercial Usage License Included</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

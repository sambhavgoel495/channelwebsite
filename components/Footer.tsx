'use client';

import React from 'react';
import Link from 'next/link';
import { PlayCircle, Instagram, Youtube, Facebook, Twitter, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100/80 border-t border-slate-200/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background radial ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-md orange-glow">
                <PlayCircle className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Little<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-pink-500">Vault</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed font-medium">
              The premier digital content vault for short-form video creators. Curated 9:16 vertical toddler video bundles engineered for high retention on Instagram Reels, YouTube Shorts, and TikTok.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-brand-400 hover:bg-orange-50 text-slate-600 hover:text-brand-600 flex items-center justify-center transition-all shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <Link href="/bundles" prefetch={true} className="hover:text-brand-600 transition-colors">
                  Video Bundles
                </Link>
              </li>
              <li>
                <Link href="/#free-demos" prefetch={true} className="hover:text-brand-600 transition-colors">
                  Free Demos
                </Link>
              </li>
              <li>
                <Link href="/my-library" prefetch={true} className="hover:text-brand-600 transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link href="/bundles?category=Trending" prefetch={true} className="hover:text-brand-600 transition-colors flex items-center space-x-1">
                  <span>Viral Packs</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-700 rounded border border-amber-200">HOT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <a href="#about" className="hover:text-brand-600 transition-colors">
                  About LittleVault
                </a>
              </li>
              <li>
                <a href="#creators" className="hover:text-brand-600 transition-colors">
                  For Content Creators
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-600 transition-colors">
                  Contact & Support
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-600 transition-colors">
                  Creator FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-4">
              Legal & License
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <a href="#terms" className="hover:text-brand-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-brand-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#license" className="hover:text-brand-600 transition-colors">
                  Commercial Rights
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-brand-600 transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-500 space-y-4 sm:space-y-0">
          <p>© 2026 LittleVault. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-600 font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Commercial Usage License Included</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

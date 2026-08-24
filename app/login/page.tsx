'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PlayCircle, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SAMPLE_VIDEOS } from '@/data/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('creator@littlevault.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(email, email.split('@')[0]);
      setIsSubmitting(false);
      router.push('/my-library');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Form Section */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <Link href="/" className="inline-flex items-center space-x-2.5 mb-8 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-md orange-glow">
                <PlayCircle className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Little<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-pink-500">Vault</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, Creator 👋
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Log in to access your purchased video bundles and download high-definition clips.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-brand-600 hover:underline font-bold">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white text-xs font-black rounded-xl shadow-lg orange-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Sign In to Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-600 font-medium">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-brand-600 font-black hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        {/* Right Side Visual Showcase Collage */}
        <div className="hidden md:flex md:col-span-5 bg-slate-100 p-8 flex-col justify-between relative border-l border-slate-200 overflow-hidden">
          <div className="absolute inset-0 bg-orange-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-orange-200 text-brand-700 rounded">
              High Retention Videos
            </span>
            <h3 className="text-lg font-black text-slate-900">400+ Curated Clips Ready</h3>
            <p className="text-xs text-slate-600 font-medium">Join 1,200+ short-form creators using LittleVault for viral Reels.</p>
          </div>

          {/* Floating Thumbnails Visual */}
          <div className="relative z-10 my-6 grid grid-cols-2 gap-3">
            {SAMPLE_VIDEOS.slice(0, 2).map((vid) => (
              <div key={vid.id} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 shadow-lg">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-bold text-white truncate max-w-[90%]">
                  {vid.title}
                </span>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center space-x-2 text-[11px] text-slate-600 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant Google Drive & Download Access</span>
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PlayCircle, User as UserIcon, Mail, Lock, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') || '/my-library';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      login(email, name || 'Creator');
      setIsSubmitting(false);
      router.push(redirectTo);
    }, 800);
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    await loginWithGoogle(redirectTo);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Form Section */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div>
            <Link href="/" className="inline-flex items-center space-x-2.5 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-md orange-glow">
                <PlayCircle className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Little<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-pink-500">Vault</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create Creator Account 🚀
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Join thousands of creators using curated toddler video packs for Reels and Shorts.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivers"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white text-xs font-black rounded-xl shadow-lg orange-glow transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Free Creator Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign up with Google</span>
            </button>
          </form>

          <div className="text-center text-xs text-slate-600 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 font-black hover:underline">
              Log in
            </Link>
          </div>
        </div>

        {/* Right Side Visual Showcase Collage */}
        <div className="hidden md:flex md:col-span-5 bg-slate-100 p-8 flex-col justify-between relative border-l border-slate-200 overflow-hidden">
          <div className="absolute inset-0 bg-orange-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-orange-200 text-brand-700 rounded">
              Creator Perks
            </span>
            <h3 className="text-lg font-black text-slate-900">Instant Content Access</h3>
            <p className="text-xs text-slate-600 font-medium">Get instant access to 9:16 vertical 1080p MP4 clips once you sign up.</p>
          </div>

          <div className="relative z-10 my-6 space-y-2.5">
            {[
              'Full Commercial Usage Rights',
              'Zero Watermarks or Logos',
              'High Speed Google Drive Links',
              'Organized by Mood & Topic'
            ].map((perk, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs font-bold text-slate-800 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center space-x-2 text-[11px] text-slate-600 font-semibold">
            <Shield className="w-4 h-4 text-brand-500 shrink-0" />
            <span>100% Safe & Secure Creator Account</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs font-bold text-slate-500">Loading Signup...</div>}>
      <SignupForm />
    </Suspense>
  );
}

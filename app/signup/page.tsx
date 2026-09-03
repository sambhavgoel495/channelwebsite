'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Play, User as UserIcon, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SAMPLE_VIDEOS } from '@/data/mockData';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithPassword, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') || '/my-library';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAlreadyExists(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    const res = await signUpWithPassword(email, password, name);
    setIsSubmitting(false);

    if (!res.success) {
      setError(res.error || 'Signup failed. Please try again.');
      if (res.alreadyExists) {
        setAlreadyExists(true);
      }
      return;
    }

    if (res.needsEmailVerification) {
      router.push(`/login?registered=true&redirectTo=${encodeURIComponent(redirectTo)}`);
    } else {
      router.push(redirectTo);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    await loginWithGoogle(redirectTo);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Form Section */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <Link href="/" className="inline-flex items-center space-x-2 mb-5 group">
              <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3 h-3 text-orange-400 fill-orange-400 ml-0.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-950">
                Little<span className="text-orange-600">Vault</span>
              </span>
            </Link>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              Create your account
            </h2>
            <p className="text-xs text-zinc-500 font-normal mt-0.5">
              Unlock instant high-speed downloads for all curated viral video packs.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <div className="flex items-start space-x-2 text-rose-700 text-xs font-semibold">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
              {alreadyExists && (
                <div className="pt-0.5">
                  <Link
                    href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
                  >
                    <span>Sign In to Existing Account</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivers"
                  className="w-full pl-9 pr-3.5 py-2 bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 focus:bg-white font-medium transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="w-full pl-9 pr-3.5 py-2 bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 focus:bg-white font-medium transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2 bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 focus:bg-white font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2 bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 focus:bg-white font-medium transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50 mt-1 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Creator Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-zinc-200 w-full" />
              <span className="bg-white px-2.5 text-[10px] uppercase font-semibold text-zinc-400 absolute">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200 shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign up with Google</span>
            </button>
          </form>

          <div className="text-center text-xs text-zinc-500 font-normal">
            Already have an account?{' '}
            <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} className="text-orange-600 font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>

        {/* Right Side Visual Showcase */}
        <div className="hidden md:flex md:col-span-5 bg-zinc-50 p-6 flex-col justify-between border-l border-zinc-200">
          <div className="space-y-1.5">
            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase bg-zinc-200 text-zinc-800 rounded">
              High Retention
            </span>
            <h3 className="text-sm font-bold text-zinc-950">Viral Content Vault</h3>
            <p className="text-xs text-zinc-500 font-normal">Ready-to-use 9:16 vertical clips for Instagram Reels & YouTube Shorts.</p>
          </div>

          <div className="my-4 grid grid-cols-2 gap-2.5">
            {SAMPLE_VIDEOS.slice(0, 2).map((vid) => (
              <div key={vid.id} className="relative aspect-[9/16] rounded-lg overflow-hidden border border-zinc-200 shadow-xs bg-zinc-950">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-medium text-white truncate max-w-[90%]">
                  {vid.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] text-zinc-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Instant Google Drive Cloud Access</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs text-zinc-500">Loading Sign Up...</div>}>
      <SignupForm />
    </Suspense>
  );
}

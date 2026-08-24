'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Sparkles, 
  Search, 
  User as UserIcon, 
  LogOut, 
  ShieldAlert, 
  Library, 
  Menu, 
  X, 
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, toggleAdmin, setIsSearchOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Prefetch all key routes immediately on mount for instant responsive navigation
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/bundles');
    router.prefetch('/my-library');
    router.prefetch('/login');
    router.prefetch('/signup');
    router.prefetch('/admin');
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'My Library', href: '/my-library' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md py-3'
            : 'bg-white/60 backdrop-blur-md border-b border-slate-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo & Name */}
            <Link href="/" prefetch={true} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg orange-glow group-hover:scale-105 transition-transform">
                <PlayCircle className="w-6 h-6 text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                  Little<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-pink-500">Vault</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 -mt-1">
                  Creator Content
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all relative ${
                    isActive(link.href)
                      ? 'text-white bg-gradient-to-r from-brand-500 to-orange-600 shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all flex items-center space-x-2 text-sm"
                title="Search bundles"
              >
                <Search className="w-4 h-4 text-brand-500" />
                <span className="text-xs text-slate-600 font-medium pr-2">Search...</span>
              </button>

              {/* Logged in vs Logged out controls */}
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-white border border-slate-200 hover:border-brand-500/50 shadow-sm transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-brand-500/50"
                    />
                    <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                      >
                        <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-600 truncate">{user.email}</p>
                          {user.isAdmin && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase bg-purple-100 text-purple-700 rounded border border-purple-200">
                              Admin Access
                            </span>
                          )}
                        </div>

                        <Link
                          href="/my-library"
                          prefetch={true}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-600 hover:bg-orange-50 transition-colors"
                        >
                          <Library className="w-4 h-4 text-brand-500" />
                          <span>My Purchased Library</span>
                        </Link>

                        <Link
                          href="/admin"
                          prefetch={true}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                          <span>Admin Dashboard</span>
                        </Link>

                        <button
                          onClick={() => {
                            toggleAdmin();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-indigo-500" />
                          <span>Toggle Admin View</span>
                        </button>

                        <div className="border-t border-slate-100 my-1" />

                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    prefetch={true}
                    className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all border border-transparent"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={true}
                    className="px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-brand-500 to-orange-600 hover:from-brand-600 hover:to-orange-700 rounded-xl shadow-md orange-glow transition-all hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg"
              >
                <Search className="w-5 h-5 text-brand-500" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive(link.href)
                        ? 'text-brand-600 bg-orange-50 border border-orange-200'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {isLoggedIn && (
                  <Link
                    href="/admin"
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-amber-600 hover:bg-amber-50 transition-all flex items-center space-x-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200">
                {isLoggedIn && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-2">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-brand-500" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-orange-600 rounded-xl shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

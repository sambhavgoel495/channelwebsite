'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Sparkles, 
  Search, 
  LogOut, 
  ShieldAlert, 
  Library, 
  Menu, 
  X, 
  ChevronDown,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout, toggleAdmin, setIsSearchOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Prefetch key routes immediately on mount for instant navigation
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
      if (window.scrollY > 15) {
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/90 shadow-xs py-2.5'
            : 'bg-white/75 backdrop-blur-sm border-b border-zinc-200/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo & Name */}
            <Link href="/" prefetch={true} className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-xs group-hover:bg-zinc-800 transition-colors">
                <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400 ml-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-zinc-950">
                  Little<span className="text-orange-600">Vault</span>
                </span>
                <span className="text-[10px] font-semibold text-zinc-500 -mt-1 tracking-wide">
                  Creator Content
                </span>
              </div>
            </Link>

            {/* Center Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 bg-zinc-100/90 p-1 rounded-lg border border-zinc-200/70">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    isActive(link.href)
                      ? 'text-zinc-900 bg-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="hidden md:flex items-center space-x-2.5">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-900 border border-zinc-200/80 transition-colors flex items-center space-x-2 text-xs font-medium cursor-pointer"
                title="Search bundles"
              >
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <span>Search bundles...</span>
                <kbd className="text-[10px] font-semibold bg-white px-1.5 py-0.5 rounded border border-zinc-200 text-zinc-400">
                  ⌘K
                </kbd>
              </button>

              {/* Logged in vs Logged out controls */}
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-1 pr-2.5 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                    />
                    <span className="text-xs font-semibold text-zinc-800 max-w-[110px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-zinc-200 rounded-xl shadow-dropdown overflow-hidden z-50 p-1.5"
                      >
                        <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                          <p className="text-xs font-bold text-zinc-900 truncate">{user.name}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                          {user.isAdmin && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold uppercase bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                              Admin Access
                            </span>
                          )}
                        </div>

                        <Link
                          href="/my-library"
                          prefetch={true}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        >
                          <Library className="w-3.5 h-3.5 text-zinc-500" />
                          <span>My Purchased Library</span>
                        </Link>

                        <Link
                          href="/admin"
                          prefetch={true}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Admin Dashboard</span>
                        </Link>

                        <button
                          onClick={() => {
                            toggleAdmin();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Toggle Admin View</span>
                        </button>

                        <div className="border-t border-zinc-100 my-1" />

                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5">
                  <Link
                    href="/login"
                    prefetch={true}
                    className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    prefetch={true}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-xs transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-1.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-lg cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-700 hover:text-zinc-950 bg-zinc-100 rounded-lg border border-zinc-200 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
              className="md:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-5 space-y-3 shadow-sm"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive(link.href)
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-100">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5 px-2 py-1.5">
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-zinc-200" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-zinc-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/login"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-xs"
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

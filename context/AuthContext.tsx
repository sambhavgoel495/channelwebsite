'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Bundle } from '@/types';
import { DEFAULT_USER, MOCK_BUNDLES } from '@/data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  purchasedBundleIds: string[];
  login: (email?: string, name?: string) => void;
  logout: () => void;
  toggleAdmin: () => void;
  purchaseBundle: (bundleId: string) => boolean;
  hasPurchased: (bundleId: string) => boolean;
  getPurchasedBundles: () => Bundle[];
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeVideoPreview: { title: string; videoUrl: string; duration?: string } | null;
  openVideoPreview: (video: { title: string; videoUrl: string; duration?: string }) => void;
  closeVideoPreview: () => void;
  quickBuyBundle: Bundle | null;
  openQuickBuy: (bundle: Bundle) => void;
  closeQuickBuy: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [purchasedBundleIds, setPurchasedBundleIds] = useState<string[]>(['1']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideoPreview, setActiveVideoPreview] = useState<{ title: string; videoUrl: string; duration?: string } | null>(null);
  const [quickBuyBundle, setQuickBuyBundle] = useState<Bundle | null>(null);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email?: string, name?: string) => {
    const newUser: User = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: name || DEFAULT_USER.name,
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('You have logged out.', 'info');
  };

  const toggleAdmin = () => {
    if (user) {
      const updated = { ...user, isAdmin: !user.isAdmin };
      setUser(updated);
      addToast(updated.isAdmin ? 'Admin Mode Activated ✨' : 'Switched to Standard Creator Mode', 'info');
    }
  };

  const purchaseBundle = (bundleId: string) => {
    if (!user) {
      // Auto login as creator for seamless preview experience
      login();
    }
    if (purchasedBundleIds.includes(bundleId)) {
      addToast('You already own this bundle! Check My Library.', 'info');
      return false;
    }
    const updated = [...purchasedBundleIds, bundleId];
    setPurchasedBundleIds(updated);
    if (user) {
      setUser({ ...user, purchasedBundleIds: updated });
    }
    const bundle = MOCK_BUNDLES.find(b => b.id === bundleId);
    addToast(`🎉 Purchase Successful! "${bundle?.title || 'Bundle'}" unlocked in My Library.`, 'success');
    return true;
  };

  const hasPurchased = (bundleId: string) => {
    return purchasedBundleIds.includes(bundleId);
  };

  const getPurchasedBundles = () => {
    return MOCK_BUNDLES.filter((b) => purchasedBundleIds.includes(b.id));
  };

  const openVideoPreview = (video: { title: string; videoUrl: string; duration?: string }) => {
    setActiveVideoPreview(video);
  };

  const closeVideoPreview = () => {
    setActiveVideoPreview(null);
  };

  const openQuickBuy = (bundle: Bundle) => {
    setQuickBuyBundle(bundle);
  };

  const closeQuickBuy = () => {
    setQuickBuyBundle(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        purchasedBundleIds,
        login,
        logout,
        toggleAdmin,
        purchaseBundle,
        hasPurchased,
        getPurchasedBundles,
        toasts,
        addToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        activeVideoPreview,
        openVideoPreview,
        closeVideoPreview,
        quickBuyBundle,
        openQuickBuy,
        closeQuickBuy,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

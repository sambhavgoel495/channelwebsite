'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Bundle } from '@/types';
import { MOCK_BUNDLES } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  authLoading: boolean;
  purchasesLoading: boolean;
  purchasesError: string | null;
  purchasedBundleIds: string[];
  login: (email?: string, name?: string) => void;
  loginWithGoogle: (redirectPath?: string) => Promise<void>;
  logout: () => void;
  toggleAdmin: () => void;
  purchaseBundle: (bundleId: string, amount?: number) => Promise<boolean>;
  hasPurchased: (bundleId: string) => boolean;
  getPurchasedBundles: () => Bundle[];
  refetchPurchases: () => Promise<void>;
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

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getUuidFromIdOrEmail(idOrEmail: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(idOrEmail)) return idOrEmail;
  const num = hashString(idOrEmail).toString(16).padStart(12, '0');
  return `00000000-0000-4000-8000-${num.slice(0, 12)}`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [purchasesError, setPurchasesError] = useState<string | null>(null);
  const [purchasedBundleIds, setPurchasedBundleIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeVideoPreview, setActiveVideoPreview] = useState<{ title: string; videoUrl: string; duration?: string } | null>(null);
  const [quickBuyBundle, setQuickBuyBundle] = useState<Bundle | null>(null);

  const fetchPurchases = async (rawUserId: string) => {
    const validUserId = getUuidFromIdOrEmail(rawUserId);
    setPurchasesLoading(true);
    setPurchasesError(null);
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('bundle_id')
        .eq('user_id', validUserId)
        .eq('status', 'Completed');

      if (error) {
        console.error('Error fetching purchases from Supabase:', error);
        setPurchasesError(error.message);
      } else if (data) {
        const ids = data.map((p) => String(p.bundle_id));
        setPurchasedBundleIds(ids);
      }
    } catch (err: any) {
      setPurchasesError(err.message || 'Failed to fetch user purchases');
    } finally {
      setPurchasesLoading(false);
    }
  };

  const refetchPurchases = async () => {
    if (user?.id) {
      await fetchPurchases(user.id);
    }
  };

  // Sync Supabase Auth Session & handle OAuth callback errors
  useEffect(() => {
    const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    // Catch OAuth Error Params in URL if any
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash.includes('error_description=') || search.includes('error_description=')) {
        const rawStr = hash.includes('error_description=') ? hash.substring(1) : search.substring(1);
        const params = new URLSearchParams(rawStr);
        const errorDesc = params.get('error_description');
        if (errorDesc) {
          const cleanMsg = errorDesc.replace(/\+/g, ' ');
          addToast(`Google Login Error: ${cleanMsg}`, 'error');
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        const displayName = meta?.full_name || meta?.name || session.user.email || 'Creator';
        const userPhone = session.user.phone || meta?.phone || meta?.contact || '';
        const u = {
          id: session.user.id,
          name: displayName,
          email: session.user.email || '',
          phone: userPhone,
          avatar: meta?.avatar_url || defaultAvatar,
          isAdmin: false,
          purchasedBundleIds: [],
        };
        setUser(u);
        fetchPurchases(session.user.id);
      } else {
        setUser(null);
        setPurchasedBundleIds([]);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        const displayName = meta?.full_name || meta?.name || session.user.email || 'Creator';
        const userPhone = session.user.phone || meta?.phone || meta?.contact || '';
        const u = {
          id: session.user.id,
          name: displayName,
          email: session.user.email || '',
          phone: userPhone,
          avatar: meta?.avatar_url || defaultAvatar,
          isAdmin: false,
          purchasedBundleIds: [],
        };
        setUser(u);
        fetchPurchases(session.user.id);
      } else if (_event === 'SIGNED_OUT') {
        setUser(null);
        setPurchasedBundleIds([]);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    const userEmail = email || 'creator@example.com';
    const userName = name || (email ? email.split('@')[0] : 'Creator');
    const validUserId = getUuidFromIdOrEmail(userEmail);
    const newUser: User = {
      id: validUserId,
      email: userEmail,
      name: userName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isAdmin: false,
      purchasedBundleIds: [],
    };
    setUser(newUser);
    fetchPurchases(newUser.id);
    addToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const loginWithGoogle = async (redirectPath?: string) => {
    const target = redirectPath ? `${window.location.origin}${redirectPath}` : `${window.location.origin}/my-library`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: target,
      },
    });

    if (error) {
      addToast(error.message || 'Google authentication failed.', 'error');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPurchasedBundleIds([]);
    addToast('You have logged out.', 'info');
  };

  const toggleAdmin = () => {
    if (user) {
      const updated = { ...user, isAdmin: !user.isAdmin };
      setUser(updated);
      addToast(updated.isAdmin ? 'Admin Mode Activated ✨' : 'Switched to Standard Creator Mode', 'info');
    }
  };

  const purchaseBundle = async (bundleId: string, amount: number = 49): Promise<boolean> => {
    if (!user) {
      addToast('Please log in to complete your purchase.', 'info');
      return false;
    }
    const cleanBundleId = String(bundleId);
    if (purchasedBundleIds.includes(cleanBundleId)) {
      addToast('You already own this bundle! Check My Library.', 'info');
      return false;
    }

    try {
      const validUserId = getUuidFromIdOrEmail(user.id);
      const { error } = await supabase.from('purchases').insert({
        user_id: validUserId,
        bundle_id: cleanBundleId,
        amount: amount,
        payment_method: 'UPI / Card Sandbox',
        status: 'Completed',
        date: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase purchase insert error:', error);
      }
    } catch (e) {
      console.error('Failed to save purchase in Supabase:', e);
    }

    const updated = [...purchasedBundleIds, cleanBundleId];
    setPurchasedBundleIds(updated);
    const bundle = MOCK_BUNDLES.find((b) => b.id === cleanBundleId);
    addToast(`🎉 Purchase Successful! "${bundle?.title || 'Bundle'}" unlocked in My Library.`, 'success');
    return true;
  };

  const hasPurchased = (bundleId: string) => {
    return purchasedBundleIds.includes(String(bundleId));
  };

  const getPurchasedBundles = () => {
    return MOCK_BUNDLES.filter((b) => purchasedBundleIds.includes(String(b.id)));
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
        authLoading,
        purchasesLoading,
        purchasesError,
        purchasedBundleIds,
        login,
        loginWithGoogle,
        logout,
        toggleAdmin,
        purchaseBundle,
        hasPurchased,
        getPurchasedBundles,
        refetchPurchases,
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

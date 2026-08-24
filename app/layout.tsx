import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/components/Toast';
import { SearchModal } from '@/components/SearchModal';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { QuickBuyModal } from '@/components/QuickBuyModal';

export const metadata: Metadata = {
  title: 'LittleVault — Premium Toddler Video Marketplace for Short-Form Creators',
  description: 'Curated, ready-to-use 9:16 vertical toddler video bundles for Instagram Reels, YouTube Shorts, and TikTok creators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <div className="flex-1 pt-20">
            {children}
          </div>
          <Footer />
          <ToastContainer />
          <SearchModal />
          <VideoPreviewModal />
          <QuickBuyModal />
        </AuthProvider>
      </body>
    </html>
  );
}

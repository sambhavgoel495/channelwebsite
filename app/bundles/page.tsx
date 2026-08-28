'use client';

import React, { useEffect, useState } from 'react';
import { Bundle } from '@/types';
import { supabase } from '@/lib/supabase';
import { BundleCard } from '@/components/BundleCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Search, ArrowUpDown, Video, Sparkles } from 'lucide-react';

export default function BundlesPage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('All Available Bundles');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<
    'popular' | 'price-asc' | 'price-desc' | 'videos'
  >('popular');

  const fetchBundles = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchErr } = await supabase
      .from('bundles')
      .select('*')
      .order('id', { ascending: true });

    if (fetchErr) {
      console.error('Error fetching bundles from Supabase:', fetchErr);
      setError(fetchErr.message || 'Failed to load bundles from Supabase.');
      setLoading(false);
      return;
    }

    const formattedBundles: Bundle[] = (data || []).map((bundle) => ({
      id: bundle.id,
      title: bundle.title,
      slug: bundle.slug,
      tagline: bundle.tagline || '',
      description: bundle.description || '',
      price: bundle.price,
      originalPrice: bundle.original_price,
      videoCount: bundle.video_count || 0,
      category: bundle.category || '',
      categoryBadge: bundle.category_badge || '',
      formatBadge: bundle.format_badge || '',
      quality: bundle.quality || '',
      thumbnail: bundle.thumbnail || '',
      previewVideoUrl: bundle.preview_video_url || '',
      isPopular: bundle.is_popular || false,
      isTrending: bundle.is_trending || false,
      rating: bundle.rating || 0,
      reviewsCount: bundle.reviews_count || 0,
      lockedVideosCount: bundle.locked_videos_count || 0,
      whatsInside: bundle.whats_inside || [],
      freeDemos: [],
      sampleVideos: []
    }));

    setBundles(formattedBundles);
    setLoading(false);
  };

  // Fetch bundles from Supabase on mount
  useEffect(() => {
    fetchBundles();
  }, []);

  // Filter logic
  let filtered = bundles.filter((bundle) => {
    const matchesCategory =
      selectedCategory === 'All Available Bundles' ||
      selectedCategory === 'All Videos' ||
      (selectedCategory === 'Trending Bundles' &&
        (bundle.category === 'Trending' ||
          bundle.isTrending ||
          bundle.isPopular)) ||
      bundle.category === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === '' ||
      bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'videos') return b.videoCount - a.videoCount;

    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">

      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-orange-100 text-brand-600 text-xs font-black uppercase tracking-wider border border-orange-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Video Vault</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          All Video Bundles
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl font-medium">
          Browse our complete catalog of 9:16 vertical toddler video collections.
          Perfect for reels, shorts, and TikTok creators seeking viral engagement.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-md backdrop-blur-md">

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bundles..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-500" />

            <span className="text-xs text-slate-500 font-bold">
              Sort:
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'popular'
                    | 'price-asc'
                    | 'price-desc'
                    | 'videos'
                )
              }
              className="bg-transparent text-xs font-black text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="videos">Most Videos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3 font-semibold">
        <span>
          Showing{' '}
          <strong className="text-slate-900 font-black">
            {filtered.length}
          </strong>{' '}
          video bundles
        </span>

        {selectedCategory !== 'All Available Bundles' && (
          <button
            onClick={() =>
              setSelectedCategory('All Available Bundles')
            }
            className="text-brand-600 hover:underline font-extrabold"
          >
            Reset category filter
          </button>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="text-sm font-bold text-slate-500">
            Loading video bundles...
          </div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="py-16 text-center space-y-4 bg-rose-50 border border-rose-200 rounded-3xl p-8">
          <h3 className="text-lg font-black text-rose-800">
            Failed to load bundles from Supabase
          </h3>
          <p className="text-xs text-rose-600 font-medium max-w-md mx-auto">
            {error}
          </p>
          <button
            onClick={fetchBundles}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md transition-colors"
          >
            Retry Loading
          </button>
        </div>
      ) : filtered.length === 0 ? (

        /* No Bundles */
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <Video className="w-12 h-12 text-slate-400 mx-auto stroke-[1.5]" />

          <h3 className="text-lg font-black text-slate-900">
            No bundles found
          </h3>

          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
            We couldn&apos;t find any video bundles matching &quot;
            {searchQuery}&quot;. Try adjusting your search query or filters.
          </p>

          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Available Bundles');
            }}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-black rounded-xl shadow-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>

      ) : (

        /* Bundle Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { MOCK_BUNDLES, MOCK_PURCHASES } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldAlert, 
  Layers, 
  Video, 
  Users, 
  DollarSign, 
  Plus, 
  X, 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboardPage() {
  const { addToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bundles' | 'videos' | 'users' | 'purchases'>('dashboard');
  const [isAddBundleOpen, setIsAddBundleOpen] = useState(false);

  // Form states for Add New Bundle
  const [newBundleName, setNewBundleName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('39');
  const [newVideoCount, setNewVideoCount] = useState('1000');
  const [newCategory, setNewCategory] = useState('Trending');
  const [newThumbnail, setNewThumbnail] = useState('/roblox_reels_bundle.jpg');

  const stats = [
    { title: 'Total Bundles', value: `${MOCK_BUNDLES.length}`, change: '+2 this month', icon: Layers },
    { title: 'Total Videos', value: '75,000+ Clips', change: '+8 bundles', icon: Video },
    { title: 'Total Creators', value: '1,280', change: '+14% growth', icon: Users },
    { title: 'Total Revenue', value: '₹1,42,500', change: '+28% vs last month', icon: DollarSign }
  ];

  const handleCreateBundle = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Bundle "${newBundleName}" added to catalog.`, 'success');
    setIsAddBundleOpen(false);
    setNewBundleName('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-semibold uppercase tracking-wider mb-2 border border-zinc-200">
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-600" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            Marketplace Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-0.5 font-normal">
            Manage video bundles, track creator purchases, monitor content metrics, and catalog settings.
          </p>
        </div>

        <button
          onClick={() => setIsAddBundleOpen(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Bundle</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-white border border-zinc-200 space-y-2.5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{stat.title}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 text-zinc-700">
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold text-zinc-950">{stat.value}</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 border-b border-zinc-200 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'dashboard', label: 'Dashboard & Sales' },
          { id: 'bundles', label: 'Manage Bundles' },
          { id: 'videos', label: 'Video Assets' },
          { id: 'users', label: 'Creators' },
          { id: 'purchases', label: 'Recent Orders' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Dashboard & Sales */}
      {activeTab === 'dashboard' || activeTab === 'purchases' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-950">Recent Purchases Table</h3>
            <span className="text-xs text-zinc-500 font-normal">Live order feed</span>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-500 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Creator</th>
                    <th className="p-3.5">Bundle Title</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700 font-normal">
                  {MOCK_PURCHASES.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3.5 font-mono text-zinc-500 text-[11px]">{p.id}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-zinc-900">{p.userName}</div>
                        <div className="text-[10px] text-zinc-400 font-normal">{p.userEmail}</div>
                      </td>
                      <td className="p-3.5 font-medium text-orange-600">{p.bundleTitle}</td>
                      <td className="p-3.5 font-bold text-zinc-900">₹{p.amount}</td>
                      <td className="p-3.5 text-zinc-600">{p.paymentMethod}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-zinc-500 text-[11px]">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'bundles' ? (
        /* Tab Content: Bundles Management Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-950">Active Video Bundles ({MOCK_BUNDLES.length})</h3>
            <button
              onClick={() => setIsAddBundleOpen(true)}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-lg border border-zinc-200 flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Bundle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_BUNDLES.map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center space-x-3.5 shadow-card">
                <img src={b.thumbnail} alt={b.title} className="w-12 h-16 object-cover rounded-lg border border-zinc-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase bg-zinc-100 text-zinc-700 rounded border border-zinc-200">
                    {b.category}
                  </span>
                  <h4 className="text-xs font-bold text-zinc-950 truncate mt-1">{b.title}</h4>
                  <p className="text-[11px] text-zinc-500 font-normal mt-0.5">{b.videoCount} Videos • ₹{b.price}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-[10px] text-emerald-600 font-semibold">Active in Catalog</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab Content: Placeholder */
        <div className="p-10 text-center bg-white rounded-2xl border border-zinc-200 space-y-2 shadow-card">
          <Users className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-950">Module Ready</h3>
          <p className="text-xs text-zinc-500 font-normal max-w-sm mx-auto">
            This administrative tab is structured and ready to consume Supabase data.
          </p>
        </div>
      )}

      {/* ADD NEW BUNDLE MODAL */}
      <AnimatePresence>
        {isAddBundleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddBundleOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative z-10 w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-dropdown overflow-hidden p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-zinc-950">Add New Video Bundle</h3>
                </div>
                <button
                  onClick={() => setIsAddBundleOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateBundle} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Bundle Name</label>
                  <input
                    type="text"
                    required
                    value={newBundleName}
                    onChange={(e) => setNewBundleName(e.target.value)}
                    placeholder="e.g. Roblox Reels Pack"
                    className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="39"
                      className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Number of Videos</label>
                    <input
                      type="number"
                      required
                      value={newVideoCount}
                      onChange={(e) => setNewVideoCount(e.target.value)}
                      placeholder="1000"
                      className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                  >
                    <option value="Trending">Trending</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Satisfying">Satisfying</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Combo">Combo</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Short description for creators..."
                    className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 uppercase tracking-wider block">Thumbnail Path / URL</label>
                  <input
                    type="text"
                    required
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    placeholder="/roblox_reels_bundle.jpg"
                    className="w-full p-2.5 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Save & Publish Bundle
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

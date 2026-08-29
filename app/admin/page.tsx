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
  const [newPrice, setNewPrice] = useState('49');
  const [newVideoCount, setNewVideoCount] = useState('50');
  const [newCategory, setNewCategory] = useState('Comedy');
  const [newThumbnail, setNewThumbnail] = useState('https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80');

  const stats = [
    { title: 'Total Bundles', value: `${MOCK_BUNDLES.length}`, change: '+2 this month', icon: Layers, color: 'text-brand-600', bg: 'bg-orange-100 border-orange-200' },
    { title: 'Total Videos', value: '415 Clips', change: '+85 uploaded', icon: Video, color: 'text-indigo-600', bg: 'bg-indigo-100 border-indigo-200' },
    { title: 'Total Creators', value: '1,280', change: '+14% growth', icon: Users, color: 'text-amber-600', bg: 'bg-amber-100 border-amber-200' },
    { title: 'Total Revenue', value: '₹1,42,500', change: '+28% vs last month', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-200' }
  ];

  const handleCreateBundle = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`✨ Success! Bundle "${newBundleName}" added to catalog.`, 'success');
    setIsAddBundleOpen(false);
    // Reset
    setNewBundleName('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider mb-2 border border-amber-200">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Marketplace Overview
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Manage video bundles, track creator purchases, monitor content analytics, and configure catalogue settings.
          </p>
        </div>

        <button
          onClick={() => setIsAddBundleOpen(true)}
          className="px-5 py-3 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-black text-xs rounded-2xl shadow-xl orange-glow transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bundle</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.title}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-[11px] text-emerald-600 font-extrabold">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-1 no-scrollbar">
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
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 border border-slate-200 shadow-md ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Dashboard & Sales */}
      {activeTab === 'dashboard' || activeTab === 'purchases' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Recent Purchases Table</h3>
            <span className="text-xs text-slate-500 font-medium">Live order feed</span>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Creator / User</th>
                    <th className="p-4">Bundle Title</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                  {MOCK_PURCHASES.map((p) => (
                    <tr key={p.id} className="hover:bg-orange-50/40 transition-colors">
                      <td className="p-4 font-mono text-slate-500">{p.id}</td>
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900">{p.userName}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{p.userEmail}</div>
                      </td>
                      <td className="p-4 font-extrabold text-brand-600">{p.bundleTitle}</td>
                      <td className="p-4 font-black text-slate-900">₹{p.amount}</td>
                      <td className="p-4 text-slate-600">{p.paymentMethod}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'bundles' ? (
        /* Tab Content: Bundles Management Grid */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Active Video Bundles ({MOCK_BUNDLES.length})</h3>
            <button
              onClick={() => setIsAddBundleOpen(true)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-xl border border-slate-200 flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bundle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BUNDLES.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 flex items-center space-x-4 shadow-sm">
                <img src={b.thumbnail} alt={b.title} className="w-16 h-20 object-cover rounded-xl border border-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-orange-100 text-brand-600 rounded">
                    {b.category}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 truncate mt-1">{b.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{b.videoCount} Videos • ₹{b.price}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-[10px] text-emerald-700 font-bold">Active Catalog</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab Content: Users / Videos placeholder list */
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-black text-slate-900">Module Ready for Backend Integration</h3>
          <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
            This administrative tab is structured and ready to consume Supabase / REST endpoints.
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-brand-500" />
                  <h3 className="text-base font-black text-slate-900">Add New Video Bundle</h3>
                </div>
                <button
                  onClick={() => setIsAddBundleOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBundle} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Bundle Name</label>
                  <input
                    type="text"
                    required
                    value={newBundleName}
                    onChange={(e) => setNewBundleName(e.target.value)}
                    placeholder="e.g. Toddler Bloopers Vault"
                    className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="49"
                      className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Number of Videos</label>
                    <input
                      type="number"
                      required
                      value={newVideoCount}
                      onChange={(e) => setNewVideoCount(e.target.value)}
                      placeholder="50"
                      className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  >
                    <option value="Comedy">Comedy</option>
                    <option value="Cute Reactions">Cute Reactions</option>
                    <option value="Conversations">Conversations</option>
                    <option value="Funny Moments">Funny Moments</option>
                    <option value="Trending">Trending</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Short description for creators..."
                    className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 uppercase tracking-wider block">Thumbnail Image URL</label>
                  <input
                    type="url"
                    required
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-orange-600 text-white font-black rounded-xl shadow-lg orange-glow transition-all"
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

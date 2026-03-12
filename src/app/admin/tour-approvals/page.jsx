"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Eye, RefreshCw, Search, ExternalLink } from 'lucide-react';

const STATUS_CONFIG = {
  pending:  { label: 'Pending',  color: 'bg-amber-100 text-amber-700',  icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700',  icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700',      icon: XCircle },
};

export default function AdminTourApprovalsPage() {
  const [tours, setTours]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState('pending');
  const [search, setSearch]       = useState('');
  const [actioning, setActioning] = useState(null); // slug being actioned

  const fetchTours = async (status = filter) => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/tours?status=${status}`);
      const data = await res.json();
      if (data.success) setTours(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTours(filter); }, [filter]);

  const handleAction = async (slug, newStatus) => {
    setActioning(slug);
    try {
      const res  = await fetch(`/api/tours/${slug}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // Update in list instantly
        setTours(prev => prev.map(t => t.slug === slug ? { ...t, status: newStatus } : t));
      }
    } catch (e) { console.error(e); }
    finally { setActioning(null); }
  };

  const displayed = tours.filter(t =>
    !search || t.title?.toLowerCase().includes(search.toLowerCase())
  );

  const counts = { pending: 0, approved: 0, rejected: 0 };
  tours.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tour Approvals</h1>
          <p className="text-sm text-gray-500 mt-0.5">Review and approve newly submitted tours before they go live.</p>
        </div>
        <button
          onClick={() => fetchTours(filter)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status Tab Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                filter === key
                  ? 'border-[#00694B] bg-[#00694B]/10 text-[#00694B]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <Icon size={14} />
              {cfg.label}
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                filter === key ? 'bg-[#00694B] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {/* We show real count only when this tab is active */}
                {filter === key ? displayed.length : '—'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 mb-5 max-w-xs">
        <Search size={15} className="text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tour title…"
          className="outline-none text-sm w-full text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
            Loading tours…
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Clock size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No {filter} tours</p>
            <p className="text-sm mt-1">
              {filter === 'pending'
                ? 'All caught up! No tours waiting for review.'
                : `No tours with status "${filter}".`}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Tour</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden sm:table-cell">Duration</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden md:table-cell">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(tour => {
                const cfg = STATUS_CONFIG[tour.status] || STATUS_CONFIG.pending;
                const Icon = cfg.icon;
                const isActioning = actioning === tour.slug;
                return (
                  <tr key={tour._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    {/* Tour Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {tour.image_url && (
                          <img
                            src={tour.image_url}
                            alt={tour.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                            onError={e => e.target.style.display = 'none'}
                          />
                        )}
                        <div>
                          <p className="font-semibold text-[#1a1a1a] leading-tight">{tour.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">/tours/{tour.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{tour.duration || '—'}</td>
                    <td className="px-4 py-3 font-bold text-[#00694B] hidden md:table-cell">
                      ${tour.base_price ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${cfg.color}`}>
                        <Icon size={11} /> {cfg.label}
                      </span>
                    </td>
                    {/* Action Buttons */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Preview */}
                        <a
                          href={`/tours/${tour.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <ExternalLink size={15} />
                        </a>
                        {/* Approve */}
                        {tour.status !== 'approved' && (
                          <button
                            onClick={() => handleAction(tour.slug, 'approved')}
                            disabled={isActioning}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                            title="Approve this tour"
                          >
                            {isActioning ? (
                              <RefreshCw size={12} className="animate-spin" />
                            ) : (
                              <CheckCircle size={12} />
                            )}
                            Approve
                          </button>
                        )}
                        {/* Reject */}
                        {tour.status !== 'rejected' && (
                          <button
                            onClick={() => handleAction(tour.slug, 'rejected')}
                            disabled={isActioning}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                            title="Reject this tour"
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        )}
                        {/* Re-pend */}
                        {tour.status !== 'pending' && (
                          <button
                            onClick={() => handleAction(tour.slug, 'pending')}
                            disabled={isActioning}
                            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                            title="Move back to pending"
                          >
                            <Clock size={12} /> Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Clock, DollarSign, MapPin, Search } from 'lucide-react';

const REGION_OPTIONS = [
  { value: 'east', label: '🌅 East Roatan' },
  { value: 'west', label: '🌊 West Roatan' },
];

const EMOJI_PRESETS = ['🌴', '🤿', '🐬', '🏍️', '🧗', '🎣', '🏖️', '🛶', '⛵', '🌅', '🦥', '🦋', '🍫', '🥃', '🌊', '🐴', '🎉', '🗺️'];

const emptyForm = { name: '', region: 'west', price: '', durationHours: '', description: '', emoji: '🌴', isActive: true, sortOrder: 0 };

export default function AdminPlanActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plan-activities');
      const data = await res.json();
      if (data.success) setActivities(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchActivities(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); setError(''); };
  const openEdit = (a) => { setForm({ ...a, price: String(a.price), durationHours: String(a.durationHours), sortOrder: String(a.sortOrder) }); setEditingId(a._id); setShowForm(true); setError(''); };
  const closeForm = () => { setShowForm(false); setEditingId(null); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      price: parseFloat(form.price),
      durationHours: parseFloat(form.durationHours),
      sortOrder: parseInt(form.sortOrder) || 0,
    };
    if (!payload.name || !payload.price || !payload.durationHours) {
      setError('Name, price, and duration are required.'); setSaving(false); return;
    }
    try {
      const url = editingId ? `/api/plan-activities/${editingId}` : '/api/plan-activities';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) { closeForm(); fetchActivities(); }
      else setError(data.error || 'Save failed');
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this activity?')) return;
    await fetch(`/api/plan-activities/${id}`, { method: 'DELETE' });
    fetchActivities();
  };

  const runSeed = async () => {
    if (!confirm('This will seed all initial East/West Roatan activities. Continue?')) return;
    const res = await fetch('/api/plan-activities/seed');
    const data = await res.json();
    alert(data.message || (data.success ? 'Seeded!' : 'Failed'));
    fetchActivities();
  };

  const filtered = activities.filter(a => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === 'all' || a.region === regionFilter;
    return matchSearch && matchRegion;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan Activities</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage East & West Roatan activities for the adventure planner. Set name, region, price, and hours.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={runSeed} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Seed Default Data
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-[#00694B] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#005a3c] transition-colors">
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activities…" className="outline-none text-sm w-full" />
        </div>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white">
          <option value="all">All Regions</option>
          <option value="east">East Roatan</option>
          <option value="west">West Roatan</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Activities', value: activities.length },
          { label: 'East Roatan', value: activities.filter(a => a.region === 'east').length },
          { label: 'West Roatan', value: activities.filter(a => a.region === 'west').length },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-2xl font-black text-[#1a1a1a]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Activity</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Region</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Price</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Duration</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">No activities found. Click "Seed Default Data" to add the initial activities.</td></tr>
            ) : filtered.map((a) => (
              <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{a.emoji}</span>
                    <div>
                      <p className="font-medium text-[#1a1a1a]">{a.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{a.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${a.region === 'east' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {a.region === 'east' ? '🌅 East' : '🌊 West'}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-[#00694B]">${a.price}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-gray-700"><Clock size={13} /> {a.durationHours}h
                    {a.durationHours >= 8 && <span className="text-[10px] bg-orange-100 text-orange-700 px-1 rounded ml-1">Full Day</span>}
                    {a.durationHours >= 4 && a.durationHours < 8 && <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded ml-1">Half Day</span>}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(a)} className="p-1.5 text-gray-500 hover:text-[#00694B] hover:bg-green-50 rounded-lg transition-colors"><Edit2 size={15} /></button>
                    <button onClick={() => handleDelete(a._id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={closeForm} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editingId ? 'Edit Activity' : 'Add Activity'}</h2>
              <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Activity Name *</label>
                <input required name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#00694B]" placeholder="e.g. Dolphin Swim & Snorkel" />
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Region *</label>
                <div className="grid grid-cols-2 gap-2">
                  {REGION_OPTIONS.map(r => (
                    <button key={r.value} type="button" onClick={() => setForm({ ...form, region: r.value })}
                      className={`py-2.5 rounded-lg border-2 text-sm font-bold transition-all ${form.region === r.value ? (r.value === 'east' ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-blue-400 bg-blue-50 text-blue-800') : 'border-gray-200 text-gray-600'}`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (USD/person) *</label>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#00694B]">
                    <span className="px-3 py-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-200">$</span>
                    <input required name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="flex-1 p-3 text-sm outline-none" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration (hours) *</label>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#00694B]">
                    <span className="px-3 py-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-200"><Clock size={14} /></span>
                    <input required name="durationHours" type="number" min="0.5" max="8" step="0.5" value={form.durationHours} onChange={handleChange} className="flex-1 p-3 text-sm outline-none" placeholder="2" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Max 8h per day. 4h = half day, 8h = full day</p>
                </div>
              </div>

              {/* Emoji */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Emoji Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_PRESETS.map(em => (
                    <button key={em} type="button" onClick={() => setForm({ ...form, emoji: em })}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border-2 transition-all ${form.emoji === em ? 'border-[#00694B] bg-[#00694B]/10' : 'border-gray-100 hover:border-gray-300'}`}>
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description (optional)</label>
                <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#00694B] resize-none" placeholder="Short description shown to users…" />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sort Order (lower = first)</label>
                <input name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#00694B]" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#00694B] text-white rounded-lg py-2.5 text-sm font-bold hover:bg-[#005a3c] disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : <><Save size={15} /> {editingId ? 'Update' : 'Create'}</>}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

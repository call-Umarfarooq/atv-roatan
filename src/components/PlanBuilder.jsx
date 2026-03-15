"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin, Clock, ChevronDown, ChevronUp, Users, Calendar,
  Plus, X, Check, AlertCircle, ChevronRight, Loader2,
  Minus, Star, ArrowRight, Zap, Tag
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_HOURS_PER_DAY = 8;
const LONG_STAY_MIN_DAYS = 7;
const LONG_STAY_DISCOUNT = 0.10; // 10%

// ─── Helper ───────────────────────────────────────────────────────────────────
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function daysBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
}

// ─── Sub Components ───────────────────────────────────────────────────────────

function HoursBar({ used, max = 8 }) {
  const pct = Math.min(100, (used / max) * 100);
  const color = pct >= 100 ? 'bg-red-500' : pct >= 75 ? 'bg-amber-400' : 'bg-[#00694B]';
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
        <span>{used}h used</span>
        <span>{max - used}h free</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ActivityCard({ activity, onAdd, hoursUsed, disabled }) {
  const remaining = MAX_HOURS_PER_DAY - hoursUsed;
  const wouldExceed = activity.durationHours > remaining;
  const isDisabled = disabled || wouldExceed;

  return (
    <div className={`border rounded-xl p-3 transition-all ${isDisabled ? 'opacity-50 border-gray-100' : 'border-gray-200 hover:border-[#00694B] hover:shadow-sm'}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{activity.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{activity.name}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="flex items-center gap-0.5 text-xs text-gray-500"><Clock size={11} /> {activity.durationHours}h</span>
            <span className="flex items-center gap-0.5 text-xs font-bold text-[#00694B]">${activity.price}<span className="font-normal text-gray-400">/person</span></span>
            {activity.durationHours >= 8 && <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full font-bold">Full Day</span>}
            {activity.durationHours >= 4 && activity.durationHours < 8 && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">Half Day</span>}
          </div>
          {activity.description && <p className="text-[11px] text-gray-400 mt-1 leading-snug line-clamp-2">{activity.description}</p>}
        </div>
        <button
          onClick={() => !isDisabled && onAdd(activity)}
          disabled={isDisabled}
          title={wouldExceed ? `Needs ${activity.durationHours}h but only ${remaining}h left` : 'Add to day'}
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all text-sm font-bold ${isDisabled ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#00694B] text-[#00694B] hover:bg-[#00694B] hover:text-white'}`}
        >
          <Plus size={16} />
        </button>
      </div>
      {wouldExceed && !disabled && (
        <p className="text-[10px] text-orange-500 mt-1.5 flex items-center gap-1">
          <AlertCircle size={10} /> Only {remaining}h remaining — this activity needs {activity.durationHours}h
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlanBuilder() {
  const router = useRouter();

  // ── Step 1 state ──
  const [step, setStep] = useState(1);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [showTravelers, setShowTravelers] = useState(false);
  const [step1Error, setStep1Error] = useState('');

  // ── Step 2 state ──
  const [allActivities, setAllActivities] = useState([]); // from API
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [days, setDays] = useState([]); // [{ dayNumber, date, region, activities[] }]
  const [activePanelDay, setActivePanelDay] = useState(null); // which day's picker is open
  const [panelRegion, setPanelRegion] = useState('east'); // in activity picker panel

  // ── Step 3 state ──
  const [isReview, setIsReview] = useState(false);

  // ── Computed ──
  const totalDays = daysBetween(arrivalDate, departureDate);
  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  // Price helpers
  const paidTravelers = travelers.adults + travelers.children; // infants free

  const daySubtotal = useCallback((day) => {
    return day.activities.reduce((sum, a) => sum + a.price * paidTravelers, 0);
  }, [paidTravelers]);

  const subtotal = useMemo(() => days.reduce((s, d) => s + daySubtotal(d), 0), [days, daySubtotal]);
  const isLongStay = totalDays >= LONG_STAY_MIN_DAYS;
  const discountAmount = isLongStay ? subtotal * LONG_STAY_DISCOUNT : 0;
  const grandTotal = subtotal - discountAmount;

  // Fetch activities from API
  useEffect(() => {
    if (step < 2) return;
    setLoadingActivities(true);
    fetch('/api/plan-activities')
      .then(r => r.json())
      .then(data => { if (data.success) setAllActivities(data.data); })
      .catch(console.error)
      .finally(() => setLoadingActivities(false));
  }, [step]);

  // Build day grid when dates change
  useEffect(() => {
    if (!arrivalDate || !departureDate || totalDays <= 0) return;
    setDays(prev => {
      const newDays = [];
      for (let i = 0; i < totalDays; i++) {
        const existing = prev.find(d => d.dayNumber === i + 1);
        newDays.push(existing || {
          dayNumber: i + 1,
          date: addDays(arrivalDate, i),
          region: null, // not chosen yet
          activities: [],
          hoursUsed: 0,
        });
      }
      return newDays;
    });
  }, [arrivalDate, departureDate, totalDays]);

  // ── Handlers ──
  const handleStep1Next = () => {
    if (!arrivalDate || !departureDate) { setStep1Error('Please select both arrival and departure dates.'); return; }
    if (totalDays < 1) { setStep1Error('Departure must be at least 1 day after arrival.'); return; }
    if (travelers.adults < 1) { setStep1Error('At least 1 adult is required.'); return; }
    setStep1Error('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setDayRegion = (dayNumber, region) => {
    setDays(prev => prev.map(d => d.dayNumber === dayNumber ? { ...d, region } : d));
  };

  const openActivityPanel = (dayNumber) => {
    const day = days.find(d => d.dayNumber === dayNumber);
    if (day?.region) setPanelRegion(day.region);
    setActivePanelDay(dayNumber);
  };

  const closePanel = () => setActivePanelDay(null);

  const addActivityToDay = (dayNumber, activity) => {
    setDays(prev => prev.map(d => {
      if (d.dayNumber !== dayNumber) return d;
      const newHours = d.hoursUsed + activity.durationHours;
      if (newHours > MAX_HOURS_PER_DAY) return d; // safety guard
      return {
        ...d,
        activities: [...d.activities, { ...activity, addedAt: Date.now() }],
        hoursUsed: newHours,
      };
    }));
  };

  const removeActivityFromDay = (dayNumber, addedAt) => {
    setDays(prev => prev.map(d => {
      if (d.dayNumber !== dayNumber) return d;
      const filtered = d.activities.filter(a => a.addedAt !== addedAt);
      return { ...d, activities: filtered, hoursUsed: filtered.reduce((s, a) => s + a.durationHours, 0) };
    }));
  };

  const updateTravelers = (type, op) => {
    setTravelers(prev => {
      const val = op === 'inc' ? prev[type] + 1 : prev[type] - 1;
      if (val < 0) return prev;
      if (type === 'adults' && val < 1) return prev;
      return { ...prev, [type]: val };
    });
  };

  const handleProceedToCheckout = () => {
    const activitiesCount = days.reduce((s, d) => s + d.activities.length, 0);
    if (activitiesCount === 0) { alert('Please add at least one activity to your plan.'); return; }
    const planData = {
      arrivalDate: arrivalDate.toISOString(),
      departureDate: departureDate.toISOString(),
      totalDays,
      travelers,
      days: days.map(d => ({
        dayNumber: d.dayNumber,
        date: d.date,
        region: d.region,
        activities: d.activities.map(a => ({
          activityId: a._id,
          name: a.name,
          price: a.price,
          durationHours: a.durationHours,
          region: a.region,
          emoji: a.emoji,
        })),
        hoursUsed: d.hoursUsed,
        dayTotal: daySubtotal(d),
      })),
      subtotal,
      discountPercent: isLongStay ? LONG_STAY_DISCOUNT * 100 : 0,
      discountAmount,
      totalPrice: grandTotal,
    };
    localStorage.setItem('planCheckoutData', JSON.stringify(planData));
    router.push('/plan-checkout');
  };

  // Filtered activities for the picker panel
  const panelActivities = useMemo(() =>
    allActivities.filter(a => a.region === panelRegion),
    [allActivities, panelRegion]
  );

  const activePanelDayObj = activePanelDay ? days.find(d => d.dayNumber === activePanelDay) : null;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf6] via-white to-[#f0f9ff]">

      {/* Hero Header */}
      <div className="bg-[#00694B] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-green-200 block mb-2">Build Your Own Adventure</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Design Your Perfect Roatan Stay</h1>
          <p className="text-green-100 max-w-xl mx-auto text-sm sm:text-base">
            Choose activities for every day — East or West Roatan — and get instant pricing.
            Stay 7+ days and unlock a <strong>10% Long-Stay Discount</strong>.
          </p>
          {/* Step Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {['Set Dates & Travelers', 'Build Your Days', 'Review & Book'].map((label, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all
                  ${step === i + 1 ? 'bg-white text-[#00694B]' : step > i + 1 ? 'bg-green-700 text-white' : 'bg-green-800 text-green-200'}`}>
                  {step > i + 1 ? <Check size={12} /> : <span>{i + 1}</span>}
                  {label}
                </div>
                {i < 2 && <ChevronRight size={14} className="text-green-400" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── STEP 1: Dates & Travelers ── */}
        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-[#00694B]" /> When are you visiting?
              </h2>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">Arrival Date</label>
                  <div className="border rounded-lg p-3 hover:border-[#00694B] transition-colors">
                    <DatePicker
                      selected={arrivalDate}
                      onChange={(d) => {
                        setArrivalDate(d);
                        if (departureDate && d >= departureDate) setDepartureDate(null);
                      }}
                      minDate={new Date()}
                      placeholderText="Select arrival"
                      className="w-full text-sm font-semibold outline-none bg-transparent cursor-pointer caret-transparent text-gray-800 placeholder-gray-400"
                      dateFormat="MMM d, yyyy"
                      onFocus={e => e.target.blur()}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">Departure Date</label>
                  <div className="border rounded-lg p-3 hover:border-[#00694B] transition-colors">
                    <DatePicker
                      selected={departureDate}
                      onChange={setDepartureDate}
                      minDate={arrivalDate ? addDays(arrivalDate, 1) : new Date()}
                      placeholderText="Select departure"
                      className="w-full text-sm font-semibold outline-none bg-transparent cursor-pointer caret-transparent text-gray-800 placeholder-gray-400"
                      dateFormat="MMM d, yyyy"
                      onFocus={e => e.target.blur()}
                    />
                  </div>
                </div>
              </div>

              {/* Stay Duration Badge */}
              {totalDays > 0 && (
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl mb-6 text-sm font-bold
                  ${isLongStay ? 'bg-[#00694B] text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {isLongStay
                    ? <><Zap size={16} /> {totalDays}-Day Stay — 10% Long-Stay Discount Unlocked! 🎉</>
                    : <><Calendar size={15} /> {totalDays}-Day Stay — Add {LONG_STAY_MIN_DAYS - totalDays} more day{LONG_STAY_MIN_DAYS - totalDays !== 1 ? 's' : ''} for 10% off</>
                  }
                </div>
              )}

              {/* Travelers */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">Travelers</label>
                <div
                  className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-[#00694B] transition-colors"
                  onClick={() => setShowTravelers(v => !v)}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a]">
                    <Users size={16} className="text-gray-400" />
                    {totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''}
                    {travelers.children > 0 && <span className="text-xs text-gray-400">({travelers.children} child)</span>}
                  </span>
                  {showTravelers ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
                {showTravelers && (
                  <div className="border border-t-0 rounded-b-lg p-4 space-y-3">
                    {[
                      { key: 'adults', label: 'Adults', sub: '18+', min: 1 },
                      { key: 'children', label: 'Children', sub: '4–17', min: 0 },
                      { key: 'infants', label: 'Infants', sub: '0–3 (Free)', min: 0 },
                    ].map(({ key, label, sub, min }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                          <p className="text-xs text-gray-400">{sub}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateTravelers(key, 'dec')}
                            disabled={travelers[key] <= min}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors
                              ${travelers[key] <= min ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#00694B] text-[#00694B] hover:bg-gray-50'}`}
                          ><Minus size={14} /></button>
                          <span className="w-5 text-center text-sm font-bold">{travelers[key]}</span>
                          <button
                            onClick={() => updateTravelers(key, 'inc')}
                            className="w-8 h-8 rounded-full border border-[#00694B] text-[#00694B] flex items-center justify-center hover:bg-gray-50 transition-colors"
                          ><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {step1Error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
                  <AlertCircle size={16} /> {step1Error}
                </div>
              )}

              <button
                onClick={handleStep1Next}
                className="w-full bg-[#00694B] hover:bg-[#005a3c] text-white font-bold py-3.5 rounded-full text-base transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Plan My Trip <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Day Grid ── */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left — Day Cards */}
            <div className="lg:col-span-2 space-y-4">
              {/* Back + Header */}
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setStep(1)} className="text-sm text-[#00694B] font-bold hover:underline flex items-center gap-1">
                  ← Edit Dates
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600 font-medium">
                  {formatDate(arrivalDate)} → {formatDate(departureDate)} · {totalDays} days · {totalTravelers} travelers
                </span>
              </div>

              {loadingActivities && (
                <div className="flex items-center justify-center py-8 text-gray-400">
                  <Loader2 size={24} className="animate-spin mr-3" /> Loading activities...
                </div>
              )}

              {days.map(day => (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  onSetRegion={region => setDayRegion(day.dayNumber, region)}
                  onAddActivity={() => openActivityPanel(day.dayNumber)}
                  onRemoveActivity={addedAt => removeActivityFromDay(day.dayNumber, addedAt)}
                  paidTravelers={paidTravelers}
                />
              ))}

              {/* Review CTA */}
              <div className="pt-2">
                <button
                  onClick={() => { setIsReview(true); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full bg-[#00694B] hover:bg-[#005a3c] text-white font-bold py-3.5 rounded-full text-base transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Review My Itinerary <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right — Price Summary (desktop sticky) */}
            <div className="hidden lg:block">
              <PriceSidebar
                days={days}
                travelers={travelers}
                paidTravelers={paidTravelers}
                subtotal={subtotal}
                discountAmount={discountAmount}
                grandTotal={grandTotal}
                isLongStay={isLongStay}
                onCheckout={() => { setIsReview(true); setStep(3); }}
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: Review ── */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setStep(2)} className="text-sm text-[#00694B] font-bold hover:underline flex items-center gap-1 mb-5">
              ← Edit Plan
            </button>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Your Itinerary Summary</h2>
              <div className="text-sm text-gray-500 mb-5 flex flex-wrap gap-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(arrivalDate)} – {formatDate(departureDate)}</span>
                <span className="flex items-center gap-1"><Users size={14} /> {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
                  {travelers.children > 0 && `, ${travelers.children} Child`}
                  {travelers.infants > 0 && `, ${travelers.infants} Infant`}
                </span>
              </div>
              <div className="space-y-4">
                {days.map(day => (
                  <div key={day.dayNumber} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className={`flex items-center justify-between px-4 py-3 ${day.region === 'east' ? 'bg-amber-50' : day.region === 'west' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <div>
                        <span className="font-bold text-sm text-[#1a1a1a]">Day {day.dayNumber}</span>
                        <span className="text-xs text-gray-500 ml-2">{formatDate(day.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {day.region && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${day.region === 'east' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
                            {day.region === 'east' ? '🌅 East Roatan' : '🌊 West Roatan'}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#00694B]">${daySubtotal(day).toFixed(0)}</span>
                      </div>
                    </div>
                    {day.activities.length === 0 ? (
                      <p className="px-4 py-3 text-xs text-gray-400 italic">No activities planned — free day</p>
                    ) : (
                      <div className="px-4 py-2 space-y-1.5">
                        {day.activities.map(a => (
                          <div key={a.addedAt} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-gray-700">{a.emoji} {a.name}</span>
                            <span className="text-xs text-[#00694B] font-bold">{a.durationHours}h · ${a.price}/pp</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-bold text-[#1a1a1a] mb-4">Price Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal ({paidTravelers} paid traveler{paidTravelers !== 1 ? 's' : ''})</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                {isLongStay && <div className="flex justify-between text-[#00694B] font-bold"><span>7+ Day Discount (10%)</span><span>−${discountAmount.toFixed(2)}</span></div>}
                <div className="border-t pt-2.5 flex justify-between text-base font-black text-[#1a1a1a]"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
              </div>
              {travelers.infants > 0 && <p className="text-xs text-gray-400 mt-3 italic">* Infants (0–3) travel free</p>}
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#00694B] hover:bg-[#005a3c] text-white font-bold py-4 rounded-full text-base transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Book This Adventure <ArrowRight size={18} />
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">You'll enter your details on the next page — no account required</p>
          </div>
        )}
      </div>

      {/* ── Mobile Price Bar ── */}
      {step === 2 && subtotal > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 lg:hidden z-40">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-black text-[#1a1a1a]">${grandTotal.toFixed(2)}</p>
              {isLongStay && <p className="text-[10px] text-[#00694B] font-bold">10% discount applied!</p>}
            </div>
            <button
              onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-[#00694B] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors hover:bg-[#005a3c]"
            >
              Review Plan →
            </button>
          </div>
        </div>
      )}

      {/* ── Activity Picker Panel (right drawer) ── */}
      {activePanelDay !== null && (
        <ActivityPickerPanel
          day={activePanelDayObj}
          activities={panelActivities}
          allActivities={allActivities}
          panelRegion={panelRegion}
          onRegionChange={r => { setPanelRegion(r); setDayRegion(activePanelDay, r); }}
          onAdd={a => addActivityToDay(activePanelDay, a)}
          onClose={closePanel}
        />
      )}
    </div>
  );
}

// ─── DayCard ──────────────────────────────────────────────────────────────────
function DayCard({ day, onSetRegion, onAddActivity, onRemoveActivity, paidTravelers }) {
  const isFullDay = day.hoursUsed >= MAX_HOURS_PER_DAY;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className={`flex items-center justify-between px-5 py-3 border-b border-gray-100
        ${day.region === 'east' ? 'bg-amber-50' : day.region === 'west' ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <div>
          <span className="font-bold text-[#1a1a1a]">Day {day.dayNumber}</span>
          <span className="text-xs text-gray-400 ml-2">{formatDate(day.date)}</span>
        </div>
        {day.activities.length > 0 && (
          <span className="text-xs font-bold text-[#00694B]">
            ${(day.activities.reduce((s, a) => s + a.price * paidTravelers, 0)).toFixed(0)}
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Region Selector */}
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Where are you going today?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSetRegion('east')}
              disabled={day.activities.length > 0 && day.region === 'west'}
              className={`px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-center gap-1.5
                ${day.region === 'east' ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-amber-300'}
                ${day.activities.length > 0 && day.region === 'west' ? 'opacity-50 cursor-not-allowed hover:border-gray-200' : ''}`}
            >
              🌅 East Roatan
            </button>
            <button
              onClick={() => onSetRegion('west')}
              disabled={day.activities.length > 0 && day.region === 'east'}
              className={`px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-center gap-1.5
                ${day.region === 'west' ? 'border-blue-400 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-600 hover:border-blue-300'}
                ${day.activities.length > 0 && day.region === 'east' ? 'opacity-50 cursor-not-allowed hover:border-gray-200' : ''}`}
            >
              🌊 West Roatan
            </button>
          </div>
        </div>

        {/* Hours Bar */}
        {day.activities.length > 0 && (
          <div className="mb-4">
            <HoursBar used={day.hoursUsed} max={MAX_HOURS_PER_DAY} />
          </div>
        )}

        {/* Activity Chips */}
        {day.activities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {day.activities.map(a => (
              <div key={a.addedAt} className="flex items-center gap-1.5 bg-[#f0fdf6] border border-[#00694B]/20 rounded-full px-3 py-1 text-xs font-semibold text-[#00694B]">
                <span>{a.emoji}</span>
                <span>{a.name}</span>
                <span className="text-gray-400">({a.durationHours}h)</span>
                <button onClick={() => onRemoveActivity(a.addedAt)} className="text-gray-400 hover:text-red-500 ml-0.5 transition-colors">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Activity Button */}
        {!isFullDay && (
          <button
            onClick={onAddActivity}
            disabled={!day.region}
            title={!day.region ? 'Select a region first' : 'Add an activity'}
            className={`w-full border-2 border-dashed rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-all
              ${!day.region ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#00694B]/50 text-[#00694B] hover:bg-[#00694B]/5 hover:border-[#00694B]'}`}
          >
            <Plus size={16} /> {day.activities.length === 0 ? 'Add Activity' : 'Add Another Activity'}
          </button>
        )}
        {isFullDay && (
          <div className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#00694B] font-bold bg-[#f0fdf6] rounded-xl">
            <Check size={16} /> Full Day Scheduled!
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Activity Picker Panel ────────────────────────────────────────────────────
function ActivityPickerPanel({ day, activities, allActivities, panelRegion, onRegionChange, onAdd, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
          <div>
            <h3 className="font-bold text-[#1a1a1a]">Day {day?.dayNumber} — Activities</h3>
            <p className="text-xs text-gray-500">{formatDate(day?.date)}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Region Tabs inside panel */}
        <div className="flex gap-2 px-4 py-3 border-b border-gray-100 shrink-0">
          {(!day?.region || day.region === 'east') && (
            <button
              onClick={() => onRegionChange('east')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${panelRegion === 'east' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${day?.region === 'east' ? 'cursor-default pointer-events-none' : ''}`}
            >🌅 East Roatan</button>
          )}
          {(!day?.region || day.region === 'west') && (
            <button
              onClick={() => onRegionChange('west')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${panelRegion === 'west' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${day?.region === 'west' ? 'cursor-default pointer-events-none' : ''}`}
            >🌊 West Roatan</button>
          )}
        </div>

        {/* Hours remaining */}
        <div className="px-4 py-2 bg-gray-50 shrink-0">
          <HoursBar used={day?.hoursUsed || 0} />
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No activities available for this region.</div>
          ) : (
            activities.map(activity => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                hoursUsed={day?.hoursUsed || 0}
                onAdd={a => { onAdd(a); }}
                disabled={false}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

// ─── Price Sidebar ────────────────────────────────────────────────────────────
function PriceSidebar({ days, travelers, paidTravelers, subtotal, discountAmount, grandTotal, isLongStay, onCheckout }) {
  const activeDays = days.filter(d => d.activities.length > 0);
  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-[#1a1a1a] mb-4">Price Summary</h3>

      {activeDays.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">Add activities to see pricing</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {activeDays.map(day => (
              <div key={day.dayNumber} className="flex justify-between text-sm">
                <span className="text-gray-600">Day {day.dayNumber} ({day.activities.length} activity{day.activities.length !== 1 ? 'ies' : ''})</span>
                <span className="font-semibold">${(day.activities.reduce((s, a) => s + a.price * paidTravelers, 0)).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {isLongStay && (
              <div className="flex justify-between text-[#00694B] font-bold">
                <span className="flex items-center gap-1"><Tag size={12} /> Long-Stay (10% off)</span>
                <span>−${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-black text-[#1a1a1a] text-base">
              <span>Total</span><span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          {travelers.infants > 0 && <p className="text-xs text-gray-400 mt-2 italic">* Infants free</p>}

          <button
            onClick={onCheckout}
            className="w-full mt-4 bg-[#00694B] hover:bg-[#005a3c] text-white font-bold py-3 rounded-full text-sm transition-colors"
          >
            Review Itinerary →
          </button>
        </>
      )}
    </div>
  );
}

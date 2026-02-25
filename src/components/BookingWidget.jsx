import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Check, ChevronDown, Users, Ticket, Minus, Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookingWidget = ({ tour, selectedPickup, className = "" }) => {
  const [date, setDate] = useState(null);
  const [showTravelers, setShowTravelers] = useState(false);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [selectedExtras, setSelectedExtras] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const travelersRef = useRef(null);

  const ADULT_PRICE = tour?.adultPrice || tour?.base_price || 0;
  const CHILD_PRICE = tour?.childPrice || 0;
  const INFANT_PRICE = tour?.infantPrice || 0;
  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  useEffect(() => {
    let total = (travelers.adults * ADULT_PRICE) + (travelers.children * CHILD_PRICE) + (travelers.infants * INFANT_PRICE);
    if (tour?.extraServices) {
      tour.extraServices.forEach((extra, index) => {
        total += (selectedExtras[index] || 0) * (parseFloat(extra.price) || 0);
      });
    }
    setTotalPrice(total);
  }, [travelers, ADULT_PRICE, CHILD_PRICE, INFANT_PRICE, selectedExtras, tour?.extraServices]);

  // Close travelers on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (travelersRef.current && !travelersRef.current.contains(e.target)) {
        setShowTravelers(false);
      }
    };
    if (showTravelers) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showTravelers]);

  const updateTravelers = (type, op) => {
    setTravelers(prev => {
      const val = op === 'inc' ? prev[type] + 1 : prev[type] - 1;
      if (val < 0) return prev;
      if (type === 'adults' && val < 1) return prev;
      return { ...prev, [type]: val };
    });
  };

  const updateExtras = (index, change) => {
    setSelectedExtras(prev => {
      const newVal = Math.max(0, (prev[index] || 0) + change);
      return { ...prev, [index]: newVal };
    });
  };

  const router = useRouter();

  const handleBooking = async (paymentOption) => {
    if (!date) { setDateError(true); return; }
    if (travelers.adults < 2) { alert('A minimum of 2 adults is required.'); return; }
    setLoading(true);
    const finalPrice = paymentOption === 'pay_now' ? totalPrice * 0.98 : totalPrice;
    const bookingData = {
      tour, date, travelers,
      totalPrice: finalPrice, originalPrice: totalPrice,
      discountApplied: paymentOption === 'pay_now' ? '2% Pay Now Discount' : null,
      adultPrice: ADULT_PRICE, childPrice: CHILD_PRICE, infantPrice: INFANT_PRICE,
      selectedExtras, initialPickup: selectedPickup, paymentOption,
    };
    try {
      localStorage.setItem('checkoutData', JSON.stringify(bookingData));
      router.push('/checkout');
    } catch (err) {
      console.error(err);
      alert('Failed to proceed to checkout');
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <style>{`
        .bw-datepicker .react-datepicker {
          font-family: inherit; border: 1px solid #e5e7eb;
          border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); overflow: hidden;
        }
        .bw-datepicker .react-datepicker__header { background: #00694B; border-bottom: none; padding: 10px 0 6px; }
        .bw-datepicker .react-datepicker__current-month { color: white; font-weight: 700; font-size: 13px; }
        .bw-datepicker .react-datepicker__navigation-icon::before { border-color: white; }
        .bw-datepicker .react-datepicker__day-name { color: rgba(255,255,255,0.8); font-weight: 600; font-size: 11px; }
        .bw-datepicker .react-datepicker__day { border-radius: 50%; font-size: 12px; width: 1.8rem; line-height: 1.8rem; color: #1a1a1a; }
        .bw-datepicker .react-datepicker__day:hover { background: #e6f2ed; border-radius: 50%; }
        .bw-datepicker .react-datepicker__day--selected { background: #00694B !important; color: white !important; font-weight: 700; }
        .bw-datepicker .react-datepicker__day--today { font-weight: 700; color: #00694B; }
        .bw-datepicker .react-datepicker__day--disabled { color: #d1d5db; }
        .bw-datepicker .react-datepicker-popper { z-index: 50; }
        .bw-datepicker .react-datepicker__triangle { display: none; }
      `}</style>

      <div className="border border-gray-200 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-4 bg-white">

        {/* Price Header */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            {tour?.cutoff_price && (
              <span className="text-gray-400 text-sm line-through mr-0.5">${tour.cutoff_price}</span>
            )}
            <span className="text-2xl font-bold text-[#1a1a1a]">${ADULT_PRICE}</span>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-[#00694B] bg-[#e6f2ed] px-2 py-0.5 rounded w-fit text-xs font-bold">
            <Check size={11} strokeWidth={3} />
            <span>Lowest Price Guarantee</span>
          </div>
        </div>

        {/* Date & Travelers Row */}
        <div className="grid grid-cols-2 gap-2 mb-3">

          {/* Date Picker */}
          <div className="bw-datepicker relative">
            <div className={`border rounded-lg px-3 py-2 cursor-pointer group relative h-[58px] flex flex-col justify-center ${dateError ? 'border-red-400 bg-red-50/30' : 'border-gray-300 hover:border-gray-700'}`}>
              <label className={`text-[10px] font-bold uppercase tracking-wide block mb-0.5 ${dateError ? 'text-red-500' : 'text-gray-400'}`}>Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => { setDate(d); setDateError(false); }}
                dateFormat="MMM d, yyyy"
                className={`w-full font-semibold text-sm outline-none cursor-pointer caret-transparent bg-transparent leading-none ${dateError ? 'text-red-600' : 'text-[#1a1a1a]'}`}
                wrapperClassName="w-full"
                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                onFocus={(e) => e.target.blur()}
                placeholderText="Select date"
                popperPlacement="bottom-start"
              />
              <ChevronDown size={13} className={`absolute right-2.5 bottom-2.5 pointer-events-none ${dateError ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            {dateError && <p className="text-red-500 text-[10px] font-semibold mt-0.5">Please select a date</p>}
          </div>

          {/* Travelers */}
          <div className="relative" ref={travelersRef}>
            <div
              className="border border-gray-300 hover:border-gray-700 rounded-lg px-3 py-2 cursor-pointer group relative h-[58px] flex flex-col justify-center"
              onClick={() => setShowTravelers(v => !v)}
            >
              <label className="text-[10px] font-bold uppercase tracking-wide text-gray-400 block mb-0.5 cursor-pointer">Travelers</label>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a] leading-none">
                <Users size={13} className="text-gray-400 shrink-0" />
                <span>{totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''}</span>
              </div>
              <ChevronDown size={13} className={`absolute right-2.5 bottom-2.5 text-gray-400 pointer-events-none transition-transform ${showTravelers ? 'rotate-180' : ''}`} />
            </div>

            {/* Travelers Dropdown â€” full width, below the field */}
            {showTravelers && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-xl p-3 z-30 mt-1.5 min-w-[220px]">
                {[
                  { key: 'adults', label: 'Adults', sub: `Age ${tour?.adultAgeRange || '12+'}`, price: ADULT_PRICE, min: 1 },
                  { key: 'children', label: 'Children', sub: `Age ${tour?.childAgeRange || '4-11'}`, price: CHILD_PRICE, min: 0 },
                  { key: 'infants', label: 'Infants', sub: `Age ${tour?.infantAgeRange || '0-3'}`, price: INFANT_PRICE, min: 0, free: INFANT_PRICE === 0 },
                ].map(({ key, label, sub, price, min, free }) => (
                  <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{label}</p>
                      <p className="text-[11px] text-gray-400">{sub} Â· {free ? 'Free' : `$${price}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); updateTravelers(key, 'dec'); }}
                        disabled={travelers[key] <= min}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-colors ${travelers[key] <= min ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-600 hover:border-gray-800'}`}
                      ><Minus size={10} /></button>
                      <span className="text-sm font-bold text-[#1a1a1a] w-4 text-center">{travelers[key]}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); updateTravelers(key, 'inc'); }}
                        className="w-6 h-6 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-800 transition-colors"
                      ><Plus size={10} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Extra Services */}
        {tour?.extraServices && tour.extraServices.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-3 mb-3">
            <label className="text-[10px] font-bold uppercase tracking-wide text-gray-400 block mb-2">Add-ons</label>
            <div className="space-y-2">
              {tour.extraServices.map((extra, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{extra.name}</p>
                    <p className="text-[11px] text-gray-400">${extra.price} / person</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateExtras(i, -1)} disabled={!selectedExtras[i]} className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${!selectedExtras[i] ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-600 hover:border-gray-800'}`}><Minus size={10} /></button>
                    <span className="text-sm font-bold text-[#1a1a1a] w-4 text-center">{selectedExtras[i] || 0}</span>
                    <button onClick={() => updateExtras(i, 1)} className="w-6 h-6 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-800 transition-colors"><Plus size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center mb-3 px-0.5">
          <span className="font-bold text-[#1a1a1a] text-sm">Total</span>
          <span className="text-xl font-bold text-[#1a1a1a]">${totalPrice}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleBooking('reserve_later')}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 text-[#1a1a1a] border border-[#1a1a1a] font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Reserve Now & Pay Later'}
          </button>

          <div className="relative">
            <span className="absolute -top-2 right-2 bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-red-200">
              Save 2%!
            </span>
            <button
              onClick={() => handleBooking('pay_now')}
              disabled={loading}
              className="w-full bg-[#00694B] hover:bg-[#1a6b24] text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60 flex flex-col items-center leading-tight"
            >
              <span>Book Now</span>
              <span className="text-[10px] font-normal opacity-80">Pay now & save 2%</span>
            </button>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="space-y-1.5 pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5 shrink-0">
              <Check size={10} className="text-[#00694B]" strokeWidth={3} />
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Free cancellation</span> Â· {tour?.booking_options?.policy_text || 'Up to 24 hours before'}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5 shrink-0">
              <Check size={10} className="text-[#00694B]" strokeWidth={3} />
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Reserve now, pay later</span> â€” stay flexible
            </p>
          </div>
        </div>
      </div>

      <div className="text-right text-gray-400 text-[10px] mt-1.5 flex items-center justify-end gap-1 pr-0.5">
        <Ticket size={10} /> Lowest Price Guarantee
      </div>
    </div>
  );
};

export default BookingWidget;


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
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const travelersRef = useRef(null);
  const datePickerRef = useRef(null);

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
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          padding: 16px;
          font-family: inherit;
          background: white;
        }
        .bw-datepicker .react-datepicker__header {
          background: white;
          border-bottom: none;
          padding: 10px 0 6px;
        }
        .bw-datepicker .react-datepicker__current-month {
          color: #1a1a1a;
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .bw-datepicker .react-datepicker__navigation-icon::before {
          border-color: #1a1a1a;
          border-width: 2px 2px 0 0;
        }
        .bw-datepicker .react-datepicker__day-name {
          color: #666;
          font-weight: 500;
          font-size: 12px;
          width: 2.5rem;
          line-height: 2.5rem;
        }
        .bw-datepicker .react-datepicker__day {
          border-radius: 4px;
          font-size: 14px;
          width: 2.5rem;
          line-height: 2.5rem;
          color: #1a1a1a;
          margin: 0;
        }
        .bw-datepicker .react-datepicker__day:hover {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .bw-datepicker .react-datepicker__day--selected {
          background: #00694B !important;
          color: white !important;
          font-weight: 700;
          border-radius: 4px;
        }
        .bw-datepicker .react-datepicker__day--today { font-weight: 700; }
        .bw-datepicker .react-datepicker__day--disabled { color: #d1d5db; }
        .bw-datepicker .react-datepicker-popper { z-index: 50; }
        .bw-datepicker .react-datepicker__triangle { display: none; }
        .bw-datepicker .react-datepicker__month-container {
          padding: 0 8px;
        }
        .bw-datepicker .react-datepicker__month-container + .react-datepicker__month-container {
          border-left: 1px solid #eee;
        }
        .bw-datepicker .react-datepicker__children-container {
          width: 100%;
          border-top: 1px solid #eee;
          padding-top: 12px;
          margin-top: 10px;
          font-size: 12px;
          color: #666;
          text-align: center;
          clear: both;
        }
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
                onChange={(d) => { 
                  setDate(d); 
                  setDateError(false); 
                  if (!isAvailabilityChecked) {
                    setTimeout(() => setShowTravelers(true), 50);
                  }
                }}
                ref={datePickerRef}
                dateFormat="MMM d, yyyy"
                className={`w-full font-semibold text-sm outline-none cursor-pointer caret-transparent bg-transparent leading-none ${dateError ? 'text-red-600' : 'text-[#1a1a1a]'}`}
                wrapperClassName="w-full"
                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                onFocus={(e) => e.target.blur()}
                placeholderText="Select date"
                popperPlacement="bottom-start"
                popperClassName="bw-datepicker-popper"
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

            {/* Travelers Dropdown &mdash; full width, below the field */}
            {showTravelers && (
              <div className="absolute top-full -right-[2px] bg-white border border-gray-200 shadow-xl rounded-xl p-5 z-30 mt-1.5 min-w-[340px]">
                <p className="text-sm text-gray-600 mb-4 pb-3 border-b border-gray-100">Select up to 15 travelers in total.</p>
                <div className="space-y-4">
                  {[
                    { key: 'adults', label: 'Adult', sub: `Age ${tour?.adultAgeRange || '11-90'}`, min: 2, max: 15 },
                    { key: 'children', label: 'Child', sub: `Age ${tour?.childAgeRange || '4-10'}`, min: 0, max: 15,  },
                    { key: 'infants', label: 'Infant', sub: `Age ${tour?.infantAgeRange || '0-3'}`, min: 0, max: 15, tag: 'FREE*' },
                  ].map(({ key, label, sub, min, max, tag }) => (
                    <div key={key} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[15px] font-bold text-[#1a1a1a] leading-tight flex items-center gap-1">
                            {label} <span className="font-normal text-gray-500">({sub})</span>
                          </p>
                          {tag && <span className="bg-[#e6f2ed] text-[#00694B] text-[11px] font-bold px-1.5 py-0.5 rounded">{tag}</span>}
                        </div>
                        <p className="text-[11px] text-gray-500">Minimum: {min}, Maximum: {max}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); updateTravelers(key, 'dec'); }}
                          disabled={travelers[key] <= min}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${travelers[key] <= min ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#00694B] text-[#00694B] hover:bg-gray-50'}`}
                        ><Minus size={16} /></button>
                        <span className="text-[15px] font-medium text-[#1a1a1a] w-4 text-center">{travelers[key]}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); updateTravelers(key, 'inc'); }}
                          disabled={totalTravelers >= 15 || travelers[key] >= max}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${totalTravelers >= 15 || travelers[key] >= max ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#00694B] text-[#00694B] hover:bg-gray-50'}`}
                        ><Plus size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4">
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setShowTravelers(false);
                      if (date) {
                        setIsAvailabilityChecked(true);
                      } else {
                        if (datePickerRef.current) datePickerRef.current.setOpen(true);
                      }
                    }}
                    className="w-full bg-[#00694B] text-white py-3 rounded-lg text-[15px] font-bold hover:bg-[#1a6b24] transition-colors shadow-sm"
                  >
                    Apply
                  </button>
                  <p className="text-center text-[10px] text-gray-500 mt-2">*Maximum discount rates shown may vary by date.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        
        {isAvailabilityChecked ? (
          <>
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
            <div className="space-y-3">
              <div className="relative mt-2">
                <span className="absolute -top-3 right-0 bg-white text-[#00694B] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#00694B] z-10 shadow-sm">
                  Save 2%!
                </span>
                <button
                  onClick={() => handleBooking('pay_now')}
                  disabled={loading}
                  className="w-full bg-[#00694B] hover:bg-[#1a6b24] text-white font-bold py-2.5 rounded-lg transition-colors text-[15px] disabled:opacity-60 flex flex-col items-center leading-tight shadow-sm"
                >
                  <span>Book Now</span>
                </button>
              </div>
              <button
                onClick={() => handleBooking('reserve_later')}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-[#1a1a1a] border border-[#1a1a1a] font-bold py-2 rounded-lg transition-colors text-[15px] disabled:opacity-60 flex items-center justify-center shadow-sm"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Reserve Now & Pay Later'}
              </button>
            </div>
          </>
        ) : (
          <div className="mb-3">
            <button
              onClick={() => {
                if (!date) {
                  if (datePickerRef.current) datePickerRef.current.setOpen(true);
                } else {
                  setShowTravelers(true);
                }
              }}
              className="w-full bg-[#00694B] hover:bg-[#1a6b24] text-white font-bold py-3.5 rounded-lg transition-colors text-[15px] shadow-sm"
            >
              Check Availability
            </button>
          </div>
        )}

        {/* Form Trust Signals Area */}
        <div className="bg-[#f0f9f5] p-4 rounded-xl space-y-3 mt-5 mb-1">
          <div className="flex items-start gap-2.5">
            <div className="bg-[#00694B] rounded-full p-0.5 mt-0.5 shrink-0">
              <Check size={10} className="text-white" strokeWidth={4} />
            </div>
            <p className="text-[#1a1a1a] text-[13px] leading-snug">
              <span className="font-bold">Free cancellation</span> up to 24 hours before the experience starts (local time)
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="bg-[#00694B] rounded-full p-0.5 mt-0.5 shrink-0">
              <Check size={10} className="text-white" strokeWidth={4} />
            </div>
            <p className="text-[#1a1a1a] text-[13px] leading-snug">
              <span className="font-bold">Reserve Now and Pay Later</span> &mdash; Secure your spot while staying flexible
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

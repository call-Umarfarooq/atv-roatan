import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Check, ChevronDown, Users, Flame, Ticket, Minus, Plus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const BookingWidget = ({ tour, className = "" }) => {
  const [date, setDate] = useState(new Date());
  const [showTravelers, setShowTravelers] = useState(false);
  const [travelers, setTravelers] = useState({
      adults: 2,
      children: 0,
      infants: 0
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Price Constants (fallback if tour prop missing temporarily)
  const ADULT_PRICE = tour?.adultPrice || tour?.base_price || 0;
  const CHILD_PRICE = tour?.childPrice || 0;

  useEffect(() => {
      const total = (travelers.adults * ADULT_PRICE) + (travelers.children * CHILD_PRICE);
      setTotalPrice(total);
  }, [travelers, ADULT_PRICE, CHILD_PRICE]);

  const updateTravelers = (type, operation) => {
      setTravelers(prev => {
          const newValue = operation === 'inc' ? prev[type] + 1 : prev[type] - 1;
          if (newValue < 0) return prev;
          if (type === 'adults' && newValue < 1) return prev; // Min 1 adult
          return { ...prev, [type]: newValue };
      });
  };

  const handleBooking = async () => {
      setLoading(true);
      // Simulate API call for now or simple redirect
      try {
        const bookingData = {
            tourId: tour?._id,
            tourSlug: tour?.slug,
            date,
            travelers,
            totalPrice
        };
        console.log('Booking Request:', bookingData);
        
        // In a real app, you would POST to /api/bookings here
        // await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
        
        alert(`Booking request for ${tour?.title} on ${format(date, 'MMM do')} for $${totalPrice} received!`);
      } catch (err) {
          console.error(err);
          alert('Booking failed');
      } finally {
          setLoading(false);
      }
  };

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  return (
    <div className={className}>
      <div className="border border-gray-200 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 bg-white overflow-hidden relative">
        
        {/* Price Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-500">From</span>
            <span className="text-3xl font-bold text-[#1a1a1a]">${ADULT_PRICE}</span>
            <span className="text-sm text-gray-500">per person</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
             <div className="flex items-center gap-1 text-[#00aa6c] bg-[#e6f2ed] px-2 py-0.5 rounded text-xs font-bold">
                <Check size={12} strokeWidth={3} />
                <span>Lowest Price Guarantee</span>
             </div>
          </div>
        </div>

        {/* Date & Travelers Selection Grid */}
        <div className="flex flex-col gap-3 mb-6">
            
            {/* Date Picker */}
            <div className="relative">
                <div className="border border-gray-300 rounded-lg p-3 hover:border-black transition-colors cursor-pointer group bg-white relative">
                    <label className="text-xs text-gray-500 font-bold block mb-1 group-hover:text-gray-800">Date</label>
                    <DatePicker 
                        selected={date} 
                        onChange={(date) => setDate(date)} 
                        dateFormat="EEE, MMM d"
                        className="w-full font-bold text-[#1a1a1a] text-sm outline-none cursor-pointer caret-transparent"
                        wrapperClassName="w-full"
                        minDate={new Date()}
                        onFocus={(e) => e.target.blur()} // Prevent mobile keyboard
                        placeholderText="Select a date"
                    />
                     <ChevronDown className="absolute right-3 top-1/2 translate-y-1 text-gray-400 pointer-events-none group-hover:text-black" size={16} />
                </div>
            </div>

             {/* Travelers Popover Trigger */}
            <div className="relative">
                <div 
                    className="border border-gray-300 rounded-lg p-3 hover:border-black transition-colors cursor-pointer group bg-white"
                    onClick={() => setShowTravelers(!showTravelers)}
                >
                    <label className="text-xs text-gray-500 font-bold block mb-1 group-hover:text-gray-800">Travelers</label>
                    <div className="font-bold text-[#1a1a1a] text-sm flex items-center justify-between">
                        <span className="flex items-center gap-2"><Users size={16} className="text-gray-400" /> {totalTravelers} Travelers</span>
                    </div>
                     <ChevronDown className={`absolute right-3 top-1/2 translate-y-1 text-gray-400 transition-transform ${showTravelers ? 'rotate-180' : ''} pointer-events-none group-hover:text-black`} size={16} />
                </div>

                {/* Travelers Dropdown using absolute positioning to act as popover */}
                {showTravelers && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl rounded-xl p-5 z-20 mt-2">
                        <div className="space-y-6">
                            {/* Adults */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-[#1a1a1a]">Adult</div>
                                    <div className="text-xs text-gray-500">Age {tour?.adultAgeRange || '12-99'}</div>
                                    <div className="text-sm font-semibold mt-1">${ADULT_PRICE}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('adults', 'dec'); }}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${travelers.adults <= 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-black hover:bg-gray-50'}`}
                                        disabled={travelers.adults <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-[#1a1a1a] font-bold w-4 text-center">{travelers.adults}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('adults', 'inc'); }}
                                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                             {/* Children */}
                             <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-[#1a1a1a]">Child</div>
                                    <div className="text-xs text-gray-500">Age {tour?.childAgeRange || '4-11'}</div>
                                    <div className="text-sm font-semibold mt-1">${CHILD_PRICE}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('children', 'dec'); }}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${travelers.children <= 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-black hover:bg-gray-50'}`}
                                        disabled={travelers.children <= 0}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-[#1a1a1a] font-bold w-4 text-center">{travelers.children}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('children', 'inc'); }}
                                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                             {/* Infants */}
                             <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-[#1a1a1a]">Infant</div>
                                    <div className="text-xs text-gray-500">Age {tour?.infantAgeRange || '0-3'}</div>
                                    <div className="text-sm font-semibold mt-1">Free</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('infants', 'dec'); }}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${travelers.infants <= 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:border-black hover:bg-gray-50'}`}
                                        disabled={travelers.infants <= 0}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-[#1a1a1a] font-bold w-4 text-center">{travelers.infants}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateTravelers('infants', 'inc'); }}
                                        className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={() => setShowTravelers(false)}
                                className="w-full bg-[#00aa6c] text-white font-bold py-2 rounded-full hover:bg-[#008f5b] transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Total Price Display */}
        <div className="flex justify-between items-end mb-4 px-1">
             <div className="font-bold text-[#1a1a1a]">Total</div>
             <div className="text-2xl font-bold text-[#1a1a1a]">${totalPrice}</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
            {/* <button 
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-[#fecc2f] hover:bg-[#eebb00] text-[#1a1a1a] font-bold py-3.5 rounded-full transition-colors text-lg shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Reserve Now & Pay Later'}
            </button> */}
            <button 
                onClick={handleBooking}
                 disabled={loading}
                className="w-full bg-[#00aa6c] hover:bg-[#008f5b] text-white font-bold py-3.5 rounded-full transition-colors text-lg shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
        </div>


        <div className="space-y-3 pt-6 mt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5 shrink-0">
              <Check size={12} className="text-[#00aa6c]" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-600"><span className="font-bold text-gray-900 underline decoration-dotted cursor-help">Free cancellation</span> {tour?.booking_options?.policy_text || 'up to 24 hours before the experience starts (local time)'}</p>
          </div>
          <div className="flex items-start gap-3">
             <div className="mt-0.5 bg-[#dff7eb] rounded-full p-0.5 shrink-0">
              <Check size={12} className="text-[#00aa6c]" strokeWidth={3} />
            </div>
            <p className="text-sm text-gray-600"><span className="font-bold text-gray-900 underline decoration-dotted cursor-help">Reserve Now and Pay Later</span> - Secure your spot while staying flexible</p>
          </div>
        </div>
      </div>

       <div className="text-right text-gray-500 text-xs mt-2 flex items-center justify-end gap-1 px-1">
        <Ticket size={12} /> Lowest Price Guarantee
      </div>
    </div>
  );
};

export default BookingWidget;

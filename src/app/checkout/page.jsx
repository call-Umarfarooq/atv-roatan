"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Check, 
  ChevronRight, 
  CreditCard, 
  Calendar, 
  Users, 
  MapPin, 
  Info,
  ShieldCheck,
  User,
  Search,
  Anchor,
  Building,
  ChevronDown
} from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSection from '@/components/PaymentSection';
import PaymentMethodIcons from '@/components/PaymentMethodIcons';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


// --- Components ---

const StepIndicator = ({ step, currentStep, title }) => {
    const isCompleted = currentStep > step;
    const isCurrent = currentStep === step;

    return (
        <div className={`flex items-center gap-3 ${isCurrent ? 'text-black' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                ${isCompleted ? 'bg-[#15531B] text-white' : isCurrent ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}
            `}>
                {isCompleted ? <Check size={16} /> : step}
            </div>
            <span className={`font-bold ${isCurrent ? 'text-black' : 'text-gray-500'}`}>{title}</span>
        </div>
    );
};

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // Form States
  const [contactResult, setContactResult] = useState(null);
  const [activityResult, setActivityResult] = useState(null);
  const [extrasResult, setExtrasResult] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [isFetchingSecret, setIsFetchingSecret] = useState(false);

  useEffect(() => {
    try {
        const data = localStorage.getItem('checkoutData');
        if (data) {
            setBookingData(JSON.parse(data));
        } else {
            router.push('/'); // Redirect if no data
        }
    } catch (e) {
        console.error("Error loading checkout data", e);
    } finally {
        setLoading(false);
    }
  }, []);

  const fetchPaymentIntent = React.useCallback(() => {
    if (!bookingData) return;
    
    setIsFetchingSecret(true);
    setPaymentError(null);

    fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tourId: bookingData.tour._id,
            travelers: bookingData.travelers,
            extraServices: bookingData.selectedExtras
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.clientSecret) {
            setClientSecret(data.clientSecret);
        } else {
            console.error('Failed to get clientSecret', data.error);
            setPaymentError(data.error || 'Failed to initialize payment system');
        }
    })
    .catch(err => {
        console.error('Error fetching secret:', err);
        setPaymentError('Connection error. Please try again.');
    })
    .finally(() => setIsFetchingSecret(false));
  }, [bookingData]);

  // Fetch PaymentIntent when entering Step 3
  useEffect(() => {
    if (step === 3 && bookingData && !clientSecret && !isFetchingSecret && !paymentError) {
       fetchPaymentIntent();
    }
  }, [step, bookingData, clientSecret, isFetchingSecret, paymentError, fetchPaymentIntent]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!bookingData) return null;

  const { tour, date, travelers, totalPrice, adultPrice, childPrice, selectedExtras } = bookingData;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#1a1a1a]">
      
      {/* Header */}
     

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Flow */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Login Banner */}
              {step === 1 && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-full"><User size={20} /></div>
                          <div>
                              <div className="font-bold text-sm">Log in or Sign up</div>
                              <div className="text-xs text-gray-500">Book faster and manage your reservations.</div>
                          </div>
                      </div>
                      <button className="text-[#15531B] font-bold text-sm hover:underline">Log in</button>
                  </div>
              )}

              {/* Step 1: Contact Details */}
              <div className={`bg-white p-6 rounded-xl border transition-all ${step === 1 ? 'border-gray-200 shadow-sm' : 'border-transparent'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > 1 ? 'bg-[#15531B] text-white' : 'bg-black text-white'}`}>
                            {step > 1 ? <Check size={16} /> : '1'}
                        </div>
                        Contact details
                    </h2>
                    {step > 1 && (
                        <button onClick={() => setStep(1)} className="text-[#1a1a1a] text-sm font-bold underline hover:no-underline">Edit</button>
                    )}
                  </div>
                  
                  {step === 1 && (
                    <>
                      <p className="text-sm text-gray-500 ml-11 mb-6">We'll use this information to send you confirmation and updates about your booking.</p>
                      <ContactForm 
                        onNext={(data) => {
                            setContactResult(data);
                            setStep(2);
                            window.scrollTo(0, 0);
                        }} 
                      />
                    </>
                  )}
                  {step > 1 && contactResult && (
                      <div className="ml-11 text-[#1a1a1a]">
                          <div className="font-bold text-base mb-2">{contactResult.firstName} {contactResult.lastName}</div>
                          <div className="text-sm mb-1"><span className="text-gray-600">Email:</span> {contactResult.email}</div>
                          <div className="text-sm"><span className="text-gray-600">Phone:</span> {contactResult.phone}</div>
                      </div>
                  )}
              </div>
                    
                    {/* Extra Services - Always Visible */}
                    {tour.extraServices && tour.extraServices.length > 0 && (
                        <div className="mt-6 border border-dashed border-[#15531B]/40 rounded-xl p-4 bg-[#15531B]/5">
                            <h4 className="font-bold text-sm text-[#15531B] mb-1">🎯 Enhance Your Experience</h4>
                            <p className="text-xs text-gray-500 mb-4">Add optional services to make your tour even more memorable!</p>
                            <div className="space-y-3">
                                {tour.extraServices.map((service, index) => {
                                    const count = (bookingData.selectedExtras || {})[index] || 0;
                                    return (
                                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                                            <div>
                                                <h5 className="font-bold text-xs text-[#1a1a1a]">{service.name}</h5>
                                                <p className="text-xs text-[#15531B] font-semibold">${parseFloat(service.price).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newExtras = {...(bookingData.selectedExtras || {})};
                                                        const curr = newExtras[index] || 0;
                                                        if (curr > 0) { newExtras[index] = curr - 1; if (newExtras[index] === 0) delete newExtras[index]; }
                                                        setBookingData(prev => ({ ...prev, selectedExtras: newExtras }));
                                                        const stored = JSON.parse(localStorage.getItem('checkoutData') || '{}');
                                                        stored.selectedExtras = newExtras;
                                                        localStorage.setItem('checkoutData', JSON.stringify(stored));
                                                    }}
                                                    disabled={count === 0}
                                                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold transition-colors ${count === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#15531B] text-[#15531B] hover:bg-[#15531B] hover:text-white'}`}
                                                >
                                                    −
                                                </button>
                                                <span className="w-5 text-center font-bold text-xs">{count}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newExtras = {...(bookingData.selectedExtras || {})};
                                                        newExtras[index] = (newExtras[index] || 0) + 1;
                                                        setBookingData(prev => ({ ...prev, selectedExtras: newExtras }));
                                                        const stored = JSON.parse(localStorage.getItem('checkoutData') || '{}');
                                                        stored.selectedExtras = newExtras;
                                                        localStorage.setItem('checkoutData', JSON.stringify(stored));
                                                    }}
                                                    className="w-7 h-7 rounded-full border border-[#15531B] text-[#15531B] flex items-center justify-center text-sm font-bold hover:bg-[#15531B] hover:text-white transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

               {/* Step 2: Activity Details */}
               <div className={`bg-white p-6 rounded-xl border transition-all ${step === 2 ? 'border-gray-200 shadow-sm' : 'border-transparent'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > 2 ? 'bg-[#15531B] text-white' : step === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {step > 2 ? <Check size={16} /> : '2'}
                        </div>
                        Activity details
                    </h2>
                     {step > 2 && (
                        <button onClick={() => setStep(2)} className="text-[#1a1a1a] text-sm font-bold underline hover:no-underline">Edit</button>
                    )}
                  </div>

                  {step === 2 && (
                      <ActivityForm 
                        travelers={travelers} 
                        pickupConfig={tour.pickup_configuration}
                        initialPickup={bookingData.initialPickup}
                        onNext={(data) => {
                            setActivityResult(data);
                            setStep(3);
                            window.scrollTo(0, 0);
                        }}
                        onBack={() => setStep(1)}
                      />
                  )}
                  {step > 2 && activityResult && (
                       <div className="ml-11 space-y-6">
                           
                           {/* Tour Snippet */}
                           <div className="flex gap-4">
                                <img src={getImageUrl(tour.image_url)} alt="" className="w-24 h-16 rounded-md object-cover bg-gray-100" />
                                <div>
                                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{tour.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                        <User size={12} /> {travelers.adults + travelers.children + travelers.infants} Adults
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                        <Calendar size={12} /> {formattedDate} • 6:30 AM
                                    </div>
                                    <div className="flex items-start gap-1 text-[11px]">
                                        <Check size={12} className="text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-gray-600"><span className="font-bold underline text-gray-900">Free cancellation</span> + <span className="font-bold underline text-gray-900">Unlimited rescheduling</span> before 6:30 AM on {formattedDate}</span>
                                    </div>
                                </div>
                           </div>
                           
                           <hr className="border-gray-200" />

                           {/* Travelers */}
                           <div>
                               <h4 className="font-bold text-[#1a1a1a] text-base mb-2">Travelers</h4>
                               <p className="text-sm text-gray-600">Lead Traveler: {contactResult.firstName} {contactResult.lastName}</p>
                           </div>

                           <hr className="border-gray-200" />

                           {/* Meeting Point */}
                           <div>
                               <h4 className="font-bold text-[#1a1a1a] text-base mb-2">Meeting point</h4>
                               {activityResult.meetingType === 'pickup' ? (
                                   <div className="space-y-1 text-sm text-gray-600">
                                       <div className="font-bold text-[#1a1a1a]">{activityResult.pickupLocation}</div>
                                       {activityResult.cruiseShip && <div><span className="text-gray-500">Cruise ship:</span> {activityResult.cruiseShip}</div>}
                                       {activityResult.disembarkationTime && <div><span className="text-gray-500">Disembarkation time:</span> {activityResult.disembarkationTime}</div>}
                                       {activityResult.boardingTime && <div><span className="text-gray-500">Boarding time:</span> {activityResult.boardingTime}</div>}
                                       {activityResult.dropOffLocation && <div><span className="text-gray-500">Where would you like to be dropped off?:</span> {activityResult.dropOffLocation}</div>}
                                   </div>
                               ) : (
                                   <p className="text-sm text-gray-600">{activityResult.meetingPoint}</p>
                               )}
                           </div>
                           
                           <hr className="border-gray-200" />
                           
                           {/* Other Details */}
                           <div>
                               <h4 className="font-bold text-[#1a1a1a] text-base mb-2">Other details</h4>
                               <p className="text-sm text-gray-600"><span className="text-gray-500">Tour language:</span> English - Guide</p>
                           </div>

                       </div>
                  )}
               </div>

               {/* Step 3: Payment Details */}
               <div className={`bg-white p-6 rounded-xl border transition-all ${step === 3 ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-60'}`}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                        Payment details
                    </h2>
                  </div>

                  {step === 3 && (
                      <div>
                          {isFetchingSecret && (
                              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#15531B] rounded-full animate-spin mb-3"></div>
                                  <p className="text-sm">Preparing secure checkout...</p>
                              </div>
                          )}

                          {paymentError && (
                              <div className="bg-red-50 border border-red-100 p-4 rounded-lg text-center">
                                  <p className="text-red-600 text-sm font-medium mb-3">{paymentError}</p>
                                  <button 
                                    onClick={fetchPaymentIntent}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md text-sm font-bold hover:bg-red-50 transition-colors"
                                  >
                                      Try Again
                                  </button>
                              </div>
                          )}

                          {!isFetchingSecret && !paymentError && bookingData && clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                                <PaymentSection 
                                    bookingData={bookingData} 
                                    onPaymentComplete={async (result) => {
                                        console.log('Payment Result:', result);
                                        
                                        try {
                                            setLoading(true);
                                            const response = await fetch('/api/bookings', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    tourId: tour._id,
                                                    tourSlug: tour.slug,
                                                    date: date,
                                                    travelers: travelers,
                                                    selectedExtras: bookingData.selectedExtras,
                                                    customer: contactResult,
                                                    paymentIntentId: result.id,
                                                    paymentStatus: result.status === 'paid' ? 'paid' : 'unpaid',
                                                    paymentType: result.type,
                                                    pickupDetails: activityResult
                                                })
                                            });

                                            const data = await response.json();

                                            if (data.success) {
                                                // Clear local storage
                                                localStorage.removeItem('checkoutData');
                                                alert('Booking Confirmed! Redirecting...');
                                                router.push('/'); 
                                            } else {
                                                alert('Booking failed: ' + data.error);
                                                setLoading(false);
                                            }
                                        } catch (err) {
                                            console.error('Booking creation error:', err);
                                            alert('Failed to create booking. Please contact support.');
                                            setLoading(false);
                                        }
                                    }}
                                />
                            </Elements>
                          )}
                      </div>
                  )}
               </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                  
                  {/* Timer (Fake) */}
                  <div className="bg-red-50 text-red-800 text-xs font-bold px-3 py-2 rounded mb-4 flex items-center gap-2 justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Holding your spot for 04:52 minutes
                  </div>

                  {/* Tour Info */}
                  <div className="flex gap-4 mb-4">
                      <img src={getImageUrl(tour.image_url)} alt="" className="w-16 h-16 rounded-md object-cover bg-gray-100" />
                      <div>
                          <h3 className="font-bold text-sm leading-tight text-[#1a1a1a] mb-1 line-clamp-2">{tour.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                             <Users size={12} /> {travelers.adults + travelers.children + travelers.infants} Travelers
                          </div>
                           <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                             <Calendar size={12} /> {formattedDate}
                          </div>
                      </div>
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Price Breakdown - New Layout */}
                   {(() => {
                        // Calculate base price (before any discounts)
                        // Standard Price Logic
                        // We strictly show the adultPrice and childPrice as the base rates.
                        // Savings are calculated if cutoff_price > adultPrice.

                        const displayAdultPrice = adultPrice;
                        
                        // Calculate Base Price (what user actually pays before tax)
                        const basePrice = (travelers.adults * displayAdultPrice) + (travelers.children * childPrice);
                        
                        // Calculate extras total
                        let extrasTotal = 0;
                        if (tour.extraServices) {
                            Object.entries(selectedExtras || {}).forEach(([index, count]) => {
                                if (count > 0) {
                                    const extra = tour.extraServices[index];
                                    if (extra) extrasTotal += count * parseFloat(extra.price);
                                }
                            });
                        }

                        // Tax Rate
                        const taxRate = 0.10;

                        // Full Tour Price (Base + Extras)
                        const fullTourPrice = basePrice + extrasTotal;

                        // Calculate Tax
                        const tax = fullTourPrice * taxRate;
                        
                        // Total Regular Price
                        const totalRegularPrice = fullTourPrice + tax;

                        // Savings Calculation
                        // If cutoff_price exists and is > adultPrice, user is saving money.
                        // Saving per adult = cutoff_price - adultPrice
                        // Total Saving = (cutoff_price - adultPrice) * adults
                        const cutoffPrice = tour.cutoff_price ? parseFloat(tour.cutoff_price) : 0;
                        const hasSavings = cutoffPrice > adultPrice;
                        const totalSavings = hasSavings ? (cutoffPrice - adultPrice) * travelers.adults : 0;

                        // Pay Now Discount (2%)
                        const hasPayNowDiscount = !!bookingData.discountApplied;
                        
                         // Final Amount User Pays
                        // If PayNow applied: (Base + Extras) * 0.98 * 1.10
                        const finalAmountToPay = hasPayNowDiscount 
                            ? (fullTourPrice * 0.98 * 1.10) 
                            : (fullTourPrice * 1.10);

                        const payNowDiscount = hasPayNowDiscount ? (fullTourPrice * 1.10 * 0.02) : 0;
                        
                        return (
                            <div className="space-y-0">
                                <h4 className="font-bold text-sm text-[#1a1a1a] mb-3">Order Summary</h4>

                                {/* Full Tour Price */}
                                <div className="bg-white text-black">
                                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                        <div className="text-sm text-gray-700">
                                            <span className="block font-medium text-[#1a1a1a]">Full Tour Price</span>
                                            <span className="text-xs text-gray-500">(${displayAdultPrice} x {travelers.adults} Adults)</span>
                                        </div>
                                        <span className="font-semibold text-sm text-[#1a1a1a]">${(travelers.adults * displayAdultPrice).toFixed(2)}</span>
                                    </div>
    
                                    {travelers.children > 0 && (
                                        <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                             <div className="text-sm text-gray-700">
                                                <span className="block font-medium text-[#1a1a1a]">Children</span>
                                                <span className="text-xs text-gray-500">(${childPrice} x {travelers.children})</span>
                                            </div>
                                            <span className="font-semibold text-sm text-[#1a1a1a]">${(travelers.children * childPrice).toFixed(2)}</span>
                                        </div>
                                    )}

                                    {travelers.infants > 0 && (
                                        <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                            <span className="text-sm text-gray-700">Infants ({travelers.infants})</span>
                                            <span className="font-semibold text-sm text-[#1a1a1a]">Free</span>
                                        </div>
                                    )}

                                    {tour.extraServices && Object.entries(selectedExtras || {}).map(([index, count]) => {
                                        if (count > 0) {
                                            const extra = tour.extraServices[index];
                                            if (extra) {
                                                return (
                                                    <div key={index} className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                                        <span className="text-sm text-gray-700">{count} x {extra.name}</span>
                                                        <span className="font-semibold text-sm text-[#1a1a1a]">${(count * parseFloat(extra.price)).toFixed(2)}</span>
                                                    </div>
                                                );
                                            }
                                        }
                                        return null;
                                    })}

                                    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                                        <span className="text-sm font-medium text-gray-700">Standard Tax (10%)</span>
                                        <span className="font-semibold text-sm text-[#1a1a1a]">+${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* TOTAL REGULAR PRICE */}
                                    <div className="bg-gray-50 text-[#1a1a1a] px-4 py-3 rounded-t-lg mt-4 border border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm uppercase tracking-wide">Total Price</span>
                                        <span className="font-bold text-base">${totalRegularPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 text-[#1a1a1a] px-4 pb-4 rounded-b-lg space-y-2 border-x border-b border-gray-100">
                                    <div className="pt-2"></div>
                                    
                                    {(hasSavings || Math.abs(payNowDiscount) > 0.01) && (
                                        <>
                                            {hasSavings && (
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="text-sm italic text-[#15531B] font-medium">You Saved</span>
                                                    <span className="font-semibold text-sm text-[#15531B]">-${totalSavings.toFixed(2)}</span>
                                                </div>
                                            )}
                                            
                                            {hasPayNowDiscount && (
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="text-sm italic text-[#15531B] font-medium">Advance Booking (Pay-Now)</span>
                                                    <span className="font-semibold text-sm text-[#15531B]">-${payNowDiscount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="border-t border-gray-200 my-2"></div>
                                        </>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-base uppercase tracking-wide">Your Special Price</span>
                                        <span className="font-black text-2xl">${finalAmountToPay.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                    


                    <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Secure Checkout
                    </p>

              </div>
              
              <div className="mt-6 text-center">
                   <div className="flex items-center justify-center gap-1 text-xs text-[#15531B] font-bold">
                       <p>Book with confidence</p>
                   </div>
                   <PaymentMethodIcons />
                   <div className="flex items-center justify-center gap-1 mt-2">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-[#00b67a] rounded-sm"></div>)}
                       <span className="text-xs font-bold ml-1">Trustpilot</span>
                   </div>
              </div>
          </div>

      </main>

    </div>
  );
}

// --- Sub-Forms ---

function ContactForm({ onNext }) {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate Token (Mock - normally this would come from backend registration/login)
        const token = 'mock_token_' + Math.random().toString(36).substr(2);
        localStorage.setItem('authToken', token);
        console.log('Token set:', token);

        onNext(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input required name="firstName" placeholder="First Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm transition-colors" onChange={handleChange} />
                </div>
                <div>
                    <input required name="lastName" placeholder="Last Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm transition-colors" onChange={handleChange} />
                </div>
            </div>
            <div>
                 <input required type="email" name="email" placeholder="Email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm transition-colors" onChange={handleChange} />
                 <p className="text-xs text-gray-500 mt-1">We'll send booking confirmation emails here</p>
            </div>
             <div>
                <PhoneInput
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(value) => setFormData({...formData, phone: value})}
                    defaultCountry="US"
                    international
                    withCountryCallingCode
                    className="phone-input-container"
                    inputComponent={({ className, ...props }) => (
                         <input 
                            {...props} 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm transition-colors ml-2" 
                            required
                        />
                    )}
                />
            </div>

            <div className="pt-4">
                <button type="submit" className="bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto">Next</button>
            </div>
        </form>
    )
}


function ActivityForm({ travelers, pickupConfig, initialPickup, onNext, onBack }) {
    const [formData, setFormData] = useState({ 
        dateOfArrival: '', 
        cruiseShipName: '', 
        placeOfStay: '', 
        orderNotes: '',
        meetingPoint: '',
        meetingType: 'pickup'
    });

    const [errors, setErrors] = useState({});

    const cruiseShips = [
        'Carnival Vista',
        'Royal Caribbean Allure',
        'Norwegian Pearl',
        'MSC Seaside',
        'Celebrity Edge',
        'Holland America Nieuw Amsterdam',
        'Princess Regal',
        'Disney Fantasy',
        'Costa Luminosa',
        'Other'
    ];

    const placesOfStay = [
        'Mahogany Bay',
        'West Bay Beach',
        'West End',
        'Coxen Hole',
        'French Harbour',
        'Sandy Bay',
        'Parrot Tree',
        'Camp Bay',
        'Other'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!formData.dateOfArrival) newErrors.dateOfArrival = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onNext({ ...formData });
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: false});
        }
    };

    const getInputClass = (fieldName) => {
        return errors[fieldName] 
            ? "w-full p-3 bg-[#feF2F2] border border-red-500 rounded-lg text-sm outline-none focus:border-red-500 placeholder-red-400"
            : "w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B]";
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date of Arrival */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#15531B] font-medium z-10">Date of Arrival *</label>
                <input 
                    type="date"
                    name="dateOfArrival" 
                    className={getInputClass('dateOfArrival')}
                    onChange={handleChange}
                    value={formData.dateOfArrival}
                />
                {errors.dateOfArrival && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
            </div>

            {/* Cruise Ship Name */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#15531B] font-medium z-10">Cruise Ship Name (optional)</label>
                <select 
                    name="cruiseShipName" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] appearance-none cursor-pointer"
                    onChange={handleChange}
                    value={formData.cruiseShipName}
                >
                    <option value="">Choose...</option>
                    {cruiseShips.map((ship, i) => (
                        <option key={i} value={ship}>{ship}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Place of Stay */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#15531B] font-medium z-10">Place of Stay (optional)</label>
                <select 
                    name="placeOfStay" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] appearance-none cursor-pointer"
                    onChange={handleChange}
                    value={formData.placeOfStay}
                >
                    <option value="">Choose...</option>
                    {placesOfStay.map((place, i) => (
                        <option key={i} value={place}>{place}</option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Order Notes */}
            <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400 font-medium z-10">Order Notes (optional)</label>
                <textarea 
                    name="orderNotes" 
                    rows={4}
                    className="w-full p-3 pt-4 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B] resize-y"
                    onChange={handleChange}
                    value={formData.orderNotes}
                />
            </div>

            <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3 px-8 rounded-full transition-colors">Next</button>
            </div>
        </form>
    )
}



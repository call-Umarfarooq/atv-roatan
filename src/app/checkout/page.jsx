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
  Building
} from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSection from '@/components/PaymentSection';
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

  // Form States
  const [contactResult, setContactResult] = useState(null);
  const [activityResult, setActivityResult] = useState(null);

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

                  {step === 3 && bookingData && (
                      <Elements stripe={stripePromise}>
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

                  {/* Price Breakdown */}
                   <div className="space-y-3 mb-6">
                       <h4 className="font-bold text-sm text-[#1a1a1a]">Order Summary</h4>
                       
                       <div className="space-y-2 text-sm text-gray-600">
                           {/* Adults */}
                           {travelers.adults > 0 && (
                               <div className="flex justify-between">
                                   <span>{travelers.adults} Adult{travelers.adults > 1 ? 's' : ''} x ${adultPrice}</span>
                                   <span className="font-medium text-[#1a1a1a]">${(travelers.adults * adultPrice).toFixed(2)}</span>
                               </div>
                           )}

                           {/* Children */}
                           {travelers.children > 0 && (
                               <div className="flex justify-between">
                                   <span>{travelers.children} Child{travelers.children > 1 ? 'ren' : ''} x ${childPrice}</span>
                                   <span className="font-medium text-[#1a1a1a]">${(travelers.children * childPrice).toFixed(2)}</span>
                               </div>
                           )}

                           {/* Infants */}
                           {travelers.infants > 0 && (
                               <div className="flex justify-between">
                                   <span>{travelers.infants} Infant{travelers.infants > 1 ? 's' : ''}</span>
                                   <span className="font-medium text-[#1a1a1a]">Free</span>
                               </div>
                           )}

                           {/* Extra Services */}
                           {tour.extraServices && Object.entries(selectedExtras || {}).map(([index, count]) => {
                               if (count > 0) {
                                   const extra = tour.extraServices[index];
                                   if (extra) {
                                        return (
                                           <div key={index} className="flex justify-between">
                                               <span>{count} x {extra.name}</span>
                                               <span className="font-medium text-[#1a1a1a]">${(count * parseFloat(extra.price)).toFixed(2)}</span>
                                           </div>
                                       );
                                   }
                               }
                               return null;
                           })}
                        </div>
                   </div>

                   <hr className="border-gray-100 my-4" />

                   <div className="space-y-2 mb-2">
                        {/* Subtotal - Only show if there is a discount */}
                        {bookingData.discountApplied && (
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span className="line-through">${bookingData.originalPrice?.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Discount */}
                        {bookingData.discountApplied && (
                            <div className="flex justify-between items-center text-sm text-[#15531B] font-bold">
                                <span>Discount (Pay Now 2%)</span>
                                <span>-${(bookingData.originalPrice - totalPrice).toFixed(2)}</span>
                            </div>
                        )}

                       <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                           <span className="text-gray-900 font-bold text-base">Total Price (USD)</span>
                           <span className="font-black text-2xl text-[#1a1a1a]">${totalPrice.toFixed(2)}</span>
                       </div>
                   </div>
                   
                   <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                       <ShieldCheck size={12} /> Secure Checkout
                   </p>

              </div>
              
              <div className="mt-6 text-center">
                   <div className="flex items-center justify-center gap-1 text-xs text-[#15531B] font-bold">
                       <p>Book with confidence</p>
                   </div>
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
    const [meetingType, setMeetingType] = useState(initialPickup ? 'pickup' : 'later'); // 'pickup', 'direct', 'later'
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const [formData, setFormData] = useState({ 
        meetingPoint: '', 
        pickupLocation: initialPickup ? initialPickup.name : '', 
        cruiseShip: '', 
        disembarkationTime: '', 
        boardingTime: '', 
        dropOffLocation: '' 
    });

    const [errors, setErrors] = useState({});

    // Fetch all available locations for the dropdown
    const [allLocations, setAllLocations] = useState([]);
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('/api/locations');
                const data = await res.json();
                if (data.success) {
                    setAllLocations(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch locations', error);
            }
        };
        fetchLocations();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (meetingType === 'pickup') {
            const newErrors = {};
            if (!formData.pickupLocation) newErrors.pickupLocation = true;
            if (!formData.cruiseShip) newErrors.cruiseShip = true;
            if (!formData.disembarkationTime) newErrors.disembarkationTime = true;
            if (!formData.boardingTime) newErrors.boardingTime = true;
            if (!formData.dropOffLocation) newErrors.dropOffLocation = true;

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        }

        onNext({ ...formData, meetingType });
    }

    const handleMeetingChange = (type) => {
        setMeetingType(type);
        setErrors({}); // Clear errors when switching type
        if (type === 'later') setFormData({ ...formData, meetingPoint: 'Decide later' });
        if (type === 'pickup') setFormData({ ...formData, meetingPoint: 'Pickup requested' });
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: false});
        }
    };

    const getInputClass = (fieldName) => {
        return errors[fieldName] 
            ? "w-full p-2.5 bg-[#feF2F2] border border-red-500 rounded text-sm outline-none focus:border-red-500 placeholder-red-400"
            : "w-full p-2.5 bg-white border border-gray-300 rounded text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B]";
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            


            {/* Pickup */}
            <div>
                <h3 className="font-bold text-sm mb-3">Meeting point</h3>
                <p className="text-xs text-gray-500 mb-2">Tell us where you'd prefer to meet up.</p>
                
                <div className="space-y-3">
                    {pickupConfig?.pickup_offered && (
                        <div className={`bg-white border transition-all rounded-lg overflow-hidden ${meetingType === 'pickup' ? 'border-[#15531B] ring-1 ring-[#15531B]' : 'border-gray-200 hover:border-black'}`}>
                             <div 
                                className="p-3 cursor-pointer flex items-center gap-3"
                                onClick={() => handleMeetingChange('pickup')}
                             >
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${meetingType === 'pickup' ? 'border-[#15531B]' : 'border-gray-300'}`}>
                                     {meetingType === 'pickup' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                                </div>
                                <label className="text-sm font-medium cursor-pointer flex-1 text-[#1a1a1a]">Select a meeting point</label>
                             </div>

                             {meetingType === 'pickup' && (
                                 <div className="px-4 pb-4 space-y-4 animate-fadeIn">
                                     
                                     {/* Location Dropdown */}
                                     <div className="relative">
                                        <div className="relative">
                                            <input 
                                                type="text"
                                                name="pickupLocation"
                                                placeholder="Type to search"
                                                value={formData.pickupLocation}
                                                onChange={(e) => { 
                                                    handleChange(e);
                                                    setIsDropdownOpen(true); 
                                                }}
                                                onFocus={() => setIsDropdownOpen(true)}
                                                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                                className={getInputClass('pickupLocation')}
                                            />
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        </div>
                                        {errors.pickupLocation && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}

                                        {isDropdownOpen && allLocations.length > 0 && (
                                            <div 
                                                onMouseDown={(e) => e.preventDefault()}
                                                className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto z-10"
                                            >
                                                {allLocations.filter(loc => loc.name && loc.name.toLowerCase().includes(formData.pickupLocation.toLowerCase())).map((loc, i) => (
                                                <div 
                                                    key={i} 
                                                    onClick={() => {
                                                        setFormData({...formData, pickupLocation: loc.name});
                                                        setErrors({...errors, pickupLocation: false});
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 border-gray-100"
                                                >
                                                    {loc.type === 'Port' ? <Anchor size={18} className="text-[#15531B] mt-1" /> : <Building size={18} className="text-[#15531B] mt-1" />}
                                                    <div>
                                                    <div className="font-bold text-[#1a1a1a] text-sm">{loc.name}</div>
                                                    <div className="text-xs text-gray-500">{loc.address}</div>
                                                    </div>
                                                </div>
                                                ))}
                                                {allLocations.filter(loc => loc.name && loc.name.toLowerCase().includes(formData.pickupLocation.toLowerCase())).length === 0 && (
                                                    <div className="p-4 text-center text-gray-500 text-sm">No locations found</div>
                                                )}
                                            </div>
                                        )}
                                     </div>

                                     <div>
                                         <input 
                                            name="cruiseShip" 
                                            placeholder="Cruise ship" 
                                            className={getInputClass('cruiseShip')}
                                            onChange={handleChange}
                                            value={formData.cruiseShip}
                                         />
                                         {errors.cruiseShip && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
                                     </div>

                                     <div>
                                         <input 
                                            name="disembarkationTime" 
                                            placeholder="Disembarkation time" 
                                            className={getInputClass('disembarkationTime')}
                                            onChange={handleChange}
                                            value={formData.disembarkationTime}
                                         />
                                         {errors.disembarkationTime && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
                                     </div>

                                      <div>
                                         <input 
                                            name="boardingTime" 
                                            placeholder="Boarding time" 
                                            className={getInputClass('boardingTime')}
                                            onChange={handleChange}
                                            value={formData.boardingTime}
                                         />
                                         {errors.boardingTime && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
                                     </div>

                                      <div>
                                         <input 
                                            name="dropOffLocation" 
                                            placeholder="Where would you like to be dropped off?" 
                                            className={getInputClass('dropOffLocation')}
                                            onChange={handleChange}
                                            value={formData.dropOffLocation}
                                         />
                                         {errors.dropOffLocation && <p className="text-[10px] text-red-500 mt-1 font-medium">Required</p>}
                                     </div>
                                 </div>
                             )}
                        </div>
                    )}
                    
                     <div 
                        className={`bg-white border p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${meetingType === 'later' ? 'border-[#15531B] ring-1 ring-[#15531B]' : 'border-gray-200 hover:border-black'}`}
                        onClick={() => handleMeetingChange('later')}
                     >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${meetingType === 'later' ? 'border-[#15531B]' : 'border-gray-300'}`}>
                                {meetingType === 'later' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                            </div>
                            <label className="text-sm font-medium cursor-pointer flex-1 text-[#1a1a1a]">I'll decide later</label>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3 px-8 rounded-full transition-colors">Next</button>
            </div>
        </form>
    )
}



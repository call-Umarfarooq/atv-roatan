"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Check, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSection from '@/components/PaymentSection';
import PaymentMethodIcons from '@/components/PaymentMethodIcons';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export default function PlanCheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactResult, setContactResult] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [isFetchingSecret, setIsFetchingSecret] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('planCheckoutData');
      if (raw) {
        setPlanData(JSON.parse(raw));
      } else {
        router.push('/plan');
      }
    } catch (e) {
      router.push('/plan');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaymentIntent = useCallback(() => {
    if (!planData) return;
    setIsFetchingSecret(true);
    setPaymentError(null);
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalAmount: planData.totalPrice, paymentType: 'pay_now' }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setPaymentError(data.error || 'Failed to initialize payment');
      })
      .catch(() => setPaymentError('Connection error. Please try again.'))
      .finally(() => setIsFetchingSecret(false));
  }, [planData]);

  useEffect(() => {
    if (step === 2 && planData && !clientSecret && !isFetchingSecret && !paymentError) {
      fetchPaymentIntent();
    }
  }, [step, planData, clientSecret, isFetchingSecret, paymentError, fetchPaymentIntent]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#00694B] rounded-full animate-spin"></div></div>;
  if (!planData) return null;

  const { totalDays, travelers, subtotal, discountAmount, discountPercent, totalPrice, days } = planData;
  const activeDayCount = days.filter(d => d.activities.length > 0).length;
  const totalActivities = days.reduce((s, d) => s + d.activities.length, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Steps ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Step 1: Contact */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${step > 1 ? 'bg-[#00694B] text-white' : 'bg-black text-white'}`}>
                  {step > 1 ? <Check size={16} /> : '1'}
                </div>
                Your Details
              </h2>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-sm font-bold underline hover:no-underline">Edit</button>
              )}
            </div>

            {step === 1 && (
              <PlanContactForm
                onNext={(data) => {
                  setContactResult(data);
                  setStep(2);
                  window.scrollTo(0, 0);
                }}
              />
            )}
            {step > 1 && contactResult && (
              <div className="ml-11 text-sm text-gray-700">
                <p className="font-bold">{contactResult.firstName} {contactResult.lastName}</p>
                <p>{contactResult.email}</p>
                <p>{contactResult.phone}</p>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">2</div>
                  Payment
                </h2>
              </div>
              <div className="p-6">
                {isFetchingSecret && (
                  <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#00694B] rounded-full animate-spin mb-3"></div>
                    <p className="text-sm">Preparing secure checkout...</p>
                  </div>
                )}
                {paymentError && (
                  <div className="bg-red-50 border border-red-100 p-4 rounded-lg text-center">
                    <p className="text-red-600 text-sm mb-3">{paymentError}</p>
                    <button onClick={fetchPaymentIntent} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md text-sm font-bold hover:bg-red-50">Try Again</button>
                  </div>
                )}
                {!isFetchingSecret && !paymentError && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                    <PaymentSection
                      bookingData={{ totalPrice }}
                      onPaymentComplete={async (result) => {
                        try {
                          setLoading(true);
                          const res = await fetch('/api/plan-bookings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              customer: contactResult,
                              arrivalDate: planData.arrivalDate,
                              departureDate: planData.departureDate,
                              totalDays,
                              travelers,
                              days: planData.days,
                              subtotal,
                              discountPercent: discountPercent || 0,
                              discountAmount: discountAmount || 0,
                              totalPrice,
                              paymentStatus: result.status === 'succeeded' ? 'paid' : 'authorized',
                              paymentGateway: result.gateway,
                              externalPaymentId: result.id,
                            }),
                          });
                          const data = await res.json();
                          if (data.success) {
                            localStorage.removeItem('planCheckoutData');
                            router.push(`/booking-confirmation?plan=1&id=${data.data._id}`);
                          } else {
                            alert('Booking failed: ' + data.error);
                            setLoading(false);
                          }
                        } catch (err) {
                          alert('Failed to create booking. Please contact support.');
                          setLoading(false);
                        }
                      }}
                    />
                  </Elements>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Plan Summary Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
            {/* Holding badge */}
            <div className="bg-green-50 text-green-800 text-xs font-bold px-3 py-2 rounded mb-4 flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Adventure Plan Reserved
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h3 className="font-bold text-sm text-[#1a1a1a] mb-1">🌴 Custom Roatan Adventure</h3>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-1"><Calendar size={11} /> {formatDate(planData.arrivalDate)} – {formatDate(planData.departureDate)}</div>
                <div className="flex items-center gap-1"><Users size={11} /> {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}{travelers.children > 0 ? `, ${travelers.children} Child` : ''}</div>
                <div className="flex items-center gap-1"><ChevronRight size={11} /> {activeDayCount} active day{activeDayCount !== 1 ? 's' : ''}, {totalActivities} activit{totalActivities !== 1 ? 'ies' : 'y'}</div>
              </div>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* Price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#00694B] font-bold">
                  <span>7-Day Discount ({discountPercent}%)</span>
                  <span>−${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between text-base font-black text-[#1a1a1a]">
                <span>Total</span><span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Secure Checkout
            </p>
          </div>
          <div className="mt-4 text-center">
            <PaymentMethodIcons />
          </div>
        </div>

      </main>
    </div>
  );
}

function PlanContactForm({ onNext }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', specialRequirements: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Attempt to register — if already exists, that's fine; we just need the details
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone }),
      });
      const data = await res.json();
      if (data.token) localStorage.setItem('authToken', data.token);
      // Proceed regardless (user might already exist)
      onNext(formData);
    } catch {
      // Non-blocking — still proceed
      onNext(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <input required name="firstName" placeholder="First Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400" onChange={handleChange} />
        <input required name="lastName" placeholder="Last Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400" onChange={handleChange} />
      </div>
      <input required type="email" name="email" placeholder="Email Address" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400" onChange={handleChange} />
      <p className="text-xs text-gray-500 -mt-2">We'll send your itinerary confirmation here</p>
      <PhoneInput
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        defaultCountry="US"
        international
        withCountryCallingCode
        className="phone-input-container"
        inputComponent={({ className, ...props }) => (
          <input {...props} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm text-gray-900 ml-2" required />
        )}
      />
      <textarea
        name="specialRequirements"
        placeholder="Special Requirements (optional) — dietary, accessibility needs, etc."
        rows={3}
        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400 resize-none"
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#00694B] hover:bg-[#005a3c] text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Lock size={14} /> Continue to Payment</>}
      </button>
    </form>
  );
}

"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Lock, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrl';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, giftCard, formData, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            payment_method_data: {
                billing_details: {
                    name: formData.buyer_name,
                    email: formData.buyer_email
                }
            }
        },
        redirect: "if_required",
    });

    if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        try {
            const res = await fetch('/api/gift-cards/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    giftCardId: giftCard._id,
                    paymentIntentId: paymentIntent.id,
                    ...formData
                })
            });
            const data = await res.json();
            if (data.success) {
                onSuccess(data.data.code);
            } else {
                setError(data.error || 'Failed to generate code.');
                setLoading(false);
            }
        } catch (err) {
            setError('Server error.');
            setLoading(false);
        }
    } else {
        setError('Payment not successful.');
        setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
          <PaymentElement />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button 
             type="submit" 
             disabled={!stripe || loading}
             className="w-full bg-[#00694B] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#005a3c]"
          >
             {loading ? 'Processing...' : `Pay $${giftCard.price}`}
          </button>
      </form>
  )
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [giftCard, setGiftCard] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ buyer_name: '', buyer_email: '', recipient_name: '', recipient_email: '', message: '' });
  const [step, setStep] = useState(1);
  const [purchasedCode, setPurchasedCode] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/gift-cards/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setGiftCard(d.data);
        setLoading(false);
      });
  }, [id]);

  const handleNext = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const res = await fetch('/api/gift-cards/create-intent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ giftCardId: giftCard._id })
          });
          const data = await res.json();
          if (data.clientSecret) {
              setClientSecret(data.clientSecret);
              setStep(2);
          } else {
              alert(data.error || 'Failed to initialize payment');
          }
      } catch (err) {
          alert('Server error');
      } finally {
          setLoading(false);
      }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  if (loading && !giftCard) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">Loading...</div>;
  if (!giftCard) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">Gift card not found</div>;

  if (purchasedCode) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck size={32} />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Purchase Successful!</h1>
                  <p className="text-gray-500 mb-6">Thank you, {formData.buyer_name}. Your gift card details are below and have been sent to your email.</p>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Gift Card Code</p>
                      <p className="text-3xl font-black tracking-wider text-[#00694B]">{purchasedCode}</p>
                      <p className="text-sm font-medium mt-4">Value: ${giftCard.value}</p>
                  </div>
                  
                  <button onClick={() => window.location.href = '/'} className="font-bold text-[#00694B] hover:underline">Return to Home</button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Form / Payment */}
            <div>
               {step === 1 ? (
                   <form onSubmit={handleNext} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                       <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Your Information</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input required placeholder="Your Name" name="buyer_name" value={formData.buyer_name} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-[#00694B] placeholder-gray-400" />
                           <input required type="email" placeholder="Your Email" name="buyer_email" value={formData.buyer_email} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-[#00694B] placeholder-gray-400" />
                       </div>
                       
                       <h2 className="text-xl font-bold text-[#1a1a1a] pt-4">Recipient Information (Optional)</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input placeholder="Recipient Name" name="recipient_name" value={formData.recipient_name} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-[#00694B] placeholder-gray-400" />
                           <input type="email" placeholder="Recipient Email" name="recipient_email" value={formData.recipient_email} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-[#00694B] placeholder-gray-400" />
                       </div>
                       <textarea placeholder="Personal Message" name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-[#00694B] placeholder-gray-400" />
                       
                       <button type="submit" disabled={loading} className="w-full bg-[#00694B] text-white font-bold py-3 rounded-full mt-4">
                           {loading ? 'Loading...' : 'Continue to Payment'}
                       </button>
                   </form>
               ) : (
                   <div>
                       <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Secure Checkout</h2>
                       {clientSecret && (
                           <Elements stripe={stripePromise} options={{ clientSecret }}>
                               <CheckoutForm clientSecret={clientSecret} giftCard={giftCard} formData={formData} onSuccess={setPurchasedCode} />
                           </Elements>
                       )}
                   </div>
               )}
            </div>

            {/* Right Column: Summary */}
            <div>
               <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
                   <h3 className="font-bold text-lg text-[#1a1a1a] mb-4">Order Summary</h3>
                   <div className="flex gap-4 mb-6">
                       <img src={getImageUrl(giftCard.image)} alt="Gift Card" className="w-24 h-16 rounded object-cover" />
                       <div>
                           <p className="font-bold text-[#1a1a1a]">{giftCard.title}</p>
                           <p className="text-sm text-[#00694B] font-bold">Value: ${giftCard.value}</p>
                       </div>
                   </div>
                   <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl">
                       <span className="text-[#1a1a1a]">Total</span>
                       <span className="text-[#00694B]">${giftCard.price.toFixed(2)}</span>
                   </div>
               </div>
            </div>

        </div>
    </div>
  );
}

export default function GiftCardCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}


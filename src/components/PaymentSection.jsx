"use client";
import React, { useState } from 'react';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function PaymentSection({ bookingData, onPaymentComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentType, setPaymentType] = useState(bookingData?.paymentOption || 'pay_now'); // Respect selected option
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardHolderName, setCardHolderName] = useState('');
  const [clientSecret, setClientSecret] = useState(null);

  // Fetch PaymentIntent when component loads (or when needed)
  React.useEffect(() => {
    // Only create PaymentIntent for 'pay_now' or immediate charge scenarios
    if (bookingData && paymentType === 'pay_now') {
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
            }
        });
    }
  }, [bookingData, paymentType]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Handle Reserve Now (No Payment needed immediately, or just auth)
    if (paymentType === 'reserve_later') {
         // Just proceed to create booking as 'pending' or 'pay_later'
         onPaymentComplete({ 
            method: 'reserve_now', 
            status: 'unpaid',
            type: 'reserve_now'
         });
         return;
    }

    if (paymentMethod === 'paypal') {
        // Mock PayPal
        setTimeout(() => {
            onPaymentComplete({ method: 'paypal', status: 'completed' });
        }, 1500);
        return;
    }

    if (!stripe || !elements || !clientSecret) {
      if(!clientSecret) setErrorMessage("Payment initialization failed. Please refresh.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    // Confirm Payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardHolderName,
          email: bookingData.customer?.email, // Ensure these exist in bookingData
        },
      },
    });

    if (error) {
      console.log('[error]', error);
      setErrorMessage(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment Succeeded:', paymentIntent);
      onPaymentComplete({ 
          method: 'card', 
          id: paymentIntent.id, 
          status: 'paid',
          type: paymentType 
      });
      // Don't set loading false here, wait for parent to redirect
    } else {
       setLoading(false);
       setErrorMessage(`Payment status: ${paymentIntent.status}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Selected Payment Option (Read Only) */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-sm mb-2 text-gray-500 uppercase tracking-wider">Payment Option</h3>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {paymentType === 'pay_now' ? (
                    <>
                        <div className="w-5 h-5 rounded-full bg-[#15531B] flex items-center justify-center">
                            <CreditCard size={12} className="text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-[#1a1a1a] block">Pay Now</span>
                            <span className="text-xs text-[#15531B] font-bold">2% Discount Applied</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center">
                            <Calendar size={12} className="text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-[#1a1a1a] block">Reserve Now & Pay Later</span>
                            <span className="text-xs text-gray-500">Pay on arrival</span>
                        </div>
                    </>
                )}
            </div>
            <div className="font-bold text-[#1a1a1a] text-lg">${bookingData.totalPrice.toFixed(2)}</div>
        </div>
      </div>

      {/* Pay with */}
      {paymentType === 'pay_now' && (
      <div>
        <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Pay with</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <Lock size={12} /> Secure
            </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            
            {/* Credit Card Option */}
            <div className="border-b border-gray-200">
                <div 
                    className="p-4 flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => setPaymentMethod('card')}
                >
                    <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#15531B]' : 'border-gray-300 bg-white'}`}>
                             {paymentMethod === 'card' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                        </div>
                        <span className="font-bold text-[#1a1a1a]">Credit or Debit Card</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {paymentMethod === 'card' && (
                    <div className="p-4 bg-white space-y-4 animate-fadeIn">
                        {/* Card Number */}
                        <div className="border border-gray-300 rounded-md px-3 py-2">
                             <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                        
                        {/* Expiry & CVC */}
                        <div className="flex gap-4">
                            <div className="flex-1 border border-gray-300 rounded-md px-3 py-2">
                                <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                            </div>
                            <div className="flex-1 border border-gray-300 rounded-md px-3 py-2">
                                <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                            </div>
                        </div>

                        {/* Name on Card */}
                        <div>
                             <input 
                                type="text" 
                                placeholder="Name on Card" 
                                className="w-full p-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-[#15531B] focus:ring-1 focus:ring-[#15531B]"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                required
                             />
                        </div>
                    </div>
                )}
            </div>

            {/* PayPal Option */}
            <div>
                 <div 
                    className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setPaymentMethod('paypal')}
                >
                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-[#15531B]' : 'border-gray-300 bg-white'}`}>
                             {paymentMethod === 'paypal' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                    </div>
                    <span className="font-bold text-[#1a1a1a]">PayPal</span>
                </div>
                 {paymentMethod === 'paypal' && (
                    <div className="p-4 bg-white text-sm text-gray-500 animate-fadeIn">
                        You will be redirected to PayPal to complete your purchase securely.
                    </div>
                )}
            </div>
        </div>
      </div>
      )}
      
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {errorMessage}
        </div>
      )}

      <div className="text-xs text-center text-gray-500 mt-4">
        By clicking 'Book Now', you agree to our Terms of Use and Privacy Policy.
      </div>

      <button 
        type="submit" 
        disabled={loading || (paymentType === 'pay_now' && !stripe)}
        className={`w-full bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
            <>
                <Lock size={16} /> {paymentType === 'pay_now' ? 'Pay & Book' : 'Reserve Now'}
            </>
        )}
      </button>

    </form>
  );
}

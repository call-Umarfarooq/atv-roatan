"use client";
import React, { useState } from 'react';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// --- Payment Icons ---
const VisaIcon = () => (
    <svg viewBox="0 0 32 20" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#1434CB"/>
        <path d="M12.7 15h-1.8l-1.1-6.7h2.8l1.1 6.7zM20.9 9.1c-0.6-0.3-1.6-0.6-2.8-0.6-3 0-5.1 1.6-5.1 3.9 0 1.7 1.6 2.6 2.8 3.2 1.2 0.6 1.7 1 1.7 1.5 0 0.8-1 1.2-1.9 1.2-1.3 0-2.2-0.2-3.1-0.6l-0.5-0.2 -0.4 2.6c0.8 0.4 2.2 0.7 3.7 0.7 3.5 0 5.8-1.7 5.8-4.3 0-1.4-0.8-2.5-2.6-3.3 -1.1-0.5-1.7-0.9-1.7-1.4 0-0.5 0.5-1 1.8-1 1.1 0 1.9 0.2 2.5 0.5l0.3 0.1 0.5-2.3zM27 15h1.7l-1.6-7.9h-2.1c-0.5 0-0.9 0.3-1.1 0.7l-3.9 9.3h2.6c0.1 0 0.2 0 0.3-0.2l0.6-1.5h3.2l0.3 1.5c0 0.1 0.2 0.2 0.3 0.2h-0.3zM23.9 12.3l1.1-3 0.6 3h-1.7zM8.3 9.1h-2l-0.1-0.5c-0.2-0.8-0.9-1.5-1.7-1.5H0.9l-0.1 0.4 5.4 1.3c0.3 0 0.5 0.3 0.6 0.7l2.8 10.3h2.9L8.3 9.1z" fill="#fff"/>
    </svg>
);

const MastercardIcon = () => (
    <svg viewBox="0 0 32 20" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#fff"/>
        <circle cx="11" cy="10" r="6" fill="#EB001B"/>
        <circle cx="21" cy="10" r="6" fill="#F79E1B" fillOpacity="0.9"/>
    </svg>
);

const AmexIcon = () => (
    <svg viewBox="0 0 32 20" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#006FCF"/>
        <path d="M19.1 14.5h-1.4l-0.7-1.7h-2.6l-0.7 1.7H12L15 7.8h1.4L19.1 14.5zM16.4 11.6l-0.9-2.3 -0.9 2.3h1.7zM29.8 7.8h-1.6l-1 2.5 -1-2.5h-1.5l1.9 4.3 -2 4.6h1.6l1.1-2.7 1 2.7h1.5l-1.9-4.8 2-4.1zM11.9 12.9v1.5h2.3v1.3H9.5V7.8h4.2v1.3h-2.7v1.1h2.3v1.3h-1.4v0.1zM4.9 11.6c0 1.3-1 1.7-2.2 1.7H0.5V7.8h2.4c1.1 0 1.9 0.5 1.9 1.6 0 0.8-0.5 1.2-1.1 1.4 0.6 0.2 1.1 0.5 1.1 1.5v0.6H3.4c0-0.4 0-0.6 0-0.8 0-0.5-0.4-0.7-0.9-0.7H1.9v2.5H3.5c0.6 0 1-0.3 1-0.8zM1.8 10.9c0 0.6 0.4 0.8 0.9 0.8h0.7V9H2.8c-0.5 0-0.9 0.3-0.9 0.8v1.1z" fill="#fff"/>
    </svg>
);

const DiscoverIcon = () => (
    <svg viewBox="0 0 32 20" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#fff" stroke="#E5E7EB"/>
        <path d="M2.5 14h1.7c0.8 0 1.5-0.2 2-0.5 0.6-0.3 1-0.8 1.3-1.4 0.3-0.6 0.4-1.3 0.4-2.1 0-0.7-0.1-1.4-0.4-2 -0.3-0.6-0.7-1-1.2-1.3C5.7 6.3 5 6.2 4.3 6.2H2.5V14zM3.8 7.3h0.6c0.7 0 1.1 0.2 1.4 0.6 0.4 0.4 0.5 1.1 0.5 2.1 0 1.1-0.2 1.8-0.5 2.2 -0.3 0.5-0.8 0.7-1.4 0.7H3.8V7.3zM9.1 14h1.3V6.2H9.1V14zM12.9 14.1c0.6 0 1.1-0.1 1.5-0.4 0.4-0.2 0.7-0.6 0.9-1 0.2-0.4 0.3-1 0.3-1.6h-1.3c0 0.4-0.1 0.8-0.2 1 -0.2 0.3-0.5 0.4-0.9 0.4 -0.5 0-0.9-0.2-1.1-0.6 -0.3-0.4-0.4-1-0.4-1.8 0-0.8 0.1-1.4 0.4-1.8 0.3-0.4 0.7-0.6 1.2-0.6 0.4 0 0.7 0.1 0.9 0.3 0.2 0.2 0.3 0.6 0.3 1h1.2c0-0.7-0.2-1.2-0.4-1.6 -0.2-0.4-0.6-0.8-1-1 -0.4-0.2-0.9-0.3-1.5-0.3 -0.7 0-1.4 0.2-1.9 0.5 -0.5 0.3-0.9 0.8-1.1 1.4 -0.3 0.6-0.4 1.3-0.4 2.1 0 0.8 0.1 1.5 0.4 2.1 0.3 0.6 0.6 1.1 1.2 1.4C11.5 13.9 12.1 14.1 12.9 14.1z" fill="#4D4F53"/>
        <path d="M22.9 6.2h-1.3l-1.9 4.9 -1.9-4.9h-1.4l2.6 6.3 -1.3 2.9h1.4L22.9 6.2z" fill="#4D4F53"/>
        <path d="M25 6.2h-3.6v7.8h3.6v-1.1h-2.3v-2.1h2.2V9.7h-2.2V7.4h2.3V6.2z" fill="#4D4F53"/>
        <path d="M29.5 6.2h-2v7.8h1.3v-2.9h0.7c0.8 0 1.3-0.3 1.6-0.7 0.3-0.4 0.4-0.8 0.4-1.3 0-0.5-0.1-0.9-0.3-1.2 -0.2-0.3-0.5-0.6-0.8-0.7 0.5-0.2 0.8-0.4 1-0.7 0.2-0.3 0.3-0.7 0.3-1.1 0-0.6-0.2-1-0.5-1.3C30.8 6.4 30.2 6.2 29.5 6.2zM28.8 8.9h-0.3V7.3h0.4c0.1 0 0.2 0 0.3 0.1 0.1 0.1 0.1 0.2 0.1 0.4 0 0.2 0 0.3-0.2 0.3C29 8.9 28.9 8.9 28.8 8.9zM28.8 10v1.7h-0.3v-1.9h0.5c0.2 0 0.3 0 0.4 0.1 0.1 0.1 0.2 0.2 0.2 0.4 0 0.2-0.1 0.4-0.2 0.4C29.2 10.8 29.1 10.8 28.8 10z" fill="#4D4F53"/>
        <circle cx="18.5" cy="10" r="2.5" fill="#FF6000"/>
    </svg>
);

const JCBIcon = () => (
    <svg viewBox="0 0 32 20" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#fff" stroke="#E5E7EB"/>
         <path d="M6.3 5h4.6c0.5 0 0.9 0.4 0.9 0.9v8.2c0 0.5-0.4 0.9-0.9 0.9H6.3c-0.5 0-0.9-0.4-0.9-0.9V5.9C5.4 5.4 5.8 5 6.3 5z" fill="#007940"/>
         <path d="M13.7 5h4.6c0.5 0 0.9 0.4 0.9 0.9v8.2c0 0.5-0.4 0.9-0.9 0.9h-4.6c-0.5 0-0.9-0.4-0.9-0.9V5.9C12.8 5.4 13.2 5 13.7 5z" fill="#CB0D28"/>
         <path d="M21.1 5h4.6c0.5 0 0.9 0.4 0.9 0.9v8.2c0 0.5-0.4 0.9-0.9 0.9h-4.6c-0.5 0-0.9-0.4-0.9-0.9V5.9C20.2 5.4 20.7 5 21.1 5z" fill="#1F419B"/>
         <path d="M10.2 7.7L10.2 7.7c0.2-0.3 0.1-0.7-0.2-0.9 -0.1-0.1-0.4-0.1-0.5 0 -0.5 0.2-1.1 0.3-1.6 0.3 -0.8 0-1.2-0.4-1.2-1.3V5.5H8.6C8.8 5.5 9 5.3 9 5.2V4.8C9 4.6 8.8 4.5 8.6 4.5H5.8c-0.2 0-0.4 0-0.6 0.1 -0.5 0.2-0.6 0.7-0.6 1.4v0.2c0 1.5 0.8 2.3 2.5 2.3C8.1 8.5 9.2 8.2 10.2 7.7z" fill="#fff"/>
         <path d="M17.4 8.2c0.7 0 1.2-0.4 1.2-1.1V6.9c0-0.6-0.4-1.1-1.1-1.1 -0.7 0-1.2 0.3-1.4 0.8 -0.1 0.2-0.3 0.2-0.4 0.1l-0.3-0.2c-0.2-0.1-0.2-0.3-0.1-0.5 0.4-0.8 1.1-1.2 2.3-1.2 1 0 1.8 0.7 1.8 1.8v1.6c0 1.1-0.8 1.9-1.9 1.9 -1.2 0-2-0.7-2.1-1.7v0h0.5C16.1 8.3 16.5 8.2 17.4 8.2z" fill="#fff"/>
         <path d="M23.3 4.5h2c0.9 0 1.4 0.2 1.8 0.6 0.3 0.3 0.4 0.7 0.4 1.1 0 0.5-0.2 0.8-0.5 1.1 0.6 0.2 0.8 0.6 0.8 1.1 0 0.5-0.2 1-0.6 1.3 -0.4 0.3-1.1 0.5-2 0.5h-1.9L23.3 4.5zM24 7.2h1.1c0.7 0 1-0.3 1-0.9 0-0.5-0.3-0.7-0.9-0.7H24V7.2zM24 9.6h1.2c0.7 0 1.1-0.3 1.1-0.9 0-0.6-0.3-0.9-1.1-0.9H24V9.6z" fill="#fff"/>
    </svg>
);

const UnionPayIcon = () => (
     <svg viewBox="0 0 32 20" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="20" rx="2" fill="#fff" stroke="#E5E7EB"/>
         <path d="M19 5.8l2.1 4.6 2.1-4.6h2.2l-3.3 7 0.4 1.3h-2.3l-0.3-1.1 -0.9 1.1h-2.9l4.3-5.1 -3.7-3.1L19 5.8z" fill="#005D6D"/>
         <path d="M13.2 5.8h2.3l-3.6 8.3h-2.3L13.2 5.8z" fill="#D31022"/>
         <path d="M5.3 5.8h5.3c0.4 0 0.8 0 1.1 0.1l1.5-3.3H2.8L5.3 5.8z" fill="#D31022"/>
         <path d="M25.7 5.8h-2.3l-1.5-3.3h3.8L25.7 5.8z" fill="#005B6C"/>
         <path d="M5.3 5.8l-2.5 5.8h9.2l1.3-3.1c-0.8-0.2-1.8-0.2-2.7-0.2L5.3 5.8z" fill="#007963"/>
         <path d="M19.7 2.6H17l-1.5 3.3 1.5 3.3 2.7-5.9V2.6z" fill="#EB9A11"/>
     </svg>
);

const PaypalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.067 8.52c-.754 3.51-4.084 5.38-8.156 5.38h-2.404a.656.656 0 0 0-.645.548l-1.922 12.06a.379.379 0 0 1-.374.318H3.344a.434.434 0 0 1-.428-.517l3.654-23.08a.782.782 0 0 1 .772-.658h5.368c4.276 0 7.844 2.052 7.357 5.95z" fill="#003087"/>
    <path d="M16.945 9.176c-.63 2.96-3.411 4.54-6.81 4.54h-2.404a.656.656 0 0 0-.645.548l-1.74 10.96a.382.382 0 0 1-.377.308H3.356l.169-1.064c.05-.27.28-.47.556-.47h3.193a.936.936 0 0 1 .924.786l.228-1.428a.936.936 0 0 1 .924-.787h1.405c3.803 0 6.942-1.77 7.535-5.495.275-1.72-.125-3.15-1.345-4.22.428.18.845.39 1.245.626.69.41 1.28.92 1.76 1.54.48.61.83 1.3.97 2.08" fill="#003087"/>
    <path d="M16.945 9.176c-.63 2.96-3.411 4.54-6.81 4.54h-2.404a.656.656 0 0 0-.645.548l-.517 3.253 1.222-7.668a.656.656 0 0 1 .645-.548h2.09c3.088 0 5.629-1.378 6.42-4.346.064-.24.114-.49.15-.74.135.25.215.54.25.84l-.4 1.86" fill="#009cde"/>
    <path d="M8.225 10.95h2.09c.65 0 1.258-.06 1.815-.17a6.236 6.236 0 0 0 2.375-1.07c.883-.715 1.48-1.755 1.574-3.076.06-.82-.12-1.57-.48-2.22-.03-.06-.07-.11-.1-.17l-.15-.24a6.27 6.27 0 0 0-.6-2.583C14.28 1.155 13.568.835 12.75.835H7.38c-.375 0-.7.27-.76.64l-3.23 20.35a.434.434 0 0 0 .427.502h3.223a.379.379 0 0 0 .375-.31l1.737-10.93a.653.653 0 0 1 .644-.54" fill="#012169"/>
  </svg>
);

export default function PaymentSection({ bookingData, onPaymentComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentType, setPaymentType] = useState(bookingData?.paymentOption || 'pay_now'); // Respect selected option
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

    if (!stripe || !elements) {
      setErrorMessage("Payment initialization failed. Please refresh.");
      setLoading(false);
      return;
    }

    // Confirm Payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation`, // This is usually required for PaymentElement
        payment_method_data: {
             billing_details: {
                name: bookingData.customer?.firstName + ' ' + bookingData.customer?.lastName,
                email: bookingData.customer?.email,
             }
        }
      },
      redirect: "if_required", // Handle redirect manually if needed, or stick to 'always'
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
            <div className={`border-b border-gray-200 transition-colors ${paymentMethod === 'card' ? 'bg-gray-50' : 'bg-white'}`}>
                <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setPaymentMethod('card')}
                >
                    <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#15531B]' : 'border-gray-300 bg-white'}`}>
                             {paymentMethod === 'card' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                        </div>
                        <span className="font-bold text-[#1a1a1a]">Credit or Debit Card</span>
                    </div>
                    <div className="flex gap-2">
                        <VisaIcon />
                        <MastercardIcon />
                        <AmexIcon />
                        <DiscoverIcon />
                        <JCBIcon />
                        <UnionPayIcon />
                    </div>
                </div>

                {paymentMethod === 'card' && (
                    <div className="p-4 bg-white space-y-4 animate-fadeIn border-t border-gray-100">
                        {/* Stripe Payment Element */}
                        <PaymentElement />
                    </div>
                )}
            </div>

            {/* PayPal Option */}
            <div className={`transition-colors ${paymentMethod === 'paypal' ? 'bg-gray-50' : 'bg-white'}`}>
                 <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setPaymentMethod('paypal')}
                >
                    <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-[#15531B]' : 'border-gray-300 bg-white'}`}>
                                 {paymentMethod === 'paypal' && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1a1a1a]">PayPal</span>
                            <PaypalIcon />
                        </div>
                    </div>
                </div>
                 {paymentMethod === 'paypal' && (
                    <div className="p-4 bg-white text-sm text-gray-500 animate-fadeIn border-t border-gray-100">
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

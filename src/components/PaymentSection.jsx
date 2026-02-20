"use client";
import React, { useState } from 'react';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// --- Payment Icons ---
const VisaIcon = () => (
    <svg width="38" height="24" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><path d="M750,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style={{fill:'rgb(14,69,149)'}} /><path d="M278.197,334.228l33.361,-195.763l53.36,0l-33.385,195.763l-53.336,0Zm246.11,-191.54c-10.572,-3.966 -27.136,-8.222 -47.822,-8.222c-52.725,0 -89.865,26.55 -90.18,64.603c-0.298,28.13 26.513,43.822 46.753,53.186c20.77,9.594 27.752,15.714 27.654,24.283c-0.132,13.121 -16.587,19.116 -31.923,19.116c-21.357,0 -32.703,-2.966 -50.226,-10.276l-6.876,-3.111l-7.49,43.824c12.464,5.464 35.51,10.198 59.438,10.443c56.09,0 92.501,-26.246 92.916,-66.882c0.2,-22.268 -14.016,-39.216 -44.8,-53.188c-18.65,-9.055 -30.072,-15.099 -29.951,-24.268c0,-8.137 9.667,-16.839 30.556,-16.839c17.45,-0.27 30.089,3.535 39.937,7.5l4.781,2.26l7.234,-42.43m137.307,-4.222l-41.231,0c-12.774,0 -22.332,3.487 -27.942,16.234l-79.245,179.404l56.032,0c0,0 9.161,-24.123 11.233,-29.418c6.124,0 60.554,0.084 68.337,0.084c1.596,6.853 6.491,29.334 6.491,29.334l49.513,0l-43.188,-195.638Zm-65.418,126.407c4.413,-11.279 21.26,-54.723 21.26,-54.723c-0.316,0.522 4.38,-11.334 7.075,-18.684l3.606,16.879c0,0 10.217,46.728 12.352,56.528l-44.293,0Zm-363.293,-126.406l-52.24,133.496l-5.567,-27.13c-9.725,-31.273 -40.025,-65.155 -73.898,-82.118l47.766,171.203l56.456,-0.065l84.004,-195.386l-56.521,0Z" style={{fill:'white'}} /><path d="M131.92,138.465l-86.041,0l-0.681,4.073c66.938,16.204 111.231,55.363 129.618,102.414l-18.71,-89.96c-3.23,-12.395 -12.597,-16.094 -24.186,-16.526" style={{fill:'rgb(242,174,20)'}} /></g>
    </svg>
);

const MastercardIcon = () => (
    <svg width="38" height="24" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><path d="M750,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style={{fill:'rgb(244,244,244)'}} /><path d="M624.508,278.631l0,-5.52l-1.44,0l-1.658,3.796l-1.657,-3.796l-1.44,0l0,5.52l1.017,0l0,-4.164l1.553,3.59l1.055,0l1.553,-3.6l0,4.174l1.017,0Zm-9.123,0l0,-4.578l1.845,0l0,-0.933l-4.698,0l0,0.933l1.845,0l0,4.578l1.008,0Zm9.412,-82.071c0,85.425 -69.077,154.676 -154.288,154.676c-85.21,0 -154.288,-69.25 -154.288,-154.676c0,-85.426 69.077,-154.677 154.289,-154.677c85.21,0 154.288,69.251 154.288,154.677l-0.001,0Z" style={{fill:'rgb(247,159,26)'}} /><path d="M434.46,196.56c0,85.425 -69.078,154.676 -154.288,154.676c-85.212,0 -154.288,-69.25 -154.288,-154.676c0,-85.426 69.076,-154.677 154.288,-154.677c85.21,0 154.287,69.251 154.287,154.677l0.001,0Z" style={{fill:'rgb(234,0,27)'}} /><path d="M375.34,74.797c-35.999,28.317 -59.107,72.318 -59.107,121.748c0,49.43 23.108,93.466 59.108,121.782c35.999,-28.316 59.107,-72.352 59.107,-121.782c0,-49.43 -23.108,-93.431 -59.107,-121.748l-0.001,0Z" style={{fill:'rgb(255,95,1)'}} /></g>
    </svg>
);

const AmexIcon = () => (
    <svg width="38" height="24" viewBox="0 0 752 471" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><path d="M751,40c0,-22.077 -17.923,-40 -40,-40l-670,0c-22.077,0 -40,17.923 -40,40l0,391c0,22.077 17.923,40 40,40l670,0c22.077,0 40,-17.923 40,-40l0,-391Z" style={{fill:'rgb(37,87,214)'}} /><path d="M1,221.185l36.027,0l8.123,-19.51l18.185,0l8.101,19.51l70.88,0l0,-14.915l6.327,14.98l36.796,0l6.327,-15.202l0,15.138l176.151,0l-0.082,-32.026l3.408,0c2.386,0.083 3.083,0.302 3.083,4.226l0,27.8l91.106,0l0,-7.455c7.349,3.92 18.779,7.455 33.819,7.455l38.328,0l8.203,-19.51l18.185,0l8.021,19.51l73.86,0l0,-18.532l11.186,18.532l59.187,0l0,-122.508l-58.576,0l0,14.468l-8.202,-14.468l-60.105,0l0,14.468l-7.532,-14.468l-81.188,0c-13.59,0 -25.536,1.889 -35.186,7.153l0,-7.153l-56.026,0l0,7.153c-6.14,-5.426 -14.508,-7.153 -23.812,-7.153l-204.686,0l-13.734,31.641l-14.104,-31.641l-64.47,0l0,14.468l-7.083,-14.468l-54.983,0l-25.534,58.246l0,64.261Z" style={{fill:'white'}} /></g>
    </svg>
);

const DiscoverIcon = () => (
    <svg width="38" height="24" viewBox="0 0 780 501" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><path d="M54.992,0c-30.365,0 -54.992,24.63 -54.992,55.004l0,390.992c0,30.38 24.619,55.004 54.992,55.004l670.016,0c30.365,0 54.992,-24.63 54.992,-55.004l0,-390.992c0,-30.38 -24.619,-55.004 -54.992,-55.004l-670.016,0Z" style={{fill:'rgb(77,77,77)'}} /><path d="M415.13,161.213c30.941,0 56.022,23.58 56.022,52.709l0,0.033c0,29.13 -25.081,52.742 -56.021,52.742c-30.94,0 -56.022,-23.613 -56.022,-52.742l0,-0.033c0,-29.13 25.082,-52.71 56.022,-52.71l-0.001,0.001Zm-87.978,0.68c8.837,0 16.248,1.784 25.268,6.09l0,22.751c-8.544,-7.863 -15.955,-11.154 -25.756,-11.154c-19.264,0 -34.414,15.015 -34.414,34.05c0,20.075 14.681,34.196 35.37,34.196c9.312,0 16.586,-3.12 24.8,-10.857l0,22.763c-9.341,4.14 -16.911,5.776 -25.756,5.776c-31.278,0 -55.582,-22.596 -55.582,-51.737c0,-28.826 24.951,-51.878 56.07,-51.878Zm-97.113,0.627c11.546,0 22.11,3.72 30.943,10.994l-10.748,13.248c-5.35,-5.646 -10.41,-8.028 -16.564,-8.028c-8.853,0 -15.3,4.745 -15.3,10.989c0,5.354 3.619,8.188 15.944,12.482c23.365,8.044 30.29,15.176 30.29,30.926c0,19.193 -14.976,32.553 -36.32,32.553c-15.63,0 -26.994,-5.795 -36.458,-18.872l13.268,-12.03c4.73,8.61 12.622,13.222 22.42,13.222c9.163,0 15.947,-5.952 15.947,-13.984c0,-4.164 -2.055,-7.734 -6.158,-10.258c-2.066,-1.195 -6.158,-2.977 -14.2,-5.647c-19.291,-6.538 -25.91,-13.527 -25.91,-27.185c0,-16.225 14.214,-28.41 32.846,-28.41Zm234.723,1.728l22.437,0l28.084,66.592l28.446,-66.592l22.267,0l-45.494,101.686l-11.053,0l-44.687,-101.686Zm-397.348,0.152l30.15,0c33.312,0 56.534,20.382 56.534,49.641c0,14.59 -7.104,28.696 -19.118,38.057c-10.108,7.901 -21.626,11.445 -37.574,11.445l-29.992,0l0,-99.143Zm96.135,0l20.54,0l0,99.143l-20.54,0l0,-99.143Zm411.734,0l58.252,0l0,16.8l-37.725,0l0,22.005l36.336,0l0,16.791l-36.336,0l0,26.762l37.726,0l0,16.785l-58.252,0l0,-99.143l-0.001,0Zm71.858,0l30.455,0c23.69,0 37.265,10.71 37.265,29.272c0,15.18 -8.514,25.14 -23.986,28.105l33.148,41.766l-25.26,0l-28.429,-39.828l-2.678,0l0,39.828l-20.515,0l0,-99.143Zm20.515,15.616l0,30.025l6.002,0c13.117,0 20.069,-5.362 20.069,-15.328c0,-9.648 -6.954,-14.697 -19.745,-14.697l-6.326,0Zm-579.716,1.183l0,65.559l5.512,0c13.273,0 21.656,-2.394 28.11,-7.88c7.103,-5.955 11.376,-15.465 11.376,-24.98c0,-9.499 -4.273,-18.725 -11.376,-24.681c-6.785,-5.78 -14.837,-8.018 -28.11,-8.018l-5.512,0Z" style={{fill:'white'}} /><path d="M779.982,288.361c-26.05,18.33 -221.077,149.34 -558.754,212.623l503.762,0c30.365,0 54.992,-24.63 54.992,-55.004l0,-157.619Z" style={{fill:'rgb(244,114,22)'}} /></g>
    </svg>
);

const JCBIcon = () => (
    <svg width="38" height="24" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><rect width="750" height="471" rx="40" fill="#fff"/><path d="M617.243,346.766c0,41.615 -33.727,75.36 -75.36,75.36l-99.504,0l0,-278.38c0,-41.626 33.733,-75.367 75.36,-75.367l99.504,0l0,278.387Z" style={{fill:'rgb(58,118,193)'}} /><path d="M432.633,346.766c0,41.615 -33.733,75.36 -75.36,75.36l-99.51,0l0,-278.38c0,-41.626 33.733,-75.367 75.36,-75.367l99.51,0l0,278.387Z" style={{fill:'rgb(215,40,26)'}} /><path d="M248.024,346.766c0,41.615 -33.727,75.36 -75.36,75.36l-99.51,0l0,-278.38c0,-41.626 33.733,-75.367 75.36,-75.367l99.51,0l0,278.387Z" style={{fill:'rgb(59,155,53)'}} /><path d="M186.437,206.49c-12.95,-0.507 -25.387,2.067 -36.983,4.681l0,44.647c12.909,6.387 25.176,11.061 36.983,10.054c16.027,-1.369 22.894,-12.95 22.894,-24.538c0.007,-14.588 -8.335,-24.152 -22.894,-34.844Z" style={{fill:'white'}} /><path d="M197.498,179.24c0,0 -4.168,-0.041 -7.254,-0.041c-31.898,0 -62.658,14.183 -62.658,64.522c0,46.693 27.129,63.522 65.912,63.522l0,0.542c-0.041,0 3.918,0 3.918,0c28.77,0 50.352,-14.763 50.352,-42.039l0,-86.506l-50.27,0Z" style={{fill:'white'}} /><path d="M384.457,179.24l-51.994,0l0,127.551c16.552,2.893 33.631,3.474 51.994,-2.561l0,-49.369l-19.38,0l0,-16.851l37.231,0l0,57.978c-13.582,10.012 -39.214,17.398 -69.845,17.398l0,0.542c-0.041,0 -17.851,0 -17.851,0c-28.764,0 -50.352,-14.763 -50.352,-42.039l0,-86.506l50.271,0l0,86.506c0,7.769 5.229,13.582 13.582,13.582c4.208,0 6.608,-0.514 6.608,-0.514l0,-99.574l49.736,0l0,-6.143Z" style={{fill:'white'}} /><path d="M573.02,179.24l-50.271,0l0,128.093c16.552,2.893 38.069,2.392 52.679,-4.039c22.38,-9.838 30.162,-32.726 30.162,-56.264c0,-24.538 -11.575,-47.42 -32.57,-67.79Zm2.054,93.855c-3.086,4.681 -9.96,7.769 -17.736,7.769c-4.073,0 -6.735,-0.507 -6.735,-0.507l0,-74.952c0,0 2.399,-0.39 5.735,-0.39c28.242,0 33.445,44.572 18.736,68.08Z" style={{fill:'white'}} /></g>
    </svg>
);

const UnionPayIcon = () => (
    <svg width="38" height="24" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><rect width="750" height="471" rx="40" fill="#fff" stroke="#E5E7EB" strokeWidth="2"/><path d="M149.999,64.4l120,0c13.255,0 28.066,10.745 33.027,23.979l79.973,213.143c4.961,13.234 -1.795,23.979 -15.05,23.979l-120,0c-13.255,0 -28.066,-10.745 -33.027,-23.979l-79.973,-213.143c-4.961,-13.234 1.795,-23.979 15.05,-23.979Z" style={{fill:'rgb(1,78,133)'}} /><path d="M299.999,64.4l140,0c13.255,0 18.012,10.745 13.05,23.979l-79.973,213.143c-4.961,13.234 -19.772,23.979 -33.027,23.979l-140,0c-13.255,0 -18.012,-10.745 -13.05,-23.979l79.973,-213.143c4.961,-13.234 19.772,-23.979 33.027,-23.979Z" style={{fill:'rgb(204,17,40)'}} /><path d="M429.999,64.4l120,0c13.255,0 18.012,10.745 13.05,23.979l-79.973,213.143c-4.961,13.234 -19.772,23.979 -33.027,23.979l-120,0c-13.255,0 -18.012,-10.745 -13.05,-23.979l79.973,-213.143c4.961,-13.234 19.772,-23.979 33.027,-23.979Z" style={{fill:'rgb(0,97,79)'}} /><path d="M375,130c0,0 10,17 10,30c0,13 -10,22 -10,22c0,0 -10,-9 -10,-22c0,-13 10,-30 10,-30Z" style={{fill:'white'}} /></g>
    </svg>
);

const PaypalIcon = () => (
    <svg width="38" height="24" viewBox="0 0 780 501" xmlns="http://www.w3.org/2000/svg" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
        <g><path d="M54.992,0c-30.365,0 -54.992,24.63 -54.992,55.004l0,390.992c0,30.38 24.619,55.004 54.992,55.004l670.016,0c30.365,0 54.992,-24.63 54.992,-55.004l0,-390.992c0,-30.38 -24.619,-55.004 -54.992,-55.004l-670.016,0Z" style={{fill:'rgb(247,247,247)'}} /><g><path d="M515.551,209.243c-2.905,19.077 -17.473,19.077 -31.561,19.077l-8.017,0l5.626,-35.618c0.343,-2.151 2.193,-3.734 4.372,-3.734l3.679,0c9.593,0 18.652,0 23.325,5.461c2.789,3.269 3.631,8.12 2.576,14.814m-6.132,-49.773l-53.145,0c-3.621,0.002 -6.735,2.66 -7.305,6.235l-21.474,136.268c-0.036,0.227 -0.054,0.456 -0.054,0.685c0,2.429 1.997,4.429 4.425,4.434l27.272,0c2.542,0 4.707,-1.851 5.105,-4.358l6.098,-38.646c0.562,-3.584 3.659,-6.236 7.291,-6.236l16.815,0c35.014,0 55.214,-16.931 60.49,-50.513c2.378,-14.678 0.096,-26.217 -6.777,-34.295c-7.558,-8.881 -20.953,-13.581 -38.735,-13.581" style={{fill:'rgb(0,156,222)',fillRule:'nonzero'}} /><path d="M136.493,209.243c-2.906,19.077 -17.473,19.077 -31.568,19.077l-8.017,0l5.625,-35.618c0.343,-2.151 2.193,-3.734 4.372,-3.734l3.68,0c9.593,0 18.651,0 23.324,5.461c2.796,3.269 3.639,8.12 2.584,14.814m-6.133,-49.773l-53.145,0c-3.632,0 -6.729,2.645 -7.298,6.235l-21.481,136.268c-0.036,0.229 -0.054,0.46 -0.054,0.692c0,2.428 1.998,4.426 4.426,4.427l25.38,0c3.632,0 6.722,-2.645 7.291,-6.236l5.803,-36.761c0.562,-3.591 3.659,-6.236 7.291,-6.236l16.815,0c35.014,0 55.214,-16.938 60.49,-50.52c2.378,-14.678 0.096,-26.217 -6.776,-34.295c-7.558,-8.881 -20.954,-13.581 -38.735,-13.581" style={{fill:'rgb(0,48,135)',fillRule:'nonzero'}} /></g></g>
    </svg>
);

const PixelPayIcon = () => (
    <svg width="60" height="24" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="100" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="bold" fill="#007bff">Pixel</text>
        <text x="250" y="100" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="bold" fill="#28a745">Pay</text>
    </svg>
);

export default function PaymentSection({ bookingData, onPaymentComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentType, setPaymentType] = useState(bookingData?.paymentOption || 'pay_now'); // Respect selected option
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal' | 'pixelpay'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Handle Reserve Now (If they selected standard reserve without PixelPay)
    if (paymentType === 'reserve_later' && paymentMethod !== 'pixelpay') {
         onPaymentComplete({ 
            method: 'reserve_now', 
            status: 'unpaid',
            type: 'reserve_now'
         });
         return;
    }

    if (paymentMethod === 'paypal') {
        // Handled by PayPalButtons
        setLoading(false);
        return;
    }

    if (paymentMethod === 'pixelpay') {
        try {
            const response = await fetch('/api/pixelpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tourId: bookingData.tour._id,
                    travelers: bookingData.travelers,
                    extraServices: bookingData.selectedExtras,
                    paymentType: paymentType // Pass 'pay_now' or 'reserve_later'
                })
            });
            const data = await response.json();
            
            if (data.success) {
                // In a real PixelPay integration, you redirect the user to data.paymentUrl
                // Or use the inline SDK token. For this demo we'll simulate success:
                console.log("PixelPay Session Created:", data);
                
                // Simulate redirect and return
                setTimeout(() => {
                     onPaymentComplete({ 
                        method: 'pixelpay', 
                        id: data.orderID,
                        status: paymentType === 'reserve_later' ? 'authorized' : 'paid',
                        type: paymentType 
                    });
                }, 1500);

            } else {
                setErrorMessage(data.error || 'Failed to initialize PixelPay.');
                setLoading(false);
            }
        } catch (err) {
            console.error("PixelPay error:", err);
            setErrorMessage("Could not connect to PixelPay. Please try again.");
            setLoading(false);
        }
        return;
    }

    if (!stripe || !elements) {
      setErrorMessage("Payment initialization failed. Please refresh.");
      setLoading(false);
      return;
    }

    // Confirm Stripe Payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation`,
        payment_method_data: {
             billing_details: {
                name: bookingData.customer?.firstName + ' ' + bookingData.customer?.lastName,
                email: bookingData.customer?.email,
             }
        }
      },
      redirect: "if_required",
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
      <div>
        <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">Pay with</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <Lock size={12} /> Secure
            </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            
            {/* Credit Card Option - Hide if Reserve Later */}
            {paymentType === 'pay_now' && (
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
            )}

            {/* PayPal Option - Hide if Reserve Later */}
            {paymentType === 'pay_now' && (
                <div className={`border-b border-gray-200 transition-colors ${paymentMethod === 'paypal' ? 'bg-gray-50' : 'bg-white'}`}>
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
                        <div className="p-4 bg-white animate-fadeIn border-t border-gray-100">
                            {/* Official PayPal Integration */}
                            <div className="min-h-[150px] relative">
                                {(!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID === 'your_paypal_client_id_here') && (
                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4 border border-orange-200 rounded-lg">
                                        <span className="text-orange-600 font-bold text-sm mb-1">PayPal Not Configured</span>
                                        <span className="text-gray-500 text-xs text-balance">Add your <b>NEXT_PUBLIC_PAYPAL_CLIENT_ID</b> to your .env.local file to enable PayPal checkout.</span>
                                    </div>
                                )}
                                <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
                                    <PayPalButtons 
                                        style={{ layout: "vertical", shape: "rect", color: "gold" }}
                                        disabled={loading || !bookingData}
                                        createOrder={async () => {
                                            setErrorMessage(null);
                                            try {
                                                const response = await fetch('/api/paypal/create-order', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        tourId: bookingData.tour._id,
                                                        travelers: bookingData.travelers,
                                                        extraServices: bookingData.selectedExtras
                                                    })
                                                });
                                                const data = await response.json();
                                                if (data.orderID) {
                                                    return data.orderID;
                                                } else {
                                                    throw new Error(data.error || 'Failed to initialize PayPal order');
                                                }
                                            } catch (err) {
                                                console.error("PayPal Create Order fallback:", err);
                                                setErrorMessage("Could not connect to PayPal. Please try again.");
                                                throw err;
                                            }
                                        }}
                                        onApprove={async (data, actions) => {
                                            setLoading(true);
                                            setErrorMessage(null);
                                            try {
                                                const response = await fetch('/api/paypal/capture-order', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ orderID: data.orderID })
                                                });
                                                const captureData = await response.json();
                                                
                                                if (captureData.success) {
                                                    onPaymentComplete({ 
                                                        method: 'paypal', 
                                                        id: captureData.captureId,
                                                        status: 'paid', // Or depending on captureData.status
                                                        type: paymentType 
                                                    });
                                                } else {
                                                    setErrorMessage(captureData.error || 'Payment failed to capture.');
                                                    setLoading(false);
                                                }
                                            } catch (err) {
                                                setErrorMessage("Error capturing payment. Please contact support.");
                                                setLoading(false);
                                            }
                                        }}
                                        onError={(err) => {
                                            console.error("PayPal Checkout Error:", err);
                                            setErrorMessage("PayPal checkout encountered an error. Please try again.");
                                            setLoading(false);
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* PixelPay Option - Always Visible */}
            <div className={`transition-colors ${paymentMethod === 'pixelpay' || (paymentType === 'reserve_later' && paymentMethod !== 'pixelpay') ? 'bg-gray-50' : 'bg-white'}`}>
                 <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setPaymentMethod('pixelpay')}
                >
                    <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'pixelpay' || paymentType === 'reserve_later' ? 'border-[#15531B]' : 'border-gray-300 bg-white'}`}>
                                 {(paymentMethod === 'pixelpay' || paymentType === 'reserve_later') && <div className="w-2 h-2 bg-[#15531B] rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1a1a1a]">PixelPay {paymentType === 'reserve_later' && '(Hold Card on File)'}</span>
                            <PixelPayIcon />
                        </div>
                    </div>
                </div>
                 {(paymentMethod === 'pixelpay' || paymentType === 'reserve_later') && (
                    <div className="p-4 bg-white text-sm text-gray-500 animate-fadeIn border-t border-gray-100">
                        {paymentType === 'reserve_later' 
                            ? 'We will securely authorize your card via PixelPay to hold your reservation, but you will not be charged until the day of your tour.'
                            : 'You will be securely redirected to PixelPay to complete your purchase.'}
                    </div>
                )}
            </div>

       </div>
       </div>
       
       {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {errorMessage}
        </div>
      )}

      <div className="text-xs text-center text-gray-500 mt-4">
        By clicking '{paymentType === 'pay_now' ? 'Pay & Book' : 'Reserve & Hold Card'}', you agree to our Terms of Use and Privacy Policy.
      </div>

      <button 
        type="submit" 
        disabled={loading || (paymentType === 'pay_now' && paymentMethod === 'card' && !stripe)}
        className={`w-full bg-[#15531B] hover:bg-[#006966] text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading && paymentMethod !== 'paypal' ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
            <>
                <Lock size={16} /> 
                {paymentType === 'pay_now' ? 'Pay & Book' : 'Reserve & Hold Card'}
            </>
        )}
      </button>

    </form>
  );
}

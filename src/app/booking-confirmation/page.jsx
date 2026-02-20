"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Ticket, MapPin, Calendar, Users, Loader2 } from 'lucide-react';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // We can receive either an internal ID, or a redirect from a payment gateway
    const id = searchParams.get('id');
    const paymentIntentId = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadBooking() {
            setLoading(true);
            try {
                // Case 1: Standard Redirect with ID (From our own checkout success)
                if (id) {
                    const res = await fetch(`/api/bookings/${id}`);
                    const data = await res.json();
                    if (data.success) {
                        setBooking(data.data);
                    } else {
                        setError('Booking not found.');
                    }
                    return;
                }

                // Case 2: Stripe Redirect (User was sent off-site for 3DS and returned)
                if (paymentIntentId && redirectStatus === 'succeeded') {
                    // Try to restore session from local storage to CREATE the booking
                    const checkoutDataStr = localStorage.getItem('checkoutData');
                    if (!checkoutDataStr) {
                         setError('Session expired. If you were charged, your booking is confirmed and you will receive an email shortly.');
                         return;
                    }
                    const checkoutData = JSON.parse(checkoutDataStr);
                    
                    const response = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            tourId: checkoutData.tour._id,
                            tourSlug: checkoutData.tour.slug,
                            date: checkoutData.date,
                            travelers: checkoutData.travelers,
                            selectedExtras: checkoutData.selectedExtras,
                            // Fallback to empty if state was lost during strict redirect
                            customer: checkoutData.contactResult || { firstName: "Guest", lastName: "Checkout", email: "Unknown", phone: "" },
                            paymentIntentId: paymentIntentId,
                            paymentStatus: 'paid',
                            paymentType: checkoutData.paymentOption || 'pay_now',
                            pickupDetails: checkoutData.activityResult || {}
                        })
                    });

                    const data = await response.json();
                    if (data.success) {
                        localStorage.removeItem('checkoutData');
                        setBooking(data.data);
                    } else {
                        setError('Failed to finalize booking details.');
                    }
                    return;
                }
                
                setError('Invalid confirmation link.');
            } catch (err) {
                console.error(err);
                setError('An error occurred loading your booking.');
            } finally {
                setLoading(false);
            }
        }

        loadBooking();
    }, [id, paymentIntentId, redirectStatus]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[#15531B] mb-4" />
                <h2 className="text-xl font-bold">Verifying your booking...</h2>
                <p className="text-gray-500">Please do not close this page.</p>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">!</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">We couldn't load your booking</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button onClick={() => router.push('/')} className="bg-[#15531B] text-white px-6 py-2 rounded-full font-bold hover:bg-[#0c3110] transition-colors">
                    Return to Home
                </button>
            </div>
        );
    }

    const { tourTitle, customer, travelers, date, totalPrice, _id, paymentStatus, paymentType } = booking;
    const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#15531B] p-8 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-white/80">Thank you, {customer.firstName}. Your reservation is complete.</p>
                    <p className="text-white/80 text-sm mt-1">A confirmation email has been sent to {customer.email}.</p>
                </div>

                {/* Details Section */}
                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Booking Reference</div>
                            <div className="font-mono font-bold text-lg text-[#1a1a1a]">{_id.substring(0, 8).toUpperCase()}</div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-sm text-gray-500 mb-1">Payment Status</div>
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800">
                                {paymentStatus}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 border-b-2 border-[#15531B] pb-2 inline-block">Tour Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex gap-3">
                            <Ticket className="text-[#15531B] shrink-0" />
                            <div>
                                <div className="text-sm text-gray-500">Activity</div>
                                <div className="font-bold text-[#1a1a1a]">{tourTitle}</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Calendar className="text-[#15531B] shrink-0" />
                            <div>
                                <div className="text-sm text-gray-500">Date</div>
                                <div className="font-bold text-[#1a1a1a]">{formattedDate}</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Users className="text-[#15531B] shrink-0" />
                            <div>
                                <div className="text-sm text-gray-500">Travelers</div>
                                <div className="font-bold text-[#1a1a1a]">{travelers.adults + travelers.children} People</div>
                                <div className="text-xs text-gray-500">({travelers.adults} Adults, {travelers.children} Children)</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <MapPin className="text-[#15531B] shrink-0" />
                            <div>
                                <div className="text-sm text-gray-500">Total Price</div>
                                <div className="font-bold text-[#1a1a1a]">${totalPrice.toFixed(2)}</div>
                                <div className="text-xs text-gray-500">({paymentType === 'pay_now' ? 'Paid in full' : 'To be paid flat/on arrival'})</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-[#1a1a1a] mb-2">What's Next?</h4>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                            <li>Check your email inbox for your detailed itinerary and receipt.</li>
                            <li>Please arrive 15 minutes prior to your scheduled time.</li>
                            <li>If you selected pick-up, our driver will meet you at the designated location.</li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <button onClick={() => router.push('/')} className="text-[#15531B] font-bold hover:underline">
                        Return to site
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BookingConfirmationPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Loader2 size={40} className="animate-spin text-[#15531B]" />
                </div>
            }>
                <ConfirmationContent />
            </Suspense>
        </div>
    );
}

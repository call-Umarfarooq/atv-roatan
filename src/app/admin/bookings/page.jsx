"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, Search, Calendar, Users, FileText } from 'lucide-react';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings');
                const data = await res.json();
                if (data.success) {
                    setBookings(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(b => 
        b._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#1a1a1a]">Booking Management</h1>
            </div>

            {/* Filters/Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by ID, Customer Name, Email, or Tour..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none text-sm"
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Total: {bookings.length} reservations
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                <th className="p-4">Reference ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Tour details</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Loader2 size={32} className="animate-spin text-[#00694B] mb-2" />
                                            <span>Loading reservations...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-gray-500">
                                        <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-lg font-medium text-gray-900">No bookings found</p>
                                        <p>Adjust your search or wait for new reservations.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 align-top">
                                            <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded inline-block text-gray-700">
                                                {booking._id.substring(0, 8).toUpperCase()}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-[#1a1a1a]">{booking.customer.firstName} {booking.customer.lastName}</div>
                                            <div className="text-xs text-gray-500">{booking.customer.email}</div>
                                            <div className="text-xs text-gray-500">{booking.customer.phone}</div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-[#00694B] text-sm mb-1 line-clamp-2">{booking.tourTitle}</div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                                                <Calendar size={12} /> {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Users size={12} /> {booking.travelers.adults + booking.travelers.children} Travelers
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="font-bold text-[#1a1a1a]">${booking.totalPrice.toFixed(2)}</div>
                                            <div className="text-xs text-gray-500 capitalize">{booking.paymentType === 'pay_now' ? 'Pay Now' : 'Reserve Now'} via {(booking.paymentGateway || 'unknown').charAt(0).toUpperCase() + (booking.paymentGateway || 'unknown').slice(1)}</div>
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className={`px-2 py-1 rounded-full text-xs font-bold inline-block whitespace-nowrap uppercase tracking-wider ${
                                                booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                                booking.paymentStatus === 'authorized' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {booking.paymentStatus}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top text-right">
                                            <button className="text-sm font-bold text-[#00694B] hover:underline bg-[#00694B]/10 px-3 py-1.5 rounded-lg transition-colors">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


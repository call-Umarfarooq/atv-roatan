"use client";

import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, MapPin } from 'lucide-react';

const MeetingPointsPage = () => {
    const [activeTab, setActiveTab] = useState('port-roatan');

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'port-roatan' || hash === 'mahogany-bay') {
            setActiveTab(hash);
        }
    }, []);

    const portData = {
        'port-roatan': {
            title: 'Port of Roatán',
            subtitle: 'Town Center · Independent Operator Area',
            subject: 'Your Roatan Eco-Adventures ATV, Buggy & Golf Cart Tour – Port of Roatán Pickup Details',
            intro: 'Thank you for choosing **Roatan Eco-Adventures: Roatan ATV, Buggy & Golf Cart Adventure Tours** for your visit to Roatán, Honduras.\n\nIf your cruise ship docks at **Port of Roatán**, please follow these simple instructions:',
            steps: [
                "We will meet you **60 minutes after your ship has docked**.",
                "Exit the port area and walk to the **outside area where independent tour operators wait**.",
                "Our team member will be waiting for you, holding a **colored \"ATV Buggy\" sign with your name on it**.",
                "Please keep your group together and have your **booking confirmation** handy.",
            ],
            closing: 'To make everything easy and stress‑free, your confirmation will include:\n- A **photo of our staff** holding the ATV Buggy sign, and\n- A **map of Port of Roatán** showing the exact meeting point.',
            outroText: null,
            image: '/images/atv-roatan-show-banner2.jpeg',
            signImage: '/images/atv-roatan-show-banner2.jpeg',
        },
        'mahogany-bay': {
            title: 'Mahogany Bay',
            subtitle: "Isla's Tropical · Outside Security Gate",
            subject: "Your Roatan Eco-Adventures ATV, Buggy & Golf Cart Tour – Mahogany Bay (Isla's Tropical) Pickup Details",
            intro: 'Thank you for booking with **Roatan Eco-Adventures: Roatan ATV, Buggy & Golf Cart Adventure Tours**.\n\nIf your cruise ship docks at **Mahogany Bay (Isla\'s Tropical)**, please follow these instructions:',
            steps: [
                "We will meet you **60 minutes after your ship has docked**.",
                "Walk through the **security gate of the port** and continue to the area **allocated for independent tour operators**.",
                "Our team member will be waiting **outside the security gate**, holding a **colored \"ATV Buggy\" sign with your name on it**.",
                "Please keep your group together and have your **booking confirmation** available.",
            ],
            closing: 'For your peace of mind, your confirmation will include:\n- A **photo of our staff** holding the ATV Buggy sign, and\n- A **map of Mahogany Bay / Isla\'s Tropical** showing the walking route from the ship to our meeting point.',
            outroText: "We can't wait to welcome you to Roatán and share our eco‑adventures with you.",
            image: '/images/atv-roatan-show-banner2.jpeg',
            signImage: '/images/atv-roatan-show-banner2.jpeg',
        },
    };

    const current = portData[activeTab];

    const md = (text) =>
        text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00694B]">$1</strong>');

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">

            {/* ── Tab Switcher (sticky) ───────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2">
                    {Object.entries(portData).map(([key, port]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 py-3 px-3 rounded-xl  text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 ${
                                activeTab === key
                                    ? 'bg-[#00694B] text-white shadow-md'
                                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {port.title}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">

                {/* ── Hero Image (portrait-aware) ─────────────────────── */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
                    {/* Portrait image: fill width, auto height — no forced aspect ratio */}
                    <img
                        key={activeTab}
                        src={current.image}
                        alt={`${current.title} meeting point`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ maxHeight: '70vh', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    {/* Port label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                        <div className="inline-flex items-center gap-1.5 bg-[#00694B] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 sm:mb-3">
                            <MapPin size={9} />
                            Meeting Point
                        </div>
                        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight leading-none">
                            {current.title}
                        </h2>
                        <p className="text-white/70 font-semibold text-xs sm:text-sm mt-1 tracking-wide">
                            {current.subtitle}
                        </p>
                    </div>
                </div>

                {/* ── Main Content Card ───────────────────────────────── */}
                <div className="bg-gray-50 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* Subject header */}
                    <div className="bg-[#00694B] px-5 sm:px-8 py-5 sm:py-6">
                        <p className="text-white/60 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1.5 sm:mb-2">
                            Official Cruise Port Instructions
                        </p>
                        <h1 className="text-white text-base sm:text-xl md:text-2xl  leading-snug">
                            {current.subject}
                        </h1>
                    </div>

                    {/* Body — stacked on mobile, side-by-side on desktop */}
                    <div className="p-5 sm:p-8 md:p-10 flex flex-col md:grid md:grid-cols-5 gap-8 md:gap-10">

                        {/* Sign card — shown FIRST on mobile, right column on desktop */}
                        <div className="md:col-span-2 md:order-2">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5 sm:p-6 space-y-4 md:sticky md:top-24">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-[#00694B]" />
                                    <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider">Look for this Sign</h3>
                                </div>
                                {/* Portrait image — no fixed aspect, natural height */}
                                <div className="rounded-2xl overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-50 w-full">
                                    <img
                                        src={current.signImage}
                                        alt="ATV Buggy sign sample"
                                        className="w-full h-auto object-cover"
                                        style={{ maxHeight: '420px', objectFit: 'cover', objectPosition: 'center top' }}
                                    />
                                </div>
                                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-xl">
                                    Our staff will be wearing{' '}
                                    <strong className="text-[#00694B]">ATV Roatan</strong>-branded attire and holding this coloured sign with your{' '}
                                    <strong className="text-gray-800">group leader's name</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Text content — left column on desktop, below sign on mobile */}
                        <div className="md:col-span-3 md:order-1 space-y-6 sm:space-y-8">

                            {/* Intro */}
                            <div className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
                                {current.intro.split('\n\n').map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: md(para) }} />
                                ))}
                            </div>

                            {/* Steps */}
                            <div className="space-y-3 sm:space-y-4">
                                {current.steps.map((step, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-3 sm:gap-4 p-4 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:border-[#00694B]/30 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00694B]/10 text-[#00694B] font-black text-base sm:text-lg flex items-center justify-center">
                                            {i + 1}
                                        </div>
                                        <p
                                            className="text-gray-700 leading-relaxed font-medium pt-1 text-sm sm:text-base"
                                            dangerouslySetInnerHTML={{ __html: md(step) }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Closing block */}
                            <div className="bg-[#00694B]/5 border border-[#00694B]/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                                {current.closing.split('\n').map((line, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: md(line.replace(/^- /, '✓ ')) }} />
                                ))}
                            </div>

                            {/* Outro (optional) */}
                            {current.outroText && (
                                <p className="text-gray-700 font-semibold italic text-sm sm:text-base leading-relaxed">
                                    {current.outroText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Contact CTA ─────────────────────────────────────── */}
                <div className="bg-gray-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#00694B]/20 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 pointer-events-none" />
                    <div className="relative z-10">
                        <p className="text-white/50 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-1.5">Need help on the day?</p>
                        <h3 className="text-xl sm:text-2xl font-black uppercase italic leading-none">Call or WhatsApp us</h3>
                        <p className="text-white/60 font-medium text-xs sm:text-sm mt-1">
                            {current.outroText ?? "We look forward to giving you an unforgettable Roatán eco‑adventure!"}
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                            href="tel:+50496489745"
                            className="flex items-center min-w-max justify-center gap-2 bg-[#00694B] hover:bg-[#004d36] transition-colors text-white  px-5 py-3 rounded-xl sm:rounded-2xl shadow-lg text-sm"
                        >
                            <Phone size={16} />
                            +504 9648 9745
                        </a>
                        <a
                            href="tel:+50499392442"
                            className="flex items-center min-w-max justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white  px-5 py-3 rounded-xl sm:rounded-2xl text-sm"
                        >
                            <Phone size={16} />
                            +504 9939 2442
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default MeetingPointsPage;

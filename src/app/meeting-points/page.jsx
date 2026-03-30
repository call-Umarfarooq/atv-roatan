"use client";

import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, MapPin } from 'lucide-react';

const MeetingPointsPage = () => {
    const [activeTab, setActiveTab] = useState('port-roatan');
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'port-roatan' || hash === 'mahogany-bay') {
            setActiveTab(hash);
        }
    }, []);

    useEffect(() => {
        setShowMore(false);
    }, [activeTab]);

    const portData = {
        'port-roatan': {
            title: 'Port of Roatán',
            subtitle: 'Town Center · Independent Operator Area',
            subject: 'Your Roatan Eco-Adventures ATV, Buggy & Golf Cart Tour – Port of Roatán Pickup Details',
            intro: 'Thank you for choosing **Roatan Eco-Adventures: Roatan ATV, Buggy & Golf Cart Adventure Tours** for your visit to Roatán, Honduras.\n\nIf your cruise ship docks at **Port of Roatán**, please follow these simple instructions:',
            steps: [
                "<span class='block font-black text-[13px] sm:text-[15px] text-[#3b71a7] mb-0.5 uppercase tracking-wide'>MEET-UP TIME</span><span class='font-normal text-gray-600'>We will meet you 60 minutes after your ship has docked.</span>",
                "<span class='block font-black text-[13px] sm:text-[15px] text-[#478441] mb-0.5 uppercase tracking-wide'>EXIT THE PORT</span><span class='font-normal text-gray-600'>Exit the port area and walk to the outside wait area.</span>",
                "<span class='block font-black text-[13px] sm:text-[15px] text-[#bc3230] mb-0.5 leading-tight uppercase tracking-wide'>LOOK FOR YOUR TEAM MEMBER & SIGN</span><span class='font-normal text-gray-600'>Our team member will be waiting for you, holding a colored \"ATV Buggy\" sign with your name on it.</span>",
            ],
            closing: 'To make everything easy and stress‑free, your confirmation will include:\n- A **photo of our staff** holding the ATV Buggy sign, and\n- A **map of Port of Roatán** showing the exact meeting point.',
            outroText: null,
            image: '/images/portofrotainbg.png',
            signImage: '/images/portofrotanside.png',
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
            image: '/images/bg-mohagniby.png',
            signImage: '/images/mohagnibyside.png',
        },
    };

    const current = portData[activeTab];

    const md = (text) =>
        text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00694B]">$1</strong>');

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">

            {/* ── Top Header and Tabs ───────────────────────────────── */}
            <div className="pt-4 pb-3 bg-white shrink-0">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 leading-tight text-gray-800">
                        <a 
                            href="https://www.google.com/maps/place/ATV+Dune+Buggy+ROATAN+Eco-Jungle+Adventure+Tours/@16.3456999,-86.4813591,17z/data=!4m6!3m5!1s0x8f69e5bf4a59efa3:0xa0efd3ab20c41c7e!8m2!3d16.3456999!4d-86.4787842!16s%2Fg%2F11g8wgzth0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#111827] hover:text-[#00694B] hover:underline transition-colors inline-block"
                        >
                            Roatan ATV, Buggy & Golf Cart Adventure Tours
                        </a>
                    </h1>

                    <div className="bg-[#EFEFEF] p-1.5 rounded-full inline-flex w-full sm:w-auto shadow-inner relative max-w-[400px] mx-auto">
                        {Object.entries(portData).map(([key, port]) => {
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`relative z-10 flex-1 sm:w-48 py-2 px-4 rounded-full text-sm sm:text-[15px] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isActive
                                            ? 'bg-white text-black shadow ring-1 ring-black/5'
                                            : 'text-[#888888] hover:text-black'
                                    }`}
                                >
                                    {port.title}
                                    {isActive && (
                                        <div className="bg-[#E5E5E5] rounded-full w-[22px] h-[22px] flex items-center justify-center shrink-0">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-2 sm:py-4 space-y-3 sm:space-y-4">

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
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="inline-flex items-center gap-1.5 bg-[#00694B] text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                            <MapPin size={8} />
                            Meeting Point
                        </div>
                        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-none">
                            {current.title}
                        </h2>
                        <p className="text-white/70 font-semibold text-xs mt-1 tracking-wide">
                            {current.subtitle}
                        </p>
                    </div>
                </div>

                {/* ── Main Content Card ───────────────────────────────── */}
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* Subject header */}
                    <div className="bg-[#00694B] px-4 sm:px-5 py-2.5 sm:py-3">
                        <p className="text-white/60 text-[8px] sm:text-[9px] font-black uppercase tracking-widest mb-1">
                            Official Cruise Port Instructions
                        </p>
                        <h1 className="text-white text-sm sm:text-base md:text-lg leading-snug">
                            {current.subject}
                        </h1>
                    </div>

                    {/* Body — stacked on mobile, side-by-side on desktop */}
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col md:grid md:grid-cols-5 gap-4 md:gap-6">

                        {/* Sign card — shown FIRST on mobile, right column on desktop */}
                        <div className="md:col-span-2 md:order-2">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-3 sm:p-4 space-y-2.5 md:sticky md:top-24">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-[#00694B]" />
                                    <h3 className="font-black text-xs uppercase tracking-wider">Look for this Sign</h3>
                                </div>
                                {/* Portrait image — no fixed aspect, natural height */}
                                <div className="rounded-xl overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-50 w-full">
                                    <img
                                        src={current.signImage}
                                        alt="ATV Buggy sign sample"
                                        className="w-full h-auto object-cover"
                                        style={{ maxHeight: '420px', objectFit: 'cover', objectPosition: 'center top' }}
                                    />
                                </div>
                                <p className="text-gray-500 text-[11px] sm:text-[13px] leading-relaxed bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                                    Our staff will be wearing{' '}
                                    <strong className="text-[#00694B]">ATV Roatan</strong>-branded attire and holding this coloured sign with your{' '}
                                    <strong className="text-gray-800">group leader's name</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Text content — left column on desktop, below sign on mobile */}
                        <div className="md:col-span-3 md:order-1 space-y-3 sm:space-y-4">

                            {/* Intro */}
                            <div className="space-y-1.5 text-gray-700 leading-relaxed text-[13px] sm:text-[15px]">
                                {current.intro.split('\n\n').map((para, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: md(para) }} />
                                ))}
                            </div>

                            {/* Steps */}
                            <div className="space-y-2">
                                {current.steps.map((step, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00694B]/30 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#00694B]/10 text-[#00694B] font-black text-xs sm:text-sm flex items-center justify-center">
                                            {i + 1}
                                        </div>
                                        <div
                                            className="text-gray-700 leading-relaxed font-medium pt-0.5 text-[13px] sm:text-[15px]"
                                            dangerouslySetInnerHTML={{ __html: md(step) }}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {activeTab === 'mahogany-bay' && !showMore && (
                                <button 
                                    onClick={() => setShowMore(true)}
                                    className="text-[#00694B] font-bold text-[13px] sm:text-[15px] hover:underline flex items-center gap-1 py-0.5"
                                >
                                    More 
                                    <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}

                            {/* Closing block & Outro */}
                            {((activeTab === 'mahogany-bay' && showMore) || activeTab !== 'mahogany-bay') && (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="bg-[#00694B]/5 border border-[#00694B]/20 rounded-xl p-3 sm:p-4 space-y-1.5 text-gray-700 text-[13px] sm:text-[15px] leading-relaxed">
                                        {current.closing.split('\n').map((line, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: md(line.replace(/^- /, '✓ ')) }} />
                                        ))}
                                    </div>

                                    {/* Outro (optional) */}
                                    {current.outroText && (
                                        <p className="text-gray-700 font-semibold italic text-[13px] sm:text-[15px] leading-relaxed">
                                            {current.outroText}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Contact CTA ─────────────────────────────────────── */}
                <div className="bg-gray-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#00694B]/20 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 pointer-events-none" />
                    <div className="relative z-10">
                        <p className="text-white/50 text-[8px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Need help on the day?</p>
                        <h3 className="text-base sm:text-lg font-black uppercase italic leading-none">Call or WhatsApp us</h3>
                        <p className="text-white/60 font-medium text-[11px] sm:text-[13px] mt-0.5">
                            {current.outroText ?? "We look forward to giving you an unforgettable Roatán eco‑adventure!"}
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <a
                            href="tel:+50496489745"
                            className="flex items-center min-w-max justify-center gap-1.5 bg-[#00694B] hover:bg-[#004d36] transition-colors text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-lg text-[13px]"
                        >
                            <Phone size={14} />
                            +504 9648 9745
                        </a>
                        <a
                            href="tel:+50499392442"
                            className="flex items-center min-w-max justify-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[13px]"
                        >
                            <Phone size={14} />
                            +504 9939 2442
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default MeetingPointsPage;

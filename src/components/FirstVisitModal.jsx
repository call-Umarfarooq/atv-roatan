'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FirstVisitModal({ onClose }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Check if modal has been shown before
		const lastShownTime = localStorage.getItem('firstVisitModalTime');
		const currentTime = Date.now();
		const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; 

		const showModal = () => {
			if (!lastShownTime) {
				// First time visiting
				setIsOpen(true);
				localStorage.setItem('firstVisitModalTime', currentTime.toString());
			} else {
				// Check if 24 hours have passed
				const timeDifference = currentTime - parseInt(lastShownTime);
				if (timeDifference >= TWENTY_FOUR_HOURS) {
					setIsOpen(true);
					localStorage.setItem('firstVisitModalTime', currentTime.toString());
				}
			}
		};

		// Add 6 second delay before showing modal
		const timer = setTimeout(showModal, 6000);

		return () => clearTimeout(timer);
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	return (
        <AnimatePresence>
            {isOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-[9999] px-4 sm:px-0'>
                    {/* Backdrop */}
                    <motion.div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    {/* Modal */}
                    <motion.div 
                        className='bg-white rounded-3xl sm:rounded-[2rem] relative shadow-2xl p-6 sm:p-10 md:p-12 max-w-[95%] sm:max-w-[600px] w-full mx-auto max-h-[90vh] overflow-y-auto'
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{ type: 'tween', duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className='text-gray-400 absolute top-5 right-5 hover:text-gray-600 text-3xl font-bold transition-colors duration-200 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100'
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        
                        <div className='flex flex-col items-center text-center mt-2'> 
                            {/* Logo */}
                            <img 
                                src="/images/atv-logo.png" 
                                alt="ATV Roatan Logo" 
                                className="w-20 h-20 sm:w-28 sm:h-28 mb-5 sm:mb-8 object-contain shrink-0" 
                            />

                            {/* Content */}
                            <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a202c] mb-4 sm:mb-6 tracking-tight leading-tight'>
                                We are Roatan ATV, Buggy & Golf<br className="hidden sm:block" /> cart Adventure Tour.
                            </h2>
                            <p className='text-[1.05rem] sm:text-[1.1rem] md:text-xl font-bold text-[#1a8844] mb-5 sm:mb-8 tracking-wide'>
								STOP PAYING MIDDLEMAN FEES – BOOK DIRECT! 🏝️
							 We are the ACTUAL Fleet Owners of Roatan. Why pay 25% extra on middleman agency.?  </p>
                            <p className='text-[#64748b] text-[0.95rem] sm:text-[1.125rem] md:text-[1.2rem] leading-relaxed sm:leading-[1.8] font-medium'>
                               100% Back-to-Ship Guarantee:  <br /> Don't risk missing your cruise. We prioritize cruise ship schedules
								   and guarantee you'll be back at the terminal on time, every time. </p>
								<p className='text-[#64748b] text-[0.95rem] sm:text-[1.125rem] md:text-[1.2rem] leading-relaxed sm:leading-[1.8] font-medium'>
                              Lowest Price Guaranteed: <br /> By cutting out the middleman, we pass the savings directly to you.  </p>
                       </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
	);
}

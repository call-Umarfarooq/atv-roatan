"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function FloatingElements() {
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    // Timer to swing images every 8 seconds
    const timer = setInterval(() => {
      setIsSwapped((prev) => !prev);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Airplane / Tota */}
      <motion.div
        className="absolute top-[2%] lg:top-[4%] w-[70px] sm:w-[90px] lg:w-[100px]"
        initial={false}
        animate={{ 
            y: [0, -20, 0],
            left: isSwapped ? "calc(100% - 110px)" : "2%" 
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          left: {
            duration: 3,
            ease: "easeInOut"
          }
        }}
      >
        <Image
          src="/images/tota.png"
          alt="Floating Tota"
          width={200}
          height={100}
          className="w-full h-auto object-contain opacity-80"
          priority
        />
      </motion.div>

      {/* Cloud / Bander */}
      <motion.div
        className="absolute top-[1%] lg:top-[2%] w-[70px] sm:w-[90px] lg:w-[100px]"
        initial={false}
        animate={{ 
            y: [0, -30, 0],
            left: isSwapped ? "2%" : "calc(100% - 110px)"
        }}
        transition={{
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
          left: {
            duration: 3,
            ease: "easeInOut"
          }
        }}
      >
        <Image
          src="/images/sloth-imag.png"
          alt="Floating sloth"
          width={180}
          height={100}
          className="w-full h-auto bg-white object-contain opacity-80"
          priority
        />
      </motion.div>
    </div>
  );
}

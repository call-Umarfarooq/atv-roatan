"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingElements() {
  return (
    <div className="pointer-events-none  absolute inset-0 z-20 overflow-hidden">
      {/* Airplane - Mid Left */}
      <motion.div
        className="absolute top-[2%] lg:top-[4%] left-1 sm:left-[3%] lg:left-[5%] w-[70px] sm:w-[90px] lg:w-[100px]"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        <Image
          src="/images/tota.png"
          alt="Floating Airplane"
          width={200}
          height={100}
          className="w-full  h-auto object-contain opacity-80"
          priority
        />
      </motion.div>

      {/* Cloud/Balloon - Mid Right */}
      <motion.div
        className="absolute top-[1%] lg:top-[2%] right-1 sm:right-[3%] lg:right-[5%] w-[70px] sm:w-[90px] lg:w-[100px]"
        animate={{ y: [0, -30, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Image
          src="/images/bander.png"
          alt="Floating Cloud"
          width={180}
          height={100}
          className="w-full h-auto bg-white object-contain opacity-80"
          priority
        />
      </motion.div>
    </div>
  );
}

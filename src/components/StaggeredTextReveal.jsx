"use client";

import { motion } from "framer-motion";

export default function StaggeredTextReveal({ text, className = "", el: Wrapper = "p" }) {
  // Split the text into an array of words
  const words = text.split(" ");

  // Variants for the container to stagger the children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for each individual word
  const itemVariants = {
    hidden: { opacity: 0, y: "100%" },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        // Using inline-flex and flex-wrap ensures words flow correctly like normal text
        className="inline-flex font-uber-move flex-wrap" 
      >
        {words.map((word, index) => (
          // The overflow-hidden span creates the "reveal" boundary
          <span key={index} className="overflow-hidden font-uber-move inline-flex">
            <motion.span variants={itemVariants} className="inline-block font-uber-move">
              {word}
              {/* Add a space after each word except the last one to maintain natural spacing */}
              {index < words.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}

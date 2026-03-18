import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cafe-dark flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background animated subtle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cafe-amber/5 blur-[40px]"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100 - 10}%`,
              top: `${Math.random() * 100 - 10}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center space-y-10 max-w-md w-full"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 12 }}
            className="w-24 h-24 bg-gradient-to-br from-cafe-dark to-[#2a2522] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-cafe-amber/20"
          >
            <Coffee size={44} className="text-cafe-amber drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cafe-caramel font-semibold uppercase tracking-[0.25em] text-sm"
          >
            Aura Café
          </motion.h2>
        </div>

        <div className="space-y-5 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-cafe-cream leading-tight"
          >
            Experience Your Food in <span className="text-cafe-amber text-glow inline-block">AR</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-cafe-beige/70 text-lg leading-relaxed font-light"
          >
            Browse our menu in immersive 3D space before you take a seat.
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-4 px-10 py-4 bg-gradient-to-r from-[#d89345] to-cafe-amber text-cafe-dark font-bold text-lg rounded-2xl shadow-[0_8px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_12px_35px_rgba(245,158,11,0.5)] transition-shadow relative overflow-hidden group w-full sm:w-auto"
        >
          <span className="relative z-10">Start Exploring</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

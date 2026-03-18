import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw, Maximize2, RefreshCw, Smartphone } from 'lucide-react';

export default function ARViewerOverlay({ item, onBack }) {
  const [showInstructions, setShowInstructions] = useState(true);

  // Hide instructions after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 overflow-hidden bg-black/60"
    >
      {/* Mock Camera Background (for demo purposes) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40"></div>
      
      {/* Top Bar Navigation */}
      <div className="absolute top-0 left-0 right-0 p-5 z-20 flex justify-between items-start pointer-events-none">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full glass-panel-light text-white hover:bg-white/20 transition-colors drop-shadow-md"
        >
          <ChevronLeft size={28} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pointer-events-auto glass-panel-light px-6 py-3 rounded-full flex flex-col items-center shadow-lg border-cafe-amber/20"
        >
          <span className="text-cafe-cream font-semibold tracking-wide text-sm">{item?.name || 'Item'}</span>
          <span className="text-cafe-amber text-xs font-medium">AR Preview</span>
        </motion.div>
      </div>

      {/* Floating Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showInstructions ? 1 : 0, y: showInstructions ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="absolute top-1/3 left-0 right-0 flex justify-center items-center pointer-events-none z-20"
      >
        <div className="flex flex-col items-center glass-panel px-6 py-4 rounded-2xl">
          <motion.div
            animate={{ 
              x: [-10, 10, -10], 
              rotate: [-5, 5, -5] 
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mb-3 text-cafe-amber"
          >
            <Smartphone size={36} />
          </motion.div>
          <p className="text-cafe-cream font-medium text-sm drop-shadow-md">Move your phone to detect a surface</p>
        </div>
      </motion.div>

      {/* AR Mock Item (Centered) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showInstructions ? 0 : 1.2, opacity: showInstructions ? 0 : 1 }}
        transition={{ type: "spring", delay: 3, stiffness: 100, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-64 h-64 rounded-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-white/10 glow-effect">
          <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto flex justify-center items-center gap-6 glass-panel-light mx-auto max-w-xs py-4 px-6 rounded-[2rem] shadow-2xl"
        >
          <button className="flex flex-col items-center gap-2 text-cafe-cream/80 hover:text-cafe-amber transition-colors outline-none group">
            <div className="p-3 rounded-full bg-black/20 group-hover:bg-cafe-amber/20 transition-colors">
              <RotateCcw size={22} className="group-hover:text-cafe-amber" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Rotate</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 text-cafe-cream/80 hover:text-cafe-amber transition-colors outline-none group relative">
            <div className="absolute inset-0 bg-cafe-amber/10 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-4 rounded-full bg-cafe-amber/20 group-hover:bg-cafe-amber/30 transition-colors border border-cafe-amber/30 relative z-10 glow-effect">
              <Maximize2 size={26} className="text-cafe-amber" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-cafe-amber">Scale</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-cafe-cream/80 hover:text-cafe-amber transition-colors outline-none group">
            <div className="p-3 rounded-full bg-black/20 group-hover:bg-cafe-amber/20 transition-colors">
              <RefreshCw size={22} className="group-hover:text-cafe-amber" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">Reset</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

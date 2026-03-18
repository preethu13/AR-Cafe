import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function FoodCard({ item, onViewAR }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#2a2623] flex flex-col rounded-[1.5rem] overflow-hidden border border-white/5 relative group transition-shadow duration-300 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.2)]"
    >
      {/* Subtle hover gradient ring inside border */}
      <div className="absolute inset-0 rounded-[1.5rem] border-2 border-transparent group-hover:border-cafe-amber/20 transition-colors pointer-events-none z-30"></div>
      
      <div className="relative h-44 w-full overflow-hidden bg-[#1e1a18]">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        {/* Dark gradient overlay for text readability at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a2623] to-transparent z-10"></div>
      </div>

      <div className="relative z-20 p-4 pb-5 flex flex-col flex-grow justify-between bg-[#2a2623] -mt-2">
        <div className="px-1">
          <h3 className="text-[1.1rem] font-semibold text-cafe-cream leading-tight mb-1">{item.name}</h3>
          {item.price && <p className="text-cafe-caramel text-sm font-medium">{item.price}</p>}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewAR(item)}
          className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-cafe-amber/10 to-cafe-amber/5 border border-cafe-amber/30 text-cafe-amber text-sm font-semibold transition-all hover:bg-cafe-amber/20 glow-effect-hover shadow-[0_0_10px_rgba(245,158,11,0.1)]"
        >
          <Eye size={18} />
          <span>View in AR</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

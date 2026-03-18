import React from 'react';
import { motion } from 'framer-motion';
import FoodCard from './FoodCard';

const MENU_ITEMS = [
  {
    id: 1,
    name: "Maggi",
    price: "Rs.40",
    image: "https://blog.swiggy.com/wp-content/uploads/2024/06/Image-3_Schezwan-Maggi-1024x538.png"
  },
  {
    id: 2,
    name: "Croissant",
    price: "Rs.40",
    image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Signature Espresso",
    price: "Rs.40",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Berry Cake",
    price: "Rs.90",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Avocado Toast",
    price: "Rs.120",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Iced Caramel Latte",
    price: "Rs.60",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTp2gb2XPxdLB--0WhDkg1wXztHLD1h6dkVw&s"
  }
];

export default function Menu({ onViewAR }) {
  // Stagger children
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-cafe-dark pt-12 pb-24 px-5 md:px-8 w-full overflow-x-hidden"
    >
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center flex flex-col items-center"
        >
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cafe-amber to-transparent mb-6 opacity-60"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-cafe-cream mb-3 tracking-tight">Our <span className="text-cafe-amber text-glow">Menu</span></h1>
          <p className="text-cafe-beige/60 text-sm md:text-base max-w-xs mx-auto leading-relaxed">Select an item to view it in your space.</p>
        </motion.div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:gap-6"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.id} variants={itemVars}>
              <FoodCard item={item} onViewAR={onViewAR} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

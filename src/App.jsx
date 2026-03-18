import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Menu from './components/Menu';
import ARViewerOverlay from './components/ARViewerOverlay';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'menu', 'ar'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleStart = () => {
    setCurrentView('menu');
  };

  const handleViewAR = (item) => {
    setSelectedItem(item);
    setCurrentView('ar');
  };

  const handleBackFromAR = () => {
    setSelectedItem(null);
    setCurrentView('menu');
  };

  return (
    <div className="bg-cafe-dark min-h-[100svh] font-sans text-cafe-cream overflow-hidden selection:bg-cafe-amber/30">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <Landing key="landing" onStart={handleStart} />
        )}
        
        {currentView === 'menu' && (
          <Menu key="menu" onViewAR={handleViewAR} />
        )}
        
        {currentView === 'ar' && (
          <ARViewerOverlay key="ar" item={selectedItem} onBack={handleBackFromAR} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

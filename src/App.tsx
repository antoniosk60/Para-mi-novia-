import { useState, useEffect } from "react";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import Dashboard from "./components/Dashboard";
import Garden from "./components/Garden";
import CupidAI from "./components/CupidAI";
import Coupons from "./components/Coupons";
import MusicAndMemories from "./components/MusicAndMemories";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    return localStorage.getItem("ali_active_tab") || "dashboard";
  });

  const handleSetTab = (tab: string) => {
    setCurrentTab(tab);
    localStorage.setItem("ali_active_tab", tab);
  };

  // Ethereal background heart emitters interval loop
  useEffect(() => {
    const emitHearts = () => {
      // Limit background noise to a subtle density
      const heart = document.createElement("div");
      heart.innerHTML = ["❤️", "💖", "🌸", "💕", "✨"][Math.floor(Math.random() * 5)];
      heart.className = "floating-heart";
      
      // Random placements
      heart.style.left = `${Math.random() * 100}vw`;
      // Randomized sizes
      heart.style.fontSize = `${12 + Math.random() * 12}px`;
      // Randomized speeds
      heart.style.animationDuration = `${10 + Math.random() * 10}s`;
      
      document.body.appendChild(heart);

      // Auto-destruct after float completion
      setTimeout(() => {
        heart.remove();
      }, 15000);
    };

    // Emit heart particle every 4 seconds
    const interval = setInterval(emitHearts, 4000);
    
    // Initial batch of stars / hearts
    for (let i = 0; i < 4; i++) {
      emitHearts();
    }

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "garden":
        return <Garden />;
      case "cupid":
        return <CupidAI />;
      case "coupons":
        return <Coupons />;
      case "memories":
        return <MusicAndMemories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div 
      id="romantic-applet-root" 
      className="min-h-screen bg-[#FFF5F7] font-sans text-gray-800 transition-colors pb-10"
    >
      {/* Sticky top-bar Header */}
      <Header />
      
      {/* Content viewport area */}
      <main id="app-viewport-wrapper" className="max-w-md md:max-w-xl mx-auto px-4 pt-5">
        <div id="active-tab-container" className="fade-in duration-300">
          {renderContent()}
        </div>
      </main>

      {/* Persistent touch bottom navbar */}
      <BottomNavBar currentTab={currentTab} setTab={handleSetTab} />
    </div>
  );
}

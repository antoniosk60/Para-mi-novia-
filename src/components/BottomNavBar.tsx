import { Heart, Flower, MailOpen, Gift, Library } from "lucide-react";

interface BottomNavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function BottomNavBar({ currentTab, setTab }: BottomNavBarProps) {
  const navItems = [
    { id: "dashboard", label: "Inicio", icon: Heart },
    { id: "garden", label: "El Jardín", icon: Flower },
    { id: "cupid", label: "AI Cupido", icon: MailOpen },
    { id: "coupons", label: "Vales", icon: Gift },
    { id: "memories", label: "Recuerdos", icon: Library },
  ];

  return (
    <nav 
      id="romantic-app-bottom-navbar" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFF5F7]/95 backdrop-blur-md border-t-[3px] border-[#1A1A1A] shadow-md pb-safe"
    >
      <div className="max-w-md mx-auto px-6 h-18 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setTab(item.id)}
              className="relative py-2 flex flex-col items-center justify-center flex-1 transition-all duration-300"
              aria-label={item.label}
            >
              <div 
                className={`p-1.5 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-love-100 text-love-600 scale-110 shadow-sm" 
                    : "text-gray-400 hover:text-love-400"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span 
                className={`text-[10px] mt-1 font-sans font-medium tracking-wide transition-all duration-300 ${
                  isActive ? "text-love-700 font-semibold" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
              
              {isActive && (
                <div 
                  id={`nav-indicator-${item.id}`}
                  className="absolute bottom-1 w-1 h-1 bg-love-500 rounded-full" 
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

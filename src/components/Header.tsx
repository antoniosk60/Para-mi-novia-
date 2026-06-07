import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header 
      id="romantic-app-top-header"
      className="sticky top-0 z-40 w-full bg-[#FFF5F7]/95 backdrop-blur-md border-b-[3px] border-[#1A1A1A] py-3.5 shadow-sm"
    >
      <div className="max-w-2xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0 animate-heart-pulse">
            <span className="text-pink-500 text-xl font-bold">♥</span>
          </div>
          <div>
            <span className="text-[10px] text-pink-500 font-black uppercase tracking-widest block">
              Para Alicia &apos;Pichis&apos; 🌸
            </span>
            <h1 className="text-xl font-serif text-gray-800 italic font-bold tracking-tight">
              Nuestra Historia ✨
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-pink-500 to-rose-400 px-3 py-1.5 rounded-full border border-pink-300 shadow-sm hover:scale-105 duration-300">
          <Sparkles className="text-white fill-white/20" size={11} />
          <span className="font-sans text-[9px] font-black text-white tracking-widest uppercase">
            Amor Eterno
          </span>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Gift, Sparkles, Share2, ArrowRight } from "lucide-react";
import { INITIAL_COUPONS } from "../data/romanticData";
import { LoveCoupon } from "../types";

export default function Coupons() {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(INITIAL_COUPONS);
  const [activeTab, setActiveTab] = useState<'wheel' | 'inventory'>('wheel');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedWheelCoupon, setSelectedWheelCoupon] = useState<LoveCoupon | null>(null);

  // Spin the custom romantic wheel
  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedWheelCoupon(null);

    // Calculate a random degree rotation
    // Add multiple spins (e.g. 1800 degrees) + a randomized slice offset
    const randomSpins = 5 + Math.floor(Math.random() * 5); // 5 to 10 spins
    const randomIndex = Math.floor(Math.random() * coupons.length);
    const sliceAngle = 360 / coupons.length;
    
    // Stop exactly in the middle of the sliced wedge
    const destinationAngle = (360 - (randomIndex * sliceAngle)) + (sliceAngle / 2);
    const newRotation = rotation + (360 * randomSpins) + destinationAngle;
    
    setRotation(newRotation);

    // After transition duration (3.5 seconds), reveal the matching coupon!
    setTimeout(() => {
      setSpinning(false);
      setSelectedWheelCoupon(coupons[randomIndex]);

      // Pop romantic celebration heart sprites
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "🎁";
        heart.className = "fixed pointer-events-none text-xl z-50 float-heart-custom";
        heart.style.left = `${Math.random() * 80 + 10}vw`;
        heart.style.bottom = "12vh";
        heart.style.animation = `floatUp ${2.5 + Math.random() * 2}s ease-out forwards`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }
    }, 3500);
  };

  // Pre-generate WhatsApp message for Ali
  const getWhatsAppURL = (coupon: LoveCoupon) => {
    const text = encodeURIComponent(
      `¡Hola Antonio! 💖 Acabo de ganar y quiero canjear mi vale romántico en el espacio secreto de Ali:\n\n` +
      `🎟️ *VALE:* ${coupon.title}\n` +
      `✍️ *Detalles:* ${coupon.description}\n` +
      `🔑 *Código Único de Validación:* ${coupon.code}\n\n` +
      `¡Te amo mucho! ¿Cuándo me consientes? 🥰`
    );
    // Generic URL triggers Native WhatsApp apps on both android and iOS!
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  return (
    <div id="coupons-tab" className="flex flex-col space-y-6 pb-24">
      {/* Introduction Banner Header */}
      <div className="bg-white border border-love-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-pink-50 text-pink-600 rounded-2xl border border-pink-100">
            <Gift size={20} />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-gray-800">
              La Ruleta de los Vales de Amor
            </h2>
            <p className="font-sans text-xs text-gray-400">
              Gira la ruleta interactiva para ganar privilegios y vales románticos. ¡Todos y cada uno de ellos son respaldados 100% por Antonio!
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-gray-50 border border-gray-100 rounded-2xl">
          <button
            id="tab-wheel-btn"
            onClick={() => setActiveTab('wheel')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'wheel'
                ? "bg-white text-love-700 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            🎡 Girar la Ruleta
          </button>
          <button
            id="tab-inventory-btn"
            onClick={() => setActiveTab('inventory')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? "bg-white text-love-700 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            📋 Catálogo Completo ({coupons.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: COUPOUN SLIDER / SPINNING WHEEL */}
      {activeTab === 'wheel' && (
        <div id="wheel-view-box" className="space-y-6">
          <div className="bg-white rounded-3xl border border-love-100 p-6 shadow-sm flex flex-col items-center">
            
            {/* Spinning Wheel Physical Representation */}
            <div id="spinning-wheel-frame" className="relative w-64 h-64 mb-6">
              
              {/* Outer border lights decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-love-100 via-pink-400 to-rose-300 rounded-full border-4 border-white shadow-[0_5px_20px_rgba(244,63,94,0.15)] pointer-events-none" />
              
              {/* Wheel Center Core Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-8 bg-love-600 rounded-b-xl shadow-md z-30 flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>

              {/* The Rotating Canvas segments */}
              <div
                id="rotating-wheel-canvas"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 3.5s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none",
                }}
                className="w-full h-full rounded-full overflow-hidden border border-white/40 flex items-center justify-center relative bg-white"
              >
                {/* Segments drawing dynamically */}
                {coupons.map((coupon, idx) => {
                  const sliceAngle = 360 / coupons.length;
                  const itemRot = idx * sliceAngle;
                  
                  return (
                    <div
                      key={coupon.id}
                      style={{
                        transform: `rotate(${itemRot}deg)`,
                        transformOrigin: "50% 50%",
                      }}
                      className="absolute w-full h-full flex items-center justify-center"
                    >
                      {/* Splitting divider border */}
                      <div className="absolute top-0 bottom-1/2 left-1/2 -translate-x-0.5 w-0.5 bg-pink-100/60" />
                      
                      {/* Emoji label rotated near edge */}
                      <div 
                        style={{ transform: "translateY(-90px)" }}
                        className="text-xl animate-bounce"
                        title={coupon.title}
                      >
                        {coupon.emoji}
                      </div>
                    </div>
                  );
                })}
                
                {/* Inner central love heart logo */}
                <div className="absolute inset-1/3 bg-white rounded-full border-2 border-love-100 shadow flex items-center justify-center z-10 animate-heart-pulse">
                  <div className="w-10 h-10 rounded-full bg-love-100 flex items-center justify-center text-love-600">
                    <Gift size={16} className="fill-love-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button controller */}
            <button
              id="spin-trigger-btn"
              disabled={spinning}
              onClick={handleSpinWheel}
              className={`px-8 py-3 bg-gradient-to-tr from-love-600 to-rose-400 text-white font-sans font-bold text-xs rounded-full shadow-[0_5px_20px_rgba(244,63,94,0.2)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 ${
                spinning ? "opacity-60 cursor-not-allowed scale-95 animate-pulse" : ""
              }`}
            >
              <Sparkles size={13} className="fill-white" />
              <span>{spinning ? "Girando Tu Destino..." : "Girar Ruleta de Amor 🎡"}</span>
            </button>
          </div>

          {/* Golden Redeemption Ticket Rendered Container */}
          {selectedWheelCoupon && (
            <div 
              id="redeemable-ticket-container" 
              className="bg-love-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden animate-[heartPulse_4s_infinite] border border-love-200"
            >
              {/* Retro ticket perforations decorative */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-love-50/50 rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-love-50/50 rounded-full" />
              <div className="absolute top-0 bottom-0 left-12 border-l-2 border-dashed border-white/20" />

              <div className="pl-10 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{selectedWheelCoupon.emoji}</span>
                  <div>
                    <span className="text-[10px] font-sans font-extrabold tracking-widest uppercase text-pink-100/85">
                      {selectedWheelCoupon.category}
                    </span>
                    <h3 className="font-serif text-base font-bold leading-tight">
                      {selectedWheelCoupon.title}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-xs text-pink-50/90 leading-relaxed font-light">
                  {selectedWheelCoupon.description}
                </p>

                {/* Barcode representation */}
                <div className="bg-white/10 p-2.5 rounded-2xl flex flex-col items-center">
                  <div className="font-mono text-[14px] tracking-[6px] text-pink-100 font-bold mb-1">
                    ||||| |||| |||||| ||
                  </div>
                  <div className="font-mono text-[10px] font-bold tracking-tight text-white/90">
                    CÓDIGO: {selectedWheelCoupon.code}
                  </div>
                </div>

                {/* Redeem on WhatsApp safe external anchor button */}
                <a
                  id="redeem-whatsapp-anchor"
                  href={getWhatsAppURL(selectedWheelCoupon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-love-700 py-3 rounded-2xl font-sans font-black text-xs hover:bg-love-50 flex items-center justify-center space-x-1.5 shadow-md active:scale-95 duration-200"
                >
                  <Share2 size={13} className="text-love-600 text-love-500" />
                  <span>Canjear por WhatsApp 💋</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: COMPLETE INVENTORY list of coupons */}
      {activeTab === 'inventory' && (
        <div id="inventory-list-parent" className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              id={`inventory-card-${coupon.id}`}
              className="bg-white border border-cover border-love-100 rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Ticket border curves decoration */}
              <div className="absolute -left-2 top-11 w-4 h-4 bg-gray-50/50 border border-love-100 rounded-full" />
              <div className="absolute -right-2 top-11 w-4 h-4 bg-gray-50/50 border border-love-100 rounded-full" />

              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl mt-0.5">{coupon.emoji}</span>
                <div className="overflow-hidden">
                  <span className="text-[9px] font-bold text-love-500 font-sans uppercase tracking-wider block">
                    {coupon.category}
                  </span>
                  <h4 className="font-serif text-xs font-bold text-gray-800 leading-snug">
                    {coupon.title}
                  </h4>
                </div>
              </div>

              <p className="font-sans text-[11px] text-gray-500 leading-normal font-light mb-4 flex-1">
                {coupon.description}
              </p>

              {/* Bottom claim details */}
              <div className="border-t border-love-50 pt-3 flex items-center justify-between">
                <span className="font-mono text-[9px] text-love-400 bg-love-50 px-2 py-0.5 rounded-full font-bold">
                  {coupon.code}
                </span>

                <a
                  id={`claim-whatsapp-${coupon.id}`}
                  href={getWhatsAppURL(coupon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 px-3 bg-love-100 hover:bg-love-200 text-love-700 font-sans font-bold text-[10px] rounded-full flex items-center space-x-1 duration-200"
                >
                  <span>Canjear</span>
                  <ArrowRight size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

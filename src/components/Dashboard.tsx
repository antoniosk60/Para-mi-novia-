import { useState, useEffect } from "react";
import { Heart, Calendar, RefreshCw, Sparkle, Edit2, Check } from "lucide-react";
import { ROMANTIC_QUOTES } from "../data/romanticData";
// import current generated image
const heroImg = "/src/assets/images/love_hero_1780872968703.png";

export default function Dashboard() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [kisses, setKisses] = useState(() => {
    return Number(localStorage.getItem("ali_kisses_sent") || "0");
  });
  const [kissFeedback, setKissFeedback] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState(() => {
    return localStorage.getItem("ali_anniversary_date") || "2025-06-19";
  });
  const [isEditingAnniversary, setIsEditingAnniversary] = useState(false);
  const [timePassed, setTimePassed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Anniversary date calculator loop
  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(`${anniversaryDate}T00:00:00`);
      const now = new Date();
      let diff = now.getTime() - anniversary.getTime();

      if (diff < 0) {
        // Future date, reset to 0
        setTimePassed({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const msecInYear = 1000 * 60 * 60 * 24 * 365.25;
      const years = Math.floor(diff / msecInYear);
      diff -= years * msecInYear;

      const msecInDay = 1000 * 60 * 60 * 24;
      const days = Math.floor(diff / msecInDay);
      diff -= days * msecInDay;

      const msecInHour = 1000 * 60 * 60;
      const hours = Math.floor(diff / msecInHour);
      diff -= hours * msecInHour;

      const msecInMin = 1000 * 60;
      const minutes = Math.floor(diff / msecInMin);
      diff -= minutes * msecInMin;

      const seconds = Math.floor(diff / 1000);

      setTimePassed({ years, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  // Rotates to a random love quote
  const rotateQuote = () => {
    let nextIndex = quoteIndex;
    while (nextIndex === quoteIndex && ROMANTIC_QUOTES.length > 1) {
      nextIndex = Math.floor(Math.random() * ROMANTIC_QUOTES.length);
    }
    setQuoteIndex(nextIndex);
  };

  // Handles virtual kiss interaction
  const sendKiss = () => {
    const newKisses = kisses + 1;
    setKisses(newKisses);
    localStorage.setItem("ali_kisses_sent", String(newKisses));

    // Array of beautiful status responses
    const messages = [
      "¡Mmmmuack! Le enviaste un beso flotante súper ruidoso a tu Anto de 17 años 💋",
      "¡Abrazo infinitamente apretado despachado con amor a tu Anto! 🧸",
      "¡Amor infinito directo al corazoncito de Anto! 💖",
      "¡Le recordaste a Anto lo mucho que lo adora su PICHIS! 🥰",
      "¡Cosquillitas y cariñito de Pichis en camino para Anto! 🔥",
      "¡Acabas de enviarle el beso número " + newKisses + " con todo tu amor! 🌟"
    ];
    const randMsg = messages[Math.floor(Math.random() * messages.length)];
    setKissFeedback(randMsg);

    // Auto clear feedback after 3 seconds
    setTimeout(() => {
      setKissFeedback("");
    }, 4500);

    // Dynamic tiny float hearts injection
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = ["💖", "❤️", "🌸", "💋", "💕"][Math.floor(Math.random() * 5)];
      heart.className = "fixed pointer-events-none text-xl z-50 float-heart-custom";
      heart.style.left = `${Math.random() * 80 + 10}vw`;
      heart.style.bottom = "10vh";
      heart.style.animation = `floatUp ${3 + Math.random() * 3}s linear forwards`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }
  };

  const handleSaveAnniversary = (dateStr: string) => {
    setAnniversaryDate(dateStr);
    localStorage.setItem("ali_anniversary_date", dateStr);
    setIsEditingAnniversary(false);
  };

  return (
    <div id="dashboard-tab" className="flex flex-col space-y-6 pb-24">
      {/* Hero card showcasing our customized image */}
      <div 
        id="dashboard-hero-card"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-love-50 to-pink-100/50 border border-love-100 p-4 shadow-sm"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/2 aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-md border border-white">
            <img 
              id="hero-illustration"
              src={heroImg} 
              alt="Ilustración Pareja" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-2 text-center md:text-left">
            <div className="inline-flex items-center self-center md:self-start space-x-1 bg-gradient-to-r from-pink-500 to-rose-400 px-3 py-1 rounded-full text-white text-[11px] font-black border border-pink-300 shadow-sm">
              <Sparkle size={10} className="fill-white" />
              <span>19 de Junio del 2025 💞</span>
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-800 tracking-tight leading-tight">
              Bienvenida, mi niña peshosha 👑
            </h2>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Hola, mi hermosa <span className="font-bold text-pink-600">Alicia Salas &quot;Pichis&quot;</span>. Un amor tan inmenso como el nuestro merece un rincón mágico donde brillar. ¡Te amo con locura hoy y siempre!
            </p>
          </div>
        </div>
      </div>

      {/* Counter banner */}
      <div 
        id="dashboard-counter-box"
        className="bg-white rounded-3xl border border-love-100 p-6 shadow-[0_4px_25px_rgba(244,63,94,0.03)] text-center relative"
      >
        <div className="absolute top-4 right-4 flex items-center">
          {isEditingAnniversary ? (
            <div className="flex items-center space-x-1.5">
              <input
                type="date"
                id="edit-date-input"
                className="text-xs bg-love-50 border border-love-200 rounded px-1 py-0.5"
                defaultValue={anniversaryDate}
                onChange={(e) => handleSaveAnniversary(e.target.value)}
              />
              <button 
                onClick={() => setIsEditingAnniversary(false)}
                className="p-1 bg-green-100 text-green-700 rounded-full"
              >
                <Check size={12} />
              </button>
            </div>
          ) : (
            <button 
              id="edit-anniversary-btn"
              onClick={() => setIsEditingAnniversary(true)}
              className="p-1.5 text-gray-400 hover:text-love-500 transition-colors"
              title="Ajustar Fecha de Aniversario"
            >
              <Edit2 size={13} />
            </button>
          )}
        </div>

        <Calendar className="mx-auto text-love-400 mb-3" size={26} />
        <h3 className="font-serif text-sm font-bold text-gray-400 tracking-wider uppercase mb-5">
          Tiempo Amándonos
        </h3>

        {/* Bento counter grid */}
        <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
          <div className="bg-love-50/50 p-2.5 rounded-2xl border border-love-100/50 flex flex-col justify-center">
            <span className="font-serif text-xl font-bold text-love-600 leading-none">
              {timePassed.years}
            </span>
            <span className="text-[9px] text-gray-500 mt-1 font-sans">Años</span>
          </div>
          <div className="bg-love-50/50 p-2.5 rounded-2xl border border-love-100/50 flex flex-col justify-center">
            <span className="font-serif text-xl font-bold text-love-600 leading-none">
              {timePassed.days}
            </span>
            <span className="text-[9px] text-gray-500 mt-1 font-sans">Días</span>
          </div>
          <div className="bg-love-50/50 p-2.5 rounded-2xl border border-love-100/50 flex flex-col justify-center">
            <span className="font-serif text-xl font-bold text-love-600 leading-none">
              {String(timePassed.hours).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-gray-500 mt-1 font-sans">Horas</span>
          </div>
          <div className="bg-love-50/50 p-2.5 rounded-2xl border border-love-100/50 flex flex-col justify-center">
            <span className="font-serif text-xl font-bold text-love-600 leading-none">
              {String(timePassed.minutes).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-gray-500 mt-1 font-sans">Min</span>
          </div>
          <div className="bg-love-500 text-white p-2.5 rounded-2xl shadow-sm flex flex-col justify-center animate-pulse">
            <span className="font-serif text-xl font-bold leading-none">
              {String(timePassed.seconds).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-pink-100 mt-1 font-sans">Seg</span>
          </div>
        </div>

        <p className="font-sans text-[11px] text-gray-400 mt-4 italic">
          Contando desde el {new Date(`${anniversaryDate}T00:00:00`).toLocaleDateString("es-ES", { day:"numeric", month:"long", year:"numeric" })}
        </p>
      </div>

      {/* Couple Profiles Bento Card */}
      <div 
        id="couple-profiles-card"
        className="bg-white rounded-3xl border border-pink-100 p-5 shadow-[0_4px_25px_rgba(244,63,94,0.02)]"
      >
        <h3 className="font-serif text-xs font-bold text-pink-500 tracking-wider uppercase mb-4 text-center">
          Nuestros Datos de Amor 💘
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100/50 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl mb-2 border border-pink-200">
              👑
            </div>
            <span className="text-[10px] uppercase tracking-wider text-pink-500 font-black">Ella (18 años)</span>
            <span className="font-serif text-sm font-bold text-gray-800 mt-1">Alicia Salas</span>
            <span className="font-sans text-[10px] italic text-rose-500 font-medium mt-0.5">&quot;Pichis&quot;</span>
            <span className="text-[9px] text-gray-500 mt-2 leading-tight">La mayor de la relación, la niña consentida que manda en mi corazón.</span>
          </div>

          <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-xl mb-2 border border-rose-200">
              🧸
            </div>
            <span className="text-[10px] uppercase tracking-wider text-rose-500 font-black">Yo (17 años)</span>
            <span className="font-serif text-sm font-bold text-gray-800 mt-1">Angel Antonio</span>
            <span className="font-sans text-[10px] italic text-pink-500 font-medium mt-0.5">&quot;Anto&quot;</span>
            <span className="text-[9px] text-gray-500 mt-2 leading-tight">Tu novio de 17 años que te amará y consentirá por toda la eternidad.</span>
          </div>
        </div>
      </div>

      {/* Floating Kisses Trigger Box */}
      <div 
        id="dashboard-kiss-panel"
        className="bg-gradient-to-b from-white to-love-50/30 rounded-3xl border border-love-100 p-6 shadow-sm text-center relative overflow-hidden"
      >
        <div id="kiss-halo" className="absolute inset-0 bg-radial-gradient from-love-100/10 to-transparent pointer-events-none" />
        
        <h3 className="font-serif text-sm font-bold text-gray-700 tracking-wider uppercase mb-1">
          Buzón de Besos Virtuales
        </h3>
        <p className="font-sans text-xs text-gray-400 mb-6 font-medium">
          ¿Extrañas a tu novio Anto hoy? ¡Presiona el corazón gigante para enviarle besos flotantes directo a su alma! 💋
        </p>

        <button 
          id="huge-kiss-button"
          onClick={sendKiss}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-love-500 to-rose-400 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(244,63,94,0.35)] cursor-pointer active:scale-95 hover:scale-105 duration-300 transform animate-heart-pulse z-10 relative"
        >
          <Heart className="fill-white" size={38} />
        </button>

        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="text-xs font-sans text-gray-400">
            Besotes que le has mandado: <span id="kisses-counter-val" className="font-bold text-love-600 text-base">{kisses}</span>
          </div>
          
          {kissFeedback && (
            <div 
              id="kiss-toast-feedback"
              className="mt-4 max-w-sm px-4 py-2 bg-love-600 text-white text-xs font-medium rounded-full shadow-md animate-heart-pulse"
            >
              {kissFeedback}
            </div>
          )}
        </div>
      </div>

      {/* Quote section */}
      <div 
        id="dashboard-quote-box"
        className="bg-love-50/30 border border-love-100 rounded-3xl p-6 relative flex flex-col justify-between"
      >
        <div className="absolute -top-3 left-6 px-3 py-0.5 bg-love-600 text-white rounded-full text-[10px] font-sans font-bold uppercase tracking-wider">
          Pensamiento de Amor
        </div>

        <p className="font-serif text-sm text-gray-700 leading-relaxed italic text-center pt-2">
          "{ROMANTIC_QUOTES[quoteIndex].text}"
        </p>
        
        <div className="mt-4 pt-4 border-t border-love-100 flex items-center justify-between">
          <span className="font-sans text-[11px] font-semibold text-love-700 tracking-wide">
            — {ROMANTIC_QUOTES[quoteIndex].author}
          </span>
          <button 
            id="rotate-quote-btn"
            onClick={rotateQuote}
            className="p-1.5 hover:bg-love-100 rounded-full text-love-500 transition-colors"
            title="Leer otro pensamiento"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, Heart, Plus, Trash2, Camera, Compass } from "lucide-react";
import { MemoryCard } from "../types";
import { INITIAL_MEMORIES } from "../data/romanticData";

const SONG_PLAYLIST = [
  {
    id: "song-1",
    title: "Para Siempre (Nuestra Melodía)",
    artist: "Dedicado a Pichis",
    duration: "1:30",
    lyrics: [
      "Y así te fui queriendo diario... 💖",
      "Sin prisa, sin pausa, con toda el alma. ✨",
      "Cada risa que me regalas es mi parte favorita del día. 🥰",
      "Pichis, eres mi hogar de paz en este loco mundo. 🏡",
      "Te amo desde el 19 de junio del 2025, de nuestro primer suspiro. 💞"
    ]
  },
  {
    id: "song-2",
    title: "Amor de Primavera",
    artist: "De Anto para mi niña peshosha",
    duration: "1:15",
    lyrics: [
      "Como un tulipán fresco bajo el sol de mayo... 🌷",
      "Tú abriste los colores en mi corazón gris. 🎨",
      "Adoro llamarte mía y cobijarnos bajo las nubes. ☁️",
      "Gracias por quererme con tanta dulzura y lealtad. 🧸",
      "Eres mi primavera eterna, mi hermosa Alicia Pichis. 🌸"
    ]
  },
  {
    id: "song-3",
    title: "Tú y Yo (Estrellas de Medianoche)",
    artist: "A la luz de la Luna de Pichis & Anto",
    duration: "1:45",
    lyrics: [
      "Mira hacia afuera, esa luna brilla solo para nosotros... 🌛",
      "Caminemos descalzos, tomados fuerte de la mano. 🤝",
      "No hay constelación más bella que el brillo de tus ojos. 🌟",
      "Anto amándote hasta Plutón e infinitamente de regreso. 🚀",
      "Mi Pichis de 18 años y yo de 17, el mejor capítulo de mi vida entera. 📖💅"
    ]
  }
];

export default function MusicAndMemories() {
  // Memories management
  const [memories, setMemories] = useState<MemoryCard[]>(() => {
    const raw = localStorage.getItem("ali_memories_album");
    return raw ? JSON.parse(raw) : INITIAL_MEMORIES;
  });
  
  const [triggerAddMemory, setTriggerAddMemory] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCategory, setNewCategory] = useState<'romantic' | 'adventure' | 'funny' | 'cozy'>('romantic');
  const [newImgUrl, setNewImgUrl] = useState("");

  // Music Player management
  const [activeSongIdx, setActiveSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricIdx, setLyricIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeSong = SONG_PLAYLIST[activeSongIdx];

  // Sync memories with localStorage
  const saveMemories = (newList: MemoryCard[]) => {
    setMemories(newList);
    localStorage.setItem("ali_memories_album", JSON.stringify(newList));
  };

  // Lyric Scrolling Automation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            // Next song loop
            setIsPlaying(false);
            setLyricIdx(0);
            return 0;
          }
          const nextProg = p + 4; // increment simulation
          
          // Calculate active lyric sentence based on progression
          const totalLyrics = activeSong.lyrics.length;
          const matchedLyricIdx = Math.floor((nextProg / 100) * totalLyrics);
          if (matchedLyricIdx < totalLyrics) {
            setLyricIdx(matchedLyricIdx);
          }
          
          return nextProg;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSongIdx, activeSong.lyrics.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    setIsPlaying(false);
    setProgress(0);
    setLyricIdx(0);
    setActiveSongIdx((prev) => (prev + 1) % SONG_PLAYLIST.length);
  };

  const handlePrevSong = () => {
    setIsPlaying(false);
    setProgress(0);
    setLyricIdx(0);
    setActiveSongIdx((prev) => (prev - 1 + SONG_PLAYLIST.length) % SONG_PLAYLIST.length);
  };

  // Add polaroid memory card
  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Standard high-quality picsum url placeholder if she does not provide one
    const finalImg = newImgUrl.trim() || `https://picsum.photos/seed/${Date.now()}/500/400`;

    const newMemCard: MemoryCard = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || "Un momento súper tierno guardado para siempre en nuestro corazón.",
      date: newDate.trim() || "Fecha especial",
      category: newCategory,
      imageUrl: finalImg
    };

    const updated = [newMemCard, ...memories];
    saveMemories(updated);

    // Reset inputs
    setNewTitle("");
    setNewDesc("");
    setNewDate("");
    setNewImgUrl("");
    setTriggerAddMemory(false);
  };

  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás segura de eliminar esta foto polaroid de tu álbum digital? 🥺")) {
      const filtered = memories.filter((m) => m.id !== id);
      saveMemories(filtered);
    }
  };

  return (
    <div id="lyrics-memories-tab" className="flex flex-col space-y-6 pb-24">
      
      {/* SECTION 1: ANIMATED MUSIC PLAYER */}
      <div 
        id="retro-player-card"
        className="bg-gradient-to-br from-love-900 to-pink-950 text-white rounded-3xl p-6 shadow-xl border border-love-800 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-love-600/10 to-transparent pointer-events-none" />
        
        {/* Top title bar */}
        <div className="flex items-center space-x-2 border-b border-love-700/40 pb-4 mb-4">
          <Music className="text-love-400 animate-bounce" size={18} />
          <h3 className="font-serif text-[11px] font-bold tracking-wider uppercase text-pink-200">
            Nuestro Reproductor Retro de Amor
          </h3>
        </div>

        {/* Music Cassette visual graphic */}
        <div id="retro-cassette-deck" className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-700 p-4 rounded-2xl w-full max-w-xs mx-auto mb-5 shadow-2xl relative">
          
          <div className="bg-love-600/10 rounded-xl px-2.5 py-1 text-center font-mono text-[9px] text-pink-300 font-bold border border-love-500/20 mb-3 select-none leading-none">
            TDK CHROMIUM • DE: ANTO PARA: PICHIS 💝
          </div>

          <div className="relative bg-gray-950 rounded-xl h-14 border border-gray-800 mx-5 flex items-center justify-around px-8 shadow-inner overflow-hidden">
            {/* Gear 1 rotating */}
            <div 
              className={`w-9 h-9 rounded-full bg-gray-800 border-2 border-dashed border-gray-500 flex items-center justify-center ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "6s" }}
            >
              <div className="w-4 h-4 rounded-full bg-gray-950 border border-gray-700" />
            </div>

            {/* Simulated Tape window ribbon */}
            <div className="h-4 w-12 bg-amber-900/40 border border-amber-800 rounded flex items-center justify-center">
              <div className="w-10 h-0.5 bg-yellow-400/80 animate-pulse" />
            </div>

            {/* Gear 2 rotating */}
            <div 
              className={`w-9 h-9 rounded-full bg-gray-800 border-2 border-dashed border-gray-500 flex items-center justify-center ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "6s" }}
            >
              <div className="w-4 h-4 rounded-full bg-gray-950 border border-gray-700" />
            </div>
          </div>
        </div>

        {/* Text lyrics highlight drawer */}
        <div 
          id="lyrics-sub-deck"
          className="h-20 bg-black/40 border border-love-800/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center backdrop-blur-sm relative"
        >
          <p className="font-serif text-xs italic font-medium leading-relaxed tracking-wide text-rose-200 transition-all">
            {isPlaying 
              ? activeSong.lyrics[lyricIdx] 
              : "♫ Presiona Play para escuchar las letras que Anto te dedica..."}
          </p>
        </div>

        {/* ProgressBar bar */}
        <div className="mt-5 space-y-1">
          <div className="flex justify-between font-mono text-[9px] text-gray-400">
            <span>{isPlaying ? `0:${String(Math.floor(progress * 0.9)).padStart(2, "0")}` : "0:00"}</span>
            <span>{activeSong.duration}</span>
          </div>
          <div className="h-1.5 w-full bg-love-950 rounded-full overflow-hidden border border-love-900">
            <div 
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-1000"
            />
          </div>
        </div>

        {/* Audio meta and buttons controllers bar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="overflow-hidden max-w-[150px]">
            <h4 className="font-serif text-xs font-bold leading-tight truncate text-pink-100">
              {activeSong.title}
            </h4>
            <span className="text-[10px] text-gray-300 font-sans block truncate">
              {activeSong.artist}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              id="player-prev-btn"
              onClick={handlePrevSong}
              className="p-2 hover:bg-white/10 rounded-full text-pink-300 hover:text-white transition-all cursor-pointer"
            >
              <SkipBack size={18} />
            </button>
            <button 
              id="player-play-btn"
              onClick={handlePlayPause}
              className="p-3.5 bg-gradient-to-tr from-love-500 to-rose-400 hover:scale-105 duration-200 text-white rounded-full shadow-lg active:scale-95 cursor-pointer flex items-center justify-center animate-heart-pulse"
            >
              {isPlaying ? <Pause size={18} className="fill-white" /> : <Play size={18} className="fill-white pl-0.5" />}
            </button>
            <button 
              id="player-next-btn"
              onClick={handleNextSong}
              className="p-2 hover:bg-white/10 rounded-full text-pink-300 hover:text-white transition-all cursor-pointer"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: POLAROID PHOTO DIARY WALL */}
      <div id="polaroid-section-box" className="bg-white rounded-3xl border border-love-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Camera className="text-love-500" size={18} />
            <h3 className="font-serif text-sm font-bold text-gray-800 tracking-wide">
              Mural de Recuerdos Polaroid
            </h3>
          </div>
          
          {!triggerAddMemory && (
            <button
              id="open-memform-btn"
              onClick={() => setTriggerAddMemory(true)}
              className="p-1 px-3 bg-love-50 text-love-700 text-[10px] font-bold rounded-full hover:bg-love-100/80 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Plus size={11} />
              <span>Añadir Polaroid</span>
            </button>
          )}
        </div>

        {/* Polaroid Creator Collapse View Form */}
        {triggerAddMemory && (
          <form 
            id="add-polaroid-form"
            onSubmit={handleAddMemory} 
            className="mb-6 p-4 border border-love-100 rounded-2xl bg-love-50/10 space-y-3"
          >
            <h4 className="text-xs font-bold text-love-700">Añadir Nuevo Recuerdo al Diario</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <label htmlFor="mem-title-input" className="text-[10px] font-bold text-gray-500 uppercase block">Título</label>
                <input
                  id="mem-title-input"
                  type="text"
                  placeholder="Ej. Viaje juntos, Nuestro Beso..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={25}
                  required
                  className="w-full text-xs font-medium px-3 py-1.5 bg-white border border-love-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-0.5">
                <label htmlFor="mem-date-input" className="text-[10px] font-bold text-gray-500 uppercase block">Efeméride/Fecha</label>
                <input
                  id="mem-date-input"
                  type="text"
                  placeholder="Ej. 14 de Nov, Otoño..."
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  maxLength={15}
                  className="w-full text-xs font-medium px-3 py-1.5 bg-white border border-love-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label htmlFor="mem-imgurl-input" className="text-[10px] font-bold text-gray-500 uppercase block">Imagen URL (Opcional)</label>
              <input
                id="mem-imgurl-input"
                type="url"
                placeholder="https://ejemplo.com/foto.jpg (Dejar en blanco para aleatoria)"
                value={newImgUrl}
                onChange={(e) => setNewImgUrl(e.target.value)}
                className="w-full text-xs font-medium px-3 py-1.5 bg-white border border-love-200 rounded-xl focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Categoría de Amor</label>
                <select
                  id="mem-category-select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full text-xs bg-white border border-love-200 rounded-xl px-2 py-1.5 focus:outline-none"
                >
                  <option value="romantic">❤️ Romántico</option>
                  <option value="adventure">🌅 Aventura</option>
                  <option value="funny">😜 Divertido</option>
                  <option value="cozy">☕ Acogedor</option>
                </select>
              </div>

              <div className="space-y-0.5">
                <label htmlFor="mem-desc-input" className="text-[10px] font-bold text-gray-500 uppercase block">Descripción corta</label>
                <input
                  id="mem-desc-input"
                  type="text"
                  placeholder="Detalla qué pasó esta tarde genial..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  maxLength={65}
                  className="w-full text-xs font-medium px-3 py-1.5 bg-white border border-love-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                type="button"
                id="close-memform-btn"
                onClick={() => setTriggerAddMemory(false)}
                className="flex-1 py-2 border border-gray-200 rounded-xl text-[10px] font-bold text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="submit-polaroid-btn"
                className="flex-1 py-2 bg-love-600 text-white rounded-xl text-[10px] font-bold hover:bg-love-700 shadow-sm cursor-pointer"
              >
                Revelar Polaroid 📸
              </button>
            </div>
          </form>
        )}

        {/* Memories Gallery representation styled exactly as authentic high-end Polaroid paper */}
        <div id="polaroid-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {memories.map((card) => (
            <div
              key={card.id}
              id={`polaroid-card-${card.id}`}
              className="bg-white border-1 border-gray-100 hover:border-love-200 p-3 pb-6 rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.06)] transform hover:-rotate-1 hover:scale-[1.02] transition-all relative group flex flex-col"
            >
              {/* Retro trash stamp deletion button */}
              <button
                id={`del-polaroid-btn-${card.id}`}
                onClick={(e) => handleDeleteMemory(card.id, e)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/40 text-white hover:bg-love-600 hover:text-white transition-all scale-0 group-hover:scale-100 z-10 duration-200"
                title="Eliminar recuerdo"
              >
                <Trash2 size={11} />
              </button>

              {/* Memory Picture Container */}
              <div className="w-full aspect-[4/3] rounded-sm bg-gray-50 overflow-hidden border border-gray-100/50 relative">
                <img
                  id={`polaroid-pic-${card.id}`}
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs rounded-lg text-[8px] font-bold text-white uppercase tracking-wider">
                  {card.category === 'romantic' ? "❤️ Amor" : card.category === 'adventure' ? "🌅 Ruta" : card.category === 'funny' ? "😜 Risa" : "☕ Calma"}
                </span>
              </div>

              {/* Bottom handwriting representation text space */}
              <div className="text-center pt-4 px-1 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-serif italic font-bold text-gray-800 text-[13px] tracking-tight hover:text-love-600 transition-colors leading-snug">
                    {card.title}
                  </h4>
                  <p className="font-sans text-[10px] text-gray-500 font-light mt-1 max-w-[200px] mx-auto leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                <div className="pt-3 font-serif italic text-[10px] text-love-500/80 font-semibold tracking-wide flex items-center justify-center space-x-1 border-t border-dashed border-gray-100 mt-3">
                  <Compass size={9} />
                  <span>{card.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

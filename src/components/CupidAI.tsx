import React, { useState, useEffect } from "react";
import { Mail, MailOpen, Send, Sparkles, Heart, Trash2, BookmarkCheck, Inbox } from "lucide-react";
import { SavedCupidLetter } from "../types";

const MOODS_LIST = [
  { id: "missing", label: "Te extraño mucho 😔", text: "Pichis extraña bastante a su novio Anto de 17 años y quiere sentirlo cerca de su corazón." },
  { id: "tired", label: "Tuve un día largo y cansado 🥱", text: "Pichis tuvo un día cansado, agotador o pesado y necesita mimos y cariños tiernos de su novio Anto." },
  { id: "in_love", label: "Feliz y súper enamorada 😍", text: "Pichis (18 años) se siente inmensamente feliz, agradecida, radiante y sumamente enamorada de su gran amor Anto." },
  { id: "playful", label: "Con ganas de reír y bromear 😜", text: "Pichis tiene ganas de divertirse, reírse, bromear y quiere que Anto le mande un mensaje pícaro, divertido o juguetón." },
  { id: "spoiled", label: "Queriendo ser súper consentida 👑", text: "Pichis se siente mimada, tierna y pide que su novio de 17 años la llene de mimos hermosos, halagos que la hagan sonreír." }
];

const LOADING_STEPS = [
  "Cupido está buscando su arco mágico... 💘",
  "Anto capturando sus pensamientos secretos... 💭",
  "Alineando los latidos de nuestros corazones... 💕",
  "Tinta de fresa y poesía fluyendo... ✍️",
  "Sellando el sobre con un beso virtual... 💋"
];

export default function CupidAI() {
  const [selectedMood, setSelectedMood] = useState(MOODS_LIST[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadStepIndex, setLoadStepIndex] = useState(0);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [letterSaved, setLetterSaved] = useState(false);
  
  const [savedLetters, setSavedLetters] = useState<SavedCupidLetter[]>(() => {
    const raw = localStorage.getItem("ali_saved_letters");
    return raw ? JSON.parse(raw) : [];
  });
  
  const [viewedSavedLetter, setViewedSavedLetter] = useState<SavedCupidLetter | null>(null);

  // Interval rotation for loading steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Request letter from Express backend using server-side Gemini
  const handleGenerateLetter = async () => {
    setIsLoading(true);
    setLoadStepIndex(0);
    setGeneratedLetter(null);
    setLetterSaved(false);

    try {
      const response = await fetch("/api/cupid/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood.text,
          moodLabel: selectedMood.label
        })
      });

      const data = await response.json();
      if (data.success && data.letterText) {
        setGeneratedLetter(data.letterText);
      } else {
        setGeneratedLetter(`¡Oh, no! Cupido tropezó en las nubes de camino a ti. 🏹\n\nRespuesta del servidor: ${data.error || "Error desconocido"}.\n\nPor favor, verifica que tu Secret API Key de Gemini esté configurada adecuadamente.`);
      }
    } catch (err: any) {
      console.error(err);
      setGeneratedLetter("Cupido no pudo sintonizar tu señal de amor. Intenta de nuevo más tarde o verifica la terminal de comandos del servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLetter = () => {
    if (!generatedLetter) return;

    const newSaved: SavedCupidLetter = {
      id: `letter-${Date.now()}`,
      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      mood: selectedMood.text,
      moodLabel: selectedMood.label,
      letterText: generatedLetter
    };

    const updated = [newSaved, ...savedLetters];
    setSavedLetters(updated);
    localStorage.setItem("ali_saved_letters", JSON.stringify(updated));
    setLetterSaved(true);
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás segura de borrar esta carta de tu buzón secreto? 🥺")) {
      const filtered = savedLetters.filter((l) => l.id !== id);
      setSavedLetters(filtered);
      localStorage.setItem("ali_saved_letters", JSON.stringify(filtered));
      if (viewedSavedLetter?.id === id) {
        setViewedSavedLetter(null);
      }
    }
  };

  return (
    <div id="cupid-ai-tab" className="flex flex-col space-y-6 pb-24">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl border border-love-100 p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 animate-heart-pulse">
            <Sparkles size={20} className="fill-rose-100 text-rose-500" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-gray-800">
              Cartas a Pichis por Cupido AI 💘
            </h2>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Invocaremos a un Cupido inteligente que conoce el corazón de tu novio Anto para escribirte una carta mágica según cómo te sientas ahora de tener un novio tan enamorado.
            </p>
          </div>
        </div>

        {/* Mood Selector Panel */}
        {!generatedLetter && !isLoading && (
          <div id="mood-picker-section" className="space-y-4 mt-6">
            <span className="text-xs font-semibold text-gray-700 block">
              ¿Cómo te sientes en este instante, mi niñaa peshosha? 🌸
            </span>
            
            <div className="flex flex-col space-y-2">
              {MOODS_LIST.map((mood) => (
                <button
                  key={mood.id}
                  id={`mood-btn-${mood.id}`}
                  onClick={() => setSelectedMood(mood)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    selectedMood.id === mood.id
                      ? "bg-love-50 border-love-500 font-semibold text-love-800 shadow-sm"
                      : "bg-white border-gray-100 hover:bg-gray-50/50 hover:border-love-200 text-gray-600"
                  }`}
                >
                  <span>{mood.label}</span>
                  {selectedMood.id === mood.id && (
                    <Heart className="fill-love-500 text-love-600" size={14} />
                  )}
                </button>
              ))}
            </div>

            <button
              id="generate-letter-btn"
              onClick={handleGenerateLetter}
              className="w-full py-3 bg-gradient-to-tr from-love-600 to-rose-500 hover:from-love-700 hover:to-rose-600 text-white font-sans font-bold text-xs rounded-2xl flex items-center justify-center space-x-2 shadow-[0_5px_15px_rgba(244,63,94,0.15)] transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>Redactar mi Carta Mágica ✨</span>
            </button>
          </div>
        )}

        {/* Loading overlay panel */}
        {isLoading && (
          <div id="cupid-loading-screen" className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-love-50 border border-love-200 flex items-center justify-center animate-[heartPulse_1.5s_infinite]">
              <Mail className="text-love-500" size={28} />
            </div>
            
            <div className="space-y-1">
              <span className="font-serif text-sm font-bold text-love-700 block">
                Pluma dorada en Movimiento...
              </span>
              <p className="font-sans text-xs text-gray-400 font-medium h-6 animate-pulse transition-all">
                {LOADING_STEPS[loadStepIndex]}
              </p>
            </div>
          </div>
        )}

        {/* Success output message */}
        {generatedLetter && !isLoading && (
          <div id="cupid-success-screen" className="space-y-5 mt-4">
            <div className="bg-gradient-to-br from-love-50/40 via-white to-pink-50/30 border border-love-200 rounded-3xl p-5 relative shadow-inner">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-love-600 text-white rounded-full text-[9px] font-sans font-bold">
                CARTA COMPUESTA CON AMOR
              </div>
              
              <div 
                id="typewritten-content" 
                className="font-serif text-xs text-gray-700 leading-relaxed whitespace-pre-line pt-2"
              >
                {generatedLetter}
              </div>
            </div>

            {/* Post letter selection controls */}
            <div className="flex space-x-2 justify-center">
              <button
                id="redo-cupid-btn"
                onClick={() => setGeneratedLetter(null)}
                className="flex-1 py-3 border border-love-200 hover:border-love-500 rounded-2xl text-xs font-bold text-love-700 transition-colors cursor-pointer"
              >
                Escribir Otra
              </button>
              
              {!letterSaved ? (
                <button
                  id="save-cupid-btn"
                  onClick={handleSaveLetter}
                  className="flex-1 py-3 bg-love-600 hover:bg-love-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <BookmarkCheck size={14} />
                  <span>Guardar en Buzón Box</span>
                </button>
              ) : (
                <div className="flex-1 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-[11px] font-bold flex items-center justify-center space-x-1 py-2">
                  <span>✨ Guardada con Éxito</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Persistent MailBox Envelopes Reader (Saved Letters) */}
      <div id="mailbox-box" className="bg-white rounded-3xl border border-love-100 p-6 shadow-sm">
        <div className="flex items-center space-x-2.5 mb-4">
          <Inbox className="text-love-500" size={18} />
          <h3 className="font-serif text-sm font-bold text-gray-800 tracking-wide">
            Mi Buzón Secreto de Cartas Guardadas ({savedLetters.length})
          </h3>
        </div>

        {savedLetters.length === 0 ? (
          <div id="mailbox-empty" className="text-center py-8 bg-gray-50/60 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-400 font-medium italic">
              Tu buzón de cartas con Antonio está vacío todavía. ¡Siembra una carta en los estados de ánimo de arriba!
            </p>
          </div>
        ) : (
          <div id="mailbox-list" className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedLetters.map((letter) => (
              <div
                key={letter.id}
                id={`envelope-card-${letter.id}`}
                onClick={() => setViewedSavedLetter(letter)}
                className="p-3.5 bg-gradient-to-r from-love-50/30 to-pink-50/40 border border-love-100 cursor-pointer rounded-2xl hover:border-love-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-white border border-love-200 rounded-xl text-love-500 flex-shrink-0 animate-heart-pulse">
                    <MailOpen size={14} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-[11px] font-bold text-gray-800 tracking-wide truncate">
                      {letter.moodLabel}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-medium tracking-tight">
                      {letter.date}
                    </span>
                  </div>
                </div>

                <button
                  id={`del-saved-letter-${letter.id}`}
                  onClick={(e) => handleDeleteSaved(letter.id, e)}
                  className="p-1 text-gray-300 hover:text-red-500 rounded-lg hover:bg-white border hover:border-red-100 transition-colors"
                  title="Eliminar de mi buzón"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader overlay modal for viewing saved messages */}
      {viewedSavedLetter && (
        <div 
          id="saved-letter-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setViewedSavedLetter(null)}
        >
          <div 
            id="saved-letter-popup"
            className="w-full max-w-md bg-gradient-to-br from-love-50 via-white to-white rounded-3xl border border-love-200 p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 right-0 flex justify-end z-10">
              <button
                id="close-saved-lettermodal"
                onClick={() => setViewedSavedLetter(null)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-love-100 text-love-700 font-bold text-xs shadow-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-center mb-4">
              <span className="inline-block bg-love-600 text-white text-[9px] font-sans font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
                MEMORIA DE CUPIDO
              </span>
              <h4 className="font-serif text-sm font-bold text-gray-800">
                {viewedSavedLetter.moodLabel}
              </h4>
              <p className="text-[9px] text-gray-400 font-sans mt-0.5">
                Guardada el {viewedSavedLetter.date}
              </p>
            </div>

            <div className="border-t border-love-100 pt-4 font-serif text-xs leading-relaxed text-gray-700 whitespace-pre-line mb-6">
              {viewedSavedLetter.letterText}
            </div>

            <div className="text-center">
              <button
                id="confirm-saved-lettermodal"
                onClick={() => setViewedSavedLetter(null)}
                className="px-6 py-2 bg-love-600 hover:bg-love-700 text-white font-sans font-bold text-xs rounded-full shadow-md"
              >
                Volver a guardar en el Buzón 📬
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

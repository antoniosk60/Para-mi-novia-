import React, { useState } from "react";
import { Flower, Droplet, Plus, Heart, HelpCircle, Sparkles, Trash2 } from "lucide-react";
import { PlantedFlower } from "../types";
import { FLOWER_SPECIES } from "../data/romanticData";

export default function Garden() {
  const [plantedFlowers, setPlantedFlowers] = useState<PlantedFlower[]>(() => {
    const raw = localStorage.getItem("ali_planted_flowers");
    if (raw) return JSON.parse(raw);
    
    // Default initial flower pre-seeded so her garden is active on first loading!
    const defaultFlower: PlantedFlower = {
      id: "flower-default",
      type: "rose",
      name: "Rosita Consentida",
      plantedAt: new Date().toLocaleDateString("es-ES"),
      growthStage: 3, // Already blooming!
      color: "from-rose-500 to-red-600",
      loveNote: "Pichis, eres el destello de luz que ilumina incluso mis días más oscuros. 🌹"
    };
    return [defaultFlower];
  });

  const [selectedSpecies, setSelectedSpecies] = useState(FLOWER_SPECIES[0]);
  const [customName, setCustomName] = useState("");
  const [activeNoteModal, setActiveNoteModal] = useState<string | null>(null);
  const [triggerPlantForm, setTriggerPlantForm] = useState(false);

  // Sync with localStorage
  const saveFlowers = (newList: PlantedFlower[]) => {
    setPlantedFlowers(newList);
    localStorage.setItem("ali_planted_flowers", JSON.stringify(newList));
  };

  // Handles planting action
  const plantFlower = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = customName.trim() || `Mi ${selectedSpecies.name.split(" ")[0]}`;
    
    // Select a random sweet message associated with this species
    const randMsg = selectedSpecies.messages[Math.floor(Math.random() * selectedSpecies.messages.length)];

    const newFlower: PlantedFlower = {
      id: `flower-${Date.now()}`,
      type: selectedSpecies.type,
      name: finalName,
      plantedAt: new Date().toLocaleDateString("es-ES"),
      growthStage: 0, // Starts as a tiny seed!
      color: selectedSpecies.color,
      loveNote: randMsg
    };

    const updated = [newFlower, ...plantedFlowers];
    saveFlowers(updated);
    setCustomName("");
    setTriggerPlantForm(false);
  };

  // Water/Grow flower interaction
  const waterFlower = (id: string) => {
    const updated = plantedFlowers.map((f) => {
      if (f.id === id) {
        if (f.growthStage < 4) {
          const nextStage = f.growthStage + 1;
          
          // Trigger water float emojis
          for (let i = 0; i < 4; i++) {
            const drop = document.createElement("div");
            drop.innerHTML = "💧";
            drop.className = "fixed pointer-events-none text-md z-50 float-heart-custom";
            drop.style.left = `${Math.random() * 80 + 10}vw`;
            drop.style.bottom = "12vh";
            drop.style.animation = `floatUp ${1.5 + Math.random() * 1.5}s ease-out forwards`;
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 3000);
          }

          return { ...f, growthStage: nextStage };
        }
      }
      return f;
    });
    saveFlowers(updated);
  };

  // Deletes a flower
  const digUpFlower = (id: string) => {
    if (confirm("¿Estás segura de que quieres retirar esta flor de tu jardín? 🥺")) {
      const filtered = plantedFlowers.filter((f) => f.id !== id);
      saveFlowers(filtered);
    }
  };

  // Helper code for flower rendering representations
  const getGrowthVisuals = (stage: number, type: string) => {
    switch (stage) {
      case 0:
        return {
          emoji: "🌱",
          label: "Semilla bajo tierra",
          style: "scale-75 brightness-75 duration-300 animate-pulse",
          heightClass: "h-4 w-4 bg-amber-700/80 rounded-full mx-auto"
        };
      case 1:
        return {
          emoji: "🌱",
          label: "Brote de amor",
          style: "scale-90 text-green-500 scale-y-110",
          heightClass: "h-8 w-1.5 bg-green-400 mx-auto"
        };
      case 2:
        return {
          emoji: "🌿",
          label: "Capullo creciendo",
          style: "scale-95 text-green-600 font-semibold",
          heightClass: "h-14 w-2 bg-green-500 mx-auto rounded-t"
        };
      case 3:
        const specBloom = FLOWER_SPECIES.find((s) => s.type === type);
        return {
          emoji: specBloom ? specBloom.bloomShape : "🌹",
          label: "¡Flor Resplandeciente!",
          style: "scale-110 text-3xl hover:rotate-6 duration-300 cursor-pointer animate-bounce",
          heightClass: "h-20 w-2.5 bg-gradient-to-t from-green-600 to-green-500 mx-auto rounded-t relative"
        };
      case 4:
        const goldenBloom = FLOWER_SPECIES.find((s) => s.type === type);
        return {
          emoji: `${goldenBloom ? goldenBloom.bloomShape : "🌹"}✨`,
          label: "¡Esplendor de Amor Dorado!",
          style: "scale-125 text-4xl duration-500 cursor-pointer hover:rotate-12 animate-[heartPulse_3s_infinite_ease-in-out]",
          heightClass: "h-22 w-3 bg-gradient-to-t from-green-700 via-green-600 to-emerald-500 mx-auto rounded-t relative shadow-[0_0_15px_rgba(250,204,21,0.3)]"
        };
      default:
        return { emoji: "🌱", label: "Creciendo", style: "", heightClass: "h-4" };
    }
  };

  return (
    <div id="garden-tab" className="relative flex flex-col space-y-6 pb-24">
      
      {/* Garden Header */}
      <div className="bg-white border border-love-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-green-50 text-green-600 rounded-2xl border border-green-100">
            <Flower size={20} />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-gray-800">
              El Jardín Secreto de las Flores
            </h2>
            <p className="font-sans text-xs text-gray-400">
              Siembra flores mágicas y rústicas. ¡Riégalas con gotitas de cariño para revelas confesiones ocultas de Antonio!
            </p>
          </div>
        </div>

        {/* Plant New Trigger Button */}
        {!triggerPlantForm && (
          <button
            id="open-planting-btn"
            onClick={() => setTriggerPlantForm(true)}
            className="w-full mt-4 py-3 border-2 border-dashed border-love-200 hover:border-love-500 rounded-2xl flex items-center justify-center space-x-2 text-xs font-semibold text-love-700 hover:bg-love-50/50 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Sembrar Nueva Flor</span>
          </button>
        )}

        {/* Plant Form Modal/Collapse Toggle */}
        {triggerPlantForm && (
          <form 
            id="planting-flower-form"
            onSubmit={plantFlower} 
            className="mt-4 p-4 border border-love-100 rounded-2xl bg-love-50/20 space-y-3 animate-heart-pulse shadow-inner"
          >
            <div className="text-xs font-semibold text-gray-700">
              1. Selecciona el Tipo de Semilla
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {FLOWER_SPECIES.map((species) => (
                <button
                  key={species.type}
                  type="button"
                  id={`select-species-${species.type}`}
                  onClick={() => setSelectedSpecies(species)}
                  className={`p-2.5 rounded-xl border flex items-center space-x-2 text-left transition-all cursor-pointer ${
                    selectedSpecies.type === species.type
                      ? "bg-white border-love-500 shadow-sm ring-1 ring-love-200"
                      : "bg-white/60 border-gray-100 opacity-75 grayscale-25 hover:opacity-100"
                  }`}
                >
                  <span className="text-xl">{species.bloomShape}</span>
                  <span className="text-[11px] font-medium leading-tight text-gray-800">
                    {species.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-gray-400 italic font-sans leading-tight bg-white p-2.5 rounded-xl border border-love-100">
              {selectedSpecies.description}
            </div>

            <div className="space-y-1">
              <label htmlFor="flower-name-input" className="text-xs font-semibold text-gray-700 block">
                2. Ponle un Nombre Dulce (Opcional)
              </label>
              <input
                id="flower-name-input"
                type="text"
                placeholder="Ej. Mi Rosita de Fresa, Girasol Feliz..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={20}
                className="w-full text-xs font-medium px-3 py-2 bg-white border border-love-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-love-500"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                id="cancel-planting-btn"
                onClick={() => setTriggerPlantForm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="confirm-planting-btn"
                className="flex-1 py-2 bg-love-500 text-white rounded-xl text-[11px] font-bold hover:bg-love-600 shadow-sm cursor-pointer"
              >
                Siembra Semilla 🌱
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Flower Bed Layout */}
      {plantedFlowers.length === 0 ? (
        <div id="empty-garden-view" className="text-center p-12 bg-white rounded-3xl border border-love-100">
          <p className="text-sm font-medium text-gray-400 italic">
            Aún no has sembrado florecitas. ¡Utiliza la sección de arriba para comenzar a poblar tu jardín mágico, Ali! 🥀
          </p>
        </div>
      ) : (
        <div 
          id="flower-bed-grid"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {plantedFlowers.map((flower) => {
            const speciesInfo = FLOWER_SPECIES.find((s) => s.type === flower.type) || FLOWER_SPECIES[0];
            const visual = getGrowthVisuals(flower.growthStage, flower.type);
            const isFullyGrown = flower.growthStage >= 3;

            return (
              <div
                key={flower.id}
                id={`flower-card-${flower.id}`}
                className="bg-white border border-love-100 rounded-3xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                {/* Dig Up/Delete Hover Trigger */}
                <button
                  id={`dig-flower-btn-${flower.id}`}
                  onClick={() => digUpFlower(flower.id)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors z-10"
                  title="Arrancar flor"
                >
                  <Trash2 size={12} />
                </button>

                {/* Name & Stamp */}
                <div className="text-center mb-4">
                  <h4 className="font-serif text-sm font-bold text-gray-800 leading-tight truncate">
                    {flower.name}
                  </h4>
                  <p className="text-[9px] text-gray-400 font-sans mt-0.5">
                    Sembrada: {flower.plantedAt}
                  </p>
                </div>

                {/* Growth Stage Visualization Canvas */}
                <div 
                  id={`growth-canvas-${flower.id}`}
                  className="relative h-32 flex flex-col justify-end mb-4 border-b border-dashed border-gray-100 pb-2 cursor-pointer"
                  onClick={() => isFullyGrown ? setActiveNoteModal(flower.loveNote) : waterFlower(flower.id)}
                >
                  {/* Floating click prompt guides */}
                  {!isFullyGrown && (
                    <div className="absolute top-0 left-0 right-0 text-center animate-bounce">
                      <span className="bg-love-50 text-love-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-love-100">
                        💧 RIEGAME
                      </span>
                    </div>
                  )}

                  {isFullyGrown && (
                    <div className="absolute top-0 left-0 right-0 text-center">
                      <span className="bg-amber-100 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-amber-200 flex items-center justify-center gap-0.5 max-w-fit mx-auto">
                        <Sparkles size={8} className="fill-amber-300 text-amber-500 animate-spin" />
                        LEER CONFESIÓN
                      </span>
                    </div>
                  )}

                  {/* Actual flower emojis & dynamic plant stems */}
                  <div className="text-center relative z-10 mt-auto">
                    <span id={`plant-emoji-${flower.id}`} className={`block transform transition-transform ${visual.style}`}>
                      {visual.emoji}
                    </span>
                  </div>

                  {/* Dynamic Stem sizes depending on Growth Stages */}
                  <div id={`plant-stem-${flower.id}`} className={`transition-all duration-500 ${visual.heightClass}`}>
                    {/* Flower Leaves indicators */}
                    {flower.growthStage >= 2 && (
                      <>
                        <span className="absolute left-1/2 -translate-x-5 bottom-1/2 text-[10px]">🍃</span>
                        <span className="absolute right-1/2 translate-x-5 bottom-1/3 text-[10px]">🍃</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Controller bottom area */}
                <div id={`flower-ctrl-${flower.id}`} className="mt-auto">
                  <div className="text-center text-[9px] text-gray-400 font-medium tracking-wide bg-gray-50 py-1.5 rounded-xl border border-gray-100">
                    Fase: {visual.label}
                  </div>
                  
                  {flower.growthStage < 4 ? (
                    <button
                      id={`water-action-btn-${flower.id}`}
                      onClick={() => waterFlower(flower.id)}
                      className="w-full mt-2 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-100 hover:border-sky-200 text-sky-700 text-[10px] font-bold rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <Droplet size={11} className="fill-sky-300" />
                      <span>Regar gotita de amor</span>
                    </button>
                  ) : (
                    <button
                      id={`look-action-btn-${flower.id}`}
                      onClick={() => setActiveNoteModal(flower.loveNote)}
                      className="w-full mt-2 py-1.5 bg-love-50 hover:bg-love-100 border border-love-100 hover:border-love-200 text-love-700 text-[10px] font-bold rounded-xl flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <Heart size={11} className="fill-love-300" />
                      <span>Leer carta interior</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Flower Love Note Reader Modal Popup overlay */}
      {activeNoteModal && (
        <div 
          id="flower-note-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveNoteModal(null)}
        >
          <div 
            id="flower-modal-popup"
            className="w-full max-w-sm bg-gradient-to-br from-love-50 to-white rounded-3xl border border-love-200 p-6 shadow-2xl relative animate-[heartPulse_3.5s_infinite] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4">
              <button
                id="close-flower-notemodal"
                onClick={() => setActiveNoteModal(null)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-love-100 text-love-700 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="w-14 h-14 rounded-full bg-love-100 outline-pink-200 flex items-center justify-center mx-auto mb-4">
              <Heart className="fill-love-500 text-love-600" size={26} />
            </div>

            <h3 className="font-display text-base font-bold text-love-800 tracking-wide mb-2">
              Mensaje Secreto del Pétalo
            </h3>
            
            <p className="font-serif text-sm text-gray-700 leading-relaxed italic mb-5">
              "{activeNoteModal}"
            </p>

            <button
              id="accept-notemodal-btn"
              onClick={() => setActiveNoteModal(null)}
              className="px-6 py-2 bg-love-600 hover:bg-love-700 text-white font-sans font-bold text-xs rounded-full shadow-md cursor-pointer"
            >
              Cerrar en mi corazón 💞
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export interface MemoryCard {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'romantic' | 'adventure' | 'funny' | 'cozy';
  imageUrl: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  emoji: string;
}

export interface PlantedFlower {
  id: string;
  type: 'rose' | 'tulip' | 'sunflower' | 'orchid';
  name: string;
  plantedAt: string;
  growthStage: number; // 0 = Seed, 1 = Sprout, 2 = Bud, 3 = Blooming, 4 = Golden Bloom
  color: string;
  loveNote: string;
}

export interface SavedCupidLetter {
  id: string;
  date: string;
  mood: string;
  moodLabel: string;
  letterText: string;
}

export interface RomanticQuote {
  text: string;
  author: string;
}


export enum Element {
  Fire = 'Fire',
  Earth = 'Earth',
  Air = 'Air',
  Water = 'Water'
}

export enum Modality {
  Cardinal = 'Cardinal',
  Fixed = 'Fixed',
  Mutable = 'Mutable'
}

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: Element;
  modality: Modality;
  ruler: string;
  description: string;
}

export interface AstrologicalHouse {
  id: number;
  keyword: string;
  description: string;
  naturalRuler: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  symbol: string;
  type: 'Planet' | 'Asteroid' | 'Point';
  description: string;
  astrologicalSignificance: string;
}

export interface Aspect {
  name: string;
  symbol: string;
  angle: number;
  nature: 'Harmonious' | 'Challenging' | 'Neutral';
  description: string;
}

export interface Position {
  bodyId: string;
  signId: string;
  houseId: number;
  degree: number;
}

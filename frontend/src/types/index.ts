// Placeholder - будет заменен полными типами
export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'studio' | 'house';
  status: 'available' | 'reserved' | 'sold';
  price: number;
  // ... остальные поля будут добавлены
}

export interface Complex {
  id: string;
  name: string;
  // ... остальные поля будут добавлены
}

export type ViewMode = 'properties' | 'complexes';

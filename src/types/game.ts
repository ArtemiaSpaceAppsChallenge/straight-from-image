export type HabitatType = 'lunar' | 'mars' | 'orbital';
export type HabitatShape = 'cylinder' | 'sphere' | 'dome' | 'modular';
export type RoomType = 
  | 'sleep' 
  | 'hygiene' 
  | 'exercise' 
  | 'food' 
  | 'medical' 
  | 'research' 
  | 'storage' 
  | 'life-support' 
  | 'recreation' 
  | 'communication'
  | 'maintenance'
  | 'airlock';

export type CrewMood = 'happy' | 'neutral' | 'stressed' | 'exhausted';
export type CrewStatus = 'working' | 'sleeping' | 'eating' | 'exercising' | 'relaxing';

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface Dimensions {
  width: number;
  height: number;
  depth?: number;
}

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  position: Position;
  dimensions: Dimensions;
  isValid: boolean;
  requiredArea: number;
  actualArea: number;
  adjacentRooms: string[];
  incompatibleWith: RoomType[];
  objects: PlacedObject[];
  noiseLevel: number;
}

export interface PlacedObject {
  id: string;
  type: ObjectType;
  position: Position;
  rotation: number;
}

export interface ObjectType {
  id: string;
  name: string;
  category: 'furniture' | 'equipment' | 'storage' | 'decoration';
  dimensions: Dimensions;
  roomTypes: RoomType[];
  icon: string;
  model?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  position: Position;
  status: CrewStatus;
  mood: CrewMood;
  health: number;
  energy: number;
  hunger: number;
  hygiene: number;
  skills: {
    engineering: number;
    medical: number;
    science: number;
  };
  currentRoom?: string;
  avatar: string;
}

export interface HabitatDesign {
  id: string;
  name: string;
  type: HabitatType;
  shape: HabitatShape;
  dimensions: Dimensions;
  maxVolume: number;
  usedVolume: number;
  rooms: Room[];
  crewSize: number;
  missionDuration: number; // in days
  complianceScore: number;
  validationErrors: string[];
  createdAt: Date;
  lastModified: Date;
}

export interface Resources {
  oxygen: number;
  water: number;
  power: number;
  food: number;
}

export interface GameState {
  isLoading: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  habitat: HabitatDesign | null;
  crew: CrewMember[];
  resources: Resources;
  daysPassed: number;
  score: number;
  level: number;
  tutorial: {
    active: boolean;
    step: number;
  };
  selectedRoom: string | null;
  selectedObject: string | null;
  camera: {
    zoom: number;
    rotation: number;
    position: Position;
  };
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  check: (habitat: HabitatDesign) => boolean;
  severity: 'error' | 'warning' | 'info';
}

export interface MissionScenario {
  id: string;
  name: string;
  description: string;
  habitatType: HabitatType;
  crewSize: number;
  missionDuration: number;
  objectives: string[];
  constraints: {
    maxVolume: number;
    budgetLimit: number;
    requiredRooms: RoomType[];
  };
}

import { RoomType, ObjectType } from '@/types/game';

export const ROOM_REQUIREMENTS: Record<RoomType, {
  minArea: number; // square meters per crew member
  requiredAdjacent?: RoomType[];
  incompatibleWith?: RoomType[];
  noiseLevel: number; // 1-5
  description: string;
}> = {
  'sleep': {
    minArea: 4.5,
    incompatibleWith: ['exercise', 'maintenance', 'life-support'],
    noiseLevel: 1,
    description: 'Quiet sleeping quarters for crew rest'
  },
  'hygiene': {
    minArea: 2.5,
    requiredAdjacent: ['sleep'],
    incompatibleWith: ['food', 'research'],
    noiseLevel: 2,
    description: 'Bathroom and hygiene facilities'
  },
  'exercise': {
    minArea: 5,
    incompatibleWith: ['sleep', 'medical'],
    noiseLevel: 4,
    description: 'Fitness equipment and exercise area'
  },
  'food': {
    minArea: 3,
    requiredAdjacent: ['storage'],
    incompatibleWith: ['hygiene', 'maintenance'],
    noiseLevel: 3,
    description: 'Food preparation and dining area'
  },
  'medical': {
    minArea: 4,
    incompatibleWith: ['exercise'],
    noiseLevel: 1,
    description: 'Medical care and health monitoring'
  },
  'research': {
    minArea: 6,
    incompatibleWith: ['hygiene'],
    noiseLevel: 2,
    description: 'Scientific research and experiments'
  },
  'storage': {
    minArea: 2,
    noiseLevel: 1,
    description: 'Equipment and supply storage'
  },
  'life-support': {
    minArea: 8,
    incompatibleWith: ['sleep'],
    noiseLevel: 3,
    description: 'Environmental control systems'
  },
  'recreation': {
    minArea: 5,
    noiseLevel: 3,
    description: 'Crew relaxation and entertainment'
  },
  'communication': {
    minArea: 3,
    noiseLevel: 2,
    description: 'Communications equipment'
  },
  'maintenance': {
    minArea: 4,
    incompatibleWith: ['sleep', 'food'],
    noiseLevel: 4,
    description: 'Tools and repair workspace'
  },
  'airlock': {
    minArea: 3,
    noiseLevel: 2,
    description: 'Entry/exit and suit storage'
  }
};

export const HABITAT_OBJECTS: ObjectType[] = [
  // Sleep furniture
  {
    id: 'bed-single',
    name: 'Sleep Pod',
    category: 'furniture',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['sleep'],
    icon: '🛏️'
  },
  {
    id: 'locker',
    name: 'Personal Locker',
    category: 'storage',
    dimensions: { width: 0.6, height: 2, depth: 0.6 },
    roomTypes: ['sleep', 'airlock'],
    icon: '🗄️'
  },
  
  // Hygiene
  {
    id: 'shower',
    name: 'Water Recycling Shower',
    category: 'equipment',
    dimensions: { width: 1, height: 2.5, depth: 1 },
    roomTypes: ['hygiene'],
    icon: '🚿'
  },
  {
    id: 'toilet',
    name: 'Waste Management System',
    category: 'equipment',
    dimensions: { width: 0.8, height: 1, depth: 0.8 },
    roomTypes: ['hygiene'],
    icon: '🚽'
  },
  
  // Exercise
  {
    id: 'treadmill',
    name: 'Exercise Treadmill',
    category: 'equipment',
    dimensions: { width: 1, height: 1.5, depth: 2 },
    roomTypes: ['exercise'],
    icon: '🏃'
  },
  {
    id: 'weights',
    name: 'Resistance Equipment',
    category: 'equipment',
    dimensions: { width: 1.5, height: 1, depth: 1.5 },
    roomTypes: ['exercise'],
    icon: '🏋️'
  },
  
  // Food
  {
    id: 'galley',
    name: 'Food Preparation Station',
    category: 'equipment',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['food'],
    icon: '🍳'
  },
  {
    id: 'dining-table',
    name: 'Dining Table',
    category: 'furniture',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['food', 'recreation'],
    icon: '🍽️'
  },
  {
    id: 'food-storage',
    name: 'Food Storage Unit',
    category: 'storage',
    dimensions: { width: 1, height: 2, depth: 0.8 },
    roomTypes: ['food', 'storage'],
    icon: '📦'
  },
  
  // Medical
  {
    id: 'medical-bed',
    name: 'Medical Examination Table',
    category: 'equipment',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['medical'],
    icon: '🏥'
  },
  {
    id: 'medical-cabinet',
    name: 'Medical Supply Cabinet',
    category: 'storage',
    dimensions: { width: 1, height: 2, depth: 0.5 },
    roomTypes: ['medical'],
    icon: '💊'
  },
  
  // Research
  {
    id: 'lab-bench',
    name: 'Research Workstation',
    category: 'equipment',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['research'],
    icon: '🔬'
  },
  {
    id: 'plant-growth',
    name: 'Plant Growth Chamber',
    category: 'equipment',
    dimensions: { width: 1.5, height: 2, depth: 1 },
    roomTypes: ['research'],
    icon: '🌱'
  },
  {
    id: 'computer-station',
    name: 'Computer Terminal',
    category: 'equipment',
    dimensions: { width: 1, height: 1.5, depth: 0.8 },
    roomTypes: ['research', 'communication', 'medical'],
    icon: '💻'
  },
  
  // Storage
  {
    id: 'cargo-rack',
    name: 'Cargo Storage Rack',
    category: 'storage',
    dimensions: { width: 2, height: 3, depth: 1 },
    roomTypes: ['storage'],
    icon: '📦'
  },
  {
    id: 'supply-bag',
    name: 'Supply Bag',
    category: 'storage',
    dimensions: { width: 0.5, height: 0.5, depth: 0.5 },
    roomTypes: ['storage', 'airlock'],
    icon: '🎒'
  },
  
  // Life Support
  {
    id: 'oxygen-generator',
    name: 'Oxygen Generation System',
    category: 'equipment',
    dimensions: { width: 1.5, height: 2, depth: 1.5 },
    roomTypes: ['life-support'],
    icon: '⚗️'
  },
  {
    id: 'water-recycler',
    name: 'Water Recycling System',
    category: 'equipment',
    dimensions: { width: 1.5, height: 2, depth: 1.5 },
    roomTypes: ['life-support'],
    icon: '💧'
  },
  {
    id: 'air-filter',
    name: 'Air Filtration Unit',
    category: 'equipment',
    dimensions: { width: 1, height: 1.5, depth: 1 },
    roomTypes: ['life-support'],
    icon: '🌬️'
  },
  
  // Recreation
  {
    id: 'entertainment-screen',
    name: 'Entertainment Display',
    category: 'equipment',
    dimensions: { width: 2, height: 1.5, depth: 0.2 },
    roomTypes: ['recreation'],
    icon: '📺'
  },
  {
    id: 'game-table',
    name: 'Game Table',
    category: 'furniture',
    dimensions: { width: 1.5, height: 1, depth: 1.5 },
    roomTypes: ['recreation'],
    icon: '🎮'
  },
  {
    id: 'reading-area',
    name: 'Reading Nook',
    category: 'furniture',
    dimensions: { width: 1, height: 1.5, depth: 1 },
    roomTypes: ['recreation', 'sleep'],
    icon: '📚'
  },
  
  // Communication
  {
    id: 'comm-array',
    name: 'Communication Array',
    category: 'equipment',
    dimensions: { width: 1.5, height: 2, depth: 1 },
    roomTypes: ['communication'],
    icon: '📡'
  },
  
  // Maintenance
  {
    id: 'tool-cabinet',
    name: 'Tool Storage',
    category: 'storage',
    dimensions: { width: 1, height: 2, depth: 0.6 },
    roomTypes: ['maintenance'],
    icon: '🔧'
  },
  {
    id: 'workbench',
    name: 'Repair Workbench',
    category: 'equipment',
    dimensions: { width: 2, height: 1, depth: 1 },
    roomTypes: ['maintenance'],
    icon: '🛠️'
  },
  
  // Airlock
  {
    id: 'spacesuit',
    name: 'EVA Spacesuit',
    category: 'equipment',
    dimensions: { width: 0.8, height: 2, depth: 0.6 },
    roomTypes: ['airlock'],
    icon: '👨‍🚀'
  },
  {
    id: 'airlock-door',
    name: 'Pressure Door',
    category: 'equipment',
    dimensions: { width: 1.2, height: 2.5, depth: 0.3 },
    roomTypes: ['airlock'],
    icon: '🚪'
  },
  
  // Decorations
  {
    id: 'plant-pot',
    name: 'Decorative Plant',
    category: 'decoration',
    dimensions: { width: 0.4, height: 0.6, depth: 0.4 },
    roomTypes: ['recreation', 'food', 'sleep', 'medical'],
    icon: '🪴'
  },
  {
    id: 'photo-frame',
    name: 'Photo Frame',
    category: 'decoration',
    dimensions: { width: 0.3, height: 0.3, depth: 0.1 },
    roomTypes: ['sleep', 'recreation', 'food'],
    icon: '🖼️'
  },
  {
    id: 'window',
    name: 'Observation Window',
    category: 'decoration',
    dimensions: { width: 1.5, height: 1.5, depth: 0.2 },
    roomTypes: ['recreation', 'sleep', 'food'],
    icon: '🪟'
  }
];

export const CREW_NAMES = [
  'Alex Chen', 'Sarah Johnson', 'Marcus Rodriguez', 'Emma Wilson',
  'David Kim', 'Lisa Martinez', 'James Anderson', 'Nina Patel',
  'Tom Brooks', 'Maya Singh', 'Chris Taylor', 'Ana Santos'
];

export const MISSION_SCENARIOS = [
  {
    id: 'lunar-short',
    name: 'Lunar Outpost - Short Mission',
    description: 'Design a habitat for 4 crew members on a 30-day lunar mission',
    habitatType: 'lunar' as const,
    crewSize: 4,
    missionDuration: 30,
    objectives: [
      'Create sleeping quarters for 4 crew',
      'Include hygiene and exercise facilities',
      'Ensure life support systems are in place',
      'Maintain crew happiness above 70%'
    ],
    constraints: {
      maxVolume: 150,
      budgetLimit: 1000000,
      requiredRooms: ['sleep', 'hygiene', 'food', 'life-support', 'airlock'] as RoomType[]
    }
  },
  {
    id: 'mars-transit',
    name: 'Mars Transit Vehicle',
    description: 'Design a habitat for 6 crew members on a 6-month journey to Mars',
    habitatType: 'orbital' as const,
    crewSize: 6,
    missionDuration: 180,
    objectives: [
      'Create adequate living space for 6 crew',
      'Include exercise and recreation areas',
      'Ensure medical facilities are available',
      'Design for long-term crew mental health'
    ],
    constraints: {
      maxVolume: 300,
      budgetLimit: 2000000,
      requiredRooms: ['sleep', 'hygiene', 'food', 'exercise', 'medical', 'recreation', 'life-support'] as RoomType[]
    }
  },
  {
    id: 'mars-surface',
    name: 'Mars Surface Habitat',
    description: 'Design a permanent habitat for 8 crew members on Mars',
    habitatType: 'mars' as const,
    crewSize: 8,
    missionDuration: 500,
    objectives: [
      'Create a sustainable living environment',
      'Include research and maintenance facilities',
      'Design for crew comfort and productivity',
      'Ensure redundant life support systems'
    ],
    constraints: {
      maxVolume: 500,
      budgetLimit: 5000000,
      requiredRooms: ['sleep', 'hygiene', 'food', 'exercise', 'medical', 'research', 'recreation', 'life-support', 'maintenance', 'storage', 'airlock'] as RoomType[]
    }
  }
];

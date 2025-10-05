import { HabitatDesign, Room, CrewMember, ValidationRule } from '@/types/game';
import { ROOM_REQUIREMENTS } from './gameData';

export const validateHabitat = (habitat: HabitatDesign): string[] => {
  const errors: string[] = [];

  // Check if required rooms exist
  const roomTypes = new Set(habitat.rooms.map(r => r.type));
  const requiredRooms = ['sleep', 'hygiene', 'food', 'life-support'];
  
  requiredRooms.forEach(required => {
    if (!roomTypes.has(required as any)) {
      errors.push(`Missing required room: ${required}`);
    }
  });

  // Check room sizes
  habitat.rooms.forEach(room => {
    const requirements = ROOM_REQUIREMENTS[room.type];
    const minArea = requirements.minArea * habitat.crewSize;
    
    if (room.actualArea < minArea) {
      errors.push(`${room.name} is too small. Needs ${minArea}m² but has ${room.actualArea}m²`);
    }
  });

  // Check incompatible room adjacencies
  habitat.rooms.forEach(room => {
    const requirements = ROOM_REQUIREMENTS[room.type];
    if (requirements.incompatibleWith) {
      room.adjacentRooms.forEach(adjId => {
        const adjRoom = habitat.rooms.find(r => r.id === adjId);
        if (adjRoom && requirements.incompatibleWith?.includes(adjRoom.type)) {
          errors.push(`${room.name} should not be adjacent to ${adjRoom.name}`);
        }
      });
    }
  });

  // Check volume constraints
  if (habitat.usedVolume > habitat.maxVolume) {
    errors.push(`Habitat exceeds maximum volume: ${habitat.usedVolume}m³ > ${habitat.maxVolume}m³`);
  }

  return errors;
};

export const calculateComplianceScore = (habitat: HabitatDesign): number => {
  let score = 100;
  const errors = validateHabitat(habitat);
  
  // Deduct points for each error
  score -= errors.length * 10;
  
  // Bonus points for good design
  const roomTypes = new Set(habitat.rooms.map(r => r.type));
  
  // Bonus for recreation area
  if (roomTypes.has('recreation')) score += 5;
  
  // Bonus for medical facilities
  if (roomTypes.has('medical')) score += 5;
  
  // Bonus for research lab
  if (roomTypes.has('research')) score += 5;
  
  // Bonus for efficient space usage
  const efficiency = habitat.usedVolume / habitat.maxVolume;
  if (efficiency > 0.7 && efficiency < 0.95) {
    score += 10;
  }
  
  return Math.max(0, Math.min(100, score));
};

export const calculateCrewHappiness = (crew: CrewMember[], habitat: HabitatDesign): number => {
  if (crew.length === 0) return 100;
  
  const avgMood = crew.reduce((sum, member) => {
    const moodScore = {
      'happy': 100,
      'neutral': 70,
      'stressed': 40,
      'exhausted': 20
    }[member.mood];
    return sum + moodScore;
  }, 0) / crew.length;
  
  const avgHealth = crew.reduce((sum, m) => sum + m.health, 0) / crew.length;
  const avgEnergy = crew.reduce((sum, m) => sum + m.energy, 0) / crew.length;
  
  return (avgMood * 0.5 + avgHealth * 0.3 + avgEnergy * 0.2);
};

export const calculateResourceConsumption = (
  crew: CrewMember[],
  habitat: HabitatDesign,
  days: number
): { oxygen: number; water: number; power: number; food: number } => {
  const crewCount = crew.length;
  
  // Per crew member per day
  const dailyOxygen = 0.84; // kg
  const dailyWater = 3.6; // liters
  const dailyPower = 2.5; // kWh
  const dailyFood = 1.8; // kg
  
  return {
    oxygen: crewCount * dailyOxygen * days,
    water: crewCount * dailyWater * days,
    power: crewCount * dailyPower * days,
    food: crewCount * dailyFood * days
  };
};

export const updateCrewNeeds = (crew: CrewMember[], deltaTime: number): CrewMember[] => {
  return crew.map(member => {
    let { energy, hunger, hygiene, health, mood } = member;
    
    // Decrease needs over time
    if (member.status === 'working') {
      energy = Math.max(0, energy - deltaTime * 0.5);
      hunger = Math.max(0, hunger - deltaTime * 0.3);
      hygiene = Math.max(0, hygiene - deltaTime * 0.1);
    } else if (member.status === 'sleeping') {
      energy = Math.min(100, energy + deltaTime * 2);
    } else if (member.status === 'eating') {
      hunger = Math.min(100, hunger + deltaTime * 3);
    } else if (member.status === 'exercising') {
      energy = Math.max(0, energy - deltaTime * 1);
      health = Math.min(100, health + deltaTime * 0.5);
    }
    
    // Update mood based on needs
    const needsAvg = (energy + hunger + hygiene) / 3;
    if (needsAvg > 70) {
      mood = 'happy';
    } else if (needsAvg > 50) {
      mood = 'neutral';
    } else if (needsAvg > 30) {
      mood = 'stressed';
    } else {
      mood = 'exhausted';
    }
    
    // Health degrades if needs are not met
    if (needsAvg < 30) {
      health = Math.max(0, health - deltaTime * 0.2);
    }
    
    return {
      ...member,
      energy,
      hunger,
      hygiene,
      health,
      mood
    };
  });
};

export const generateCrewMember = (id: string, name: string): CrewMember => {
  return {
    id,
    name,
    position: { x: 0, y: 0, z: 0 },
    status: 'working',
    mood: 'neutral',
    health: 100,
    energy: 100,
    hunger: 100,
    hygiene: 100,
    skills: {
      engineering: Math.floor(Math.random() * 30) + 50,
      medical: Math.floor(Math.random() * 30) + 50,
      science: Math.floor(Math.random() * 30) + 50
    },
    avatar: `crew-${Math.floor(Math.random() * 6) + 1}`
  };
};

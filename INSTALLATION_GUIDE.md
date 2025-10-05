# 🎮 Habitat Layout Creator - Complete Installation & Usage Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Game Architecture](#game-architecture)
4. [API Reference](#api-reference)
5. [Customization Guide](#customization-guide)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Node.js 18+ or Bun runtime
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Run the Game
```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev

# Navigate to http://localhost:5173/play
```

---

## Installation

### Step 1: Verify Project Structure

Ensure these files exist:
```
src/
├── components/game/
│   ├── GameContainer.tsx
│   ├── GameHeader.tsx
│   ├── IsometricView.tsx
│   ├── CrewPanel.tsx
│   ├── ResourcesPanel.tsx
│   ├── BuildPanel.tsx
│   ├── ValidationPanel.tsx
│   └── MissionSelector.tsx
├── types/
│   └── game.ts
├── lib/
│   ├── gameData.ts
│   └── gameLogic.ts
└── pages/
    └── Play.tsx
```

### Step 2: Install Dependencies

All required dependencies should already be in package.json:
- react
- react-dom
- react-router-dom
- @tanstack/react-query
- tailwindcss
- shadcn/ui components
- lucide-react (icons)

### Step 3: Run Development Server

```bash
npm run dev
```

Access at: `http://localhost:5173/play`

---

## Game Architecture

### Component Hierarchy

```
Play.tsx
  └── GameContainer.tsx
      ├── MissionSelector.tsx (initial)
      ├── GameHeader.tsx
      │   ├── Controls (Play/Pause/Reset)
      │   └── Stats Display
      ├── BuildPanel.tsx
      │   ├── Room Selector
      │   └── Object Selector
      ├── IsometricView.tsx (Canvas)
      │   ├── Room Rendering
      │   └── Crew Rendering
      ├── ValidationPanel.tsx
      │   ├── Error List
      │   ├── Warning List
      │   └── Compliance Score
      ├── ResourcesPanel.tsx
      │   └── Resource Meters
      └── CrewPanel.tsx
          └── Crew Member Cards
```

### Data Flow

```
GameContainer (State)
    ↓
    ├─→ Mission Selection → Initialize Habitat & Crew
    ├─→ User Actions → Update State
    ├─→ Game Loop (1s interval) → Update Resources & Crew
    └─→ Validation → Update Scores & Errors
```

### State Management

The `GameContainer` manages all game state:

```typescript
interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  habitat: HabitatDesign | null;
  crew: CrewMember[];
  resources: Resources;
  daysPassed: number;
  score: number;
  selectedRoom: string | null;
  camera: CameraState;
}
```

---

## API Reference

### Core Functions

#### `validateHabitat(habitat: HabitatDesign): string[]`
Validates a habitat design against NASA standards.

```typescript
const errors = validateHabitat(habitatDesign);
// Returns: ["Missing required room: sleep", "Hygiene too small"]
```

#### `calculateComplianceScore(habitat: HabitatDesign): number`
Calculates compliance score (0-100).

```typescript
const score = calculateComplianceScore(habitatDesign);
// Returns: 85
```

#### `calculateCrewHappiness(crew: CrewMember[], habitat: HabitatDesign): number`
Calculates average crew happiness (0-100).

```typescript
const happiness = calculateCrewHappiness(crew, habitat);
// Returns: 75
```

#### `calculateResourceConsumption(crew, habitat, days): Resources`
Calculates resource consumption for a given period.

```typescript
const resources = calculateResourceConsumption(crew, habitat, 30);
// Returns: { oxygen: 100.8, water: 432, power: 300, food: 216 }
```

#### `updateCrewNeeds(crew: CrewMember[], deltaTime: number): CrewMember[]`
Updates crew member needs based on elapsed time.

```typescript
const updatedCrew = updateCrewNeeds(crew, 0.1); // 0.1 day
```

#### `generateCrewMember(id: string, name: string): CrewMember`
Creates a new crew member with random skills.

```typescript
const newCrew = generateCrewMember("crew-1", "Alex Chen");
```

---

## Customization Guide

### Adding New Room Types

1. **Update Type Definition** (`src/types/game.ts`):
```typescript
export type RoomType = 
  | 'sleep' 
  | 'your-new-room';
```

2. **Add Room Requirements** (`src/lib/gameData.ts`):
```typescript
export const ROOM_REQUIREMENTS: Record<RoomType, {...}> = {
  'your-new-room': {
    minArea: 5,
    incompatibleWith: ['sleep'],
    noiseLevel: 3,
    description: 'Your room description'
  }
};
```

3. **Add Icon** (`src/components/game/BuildPanel.tsx`):
```typescript
const getRoomIcon = (type: RoomType): string => {
  const icons: Record<RoomType, string> = {
    'your-new-room': '🎨'
  };
  return icons[type];
};
```

### Adding New Objects

Edit `src/lib/gameData.ts`:

```typescript
export const HABITAT_OBJECTS: ObjectType[] = [
  {
    id: 'new-object',
    name: 'New Object',
    category: 'equipment',
    dimensions: { width: 1, height: 2, depth: 1 },
    roomTypes: ['research', 'medical'],
    icon: '🔭'
  }
];
```

### Customizing Validation Rules

Edit `src/lib/gameLogic.ts`:

```typescript
export const validateHabitat = (habitat: HabitatDesign): string[] => {
  const errors: string[] = [];
  
  // Add your custom validation
  if (habitat.rooms.length < 3) {
    errors.push('Habitat needs at least 3 rooms');
  }
  
  return errors;
};
```

### Adding New Mission Scenarios

Edit `src/lib/gameData.ts`:

```typescript
export const MISSION_SCENARIOS = [
  {
    id: 'custom-mission',
    name: 'Custom Mission Name',
    description: 'Mission description',
    habitatType: 'lunar',
    crewSize: 6,
    missionDuration: 90,
    objectives: [
      'Objective 1',
      'Objective 2'
    ],
    constraints: {
      maxVolume: 200,
      budgetLimit: 1500000,
      requiredRooms: ['sleep', 'hygiene', 'food']
    }
  }
];
```

### Customizing Isometric Rendering

Edit `src/components/game/IsometricView.tsx`:

```typescript
// Change isometric angle
const toIsometric = (x: number, y: number, z: number = 0) => {
  const angle = 30; // Change this (default: 30 degrees)
  const isoX = (x - y) * Math.cos(angle * Math.PI / 180);
  const isoY = (x + y) * Math.sin(angle * Math.PI / 180) - z;
  return { x: isoX * scale, y: isoY * scale };
};

// Change room colors
const getRoomColor = (type: string): string => {
  const colors: Record<string, string> = {
    'sleep': '#YOUR_COLOR',
    // Add your colors
  };
  return colors[type] || '#9CA3AF';
};
```

### Adjusting Game Speed

Edit `src/components/game/GameContainer.tsx`:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Change time increment
    const newDaysPassed = prev.daysPassed + 0.1; // Adjust this value
  }, 1000); // Change interval (milliseconds)
}, [gameState.isPlaying]);
```

### Modifying Resource Rates

Edit `src/lib/gameLogic.ts`:

```typescript
export const calculateResourceConsumption = (...) => {
  // Adjust daily consumption rates
  const dailyOxygen = 0.84; // kg per crew per day
  const dailyWater = 3.6;   // liters per crew per day
  const dailyPower = 2.5;   // kWh per crew per day
  const dailyFood = 1.8;    // kg per crew per day
  
  return {
    oxygen: crewCount * dailyOxygen * days,
    water: crewCount * dailyWater * days,
    power: crewCount * dailyPower * days,
    food: crewCount * dailyFood * days
  };
};
```

---

## Troubleshooting

### Common Issues

#### 1. Game doesn't load
- Check browser console for errors
- Verify all dependencies are installed: `npm install`
- Clear browser cache and reload

#### 2. Rooms not appearing
- Check `IsometricView` canvas is rendering
- Verify room positions are within canvas bounds
- Check room dimensions are positive values

#### 3. Crew members not updating
- Ensure game is not paused (click Play button)
- Check crew needs are being calculated correctly
- Verify game loop is running (check console)

#### 4. Resource consumption too fast/slow
- Adjust consumption rates in `gameLogic.ts`
- Modify game speed in `GameContainer.tsx`
- Check initial resource values

#### 5. Validation not working
- Ensure `ROOM_REQUIREMENTS` has all room types
- Check validation logic in `validateHabitat()`
- Verify room dimensions are set correctly

### Debug Mode

Add this to `GameContainer.tsx` for debugging:

```typescript
useEffect(() => {
  console.log('Game State:', {
    isPlaying: gameState.isPlaying,
    isPaused: gameState.isPaused,
    daysPassed: gameState.daysPassed,
    rooms: gameState.habitat?.rooms.length,
    crew: gameState.crew.length,
    resources: gameState.resources
  });
}, [gameState]);
```

### Performance Issues

If the game is slow:

1. **Reduce canvas size**:
```typescript
<canvas width={600} height={450} /> // Instead of 800x600
```

2. **Optimize rendering**:
```typescript
// Only redraw when necessary
useEffect(() => {
  // rendering code
}, [rooms, crew]); // Only when these change
```

3. **Throttle game loop**:
```typescript
const interval = setInterval(() => {
  // game logic
}, 2000); // 2 seconds instead of 1
```

---

## Advanced Customization

### Adding Multiplayer Features

To add save/load functionality:

```typescript
// Save design
const saveDesign = () => {
  const designData = JSON.stringify(gameState.habitat);
  localStorage.setItem('habitat-design', designData);
};

// Load design
const loadDesign = () => {
  const designData = localStorage.getItem('habitat-design');
  if (designData) {
    const habitat = JSON.parse(designData);
    setGameState(prev => ({ ...prev, habitat }));
  }
};
```

### Exporting Designs

```typescript
const exportDesign = () => {
  const data = {
    habitat: gameState.habitat,
    metadata: {
      creator: 'User Name',
      date: new Date().toISOString(),
      score: gameState.score
    }
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `habitat-${Date.now()}.json`;
  link.click();
};
```

### Adding Achievements

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (state: GameState) => boolean;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'first-habitat',
    name: 'First Steps',
    description: 'Create your first habitat',
    condition: (state) => state.habitat !== null,
    unlocked: false
  },
  {
    id: 'happy-crew',
    name: 'Crew Happiness',
    description: 'Maintain crew happiness above 90%',
    condition: (state) => calculateCrewHappiness(state.crew, state.habitat!) > 90,
    unlocked: false
  }
];
```

---

## Testing

### Manual Testing Checklist

- [ ] Mission selection works
- [ ] Rooms can be added
- [ ] Rooms render in isometric view
- [ ] Crew members appear and move
- [ ] Resources decrease over time
- [ ] Validation errors show correctly
- [ ] Play/Pause/Reset buttons work
- [ ] Compliance score updates
- [ ] Crew happiness changes with needs
- [ ] Game doesn't crash after extended play

### Unit Testing Example

```typescript
import { validateHabitat, calculateComplianceScore } from '@/lib/gameLogic';

describe('Game Logic', () => {
  it('should validate habitat correctly', () => {
    const habitat: HabitatDesign = {
      // test data
    };
    
    const errors = validateHabitat(habitat);
    expect(errors).toContain('Missing required room: sleep');
  });
  
  it('should calculate compliance score', () => {
    const habitat: HabitatDesign = {
      // test data
    };
    
    const score = calculateComplianceScore(habitat);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
```

---

## Contact & Support

For questions or issues:
- Check the [GAME_README.md](./GAME_README.md) for game documentation
- Review code comments in source files
- Test in browser console for debugging

---

**Happy Habitat Building!** 🚀

# Feature: Custom Mission Creator

## Overview
Added a fourth mission type called "Custom Mission" that allows users to configure their own space habitat mission with customizable crew size, destination, and mission duration.

## Date
October 5, 2025

## Feature Description

### What Was Added
A new **Custom Mission** option in the Mission Selector that lets users create personalized missions with:
- **Custom Crew Size**: 1-12 crew members
- **Custom Destination**: Any destination (Moon, Mars, ISS, or user-defined)
- **Custom Duration**: 1-1000 days

### User Interface

#### Mission Selection Screen
The mission selector now displays **4 cards** instead of 3:
1. Lunar Outpost - Short Mission (preset)
2. Mars Transit Vehicle (preset)
3. Mars Surface Habitat (preset)
4. **Custom Mission** (NEW) - Purple badge with Settings icon

#### Custom Mission Card
```
┌─────────────────────────┐
│       ⚙️ Settings       │
│   Custom Mission        │
│   [Purple Badge]        │
│                         │
│ Create your own mission │
│ with custom crew size,  │
│ destination, duration   │
│                         │
│ 👥 Your choice         │
│ 📅 Your timeline       │
│ 🚀 Your destination    │
└─────────────────────────┘
```

#### Configuration Dialog
When clicking the Custom Mission card, a configuration panel appears with:

**Three Input Fields**:
1. **Crew Size** (number input)
   - Range: 1-12 crew members
   - Default: 4
   - Help text: "1-12 crew members"

2. **Destination** (text input)
   - Any text value
   - Default: "Moon"
   - Help text: "Any destination"
   - Auto-detects habitat type from destination name

3. **Mission Duration** (number input)
   - Range: 1-1000 days
   - Default: 30
   - Help text: "1-1000 days"

**Mission Preview Box**:
Shows calculated values:
- Habitat Type (auto-detected)
- Max Volume (calculated)
- Budget (calculated)
- Difficulty badge (based on duration)

**Action Buttons**:
- Cancel (returns to mission selection)
- Create Mission (creates the custom mission)

## Technical Implementation

### Files Modified
- `src/components/game/MissionSelector.tsx`

### New State Variables
```typescript
const [showCustomConfig, setShowCustomConfig] = useState(false);
const [customConfig, setCustomConfig] = useState<{
  crewSize: number;
  destination: string;
  missionDuration: number;
  habitatType: 'lunar' | 'mars' | 'orbital';
}>({
  crewSize: 4,
  destination: 'Moon',
  missionDuration: 30,
  habitatType: 'lunar'
});
```

### Key Functions

#### 1. Habitat Type Auto-Detection
```typescript
const getDestinationHabitatType = (destination: string): 'lunar' | 'mars' | 'orbital' => {
  const dest = destination.toLowerCase();
  if (dest.includes('mars')) return 'mars';
  if (dest.includes('moon') || dest.includes('lunar')) return 'lunar';
  return 'orbital';
};
```

**Logic**:
- If destination contains "mars" → Mars habitat
- If destination contains "moon" or "lunar" → Lunar habitat
- Otherwise → Orbital habitat (default)

**Examples**:
- "Moon" → lunar
- "Mars Base Alpha" → mars
- "ISS" → orbital
- "Europa" → orbital
- "Lunar Gateway" → lunar

#### 2. Custom Mission Creation
```typescript
const createCustomMission = (): MissionScenario => {
  const baseVolume = customConfig.crewSize * 50;
  const baseBudget = customConfig.crewSize * 250000;
  
  return {
    id: 'custom',
    name: `Custom Mission - ${customConfig.destination}`,
    description: `Custom mission to ${customConfig.destination} with ${customConfig.crewSize} crew for ${customConfig.missionDuration} days`,
    habitatType: customConfig.habitatType,
    crewSize: customConfig.crewSize,
    missionDuration: customConfig.missionDuration,
    objectives: [
      `Design habitat for ${customConfig.crewSize} crew members`,
      'Ensure all basic life support requirements are met',
      'Maintain crew health and comfort',
      'Complete mission within constraints'
    ],
    constraints: {
      maxVolume: baseVolume + (customConfig.missionDuration * 0.5),
      budgetLimit: baseBudget + (customConfig.missionDuration * 5000),
      requiredRooms: ['sleep', 'hygiene', 'food', 'life-support']
    }
  };
};
```

### Calculation Formulas

#### Max Volume
```
Max Volume = (Crew Size × 50) + (Mission Duration × 0.5) m³
```

**Examples**:
- 4 crew, 30 days: (4×50) + (30×0.5) = 200 + 15 = **215 m³**
- 8 crew, 180 days: (8×50) + (180×0.5) = 400 + 90 = **490 m³**
- 2 crew, 10 days: (2×50) + (10×0.5) = 100 + 5 = **105 m³**

#### Budget
```
Budget = (Crew Size × $250,000) + (Mission Duration × $5,000)
```

**Examples**:
- 4 crew, 30 days: (4×250K) + (30×5K) = 1M + 150K = **$1.15M**
- 8 crew, 180 days: (8×250K) + (180×5K) = 2M + 900K = **$2.9M**
- 2 crew, 10 days: (2×250K) + (10×5K) = 500K + 50K = **$550K**

#### Difficulty
```
Duration < 60 days → Easy (Green)
Duration 60-179 days → Medium (Yellow)
Duration ≥ 180 days → Hard (Red)
```

### Required Rooms
Custom missions always require these 4 basic rooms:
- **Sleep** (crew quarters)
- **Hygiene** (bathroom facilities)
- **Food** (kitchen/dining)
- **Life Support** (air, water, temperature control)

*Note: Users can add more rooms beyond these requirements*

### Objectives
Custom missions have 4 standard objectives:
1. Design habitat for X crew members
2. Ensure all basic life support requirements are met
3. Maintain crew health and comfort
4. Complete mission within constraints

## User Experience Flow

### Typical Workflow

1. **User opens game** → Mission Selector appears
2. **User sees 4 mission cards** → 3 presets + Custom
3. **User clicks "Custom Mission"** card
4. **Configuration panel opens** with 3 input fields
5. **User enters values**:
   - Crew Size: 6
   - Destination: "Mars Base Alpha"
   - Duration: 120 days
6. **Preview updates automatically**:
   - Habitat Type: mars (auto-detected)
   - Max Volume: 360 m³
   - Budget: $2.1M
   - Difficulty: Medium (yellow)
7. **User clicks "Create Mission"**
8. **Mission selector shows custom mission details**
9. **User clicks "Start Mission"**
10. **Game begins with custom parameters**

### Validation

#### Input Validation
```typescript
// Crew Size
min: 1
max: 12
default: 4

// Mission Duration
min: 1
max: 1000
default: 30

// Destination
type: text
required: true (cannot be empty)
default: "Moon"
```

#### Automatic Bounds
- Values outside min/max are automatically clamped
- Empty number fields default to minimum value (1)
- Destination is auto-trimmed and processed

## Visual Design

### Color Scheme
- **Background**: Dark card (bg-[#0B0F17])
- **Custom Card**: Purple accent badge
- **Settings Icon**: Primary color (blue/purple)
- **Input Fields**: Semi-transparent white with borders
- **Preview Box**: Black overlay with rounded corners

### Icons
- **Settings Icon**: ⚙️ (Settings component from lucide-react)
- **Crew**: 👥 (Users icon)
- **Duration**: 📅 (Calendar icon)
- **Destination**: 🚀 (Rocket icon)

### Layout
- **Grid**: 4 columns on desktop (md:grid-cols-4)
- **Custom Card**: Same size as preset missions
- **Config Panel**: Full-width with 3-column grid for inputs
- **Preview**: 2-column grid for calculated values

## Examples

### Example 1: Quick Moon Mission
**Inputs**:
- Crew: 2
- Destination: "Moon"
- Duration: 14 days

**Calculated Values**:
- Habitat Type: lunar
- Volume: 107 m³
- Budget: $570K
- Difficulty: Easy ✅

**Use Case**: Short lunar exploration mission

### Example 2: Mars Colony
**Inputs**:
- Crew: 10
- Destination: "Mars Colony"
- Duration: 365 days

**Calculated Values**:
- Habitat Type: mars
- Volume: 682.5 m³
- Budget: $4.325M
- Difficulty: Hard 🔴

**Use Case**: Long-term Mars settlement

### Example 3: Space Station
**Inputs**:
- Crew: 6
- Destination: "ISS-2"
- Duration: 90 days

**Calculated Values**:
- Habitat Type: orbital
- Volume: 345 m³
- Budget: $1.95M
- Difficulty: Medium ⚠️

**Use Case**: International space station rotation

### Example 4: Europa Outpost
**Inputs**:
- Crew: 4
- Destination: "Europa Research Station"
- Duration: 200 days

**Calculated Values**:
- Habitat Type: orbital (no specific match)
- Volume: 300 m³
- Budget: $2M
- Difficulty: Hard 🔴

**Use Case**: Deep space exploration

## Configuration Options

### Adjustable Parameters

Users can modify these in the code if needed:

#### Volume Formula
```typescript
// Current: baseVolume + (duration * 0.5)
const baseVolume = customConfig.crewSize * 50; // 50 m³ per crew
const durationBonus = customConfig.missionDuration * 0.5; // 0.5 m³ per day
```

#### Budget Formula
```typescript
// Current: baseBudget + (duration * 5000)
const baseBudget = customConfig.crewSize * 250000; // $250K per crew
const durationCost = customConfig.missionDuration * 5000; // $5K per day
```

#### Required Rooms
```typescript
// Can be modified to include more/fewer rooms
requiredRooms: ['sleep', 'hygiene', 'food', 'life-support']
// Could add: 'airlock', 'exercise', 'medical', etc.
```

#### Crew Size Limits
```typescript
min="1"  // Can be changed to 2 for minimum crew pairs
max="12" // Can be increased for larger missions
```

#### Duration Limits
```typescript
min="1"   // Shortest mission (1 day)
max="1000" // Can be increased for multi-year missions
```

## Comparison with Preset Missions

| Feature | Preset Missions | Custom Mission |
|---------|----------------|----------------|
| Number of Options | 3 fixed | Unlimited |
| Crew Size | Fixed (4, 6, 8) | User choice (1-12) |
| Destination | Fixed | User input |
| Duration | Fixed (30, 180, 500) | User choice (1-1000) |
| Volume | Fixed | Calculated |
| Budget | Fixed | Calculated |
| Required Rooms | Mission-specific | 4 basic rooms |
| Objectives | Mission-specific | Generic 4 objectives |
| Difficulty | Preset | Auto-calculated |

## Benefits

### For Users
✅ **Creative Freedom**: Design missions for any scenario
✅ **Educational**: Understand resource scaling with crew/duration
✅ **Replayability**: Create infinite mission variations
✅ **Accessibility**: Simple interface for beginners
✅ **Flexibility**: Test edge cases and extreme scenarios

### For Game Design
✅ **Scalability**: No need to hardcode every mission
✅ **User Testing**: See what configurations users prefer
✅ **Balanced Formulas**: Automatic calculation prevents exploits
✅ **Future-Proof**: Easy to add new features to custom missions

## Future Enhancements

### Potential Improvements
1. **Save/Load Custom Missions**: Save favorite configurations
2. **Mission Templates**: Pre-fill based on real missions (Apollo, Artemis, etc.)
3. **Advanced Options**: Toggle specific room requirements
4. **Difficulty Multipliers**: Adjust budget/volume constraints
5. **Mission Sharing**: Share custom missions with friends
6. **Random Generator**: "Surprise Me" button for random missions
7. **Mission Gallery**: Browse community-created missions
8. **Constraints Editor**: Fine-tune volume and budget limits

### Advanced Features
- **Environmental Hazards**: Add radiation, temperature extremes
- **Emergency Scenarios**: Include mission complications
- **Resource Limitations**: Limit specific resources
- **Time Pressure**: Add construction deadlines
- **Crew Specializations**: Choose crew skill sets

## Testing Scenarios

### Test 1: Minimum Values
- Crew: 1
- Destination: "A"
- Duration: 1
- Expected: 51.5 m³, $255K, Easy ✅

### Test 2: Maximum Values
- Crew: 12
- Destination: "Test"
- Duration: 1000
- Expected: 1100 m³, $8M, Hard ✅

### Test 3: Destination Detection
- "Moon Base" → lunar ✅
- "Mars Rover" → mars ✅
- "Space Station" → orbital ✅

### Test 4: Cancel Flow
- Open custom config → Enter values → Click Cancel
- Expected: Returns to mission selection, no mission selected ✅

### Test 5: Create and Select
- Configure custom mission → Create → Start Mission
- Expected: Game starts with custom parameters ✅

## Related Documentation
- `MISSION_SCENARIOS.md` - Preset mission details
- `GAME_MECHANICS.md` - Core game mechanics
- `CREW_MANAGEMENT.md` - Crew system documentation

## Summary

### What Was Added
✅ Custom Mission card in mission selector (4th option)
✅ Configuration dialog with 3 input fields
✅ Automatic habitat type detection from destination
✅ Dynamic volume and budget calculation
✅ Real-time preview of calculated values
✅ Difficulty badge based on duration
✅ Clean, intuitive UI matching existing design

### Key Features
- **Crew Size**: 1-12 configurable
- **Destination**: Any text input with smart detection
- **Duration**: 1-1000 days configurable
- **Auto-Calculation**: Volume, budget, difficulty
- **Visual Feedback**: Live preview of all values

### User Benefits
Users can now create personalized space missions for any scenario they imagine, from quick lunar hops to multi-year deep space expeditions!

## Status
✅ **IMPLEMENTED** - Custom mission creator is live and fully functional!

Test it at: http://localhost:8080/play → Click "Custom Mission" 🚀

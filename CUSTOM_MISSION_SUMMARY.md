# Custom Mission - Quick Summary

## What's New
Added a **4th mission type: Custom Mission** where users can create their own space habitat mission!

## Features

### User Inputs (3 Fields)
1. **Crew Size**: 1-12 crew members
2. **Destination**: Any location (Moon, Mars, ISS, etc.)
3. **Mission Duration**: 1-1000 days

### Auto-Calculated
- **Habitat Type**: Automatically detected from destination name
  - Contains "Mars" → Mars habitat
  - Contains "Moon/Lunar" → Lunar habitat
  - Otherwise → Orbital habitat
  
- **Max Volume**: `(Crew × 50) + (Duration × 0.5)` m³
- **Budget**: `(Crew × $250K) + (Duration × $5K)`
- **Difficulty**: Based on duration
  - < 60 days = Easy (Green)
  - 60-179 days = Medium (Yellow)
  - ≥ 180 days = Hard (Red)

## How to Use

1. **Start the game** → Mission Selector appears
2. **Click "Custom Mission"** card (purple badge with ⚙️ icon)
3. **Enter your values**:
   - Crew Size (e.g., 6)
   - Destination (e.g., "Mars Base Alpha")
   - Duration (e.g., 120 days)
4. **Preview updates automatically** showing calculated values
5. **Click "Create Mission"** to confirm
6. **Click "Start Mission"** to begin!

## Visual Layout

```
Mission Selector (Now 4 cards):
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Lunar   │ │ Mars    │ │ Mars    │ │ Custom  │
│ Outpost │ │ Transit │ │ Surface │ │ Mission │
│ (Easy)  │ │ (Medium)│ │ (Hard)  │ │ (⚙️)   │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### Custom Configuration Panel
```
Configure Custom Mission ⚙️

┌─────────────────────────────────────────────┐
│ Crew Size    │ Destination  │ Duration      │
│ [    6    ]  │ [ Mars Base ]│ [   120    ]  │
│ 1-12 crew    │ Any dest.    │ 1-1000 days   │
└─────────────────────────────────────────────┘

Mission Preview:
• Habitat Type: mars
• Max Volume: 360 m³
• Budget: $2.1M
• Difficulty: Medium ⚠️

[Cancel]  [Create Mission]
```

## Examples

### Quick Moon Trip
- Crew: 2
- Destination: "Moon"
- Duration: 14 days
- Result: 107 m³, $570K, Easy ✅

### Mars Colony
- Crew: 10
- Destination: "Mars"
- Duration: 365 days
- Result: 682.5 m³, $4.325M, Hard 🔴

### Space Station
- Crew: 6
- Destination: "ISS-2"
- Duration: 90 days
- Result: 345 m³, $1.95M, Medium ⚠️

## Key Features

✅ **Unlimited Configurations**: Create any mission you can imagine
✅ **Smart Detection**: Automatically determines habitat type
✅ **Real-Time Preview**: See calculated values as you type
✅ **Balanced Formulas**: Budget and volume scale appropriately
✅ **Simple Interface**: Just 3 inputs, everything else is automatic
✅ **Quick Setup**: Takes < 30 seconds to create a custom mission

## Technical Details

**File Modified**: `src/components/game/MissionSelector.tsx`

**New Components**:
- Custom mission card (4th card in grid)
- Configuration dialog with inputs
- Live preview of calculated values
- Automatic habitat type detection

**Formulas**:
```javascript
Volume = (Crew × 50) + (Duration × 0.5)
Budget = (Crew × 250,000) + (Duration × 5,000)
```

## Required Rooms
Custom missions always require:
- Sleep (crew quarters)
- Hygiene (bathroom)
- Food (kitchen)
- Life Support (air/water)

*You can add more rooms as needed!*

## Status
✅ **LIVE** - Test it now at http://localhost:8080/play

Navigate to the game and look for the **Custom Mission** card with the purple badge and settings icon!

---

**Full Documentation**: See `FEATURE_CUSTOM_MISSION.md`

Date: October 5, 2025

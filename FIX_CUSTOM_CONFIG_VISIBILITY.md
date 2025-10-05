# Fix: Hide Custom Config When Preset Mission Selected

## Issue
When a user selected a preset mission (Lunar, Mars Transit, Mars Surface) after having the custom mission configuration panel open, the custom config panel would remain visible, causing UI confusion.

## Solution
Updated the mission selection logic to automatically hide the custom configuration panel when a preset mission is selected.

## Changes Made

### 1. Updated Preset Mission Click Handler
**File**: `src/components/game/MissionSelector.tsx`

**Before**:
```typescript
onClick={() => setSelectedMission(mission)}
```

**After**:
```typescript
onClick={() => {
  setSelectedMission(mission);
  setShowCustomConfig(false); // Hide custom config when preset selected
}}
```

### 2. Updated Mission Objectives Display Condition
**Before**:
```typescript
{selectedMission && (
  <Card>
    {/* Mission objectives */}
  </Card>
)}
```

**After**:
```typescript
{selectedMission && !showCustomConfig && (
  <Card>
    {/* Mission objectives */}
  </Card>
)}
```

## Behavior Flow

### Scenario 1: Custom → Preset Mission
1. User clicks "Custom Mission" card
2. Custom config panel appears ✅
3. User clicks a preset mission (e.g., "Lunar Outpost")
4. Custom config panel **hides automatically** ✅
5. Preset mission objectives panel shows ✅

### Scenario 2: Preset → Custom Mission
1. User clicks a preset mission
2. Mission objectives panel shows ✅
3. User clicks "Custom Mission" card
4. Mission objectives panel **hides automatically** ✅
5. Custom config panel shows ✅

### Scenario 3: Custom Mission Complete Flow
1. User clicks "Custom Mission" card
2. Custom config panel appears
3. User configures mission
4. User clicks "Create Mission"
5. Custom config panel **hides** ✅
6. Mission objectives panel shows for the custom mission ✅

## Visual States

### State A: No Mission Selected
```
[Lunar] [Mars Transit] [Mars Surface] [Custom]
        (No panels visible)
```

### State B: Preset Mission Selected
```
[Lunar*] [Mars Transit] [Mars Surface] [Custom]
┌─────────────────────────────────────┐
│ Mission Objectives:                 │
│ • Create sleeping quarters...       │
│ • Include hygiene facilities...     │
└─────────────────────────────────────┘
```

### State C: Custom Config Open
```
[Lunar] [Mars Transit] [Mars Surface] [Custom*]
┌─────────────────────────────────────┐
│ Configure Custom Mission            │
│ [Crew] [Destination] [Duration]     │
│ Mission Preview: ...                │
└─────────────────────────────────────┘
```

### State D: Custom Mission Created
```
[Lunar] [Mars Transit] [Mars Surface] [Custom*]
┌─────────────────────────────────────┐
│ Mission Objectives:                 │
│ • Design habitat for X crew...      │
│ • Ensure life support...            │
└─────────────────────────────────────┘
```

## Logic Summary

### Display Conditions

**Custom Config Panel**:
- Visible when: `showCustomConfig === true`
- Hidden when: User selects preset mission OR clicks "Create Mission"

**Mission Objectives Panel**:
- Visible when: `selectedMission !== null && showCustomConfig === false`
- Hidden when: No mission selected OR custom config is open

### State Variables
```typescript
showCustomConfig: boolean  // Controls custom config panel visibility
selectedMission: MissionScenario | null  // Currently selected mission
```

## Edge Cases Handled

✅ **Switch between presets**: Mission objectives update correctly
✅ **Switch preset → custom**: Config panel shows, objectives hide
✅ **Switch custom → preset**: Config panel hides, objectives show
✅ **Create custom mission**: Config hides, objectives show with custom values
✅ **Cancel custom config**: Returns to selection, no mission selected

## Testing

### Test 1: Preset to Custom
1. Select "Lunar Outpost"
2. Verify objectives panel shows
3. Click "Custom Mission"
4. Verify: ✅ Objectives panel hidden, config panel shown

### Test 2: Custom to Preset
1. Click "Custom Mission"
2. Verify config panel shows
3. Click "Mars Transit"
4. Verify: ✅ Config panel hidden, objectives panel shown

### Test 3: Multiple Preset Switches
1. Click "Lunar Outpost"
2. Click "Mars Transit"
3. Click "Mars Surface"
4. Verify: ✅ Objectives panel updates each time, no config panel

### Test 4: Complete Custom Flow
1. Click "Custom Mission"
2. Enter values
3. Click "Create Mission"
4. Verify: ✅ Config hides, objectives show for custom mission

## Benefits

✅ **Clear UI**: Only one panel visible at a time
✅ **Intuitive**: Behavior matches user expectations
✅ **No Confusion**: Custom config only shows when needed
✅ **Smooth Transitions**: Automatic panel switching
✅ **Clean State Management**: Proper state synchronization

## Related Files
- `src/components/game/MissionSelector.tsx` - Main component

## Status
✅ **FIXED** - Custom config panel now properly hides when preset missions are selected

Date: October 5, 2025

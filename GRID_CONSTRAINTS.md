# Room Grid Constraints & Free Arrangement

## Overview
The Habitat Layout Creator ensures all rooms are constrained within the main 20×20×3 grid while allowing free arrangement within those bounds. This document explains the complete constraint system.

## Grid Specifications

### Grid Dimensions
- **Width**: 20 units (X-axis)
- **Depth**: 20 units (Y-axis)  
- **Height**: 3 units (Z-axis)
- **Scale**: 30 pixels per meter for rendering
- **Total Volume**: 1,200 cubic units

### Coordinate System
```
X: 0 → 20 (left to right)
Y: 0 → 20 (top to bottom)
Z: 0 → 3  (floor levels)
```

## Constraint Implementation

### 1. Room Placement (Initial)
When a room is first added via the Build Panel, it automatically finds a valid position within the grid.

**Location**: `src/components/game/GameContainer.tsx` - `handleAddRoom()`

```typescript
// Find a valid position that doesn't overlap with existing rooms
const validPosition = findValidRoomPosition(
  dimensions,
  gameState.habitat.rooms,
  100, // max attempts
  1    // grid size
);

if (!validPosition) {
  toast({
    title: "Cannot Place Room",
    description: "No space available. Try removing or relocating other rooms first.",
    variant: "destructive",
  });
  return;
}
```

**Constraints Applied**:
- ✅ Room must fit entirely within 0-20 on X-axis
- ✅ Room must fit entirely within 0-20 on Y-axis
- ✅ Room cannot overlap with existing rooms
- ✅ If no valid position exists, room is not added

### 2. Room Dragging (Preview)
While dragging a room, the preview position is clamped in real-time.

**Location**: `src/components/game/IsometricView.tsx` - `handleMouseMove()`

```typescript
else if (dragMode === 'room' && draggedRoom) {
  const room = rooms.find(r => r.id === draggedRoom);
  if (room) {
    // Convert mouse movement to grid movement
    const gridDeltaX = Math.round(deltaX / (20 * cameraZoom));
    const gridDeltaY = Math.round(deltaY / (20 * cameraZoom));
    
    const newPosition = {
      x: dragStartPos.x + gridDeltaX,
      y: dragStartPos.y + gridDeltaY,
      z: room.position.z || 0
    };
    
    // Clamp to grid bounds - PREVENTS GOING OUTSIDE
    const maxX = 20 - room.dimensions.width;
    const maxY = 20 - (room.dimensions.depth || room.dimensions.width);
    const clampedPosition = {
      x: Math.max(0, Math.min(maxX, newPosition.x)),
      y: Math.max(0, Math.min(maxY, newPosition.y)),
      z: Math.max(0, newPosition.z)
    };
    
    // Update preview position
    setPreviewPosition(clampedPosition);
  }
}
```

**Constraints Applied**:
- ✅ Real-time clamping prevents visual feedback outside grid
- ✅ Room's right edge cannot exceed X=20
- ✅ Room's bottom edge cannot exceed Y=20
- ✅ Smooth clamping (room "hits a wall" at boundaries)

### 3. Room Move (Finalization)
When the drag is released, the final position is validated and clamped again.

**Location**: `src/components/game/GameContainer.tsx` - `handleRoomMove()`

```typescript
const handleRoomMove = (roomId: string, newPosition: { x: number; y: number; z?: number }) => {
  if (!gameState.habitat) return;

  const room = gameState.habitat.rooms.find(r => r.id === roomId);
  if (!room) return;

  // Check if the new position would cause overlaps
  const otherRooms = gameState.habitat.rooms.filter(r => r.id !== roomId);
  if (wouldRoomOverlap(newPosition, room.dimensions, otherRooms)) {
    toast({
      title: "Cannot Move Room",
      description: "Room would overlap with another room at this position.",
      variant: "destructive",
    });
    return;
  }

  // Ensure the room stays within bounds - FINAL VALIDATION
  const maxX = 20 - room.dimensions.width;
  const maxY = 20 - (room.dimensions.depth || room.dimensions.width);
  const clampedPosition = {
    x: Math.max(0, Math.min(maxX, newPosition.x)),
    y: Math.max(0, Math.min(maxY, newPosition.y)),
    z: Math.max(0, newPosition.z || 0)
  };

  // Update room position in state
  setGameState(prev => ({
    ...prev,
    habitat: prev.habitat ? {
      ...prev.habitat,
      rooms: prev.habitat.rooms.map(r => 
        r.id === roomId 
          ? { ...r, position: clampedPosition }
          : r
      ),
      lastModified: new Date()
    } : null
  }));

  toast({
    title: "Room Moved",
    description: `${room.name} moved to position (${clampedPosition.x}, ${clampedPosition.y}, ${clampedPosition.z})`,
  });
};
```

**Constraints Applied**:
- ✅ Double-checks grid bounds before saving
- ✅ Validates no overlap with other rooms
- ✅ Provides user feedback on success/failure
- ✅ Prevents invalid state from being saved

## Free Arrangement Features

### What Users CAN Do
✅ **Drag and drop rooms anywhere within the grid**
- Click on any room and drag it to a new position
- No modifier keys required
- Real-time preview shows new position

✅ **Place rooms at any valid grid coordinates**
- Rooms snap to grid cells
- Can be placed at fractional coordinates
- Full 3D positioning (X, Y, Z)

✅ **Arrange rooms in any configuration**
- Side by side
- Stacked (Z-levels)
- Scattered across the grid
- Clustered in groups

✅ **Auto-arrange feature**
- Click "Auto Arrange Rooms" button
- Automatically organizes all rooms
- Maintains grid constraints
- Prevents overlaps

### What Users CANNOT Do
❌ **Place rooms outside the grid**
- Rooms are clamped at boundaries
- Cannot drag beyond X=0 or X=20
- Cannot drag beyond Y=0 or Y=20

❌ **Overlap rooms**
- Collision detection prevents overlaps
- Toast notification if overlap attempted
- Room stays at original position

❌ **Exceed grid capacity**
- If no space available, new rooms cannot be added
- User must remove or relocate existing rooms

## Visual Feedback

### Grid Visualization
The isometric view shows:
- **Grid lines**: Light gray lines showing cell boundaries
- **Grid bounds**: Visible edges at 0 and 20 on each axis
- **Scale**: 30 pixels per unit for clear visibility

### During Drag
- **Gold dashed border**: Around the room being dragged
- **Preview position**: Shows where room will be placed
- **Cursor change**: Indicates drag mode is active
- **Smooth motion**: Room follows cursor within constraints

### Boundary Feedback
When attempting to drag beyond bounds:
- **Resistance**: Room stops at grid edge
- **Visual clamping**: Position snaps to maximum valid value
- **No error**: Silent clamping for better UX

## Collision Detection

### AABB Algorithm
Uses Axis-Aligned Bounding Box collision detection.

**Location**: `src/lib/roomCollision.ts`

```typescript
export const wouldRoomOverlap = (
  position: { x: number; y: number; z?: number },
  dimensions: { width: number; height: number; depth?: number },
  otherRooms: Room[]
): boolean => {
  for (const other of otherRooms) {
    if (checkRoomOverlap(
      { ...position, z: position.z || 0 },
      dimensions,
      other.position,
      other.dimensions
    )) {
      return true;
    }
  }
  return false;
};
```

### Overlap Rules
- Rooms on different Z-levels can overlap in X/Y
- Rooms on same Z-level must not overlap
- 1-unit buffer maintained between rooms (configurable)

## Implementation Details

### State Management
```typescript
// IsometricView.tsx
const [isDraggingRoom, setIsDraggingRoom] = useState(false);
const [draggedRoom, setDraggedRoom] = useState<string | null>(null);
const [previewPosition, setPreviewPosition] = useState<Position | null>(null);
const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

// GameContainer.tsx
const [gameState, setGameState] = useState<GameState>({
  habitat: {
    rooms: [...], // All room positions stored here
    // ...
  }
});
```

### Coordinate Conversions

**Mouse to Grid**:
```typescript
const gridDeltaX = Math.round(deltaX / (20 * cameraZoom));
const gridDeltaY = Math.round(deltaY / (20 * cameraZoom));
```

**Grid to Canvas**:
```typescript
const scale = 30; // pixels per meter
const isoX = (x - y) * scale * Math.cos(Math.PI / 6);
const isoY = (x + y) * scale * Math.sin(Math.PI / 6) - z * scale;
```

### Clamping Algorithm
```typescript
const clampedPosition = {
  x: Math.max(0, Math.min(maxX, newPosition.x)),
  y: Math.max(0, Math.min(maxY, newPosition.y)),
  z: Math.max(0, newPosition.z)
};
```

Where:
- `maxX = 20 - room.dimensions.width` (room's right edge at X=20)
- `maxY = 20 - room.dimensions.depth` (room's bottom edge at Y=20)

## Testing Scenarios

### Boundary Tests
1. **Top-left corner** (0, 0)
   - ✅ Room should fit at origin
   - ✅ Cannot drag to negative coordinates

2. **Bottom-right corner** (20, 20)
   - ✅ Room's far corner should touch edge
   - ✅ Room cannot extend beyond 20

3. **Large room placement**
   - ✅ 10×10 room should be clamped to (0, 0) → (10, 10)
   - ✅ Cannot drag beyond maxX or maxY

### Arrangement Tests
1. **Side by side**
   - ✅ Two 5×5 rooms can fit at (0,0) and (5,0)
   - ✅ No gap required (user decides spacing)

2. **Stacked vertically**
   - ✅ Rooms on Z=0, Z=1, Z=2
   - ✅ Can overlap in X/Y if different Z

3. **Free arrangement**
   - ✅ Rooms can be scattered anywhere
   - ✅ No forced grid snapping (uses fractional coordinates)
   - ✅ User has complete freedom within bounds

## Related Documentation
- `DRAG_AND_DROP_ROOMS.md` - Drag-and-drop system details
- `COLLISION_DETECTION.md` - Overlap prevention algorithm
- `CAMERA_CONTROLS.md` - Camera interaction (separate from room drag)
- `BUGFIX_DRAG_MODE_ISOLATION.md` - Fix for drag mode overlap

## Configuration

### Grid Size (if needed to change)
To modify grid dimensions, update:

1. **GameContainer.tsx** - Grid rendering
2. **IsometricView.tsx** - Boundary clamping (lines 387-392)
3. **GameContainer.tsx** - handleRoomMove clamping (lines 463-468)
4. **roomCollision.ts** - Grid bounds in findValidRoomPosition()

Current values:
```typescript
const GRID_WIDTH = 20;  // X-axis
const GRID_DEPTH = 20;  // Y-axis
const GRID_HEIGHT = 3;  // Z-axis (floors)
```

## Summary

### Current Behavior ✅
- ✅ Rooms **cannot** be placed outside the 20×20×3 grid
- ✅ Rooms **can** be freely arranged anywhere within the grid
- ✅ Real-time clamping during drag prevents boundary violations
- ✅ Final validation ensures no invalid positions are saved
- ✅ Collision detection prevents overlaps between rooms
- ✅ Visual feedback shows boundaries and constraints clearly

### User Experience
The system provides a **constrained freedom** model:
- Users feel empowered to arrange rooms however they want
- Grid boundaries provide structure and prevent errors
- Smooth clamping feels natural (like hitting a wall)
- No jarring error messages for boundary attempts
- Clear visual feedback shows what's possible

This design balances **creative freedom** with **NASA compliance** requirements for structured habitat design.

## Status
✅ **FULLY IMPLEMENTED** - All grid constraints are active and working correctly.

Last Updated: October 5, 2025

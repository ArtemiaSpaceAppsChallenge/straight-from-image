# Room Collision Prevention System Documentation

## Overview
The game now includes a comprehensive room collision prevention system that ensures rooms never overlap, maintaining a realistic and valid habitat layout.

## Core Features

### **Automatic Collision Detection**
- All rooms are checked for overlaps before placement
- 3D collision detection in X, Y, and Z axes
- Real-time validation during room addition

### **Smart Room Placement**
When adding a new room, the system:
1. Calculates the room dimensions based on requirements
2. Attempts to find a valid position using a grid-based algorithm
3. Falls back to random placement if grid placement fails
4. Rejects placement if no valid position exists (up to 100 attempts)

### **Collision Detection Algorithm**
The system uses Axis-Aligned Bounding Box (AABB) collision detection:
- Checks overlap in all three dimensions (X, Y, Z)
- Considers room dimensions including width, height, and depth
- Validates against all existing rooms in the habitat

## User Features

### **1. Auto-Arrange Function** 🔧
- **Location**: Build Panel (Rooms tab)
- **Function**: Automatically rearranges all rooms to eliminate overlaps
- **Algorithm**: 
  - Processes rooms sequentially
  - Finds valid positions using grid-based placement
  - Marks rooms as invalid if no position available
  - Provides feedback on success/failure

### **2. Manual Room Dragging** 🖱️
- **Activation**: Alt + Mouse drag on a room
- **Features**:
  - Real-time collision checking during drag
  - Prevents placement in overlapping positions
  - Snaps to grid coordinates
  - Visual feedback with cursor change (grab/grabbing)
  - Toast notifications for successful/failed moves
  
### **3. Room Boundaries**
- Rooms are constrained within a 20x20x3 grid
- Automatic clamping to prevent out-of-bounds placement
- Respects room dimensions when calculating valid positions

## Visual Feedback

### **Toast Notifications**
- **Room Added**: Shows position coordinates when room is successfully placed
- **Cannot Place Room**: Warning when no space is available
- **Room Moved**: Confirms new position after manual drag
- **Cannot Move Room**: Prevents overlapping placements
- **Auto-Arrange Results**: Reports number of rooms fixed/remaining

### **Cursor Indicators**
- **Default**: Pointer cursor
- **Hovering Room**: Grab cursor (indicates draggable)
- **Dragging Room**: Grabbing cursor (Alt+drag active)
- **Panning**: Move cursor
- **Rotating**: Crosshair cursor

### **Control Instructions Overlay**
Updated to include:
- "Alt+Mouse: Move rooms"
- Shows currently dragged room name when active

## Technical Implementation

### **Collision Detection Functions**

#### `checkRoomOverlap(room1, room2)`
- Returns true if two rooms overlap in 3D space
- Uses bounding box intersection algorithm

#### `getRoomBounds(room)`
- Calculates min/max coordinates for all three axes
- Returns bounds object with minX, maxX, minY, maxY, minZ, maxZ

#### `wouldRoomOverlap(position, dimensions, existingRooms)`
- Checks if a room at a given position would overlap with existing rooms
- Creates test room and checks against all existing rooms

#### `findValidRoomPosition(dimensions, existingRooms, maxAttempts, gridSize)`
- Attempts grid-aligned placement first (50% of attempts)
- Falls back to random placement (50% of attempts)
- Returns null if no valid position found after maxAttempts

#### `getSuggestedPositions(dimensions, existingRooms, targetRoom)`
- Generates suggested positions adjacent to existing rooms
- Checks 6 directions: right, left, front, back, above, below
- Validates each suggestion for overlaps and bounds

#### `autoArrangeRooms(rooms)`
- Processes all rooms sequentially
- Finds valid positions for each room
- Marks rooms as invalid if no position available

## Usage Examples

### **Adding a New Room**
```typescript
// User clicks "Add Sleep Room"
// System:
1. Calculates room dimensions (3x3x3)
2. Searches for valid position (up to 100 attempts)
3. If found: Places room and shows toast
4. If not found: Shows error toast, room not added
```

### **Moving a Room Manually**
```typescript
// User presses Alt and drags a room
// System:
1. Detects Alt+click on room
2. Enters room drag mode
3. Converts mouse movement to grid coordinates
4. Checks for overlaps at new position
5. If valid: Moves room and shows toast
6. If invalid: Rejects move and shows warning
```

### **Auto-Arrange Rooms**
```typescript
// User clicks "Auto-Arrange" button
// System:
1. Takes all existing rooms
2. Finds valid position for each room sequentially
3. Updates room positions
4. Shows summary toast with results
```

## Best Practices

### **For Users**
1. **Add rooms gradually**: Easier to arrange when adding one at a time
2. **Use auto-arrange**: Quick fix for overlapping rooms
3. **Manual adjustment**: Use Alt+drag for precise positioning
4. **Check validation panel**: See if any rooms are marked invalid

### **For Developers**
1. **Grid size**: Adjust gridSize parameter for different placement strategies
2. **Max attempts**: Increase for more thorough search (costs performance)
3. **Collision tolerance**: Add spacing parameter for minimum gap between rooms
4. **3D placement**: Consider Z-axis for multi-level habitats

## Performance Considerations

- **Collision checks**: O(n) per room where n = number of existing rooms
- **Placement search**: O(m*n) where m = max attempts, n = existing rooms
- **Auto-arrange**: O(r*m*n) where r = total rooms

For large habitats (100+ rooms), consider:
- Spatial partitioning (quadtree/octree)
- Incremental validation
- Background processing for auto-arrange

## Future Enhancements

- **Suggested positions**: Show green outlines for valid placement areas
- **Snap to adjacent**: Automatically align rooms to adjacent walls
- **Room rotation**: Allow rotating rooms while checking collisions
- **Undo/Redo**: History of room placements
- **Collision visualization**: Highlight overlapping rooms in red
- **Multi-select**: Move multiple rooms together

## Error Handling

The system gracefully handles:
- No available space for new rooms
- Invalid manual room placements
- Out-of-bounds attempts
- Concurrent room additions
- Missing or invalid room data

All errors result in user-friendly toast notifications with actionable guidance.

## Summary

The room collision prevention system ensures a realistic and valid habitat design by:
- Preventing overlapping room placements
- Providing automatic arrangement tools
- Enabling manual room positioning with collision checks
- Offering clear visual and textual feedback
- Maintaining performance even with many rooms

This system is essential for creating NASA-compliant habitat designs that respect physical space constraints!
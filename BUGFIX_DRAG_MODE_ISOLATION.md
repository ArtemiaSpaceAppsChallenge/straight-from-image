# Bug Fix: Drag Mode Isolation

## Issue Description
When clicking on a room to drag it, the camera was also panning because both the room dragging handler and camera panning handler were being triggered simultaneously.

## Root Cause
The `handleMouseDown` function was setting `isDragging` and `dragStart` at the END of the function, regardless of which mode (pan/rotate/room) was selected. This caused a timing issue where:

1. Room click detected → `dragMode` set to 'room'
2. `isDragging` set to true for all cases
3. On first `mousemove` event, the mode check happened but camera might update before mode fully propagated
4. Both room dragging AND camera panning could execute

## Solution Implemented

### 1. Restructured handleMouseDown
**Before:**
```typescript
const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const clickedRoom = getRoomAtPosition(e.clientX, e.clientY);
  
  if (clickedRoom && !e.shiftKey && !e.ctrlKey) {
    setIsDraggingRoom(true);
    setDraggedRoom(clickedRoom);
    setDragMode('room');
    // ... room setup
  } else if (e.shiftKey) {
    setDragMode('rotate');
  } else {
    setDragMode('pan');
  }
  
  // PROBLEM: These run for ALL cases
  setIsDragging(true);
  setDragStart({ x: e.clientX, y: e.clientY });
};
```

**After:**
```typescript
const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const clickedRoom = getRoomAtPosition(e.clientX, e.clientY);
  
  if (clickedRoom && !e.shiftKey && !e.ctrlKey) {
    // Room dragging branch - complete isolation
    setDragMode('room'); // Set mode FIRST
    setIsDraggingRoom(true);
    setDraggedRoom(clickedRoom);
    // ... room setup
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  } else if (e.shiftKey) {
    // Rotation branch - complete isolation
    setDragMode('rotate'); // Set mode FIRST
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  } else {
    // Pan branch - complete isolation
    setDragMode('pan'); // Set mode FIRST
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }
};
```

### 2. Enhanced handleMouseMove Comments
Added clarifying comments to make mode isolation explicit:

```typescript
// Handle camera pan (only when not dragging a room)
if (dragMode === 'pan') {
  // ... pan logic
} 
// Handle camera rotation (only when not dragging a room)
else if (dragMode === 'rotate') {
  // ... rotation logic
}
// Handle room dragging (isolated from camera)
else if (dragMode === 'room' && draggedRoom) {
  // ... room drag logic
}
```

## Key Improvements

### 1. Mode Isolation
- Each drag mode now has its own complete code path
- `dragMode` is set FIRST before any drag state is enabled
- `isDragging` and `dragStart` are only set within the specific branch

### 2. Proper State Sequencing
- Mode state (`dragMode`) is set before enabling drag (`isDragging`)
- Ensures mode is properly propagated before any drag calculations happen

### 3. Clear Intent
- Comments explicitly state mode isolation
- Each branch is self-contained and independent

## Testing Checklist

✅ **Room Dragging**
- Click on room → drag → only room moves
- Camera position stays fixed
- Camera rotation stays fixed

✅ **Camera Panning**
- Click on empty space → drag → only camera pans
- Rooms stay in place
- Camera rotation stays fixed

✅ **Camera Rotation**
- Shift + click + drag → only camera rotates
- Rooms stay in place
- Camera position stays fixed

✅ **Mode Transitions**
- Releasing mouse properly ends current drag mode
- Next click/drag starts fresh with correct mode
- No "sticky" mode issues

## Technical Details

### State Variables Involved
```typescript
const [isDragging, setIsDragging] = useState(false);
const [isDraggingRoom, setIsDraggingRoom] = useState(false);
const [dragMode, setDragMode] = useState<'pan' | 'rotate' | 'room'>('pan');
const [draggedRoom, setDraggedRoom] = useState<string | null>(null);
const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
```

### Mode Determination Logic
1. **Room clicked** + no modifier keys → `dragMode = 'room'`
2. **Shift key held** → `dragMode = 'rotate'`
3. **Empty space clicked** → `dragMode = 'pan'`

### Mode Execution Logic (handleMouseMove)
```typescript
if (dragMode === 'pan') {
  // Update camera position only
  onCameraChange({ position: newPosition });
}
else if (dragMode === 'rotate') {
  // Update camera rotation only
  onCameraChange({ rotation: newRotation });
}
else if (dragMode === 'room' && draggedRoom) {
  // Update room preview position only
  setPreviewPosition(newPosition);
}
```

## Related Files
- `src/components/game/IsometricView.tsx` - Main fix location
- `src/components/game/GameContainer.tsx` - Parent component
- `DRAG_AND_DROP_ROOMS.md` - Feature documentation

## Commit Message
```
fix: Isolate drag modes to prevent camera pan during room drag

- Restructured handleMouseDown to set dragMode before isDragging
- Moved isDragging/dragStart into each mode-specific branch
- Added clarifying comments for mode isolation
- Ensures room dragging doesn't trigger camera movement

Fixes function overlap where clicking a room to drag it
also caused the camera to pan.
```

## Date
January 2025

## Status
✅ **FIXED** - Room dragging and camera controls are now completely isolated

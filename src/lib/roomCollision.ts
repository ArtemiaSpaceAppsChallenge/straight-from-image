import { Room, Position, Dimensions } from '@/types/game';

/**
 * Check if two rooms overlap in 3D space
 */
export function checkRoomOverlap(room1: Room, room2: Room): boolean {
  // Get room bounds
  const bounds1 = getRoomBounds(room1);
  const bounds2 = getRoomBounds(room2);

  // Check overlap in all three dimensions
  const overlapX = bounds1.minX < bounds2.maxX && bounds1.maxX > bounds2.minX;
  const overlapY = bounds1.minY < bounds2.maxY && bounds1.maxY > bounds2.minY;
  const overlapZ = bounds1.minZ < bounds2.maxZ && bounds1.maxZ > bounds2.minZ;

  return overlapX && overlapY && overlapZ;
}

/**
 * Get the 3D bounds of a room
 */
export function getRoomBounds(room: Room) {
  // Account for room rotation when calculating dimensions
  const isRotated = room.rotation === 90 || room.rotation === 270;
  const effectiveWidth = isRotated ? (room.dimensions.depth || room.dimensions.width) : room.dimensions.width;
  const effectiveDepth = isRotated ? room.dimensions.width : (room.dimensions.depth || room.dimensions.width);
  
  return {
    minX: room.position.x,
    maxX: room.position.x + effectiveWidth,
    minY: room.position.y,
    maxY: room.position.y + effectiveDepth,
    minZ: room.position.z || 0,
    maxZ: (room.position.z || 0) + room.dimensions.height
  };
}

/**
 * Check if a room at a given position would overlap with any existing rooms
 */
export function wouldRoomOverlap(
  position: Position,
  dimensions: Dimensions,
  existingRooms: Room[]
): boolean {
  const testRoom: Room = {
    id: 'test',
    type: 'storage', // placeholder
    name: 'test',
    position,
    dimensions,
    isValid: true,
    requiredArea: 0,
    actualArea: 0,
    adjacentRooms: [],
    incompatibleWith: [],
    objects: [],
    noiseLevel: 0
  };

  return existingRooms.some(room => checkRoomOverlap(testRoom, room));
}

/**
 * Find a valid position for a new room that doesn't overlap with existing rooms
 */
export function findValidRoomPosition(
  dimensions: Dimensions,
  existingRooms: Room[],
  maxAttempts: number = 100,
  gridSize: number = 1
): Position | null {
  const maxX = 20;
  const maxY = 20;
  const maxZ = 3;

  // Early return if room is too large for the grid
  if (dimensions.width > maxX || (dimensions.depth || dimensions.width) > maxY) {
    console.warn(`Room dimensions (${dimensions.width}×${dimensions.depth || dimensions.width}) exceed grid bounds (${maxX}×${maxY})`);
    return null;
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Try grid-aligned positions first, then random positions
    let x: number, y: number, z: number;
    
    if (attempt < maxAttempts / 2) {
      // Grid-aligned placement
      const gridX = Math.floor(attempt / (maxY / gridSize)) * gridSize;
      const gridY = (attempt % (maxY / gridSize)) * gridSize;
      x = Math.min(gridX, maxX - dimensions.width);
      y = Math.min(gridY, maxY - (dimensions.depth || dimensions.width));
      z = 0;
    } else {
      // Random placement
      x = Math.floor(Math.random() * (maxX - dimensions.width));
      y = Math.floor(Math.random() * (maxY - (dimensions.depth || dimensions.width)));
      z = Math.floor(Math.random() * maxZ);
    }

    const position: Position = { x, y, z };

    if (!wouldRoomOverlap(position, dimensions, existingRooms)) {
      return position;
    }
  }

  return null; // No valid position found
}

/**
 * Get suggested positions around existing rooms
 */
export function getSuggestedPositions(
  dimensions: Dimensions,
  existingRooms: Room[],
  targetRoom?: Room
): Position[] {
  const suggestions: Position[] = [];
  const spacing = 1; // Minimum spacing between rooms

  if (existingRooms.length === 0) {
    return [{ x: 0, y: 0, z: 0 }];
  }

  existingRooms.forEach(room => {
    const bounds = getRoomBounds(room);
    
    // Try positions adjacent to each side of the room
    const candidates: Position[] = [
      // Right side
      { x: bounds.maxX + spacing, y: room.position.y, z: room.position.z || 0 },
      // Left side
      { x: bounds.minX - dimensions.width - spacing, y: room.position.y, z: room.position.z || 0 },
      // Front side
      { x: room.position.x, y: bounds.maxY + spacing, z: room.position.z || 0 },
      // Back side
      { x: room.position.x, y: bounds.minY - (dimensions.depth || dimensions.width) - spacing, z: room.position.z || 0 },
      // Above
      { x: room.position.x, y: room.position.y, z: bounds.maxZ + spacing },
      // Below (if room is elevated)
      { x: room.position.x, y: room.position.y, z: Math.max(0, bounds.minZ - dimensions.height - spacing) }
    ];

    candidates.forEach(pos => {
      // Check bounds
      if (pos.x >= 0 && pos.y >= 0 && pos.z >= 0 && 
          pos.x + dimensions.width <= 20 && 
          pos.y + (dimensions.depth || dimensions.width) <= 20 &&
          !wouldRoomOverlap(pos, dimensions, existingRooms)) {
        suggestions.push(pos);
      }
    });
  });

  return suggestions;
}

/**
 * Auto-arrange rooms to prevent overlaps
 */
export function autoArrangeRooms(rooms: Room[]): Room[] {
  const arrangedRooms: Room[] = [];
  
  rooms.forEach(room => {
    const validPosition = findValidRoomPosition(
      room.dimensions,
      arrangedRooms,
      100,
      1
    );

    if (validPosition) {
      arrangedRooms.push({
        ...room,
        position: validPosition
      });
    } else {
      // If no valid position found, keep original but mark as invalid
      arrangedRooms.push({
        ...room,
        isValid: false
      });
    }
  });

  return arrangedRooms;
}
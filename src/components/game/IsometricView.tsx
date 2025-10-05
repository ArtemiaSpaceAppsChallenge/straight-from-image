import React, { useRef, useEffect, useState } from 'react';
import { Room, CrewMember, PlacedObject, Position } from '@/types/game';
import { Card } from '@/components/ui/card';

interface IsometricViewProps {
  rooms: Room[];
  crew: CrewMember[];
  selectedRoom: string | null;
  onRoomSelect: (roomId: string) => void;
  onRoomMove: (roomId: string, newPosition: { x: number; y: number; z?: number }) => void;
  cameraZoom: number;
  cameraRotation: number;
  cameraPosition: Position;
  onCameraChange: (camera: { zoom?: number; rotation?: number; position?: Position }) => void;
  recentlyAddedObject?: string | null;
}

export const IsometricView: React.FC<IsometricViewProps> = ({
  rooms,
  crew,
  selectedRoom,
  onRoomSelect,
  onRoomMove,
  cameraZoom,
  cameraRotation,
  cameraPosition,
  onCameraChange,
  recentlyAddedObject
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMode, setDragMode] = useState<'pan' | 'rotate' | 'room'>('pan');
  const [draggedRoom, setDraggedRoom] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isDraggingRoom, setIsDraggingRoom] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number; z: number } | null>(null);

  // Room colors by type
  const getRoomColor = (type: string): string => {
    const colors: Record<string, string> = {
      'sleep': '#6B7280',
      'hygiene': '#3B82F6',
      'exercise': '#EF4444',
      'food': '#F59E0B',
      'medical': '#10B981',
      'research': '#8B5CF6',
      'storage': '#78716C',
      'life-support': '#06B6D4',
      'recreation': '#EC4899',
      'communication': '#14B8A6',
      'maintenance': '#F97316',
      'airlock': '#6366F1'
    };
    return colors[type] || '#9CA3AF';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply camera transformations
    ctx.save();
    ctx.translate(canvas.width / 2 + cameraPosition.x, canvas.height / 2 + cameraPosition.y);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.rotate((cameraRotation * Math.PI) / 180);

    // Isometric projection helper
    const toIsometric = (x: number, y: number, z: number = 0) => {
      const isoX = (x - y) * 0.866; // cos(30°)
      const isoY = (x + y) * 0.5 - z;
      return { x: isoX * 30, y: isoY * 30 };
    };

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      for (let j = -10; j <= 10; j++) {
        const p1 = toIsometric(i, j);
        const p2 = toIsometric(i + 1, j);
        const p3 = toIsometric(i + 1, j + 1);
        const p4 = toIsometric(i, j + 1);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Draw rooms
    rooms.forEach(room => {
      const isSelected = room.id === selectedRoom;
      const isHovered = room.id === hoveredRoom;
      const isBeingDragged = room.id === draggedRoom && isDraggingRoom;
      
      // Use preview position if this room is being dragged
      const roomPos = isBeingDragged && previewPosition ? previewPosition : room.position;
      
      const pos = toIsometric(roomPos.x, roomPos.y, roomPos.z || 0);
      const width = room.dimensions.width * 30;
      const depth = room.dimensions.depth || room.dimensions.width;
      const height = room.dimensions.height * 30;

      // Draw room base (floor)
      const p1 = toIsometric(roomPos.x, roomPos.y);
      const p2 = toIsometric(roomPos.x + room.dimensions.width, roomPos.y);
      const p3 = toIsometric(
        roomPos.x + room.dimensions.width,
        roomPos.y + depth
      );
      const p4 = toIsometric(roomPos.x, roomPos.y + depth);

      // Adjust opacity and color when dragging
      const baseColor = getRoomColor(room.type);
      ctx.fillStyle = isBeingDragged
        ? baseColor + 'AA' // Semi-transparent when dragging
        : isSelected
        ? baseColor + 'DD'
        : isHovered
        ? baseColor + 'BB'
        : baseColor + '99';
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      // Draw walls
      ctx.fillStyle = getRoomColor(room.type) + '66';
      
      // Left wall
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p1.x, p1.y - height);
      ctx.lineTo(p4.x, p4.y - height);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      // Right wall
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x, p2.y - height);
      ctx.lineTo(p3.x, p3.y - height);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();

      // Draw room border
      if (isBeingDragged) {
        ctx.strokeStyle = '#FFD700'; // Gold color when dragging
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]); // Dashed line
      } else {
        ctx.strokeStyle = isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.setLineDash([]); // Solid line
      }
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.stroke();
      
      // Reset line dash for other elements
      ctx.setLineDash([]);

      // Draw room label
      ctx.fillStyle = isBeingDragged ? '#FFD700' : '#FFFFFF';
      ctx.font = isBeingDragged ? 'bold 12px sans-serif' : '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, pos.x, pos.y - height - 10);

      // Draw validation indicator
      if (!room.isValid) {
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(pos.x + width / 2, pos.y - height - 5, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw objects in room
      room.objects.forEach(obj => {
        const objPos = toIsometric(obj.position.x, obj.position.y, obj.position.z || 0);
        const isRecent = obj.id === recentlyAddedObject;
        
        // Draw object shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(objPos.x, objPos.y + 5, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw object icon with animation for recently added
        ctx.font = isRecent ? '24px sans-serif' : '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glow effect for recently added objects
        if (isRecent) {
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 15;
          ctx.fillStyle = '#FFFFFF';
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        }
        
        ctx.fillText(obj.type.icon, objPos.x, objPos.y - 10);
        ctx.shadowBlur = 0;

        // Draw sparkle effect for recently added
        if (isRecent) {
          const sparkles = [
            { x: -15, y: -15 }, { x: 15, y: -15 },
            { x: -15, y: 15 }, { x: 15, y: 15 }
          ];
          ctx.fillStyle = '#FFD700';
          sparkles.forEach(sparkle => {
            ctx.beginPath();
            ctx.arc(objPos.x + sparkle.x, objPos.y + sparkle.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      });
    });

    // Draw crew members
    crew.forEach(member => {
      const pos = toIsometric(member.position.x, member.position.y, member.position.z || 0);
      
      // Draw crew member as a simple figure
      const moodColor = {
        'happy': '#10B981',
        'neutral': '#F59E0B',
        'stressed': '#F97316',
        'exhausted': '#EF4444'
      }[member.mood];

      // Body
      ctx.fillStyle = moodColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y - 15, 8, 0, Math.PI * 2);
      ctx.fill();

      // Name tag
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(member.name.split(' ')[0], pos.x, pos.y + 5);
    });

    ctx.restore();
  }, [rooms, crew, selectedRoom, hoveredRoom, cameraZoom, cameraRotation, cameraPosition, recentlyAddedObject]);

  // Helper function to get room at mouse position
  const getRoomAtPosition = (mouseX: number, mouseY: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const canvasX = mouseX - rect.left;
    const canvasY = mouseY - rect.top;

    // Convert screen coordinates to world coordinates
    const centerX = canvas.width / 2 + cameraPosition.x;
    const centerY = canvas.height / 2 + cameraPosition.y;
    
    const worldX = (canvasX - centerX) / cameraZoom;
    const worldY = (canvasY - centerY) / cameraZoom;

    // Apply rotation inverse
    const cos = Math.cos((-cameraRotation * Math.PI) / 180);
    const sin = Math.sin((-cameraRotation * Math.PI) / 180);
    const rotatedX = worldX * cos - worldY * sin;
    const rotatedY = worldX * sin + worldY * cos;

    // Convert from isometric to grid coordinates
    const gridX = (rotatedX / 30 + rotatedY / 15) / 0.866;
    const gridY = (rotatedY / 15 - rotatedX / 30) / 0.866;

    // Check which room contains this point
    for (const room of rooms) {
      const depth = room.dimensions.depth || room.dimensions.width;
      if (gridX >= room.position.x && gridX <= room.position.x + room.dimensions.width &&
          gridY >= room.position.y && gridY <= room.position.y + depth) {
        return room.id;
      }
    }

    return null;
  };

  // Mouse event handlers for camera interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const clickedRoom = getRoomAtPosition(e.clientX, e.clientY);
    
    if (clickedRoom && !e.shiftKey && !e.ctrlKey) {
      // Start room dragging - ONLY set room-specific states
      setDragMode('room'); // Set mode first
      setIsDraggingRoom(true);
      setDraggedRoom(clickedRoom);
      
      const room = rooms.find(r => r.id === clickedRoom);
      if (room) {
        setDragStartPos({ x: room.position.x, y: room.position.y });
        setPreviewPosition({ x: room.position.x, y: room.position.y, z: room.position.z || 0 });
      }
      
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (e.shiftKey) {
      // Shift for rotation - camera control
      setDragMode('rotate'); // Set mode first
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      // Default to pan - camera control
      setDragMode('pan'); // Set mode first
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Update hovered room even when not dragging
    const hoveredRoomId = getRoomAtPosition(e.clientX, e.clientY);
    setHoveredRoom(hoveredRoomId);

    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // Handle camera pan (only when not dragging a room)
    if (dragMode === 'pan') {
      onCameraChange({
        position: {
          x: cameraPosition.x + deltaX,
          y: cameraPosition.y + deltaY,
          z: cameraPosition.z || 0
        }
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } 
    // Handle camera rotation (only when not dragging a room)
    else if (dragMode === 'rotate') {
      const rotationSpeed = 0.5;
      onCameraChange({
        rotation: cameraRotation + deltaX * rotationSpeed
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (dragMode === 'room' && draggedRoom) {
      // Move the room with preview
      const room = rooms.find(r => r.id === draggedRoom);
      if (room) {
        // Convert mouse movement to grid movement with better sensitivity
        const gridDeltaX = Math.round(deltaX / (20 * cameraZoom));
        const gridDeltaY = Math.round(deltaY / (20 * cameraZoom));
        
        const newPosition = {
          x: dragStartPos.x + gridDeltaX,
          y: dragStartPos.y + gridDeltaY,
          z: room.position.z || 0
        };
        
        // Clamp to grid bounds
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
  };

  const handleMouseUp = () => {
    // If we were dragging a room, finalize the position
    if (isDraggingRoom && draggedRoom && previewPosition) {
      onRoomMove(draggedRoom, previewPosition);
    }
    
    setIsDragging(false);
    setIsDraggingRoom(false);
    setDraggedRoom(null);
    setPreviewPosition(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.1, Math.min(3, cameraZoom - e.deltaY * zoomSpeed));
    
    onCameraChange({
      zoom: newZoom
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Only handle clicks if not dragging
    if (isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simple click detection - check if click is within any room bounds
    // This is a simplified version; you'd want more accurate hit detection
    rooms.forEach(room => {
      const centerX = canvas.width / 2 + (room.position.x - room.position.y) * 30 * cameraZoom;
      const centerY = canvas.height / 2 + (room.position.x + room.position.y) * 15 * cameraZoom;
      
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      if (distance < 50) {
        onRoomSelect(room.id);
      }
    });
  };

  return (
    <Card className="bg-white/5 border-white/10 p-0 overflow-hidden">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`w-full h-full ${
            isDragging 
              ? dragMode === 'rotate' 
                ? 'cursor-crosshair' 
                : dragMode === 'room'
                ? 'cursor-grabbing'
                : 'cursor-move'
              : hoveredRoom 
                ? 'cursor-grab' 
                : 'cursor-pointer'
          }`}
          style={{ minHeight: '400px' }}
        />
        
        {/* Camera controls overlay */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-xs text-white">
          <div className="text-cyan-400 font-semibold mb-1">Controls</div>
          <div>🖱️ Click + Drag Room: Move it</div>
          <div>🖱️ Click + Drag Empty: Pan</div>
          <div>⇧ Shift + Drag: Rotate</div>
          <div>🖱️ Scroll: Zoom</div>
          <div>⌨️ +/- Keys: Zoom in/out</div>
          <div>⌨️ Arrow Keys: Rotate</div>
          <div>⌨️ R: Reset rotation</div>
          <div>⌨️ Ctrl+R: Reset camera</div>
          <div className="mt-1 text-cyan-400 border-t border-white/20 pt-1">
            Zoom: {Math.round(cameraZoom * 100)}% | Angle: {Math.round(cameraRotation)}°
          </div>
          {draggedRoom && (
            <div className="text-yellow-400 border-t border-white/20 pt-1 animate-pulse">
              🔄 Dragging: {rooms.find(r => r.id === draggedRoom)?.name}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

import React, { useRef, useEffect, useState } from 'react';
import { Room, CrewMember, PlacedObject, Position } from '@/types/game';
import { Card } from '@/components/ui/card';
import { wouldRoomOverlap } from '../../lib/roomCollision';

interface CrewTrail {
  crewId: string;
  positions: { x: number; y: number; z: number; timestamp: number }[];
}

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
  const [hasOverlap, setHasOverlap] = useState(false);
  const [crewTrails, setCrewTrails] = useState<Map<string, { x: number; y: number; z: number; timestamp: number }[]>>(new Map());
  const [animationFrame, setAnimationFrame] = useState(0);
  const [astronautImage, setAstronautImage] = useState<HTMLImageElement | null>(null);

  // Load astronaut image
  useEffect(() => {
    const img = new Image();
    img.src = '/astronaut.png';
    img.onload = () => {
      setAstronautImage(img);
    };
  }, []);

  // <<< INÍCIO DA CORREÇÃO DE SCROLL >>>
  // Este useEffect gerencia o evento 'wheel' manualmente para controlar o zoom.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // A função que lida com o evento de scroll do mouse
    const handleWheel = (e: WheelEvent) => {
      // Impede o comportamento padrão do navegador (rolar a página)
      e.preventDefault();

      const zoomSpeed = 0.001;
      const newZoom = Math.max(0.1, Math.min(3, cameraZoom - e.deltaY * zoomSpeed));
      
      onCameraChange({
        zoom: newZoom
      });
    };

    // Adiciona o event listener ao canvas. A opção { passive: false } é crucial.
    // Ela informa ao navegador que vamos chamar preventDefault() e que ele deve esperar.
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Função de limpeza: remove o listener quando o componente é desmontado para evitar memory leaks.
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [cameraZoom, onCameraChange]); // Dependências: a função é recriada se o zoom ou a função de callback mudarem.
  // <<< FIM DA CORREÇÃO DE SCROLL >>>

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

  // Track crew positions for trails
  useEffect(() => {
    const now = Date.now();
    const newTrails = new Map(crewTrails);
    
    crew.forEach(member => {
      const trail = newTrails.get(member.id) || [];
      const lastPos = trail[trail.length - 1];
      
      if (!lastPos || 
          Math.abs(lastPos.x - member.position.x) > 0.1 ||
          Math.abs(lastPos.y - member.position.y) > 0.1 ||
          Math.abs((lastPos.z || 0) - (member.position.z || 0)) > 0.1) {
        
        trail.push({
          x: member.position.x,
          y: member.position.y,
          z: member.position.z || 0,
          timestamp: now
        });
        
        if (trail.length > 5) {
          trail.shift();
        }
        
        newTrails.set(member.id, trail);
      }
      
      const filtered = trail.filter(pos => now - pos.timestamp < 3000);
      if (filtered.length !== trail.length) {
        newTrails.set(member.id, filtered);
      }
    });
    
    setCrewTrails(newTrails);
  }, [crew]);

  // Animation loop for pulsing effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 60);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2 + cameraPosition.x, canvas.height / 2 + cameraPosition.y);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.rotate((cameraRotation * Math.PI) / 180);

    const toIsometric = (x: number, y: number, z: number = 0) => {
      const isoX = (x - y) * 0.866;
      const isoY = (x + y) * 0.5 - z;
      return { x: isoX * 30, y: isoY * 30 };
    };

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath();
      const start = toIsometric(i, 0);
      const end = toIsometric(i, 20);
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
    
    for (let j = 0; j <= 20; j++) {
      ctx.beginPath();
      const start = toIsometric(0, j);
      const end = toIsometric(20, j);
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    
    const corner1 = toIsometric(0, 0);
    const corner2 = toIsometric(20, 0);
    const corner3 = toIsometric(20, 20);
    const corner4 = toIsometric(0, 20);
    
    ctx.beginPath();
    ctx.moveTo(corner1.x, corner1.y);
    ctx.lineTo(corner2.x, corner2.y);
    ctx.lineTo(corner3.x, corner3.y);
    ctx.lineTo(corner4.x, corner4.y);
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
    ctx.save();
    ctx.translate(canvas.width / 2 + cameraPosition.x, canvas.height / 2 + cameraPosition.y);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.rotate((cameraRotation * Math.PI) / 180);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    const labelOffset = 15;
    const origin = toIsometric(0, 0);
    const maxX = toIsometric(20, 0);
    const maxY = toIsometric(0, 20);
    const maxXY = toIsometric(20, 20);
    
    ctx.fillText('(0,0)', origin.x, origin.y - labelOffset);
    ctx.fillText('(20,0)', maxX.x, maxX.y - labelOffset);
    ctx.fillText('(0,20)', maxY.x, maxY.y + labelOffset);
    ctx.fillText('(20,20)', maxXY.x, maxXY.y + labelOffset);

    rooms.forEach(room => {
      const isSelected = room.id === selectedRoom;
      const isHovered = room.id === hoveredRoom;
      const isBeingDragged = room.id === draggedRoom && isDraggingRoom;
      
      const roomPos = isBeingDragged && previewPosition ? previewPosition : room.position;
      
      const pos = toIsometric(roomPos.x, roomPos.y, roomPos.z || 0);
      const width = room.dimensions.width * 30;
      const depth = room.dimensions.depth || room.dimensions.width;
      const height = room.dimensions.height * 30;

      const p1 = toIsometric(roomPos.x, roomPos.y);
      const p2 = toIsometric(roomPos.x + room.dimensions.width, roomPos.y);
      const p3 = toIsometric(
        roomPos.x + room.dimensions.width,
        roomPos.y + depth
      );
      const p4 = toIsometric(roomPos.x, roomPos.y + depth);

      const baseColor = (isBeingDragged && hasOverlap) 
        ? '#FF0000'
        : getRoomColor(room.type);
      
      ctx.fillStyle = isBeingDragged
        ? baseColor + (hasOverlap ? 'CC' : 'AA')
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

      const wallColor = (isBeingDragged && hasOverlap) 
        ? '#FF0000'
        : getRoomColor(room.type);
      ctx.fillStyle = wallColor + '66';
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p1.x, p1.y - height);
      ctx.lineTo(p4.x, p4.y - height);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x, p2.y - height);
      ctx.lineTo(p3.x, p3.y - height);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();

      if (isBeingDragged) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
      } else {
        ctx.strokeStyle = isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.setLineDash([]);
      }
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.stroke();
      
      ctx.setLineDash([]);

      ctx.fillStyle = isBeingDragged ? '#FFD700' : '#FFFFFF';
      ctx.font = isBeingDragged ? 'bold 12px sans-serif' : '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, pos.x, pos.y - height - 10);

      if (!room.isValid) {
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(pos.x + width / 2, pos.y - height - 5, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      room.objects.forEach(obj => {
        const objPos = toIsometric(obj.position.x, obj.position.y, obj.position.z || 0);
        const isRecent = obj.id === recentlyAddedObject;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(objPos.x, objPos.y + 5, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = isRecent ? '24px sans-serif' : '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
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

    crew.forEach(member => {
      const pos = toIsometric(member.position.x, member.position.y, member.position.z || 0);
      const trail = crewTrails.get(member.id) || [];
      
      if (trail.length > 1) {
        trail.forEach((trailPos, index) => {
          if (index === trail.length - 1) return;
          
          const trailIsoPos = toIsometric(trailPos.x, trailPos.y, trailPos.z);
          const opacity = (index / trail.length) * 0.3;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(trailIsoPos.x, trailIsoPos.y - 15, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      
      let directionArrow = null;
      if (trail.length >= 2) {
        const current = trail[trail.length - 1];
        const previous = trail[trail.length - 2];
        const dx = current.x - previous.x;
        const dy = current.y - previous.y;
        
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          const angle = Math.atan2(dy, dx);
          directionArrow = angle;
        }
      }
      
      const moodColor = {
        'happy': '#10B981',
        'neutral': '#F59E0B',
        'stressed': '#F97316',
        'exhausted': '#EF4444'
      }[member.mood];

      if (trail.length > 1) {
        const pulseSize = 2 + Math.sin(animationFrame / 10) * 1.5;
        const glowGradient = ctx.createRadialGradient(
          pos.x, pos.y - 20, 0,
          pos.x, pos.y - 20, 25 + pulseSize
        );
        glowGradient.addColorStop(0, moodColor + '80');
        glowGradient.addColorStop(1, moodColor + '00');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - 20, 25 + pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }

      if (astronautImage) {
        const imgWidth = 40;
        const imgHeight = 40;
        
        ctx.save();
        
        ctx.drawImage(
          astronautImage,
          pos.x - imgWidth / 2,
          pos.y - imgHeight,
          imgWidth,
          imgHeight
        );
        
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = moodColor + '40';
        ctx.fillRect(
          pos.x - imgWidth / 2,
          pos.y - imgHeight,
          imgWidth,
          imgHeight
        );
        
        ctx.restore();
      } else {
        ctx.fillStyle = moodColor;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - 15, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (directionArrow !== null) {
        const arrowLength = 12;
        const arrowWidth = 6;
        const startX = pos.x + Math.cos(directionArrow) * 20;
        const startY = pos.y - 20 + Math.sin(directionArrow) * 20;
        const endX = startX + Math.cos(directionArrow) * arrowLength;
        const endY = startY + Math.sin(directionArrow) * arrowLength;
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - Math.cos(directionArrow - Math.PI / 6) * arrowWidth,
          endY - Math.sin(directionArrow - Math.PI / 6) * arrowWidth
        );
        ctx.lineTo(
          endX - Math.cos(directionArrow + Math.PI / 6) * arrowWidth,
          endY - Math.sin(directionArrow + Math.PI / 6) * arrowWidth
        );
        ctx.closePath();
        ctx.fill();
      }

      const sentimentEmoji = {
        'happy': '😊',
        'neutral': '😐',
        'stressed': '😰',
        'exhausted': '😫'
      }[member.mood];

      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sentimentEmoji, pos.x, pos.y - 50);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(member.name.split(' ')[0], pos.x, pos.y + 10);
    });

    ctx.restore();
  }, [rooms, crew, selectedRoom, hoveredRoom, cameraZoom, cameraRotation, cameraPosition, recentlyAddedObject, crewTrails, animationFrame, astronautImage]);

  const getRoomAtPosition = (mouseX: number, mouseY: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const canvasX = mouseX - rect.left;
    const canvasY = mouseY - rect.top;

    const centerX = canvas.width / 2 + cameraPosition.x;
    const centerY = canvas.height / 2 + cameraPosition.y;
    
    const worldX = (canvasX - centerX) / cameraZoom;
    const worldY = (canvasY - centerY) / cameraZoom;

    const cos = Math.cos((-cameraRotation * Math.PI) / 180);
    const sin = Math.sin((-cameraRotation * Math.PI) / 180);
    const rotatedX = worldX * cos - worldY * sin;
    const rotatedY = worldX * sin + worldY * cos;

    const gridX = (rotatedX / 30 + rotatedY / 15) / 0.866;
    const gridY = (rotatedY / 15 - rotatedX / 30) / 0.866;

    const clickMargin = 0.5;

    for (const room of rooms) {
      const depth = room.dimensions.depth || room.dimensions.width;
      if (gridX >= room.position.x - clickMargin && 
          gridX <= room.position.x + room.dimensions.width + clickMargin &&
          gridY >= room.position.y - clickMargin && 
          gridY <= room.position.y + depth + clickMargin) {
        return room.id;
      }
    }

    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const clickedRoom = getRoomAtPosition(e.clientX, e.clientY);
    
    if (clickedRoom && !e.shiftKey && !e.ctrlKey) {
      setDragMode('room');
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
      setDragMode('rotate');
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      setDragMode('pan');
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredRoomId = getRoomAtPosition(e.clientX, e.clientY);
    setHoveredRoom(hoveredRoomId);

    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

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
    else if (dragMode === 'rotate') {
      const rotationSpeed = 0.5;
      onCameraChange({
        rotation: cameraRotation + deltaX * rotationSpeed
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (dragMode === 'room' && draggedRoom) {
      const room = rooms.find(r => r.id === draggedRoom);
      if (room) {
        const gridDeltaX = Math.round(deltaX / (20 * cameraZoom));
        const gridDeltaY = Math.round(deltaY / (20 * cameraZoom));
        
        const newPosition = {
          x: dragStartPos.x + gridDeltaX,
          y: dragStartPos.y + gridDeltaY,
          z: room.position.z || 0
        };
        
        const maxX = 20 - room.dimensions.width;
        const maxY = 20 - (room.dimensions.depth || room.dimensions.width);
        const clampedPosition = {
          x: Math.max(0, Math.min(maxX, newPosition.x)),
          y: Math.max(0, Math.min(maxY, newPosition.y)),
          z: Math.max(0, newPosition.z)
        };
        
        const otherRooms = rooms.filter(r => r.id !== draggedRoom);
        const wouldOverlap = wouldRoomOverlap(
          clampedPosition,
          room.dimensions,
          otherRooms
        );
        
        setHasOverlap(wouldOverlap);
        
        setPreviewPosition(clampedPosition);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRoom && draggedRoom && previewPosition) {
      onRoomMove(draggedRoom, previewPosition);
    }
    
    setIsDragging(false);
    setIsDraggingRoom(false);
    setDraggedRoom(null);
    setPreviewPosition(null);
    setHasOverlap(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
          // A prop onWheel foi removida daqui e movida para o useEffect
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


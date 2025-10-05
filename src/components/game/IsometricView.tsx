import React, { useRef, useEffect, useState } from 'react';
import { Room, CrewMember, PlacedObject } from '@/types/game';
import { Card } from '@/components/ui/card';

interface IsometricViewProps {
  rooms: Room[];
  crew: CrewMember[];
  selectedRoom: string | null;
  onRoomSelect: (roomId: string) => void;
  cameraZoom: number;
  cameraRotation: number;
  recentlyAddedObject?: string | null;
}

export const IsometricView: React.FC<IsometricViewProps> = ({
  rooms,
  crew,
  selectedRoom,
  onRoomSelect,
  cameraZoom,
  cameraRotation,
  recentlyAddedObject
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

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
    ctx.translate(canvas.width / 2, canvas.height / 2);
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
      
      const pos = toIsometric(room.position.x, room.position.y, room.position.z || 0);
      const width = room.dimensions.width * 30;
      const depth = room.dimensions.depth || room.dimensions.width;
      const height = room.dimensions.height * 30;

      // Draw room base (floor)
      const p1 = toIsometric(room.position.x, room.position.y);
      const p2 = toIsometric(room.position.x + room.dimensions.width, room.position.y);
      const p3 = toIsometric(
        room.position.x + room.dimensions.width,
        room.position.y + depth
      );
      const p4 = toIsometric(room.position.x, room.position.y + depth);

      ctx.fillStyle = isSelected
        ? getRoomColor(room.type) + 'DD'
        : isHovered
        ? getRoomColor(room.type) + 'BB'
        : getRoomColor(room.type) + '99';
      
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
      ctx.strokeStyle = isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      ctx.stroke();

      // Draw room label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
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
  }, [rooms, crew, selectedRoom, hoveredRoom, cameraZoom, cameraRotation, recentlyAddedObject]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
        style={{ minHeight: '400px' }}
      />
    </Card>
  );
};

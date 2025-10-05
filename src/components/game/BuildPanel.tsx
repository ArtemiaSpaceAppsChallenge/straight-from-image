import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoomType, Room } from '@/types/game';
import { ROOM_REQUIREMENTS, HABITAT_OBJECTS } from '@/lib/gameData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2 } from 'lucide-react';

interface BuildPanelProps {
  onAddRoom: (type: RoomType) => void;
  onAddObject: (objectId: string) => void;
  selectedRoom: string | null;
  rooms?: Room[];
}

export const BuildPanel: React.FC<BuildPanelProps> = ({
  onAddRoom,
  onAddObject,
  selectedRoom,
  rooms = []
}) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'objects'>('rooms');

  const roomTypes = Object.keys(ROOM_REQUIREMENTS) as RoomType[];

  const getRoomIcon = (type: RoomType): string => {
    const icons: Record<RoomType, string> = {
      'sleep': '🛏️',
      'hygiene': '🚿',
      'exercise': '🏋️',
      'food': '🍽️',
      'medical': '🏥',
      'research': '🔬',
      'storage': '📦',
      'life-support': '⚗️',
      'recreation': '🎮',
      'communication': '📡',
      'maintenance': '🔧',
      'airlock': '🚪'
    };
    return icons[type];
  };

  const objectCategories = ['furniture', 'equipment', 'storage', 'decoration'] as const;

  return (
    <Card className="bg-white/5 border-white/10 p-4">
      <h3 className="text-lg font-bold text-white mb-4">🏗️ Build & Design</h3>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="objects">Objects</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {roomTypes.map(type => {
                const req = ROOM_REQUIREMENTS[type];
                return (
                  <Card
                    key={type}
                    className="bg-white/10 border-white/20 p-3 hover:bg-white/15 transition-colors cursor-pointer"
                    onClick={() => onAddRoom(type)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getRoomIcon(type)}</span>
                        <div>
                          <div className="text-sm font-bold text-white capitalize">
                            {type.replace('-', ' ')}
                          </div>
                          <div className="text-xs text-white/60">
                            Min: {req.minArea}m² per crew
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Noise: {req.noiseLevel}/5
                      </Badge>
                    </div>

                    <p className="text-xs text-white/70 mb-2">
                      {req.description}
                    </p>

                    {req.incompatibleWith && req.incompatibleWith.length > 0 && (
                      <div className="text-xs text-red-400">
                        ⚠️ Avoid: {req.incompatibleWith.join(', ')}
                      </div>
                    )}

                    {req.requiredAdjacent && req.requiredAdjacent.length > 0 && (
                      <div className="text-xs text-green-400">
                        ✓ Near: {req.requiredAdjacent.join(', ')}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="objects">
          <ScrollArea className="h-[500px] pr-4">
            {!selectedRoom ? (
              <div className="text-center text-white/50 py-8">
                <div className="mb-4 text-4xl">📦</div>
                <p className="font-medium">Select a room to add objects</p>
                <p className="text-xs mt-2">Click on a room in the isometric view</p>
              </div>
            ) : (
              <>
                {/* Selected Room Info */}
                <Card className="bg-primary/10 border-primary/30 p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-sm text-white font-medium">
                        {rooms.find(r => r.id === selectedRoom)?.name || 'Room Selected'}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {rooms.find(r => r.id === selectedRoom)?.objects.length || 0} objects
                    </Badge>
                  </div>
                </Card>

                <div className="space-y-4">
                  {objectCategories.map(category => {
                    const objects = HABITAT_OBJECTS.filter(obj => obj.category === category);
                    if (objects.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-sm font-bold text-white mb-2 capitalize">
                          {category}
                        </h4>
                        <div className="space-y-2">
                          {objects.map(obj => (
                            <Card
                              key={obj.id}
                              className="bg-white/10 border-white/20 p-2 hover:bg-white/15 transition-colors cursor-pointer"
                              onClick={() => onAddObject(obj.id)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{obj.icon}</span>
                                <div className="flex-1">
                                  <div className="text-xs font-medium text-white">
                                    {obj.name}
                                  </div>
                                  <div className="text-xs text-white/60">
                                    {obj.dimensions.width}×{obj.dimensions.height}
                                    {obj.dimensions.depth && `×${obj.dimensions.depth}`}m
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/60 mb-2">Quick Tips</div>
        <ul className="text-xs text-white/70 space-y-1">
          <li>• Keep noisy rooms away from sleep areas</li>
          <li>• Place hygiene near sleep quarters</li>
          <li>• Food prep should be separate from exercise</li>
          <li>• Life support needs adequate space</li>
        </ul>
      </div>
    </Card>
  );
};

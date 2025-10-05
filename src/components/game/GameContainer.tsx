import React, { useState, useEffect } from 'react';
import { GameState, HabitatDesign, Room, CrewMember, RoomType, MissionScenario, PlacedObject } from '@/types/game';
import { GameHeader } from './GameHeader';
import { IsometricView } from './IsometricView';
import { CrewPanel } from './CrewPanel';
import { ResourcesPanel } from './ResourcesPanel';
import { BuildPanel } from './BuildPanel';
import { ValidationPanel } from './ValidationPanel';
import { MissionSelector } from './MissionSelector';
import { validateHabitat, calculateComplianceScore, calculateCrewHappiness, calculateResourceConsumption, updateCrewNeeds, generateCrewMember } from '@/lib/gameLogic';
import { CREW_NAMES, ROOM_REQUIREMENTS, HABITAT_OBJECTS } from '@/lib/gameData';
import { useToast } from '@/hooks/use-toast';

export const GameContainer: React.FC = () => {
  const { toast } = useToast();
  const [showMissionSelector, setShowMissionSelector] = useState(true);
  const [recentlyAddedObject, setRecentlyAddedObject] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    isLoading: false,
    isPlaying: false,
    isPaused: true,
    isCompleted: false,
    habitat: null,
    crew: [],
    resources: {
      oxygen: 1000,
      water: 1000,
      power: 1000,
      food: 1000
    },
    daysPassed: 0,
    score: 0,
    level: 1,
    tutorial: {
      active: false,
      step: 0
    },
    selectedRoom: null,
    selectedObject: null,
    camera: {
      zoom: 1,
      rotation: 45,
      position: { x: 0, y: 0, z: 0 }
    }
  });

  const [warnings, setWarnings] = useState<string[]>([]);

  // Initialize mission
  const handleSelectMission = (mission: MissionScenario) => {
    const habitat: HabitatDesign = {
      id: `habitat-${Date.now()}`,
      name: mission.name,
      type: mission.habitatType,
      shape: 'cylinder',
      dimensions: {
        width: 20,
        height: 10,
        depth: 20
      },
      maxVolume: mission.constraints.maxVolume,
      usedVolume: 0,
      rooms: [],
      crewSize: mission.crewSize,
      missionDuration: mission.missionDuration,
      complianceScore: 0,
      validationErrors: [],
      createdAt: new Date(),
      lastModified: new Date()
    };

    // Generate crew
    const crew: CrewMember[] = [];
    for (let i = 0; i < mission.crewSize; i++) {
      crew.push(generateCrewMember(
        `crew-${i}`,
        CREW_NAMES[i % CREW_NAMES.length]
      ));
    }

    // Calculate initial resources
    const totalResources = calculateResourceConsumption(crew, habitat, mission.missionDuration);

    setGameState(prev => ({
      ...prev,
      habitat,
      crew,
      resources: totalResources,
      isPlaying: false,
      isPaused: true
    }));

    setShowMissionSelector(false);
  };

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || !gameState.habitat) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const newDaysPassed = prev.daysPassed + 0.1; // 0.1 day per tick
        const consumptionRate = calculateResourceConsumption(
          prev.crew,
          prev.habitat!,
          0.1
        );

        // Update resources
        const newResources = {
          oxygen: Math.max(0, prev.resources.oxygen - consumptionRate.oxygen),
          water: Math.max(0, prev.resources.water - consumptionRate.water),
          power: Math.max(0, prev.resources.power - consumptionRate.power),
          food: Math.max(0, prev.resources.food - consumptionRate.food)
        };

        // Update crew needs
        const newCrew = updateCrewNeeds(prev.crew, 0.1);

        // Calculate scores
        const newHabitat = { ...prev.habitat! };
        newHabitat.validationErrors = validateHabitat(newHabitat);
        newHabitat.complianceScore = calculateComplianceScore(newHabitat);
        
        const happiness = calculateCrewHappiness(newCrew, newHabitat);
        const newScore = Math.round(
          prev.score + 
          (newHabitat.complianceScore * 0.5) + 
          (happiness * 0.5)
        );

        // Check for mission failure
        if (newResources.oxygen <= 0 || newResources.water <= 0 || newResources.food <= 0) {
          return {
            ...prev,
            isPlaying: false,
            isPaused: true,
            resources: newResources
          };
        }

        return {
          ...prev,
          daysPassed: newDaysPassed,
          resources: newResources,
          crew: newCrew,
          habitat: newHabitat,
          score: newScore
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isPaused, gameState.habitat]);

  const handlePlayPause = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: !prev.isPaused
    }));
  };

  const handleReset = () => {
    setShowMissionSelector(true);
  };

  const handleAddRoom = (type: RoomType) => {
    if (!gameState.habitat) return;

    const roomCount = gameState.habitat.rooms.filter(r => r.type === type).length;
    const requirements = ROOM_REQUIREMENTS[type];
    
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${roomCount + 1}`,
      position: {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
        z: 0
      },
      dimensions: {
        width: Math.ceil(requirements.minArea * gameState.habitat.crewSize / 3),
        height: 3,
        depth: 3
      },
      isValid: true,
      requiredArea: requirements.minArea * gameState.habitat.crewSize,
      actualArea: requirements.minArea * gameState.habitat.crewSize,
      adjacentRooms: [],
      incompatibleWith: requirements.incompatibleWith || [],
      objects: [],
      noiseLevel: requirements.noiseLevel
    };

    const newVolume = newRoom.dimensions.width * newRoom.dimensions.height * (newRoom.dimensions.depth || 3);

    setGameState(prev => ({
      ...prev,
      habitat: prev.habitat ? {
        ...prev.habitat,
        rooms: [...prev.habitat.rooms, newRoom],
        usedVolume: prev.habitat.usedVolume + newVolume,
        lastModified: new Date()
      } : null,
      selectedRoom: newRoom.id
    }));
  };

  const handleAddObject = (objectId: string) => {
    if (!gameState.selectedRoom || !gameState.habitat) {
      toast({
        title: "No room selected",
        description: "Please select a room first before adding objects.",
        variant: "destructive",
      });
      return;
    }

    const object = HABITAT_OBJECTS.find(obj => obj.id === objectId);
    if (!object) return;

    const room = gameState.habitat.rooms.find(r => r.id === gameState.selectedRoom);
    if (!room) return;

    // Check if object is compatible with room type
    if (!object.roomTypes.includes(room.type)) {
      toast({
        title: "Incompatible object",
        description: `${object.name} cannot be placed in ${room.type} rooms.`,
        variant: "destructive",
      });
      return;
    }

    // Create new placed object
    const newPlacedObject: PlacedObject = {
      id: `obj-${Date.now()}`,
      type: object,
      position: {
        x: room.position.x + Math.random() * (room.dimensions.width - 1),
        y: room.position.y + Math.random() * (room.dimensions.width - 1),
        z: 0
      },
      rotation: 0
    };

    // Update room with new object
    setGameState(prev => {
      if (!prev.habitat) return prev;

      const updatedRooms = prev.habitat.rooms.map(r => {
        if (r.id === gameState.selectedRoom) {
          return {
            ...r,
            objects: [...r.objects, newPlacedObject]
          };
        }
        return r;
      });

      return {
        ...prev,
        habitat: {
          ...prev.habitat,
          rooms: updatedRooms,
          lastModified: new Date()
        }
      };
    });

    // Set visual feedback
    setRecentlyAddedObject(newPlacedObject.id);
    setTimeout(() => setRecentlyAddedObject(null), 2000);

    // Show success toast
    toast({
      title: "Object added! ✨",
      description: `${object.icon} ${object.name} added to ${room.name}`,
      duration: 3000,
    });
  };

  const handleRoomSelect = (roomId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedRoom: roomId
    }));
  };

  if (showMissionSelector) {
    return (
      <MissionSelector
        onSelectMission={handleSelectMission}
        onCancel={() => {/* Navigate away */}}
      />
    );
  }

  if (!gameState.habitat) return null;

  const complianceScore = gameState.habitat.complianceScore;
  const crewHappiness = calculateCrewHappiness(gameState.crew, gameState.habitat);
  const consumptionRate = calculateResourceConsumption(gameState.crew, gameState.habitat, 1);
  const maxResources = calculateResourceConsumption(
    gameState.crew,
    gameState.habitat,
    gameState.habitat.missionDuration
  );

  return (
    <div className="min-h-screen bg-[#0B0F17] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-4 space-y-4">
        {/* Header */}
        <GameHeader
          isPlaying={gameState.isPlaying}
          isPaused={gameState.isPaused}
          daysPassed={Math.floor(gameState.daysPassed)}
          score={gameState.score}
          complianceScore={complianceScore}
          crewHappiness={crewHappiness}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSettings={() => {}}
          onInfo={() => {}}
        />

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <BuildPanel
              onAddRoom={handleAddRoom}
              onAddObject={handleAddObject}
              selectedRoom={gameState.selectedRoom}
              rooms={gameState.habitat.rooms}
            />
          </div>

          {/* Center - Main view */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <IsometricView
              rooms={gameState.habitat.rooms}
              crew={gameState.crew}
              selectedRoom={gameState.selectedRoom}
              onRoomSelect={handleRoomSelect}
              cameraZoom={gameState.camera.zoom}
              cameraRotation={gameState.camera.rotation}
              recentlyAddedObject={recentlyAddedObject}
            />
            
            <ValidationPanel
              errors={gameState.habitat.validationErrors}
              warnings={warnings}
              complianceScore={complianceScore}
            />
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <ResourcesPanel
              resources={gameState.resources}
              maxResources={maxResources}
              consumptionRate={consumptionRate}
            />
            
            <CrewPanel crew={gameState.crew} />
          </div>
        </div>
      </div>
    </div>
  );
};

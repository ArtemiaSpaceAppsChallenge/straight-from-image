import React, { useState, useEffect } from 'react';
import { GameState, HabitatDesign, Room, CrewMember, RoomType, MissionScenario, PlacedObject } from '@/types/game';
import { GameHeader } from './GameHeader';
import { IsometricView } from './IsometricView';
import { CrewPanel } from './CrewPanel';
import { ResourcesPanel } from './ResourcesPanel';
import { BuildPanel } from './BuildPanel';
import { ValidationPanel } from './ValidationPanel';
import { MissionSelector } from './MissionSelector';
import { CameraControls } from './CameraControls';
import { validateHabitat, calculateComplianceScore, calculateCrewHappiness, calculateResourceConsumption, updateCrewNeeds, generateCrewMember } from '@/lib/gameLogic';
import { CREW_NAMES, ROOM_REQUIREMENTS, HABITAT_OBJECTS } from '@/lib/gameData';
import { findValidRoomPosition, wouldRoomOverlap, autoArrangeRooms } from '@/lib/roomCollision';
import { useToast } from '@/hooks/use-toast';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GameContainer: React.FC = () => {
  const { toast } = useToast();
  const { togglePlay, isPlaying } = useAudio();
  const navigate = useNavigate();
  const [showMissionSelector, setShowMissionSelector] = useState(true);
  const [recentlyAddedObject, setRecentlyAddedObject] = useState<string | null>(null);
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2 | 3 | 4 | 8 | 12>(1);
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
      rotation: 0,
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
    
    // Start background music when game begins
    if (!isPlaying) {
      togglePlay();
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || !gameState.habitat) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const timeMultiplier = simulationSpeed * 0.1; // 0.1, 0.2, 0.3, or 0.4 day per tick
        const newDaysPassed = prev.daysPassed + timeMultiplier;
        const consumptionRate = calculateResourceConsumption(
          prev.crew,
          prev.habitat!,
          timeMultiplier
        );

        // Update resources
        const newResources = {
          oxygen: Math.max(0, prev.resources.oxygen - consumptionRate.oxygen),
          water: Math.max(0, prev.resources.water - consumptionRate.water),
          power: Math.max(0, prev.resources.power - consumptionRate.power),
          food: Math.max(0, prev.resources.food - consumptionRate.food)
        };

        // Update crew needs
        const newCrew = updateCrewNeeds(prev.crew, timeMultiplier);

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
  }, [gameState.isPlaying, gameState.isPaused, gameState.habitat, simulationSpeed]);

  // Crew movement effect
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || !gameState.habitat) return;

    // Adjust movement interval based on speed: base 2000ms / speed
    const moveInterval = 400 / simulationSpeed;

    const moveCrewInterval = setInterval(() => {
      setGameState(prev => {
        if (!prev.habitat || prev.crew.length === 0) return prev;

        const newCrew = prev.crew.map(member => {
          // Random chance to move (30% each interval, increases with speed)
          const moveChance = 0.3 * simulationSpeed;
          if (Math.random() > moveChance) return member;

          // Generate random movement within grid bounds (0-20)
          const moveDistance = (0.05 + Math.random() * 1) * simulationSpeed; // Faster movement at higher speeds
          const angle = Math.random() * Math.PI * 2; // Random direction
          
          let newX = member.position.x + Math.cos(angle) * moveDistance;
          let newY = member.position.y + Math.sin(angle) * moveDistance;
          
          // Keep within grid bounds (0-20)
          newX = Math.max(0, Math.min(20, newX));
          newY = Math.max(0, Math.min(20, newY));
          
          // Random z level between 0 and 2
          const newZ = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : (member.position.z || 0);

          return {
            ...member,
            position: {
              x: newX,
              y: newY,
              z: newZ
            }
          };
        });

        return {
          ...prev,
          crew: newCrew
        };
      });
    }, moveInterval);

    return () => clearInterval(moveCrewInterval);
  }, [gameState.isPlaying, gameState.isPaused, gameState.habitat, simulationSpeed]);

  // Keyboard controls for camera
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keys when game is active (not mission selector)
      if (showMissionSelector) return;

      switch (e.key.toLowerCase()) {
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case 'r':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleResetCamera();
          } else {
            e.preventDefault();
            handleResetRotation();
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          handleCameraChange({ rotation: gameState.camera.rotation - 15 });
          break;
        case 'arrowright':
          e.preventDefault();
          handleCameraChange({ rotation: gameState.camera.rotation + 15 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.camera.rotation, showMissionSelector]);

  const handlePlayPause = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: !prev.isPaused
    }));
    
    // Sync audio playback with game state
    if (!isPlaying || gameState.isPaused) {
      togglePlay();
    }
  };

  const handleReset = () => {
    setShowMissionSelector(true);
  };

  const handleCameraChange = (cameraUpdate: { 
    zoom?: number; 
    rotation?: number; 
    position?: { x: number; y: number; z?: number } 
  }) => {
    setGameState(prev => ({
      ...prev,
      camera: {
        ...prev.camera,
        ...cameraUpdate
      }
    }));
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(3, gameState.camera.zoom + 0.2);
    handleCameraChange({ zoom: newZoom });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(0.1, gameState.camera.zoom - 0.2);
    handleCameraChange({ zoom: newZoom });
  };

  const handleResetCamera = () => {
    handleCameraChange({
      zoom: 1,
      rotation: 0,
      position: { x: 0, y: 0, z: 0 }
    });
  };

  const handleResetRotation = () => {
    handleCameraChange({ rotation: 0 });
  };

  const handleReturnHome = () => {
    if (gameState.habitat && gameState.habitat.rooms.length > 0) {
      const confirmed = window.confirm(
        'Are you sure you want to return to home? Your current habitat design will be lost.'
      );
      if (confirmed) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const handleAddRoom = (type: RoomType) => {
    if (!gameState.habitat) return;

    const roomCount = gameState.habitat.rooms.filter(r => r.type === type).length;
    const requirements = ROOM_REQUIREMENTS[type];
    
    // Calculate room dimensions
    const dimensions = {
      width: Math.ceil(requirements.minArea * gameState.habitat.crewSize / 3),
      height: 3,
      depth: 3
    };

    // Validate room fits within grid bounds
    const GRID_WIDTH = 20;
    const GRID_DEPTH = 20;
    
    if (dimensions.width > GRID_WIDTH || (dimensions.depth || 3) > GRID_DEPTH) {
      toast({
        title: "Room Too Large",
        description: `${type} room (${dimensions.width}×${dimensions.depth || 3}) exceeds grid capacity (${GRID_WIDTH}×${GRID_DEPTH}). Consider reducing crew size.`,
        variant: "destructive",
      });
      return;
    }

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
        description: `No space available for ${type} room. Try removing or relocating other rooms first.`,
        variant: "destructive",
      });
      return;
    }

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${roomCount + 1}`,
      position: validPosition,
      dimensions,
      isValid: true,
      requiredArea: requirements.minArea * gameState.habitat.crewSize,
      actualArea: requirements.minArea * gameState.habitat.crewSize,
      adjacentRooms: [],
      incompatibleWith: requirements.incompatibleWith || [],
      objects: [],
      noiseLevel: requirements.noiseLevel
    };

    const newVolume = newRoom.dimensions.width * newRoom.dimensions.height * (newRoom.dimensions.depth || 3);

    toast({
      title: "Room Added",
      description: `${newRoom.name} placed at position (${validPosition.x}, ${validPosition.y}, ${validPosition.z})`,
    });

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

  const handleAutoArrangeRooms = () => {
    if (!gameState.habitat) return;

    const arrangedRooms = autoArrangeRooms(gameState.habitat.rooms);
    const overlapsFixed = arrangedRooms.filter(room => room.isValid).length;
    const overlapsRemaining = arrangedRooms.filter(room => !room.isValid).length;

    setGameState(prev => ({
      ...prev,
      habitat: prev.habitat ? {
        ...prev.habitat,
        rooms: arrangedRooms,
        lastModified: new Date()
      } : null
    }));

    toast({
      title: "Rooms Auto-Arranged",
      description: overlapsRemaining > 0 
        ? `Fixed ${overlapsFixed} rooms, ${overlapsRemaining} rooms still need manual placement.`
        : `All ${overlapsFixed} rooms arranged successfully!`,
      variant: overlapsRemaining > 0 ? "destructive" : "default",
    });
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

  const handleRoomMove = (roomId: string, newPosition: { x: number; y: number; z?: number }, rotation?: number) => {
    if (!gameState.habitat) return;

    const room = gameState.habitat.rooms.find(r => r.id === roomId);
    if (!room) return;

    // Calculate dimensions based on rotation
    const isRotated = rotation === 90 || rotation === 270;
    const effectiveWidth = isRotated ? (room.dimensions.depth || room.dimensions.width) : room.dimensions.width;
    const effectiveDepth = isRotated ? room.dimensions.width : (room.dimensions.depth || room.dimensions.width);
    
    // Create dimensions object for overlap check
    const testDimensions = {
      width: effectiveWidth,
      height: room.dimensions.height,
      depth: effectiveDepth
    };

    // Check if the new position would cause overlaps with rotated dimensions
    const otherRooms = gameState.habitat.rooms.filter(r => r.id !== roomId);
    if (wouldRoomOverlap(newPosition, testDimensions, otherRooms)) {
      toast({
        title: "Cannot Move Room",
        description: "Room would overlap with another room at this position.",
        variant: "destructive",
      });
      return;
    }

    // Ensure the room stays within bounds with rotated dimensions
    const maxX = 20 - effectiveWidth;
    const maxY = 20 - effectiveDepth;
    const clampedPosition = {
      x: Math.max(0, Math.min(maxX, newPosition.x)),
      y: Math.max(0, Math.min(maxY, newPosition.y)),
      z: Math.max(0, newPosition.z || 0)
    };

    setGameState(prev => ({
      ...prev,
      habitat: prev.habitat ? {
        ...prev.habitat,
        rooms: prev.habitat.rooms.map(r => 
          r.id === roomId 
            ? { ...r, position: clampedPosition, rotation: rotation || 0 }
            : r
        ),
        lastModified: new Date()
      } : null
    }));

    const rotationText = rotation ? ` (rotated ${rotation}°)` : '';
    toast({
      title: "Room Moved",
      description: `${room.name} moved to position (${clampedPosition.x}, ${clampedPosition.y}, ${clampedPosition.z})${rotationText}`,
    });
  };

  const handleObjectMove = (roomId: string, objectId: string, newPosition: { x: number; y: number; z?: number }) => {
    if (!gameState.habitat) return;

    const room = gameState.habitat.rooms.find(r => r.id === roomId);
    if (!room) return;

    const obj = room.objects.find(o => o.id === objectId);
    if (!obj) return;

    // Keep object within room bounds
    const minX = room.position.x;
    const maxX = room.position.x + room.dimensions.width - obj.type.dimensions.width;
    const minY = room.position.y;
    const maxY = room.position.y + (room.dimensions.depth || room.dimensions.width) - obj.type.dimensions.height;
    
    const clampedPosition = {
      x: Math.max(minX, Math.min(maxX, newPosition.x)),
      y: Math.max(minY, Math.min(maxY, newPosition.y)),
      z: newPosition.z || obj.position.z || 0
    };

    setGameState(prev => ({
      ...prev,
      habitat: prev.habitat ? {
        ...prev.habitat,
        rooms: prev.habitat.rooms.map(r => 
          r.id === roomId 
            ? {
                ...r,
                objects: r.objects.map(o =>
                  o.id === objectId
                    ? { ...o, position: clampedPosition }
                    : o
                )
              }
            : r
        ),
        lastModified: new Date()
      } : null
    }));

    toast({
      title: "Object Moved",
      description: `${obj.type.name} moved to position (${clampedPosition.x}, ${clampedPosition.y}, ${clampedPosition.z})`,
    });
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
        {/* Return to Home Button */}
        <div className="flex justify-start">
          <Button
            onClick={handleReturnHome}
            variant="ghost"
            className="text-white hover:text-cyan-400 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>

        {/* Header */}
        <GameHeader
          isPlaying={gameState.isPlaying}
          isPaused={gameState.isPaused}
          daysPassed={Math.floor(gameState.daysPassed)}
          score={gameState.score}
          complianceScore={complianceScore}
          crewHappiness={crewHappiness}
          simulationSpeed={simulationSpeed}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSettings={() => {}}
          onInfo={() => {}}
          onSpeedChange={setSimulationSpeed}
        />

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <BuildPanel
              onAddRoom={handleAddRoom}
              onAddObject={handleAddObject}
              onAutoArrange={handleAutoArrangeRooms}
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
              onRoomMove={handleRoomMove}
              onObjectMove={handleObjectMove}
              cameraZoom={gameState.camera.zoom}
              cameraRotation={gameState.camera.rotation}
              cameraPosition={gameState.camera.position}
              onCameraChange={handleCameraChange}
              recentlyAddedObject={recentlyAddedObject}
            />
            
            <CameraControls
              zoom={gameState.camera.zoom}
              rotation={gameState.camera.rotation}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetCamera={handleResetCamera}
              onResetRotation={handleResetRotation}
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

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MissionScenario } from '@/types/game';
import { MISSION_SCENARIOS } from '@/lib/gameData';
import { Rocket, Users, Calendar, Target, Settings } from 'lucide-react';

interface MissionSelectorProps {
  onSelectMission: (mission: MissionScenario) => void;
  onCancel: () => void;
}

export const MissionSelector: React.FC<MissionSelectorProps> = ({
  onSelectMission,
  onCancel
}) => {
  const [selectedMission, setSelectedMission] = useState<MissionScenario | null>(null);
  const [showCustomConfig, setShowCustomConfig] = useState(false);
  const [customConfig, setCustomConfig] = useState<{
    crewSize: number;
    destination: string;
    missionDuration: number;
    habitatType: 'lunar' | 'mars' | 'orbital';
  }>({
    crewSize: 4,
    destination: 'Moon',
    missionDuration: 30,
    habitatType: 'lunar'
  });

  // Destination options from preset missions
  const destinationOptions = [
    { value: 'Moon', label: 'Moon (Lunar Outpost)', habitatType: 'lunar' as const },
    { value: 'Mars Orbit', label: 'Mars Orbit (Transit Vehicle)', habitatType: 'orbital' as const },
    { value: 'Mars', label: 'Mars (Surface Base)', habitatType: 'mars' as const },
    { value: 'ISS', label: 'ISS (International Space Station)', habitatType: 'orbital' as const },
    { value: 'Lunar Gateway', label: 'Lunar Gateway', habitatType: 'orbital' as const },
    { value: 'Europa', label: 'Europa', habitatType: 'orbital' as const },
    { value: 'Titan', label: 'Titan', habitatType: 'orbital' as const },
    { value: 'Custom', label: 'Custom Destination', habitatType: 'orbital' as const }
  ];

  const [customDestination, setCustomDestination] = useState('');

  const getHabitatIcon = (type: string) => {
    const icons = {
      'lunar': '🌙',
      'mars': '🔴',
      'orbital': '🛰️'
    };
    return icons[type as keyof typeof icons] || '🚀';
  };

  const getDifficultyColor = (duration: number) => {
    if (duration < 60) return 'bg-green-500';
    if (duration < 180) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const createCustomMission = (): MissionScenario => {
    const baseVolume = customConfig.crewSize * 50;
    const baseBudget = customConfig.crewSize * 250000;
    
    return {
      id: 'custom',
      name: `Custom Mission - ${customConfig.destination}`,
      description: `Custom mission to ${customConfig.destination} with ${customConfig.crewSize} crew for ${customConfig.missionDuration} days`,
      habitatType: customConfig.habitatType,
      crewSize: customConfig.crewSize,
      missionDuration: customConfig.missionDuration,
      objectives: [
        `Design habitat for ${customConfig.crewSize} crew members`,
        'Ensure all basic life support requirements are met',
        'Maintain crew health and comfort',
        'Complete mission within constraints'
      ],
      constraints: {
        maxVolume: baseVolume + (customConfig.missionDuration * 0.5),
        budgetLimit: baseBudget + (customConfig.missionDuration * 5000),
        requiredRooms: ['sleep', 'hygiene', 'food', 'life-support']
      }
    };
  };

  const handleCustomSelect = () => {
    const customMission = createCustomMission();
    setSelectedMission(customMission);
    setShowCustomConfig(false);
  };

  const handleDestinationSelect = (value: string) => {
    if (value === 'Custom') {
      // Show custom input field
      setCustomConfig(prev => ({
        ...prev,
        destination: customDestination || 'Custom Destination',
        habitatType: getDestinationHabitatType(customDestination || 'Custom Destination')
      }));
    } else {
      const option = destinationOptions.find(opt => opt.value === value);
      if (option) {
        setCustomConfig(prev => ({
          ...prev,
          destination: value,
          habitatType: option.habitatType
        }));
      }
    }
  };

  const getDestinationHabitatType = (destination: string): 'lunar' | 'mars' | 'orbital' => {
    const dest = destination.toLowerCase();
    if (dest.includes('mars')) return 'mars';
    if (dest.includes('moon') || dest.includes('lunar')) return 'lunar';
    return 'orbital';
  };

  const handleCustomDestinationChange = (value: string) => {
    setCustomDestination(value);
    setCustomConfig(prev => ({
      ...prev,
      destination: value || 'Custom Destination',
      habitatType: getDestinationHabitatType(value || 'Custom Destination')
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-[#0B0F17] border-white/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🚀 Select Your Mission
          </h2>
          <p className="text-white/70">
            Choose a mission scenario to begin designing your space habitat
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {MISSION_SCENARIOS.map(mission => (
            <Card
              key={mission.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedMission?.id === mission.id
                  ? 'bg-primary/20 border-primary'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => {
                setSelectedMission(mission);
                setShowCustomConfig(false); // Hide custom config when preset selected
              }}
            >
              <div className="text-center mb-3">
                <span className="text-4xl mb-2 block">
                  {getHabitatIcon(mission.habitatType)}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">
                  {mission.name}
                </h3>
                <Badge className={getDifficultyColor(mission.missionDuration)}>
                  {mission.missionDuration < 60 ? 'Easy' : mission.missionDuration < 180 ? 'Medium' : 'Hard'}
                </Badge>
              </div>

              <p className="text-xs text-white/70 mb-3 min-h-[40px]">
                {mission.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-3 h-3" />
                  <span>{mission.crewSize} crew members</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-3 h-3" />
                  <span>{mission.missionDuration} days</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Rocket className="w-3 h-3" />
                  <span>{mission.constraints.maxVolume}m³ max volume</span>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Custom Mission Card */}
          <Card
            className={`p-4 cursor-pointer transition-all ${
              selectedMission?.id === 'custom'
                ? 'bg-primary/20 border-primary'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setShowCustomConfig(true)}
          >
            <div className="text-center mb-3">
              <span className="text-4xl mb-2 block">
                <Settings className="w-10 h-10 mx-auto text-primary" />
              </span>
              <h3 className="text-lg font-bold text-white mb-1">
                Custom Mission
              </h3>
              <Badge className="bg-purple-500">
                Customizable
              </Badge>
            </div>

            <p className="text-xs text-white/70 mb-3 min-h-[40px]">
              Create your own mission with custom crew size, destination, and duration
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-3 h-3" />
                <span>Your choice</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-3 h-3" />
                <span>Your timeline</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Rocket className="w-3 h-3" />
                <span>Your destination</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Custom Mission Configuration Dialog */}
        {showCustomConfig && (
          <Card className="bg-white/10 border-white/20 p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configure Custom Mission
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="crewSize" className="text-white mb-2 block">
                  Crew Size
                </Label>
                <Input
                  id="crewSize"
                  type="number"
                  min="1"
                  max="12"
                  value={customConfig.crewSize}
                  onChange={(e) => setCustomConfig(prev => ({ ...prev, crewSize: parseInt(e.target.value) || 1 }))}
                  className="bg-white/10 border-white/20 text-white"
                />
                <p className="text-xs text-white/60 mt-1">1-12 crew members</p>
              </div>

              <div>
                <Label htmlFor="destination" className="text-white mb-2 block">
                  Destination
                </Label>
                <Select
                  value={customConfig.destination}
                  onValueChange={handleDestinationSelect}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B0F17] border-white/20">
                    {destinationOptions.map(option => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-white hover:bg-white/10 focus:bg-white/10"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customConfig.destination === 'Custom' && (
                  <Input
                    type="text"
                    value={customDestination}
                    onChange={(e) => handleCustomDestinationChange(e.target.value)}
                    className="bg-white/10 border-white/20 text-white mt-2"
                    placeholder="Enter custom destination"
                  />
                )}
                <p className="text-xs text-white/60 mt-1">
                  {customConfig.destination === 'Custom' ? 'Enter your destination' : 'Select from preset destinations'}
                </p>
              </div>

              <div>
                <Label htmlFor="duration" className="text-white mb-2 block">
                  Mission Duration (days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="1000"
                  value={customConfig.missionDuration}
                  onChange={(e) => setCustomConfig(prev => ({ ...prev, missionDuration: parseInt(e.target.value) || 1 }))}
                  className="bg-white/10 border-white/20 text-white"
                />
                <p className="text-xs text-white/60 mt-1">1-1000 days</p>
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-lg mb-4">
              <h4 className="text-sm font-bold text-white mb-2">Mission Preview</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                <div>
                  <span className="text-white/60">Habitat Type:</span>{' '}
                  <span className="font-semibold">{customConfig.habitatType}</span>
                </div>
                <div>
                  <span className="text-white/60">Max Volume:</span>{' '}
                  <span className="font-semibold">
                    {Math.round(customConfig.crewSize * 50 + customConfig.missionDuration * 0.5)}m³
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Budget:</span>{' '}
                  <span className="font-semibold">
                    ${((customConfig.crewSize * 250000 + customConfig.missionDuration * 5000) / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Difficulty:</span>{' '}
                  <Badge className={getDifficultyColor(customConfig.missionDuration)} variant="outline">
                    {customConfig.missionDuration < 60 ? 'Easy' : customConfig.missionDuration < 180 ? 'Medium' : 'Hard'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCustomConfig(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCustomSelect}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Create Mission
              </Button>
            </div>
          </Card>
        )}

        {selectedMission && !showCustomConfig && (
          <Card className="bg-white/10 border-white/20 p-4 mb-6">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Mission Objectives
            </h4>
            <ul className="space-y-2">
              {selectedMission.objectives.map((obj, index) => (
                <li key={index} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold text-white mb-2">Required Rooms</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMission.constraints.requiredRooms.map(room => (
                  <Badge key={room} variant="outline" className="text-xs">
                    {room}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedMission && onSelectMission(selectedMission)}
            disabled={!selectedMission}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Start Mission
          </Button>
        </div>
      </Card>
    </div>
  );
};
